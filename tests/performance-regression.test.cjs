'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { performance } = require('node:perf_hooks');
const test = require('node:test');
const vm = require('node:vm');

const projectRoot = path.resolve(__dirname, '..');
const userscriptDir = path.join(projectRoot, 'userscript');
const bundlePath = path.join(userscriptDir, 'linux-do-summary.user.js');
const bundleSource = fs.readFileSync(bundlePath, 'utf8');
assert.match(bundleSource, /@version\s+\[20260830\] v1\.0\.17/);
const chineseCopy = path.join(userscriptDir, '[LINUX DO] 🌟 主题 & 回复 总结.user.js');
if (fs.existsSync(chineseCopy)) {
  assert.equal(
    fs.readFileSync(chineseCopy, 'utf8'),
    bundleSource,
    'Chinese-named userscript copy must match linux-do-summary.user.js'
  );
}
const bootstrapPattern = /  bootstrapUserscriptRuntime\(\);\n\}\)\(\);\s*$/;
const polishMarker = '\n/* ===== [LINUX DO] 弹窗优化';
const runnableBundleSource = bundleSource.includes(polishMarker)
  ? bundleSource.slice(0, bundleSource.indexOf(polishMarker))
  : bundleSource;

function loadBundleInternals(exportNames, overrides = {}) {
  assert.match(runnableBundleSource, bootstrapPattern, 'userscript bootstrap anchor changed');
  const exportEntries = exportNames.map((name) => `${name}: ${name}`).join(', ');
  const instrumentedSource = runnableBundleSource.replace(
    bootstrapPattern,
    `  globalThis.__performanceTestInternals = { ${exportEntries} };\n})();\n`
  );
  const defaultWindow = new EventTarget();
  defaultWindow.location = {
    href: 'https://linux.do/latest',
    pathname: '/latest'
  };
  const context = {
    console,
    URL,
    Event,
    EventTarget,
    performance,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    queueMicrotask,
    window: defaultWindow,
    ...overrides
  };

  vm.createContext(context);
  new vm.Script(instrumentedSource, { filename: bundlePath }).runInContext(context);
  return { context, internals: context.__performanceTestInternals };
}

function createManualTimeouts() {
  let nextId = 1;
  const pending = new Map();

  return {
    setTimeout(callback, delay = 0) {
      const id = nextId++;
      pending.set(id, { callback, delay });
      return id;
    },
    clearTimeout(id) {
      pending.delete(id);
    },
    get size() {
      return pending.size;
    },
    runNext() {
      const next = pending.entries().next();
      assert.equal(next.done, false, 'expected a pending timeout');
      const [id, task] = next.value;
      pending.delete(id);
      task.callback();
      return task.delay;
    }
  };
}

function createDeferredPromise() {
  let resolve;
  let reject;
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

async function waitForCondition(predicate, message, attempts = 100) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    if (predicate()) return;
    await Promise.resolve();
  }
  assert.fail(message);
}

function extractSourceSection(startMarker, endMarker) {
  const start = bundleSource.indexOf(startMarker);
  assert.notEqual(start, -1, `missing source marker: ${startMarker}`);
  const end = bundleSource.indexOf(endMarker, start);
  assert.notEqual(end, -1, `missing source marker: ${endMarker}`);
  return bundleSource.slice(start, end);
}

