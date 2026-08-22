'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const projectRoot = path.resolve(__dirname, '..');
const userscriptDir = path.join(projectRoot, 'userscript');
const bundleNames = fs.readdirSync(userscriptDir).filter((name) => name.endsWith('.user.js'));
assert.equal(bundleNames.length, 1, 'expected exactly one userscript bundle');

const bundlePath = path.join(userscriptDir, bundleNames[0]);
const bundleSource = fs.readFileSync(bundlePath, 'utf8');

test('userscript version notes the list-summary extra info release', () => {
  assert.match(bundleSource, /@version\s+\[20260822\] v1\.1\.4/);
  assert.match(bundleSource, /本地数据概览/);
});

test('list summary position panel contains extra info markup', () => {
  const start = bundleSource.indexOf('id="list-summary-position"');
  const end = bundleSource.indexOf('id="list-summary-dimensions"');
  assert.notEqual(start, -1);
  assert.notEqual(end, -1);
  assert.ok(end > start);
  const section = bundleSource.slice(start, end);
  for (const marker of [
    'id="list-summary-extra-info"',
    'data-extra-info="summarized-count"',
    'data-extra-info="history-count"',
    'data-extra-info="latest-summary"',
    'data-extra-info="page-type"',
    'data-extra-info="list-status"',
    'data-extra-info="drive-status"',
    '3. 本地数据概览'
  ]) {
    assert.match(section, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('settings controller refreshes extra info on open and tab changes', () => {
  assert.match(bundleSource, /function collectListSummaryExtraInfo\s*\(/);
  assert.match(bundleSource, /function updateListSummaryExtraInfo\s*\(/);
  assert.match(bundleSource, /updateListSummaryExtraInfo\(\);/);
  assert.match(bundleSource, /if \(tabId === "list-summary-settings"\) \{\s*updateListSummaryExtraInfo\(\);/s);
  assert.match(bundleSource, /if \(targetId === "list-summary-position"\) \{\s*updateListSummaryExtraInfo\(\);/s);
});

test('extra info renderer writes textContent rather than innerHTML', () => {
  const start = bundleSource.indexOf('function updateListSummaryExtraInfo()');
  const end = bundleSource.indexOf('let updatePromptSelect', start);
  assert.notEqual(start, -1);
  assert.notEqual(end, -1);
  const fn = bundleSource.slice(start, end);
  assert.match(fn, /target\.textContent = text/);
  assert.doesNotMatch(fn, /\.innerHTML\s*=/);
});

test('collectListSummaryExtraInfo counts history, page type and drive state', () => {
  const start = bundleSource.indexOf('function collectListSummaryExtraInfo()');
  const end = bundleSource.indexOf('function updateListSummaryExtraInfo()', start);
  assert.notEqual(start, -1);
  assert.notEqual(end, -1);
  const fnSource = bundleSource.slice(start, end);
  assert.match(fnSource, /state2\.summaryTopicIds/);
  assert.match(fnSource, /getSummaryHistoryMap\(\)/);
  assert.match(fnSource, /isListSummaryPageUrl2/);
  assert.match(fnSource, /getDriveSummarySettings/);
  assert.match(fnSource, /已开启 · 本页生效/);
  assert.match(fnSource, /列表页/);
  assert.match(fnSource, /话题页/);
});