function dataPropertyName(attributeName) {
  return attributeName.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function matchesSelector(element, selector) {
  return String(selector).split(',').some((part) => {
    const candidate = part.trim();
    if (!candidate || candidate.includes(':') || candidate.includes(' ')) return false;

    const tag = candidate.match(/^[a-z][a-z0-9-]*/i)?.[0];
    if (tag && element.tagName !== tag.toUpperCase()) return false;

    const id = candidate.match(/#([a-z0-9_-]+)/i)?.[1];
    if (id && element.id !== id) return false;

    for (const classMatch of candidate.matchAll(/\.([a-z0-9_-]+)/gi)) {
      if (!element.classList.contains(classMatch[1])) return false;
    }

    for (const attributeMatch of candidate.matchAll(/\[([^\]=]+)(?:=["']?([^\]"']+)["']?)?\]/g)) {
      const name = attributeMatch[1];
      const expected = attributeMatch[2];
      const actual = name.startsWith('data-')
        ? element.dataset[dataPropertyName(name)]
        : element.getAttribute(name);
      if (actual === undefined || actual === null) return false;
      if (expected !== undefined && String(actual) !== expected) return false;
    }

    return true;
  });
}

class FakeClassList {
  constructor(owner) {
    this.owner = owner;
  }

  values() {
    return this.owner.className.split(/\s+/).filter(Boolean);
  }

  write(values) {
    this.owner.className = Array.from(new Set(values)).join(' ');
  }

  contains(name) {
    return this.values().includes(name);
  }

  add(...names) {
    this.write([...this.values(), ...names]);
  }

  remove(...names) {
    const removed = new Set(names);
    this.write(this.values().filter((name) => !removed.has(name)));
  }

  toggle(name, force) {
    const shouldAdd = force === undefined ? !this.contains(name) : Boolean(force);
    if (shouldAdd) this.add(name);
    else this.remove(name);
    return shouldAdd;
  }
}

class FakeElement {
  constructor(tagName = 'div') {
    this.nodeType = 1;
    this.tagName = tagName.toUpperCase();
    this.id = '';
    this.className = '';
    this.dataset = {};
    this.style = {};
    this.children = [];
    this.parentNode = null;
    this.innerHTML = '';
    this.textContent = '';
    this.disabled = false;
    this.scrollTop = 0;
    this.scrollHeight = 0;
    this.clientHeight = 0;
    this._attributes = new Map();
    this._listeners = new Map();
    this.classList = new FakeClassList(this);
  }

  appendChild(child) {
    if (child.parentNode) child.parentNode.removeChild(child);
    this.children.push(child);
    child.parentNode = this;
    return child;
  }

  insertBefore(child, reference) {
    if (!reference) return this.appendChild(child);
    const index = this.children.indexOf(reference);
    if (index === -1) return this.appendChild(child);
    if (child.parentNode) child.parentNode.removeChild(child);
    this.children.splice(index, 0, child);
    child.parentNode = this;
    return child;
  }

  removeChild(child) {
    const index = this.children.indexOf(child);
    if (index !== -1) this.children.splice(index, 1);
    child.parentNode = null;
    return child;
  }

  remove() {
    this.parentNode?.removeChild(this);
  }

  addEventListener(type, listener) {
    const listeners = this._listeners.get(type) || [];
    listeners.push(listener);
    this._listeners.set(type, listeners);
  }

  setAttribute(name, value) {
    const normalized = String(value);
    this._attributes.set(name, normalized);
    if (name === 'id') this.id = normalized;
    if (name === 'class') this.className = normalized;
    if (name.startsWith('data-')) this.dataset[dataPropertyName(name)] = normalized;
  }

  getAttribute(name) {
    if (name === 'id') return this.id || null;
    if (name === 'class') return this.className || null;
    if (name.startsWith('data-')) return this.dataset[dataPropertyName(name)] ?? null;
    return this._attributes.get(name) ?? null;
  }

  matches(selector) {
    return matchesSelector(this, selector);
  }

  closest(selector) {
    let current = this;
    while (current) {
      if (current.matches(selector)) return current;
      current = current.parentNode;
    }
    return null;
  }

  querySelectorAll(selector) {
    const matches = [];
    const visit = (node) => {
      node.children.forEach((child) => {
        if (child.matches(selector)) matches.push(child);
        visit(child);
      });
    };
    visit(this);
    return matches;
  }

  querySelector(selector) {
    return this.querySelectorAll(selector)[0] || null;
  }

  get nextSibling() {
    if (!this.parentNode) return null;
    const index = this.parentNode.children.indexOf(this);
    return this.parentNode.children[index + 1] || null;
  }

  get previousSibling() {
    if (!this.parentNode) return null;
    const index = this.parentNode.children.indexOf(this);
    return index > 0 ? this.parentNode.children[index - 1] : null;
  }

  get nextElementSibling() {
    return this.nextSibling;
  }

  get previousElementSibling() {
    return this.previousSibling;
  }
}

class FakeDocument {
  constructor() {
    this.body = new FakeElement('body');
  }

  createElement(tagName) {
    return new FakeElement(tagName);
  }

  querySelectorAll(selector) {
    return this.body.querySelectorAll(selector);
  }

  querySelector(selector) {
    return this.body.querySelector(selector);
  }

  getElementById(id) {
    return this.querySelector(`#${id}`);
  }
}

function createAutoRewriteFixture(topicCount, overrides = {}) {
  const document = new FakeDocument();
  const titles = new Map();
  const items = [];
  const states = {};
  for (let index = 1; index <= topicCount; index += 1) {
    const topicId = String(index);
    const item = new FakeElement('div');
    item.className = 'topic-list-item';
    item.dataset.topicId = topicId;
    const mainLink = new FakeElement('div');
    mainLink.className = 'main-link';
    item.appendChild(mainLink);
    document.body.appendChild(item);
    titles.set(item, { value: `Title ${topicId}` });
    items.push({ item, mainLink });
    states[topicId] = {
      originalTitle: `Title ${topicId}`,
      verdict: true,
      verdictReason: 'cached clickbait verdict',
      verdictUpdatedAt: '2026-08-13T00:00:00.000Z',
      updatedAt: '2026-08-13T00:00:00.000Z'
    };
  }

  const state = {
    dearrowEnabled: true,
    dearrowAutoRewrite: true,
    dearrowJudgmentApiIndex: 0,
    dearrowRewriteApiIndex: 0,
    dearrowScopeRules: ['https://linux.do/latest'],
    apiConfigurations: [{ model: 'queue-test-model', key: 'test-key' }],
    dearrowTopicStates: states
  };
  let nextTimerId = 1;
  let currentUrl = 'https://linux.do/latest';
  const { internals } = loadBundleInternals(['createDeArrowFeature']);
  const feature = internals.createDeArrowFeature({
    state,
    document,
    getCurrentUrl: () => currentUrl,
    getLiveUrl: () => currentUrl,
    extractTopicIdFromElement: (item) => item.dataset.topicId,
    getTitleAccessor: (item) => ({
      getText: () => titles.get(item).value,
      setText: (value) => {
        titles.get(item).value = value;
      }
    }),
    getButtonMountTarget: (item) => items[Number(item.dataset.topicId) - 1].mainLink,
    isSoftHidden: () => false,
    now: () => new Date('2026-08-13T00:00:00.000Z'),
    setTimeout: () => nextTimerId++,
    clearTimeout: () => {},
    ...overrides
  });

  return {
    feature,
    state,
    titles,
    items,
    setCurrentUrl(url) {
      currentUrl = url;
    }
  };
}

test('content-filter refresh ignores synchronous listener reentry', () => {
  const timers = createManualTimeouts();
  const window = new EventTarget();
  window.location = { href: 'https://linux.do/latest', pathname: '/latest' };
  const { internals } = loadBundleInternals(['scheduleContentFilterRefreshEvent'], {
    window,
    setTimeout: timers.setTimeout,
    clearTimeout: timers.clearTimeout
  });

  let dispatchCount = 0;
  let reentryResult = null;
  window.addEventListener('content-blocker:navigation', () => {
    dispatchCount += 1;
    reentryResult = internals.scheduleContentFilterRefreshEvent();
  });

  assert.equal(internals.scheduleContentFilterRefreshEvent(), true);
  assert.equal(internals.scheduleContentFilterRefreshEvent(), true, 'pre-dispatch calls remain debounced');
  assert.equal(timers.size, 1);
  assert.equal(timers.runNext(), 120);
  assert.equal(dispatchCount, 1);
  assert.equal(reentryResult, false);
  assert.equal(timers.size, 0, 'listener reentry must not queue another refresh');
});

test('DeArrow coverage reads a 20k-state snapshot once for 60 rows', () => {
  const rowCount = 60;
  const stateCount = 20_000;
  const states = {};
  for (let index = 0; index < stateCount; index += 1) {
    states[String(index)] = {
      originalTitle: index < rowCount ? `Title ${index}` : `Archived ${index}`,
      rewrittenTitle: ''
    };
  }

  const rows = Array.from({ length: rowCount }, (_, index) => {
    const topicId = String(index);
    const mountTarget = {};
    const button = {
      dataset: {
        topicId,
        originalTitle: `Title ${index}`,
        rewrittenTitle: ''
      },
      parentNode: mountTarget
    };
    const item = {
      dataset: { topicId },
      classList: {
        contains(name) {
          return name === 'has-dearrow-button';
        }
      },
      querySelectorAll(selector) {
        return selector === '.topic-dearrow-button' ? [button] : [];
      },
      querySelector() {
        return null;
      }
    };
    return { item, mountTarget };
  });

  let getterCalls = 0;
  const { internals } = loadBundleInternals(['createDeArrowFeature']);
  const feature = internals.createDeArrowFeature({
    initialTopicStates: {},
    document: {
      querySelectorAll(selector) {
        return selector === '.topic-list-item' ? rows.map(({ item }) => item) : [];
      }
    },
    getConfig: () => ({
      dearrowEnabled: true,
      dearrowScopeRules: ['https://linux.do/latest']
    }),
    getCurrentUrl: () => 'https://linux.do/latest',
    getTopicStates: () => {
      getterCalls += 1;
      return states;
    },
    extractTopicIdFromElement: (item) => item.dataset.topicId,
    getTitleAccessor: (item) => ({
      getText: () => `Title ${item.dataset.topicId}`
    }),
    getButtonMountTarget: (item) => rows[Number(item.dataset.topicId)].mountTarget,
    isSoftHidden: () => false
  });

  const startedAt = performance.now();
  const hasCoverage = feature.hasButtonCoverage();
  const elapsedMs = performance.now() - startedAt;

  assert.equal(hasCoverage, true);
  assert.equal(getterCalls, 1, 'coverage must snapshot state before iterating rows');
  assert.ok(
    elapsedMs < 1_000,
    `60 rows x 20k states took ${elapsedMs.toFixed(1)}ms; possible rows x states regression`
  );
});

test('DeArrow auto rewrite runs at most two of six cached tasks concurrently', async () => {
  const fetchGates = new Map();
  const startedTopicIds = [];
  let currentFetches = 0;
  let maximumFetches = 0;
  let rewriteRequests = 0;
  const { feature } = createAutoRewriteFixture(6, {
    fetchFirstPost(topicId) {
      const gate = createDeferredPromise();
      fetchGates.set(topicId, gate);
      startedTopicIds.push(topicId);
      currentFetches += 1;
      maximumFetches = Math.max(maximumFetches, currentFetches);
      return gate.promise.finally(() => {
        currentFetches -= 1;
      });
    },
    requestCompletion({ purpose }) {
      assert.equal(purpose, 'dearrow-rewrite', 'cached verdicts must skip judgment requests');
      rewriteRequests += 1;
      return '{"title":"Concrete rewritten title"}';
    }
  });

  await feature.refresh({ judge: false });
  await waitForCondition(
    () => fetchGates.size === 2,
    'the first two auto rewrites did not reach the controlled fetch gate'
  );

  assert.equal(feature.getActiveAutoRewriteCount(), 2);
  assert.equal(feature.getQueuedAutoRewriteCount(), 4);
  assert.equal(currentFetches, 2);

  const released = new Set();
  while (released.size < 6) {
    await waitForCondition(
      () => startedTopicIds.some((topicId) => !released.has(topicId)),
      'the next queued auto rewrite did not start'
    );
    const topicId = startedTopicIds.find((candidate) => !released.has(candidate));
    released.add(topicId);
    fetchGates.get(topicId).resolve({ raw: `First-post content ${topicId}` });
    await Promise.resolve();
    assert.ok(feature.getActiveAutoRewriteCount() <= 2);
  }

  await waitForCondition(
    () => feature.getActiveAutoRewriteCount() === 0,
    'auto rewrite workers did not drain'
  );
  assert.equal(feature.getQueuedAutoRewriteCount(), 0);
  assert.equal(maximumFetches, 2);
  assert.equal(new Set(startedTopicIds).size, 6);
  assert.equal(rewriteRequests, 6);
});

test('manual rewrite promotes and deduplicates an active auto task before auto is disabled', async () => {
  const fetchGate = createDeferredPromise();
  let fetchCalls = 0;
  let rewriteRequests = 0;
  const { feature, state } = createAutoRewriteFixture(1, {
    fetchFirstPost() {
      fetchCalls += 1;
      return fetchGate.promise;
    },
    requestCompletion({ purpose }) {
      assert.equal(purpose, 'dearrow-rewrite', 'cached verdict must skip judgment requests');
      rewriteRequests += 1;
      return '{"title":"Promoted manual rewrite"}';
    }
  });

  await feature.refresh({ judge: false });
  await waitForCondition(() => fetchCalls === 1, 'the auto rewrite did not start');
  assert.equal(feature.getActiveAutoRewriteCount(), 1);

  const firstManual = feature.rewriteTopic('1', { originalTitle: 'Title 1' });
  const secondManual = feature.rewriteTopic('1', { originalTitle: 'Title 1' });
  assert.equal(firstManual, secondManual, 'same-key manual calls must share the in-flight task');
  assert.equal(fetchCalls, 1, 'promoting an auto task must not start a second fetch');

  state.dearrowAutoRewrite = false;
  feature.cancelAutoRewrites();
  fetchGate.resolve({ raw: 'First-post content for promoted task' });
  const result = await firstManual;
  await waitForCondition(
    () => feature.getActiveAutoRewriteCount() === 0,
    'the promoted auto worker did not settle'
  );

  assert.notEqual(result.stale, true, 'promoted manual work must remain current after auto is disabled');
  assert.equal(result.rewrittenTitle, 'Promoted manual rewrite');
  assert.equal(feature.getTopicStates()['1'].rewrittenTitle, 'Promoted manual rewrite');
  assert.equal(fetchCalls, 1);
  assert.equal(rewriteRequests, 1);
  assert.equal(feature.getQueuedAutoRewriteCount(), 0);
});

test('navigation invalidates an active auto rewrite before it can commit', async () => {
  const fetchGate = createDeferredPromise();
  const { feature, setCurrentUrl } = createAutoRewriteFixture(1, {
    fetchFirstPost() {
      return fetchGate.promise;
    },
    requestCompletion() {
      return '{"title":"Stale rewritten title"}';
    }
  });

  await feature.refresh({ judge: false });
  await waitForCondition(
    () => feature.getActiveAutoRewriteCount() === 1,
    'the auto rewrite did not start before navigation'
  );
  setCurrentUrl('https://linux.do/top?ascending=false&order=views');
  feature.invalidateRewriteContext();
  fetchGate.resolve({ raw: 'Old page first-post content' });
  await waitForCondition(
    () => feature.getActiveAutoRewriteCount() === 0,
    'the stale auto rewrite did not settle'
  );

  assert.equal(feature.getTopicStates()['1'].rewrittenTitle, undefined);
  assert.equal(feature.getQueuedAutoRewriteCount(), 0);
});

test('URL monitor observes #main-outlet without a permanent coverage interval', () => {
  const observerRoot = { id: 'main-outlet' };
  const body = { id: 'body' };
  const observed = [];
  const intervalDelays = [];
  class FakeMutationObserver {
    constructor(callback) {
      this.callback = callback;
    }

    observe(target, options) {
      observed.push({ target, options });
    }
  }
  const window = new EventTarget();
  window.location = { href: 'https://linux.do/latest', pathname: '/latest' };
  const document = {
    body,
    querySelector(selector) {
      return selector === '#main-outlet' ? observerRoot : null;
    }
  };
  const { internals } = loadBundleInternals(['monitorURLChangeAndUpdateButton'], {
    document,
    window,
    MutationObserver: FakeMutationObserver,
    setInterval(callback, delay) {
      intervalDelays.push({ callback, delay });
      return intervalDelays.length;
    }
  });

  const monitorSource = extractSourceSection(
    '  function monitorURLChangeAndUpdateButton()',
    '  async function handleUrlChange(previousUrl)'
  );
  assert.doesNotMatch(monitorSource, /\bsetInterval\s*\(/);
  assert.doesNotMatch(
    monitorSource,
    /\b(?:hasListSummaryButtonsCoverage|hasDeArrowButtonCoverage)\s*\(/
  );

  internals.monitorURLChangeAndUpdateButton();
  assert.equal(observed.length, 1);
  assert.equal(observed[0].target, observerRoot);
  assert.equal(observed[0].options.subtree, true);
  assert.equal(observed[0].options.childList, true);
  assert.equal(intervalDelays.length, 0);
});

test('list rendering reads one history snapshot for the whole row batch', () => {
  const rowCount = 60;
  const document = new FakeDocument();
  const topicItems = [];
  for (let index = 0; index < rowCount; index += 1) {
    const item = new FakeElement('tr');
    item.className = 'topic-list-item';
    item.dataset.topicId = String(index);
    const mainLink = new FakeElement('div');
    mainLink.className = 'main-link';
    item.appendChild(mainLink);
    document.body.appendChild(item);
    topicItems.push(item);
  }

  const historyMap = {};
  for (let index = 0; index < rowCount; index += 1) {
    historyMap[String(index)] = [];
  }
  let snapshotReads = 0;
  let perTopicReads = 0;
  let nextTimerId = 1;
  const { internals } = loadBundleInternals(['createTopicListFeature'], {
    document,
    getComputedStyle: () => ({
      display: 'table-row',
      visibility: 'visible',
      position: 'static',
      left: '0px'
    }),
    setTimeout: () => nextTimerId++,
    clearTimeout: () => {}
  });
  const feature = internals.createTopicListFeature({
    state: {
      listPageSummaryEnabled: true,
      currentPageUrl: 'https://linux.do/latest',
      expandedSummaryRows: new Set(),
      summarizingTopics: new Set(),
      driveSummarySettings: { enabled: false },
      autoShowSummaryInList: false,
      listPageSummaryMaxLines: 6,
      summaryWidthType: 'percent',
      summaryWidthValue: 100
    },
    pendingManualAfterDriveFailTopics: new Set(),
    getSummaryHistoryMapSnapshot: () => {
      snapshotReads += 1;
      return historyMap;
    },
    getSummaryHistory: () => {
      perTopicReads += 1;
      return [];
    },
    isTopicMarkedSummarized: () => false,
    extractTopicIdFromElement: (item) => item.dataset.topicId,
    isListSummaryPageUrl: () => true,
    isSummarySelectionLocked: () => false
  });

  feature.addTopicListSummaryButtons();

  assert.equal(snapshotReads, 1);
  assert.equal(perTopicReads, 0);
  assert.equal(document.querySelectorAll('.topic-summary-row').length, rowCount);
  assert.equal(feature.hasListSummaryButtonsCoverage(), true);
  topicItems.forEach((item) => {
    assert.equal(item.querySelectorAll('.topic-summary-button').length, 1);
    assert.equal(item.querySelectorAll('.topic-question-button').length, 1);
  });
});

test('toast topic titles truncate by visual width and keep a hover title', () => {
  const { internals } = loadBundleInternals([
    'truncateToastTopicTitle',
    'formatToastTopicLabel',
    'measureToastTextWidth'
  ]);
  const longTitle = '慎用站内各种伪装成钉钉/飞书/微信的油猴脚本';
  const truncated = internals.truncateToastTopicTitle(longTitle);
  assert.equal(internals.measureToastTextWidth(longTitle) > 28, true);
  assert.equal(truncated.endsWith('…'), true);
  assert.equal(internals.measureToastTextWidth(truncated) <= 28, true);
  assert.equal(truncated.includes(longTitle), false);
  assert.equal(internals.truncateToastTopicTitle('短标题'), '短标题');
  assert.equal(internals.formatToastTopicLabel('1166574', longTitle), `📌 ${truncated}`);
  assert.equal(internals.formatToastTopicLabel('42', ''), '📌 话题#42');
  assert.match(bundleSource, /#summary-toast-container[\s\S]{0,500}max-width:\s*min\(360px/);
  assert.match(bundleSource, /\.toast-topic-info \{[\s\S]{0,300}text-overflow:\s*ellipsis/);
  assert.match(
    bundleSource,
    /const retryMessage = `总结失败，正在尝试第 \$\{retryAttempt \+ 2\}\/\$\{retryCount \+ 1\} 次重试\.\.\.`;/
  );
  assert.equal(bundleSource.includes('`${topicLabel} 总结失败'), false);
});
