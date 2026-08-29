// ==UserScript==
// @name         [LINUX DO] 🌟 话题 & 回复 总结 [20260830] v1.0.10
// @namespace    0_V userscripts/[LINUX DO] 🌟 主题 & 回复 总结
// @description  在 Linux.do 的话题页和列表页一键生成结构化总结，支持自动总结、历史回看、Toast 提醒、配置导入导出与 Google Drive 同步。
// @version      [20260830] v1.0.10
// @update-log   [20260830] v1.0.10: DeArrow 子 tab「开关」改为「自动」。
// @update-log   [20260830] v1.0.9: DeArrow 设置拆成开关 / 提示词 / 模型与范围 三个子 tab。
// @update-log   [20260830] v1.0.8: 选中 tab 沿用原填充底色，去掉 accent 混色与描边；焦点环只给键盘。
// @update-log   [20260830] v1.0.7: 打开设置不再聚焦左上角折叠按钮；tab 选中改填充，焦点环只给键盘。
// @update-log   [20260830] v1.0.6: 锁定设置弹窗外壳高度，切 tab 不再上下跳；面板内滚动。
// @update-log   [20260830] v1.0.5: 设置输入字号对齐 --font-0；密钥查看改为 FormKit 风格图标钮。
// @update-log   [20260830] v1.0.4: 恢复 4px 圆角 + 实色 accent 焦点环；token 走 --d-input-* / --ld-accent。
// @update-log   [20260830] v1.0.3: 按钮统一 8px / 40px，与输入同套 focus-visible；保存/删除/添加/侧栏操作。
// @update-log   [20260830] v1.0.2: 输入框统一 token、8px 圆角、半透明 focus-visible；密钥/开关/滑块/只读主题 ID。
// @update-log   [20260830] v1.0.1: 设置弹窗高度跟随视口，面板内滚动；去掉标题冗余版本字。
// @original     WhalelnColdSky
// @match        https://linux.do/*
// @run-at       document-end
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @connect      oauth2.googleapis.com
// @connect      www.googleapis.com
// @connect      content.googleapis.com
// @connect      www.googleapis.cn
// @connect      linux.do
// @connect      *.linux.do
// @connect      ldstatic.com
// @connect      *.ldstatic.com
// @connect      discourse-cdn.com
// @connect      *.discourse-cdn.com
// @icon         data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0icXVhbnR1bUdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxQTIwMjgiIHN0b3Atb3BhY2l0eT0iMSIvPgogICAgICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiMyQzM2NDIiIHN0b3Atb3BhY2l0eT0iMC44Ii8+CiAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxRTI3MzMiIHN0b3Atb3BhY2l0eT0iMSIvPgogICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICA8cGF0dGVybiBpZD0icXVhbnR1bUdyaWQiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgICA8cGF0aCBkPSJNMTAgMCBMMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNFNEE1NiIgc3Ryb2tlLXdpZHRoPSIwLjciIHN0cm9rZS1kYXNoYXJyYXk9IjEsMSIvPgogICAgICA8L3BhdHRlcm4+CiAgICAgIDxjbGlwUGF0aCBpZD0ic3BoZXJlQ2xpcCI+CiAgICAgICAgICA8Y2lyY2xlIGN4PSI2MCIgY3k9IjYwIiByPSI0NyIvPgogICAgICA8L2NsaXBQYXRoPgogICAgICA8ZmlsdGVyIGlkPSJxdWFudHVtUHVsc2UiPgogICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMyIvPgogICAgICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjEgMCAwIDAgMCAgMCAxIDAgMCAwICAwIDAgMSAwIDAgIDAgMCAwIDAuNiAwIi8+CiAgICAgICAgICA8ZmVCbGVuZCBtb2RlPSJzY3JlZW4iIGluMj0iU291cmNlR3JhcGhpYyIvPgogICAgICA8L2ZpbHRlcj4KICA8L2RlZnM+CiAgPGNpcmNsZSBjeD0iNjAiIGN5PSI2MCIgcj0iNTAiIGZpbGw9InVybCgjcXVhbnR1bUdyYWRpZW50KSIvPgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3F1YW50dW1HcmlkKSIgb3BhY2l0eT0iMC4zIi8+CiAgPGcgY2xpcC1wYXRoPSJ1cmwoI3NwaGVyZUNsaXApIj4KICAgICAgPGc+CiAgICAgICAgICA8cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiIGZpbGw9IiMxQzFDMUUiIHJ4PSI4IiByeT0iOCIgb3BhY2l0eT0iMC45Ij4KICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjAuNzswLjk7MC43IiBkdXI9IjRzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICAgICAgICAgPC9yZWN0PgogICAgICAgICAgPGc+CiAgICAgICAgICAgICAgPHJlY3QgeD0iMTAiIHk9IjQwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjBGMEYwIiByeD0iOCIgcnk9IjgiLz4KICAgICAgICAgICAgICA8ZyBzdHJva2U9IiMyQzMwMzYiIHN0cm9rZS13aWR0aD0iMC43IiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjciPgogICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTUgNTAgSDEwNSBNMTUgNjAgSDEwNSBNMTUgNzAgSDEwNSIgc3Ryb2tlLWRhc2hhcnJheT0iMywyIi8+CiAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNSA0NSBWNzUgTTQ1IDQ1IFY3NSBNNjUgNDUgVjc1IE04NSA0NSBWNzUiIHN0cm9rZS1kYXNoYXJyYXk9IjIsMiIvPgogICAgICAgICAgICAgIDwvZz4KICAgICAgICAgIDwvZz4KICAgICAgICAgIDxyZWN0IHg9IjEwIiB5PSI4MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI0ZGQjAwMyIgcng9IjgiIHJ5PSI4IiBvcGFjaXR5PSIwLjgiPgogICAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMC42OzAuOTswLjYiIGR1cj0iNHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgICAgICAgICA8L3JlY3Q+CiAgICAgIDwvZz4KICAgICAgPGc+CiAgICAgICAgICA8Y2lyY2xlIGN4PSI2MCIgY3k9IjYwIiByPSIxNSIgZmlsbD0iI0ZGNDUwMCIgZmlsdGVyPSJ1cmwoI3F1YW50dW1QdWxzZSkiIG9wYWNpdHk9IjAuOCI+CiAgICAgICAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIxMjsyMDsxMiIgZHVyPSI0cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgICAgICAgIDwvY2lyY2xlPgogICAgICAgICAgPGc+CiAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iNjAiIGN5PSI2MCIgcj0iMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGNjM0NyIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIwLjQiPgogICAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjI1OzUwOzI1IiBkdXI9IjRzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjAuNDswOzAuNCIgZHVyPSI0cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgICAgICAgICAgICA8L2NpcmNsZT4KICAgICAgICAgICAgICA8Y2lyY2xlIGN4PSI2MCIgY3k9IjYwIiByPSIzNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkY3RjUwIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMiI+CiAgICAgICAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMzU7NjA7MzUiIGR1cj0iNHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgICAgICAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMC4yOzA7MC4yIiBkdXI9IjRzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICAgICAgICAgICAgIDwvY2lyY2xlPgogICAgICAgICAgPC9nPgogICAgICA8L2c+CiAgPC9nPgogIDxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjU1IiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjcXVhbnR1bUdyYWRpZW50KSIgc3Ryb2tlLXdpZHRoPSI0IiBvcGFjaXR5PSIwLjYiLz4KPC9zdmc+
// ==/UserScript==

/* ===================== IMPORTANT · NOTICE · START =====================
 *
 * 1. [编辑指引 | Edit Guidance]
 *   • ⚠️ 这是一个自动生成的文件：请在新的 `src/` ESM 源码目录中进行修改，然后运行 `npm run build` 在 `dist/` 目录下重新生成。
 *   • ⚠️ This project bundles auto-generated artifacts. Make changes inside the new ESM source tree under `src/`, then run `npm run build` to regenerate everything under `dist/`.
 *
 * ----------------------------------------------------------------------
 *
 * 2. ...
 *
 * ====================== IMPORTANT · NOTICE · END ====================== */
(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // src/platform/gm.js
  function resolveDirectGrant(name) {
    switch (name) {
      case "GM_setValue":
        return typeof GM_setValue === "function" ? GM_setValue : null;
      case "GM_getValue":
        return typeof GM_getValue === "function" ? GM_getValue : null;
      case "GM_xmlhttpRequest":
        return typeof GM_xmlhttpRequest === "function" ? GM_xmlhttpRequest : null;
      case "GM_registerMenuCommand":
        return typeof GM_registerMenuCommand === "function" ? GM_registerMenuCommand : null;
      default:
        return null;
    }
  }
  function resolveGrantFunction(name, fallbackNames = []) {
    const directGrant = resolveDirectGrant(name);
    if (typeof directGrant === "function") {
      return directGrant;
    }
    const globalObject = typeof globalThis !== "undefined" ? globalThis : null;
    const directGlobal = globalObject?.[name];
    if (typeof directGlobal === "function") {
      return directGlobal.bind(globalObject);
    }
    const gmObject = globalObject?.GM;
    if (gmObject) {
      for (const fallbackName of fallbackNames) {
        const candidate = gmObject[fallbackName];
        if (typeof candidate === "function") {
          return candidate.bind(gmObject);
        }
      }
    }
    throw new Error(`Missing required GM API: ${name}`);
  }
  function createGrantCaller(name, fallbackNames = []) {
    return (...args) => resolveGrantFunction(name, fallbackNames)(...args);
  }
  var gmSetValue = createGrantCaller("GM_setValue", ["setValue"]);
  var gmGetValue = createGrantCaller("GM_getValue", ["getValue"]);
  var gmXmlhttpRequest = createGrantCaller("GM_xmlhttpRequest", ["xmlHttpRequest", "xmlhttpRequest"]);
  var gmRegisterMenuCommand = createGrantCaller("GM_registerMenuCommand", ["registerMenuCommand"]);

  // src/state/appState.js
  var appState = {
    activeToastsByTopic: {},
    topicTitleMap: {},
    topicTitleFetchPromises: /* @__PURE__ */ new Map(),
    summarizingTopics: /* @__PURE__ */ new Set(),
    expandedSummaryRows: /* @__PURE__ */ new Set(),
    driveSummaryDirtyTopicIds: /* @__PURE__ */ new Set()
  };

  // src/stores/configStore.js
  var defaultSummaryOutputFilters = {
    enabled: true,
    leadingTokens: ["```html"],
    trailingTokens: ["```"]
  };
  var DEFAULT_AUTO_RETRY_COUNT = 5;
  var DEFAULT_AUTO_RETRY_INTERVAL = 6;
  var LEGACY_AUTO_RETRY_COUNT_KEY = "autoRetryCount";
  var LEGACY_AUTO_RETRY_INTERVAL_KEY = "autoRetryInterval";
  var DEFAULT_SUMMARY_WIDTH_OFFSET = 20;
  var LEGACY_SUMMARY_WIDTH_OFFSETS = /* @__PURE__ */ new Set([-40, -90]);
  var DEFAULT_API_CONFIGURATION = {
    name: "新API配置",
    url: "https://api.openai.com/v1/chat/completions",
    key: "",
    model: "gpt-4o-mini",
    imageInputEnabled: false,
    imageDetail: "auto",
    maxImagesPerRequest: 6,
    maxImageBytes: 4 * 1024 * 1024,
    maxTotalImageBytes: 12 * 1024 * 1024
  };
  var IMAGE_DETAIL_OPTIONS = /* @__PURE__ */ new Set(["auto", "low", "high"]);
  var defaultDriveSummarySettings = {
    enabled: false,
    clientId: "",
    clientSecret: "",
    refreshToken: ""
  };
  function normalizeSummaryFilterList(list, fallback) {
    if (!Array.isArray(list)) return fallback.slice();
    return list.map((item) => String(item).trim()).filter(Boolean);
  }
  function normalizeSummaryOutputFilters(filters) {
    if (!filters || typeof filters !== "object") {
      return {
        enabled: true,
        leadingTokens: defaultSummaryOutputFilters.leadingTokens.slice(),
        trailingTokens: defaultSummaryOutputFilters.trailingTokens.slice()
      };
    }
    return {
      enabled: filters.enabled !== false,
      leadingTokens: normalizeSummaryFilterList(filters.leadingTokens, defaultSummaryOutputFilters.leadingTokens),
      trailingTokens: normalizeSummaryFilterList(filters.trailingTokens, defaultSummaryOutputFilters.trailingTokens)
    };
  }
  function normalizeAutoRetryCount(value, fallback = DEFAULT_AUTO_RETRY_COUNT) {
    const fallbackValue = Number.isFinite(Number(fallback)) ? Math.min(10, Math.max(1, parseInt(fallback, 10))) : DEFAULT_AUTO_RETRY_COUNT;
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed)) return fallbackValue;
    return Math.min(10, Math.max(1, parsed));
  }
  function normalizeAutoRetryInterval(value, fallback = DEFAULT_AUTO_RETRY_INTERVAL) {
    const fallbackValue = Number.isFinite(Number(fallback)) ? Math.min(600, Math.max(1, parseInt(fallback, 10))) : DEFAULT_AUTO_RETRY_INTERVAL;
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed)) return fallbackValue;
    return Math.min(600, Math.max(1, parsed));
  }
  function normalizeImageDetail(value, fallback = DEFAULT_API_CONFIGURATION.imageDetail) {
    const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
    if (IMAGE_DETAIL_OPTIONS.has(normalized)) return normalized;
    return IMAGE_DETAIL_OPTIONS.has(fallback) ? fallback : DEFAULT_API_CONFIGURATION.imageDetail;
  }
  function normalizeMaxImagesPerRequest(value, fallback = DEFAULT_API_CONFIGURATION.maxImagesPerRequest) {
    const fallbackValue = Number.isFinite(Number(fallback)) ? Math.min(20, Math.max(1, parseInt(fallback, 10))) : DEFAULT_API_CONFIGURATION.maxImagesPerRequest;
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed)) return fallbackValue;
    return Math.min(20, Math.max(1, parsed));
  }
  function normalizeImageByteLimit(value, fallback = DEFAULT_API_CONFIGURATION.maxImageBytes) {
    const fallbackValue = Number.isFinite(Number(fallback)) ? Math.min(20 * 1024 * 1024, Math.max(256 * 1024, parseInt(fallback, 10))) : DEFAULT_API_CONFIGURATION.maxImageBytes;
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed)) return fallbackValue;
    return Math.min(20 * 1024 * 1024, Math.max(256 * 1024, parsed));
  }
  function normalizeTotalImageByteLimit(value, fallback = DEFAULT_API_CONFIGURATION.maxTotalImageBytes) {
    const fallbackValue = Number.isFinite(Number(fallback)) ? Math.min(60 * 1024 * 1024, Math.max(256 * 1024, parseInt(fallback, 10))) : DEFAULT_API_CONFIGURATION.maxTotalImageBytes;
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed)) return fallbackValue;
    return Math.min(60 * 1024 * 1024, Math.max(256 * 1024, parsed));
  }
  function normalizeApiConfiguration(config, retryFallback = {}) {
    const source = config && typeof config === "object" ? config : {};
    const fallbackRetryCount = normalizeAutoRetryCount(
      retryFallback.retryCount,
      DEFAULT_AUTO_RETRY_COUNT
    );
    const fallbackRetryInterval = normalizeAutoRetryInterval(
      retryFallback.retryInterval,
      DEFAULT_AUTO_RETRY_INTERVAL
    );
    return {
      name: typeof source.name === "string" && source.name.trim() ? source.name.trim() : DEFAULT_API_CONFIGURATION.name,
      url: typeof source.url === "string" && source.url.trim() ? source.url.trim() : DEFAULT_API_CONFIGURATION.url,
      key: source.key === null || source.key === void 0 ? "" : String(source.key),
      model: typeof source.model === "string" && source.model.trim() ? source.model.trim() : DEFAULT_API_CONFIGURATION.model,
      retryCount: normalizeAutoRetryCount(source.retryCount, fallbackRetryCount),
      retryInterval: normalizeAutoRetryInterval(source.retryInterval, fallbackRetryInterval),
      imageInputEnabled: source.imageInputEnabled === true,
      imageDetail: normalizeImageDetail(source.imageDetail),
      maxImagesPerRequest: normalizeMaxImagesPerRequest(source.maxImagesPerRequest),
      maxImageBytes: normalizeImageByteLimit(source.maxImageBytes),
      maxTotalImageBytes: normalizeTotalImageByteLimit(source.maxTotalImageBytes)
    };
  }
  function createDefaultApiConfiguration(overrides = {}, retryFallback = {}) {
    return normalizeApiConfiguration(
      { ...DEFAULT_API_CONFIGURATION, ...overrides },
      retryFallback
    );
  }
  function normalizeApiConfigurations(configurations, retryFallback = {}) {
    const sourceList = Array.isArray(configurations) ? configurations : [];
    const normalized = sourceList.map((config) => normalizeApiConfiguration(config, retryFallback));
    if (normalized.length > 0) return normalized;
    return [createDefaultApiConfiguration({}, retryFallback)];
  }
  function normalizeCurrentApiIndex(index, configurations = []) {
    const maxIndex = Array.isArray(configurations) && configurations.length > 0 ? configurations.length - 1 : 0;
    const parsed = parseInt(index, 10);
    if (Number.isNaN(parsed) || parsed < 0) return 0;
    return Math.min(parsed, maxIndex);
  }
  function normalizeDriveSummarySettings(settings) {
    if (!settings || typeof settings !== "object") {
      return { ...defaultDriveSummarySettings };
    }
    return {
      enabled: settings.enabled === true,
      clientId: typeof settings.clientId === "string" ? settings.clientId.trim() : "",
      clientSecret: typeof settings.clientSecret === "string" ? settings.clientSecret.trim() : "",
      refreshToken: typeof settings.refreshToken === "string" ? settings.refreshToken.trim() : ""
    };
  }
  function normalizeSummaryWidthOffset(value, fallback = DEFAULT_SUMMARY_WIDTH_OFFSET) {
    const parsedFallback = parseInt(fallback, 10);
    const normalizedFallback = Number.isNaN(parsedFallback) ? DEFAULT_SUMMARY_WIDTH_OFFSET : LEGACY_SUMMARY_WIDTH_OFFSETS.has(parsedFallback) ? DEFAULT_SUMMARY_WIDTH_OFFSET : Math.min(200, Math.max(-200, parsedFallback));
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed)) return normalizedFallback;
    if (LEGACY_SUMMARY_WIDTH_OFFSETS.has(parsed)) {
      return DEFAULT_SUMMARY_WIDTH_OFFSET;
    }
    return Math.min(200, Math.max(-200, parsed));
  }
  function normalizeSummaryTopicId(topicId) {
    if (topicId === null || topicId === void 0) return "";
    const normalized = String(topicId).trim();
    return normalized || "";
  }
  function sanitizeSummaryTopicIds(raw) {
    if (!Array.isArray(raw)) return [];
    const unique = /* @__PURE__ */ new Set();
    raw.forEach((topicId) => {
      const normalized = normalizeSummaryTopicId(topicId);
      if (normalized) unique.add(normalized);
    });
    return Array.from(unique);
  }

  // src/stores/historyStore.js
  var SUMMARY_HTML_HINT_RE = /<\/?[a-z][\w:-]*(\s[^<>]*?)?>/i;
  var SUMMARY_MARKDOWN_HINT_RE = /(^|\n)\s*(#{1,6}\s|[-*+]\s|\d+\.\s|>\s|```|~~~|---\s*$)/m;
  function normalizeSummaryRenderMode(renderMode, fallback = "") {
    const normalized = typeof renderMode === "string" ? renderMode.trim().toLowerCase() : "";
    if (normalized.includes("markdown")) return "markdown";
    if (normalized.includes("html")) return "html";
    if (!fallback) return "";
    const normalizedFallback = typeof fallback === "string" ? fallback.trim().toLowerCase() : "";
    if (!normalizedFallback || normalizedFallback === normalized) return "";
    return normalizeSummaryRenderMode(normalizedFallback, "");
  }
  function inferSummaryRenderModeFromSummary(summary, fallback = "html") {
    const text = summary === null || summary === void 0 ? "" : String(summary).trim();
    if (!text) return normalizeSummaryRenderMode(fallback, "html") || "html";
    if (SUMMARY_HTML_HINT_RE.test(text)) return "html";
    if (SUMMARY_MARKDOWN_HINT_RE.test(text)) return "markdown";
    return normalizeSummaryRenderMode(fallback, "html") || "html";
  }
  function normalizeSummaryHistoryItemForStorage(item) {
    if (!item || typeof item !== "object") return null;
    const normalized = {
      summary: item.summary === null || item.summary === void 0 ? "" : String(item.summary),
      timestamp: item.timestamp === null || item.timestamp === void 0 ? "" : String(item.timestamp),
      model: item.model === null || item.model === void 0 ? "" : String(item.model)
    };
    const renderMode = normalizeSummaryRenderMode(item.renderMode, "");
    if (renderMode) {
      normalized.renderMode = renderMode;
    } else if (normalized.summary.trim()) {
      normalized.renderMode = inferSummaryRenderModeFromSummary(normalized.summary, "html");
    }
    if (!normalized.summary && !normalized.timestamp && !normalized.model && !normalized.renderMode) return null;
    return normalized;
  }
  function normalizeSummaryHistoryListForStorage(list) {
    if (!Array.isArray(list)) return [];
    const normalized = [];
    list.forEach((item) => {
      const normalizedItem = normalizeSummaryHistoryItemForStorage(item);
      if (normalizedItem) normalized.push(normalizedItem);
    });
    return normalized;
  }
  function areSummaryHistoryListsEqual(left, right) {
    const normalizedLeft = normalizeSummaryHistoryListForStorage(left);
    const normalizedRight = normalizeSummaryHistoryListForStorage(right);
    if (normalizedLeft.length !== normalizedRight.length) return false;
    for (let index = 0; index < normalizedLeft.length; index += 1) {
      const current = normalizedLeft[index];
      const next = normalizedRight[index];
      if (!next) return false;
      if (current.summary !== next.summary || current.timestamp !== next.timestamp || current.model !== next.model || (current.renderMode || "") !== (next.renderMode || "")) {
        return false;
      }
    }
    return true;
  }
  function normalizeSummaryHistoryMapForStorage(raw) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
    const normalized = {};
    Object.keys(raw).forEach((topicId) => {
      const normalizedTopicId = normalizeSummaryTopicId(topicId);
      if (!normalizedTopicId) return;
      const list = normalizeSummaryHistoryListForStorage(raw[topicId]);
      if (list.length > 0 || Array.isArray(raw[topicId])) {
        normalized[normalizedTopicId] = list;
      }
    });
    return normalized;
  }
  function getLatestSummaryTimestamp(list) {
    if (!Array.isArray(list)) return 0;
    let latest = 0;
    list.forEach((item) => {
      if (!item || typeof item !== "object") return;
      const time = Date.parse(item.timestamp || "");
      if (Number.isFinite(time) && time > latest) {
        latest = time;
      }
    });
    return latest;
  }
  function trimSummaryHistoryToLatestTopics(historyMap, limit) {
    if (!historyMap || typeof historyMap !== "object") return {};
    const topics = Object.keys(historyMap).map((topicId, index) => ({
      topicId,
      time: getLatestSummaryTimestamp(historyMap[topicId]),
      sequence: index
    }));
    if (topics.length <= limit) {
      return historyMap;
    }
    topics.sort((a, b2) => {
      if (b2.time !== a.time) return b2.time - a.time;
      return a.sequence - b2.sequence;
    });
    const trimmed = {};
    topics.slice(0, limit).forEach(({ topicId }) => {
      trimmed[topicId] = historyMap[topicId];
    });
    return trimmed;
  }

  // src/stores/questionStore.js
  var defaultQuestionPromptPresets = Object.freeze([
    Object.freeze({
      id: "builtin-resolved",
      name: "是否解决",
      prompt: "请判断这个话题中的主要问题或诉求是否已经解决。请用 Markdown 输出：结论、关键依据、仍需确认的点。"
    }),
    Object.freeze({
      id: "builtin-best-solution",
      name: "最佳方案",
      prompt: "请从这个话题及回复中提炼当前最佳方案。请用 Markdown 输出：推荐方案、操作步骤、适用条件、风险或替代方案。"
    })
  ]);
  function normalizeText(value) {
    return value === null || value === void 0 ? "" : String(value).trim();
  }
  const SECRET_ICON_EYE = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2.6 12s3.5-6.5 9.4-6.5S21.4 12 21.4 12 17.9 18.5 12 18.5 2.6 12 2.6 12z"/><circle cx="12" cy="12" r="3.1"/></svg>';
  const SECRET_ICON_EYE_SLASH = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3.2 3.2l17.6 17.6"/><path d="M10.4 6.3A9.3 9.3 0 0 1 12 6c5.9 0 9.4 6 9.4 6a15.7 15.7 0 0 1-3.4 3.9"/><path d="M6.7 6.9C4.3 8.6 2.6 12 2.6 12S6.1 18.5 12 18.5c1.5 0 2.8-.3 4-.8"/><path d="M9.8 9.8a3.1 3.1 0 0 0 4.4 4.4"/></svg>';
  function paintSecretToggle(button, revealed) {
    if (!button) return;
    const showLabel = button.getAttribute("data-show-label") || "显示密钥";
    const hideLabel = button.getAttribute("data-hide-label") || "隐藏密钥";
    button.innerHTML = revealed ? SECRET_ICON_EYE_SLASH : SECRET_ICON_EYE;
    button.setAttribute("aria-pressed", revealed ? "true" : "false");
    button.setAttribute("aria-label", revealed ? hideLabel : showLabel);
    button.setAttribute("title", revealed ? hideLabel : showLabel);
  }
  function bindSecretField(wrap, options = {}) {
    if (!wrap || wrap.dataset.secretToggleBound === "true") return;
    const input = wrap.querySelector(".ld-secret-input") || wrap.querySelector("input, textarea");
    const button = wrap.querySelector(".ld-secret-toggle");
    if (!input || !button) return;
    wrap.dataset.secretToggleBound = "true";
    const isTextarea = input.tagName === "TEXTAREA";
    let revealed = false;
    const apply = () => {
      if (isTextarea) {
        input.classList.toggle("is-revealed", revealed);
        input.style.webkitTextSecurity = revealed ? "none" : "disc";
      } else {
        input.type = revealed ? "text" : "password";
      }
      wrap.classList.toggle("is-revealed", revealed);
      paintSecretToggle(button, revealed);
      if (typeof options.onRevealChange === "function") options.onRevealChange(revealed, input);
    };
    const syncFocus = () => {
      wrap.classList.toggle("is-focused", wrap.contains(document.activeElement));
    };
    button.addEventListener("click", (event) => {
      event.preventDefault();
      revealed = !revealed;
      apply();
      if (typeof input.focus === "function") input.focus({ preventScroll: true });
    });
    wrap.addEventListener("focusin", syncFocus);
    wrap.addEventListener("focusout", syncFocus);
    apply();
  }
  function createFallbackPresetId(index) {
    return `custom-${index + 1}`;
  }
  function normalizeQuestionPromptPreset(preset, index = 0) {
    if (!preset || typeof preset !== "object") return null;
    const name = normalizeText(preset.name);
    const prompt = normalizeText(preset.prompt);
    if (!name && !prompt) return null;
    const rawId = normalizeText(preset.id);
    return {
      id: rawId || createFallbackPresetId(index),
      name: name || `自定义预设 ${index + 1}`,
      prompt
    };
  }
  function normalizeQuestionPromptPresets(presets) {
    if (!Array.isArray(presets)) return [];
    const normalized = [];
    const seen = /* @__PURE__ */ new Set();
    presets.forEach((preset, index) => {
      const item = normalizeQuestionPromptPreset(preset, index);
      if (!item || seen.has(item.id)) return;
      seen.add(item.id);
      normalized.push(item);
    });
    return normalized;
  }
  function getAllQuestionPromptPresets(customPresets = []) {
    return [
      ...defaultQuestionPromptPresets.map((preset) => ({ ...preset, builtin: true })),
      ...normalizeQuestionPromptPresets(customPresets).map((preset) => ({ ...preset, builtin: false }))
    ];
  }
  function normalizeTopicQuestionHistoryItemForStorage(item) {
    if (!item || typeof item !== "object") return null;
    const normalized = {
      id: normalizeText(item.id),
      question: item.question === null || item.question === void 0 ? "" : String(item.question),
      answer: item.answer === null || item.answer === void 0 ? "" : String(item.answer),
      presetId: normalizeText(item.presetId),
      presetName: normalizeText(item.presetName),
      timestamp: item.timestamp === null || item.timestamp === void 0 ? "" : String(item.timestamp),
      model: item.model === null || item.model === void 0 ? "" : String(item.model),
      renderMode: "markdown"
    };
    if (!normalized.question && !normalized.answer && !normalized.timestamp && !normalized.model) {
      return null;
    }
    return normalized;
  }
  function normalizeTopicQuestionHistoryListForStorage(list) {
    if (!Array.isArray(list)) return [];
    const normalized = [];
    list.forEach((item) => {
      const normalizedItem = normalizeTopicQuestionHistoryItemForStorage(item);
      if (normalizedItem) normalized.push(normalizedItem);
    });
    return normalized;
  }
  function normalizeTopicQuestionHistoryMapForStorage(raw) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
    const normalized = {};
    Object.keys(raw).forEach((topicId) => {
      const normalizedTopicId = normalizeSummaryTopicId(topicId);
      if (!normalizedTopicId) return;
      const list = normalizeTopicQuestionHistoryListForStorage(raw[topicId]);
      if (list.length > 0 || Array.isArray(raw[topicId])) {
        normalized[normalizedTopicId] = list;
      }
    });
    return normalized;
  }
  function buildTopicQuestionHistoryEntryKey(item) {
    const id = normalizeText(item?.id);
    if (id) return `id:${id}`;
    return [
      normalizeText(item?.timestamp),
      normalizeText(item?.model),
      normalizeText(item?.presetId),
      item?.question === null || item?.question === void 0 ? "" : String(item.question),
      item?.answer === null || item?.answer === void 0 ? "" : String(item.answer)
    ].join("::");
  }
  function mergeTopicQuestionHistoryList(baseList, incomingList) {
    const combined = [];
    const seen = /* @__PURE__ */ new Set();
    const addItem = (item) => {
      const normalizedItem = normalizeTopicQuestionHistoryItemForStorage(item);
      if (!normalizedItem) return;
      const key = buildTopicQuestionHistoryEntryKey(normalizedItem);
      if (seen.has(key)) return;
      seen.add(key);
      combined.push(normalizedItem);
    };
    normalizeTopicQuestionHistoryListForStorage(baseList).forEach(addItem);
    normalizeTopicQuestionHistoryListForStorage(incomingList).forEach(addItem);
    combined.sort((a, b2) => {
      const timeA = Date.parse(a?.timestamp || "");
      const timeB = Date.parse(b2?.timestamp || "");
      if (!Number.isFinite(timeA) && !Number.isFinite(timeB)) return 0;
      if (!Number.isFinite(timeA)) return 1;
      if (!Number.isFinite(timeB)) return -1;
      return timeB - timeA;
    });
    return combined;
  }

  // src/features/importExport/index.js
  function initializeImportExportFeature(deps) {
    const {
      createToast: createToast2,
      createSettingsToast: createSettingsToast2,
      exportSettingsObject,
      importSettings,
      getSummaryHistoryMap,
      setSummaryHistoryMap,
      getTopicQuestionHistoryMap,
      setTopicQuestionHistoryMap,
      getDeArrowTopicStates,
      setDeArrowTopicStates,
      normalizeDeArrowTopicStates: normalizeDeArrowTopicStates2,
      syncSummaryTopicIdsFromSources: syncSummaryTopicIdsFromSources2,
      replaceSummaryTopicIdsFromHistoryMap: replaceSummaryTopicIdsFromHistoryMap2,
      markDriveSummaryTopicsDirty: markDriveSummaryTopicsDirty2,
      markDriveDeArrowDirty: markDriveDeArrowDirty2,
      scheduleDriveSummarySync: scheduleDriveSummarySync2,
      updateAllSummaryButtonsAndContainers,
      syncDriveSummarySettingsUI: syncDriveSummarySettingsUI2,
      persistDriveSummarySettings: persistDriveSummarySettings2,
      getDriveSummarySettings,
      uploadSummaryHistoryToDrive: uploadSummaryHistoryToDrive2,
      rebuildSummaryTopicIdsFromDrive: rebuildSummaryTopicIdsFromDrive2
    } = deps;
    function ready(fn) {
      if (document.readyState !== "loading") {
        fn();
      } else {
        document.addEventListener("DOMContentLoaded", fn, { once: true });
      }
    }
    function readSummaryHistory() {
      return typeof getSummaryHistoryMap === "function" ? getSummaryHistoryMap() : {};
    }
    function readTopicQuestionHistory() {
      return typeof getTopicQuestionHistoryMap === "function" ? getTopicQuestionHistoryMap() : {};
    }
    function readDeArrowTopicStates() {
      return typeof getDeArrowTopicStates === "function" ? getDeArrowTopicStates() : {};
    }
    function isPlainObject(value) {
      return Boolean(value) && typeof value === "object" && !Array.isArray(value);
    }
    function normalizeImportedSummaryHistoryOrThrow(summaryHistory, label = "已总结内容") {
      if (!isPlainObject(summaryHistory)) {
        throw new Error(`${label}格式无效`);
      }
      const hasInvalidTopicEntries = Object.keys(summaryHistory).some((topicId) => !Array.isArray(summaryHistory[topicId]));
      if (hasInvalidTopicEntries) {
        throw new Error(`${label}格式无效`);
      }
      return normalizeSummaryHistoryMapForStorage(summaryHistory);
    }
    function normalizeImportedTopicQuestionHistoryOrThrow(questionHistory, label = "问答历史") {
      if (!isPlainObject(questionHistory)) {
        throw new Error(`${label}格式无效`);
      }
      const hasInvalidTopicEntries = Object.keys(questionHistory).some((topicId) => !Array.isArray(questionHistory[topicId]));
      if (hasInvalidTopicEntries) {
        throw new Error(`${label}格式无效`);
      }
      return normalizeTopicQuestionHistoryMapForStorage(questionHistory);
    }
    function normalizeImportedDeArrowStatesOrThrow(topicStates, label = "DeArrow 状态") {
      if (!isPlainObject(topicStates)) {
        throw new Error(`${label}格式无效`);
      }
      const hasInvalidTopicEntries = Object.values(topicStates).some((entry) => !isPlainObject(entry));
      if (hasInvalidTopicEntries) {
        throw new Error(`${label}格式无效`);
      }
      return typeof normalizeDeArrowTopicStates2 === "function" ? normalizeDeArrowTopicStates2(topicStates) : topicStates;
    }
    function writeSummaryHistory(summaryHistory, { preservedTopicIds = [] } = {}) {
      const normalizedSummaryHistory = normalizeSummaryHistoryMapForStorage(summaryHistory);
      if (typeof setSummaryHistoryMap === "function") {
        setSummaryHistoryMap(normalizedSummaryHistory);
      }
      if (typeof syncSummaryTopicIdsFromSources2 === "function") {
        syncSummaryTopicIdsFromSources2(normalizedSummaryHistory, preservedTopicIds);
      } else if (typeof replaceSummaryTopicIdsFromHistoryMap2 === "function") {
        replaceSummaryTopicIdsFromHistoryMap2(normalizedSummaryHistory);
      }
      if (typeof markDriveSummaryTopicsDirty2 === "function") {
        markDriveSummaryTopicsDirty2(Object.keys(normalizedSummaryHistory));
      }
      if (typeof scheduleDriveSummarySync2 === "function") {
        scheduleDriveSummarySync2("import");
      }
      if (typeof updateAllSummaryButtonsAndContainers === "function") {
        updateAllSummaryButtonsAndContainers();
      }
    }
    function writeTopicQuestionHistory(questionHistory) {
      const normalizedQuestionHistory = normalizeTopicQuestionHistoryMapForStorage(questionHistory);
      if (typeof setTopicQuestionHistoryMap === "function") {
        setTopicQuestionHistoryMap(normalizedQuestionHistory);
      }
      if (typeof markDriveSummaryTopicsDirty2 === "function") {
        markDriveSummaryTopicsDirty2(Object.keys(normalizedQuestionHistory));
      }
      if (typeof scheduleDriveSummarySync2 === "function") {
        scheduleDriveSummarySync2("import");
      }
    }
    function writeDeArrowTopicStates(topicStates) {
      const normalized = typeof normalizeDeArrowTopicStates2 === "function" ? normalizeDeArrowTopicStates2(topicStates) : topicStates;
      if (typeof setDeArrowTopicStates === "function") {
        setDeArrowTopicStates(normalized);
      }
      if (typeof markDriveDeArrowDirty2 === "function") {
        markDriveDeArrowDirty2();
      }
      if (typeof scheduleDriveSummarySync2 === "function") {
        scheduleDriveSummarySync2("import");
      }
    }
    function downloadJson(obj, baseName) {
      const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      a.href = url;
      a.download = `${baseName}_${date}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 0);
    }
    function exportSummaryContent() {
      try {
        downloadJson(readSummaryHistory(), "总结内容 - [LINUX DO] 🌟 主题 & 回复 总结");
        createSettingsToast2?.("已总结内容已导出！", "success", 3e3);
      } catch (error) {
        createSettingsToast2?.("导出失败", "error", 3e3);
        console.error("exportSummaryContent failed", error);
      }
    }
    function importSummaryContent(data) {
      try {
        const normalizedSummaryHistory = normalizeImportedSummaryHistoryOrThrow(data);
        writeSummaryHistory(normalizedSummaryHistory);
        createSettingsToast2?.("已总结内容导入完成！", "success", 3e3);
      } catch (error) {
        createSettingsToast2?.(`导入失败：${error.message}`, "error", 3e3);
        console.error("importSummaryContent failed", error);
      }
    }
    function exportAllData() {
      try {
        const bundle = {
          settings: exportSettingsObject(),
          summaryHistory: readSummaryHistory(),
          topicQuestionHistory: readTopicQuestionHistory(),
          dearrowTopicStates: readDeArrowTopicStates()
        };
        downloadJson(bundle, "全部数据 - [LINUX DO] 🌟 主题 & 回复 总结");
        createSettingsToast2?.("全部数据已导出！", "success", 3e3);
      } catch (error) {
        createSettingsToast2?.("导出失败", "error", 3e3);
        console.error("exportAllData failed", error);
      }
    }
    function importAllData(bundle) {
      try {
        if (!isPlainObject(bundle)) {
          createSettingsToast2?.("导入失败：数据无效", "error", 3e3);
          return;
        }
        const hasSummaryHistory = Object.prototype.hasOwnProperty.call(bundle, "summaryHistory");
        const normalizedSummaryHistory = hasSummaryHistory ? normalizeImportedSummaryHistoryOrThrow(bundle.summaryHistory) : null;
        const hasTopicQuestionHistory = Object.prototype.hasOwnProperty.call(bundle, "topicQuestionHistory");
        const normalizedQuestionHistory = hasTopicQuestionHistory ? normalizeImportedTopicQuestionHistoryOrThrow(bundle.topicQuestionHistory) : null;
        const hasDeArrowTopicStates = Object.prototype.hasOwnProperty.call(bundle, "dearrowTopicStates");
        const normalizedDeArrowTopicStates = hasDeArrowTopicStates ? normalizeImportedDeArrowStatesOrThrow(bundle.dearrowTopicStates) : null;
        if (bundle.settings && typeof importSettings === "function") {
          const settingsImported = importSettings(bundle.settings);
          if (settingsImported === false) {
            throw new Error("脚本设置导入失败");
          }
        }
        if (normalizedSummaryHistory) {
          writeSummaryHistory(normalizedSummaryHistory, {
            preservedTopicIds: bundle.settings?.summaryTopicIds
          });
        }
        if (normalizedQuestionHistory) {
          writeTopicQuestionHistory(normalizedQuestionHistory);
        }
        if (normalizedDeArrowTopicStates) {
          writeDeArrowTopicStates(normalizedDeArrowTopicStates);
        }
        createSettingsToast2?.("全部数据导入完成！", "success", 3e3);
      } catch (error) {
        createSettingsToast2?.(`导入失败：${error.message}`, "error", 3e3);
        console.error("importAllData failed", error);
      }
    }
    function buildDriveUI(container) {
      if (!container || container.dataset.driveInitialized === "true") {
        return;
      }
      container.dataset.driveInitialized = "true";
      const section = document.createElement("div");
      section.className = "settings-card drive-summary-section";
      section.innerHTML = `
            <span class="switch-label">1. Google Drive 总结 / 问答 / DeArrow 数据：</span>
            <p>(同步文件夹：[LINUX DO] 🌟 话题 & 回复 总结)</p>
            <div class="switch-container">
                <span class="switch-label">自动同步（关/开）</span>
                <label class="switch switch-on-off">
                    <input type="checkbox" id="drive-summary-enabled">
                    <span class="slider"></span>
                </label>
                <span class="tooltip">保存总结或问答后自动上传到 Drive</span>
            </div>
            <div class="drive-summary-fields">
                <label class="drive-summary-field">Client ID：
                    <input type="text" id="drive-summary-client-id" placeholder="Client ID" autocomplete="off" spellcheck="false">
                </label>
                <label class="drive-summary-field ld-secret-field">Client Secret：
                    <div class="ld-secret-wrap drive-summary-input-wrap">
                        <input type="password" id="drive-summary-client-secret" class="ld-secret-input" placeholder="Client Secret" autocomplete="off" spellcheck="false">
                        <button type="button" class="ld-secret-toggle" data-show-label="显示 Client Secret" data-hide-label="隐藏 Client Secret" aria-pressed="false"></button>
                    </div>
                </label>
                <label class="drive-summary-field ld-secret-field">Refresh Token：
                    <div class="ld-secret-wrap drive-summary-input-wrap">
                        <input type="password" id="drive-summary-refresh-token" class="ld-secret-input" placeholder="Refresh Token" autocomplete="off" spellcheck="false">
                        <button type="button" class="ld-secret-toggle" data-show-label="显示 Refresh Token" data-hide-label="隐藏 Refresh Token" aria-pressed="false"></button>
                    </div>
                </label>
            </div>
            <div class="button-group drive-summary-actions">
                <button id="drive-summary-save" class="custom-button btn btn-icon-text btn-primary save-button"><span class="button-icon d-icon" aria-hidden="true">💾</span><span class="button-label d-button-label">保存</span></button>
                <button id="drive-summary-sync" class="custom-button btn btn-icon-text btn-success save-button"><span class="button-icon d-icon" aria-hidden="true">☁️</span><span class="button-label d-button-label">上传</span></button>
                <button id="drive-summary-rebuild-topic-ids" class="custom-button btn btn-icon-text btn-default neutral-button"><span class="button-icon d-icon" aria-hidden="true">♻️</span><span class="button-label d-button-label">重建已总结状态</span></button>
            </div>
            <div id="drive-summary-status" class="drive-summary-status"></div>
        `;
      container.appendChild(section);
      const driveEnabledInput = section.querySelector("#drive-summary-enabled");
      const driveClientIdInput = section.querySelector("#drive-summary-client-id");
      const driveClientSecretInput = section.querySelector("#drive-summary-client-secret");
      const driveRefreshTokenInput = section.querySelector("#drive-summary-refresh-token");
      const driveSaveButton = section.querySelector("#drive-summary-save");
      const driveSyncButton = section.querySelector("#drive-summary-sync");
      const driveRebuildButton = section.querySelector("#drive-summary-rebuild-topic-ids");
      const settings = typeof getDriveSummarySettings === "function" ? getDriveSummarySettings() : null;
      if (settings) {
        driveEnabledInput.checked = settings.enabled === true;
        driveClientIdInput.value = settings.clientId || "";
        driveClientSecretInput.value = settings.clientSecret || "";
        driveRefreshTokenInput.value = settings.refreshToken || "";
      }
      syncDriveSummarySettingsUI2?.();
      driveEnabledInput.addEventListener("change", () => {
        persistDriveSummarySettings2?.({ enabled: driveEnabledInput.checked });
        syncDriveSummarySettingsUI2?.();
      });
      driveSaveButton.addEventListener("click", () => {
        persistDriveSummarySettings2?.({
          enabled: driveEnabledInput.checked,
          clientId: driveClientIdInput.value || "",
          clientSecret: driveClientSecretInput.value || "",
          refreshToken: driveRefreshTokenInput.value || ""
        });
        syncDriveSummarySettingsUI2?.();
        createSettingsToast2?.("Drive 设置已保存！", "success", 3e3);
      });
      driveSyncButton.addEventListener("click", () => {
        uploadSummaryHistoryToDrive2?.({ reason: "manual", silent: false });
      });
      driveRebuildButton.addEventListener("click", () => {
        if (typeof rebuildSummaryTopicIdsFromDrive2 === "function") {
          rebuildSummaryTopicIdsFromDrive2({ silent: false });
        } else {
          createSettingsToast2?.("当前版本缺少重建能力，请更新脚本。", "error", 3200);
        }
      });
      section.querySelectorAll(".ld-secret-wrap").forEach((wrap) => bindSecretField(wrap));
    }
    function buildImportExportUI(container) {
      if (!container || container.dataset.importExportInitialized === "true") {
        return;
      }
      container.dataset.importExportInitialized = "true";
      container.classList.add("import-export-sections");
      const section1 = document.createElement("div");
      section1.className = "import-export-section settings-card";
      const originalNodes = Array.from(container.childNodes);
      originalNodes.forEach((node) => section1.appendChild(node));
      container.appendChild(section1);
      const section2 = document.createElement("div");
      section2.className = "import-export-section settings-card";
      section2.innerHTML = `
            <span class="switch-label">2. 已总结内容：</span>
            <p>(文件格式：总结内容 - [LINUX DO] 🌟 主题 & 回复 总结_yyyy-mm-dd.json)</p>
            <input type="file" id="import-summary-file" accept=".json" style="display:none;">
            <div class="button-group">
                <button id="import-summary-button" class="custom-button btn btn-icon-text btn-primary add-button"><span class="button-icon d-icon" aria-hidden="true">📤</span><span class="button-label d-button-label">导入</span></button>
                <button id="export-summary-button" class="custom-button btn btn-icon-text btn-success save-button"><span class="button-icon d-icon" aria-hidden="true">📥</span><span class="button-label d-button-label">导出</span></button>
            </div>
        `;
      container.appendChild(section2);
      const section3 = document.createElement("div");
      section3.className = "import-export-section settings-card";
      section3.innerHTML = `
            <span class="switch-label">3. 脚本配置 + 总结 / 问答 / DeArrow 数据：</span>
            <p>(文件格式：全部数据 - [LINUX DO] 🌟 主题 & 回复 总结_yyyy-mm-dd.json)</p>
            <input type="file" id="import-all-file" accept=".json" style="display:none;">
            <div class="button-group">
                <button id="import-all-button" class="custom-button btn btn-icon-text btn-primary add-button"><span class="button-icon d-icon" aria-hidden="true">📤</span><span class="button-label d-button-label">导入</span></button>
                <button id="export-all-button" class="custom-button btn btn-icon-text btn-success save-button"><span class="button-icon d-icon" aria-hidden="true">📥</span><span class="button-label d-button-label">导出</span></button>
            </div>
        `;
      container.appendChild(section3);
      const importSummaryFile = section2.querySelector("#import-summary-file");
      const importAllFile = section3.querySelector("#import-all-file");
      section2.querySelector("#export-summary-button").addEventListener("click", exportSummaryContent);
      section2.querySelector("#import-summary-button").addEventListener("click", () => importSummaryFile.click());
      importSummaryFile.addEventListener("change", (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          try {
            importSummaryContent(JSON.parse(loadEvent.target.result));
          } catch (error) {
            createToast2?.("导入失败：格式有误", "error");
            console.error(error);
          } finally {
            importSummaryFile.value = "";
          }
        };
        reader.readAsText(file);
      });
      section3.querySelector("#export-all-button").addEventListener("click", exportAllData);
      section3.querySelector("#import-all-button").addEventListener("click", () => importAllFile.click());
      importAllFile.addEventListener("change", (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          try {
            importAllData(JSON.parse(loadEvent.target.result));
          } catch (error) {
            createToast2?.("导入失败：格式有误", "error");
            console.error(error);
          } finally {
            importAllFile.value = "";
          }
        };
        reader.readAsText(file);
      });
    }
    function mountPanels() {
      const importExportTab = document.getElementById("import-export-settings");
      const driveTab = document.getElementById("drive-settings");
      if (importExportTab) {
        buildImportExportUI(importExportTab);
      }
      if (driveTab) {
        buildDriveUI(driveTab);
      }
      return Boolean(importExportTab && driveTab);
    }
    ready(() => {
      if (mountPanels()) {
        return;
      }
      const modalObserver = new MutationObserver((_2, observer) => {
        if (mountPanels()) {
          observer.disconnect();
        }
      });
      modalObserver.observe(document.body, { childList: true, subtree: true });
    });
    return {
      exportSummaryContent,
      exportAllData,
      importAllData,
      importSummaryContent,
      mountPanels
    };
  }

  // src/services/apiClient.js
  function stringifyErrorPayload(payload) {
    if (payload === null || payload === void 0) return "";
    if (typeof payload === "string") return payload;
    try {
      return JSON.stringify(payload, null, 2);
    } catch (_2) {
      return String(payload);
    }
  }
  function getContentFilterFinishReason(result) {
    const choices = Array.isArray(result?.choices) ? result.choices : [];
    const matchedChoice = choices.find((choice) => {
      const finishReason = typeof choice?.finish_reason === "string" ? choice.finish_reason : "";
      return finishReason.toLowerCase().includes("content_filter");
    });
    return typeof matchedChoice?.finish_reason === "string" ? matchedChoice.finish_reason : "";
  }
  async function readResponseText(response) {
    try {
      return await response.text();
    } catch (_2) {
      return "";
    }
  }
  async function requestChatCompletion({
    currentApi,
    messages,
    fetchImpl = fetch
  }) {
    if (!currentApi?.key) {
      throw new Error("API Key is not set.");
    }
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error("Messages are required.");
    }
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${currentApi.key}`
    };
    const data = {
      model: currentApi.model,
      messages,
      stream: false
    };
    const response = await fetchImpl(currentApi.url, {
      method: "POST",
      headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const error2 = new Error(`HTTP error! status: ${response.status}`);
      const responseBody = await readResponseText(response);
      if (responseBody) {
        error2.details = [
          `HTTP status: ${response.status}`,
          "Response body:",
          responseBody
        ].join("\n");
      }
      throw error2;
    }
    const result = await response.json();
    if (result.choices && result.choices.length > 0 && result.choices[0].message) {
      return result.choices[0].message.content;
    }
    const contentFilterFinishReason = getContentFilterFinishReason(result);
    if (contentFilterFinishReason) {
      const error2 = new Error(`模型内容安全策略拦截，未返回内容（${contentFilterFinishReason}）`);
      error2.code = "CONTENT_FILTER_BLOCKED";
      error2.retryable = false;
      error2.details = [
        `Finish reason: ${contentFilterFinishReason}`,
        "Actual response JSON:",
        stringifyErrorPayload(result)
      ].join("\n");
      throw error2;
    }
    const error = new Error("Invalid response format from API");
    error.details = [
      "Expected OpenAI-compatible response shape: choices[0].message.content",
      "Actual response JSON:",
      stringifyErrorPayload(result)
    ].join("\n");
    throw error;
  }
  function buildUserContentWithImages(text, imageInputs = []) {
    const normalizedText = text === null || text === void 0 ? "" : String(text);
    const normalizedImages = Array.isArray(imageInputs) ? imageInputs.map((image) => {
      const url = typeof image?.url === "string" ? image.url.trim() : "";
      if (!url) return null;
      const detail = typeof image?.detail === "string" && image.detail.trim() ? image.detail.trim() : void 0;
      const imageUrl = detail ? { url, detail } : { url };
      return {
        type: "image_url",
        image_url: imageUrl
      };
    }).filter(Boolean) : [];
    if (normalizedImages.length === 0) {
      return normalizedText;
    }
    return [
      { type: "text", text: normalizedText },
      ...normalizedImages
    ];
  }
  async function requestSummaryCompletion({
    currentApi,
    promptConfig,
    txt,
    imageInputs = [],
    fetchImpl = fetch
  }) {
    const systemPrompt = `${promptConfig.summaryMethod}
${promptConfig.outputFormat}`;
    return requestChatCompletion({
      currentApi,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: buildUserContentWithImages(txt, imageInputs) }
      ],
      fetchImpl
    });
  }

  // src/shared/topic.js
  function normalizeTopicIdForTitle(topicId) {
    if (topicId === null || topicId === void 0) return "";
    const normalized = String(topicId).trim();
    return normalized || "";
  }
  function formatToastTopicLabel(topicId, topicTitle) {
    const normalizedTopicId = topicId === null || topicId === void 0 ? "" : String(topicId).trim();
    const fallback = normalizedTopicId ? `话题#${normalizedTopicId}` : "话题";
    const normalizedTitle = typeof topicTitle === "string" ? topicTitle.trim() : "";
    return `📌 ${normalizedTitle || fallback}`;
  }

  // src/shared/summarySync.js
  var DRIVE_TOPIC_SHARD_FILE_NAME_RE = /^topic-(.+)\.json$/;
  function sortSummaryTopicIds(topicIds = []) {
    return Array.from(topicIds).sort((left, right) => {
      const leftNumber = Number(left);
      const rightNumber = Number(right);
      if (Number.isFinite(leftNumber) && Number.isFinite(rightNumber)) {
        return leftNumber - rightNumber;
      }
      return String(left).localeCompare(String(right));
    });
  }
  function shouldAttemptTopicHistoryDrivePull({
    hasLocalHistory = false,
    hasSummaryState = false,
    forceDrivePull = false
  } = {}) {
    return forceDrivePull === true || !hasLocalHistory && hasSummaryState;
  }
  function extractTopicIdFromDriveShardFileName(fileName) {
    const text = typeof fileName === "string" ? fileName.trim() : "";
    if (!text) return "";
    const match = text.match(DRIVE_TOPIC_SHARD_FILE_NAME_RE);
    if (!match) return "";
    return normalizeSummaryTopicId(match[1]);
  }
  function collectDriveRebuildTopicIds({
    indexTopics = {},
    shardTopicIds = [],
    legacyHistoryMap = {}
  } = {}) {
    const topicIds = /* @__PURE__ */ new Set();
    const normalizedIndexTopics = indexTopics && typeof indexTopics === "object" && !Array.isArray(indexTopics) ? indexTopics : {};
    const normalizedShardTopicIds = Array.isArray(shardTopicIds) ? shardTopicIds : shardTopicIds instanceof Set ? Array.from(shardTopicIds) : [];
    const normalizedLegacyHistoryMap = legacyHistoryMap && typeof legacyHistoryMap === "object" && !Array.isArray(legacyHistoryMap) ? legacyHistoryMap : {};
    Object.keys(normalizedIndexTopics).forEach((topicId) => {
      const normalizedTopicId = normalizeSummaryTopicId(topicId);
      if (normalizedTopicId) topicIds.add(normalizedTopicId);
    });
    normalizedShardTopicIds.forEach((topicId) => {
      const normalizedTopicId = normalizeSummaryTopicId(topicId);
      if (normalizedTopicId) topicIds.add(normalizedTopicId);
    });
    Object.keys(normalizedLegacyHistoryMap).forEach((topicId) => {
      const normalizedTopicId = normalizeSummaryTopicId(topicId);
      if (normalizedTopicId) topicIds.add(normalizedTopicId);
    });
    return {
      topicIds: sortSummaryTopicIds(topicIds),
      source: [
        Object.keys(normalizedIndexTopics).length > 0 ? "v2-index" : "",
        normalizedShardTopicIds.length > 0 ? "v2-shards" : "",
        Object.keys(normalizedLegacyHistoryMap).length > 0 ? "legacy" : ""
      ].filter(Boolean).join("+") || "none"
    };
  }
  function collectLegacyDriveMigrationTopicIds({
    indexTopics = {},
    legacyHistoryMap = {}
  } = {}) {
    const normalizedIndexTopics = indexTopics && typeof indexTopics === "object" && !Array.isArray(indexTopics) ? indexTopics : {};
    const normalizedLegacyHistoryMap = legacyHistoryMap && typeof legacyHistoryMap === "object" && !Array.isArray(legacyHistoryMap) ? legacyHistoryMap : {};
    const indexedTopicIds = /* @__PURE__ */ new Set();
    const migrationTopicIds = /* @__PURE__ */ new Set();
    Object.keys(normalizedIndexTopics).forEach((topicId) => {
      const normalizedTopicId = normalizeSummaryTopicId(topicId);
      if (normalizedTopicId) indexedTopicIds.add(normalizedTopicId);
    });
    Object.keys(normalizedLegacyHistoryMap).forEach((topicId) => {
      const normalizedTopicId = normalizeSummaryTopicId(topicId);
      if (!normalizedTopicId || indexedTopicIds.has(normalizedTopicId)) return;
      migrationTopicIds.add(normalizedTopicId);
    });
    return sortSummaryTopicIds(migrationTopicIds);
  }
  function selectUniqueDriveEntryId(entries, {
    itemLabel = "Drive 项目",
    itemName = ""
  } = {}) {
    const normalizedEntries = Array.isArray(entries) ? entries.filter((entry) => entry && typeof entry === "object") : [];
    if (normalizedEntries.length === 0) return null;
    if (normalizedEntries.length === 1) {
      const resolvedId = typeof normalizedEntries[0]?.id === "string" ? normalizedEntries[0].id.trim() : "";
      return resolvedId || null;
    }
    const normalizedLabel = typeof itemLabel === "string" && itemLabel.trim() ? itemLabel.trim() : "Drive 项目";
    const normalizedName = typeof itemName === "string" ? itemName.trim() : "";
    const detail = normalizedName ? `：${normalizedName}` : "";
    throw new Error(`Drive 中存在多个同名${normalizedLabel}${detail}，无法安全确定同步目标。请先清理重复项后再试。`);
  }
  function resolveImportedSidebarSettings(importedSettings = {}, currentSettings = {}) {
    return {
      sidebarWidth: importedSettings?.sidebarWidth ?? currentSettings.sidebarWidth ?? "15%",
      sidebarPosition: importedSettings?.sidebarPosition ?? currentSettings.sidebarPosition ?? "left",
      sidebarTopDistance: importedSettings?.sidebarTopDistance ?? currentSettings.sidebarTopDistance ?? "5%",
      sidebarBottomDistance: importedSettings?.sidebarBottomDistance ?? currentSettings.sidebarBottomDistance ?? "5%"
    };
  }

  // src/stores/dearrowStore.js
  var DEFAULT_DEARROW_SCOPE_URL = "https://linux.do/latest?order=created";
  var DEFAULT_DEARROW_TOP_SCOPE_URL = "https://linux.do/top?ascending=false&order=views";
  var DEFAULT_DEARROW_SCOPE_URLS = Object.freeze([
    DEFAULT_DEARROW_SCOPE_URL,
    DEFAULT_DEARROW_TOP_SCOPE_URL
  ]);
  var DEFAULT_DEARROW_JUDGMENT_PROMPT = [
    "你是论坛标题质量判定器。你只能根据给定的标题判断，不得臆测帖子内容。",
    "如果标题包含明显夸张、误导、刻意制造紧迫/恐慌，或用“震惊”“万万没想到”“这件事”等方式隐去关键信息诱导点击，标记为标题党。",
    "普通的疑问、求助、幽默、简短或主观表达本身不等于标题党。",
    '仅返回严格 JSON：{"results":[{"topicId":"...","verdict":true,"reason":"简短原因"}]}。',
    "每个输入 topicId 必须恰好返回一次。"
  ].join("\n");
  var DEFAULT_DEARROW_REWRITE_PROMPT = [
    "你负责根据论坛主题首帖改写标题。",
    "新标题必须具体、中立、不夸张，直接表达首帖的实际主题。",
    "不得补充首帖不存在的事实；保留重要的技术名称、产品名、版本号和数值。",
    '仅返回严格 JSON：{"title":"单行新标题"}。不要返回 HTML、Markdown 或解释。'
  ].join("\n");
  var defaultDeArrowSettings = Object.freeze({
    dearrowEnabled: false,
    dearrowAutoRewrite: false,
    dearrowJudgmentApiIndex: 0,
    dearrowRewriteApiIndex: 0,
    dearrowJudgmentPrompt: DEFAULT_DEARROW_JUDGMENT_PROMPT,
    dearrowRewritePrompt: DEFAULT_DEARROW_REWRITE_PROMPT,
    dearrowScopeRules: DEFAULT_DEARROW_SCOPE_URLS
  });
  var DEARROW_STATE_FIELDS = Object.freeze({
    verdict: ["verdict", "verdictReason", "verdictModel", "verdictUpdatedAt"],
    rewrite: ["rewrittenTitle", "rewriteModel", "rewrittenAt"]
  });
  function normalizeString(value) {
    if (value === null || value === void 0) return "";
    return String(value).trim();
  }
  function normalizeDeArrowPrompt(value, fallback = "") {
    return normalizeString(value) || normalizeString(fallback);
  }
  function normalizeTopicId(value) {
    return normalizeString(value);
  }
  function normalizeTimestamp(value) {
    const normalized = normalizeString(value);
    if (!normalized) return "";
    const timestamp = Date.parse(normalized);
    return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : "";
  }
  function timestampValue(value) {
    const parsed = Date.parse(value || "");
    return Number.isFinite(parsed) ? parsed : 0;
  }
  function latestTimestamp(...values) {
    let latest = "";
    let latestValue = 0;
    values.forEach((value) => {
      const normalized = normalizeTimestamp(value);
      const parsed = timestampValue(normalized);
      if (parsed > latestValue || parsed === latestValue && normalized > latest) {
        latest = normalized;
        latestValue = parsed;
      }
    });
    return latest;
  }
  function escapeRegExp(value) {
    return String(value).replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
  }
  function stripHash(value) {
    const hashIndex = value.indexOf("#");
    return hashIndex === -1 ? value : value.slice(0, hashIndex);
  }
  function parseScopeRule(rule) {
    const normalized = stripHash(normalizeString(rule));
    if (!normalized) {
      return { ok: false, error: "作用范围 URL 不能为空" };
    }
    const wildcardMarker = "dearrow-wildcard-placeholder";
    let parsed;
    try {
      parsed = new URL(normalized.replaceAll("*", wildcardMarker));
    } catch (_2) {
      return { ok: false, error: `无效的完整 URL：${normalized}` };
    }
    if (parsed.protocol !== "https:" || parsed.hostname !== "linux.do" || parsed.port || parsed.username || parsed.password) {
      return { ok: false, error: `仅支持 https://linux.do 下的 URL：${normalized}` };
    }
    parsed.hash = "";
    return {
      ok: true,
      rule: parsed.href.replaceAll(wildcardMarker, "*")
    };
  }
  function validateDeArrowScopeRules(rawRules) {
    const source = Array.isArray(rawRules) ? rawRules : typeof rawRules === "string" ? rawRules.split(/\r?\n/) : [];
    const rules = [];
    const errors = [];
    const seen = /* @__PURE__ */ new Set();
    source.forEach((rawRule, index) => {
      if (!normalizeString(rawRule)) return;
      const result = parseScopeRule(rawRule);
      if (!result.ok) {
        errors.push({ index, rule: normalizeString(rawRule), message: result.error });
        return;
      }
      if (!seen.has(result.rule)) {
        seen.add(result.rule);
        rules.push(result.rule);
      }
    });
    if (rules.length === 0 && errors.length === 0) {
      errors.push({ index: -1, rule: "", message: "至少需要一条作用范围 URL" });
    }
    return {
      valid: errors.length === 0 && rules.length > 0,
      rules,
      errors
    };
  }
  function normalizeDeArrowScopeRules(rawRules, fallback = defaultDeArrowSettings.dearrowScopeRules) {
    const validated = validateDeArrowScopeRules(rawRules);
    if (validated.valid) return validated.rules;
    const fallbackValidation = validateDeArrowScopeRules(fallback);
    return fallbackValidation.valid ? fallbackValidation.rules : [...DEFAULT_DEARROW_SCOPE_URLS];
  }
  function normalizeDeArrowApiIndex(value, apiConfigurations2 = []) {
    const maxIndex = Array.isArray(apiConfigurations2) && apiConfigurations2.length > 0 ? apiConfigurations2.length - 1 : 0;
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed) || parsed < 0 || parsed > maxIndex) return 0;
    return parsed;
  }
  function normalizeDeArrowSettings(raw = {}, apiConfigurations2 = raw?.apiConfigurations) {
    const source = raw && typeof raw === "object" ? raw : {};
    const legacyApiIndex = source.dearrowApiIndex;
    return {
      dearrowEnabled: source.dearrowEnabled === true,
      dearrowAutoRewrite: source.dearrowAutoRewrite === true,
      dearrowJudgmentApiIndex: normalizeDeArrowApiIndex(
        source.dearrowJudgmentApiIndex ?? legacyApiIndex,
        apiConfigurations2
      ),
      dearrowRewriteApiIndex: normalizeDeArrowApiIndex(
        source.dearrowRewriteApiIndex ?? legacyApiIndex,
        apiConfigurations2
      ),
      dearrowJudgmentPrompt: normalizeDeArrowPrompt(
        source.dearrowJudgmentPrompt,
        defaultDeArrowSettings.dearrowJudgmentPrompt
      ),
      dearrowRewritePrompt: normalizeDeArrowPrompt(
        source.dearrowRewritePrompt,
        defaultDeArrowSettings.dearrowRewritePrompt
      ),
      dearrowScopeRules: normalizeDeArrowScopeRules(source.dearrowScopeRules)
    };
  }
  function compileDeArrowScopeRule(rule) {
    const result = parseScopeRule(rule);
    if (!result.ok) return null;
    const pattern = result.rule.split("*").map(escapeRegExp).join(".*");
    return new RegExp(`^${pattern}$`);
  }
  function normalizeDeArrowPageUrl(value) {
    try {
      const parsed = new URL(String(value || ""));
      if (parsed.protocol !== "https:" || parsed.hostname !== "linux.do" || parsed.port) return "";
      parsed.hash = "";
      return parsed.href;
    } catch (_2) {
      return "";
    }
  }
  function isDeArrowScopeUrl(value, rawRules = defaultDeArrowSettings.dearrowScopeRules) {
    const normalizedUrl = normalizeDeArrowPageUrl(value);
    if (!normalizedUrl) return false;
    const rules = normalizeDeArrowScopeRules(rawRules);
    return rules.some((rule) => compileDeArrowScopeRule(rule)?.test(normalizedUrl) === true);
  }
  function stableSerialize(value) {
    if (value === null || typeof value !== "object") {
      return JSON.stringify(value);
    }
    if (Array.isArray(value)) {
      return `[${value.map(stableSerialize).join(",")}]`;
    }
    const keys = Object.keys(value).sort();
    return `{${keys.map((key) => `${JSON.stringify(key)}:${stableSerialize(value[key])}`).join(",")}}`;
  }
  function normalizeDeArrowTopicState(raw) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
    const originalTitle = normalizeString(raw.originalTitle);
    if (!originalTitle) return null;
    const normalized = { originalTitle };
    if (typeof raw.verdict === "boolean") {
      normalized.verdict = raw.verdict;
      const verdictReason = normalizeString(raw.verdictReason ?? raw.reason);
      const verdictModel = normalizeString(raw.verdictModel);
      const verdictUpdatedAt = normalizeTimestamp(raw.verdictUpdatedAt);
      if (verdictReason) normalized.verdictReason = verdictReason;
      if (verdictModel) normalized.verdictModel = verdictModel;
      if (verdictUpdatedAt) normalized.verdictUpdatedAt = verdictUpdatedAt;
    }
    const rewrittenTitle = normalizeString(raw.rewrittenTitle);
    if (rewrittenTitle) {
      normalized.rewrittenTitle = rewrittenTitle;
      const rewriteModel = normalizeString(raw.rewriteModel ?? raw.rewrittenModel);
      const rewrittenAt = normalizeTimestamp(raw.rewrittenAt);
      if (rewriteModel) normalized.rewriteModel = rewriteModel;
      if (rewrittenAt) normalized.rewrittenAt = rewrittenAt;
    }
    const updatedAt = latestTimestamp(
      raw.updatedAt,
      normalized.verdictUpdatedAt,
      normalized.rewrittenAt
    );
    if (updatedAt) normalized.updatedAt = updatedAt;
    return normalized;
  }
  function normalizeDeArrowTopicStates(raw) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
    const normalized = {};
    Object.entries(raw).forEach(([topicId, state2]) => {
      const id = normalizeTopicId(topicId);
      const nextState = normalizeDeArrowTopicState(state2);
      if (id && nextState) normalized[id] = nextState;
    });
    return normalized;
  }
  function chooseTimedBundle(left, right, field, bundleFields) {
    if (!left) return right;
    if (!right) return left;
    const leftTime = timestampValue(left?.[field]);
    const rightTime = timestampValue(right?.[field]);
    if (leftTime !== rightTime) return rightTime > leftTime ? right : left;
    const leftBundle = {};
    const rightBundle = {};
    bundleFields.forEach((key) => {
      if (left && Object.hasOwn(left, key)) leftBundle[key] = left[key];
      if (right && Object.hasOwn(right, key)) rightBundle[key] = right[key];
    });
    return stableSerialize(rightBundle) > stableSerialize(leftBundle) ? right : left;
  }
  function copyBundle(target, source, fields) {
    fields.forEach((field) => {
      if (source && Object.hasOwn(source, field)) target[field] = source[field];
    });
  }
  function mergeDeArrowTopicState(leftRaw, rightRaw) {
    const left = normalizeDeArrowTopicState(leftRaw);
    const right = normalizeDeArrowTopicState(rightRaw);
    if (!left) return right;
    if (!right) return left;
    if (left.originalTitle !== right.originalTitle) {
      const leftTime = timestampValue(left.updatedAt);
      const rightTime = timestampValue(right.updatedAt);
      if (leftTime !== rightTime) return rightTime > leftTime ? right : left;
      return stableSerialize(right) > stableSerialize(left) ? right : left;
    }
    const merged = { originalTitle: left.originalTitle };
    const verdictSource = chooseTimedBundle(
      typeof left.verdict === "boolean" ? left : null,
      typeof right.verdict === "boolean" ? right : null,
      "verdictUpdatedAt",
      DEARROW_STATE_FIELDS.verdict
    );
    const rewriteSource = chooseTimedBundle(
      left.rewrittenTitle ? left : null,
      right.rewrittenTitle ? right : null,
      "rewrittenAt",
      DEARROW_STATE_FIELDS.rewrite
    );
    copyBundle(merged, verdictSource, DEARROW_STATE_FIELDS.verdict);
    copyBundle(merged, rewriteSource, DEARROW_STATE_FIELDS.rewrite);
    const updatedAt = latestTimestamp(left.updatedAt, right.updatedAt, merged.verdictUpdatedAt, merged.rewrittenAt);
    if (updatedAt) merged.updatedAt = updatedAt;
    return normalizeDeArrowTopicState(merged);
  }
  function mergeDeArrowTopicStates(leftRaw, rightRaw) {
    const left = normalizeDeArrowTopicStates(leftRaw);
    const right = normalizeDeArrowTopicStates(rightRaw);
    const merged = { ...left };
    Object.entries(right).forEach(([topicId, state2]) => {
      merged[topicId] = mergeDeArrowTopicState(merged[topicId], state2);
    });
    return normalizeDeArrowTopicStates(merged);
  }
  function updateDeArrowVerdictState(rawState, {
    originalTitle,
    verdict,
    reason = "",
    model = "",
    timestamp = (/* @__PURE__ */ new Date()).toISOString()
  } = {}) {
    const existing = normalizeDeArrowTopicState(rawState);
    const title = normalizeString(originalTitle || existing?.originalTitle);
    if (!title || typeof verdict !== "boolean") return null;
    const normalizedTimestamp = normalizeTimestamp(timestamp) || (/* @__PURE__ */ new Date()).toISOString();
    const base = existing?.originalTitle === title ? existing : { originalTitle: title };
    return normalizeDeArrowTopicState({
      ...base,
      originalTitle: title,
      verdict,
      verdictReason: normalizeString(reason),
      verdictModel: normalizeString(model),
      verdictUpdatedAt: normalizedTimestamp,
      updatedAt: latestTimestamp(base.updatedAt, normalizedTimestamp)
    });
  }
  function updateDeArrowRewriteState(rawState, {
    originalTitle,
    rewrittenTitle,
    model = "",
    timestamp = (/* @__PURE__ */ new Date()).toISOString()
  } = {}) {
    const existing = normalizeDeArrowTopicState(rawState);
    const title = normalizeString(originalTitle || existing?.originalTitle);
    const rewritten = normalizeString(rewrittenTitle);
    if (!title || !rewritten) return null;
    const normalizedTimestamp = normalizeTimestamp(timestamp) || (/* @__PURE__ */ new Date()).toISOString();
    const base = existing?.originalTitle === title ? existing : { originalTitle: title };
    return normalizeDeArrowTopicState({
      ...base,
      originalTitle: title,
      rewrittenTitle: rewritten,
      rewriteModel: normalizeString(model),
      rewrittenAt: normalizedTimestamp,
      updatedAt: latestTimestamp(base.updatedAt, normalizedTimestamp)
    });
  }

  // node_modules/marked/lib/marked.esm.js
  function z() {
    return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
  }
  var T = z();
  function G(u3) {
    T = u3;
  }
  var _ = { exec: () => null };
  function k(u3, e = "") {
    let t = typeof u3 == "string" ? u3 : u3.source, n = { replace: (r, i) => {
      let s = typeof i == "string" ? i : i.source;
      return s = s.replace(m.caret, "$1"), t = t.replace(r, s), n;
    }, getRegex: () => new RegExp(t, e) };
    return n;
  }
  var Re = (() => {
    try {
      return !!new RegExp("(?<=1)(?<!1)");
    } catch {
      return false;
    }
  })();
  var m = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (u3) => new RegExp(`^( {0,3}${u3})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (u3) => new RegExp(`^ {0,${Math.min(3, u3 - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (u3) => new RegExp(`^ {0,${Math.min(3, u3 - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (u3) => new RegExp(`^ {0,${Math.min(3, u3 - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (u3) => new RegExp(`^ {0,${Math.min(3, u3 - 1)}}#`), htmlBeginRegex: (u3) => new RegExp(`^ {0,${Math.min(3, u3 - 1)}}<(?:[a-z].*>|!--)`, "i"), blockquoteBeginRegex: (u3) => new RegExp(`^ {0,${Math.min(3, u3 - 1)}}>`) };
  var Te = /^(?:[ \t]*(?:\n|$))+/;
  var Oe = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
  var we = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
  var C = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
  var ye = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
  var Q = / {0,3}(?:[*+-]|\d{1,9}[.)])/;
  var ie = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
  var oe = k(ie).replace(/bull/g, Q).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
  var Pe = k(ie).replace(/bull/g, Q).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
  var j = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
  var Se = /^[^\n]+/;
  var F = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/;
  var $e = k(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", F).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
  var Le = k(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Q).getRegex();
  var v = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
  var U = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
  var _e = k("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", U).replace("tag", v).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  var ae = k(j).replace("hr", C).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex();
  var Me = k(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ae).getRegex();
  var K = { blockquote: Me, code: Oe, def: $e, fences: we, heading: ye, hr: C, html: _e, lheading: oe, list: Le, newline: Te, paragraph: ae, table: _, text: Se };
  var re = k("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", C).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex();
  var ze = { ...K, lheading: Pe, table: re, paragraph: k(j).replace("hr", C).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", re).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex() };
  var Ee = { ...K, html: k(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", U).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: _, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: k(j).replace("hr", C).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", oe).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() };
  var Ie = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
  var Ae = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
  var le = /^( {2,}|\\)\n(?!\s*$)/;
  var Ce = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
  var E = /[\p{P}\p{S}]/u;
  var H = /[\s\p{P}\p{S}]/u;
  var W = /[^\s\p{P}\p{S}]/u;
  var Be = k(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, H).getRegex();
  var ue = /(?!~)[\p{P}\p{S}]/u;
  var De = /(?!~)[\s\p{P}\p{S}]/u;
  var qe = /(?:[^\s\p{P}\p{S}]|~)/u;
  var ve = k(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Re ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex();
  var pe = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/;
  var He = k(pe, "u").replace(/punct/g, E).getRegex();
  var Ze = k(pe, "u").replace(/punct/g, ue).getRegex();
  var ce = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
  var Ge = k(ce, "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, E).getRegex();
  var Ne = k(ce, "gu").replace(/notPunctSpace/g, qe).replace(/punctSpace/g, De).replace(/punct/g, ue).getRegex();
  var Qe = k("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, E).getRegex();
  var je = k(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, E).getRegex();
  var Fe = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)";
  var Ue = k(Fe, "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, E).getRegex();
  var Ke = k(/\\(punct)/, "gu").replace(/punct/g, E).getRegex();
  var We = k(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
  var Xe = k(U).replace("(?:-->|$)", "-->").getRegex();
  var Je = k("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Xe).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
  var q = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/;
  var Ve = k(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", q).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
  var he = k(/^!?\[(label)\]\[(ref)\]/).replace("label", q).replace("ref", F).getRegex();
  var ke = k(/^!?\[(ref)\](?:\[\])?/).replace("ref", F).getRegex();
  var Ye = k("reflink|nolink(?!\\()", "g").replace("reflink", he).replace("nolink", ke).getRegex();
  var se = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/;
  var X = { _backpedal: _, anyPunctuation: Ke, autolink: We, blockSkip: ve, br: le, code: Ae, del: _, delLDelim: _, delRDelim: _, emStrongLDelim: He, emStrongRDelimAst: Ge, emStrongRDelimUnd: Qe, escape: Ie, link: Ve, nolink: ke, punctuation: Be, reflink: he, reflinkSearch: Ye, tag: Je, text: Ce, url: _ };
  var et = { ...X, link: k(/^!?\[(label)\]\((.*?)\)/).replace("label", q).getRegex(), reflink: k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", q).getRegex() };
  var N = { ...X, emStrongRDelimAst: Ne, emStrongLDelim: Ze, delLDelim: je, delRDelim: Ue, url: k(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", se).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: k(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", se).getRegex() };
  var tt = { ...N, br: k(le).replace("{2,}", "*").getRegex(), text: k(N.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() };
  var B = { normal: K, gfm: ze, pedantic: Ee };
  var I = { normal: X, gfm: N, breaks: tt, pedantic: et };
  var nt = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  var de = (u3) => nt[u3];
  function O(u3, e) {
    if (e) {
      if (m.escapeTest.test(u3)) return u3.replace(m.escapeReplace, de);
    } else if (m.escapeTestNoEncode.test(u3)) return u3.replace(m.escapeReplaceNoEncode, de);
    return u3;
  }
  function J(u3) {
    try {
      u3 = encodeURI(u3).replace(m.percentDecode, "%");
    } catch {
      return null;
    }
    return u3;
  }
  function V(u3, e) {
    let t = u3.replace(m.findPipe, (i, s, a) => {
      let o = false, l = s;
      for (; --l >= 0 && a[l] === "\\"; ) o = !o;
      return o ? "|" : " |";
    }), n = t.split(m.splitPipe), r = 0;
    if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e) if (n.length > e) n.splice(e);
    else for (; n.length < e; ) n.push("");
    for (; r < n.length; r++) n[r] = n[r].trim().replace(m.slashPipe, "|");
    return n;
  }
  function $(u3, e, t) {
    let n = u3.length;
    if (n === 0) return "";
    let r = 0;
    for (; r < n; ) {
      let i = u3.charAt(n - r - 1);
      if (i === e && !t) r++;
      else if (i !== e && t) r++;
      else break;
    }
    return u3.slice(0, n - r);
  }
  function Y(u3) {
    let e = u3.split(`
`), t = e.length - 1;
    for (; t >= 0 && !e[t].trim(); ) t--;
    return e.length - t <= 2 ? u3 : e.slice(0, t + 1).join(`
`);
  }
  function ge(u3, e) {
    if (u3.indexOf(e[1]) === -1) return -1;
    let t = 0;
    for (let n = 0; n < u3.length; n++) if (u3[n] === "\\") n++;
    else if (u3[n] === e[0]) t++;
    else if (u3[n] === e[1] && (t--, t < 0)) return n;
    return t > 0 ? -2 : -1;
  }
  function fe(u3, e = 0) {
    let t = e, n = "";
    for (let r of u3) if (r === "	") {
      let i = 4 - t % 4;
      n += " ".repeat(i), t += i;
    } else n += r, t++;
    return n;
  }
  function me(u3, e, t, n, r) {
    let i = e.href, s = e.title || null, a = u3[1].replace(r.other.outputLinkReplace, "$1");
    n.state.inLink = true;
    let o = { type: u3[0].charAt(0) === "!" ? "image" : "link", raw: t, href: i, title: s, text: a, tokens: n.inlineTokens(a) };
    return n.state.inLink = false, o;
  }
  function rt(u3, e, t) {
    let n = u3.match(t.other.indentCodeCompensation);
    if (n === null) return e;
    let r = n[1];
    return e.split(`
`).map((i) => {
      let s = i.match(t.other.beginningSpace);
      if (s === null) return i;
      let [a] = s;
      return a.length >= r.length ? i.slice(r.length) : i;
    }).join(`
`);
  }
  var w = class {
    constructor(e) {
      __publicField(this, "options");
      __publicField(this, "rules");
      __publicField(this, "lexer");
      this.options = e || T;
    }
    space(e) {
      let t = this.rules.block.newline.exec(e);
      if (t && t[0].length > 0) return { type: "space", raw: t[0] };
    }
    code(e) {
      let t = this.rules.block.code.exec(e);
      if (t) {
        let n = this.options.pedantic ? t[0] : Y(t[0]), r = n.replace(this.rules.other.codeRemoveIndent, "");
        return { type: "code", raw: n, codeBlockStyle: "indented", text: r };
      }
    }
    fences(e) {
      let t = this.rules.block.fences.exec(e);
      if (t) {
        let n = t[0], r = rt(n, t[3] || "", this.rules);
        return { type: "code", raw: n, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: r };
      }
    }
    heading(e) {
      let t = this.rules.block.heading.exec(e);
      if (t) {
        let n = t[2].trim();
        if (this.rules.other.endingHash.test(n)) {
          let r = $(n, "#");
          (this.options.pedantic || !r || this.rules.other.endingSpaceChar.test(r)) && (n = r.trim());
        }
        return { type: "heading", raw: $(t[0], `
`), depth: t[1].length, text: n, tokens: this.lexer.inline(n) };
      }
    }
    hr(e) {
      let t = this.rules.block.hr.exec(e);
      if (t) return { type: "hr", raw: $(t[0], `
`) };
    }
    blockquote(e) {
      let t = this.rules.block.blockquote.exec(e);
      if (t) {
        let n = $(t[0], `
`).split(`
`), r = "", i = "", s = [];
        for (; n.length > 0; ) {
          let a = false, o = [], l;
          for (l = 0; l < n.length; l++) if (this.rules.other.blockquoteStart.test(n[l])) o.push(n[l]), a = true;
          else if (!a) o.push(n[l]);
          else break;
          n = n.slice(l);
          let p = o.join(`
`), c = p.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
          r = r ? `${r}
${p}` : p, i = i ? `${i}
${c}` : c;
          let d = this.lexer.state.top;
          if (this.lexer.state.top = true, this.lexer.blockTokens(c, s, true), this.lexer.state.top = d, n.length === 0) break;
          let h = s.at(-1);
          if (h?.type === "code") break;
          if (h?.type === "blockquote") {
            let R = h, f = R.raw + `
` + n.join(`
`), S = this.blockquote(f);
            s[s.length - 1] = S, r = r.substring(0, r.length - R.raw.length) + S.raw, i = i.substring(0, i.length - R.text.length) + S.text;
            break;
          } else if (h?.type === "list") {
            let R = h, f = R.raw + `
` + n.join(`
`), S = this.list(f);
            s[s.length - 1] = S, r = r.substring(0, r.length - h.raw.length) + S.raw, i = i.substring(0, i.length - R.raw.length) + S.raw, n = f.substring(s.at(-1).raw.length).split(`
`);
            continue;
          }
        }
        return { type: "blockquote", raw: r, tokens: s, text: i };
      }
    }
    list(e) {
      let t = this.rules.block.list.exec(e);
      if (t) {
        let n = t[1].trim(), r = n.length > 1, i = { type: "list", raw: "", ordered: r, start: r ? +n.slice(0, -1) : "", loose: false, items: [] };
        n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = r ? n : "[*+-]");
        let s = this.rules.other.listItemRegex(n), a = false;
        for (; e; ) {
          let l = false, p = "", c = "";
          if (!(t = s.exec(e)) || this.rules.block.hr.test(e)) break;
          p = t[0], e = e.substring(p.length);
          let d = fe(t[2].split(`
`, 1)[0], t[1].length), h = e.split(`
`, 1)[0], R = !d.trim(), f = 0;
          if (this.options.pedantic ? (f = 2, c = d.trimStart()) : R ? f = t[1].length + 1 : (f = d.search(this.rules.other.nonSpaceChar), f = f > 4 ? 1 : f, c = d.slice(f), f += t[1].length), R && this.rules.other.blankLine.test(h) && (p += h + `
`, e = e.substring(h.length + 1), l = true), !l) {
            let S = this.rules.other.nextBulletRegex(f), ee = this.rules.other.hrRegex(f), te = this.rules.other.fencesBeginRegex(f), ne = this.rules.other.headingBeginRegex(f), xe = this.rules.other.htmlBeginRegex(f), be = this.rules.other.blockquoteBeginRegex(f);
            for (; e; ) {
              let Z = e.split(`
`, 1)[0], A;
              if (h = Z, this.options.pedantic ? (h = h.replace(this.rules.other.listReplaceNesting, "  "), A = h) : A = h.replace(this.rules.other.tabCharGlobal, "    "), te.test(h) || ne.test(h) || xe.test(h) || be.test(h) || S.test(h) || ee.test(h)) break;
              if (A.search(this.rules.other.nonSpaceChar) >= f || !h.trim()) c += `
` + A.slice(f);
              else {
                if (R || d.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || te.test(d) || ne.test(d) || ee.test(d)) break;
                c += `
` + h;
              }
              R = !h.trim(), p += Z + `
`, e = e.substring(Z.length + 1), d = A.slice(f);
            }
          }
          i.loose || (a ? i.loose = true : this.rules.other.doubleBlankLine.test(p) && (a = true)), i.items.push({ type: "list_item", raw: p, task: !!this.options.gfm && this.rules.other.listIsTask.test(c), loose: false, text: c, tokens: [] }), i.raw += p;
        }
        let o = i.items.at(-1);
        if (o) o.raw = o.raw.trimEnd(), o.text = o.text.trimEnd();
        else return;
        i.raw = i.raw.trimEnd();
        for (let l of i.items) {
          if (this.lexer.state.top = false, l.tokens = this.lexer.blockTokens(l.text, []), l.task) {
            if (l.text = l.text.replace(this.rules.other.listReplaceTask, ""), l.tokens[0]?.type === "text" || l.tokens[0]?.type === "paragraph") {
              l.tokens[0].raw = l.tokens[0].raw.replace(this.rules.other.listReplaceTask, ""), l.tokens[0].text = l.tokens[0].text.replace(this.rules.other.listReplaceTask, "");
              for (let c = this.lexer.inlineQueue.length - 1; c >= 0; c--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[c].src)) {
                this.lexer.inlineQueue[c].src = this.lexer.inlineQueue[c].src.replace(this.rules.other.listReplaceTask, "");
                break;
              }
            }
            let p = this.rules.other.listTaskCheckbox.exec(l.raw);
            if (p) {
              let c = { type: "checkbox", raw: p[0] + " ", checked: p[0] !== "[ ]" };
              l.checked = c.checked, i.loose ? l.tokens[0] && ["paragraph", "text"].includes(l.tokens[0].type) && "tokens" in l.tokens[0] && l.tokens[0].tokens ? (l.tokens[0].raw = c.raw + l.tokens[0].raw, l.tokens[0].text = c.raw + l.tokens[0].text, l.tokens[0].tokens.unshift(c)) : l.tokens.unshift({ type: "paragraph", raw: c.raw, text: c.raw, tokens: [c] }) : l.tokens.unshift(c);
            }
          }
          if (!i.loose) {
            let p = l.tokens.filter((d) => d.type === "space"), c = p.length > 0 && p.some((d) => this.rules.other.anyLine.test(d.raw));
            i.loose = c;
          }
        }
        if (i.loose) for (let l of i.items) {
          l.loose = true;
          for (let p of l.tokens) p.type === "text" && (p.type = "paragraph");
        }
        return i;
      }
    }
    html(e) {
      let t = this.rules.block.html.exec(e);
      if (t) {
        let n = Y(t[0]);
        return { type: "html", block: true, raw: n, pre: t[1] === "pre" || t[1] === "script" || t[1] === "style", text: n };
      }
    }
    def(e) {
      let t = this.rules.block.def.exec(e);
      if (t) {
        let n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
        return { type: "def", tag: n, raw: $(t[0], `
`), href: r, title: i };
      }
    }
    table(e) {
      let t = this.rules.block.table.exec(e);
      if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
      let n = V(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], s = { type: "table", raw: $(t[0], `
`), header: [], align: [], rows: [] };
      if (n.length === r.length) {
        for (let a of r) this.rules.other.tableAlignRight.test(a) ? s.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? s.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? s.align.push("left") : s.align.push(null);
        for (let a = 0; a < n.length; a++) s.header.push({ text: n[a], tokens: this.lexer.inline(n[a]), header: true, align: s.align[a] });
        for (let a of i) s.rows.push(V(a, s.header.length).map((o, l) => ({ text: o, tokens: this.lexer.inline(o), header: false, align: s.align[l] })));
        return s;
      }
    }
    lheading(e) {
      let t = this.rules.block.lheading.exec(e);
      if (t) {
        let n = t[1].trim();
        return { type: "heading", raw: $(t[0], `
`), depth: t[2].charAt(0) === "=" ? 1 : 2, text: n, tokens: this.lexer.inline(n) };
      }
    }
    paragraph(e) {
      let t = this.rules.block.paragraph.exec(e);
      if (t) {
        let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
        return { type: "paragraph", raw: t[0], text: n, tokens: this.lexer.inline(n) };
      }
    }
    text(e) {
      let t = this.rules.block.text.exec(e);
      if (t) return { type: "text", raw: t[0], text: t[0], tokens: this.lexer.inline(t[0]) };
    }
    escape(e) {
      let t = this.rules.inline.escape.exec(e);
      if (t) return { type: "escape", raw: t[0], text: t[1] };
    }
    tag(e) {
      let t = this.rules.inline.tag.exec(e);
      if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t[0] };
    }
    link(e) {
      let t = this.rules.inline.link.exec(e);
      if (t) {
        let n = t[2].trim();
        if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
          if (!this.rules.other.endAngleBracket.test(n)) return;
          let s = $(n.slice(0, -1), "\\");
          if ((n.length - s.length) % 2 === 0) return;
        } else {
          let s = ge(t[2], "()");
          if (s === -2) return;
          if (s > -1) {
            let o = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + s;
            t[2] = t[2].substring(0, s), t[0] = t[0].substring(0, o).trim(), t[3] = "";
          }
        }
        let r = t[2], i = "";
        if (this.options.pedantic) {
          let s = this.rules.other.pedanticHrefTitle.exec(r);
          s && (r = s[1], i = s[3]);
        } else i = t[3] ? t[3].slice(1, -1) : "";
        return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? r = r.slice(1) : r = r.slice(1, -1)), me(t, { href: r && r.replace(this.rules.inline.anyPunctuation, "$1"), title: i && i.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
      }
    }
    reflink(e, t) {
      let n;
      if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
        let r = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = t[r.toLowerCase()];
        if (!i) {
          let s = n[0].charAt(0);
          return { type: "text", raw: s, text: s };
        }
        return me(n, i, n[0], this.lexer, this.rules);
      }
    }
    emStrong(e, t, n = "") {
      let r = this.rules.inline.emStrongLDelim.exec(e);
      if (!r || !r[1] && !r[2] && !r[3] && !r[4] || r[4] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
      if (!(r[1] || r[3] || "") || !n || this.rules.inline.punctuation.exec(n)) {
        let s = [...r[0]].length - 1, a, o, l = s, p = 0, c = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
        for (c.lastIndex = 0, t = t.slice(-1 * e.length + s); (r = c.exec(t)) !== null; ) {
          if (a = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !a) continue;
          if (o = [...a].length, r[3] || r[4]) {
            l += o;
            continue;
          } else if ((r[5] || r[6]) && s % 3 && !((s + o) % 3)) {
            p += o;
            continue;
          }
          if (l -= o, l > 0) continue;
          o = Math.min(o, o + l + p);
          let d = [...r[0]][0].length, h = e.slice(0, s + r.index + d + o);
          if (Math.min(s, o) % 2) {
            let f = h.slice(1, -1);
            return { type: "em", raw: h, text: f, tokens: this.lexer.inlineTokens(f) };
          }
          let R = h.slice(2, -2);
          return { type: "strong", raw: h, text: R, tokens: this.lexer.inlineTokens(R) };
        }
      }
    }
    codespan(e) {
      let t = this.rules.inline.code.exec(e);
      if (t) {
        let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), r = this.rules.other.nonSpaceChar.test(n), i = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
        return r && i && (n = n.substring(1, n.length - 1)), { type: "codespan", raw: t[0], text: n };
      }
    }
    br(e) {
      let t = this.rules.inline.br.exec(e);
      if (t) return { type: "br", raw: t[0] };
    }
    del(e, t, n = "") {
      let r = this.rules.inline.delLDelim.exec(e);
      if (!r) return;
      if (!(r[1] || "") || !n || this.rules.inline.punctuation.exec(n)) {
        let s = [...r[0]].length - 1, a, o, l = s, p = this.rules.inline.delRDelim;
        for (p.lastIndex = 0, t = t.slice(-1 * e.length + s); (r = p.exec(t)) !== null; ) {
          if (a = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !a || (o = [...a].length, o !== s)) continue;
          if (r[3] || r[4]) {
            l += o;
            continue;
          }
          if (l -= o, l > 0) continue;
          o = Math.min(o, o + l);
          let c = [...r[0]][0].length, d = e.slice(0, s + r.index + c + o), h = d.slice(s, -s);
          return { type: "del", raw: d, text: h, tokens: this.lexer.inlineTokens(h) };
        }
      }
    }
    autolink(e) {
      let t = this.rules.inline.autolink.exec(e);
      if (t) {
        let n, r;
        return t[2] === "@" ? (n = t[1], r = "mailto:" + n) : (n = t[1], r = n), { type: "link", raw: t[0], text: n, href: r, tokens: [{ type: "text", raw: n, text: n }] };
      }
    }
    url(e) {
      let t;
      if (t = this.rules.inline.url.exec(e)) {
        let n, r;
        if (t[2] === "@") n = t[0], r = "mailto:" + n;
        else {
          let i;
          do
            i = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
          while (i !== t[0]);
          n = t[0], t[1] === "www." ? r = "http://" + t[0] : r = t[0];
        }
        return { type: "link", raw: t[0], text: n, href: r, tokens: [{ type: "text", raw: n, text: n }] };
      }
    }
    inlineText(e) {
      let t = this.rules.inline.text.exec(e);
      if (t) {
        let n = this.lexer.state.inRawBlock;
        return { type: "text", raw: t[0], text: t[0], escaped: n };
      }
    }
  };
  var x = class u {
    constructor(e) {
      __publicField(this, "tokens");
      __publicField(this, "options");
      __publicField(this, "state");
      __publicField(this, "inlineQueue");
      __publicField(this, "tokenizer");
      this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || T, this.options.tokenizer = this.options.tokenizer || new w(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
      let t = { other: m, block: B.normal, inline: I.normal };
      this.options.pedantic ? (t.block = B.pedantic, t.inline = I.pedantic) : this.options.gfm && (t.block = B.gfm, this.options.breaks ? t.inline = I.breaks : t.inline = I.gfm), this.tokenizer.rules = t;
    }
    static get rules() {
      return { block: B, inline: I };
    }
    static lex(e, t) {
      return new u(t).lex(e);
    }
    static lexInline(e, t) {
      return new u(t).inlineTokens(e);
    }
    lex(e) {
      e = e.replace(m.carriageReturn, `
`), this.blockTokens(e, this.tokens);
      for (let t = 0; t < this.inlineQueue.length; t++) {
        let n = this.inlineQueue[t];
        this.inlineTokens(n.src, n.tokens);
      }
      return this.inlineQueue = [], this.tokens;
    }
    blockTokens(e, t = [], n = false) {
      for (this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(m.tabCharGlobal, "    ").replace(m.spaceLine, "")); e; ) {
        let r;
        if (this.options.extensions?.block?.some((s) => (r = s.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), true) : false)) continue;
        if (r = this.tokenizer.space(e)) {
          e = e.substring(r.raw.length);
          let s = t.at(-1);
          r.raw.length === 1 && s !== void 0 ? s.raw += `
` : t.push(r);
          continue;
        }
        if (r = this.tokenizer.code(e)) {
          e = e.substring(r.raw.length);
          let s = t.at(-1);
          s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.at(-1).src = s.text) : t.push(r);
          continue;
        }
        if (r = this.tokenizer.fences(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.heading(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.hr(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.blockquote(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.list(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.html(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.def(e)) {
          e = e.substring(r.raw.length);
          let s = t.at(-1);
          s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.raw, this.inlineQueue.at(-1).src = s.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = { href: r.href, title: r.title }, t.push(r));
          continue;
        }
        if (r = this.tokenizer.table(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.lheading(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        let i = e;
        if (this.options.extensions?.startBlock) {
          let s = 1 / 0, a = e.slice(1), o;
          this.options.extensions.startBlock.forEach((l) => {
            o = l.call({ lexer: this }, a), typeof o == "number" && o >= 0 && (s = Math.min(s, o));
          }), s < 1 / 0 && s >= 0 && (i = e.substring(0, s + 1));
        }
        if (this.state.top && (r = this.tokenizer.paragraph(i))) {
          let s = t.at(-1);
          n && s?.type === "paragraph" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r), n = i.length !== e.length, e = e.substring(r.raw.length);
          continue;
        }
        if (r = this.tokenizer.text(e)) {
          e = e.substring(r.raw.length);
          let s = t.at(-1);
          s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r);
          continue;
        }
        if (e) {
          let s = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(s);
            break;
          } else throw new Error(s);
        }
      }
      return this.state.top = true, t;
    }
    inline(e, t = []) {
      return this.inlineQueue.push({ src: e, tokens: t }), t;
    }
    inlineTokens(e, t = []) {
      this.tokenizer.lexer = this;
      let n = e, r = null;
      if (this.tokens.links) {
        let o = Object.keys(this.tokens.links);
        if (o.length > 0) for (; (r = this.tokenizer.rules.inline.reflinkSearch.exec(n)) !== null; ) o.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) && (n = n.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
      }
      for (; (r = this.tokenizer.rules.inline.anyPunctuation.exec(n)) !== null; ) n = n.slice(0, r.index) + "++" + n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
      let i;
      for (; (r = this.tokenizer.rules.inline.blockSkip.exec(n)) !== null; ) i = r[2] ? r[2].length : 0, n = n.slice(0, r.index + i) + "[" + "a".repeat(r[0].length - i - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
      let s = false, a = "";
      for (; e; ) {
        s || (a = ""), s = false;
        let o;
        if (this.options.extensions?.inline?.some((p) => (o = p.call({ lexer: this }, e, t)) ? (e = e.substring(o.raw.length), t.push(o), true) : false)) continue;
        if (o = this.tokenizer.escape(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.tag(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.link(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.reflink(e, this.tokens.links)) {
          e = e.substring(o.raw.length);
          let p = t.at(-1);
          o.type === "text" && p?.type === "text" ? (p.raw += o.raw, p.text += o.text) : t.push(o);
          continue;
        }
        if (o = this.tokenizer.emStrong(e, n, a)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.codespan(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.br(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.del(e, n, a)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.autolink(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (!this.state.inLink && (o = this.tokenizer.url(e))) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        let l = e;
        if (this.options.extensions?.startInline) {
          let p = 1 / 0, c = e.slice(1), d;
          this.options.extensions.startInline.forEach((h) => {
            d = h.call({ lexer: this }, c), typeof d == "number" && d >= 0 && (p = Math.min(p, d));
          }), p < 1 / 0 && p >= 0 && (l = e.substring(0, p + 1));
        }
        if (o = this.tokenizer.inlineText(l)) {
          e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (a = o.raw.slice(-1)), s = true;
          let p = t.at(-1);
          p?.type === "text" ? (p.raw += o.raw, p.text += o.text) : t.push(o);
          continue;
        }
        if (e) {
          let p = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(p);
            break;
          } else throw new Error(p);
        }
      }
      return t;
    }
  };
  var y = class {
    constructor(e) {
      __publicField(this, "options");
      __publicField(this, "parser");
      this.options = e || T;
    }
    space(e) {
      return "";
    }
    code({ text: e, lang: t, escaped: n }) {
      let r = (t || "").match(m.notSpaceStart)?.[0], i = e.replace(m.endingNewline, "") + `
`;
      return r ? '<pre><code class="language-' + O(r) + '">' + (n ? i : O(i, true)) + `</code></pre>
` : "<pre><code>" + (n ? i : O(i, true)) + `</code></pre>
`;
    }
    blockquote({ tokens: e }) {
      return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
    }
    html({ text: e }) {
      return e;
    }
    def(e) {
      return "";
    }
    heading({ tokens: e, depth: t }) {
      return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
    }
    hr(e) {
      return `<hr>
`;
    }
    list(e) {
      let t = e.ordered, n = e.start, r = "";
      for (let a = 0; a < e.items.length; a++) {
        let o = e.items[a];
        r += this.listitem(o);
      }
      let i = t ? "ol" : "ul", s = t && n !== 1 ? ' start="' + n + '"' : "";
      return "<" + i + s + `>
` + r + "</" + i + `>
`;
    }
    listitem(e) {
      return `<li>${this.parser.parse(e.tokens)}</li>
`;
    }
    checkbox({ checked: e }) {
      return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
    }
    paragraph({ tokens: e }) {
      return `<p>${this.parser.parseInline(e)}</p>
`;
    }
    table(e) {
      let t = "", n = "";
      for (let i = 0; i < e.header.length; i++) n += this.tablecell(e.header[i]);
      t += this.tablerow({ text: n });
      let r = "";
      for (let i = 0; i < e.rows.length; i++) {
        let s = e.rows[i];
        n = "";
        for (let a = 0; a < s.length; a++) n += this.tablecell(s[a]);
        r += this.tablerow({ text: n });
      }
      return r && (r = `<tbody>${r}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + r + `</table>
`;
    }
    tablerow({ text: e }) {
      return `<tr>
${e}</tr>
`;
    }
    tablecell(e) {
      let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
      return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
    }
    strong({ tokens: e }) {
      return `<strong>${this.parser.parseInline(e)}</strong>`;
    }
    em({ tokens: e }) {
      return `<em>${this.parser.parseInline(e)}</em>`;
    }
    codespan({ text: e }) {
      return `<code>${O(e, true)}</code>`;
    }
    br(e) {
      return "<br>";
    }
    del({ tokens: e }) {
      return `<del>${this.parser.parseInline(e)}</del>`;
    }
    link({ href: e, title: t, tokens: n }) {
      let r = this.parser.parseInline(n), i = J(e);
      if (i === null) return r;
      e = i;
      let s = '<a href="' + e + '"';
      return t && (s += ' title="' + O(t) + '"'), s += ">" + r + "</a>", s;
    }
    image({ href: e, title: t, text: n, tokens: r }) {
      r && (n = this.parser.parseInline(r, this.parser.textRenderer));
      let i = J(e);
      if (i === null) return O(n);
      e = i;
      let s = `<img src="${e}" alt="${O(n)}"`;
      return t && (s += ` title="${O(t)}"`), s += ">", s;
    }
    text(e) {
      return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : O(e.text);
    }
  };
  var L = class {
    strong({ text: e }) {
      return e;
    }
    em({ text: e }) {
      return e;
    }
    codespan({ text: e }) {
      return e;
    }
    del({ text: e }) {
      return e;
    }
    html({ text: e }) {
      return e;
    }
    text({ text: e }) {
      return e;
    }
    link({ text: e }) {
      return "" + e;
    }
    image({ text: e }) {
      return "" + e;
    }
    br() {
      return "";
    }
    checkbox({ raw: e }) {
      return e;
    }
  };
  var b = class u2 {
    constructor(e) {
      __publicField(this, "options");
      __publicField(this, "renderer");
      __publicField(this, "textRenderer");
      this.options = e || T, this.options.renderer = this.options.renderer || new y(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new L();
    }
    static parse(e, t) {
      return new u2(t).parse(e);
    }
    static parseInline(e, t) {
      return new u2(t).parseInline(e);
    }
    parse(e) {
      this.renderer.parser = this;
      let t = "";
      for (let n = 0; n < e.length; n++) {
        let r = e[n];
        if (this.options.extensions?.renderers?.[r.type]) {
          let s = r, a = this.options.extensions.renderers[s.type].call({ parser: this }, s);
          if (a !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(s.type)) {
            t += a || "";
            continue;
          }
        }
        let i = r;
        switch (i.type) {
          case "space": {
            t += this.renderer.space(i);
            break;
          }
          case "hr": {
            t += this.renderer.hr(i);
            break;
          }
          case "heading": {
            t += this.renderer.heading(i);
            break;
          }
          case "code": {
            t += this.renderer.code(i);
            break;
          }
          case "table": {
            t += this.renderer.table(i);
            break;
          }
          case "blockquote": {
            t += this.renderer.blockquote(i);
            break;
          }
          case "list": {
            t += this.renderer.list(i);
            break;
          }
          case "checkbox": {
            t += this.renderer.checkbox(i);
            break;
          }
          case "html": {
            t += this.renderer.html(i);
            break;
          }
          case "def": {
            t += this.renderer.def(i);
            break;
          }
          case "paragraph": {
            t += this.renderer.paragraph(i);
            break;
          }
          case "text": {
            t += this.renderer.text(i);
            break;
          }
          default: {
            let s = 'Token with "' + i.type + '" type was not found.';
            if (this.options.silent) return console.error(s), "";
            throw new Error(s);
          }
        }
      }
      return t;
    }
    parseInline(e, t = this.renderer) {
      this.renderer.parser = this;
      let n = "";
      for (let r = 0; r < e.length; r++) {
        let i = e[r];
        if (this.options.extensions?.renderers?.[i.type]) {
          let a = this.options.extensions.renderers[i.type].call({ parser: this }, i);
          if (a !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type)) {
            n += a || "";
            continue;
          }
        }
        let s = i;
        switch (s.type) {
          case "escape": {
            n += t.text(s);
            break;
          }
          case "html": {
            n += t.html(s);
            break;
          }
          case "link": {
            n += t.link(s);
            break;
          }
          case "image": {
            n += t.image(s);
            break;
          }
          case "checkbox": {
            n += t.checkbox(s);
            break;
          }
          case "strong": {
            n += t.strong(s);
            break;
          }
          case "em": {
            n += t.em(s);
            break;
          }
          case "codespan": {
            n += t.codespan(s);
            break;
          }
          case "br": {
            n += t.br(s);
            break;
          }
          case "del": {
            n += t.del(s);
            break;
          }
          case "text": {
            n += t.text(s);
            break;
          }
          default: {
            let a = 'Token with "' + s.type + '" type was not found.';
            if (this.options.silent) return console.error(a), "";
            throw new Error(a);
          }
        }
      }
      return n;
    }
  };
  var _a;
  var P = (_a = class {
    constructor(e) {
      __publicField(this, "options");
      __publicField(this, "block");
      this.options = e || T;
    }
    preprocess(e) {
      return e;
    }
    postprocess(e) {
      return e;
    }
    processAllTokens(e) {
      return e;
    }
    emStrongMask(e) {
      return e;
    }
    provideLexer(e = this.block) {
      return e ? x.lex : x.lexInline;
    }
    provideParser(e = this.block) {
      return e ? b.parse : b.parseInline;
    }
  }, __publicField(_a, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), __publicField(_a, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), _a);
  var D = class {
    constructor(...e) {
      __publicField(this, "defaults", z());
      __publicField(this, "options", this.setOptions);
      __publicField(this, "parse", this.parseMarkdown(true));
      __publicField(this, "parseInline", this.parseMarkdown(false));
      __publicField(this, "Parser", b);
      __publicField(this, "Renderer", y);
      __publicField(this, "TextRenderer", L);
      __publicField(this, "Lexer", x);
      __publicField(this, "Tokenizer", w);
      __publicField(this, "Hooks", P);
      this.use(...e);
    }
    walkTokens(e, t) {
      let n = [];
      for (let r of e) switch (n = n.concat(t.call(this, r)), r.type) {
        case "table": {
          let i = r;
          for (let s of i.header) n = n.concat(this.walkTokens(s.tokens, t));
          for (let s of i.rows) for (let a of s) n = n.concat(this.walkTokens(a.tokens, t));
          break;
        }
        case "list": {
          let i = r;
          n = n.concat(this.walkTokens(i.items, t));
          break;
        }
        default: {
          let i = r;
          this.defaults.extensions?.childTokens?.[i.type] ? this.defaults.extensions.childTokens[i.type].forEach((s) => {
            let a = i[s].flat(1 / 0);
            n = n.concat(this.walkTokens(a, t));
          }) : i.tokens && (n = n.concat(this.walkTokens(i.tokens, t)));
        }
      }
      return n;
    }
    use(...e) {
      let t = this.defaults.extensions || { renderers: {}, childTokens: {} };
      return e.forEach((n) => {
        let r = { ...n };
        if (r.async = this.defaults.async || r.async || false, n.extensions && (n.extensions.forEach((i) => {
          if (!i.name) throw new Error("extension name required");
          if ("renderer" in i) {
            let s = t.renderers[i.name];
            s ? t.renderers[i.name] = function(...a) {
              let o = i.renderer.apply(this, a);
              return o === false && (o = s.apply(this, a)), o;
            } : t.renderers[i.name] = i.renderer;
          }
          if ("tokenizer" in i) {
            if (!i.level || i.level !== "block" && i.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
            let s = t[i.level];
            s ? s.unshift(i.tokenizer) : t[i.level] = [i.tokenizer], i.start && (i.level === "block" ? t.startBlock ? t.startBlock.push(i.start) : t.startBlock = [i.start] : i.level === "inline" && (t.startInline ? t.startInline.push(i.start) : t.startInline = [i.start]));
          }
          "childTokens" in i && i.childTokens && (t.childTokens[i.name] = i.childTokens);
        }), r.extensions = t), n.renderer) {
          let i = this.defaults.renderer || new y(this.defaults);
          for (let s in n.renderer) {
            if (!(s in i)) throw new Error(`renderer '${s}' does not exist`);
            if (["options", "parser"].includes(s)) continue;
            let a = s, o = n.renderer[a], l = i[a];
            i[a] = (...p) => {
              let c = o.apply(i, p);
              return c === false && (c = l.apply(i, p)), c || "";
            };
          }
          r.renderer = i;
        }
        if (n.tokenizer) {
          let i = this.defaults.tokenizer || new w(this.defaults);
          for (let s in n.tokenizer) {
            if (!(s in i)) throw new Error(`tokenizer '${s}' does not exist`);
            if (["options", "rules", "lexer"].includes(s)) continue;
            let a = s, o = n.tokenizer[a], l = i[a];
            i[a] = (...p) => {
              let c = o.apply(i, p);
              return c === false && (c = l.apply(i, p)), c;
            };
          }
          r.tokenizer = i;
        }
        if (n.hooks) {
          let i = this.defaults.hooks || new P();
          for (let s in n.hooks) {
            if (!(s in i)) throw new Error(`hook '${s}' does not exist`);
            if (["options", "block"].includes(s)) continue;
            let a = s, o = n.hooks[a], l = i[a];
            P.passThroughHooks.has(s) ? i[a] = (p) => {
              if (this.defaults.async && P.passThroughHooksRespectAsync.has(s)) return (async () => {
                let d = await o.call(i, p);
                return l.call(i, d);
              })();
              let c = o.call(i, p);
              return l.call(i, c);
            } : i[a] = (...p) => {
              if (this.defaults.async) return (async () => {
                let d = await o.apply(i, p);
                return d === false && (d = await l.apply(i, p)), d;
              })();
              let c = o.apply(i, p);
              return c === false && (c = l.apply(i, p)), c;
            };
          }
          r.hooks = i;
        }
        if (n.walkTokens) {
          let i = this.defaults.walkTokens, s = n.walkTokens;
          r.walkTokens = function(a) {
            let o = [];
            return o.push(s.call(this, a)), i && (o = o.concat(i.call(this, a))), o;
          };
        }
        this.defaults = { ...this.defaults, ...r };
      }), this;
    }
    setOptions(e) {
      return this.defaults = { ...this.defaults, ...e }, this;
    }
    lexer(e, t) {
      return x.lex(e, t ?? this.defaults);
    }
    parser(e, t) {
      return b.parse(e, t ?? this.defaults);
    }
    parseMarkdown(e) {
      return (n, r) => {
        let i = { ...r }, s = { ...this.defaults, ...i }, a = this.onError(!!s.silent, !!s.async);
        if (this.defaults.async === true && i.async === false) return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
        if (typeof n > "u" || n === null) return a(new Error("marked(): input parameter is undefined or null"));
        if (typeof n != "string") return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
        if (s.hooks && (s.hooks.options = s, s.hooks.block = e), s.async) return (async () => {
          let o = s.hooks ? await s.hooks.preprocess(n) : n, p = await (s.hooks ? await s.hooks.provideLexer(e) : e ? x.lex : x.lexInline)(o, s), c = s.hooks ? await s.hooks.processAllTokens(p) : p;
          s.walkTokens && await Promise.all(this.walkTokens(c, s.walkTokens));
          let h = await (s.hooks ? await s.hooks.provideParser(e) : e ? b.parse : b.parseInline)(c, s);
          return s.hooks ? await s.hooks.postprocess(h) : h;
        })().catch(a);
        try {
          s.hooks && (n = s.hooks.preprocess(n));
          let l = (s.hooks ? s.hooks.provideLexer(e) : e ? x.lex : x.lexInline)(n, s);
          s.hooks && (l = s.hooks.processAllTokens(l)), s.walkTokens && this.walkTokens(l, s.walkTokens);
          let c = (s.hooks ? s.hooks.provideParser(e) : e ? b.parse : b.parseInline)(l, s);
          return s.hooks && (c = s.hooks.postprocess(c)), c;
        } catch (o) {
          return a(o);
        }
      };
    }
    onError(e, t) {
      return (n) => {
        if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
          let r = "<p>An error occurred:</p><pre>" + O(n.message + "", true) + "</pre>";
          return t ? Promise.resolve(r) : r;
        }
        if (t) return Promise.reject(n);
        throw n;
      };
    }
  };
  var M = new D();
  function g(u3, e) {
    return M.parse(u3, e);
  }
  g.options = g.setOptions = function(u3) {
    return M.setOptions(u3), g.defaults = M.defaults, G(g.defaults), g;
  };
  g.getDefaults = z;
  g.defaults = T;
  g.use = function(...u3) {
    return M.use(...u3), g.defaults = M.defaults, G(g.defaults), g;
  };
  g.walkTokens = function(u3, e) {
    return M.walkTokens(u3, e);
  };
  g.parseInline = M.parseInline;
  g.Parser = b;
  g.parser = b.parse;
  g.Renderer = y;
  g.TextRenderer = L;
  g.Lexer = x;
  g.lexer = x.lex;
  g.Tokenizer = w;
  g.Hooks = P;
  g.parse = g;
  var jt = g.options;
  var Ft = g.setOptions;
  var Ut = g.use;
  var Kt = g.walkTokens;
  var Wt = g.parseInline;
  var Jt = b.parse;
  var Vt = x.lex;

  // src/features/historyState/index.js
  var SUMMARY_HISTORY_STORAGE_KEY = "summaryHistory";
  var SUMMARY_HISTORY_CACHE_MAX_AGE_MS = 3e4;
  function createHistoryStateFeature({
    GM_getValue: GM_getValue2,
    GM_setValue: GM_setValue2,
    getSummaryOutputFilters,
    getPromptConfigurations,
    getCurrentPromptIndex,
    getCurrentApiConfiguration: getCurrentApiConfiguration2,
    setSummaryElementHtml: setSummaryElementHtml2
  } = {}) {
    let summaryHistoryCacheMap = null;
    let summaryHistoryCacheUpdatedAt = 0;
    function getSummaryHistoryMapSnapshot2(options = {}) {
      const force = options.force === true;
      const maxAgeMs = Number.isFinite(options.maxAgeMs) ? Math.max(0, Number(options.maxAgeMs)) : SUMMARY_HISTORY_CACHE_MAX_AGE_MS;
      const now = Date.now();
      const cacheExpired = now - summaryHistoryCacheUpdatedAt > maxAgeMs;
      if (force || !summaryHistoryCacheMap || cacheExpired) {
        const stored = GM_getValue2(SUMMARY_HISTORY_STORAGE_KEY, {});
        summaryHistoryCacheMap = normalizeSummaryHistoryMapForStorage(stored);
        summaryHistoryCacheUpdatedAt = Date.now();
      }
      return summaryHistoryCacheMap;
    }
    function setSummaryHistoryMapSnapshot2(historyMap) {
      const normalized = normalizeSummaryHistoryMapForStorage(historyMap);
      summaryHistoryCacheMap = normalized;
      summaryHistoryCacheUpdatedAt = Date.now();
      GM_setValue2(SUMMARY_HISTORY_STORAGE_KEY, normalized);
      return normalized;
    }
    function getSummaryHistory2(topicId) {
      const normalizedTopicId = normalizeSummaryTopicId(topicId);
      if (!normalizedTopicId) return [];
      const historyMap = getSummaryHistoryMapSnapshot2();
      return historyMap[normalizedTopicId] || [];
    }
    function getPromptSummaryRenderMode(promptConfig) {
      return normalizeSummaryRenderMode(promptConfig?.outputFormat, "html") || "html";
    }
    function getCurrentSummaryRenderMode() {
      const promptConfigurations2 = typeof getPromptConfigurations === "function" ? getPromptConfigurations() : [];
      const currentPromptIndex2 = typeof getCurrentPromptIndex === "function" ? getCurrentPromptIndex() : 0;
      return getPromptSummaryRenderMode(promptConfigurations2[currentPromptIndex2]);
    }
    function resolveSummaryRenderMode2(renderMode, rawSummary) {
      return normalizeSummaryRenderMode(renderMode, "") || inferSummaryRenderModeFromSummary(rawSummary, "html");
    }
    function captureCurrentSummaryRequestContext2() {
      const currentApi = typeof getCurrentApiConfiguration2 === "function" ? getCurrentApiConfiguration2() : null;
      return {
        model: currentApi?.model ?? "未知模型",
        renderMode: getCurrentSummaryRenderMode()
      };
    }
    function escapeRegExp2(value) {
      return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function applySummaryOutputFilters(text) {
      if (text === null || text === void 0) return "";
      const rawText = String(text);
      const filterConfig = normalizeSummaryOutputFilters(
        typeof getSummaryOutputFilters === "function" ? getSummaryOutputFilters() : null
      );
      if (!filterConfig.enabled) return rawText;
      let output = rawText;
      filterConfig.leadingTokens.forEach((token) => {
        if (!token) return;
        const pattern = new RegExp(`^\\s*${escapeRegExp2(token)}\\s*`, "i");
        output = output.replace(pattern, "");
      });
      filterConfig.trailingTokens.forEach((token) => {
        if (!token) return;
        const pattern = new RegExp(`\\s*${escapeRegExp2(token)}\\s*$`, "i");
        output = output.replace(pattern, "");
      });
      return output;
    }
    function renderSummaryMarkup(rawSummary, options = {}) {
      const filteredSummary = applySummaryOutputFilters(rawSummary);
      if (!filteredSummary) {
        return options.emptyHtml || "";
      }
      const renderMode = resolveSummaryRenderMode2(options.renderMode, filteredSummary);
      if (renderMode === "markdown") {
        return `<div class="markdown-content">${g.parse(filteredSummary)}</div>`;
      }
      return filteredSummary;
    }
    function updateSummaryHtml2(target, html, options = {}) {
      if (!target) return false;
      const nextHtml = html === null || html === void 0 ? "" : String(html);
      const preserveSelection = options.preserveSelection !== false;
      if (typeof setSummaryElementHtml2 === "function") {
        return setSummaryElementHtml2(target, nextHtml, { preserveSelection });
      }
      if (target.innerHTML === nextHtml) return false;
      target.innerHTML = nextHtml;
      return true;
    }
    function clearSummaryRenderPayload2(target) {
      if (!target || !target.dataset) return;
      delete target.dataset.rawSummary;
      delete target.dataset.summaryRenderMode;
      delete target.dataset.summaryTimestamp;
      delete target.dataset.summaryModel;
    }
    function renderSidebarSummaryContent2(target, rawSummary, options = {}) {
      if (!target) return false;
      const preserveSelection = options.preserveSelection !== false;
      clearSummaryRenderPayload2(target);
      const summaryHtml = renderSummaryMarkup(rawSummary, {
        renderMode: options.renderMode,
        emptyHtml: ""
      });
      return updateSummaryHtml2(target, summaryHtml, { preserveSelection });
    }
    function renderSidebarHistoryRecord2(target, record, options = {}) {
      if (!target) return false;
      const preserveSelection = options.preserveSelection !== false;
      const rawSummary = record?.summary === null || record?.summary === void 0 ? "" : String(record.summary);
      const timestamp = record?.timestamp === null || record?.timestamp === void 0 ? "" : String(record.timestamp);
      const model = record?.model === null || record?.model === void 0 ? "" : String(record.model);
      clearSummaryRenderPayload2(target);
      const summaryHtml = renderSummaryMarkup(rawSummary, {
        renderMode: record?.renderMode,
        emptyHtml: "<p><i>总结内容为空。</i></p>"
      });
      const timestampText = timestamp ? new Date(timestamp).toLocaleString() : "未知";
      const historyHtml = `
                <div class="history-summary-wrapper">${summaryHtml}</div>
                <hr>
                <p><strong>🕒 时间：</strong>${timestampText}</p>
                <p><strong>🤖 模型：</strong>${model || "未知"}</p>
            `;
      return updateSummaryHtml2(target, historyHtml, { preserveSelection });
    }
    function renderListSummaryContent2(target, rawSummary, options = {}) {
      if (!target) return false;
      const preserveSelection = options.preserveSelection !== false;
      clearSummaryRenderPayload2(target);
      const summaryHtml = renderSummaryMarkup(rawSummary, {
        renderMode: options.renderMode,
        emptyHtml: options.emptyHtml || "<p><i>总结加载失败或为空。</i></p>"
      });
      return updateSummaryHtml2(target, summaryHtml, { preserveSelection });
    }
    function renderTopicHistoryRecord2(target, record, options = {}) {
      if (!target) return false;
      const preserveSelection = options.preserveSelection !== false;
      const rawSummary = record?.summary === null || record?.summary === void 0 ? "" : String(record.summary);
      const timestamp = record?.timestamp === null || record?.timestamp === void 0 ? "" : String(record.timestamp);
      const model = record?.model === null || record?.model === void 0 ? "" : String(record.model);
      clearSummaryRenderPayload2(target);
      const summaryHtml = renderSummaryMarkup(rawSummary, {
        renderMode: record?.renderMode,
        emptyHtml: "<p><i>总结内容为空。</i></p>"
      });
      const historyHtml = `
                <div class="history-summary-wrapper">${summaryHtml}</div>
                <p style="font-size: 11px; opacity: 0.8; text-align: left; margin-top: 5px;">
                   🕒 ${timestamp ? new Date(timestamp).toLocaleString() : "未知"} | 🤖 ${model || "未知"}
                </p>
            `;
      return updateSummaryHtml2(target, historyHtml, { preserveSelection });
    }
    function normalizeHistoryListForDisplay2(rawHistory) {
      if (!Array.isArray(rawHistory)) return [];
      const normalized = [];
      rawHistory.forEach((item) => {
        const normalizedItem = normalizeSummaryHistoryItemForStorage(item);
        if (!normalizedItem) return;
        normalized.push(normalizedItem);
      });
      return normalized;
    }
    return {
      getSummaryHistoryMapSnapshot: getSummaryHistoryMapSnapshot2,
      setSummaryHistoryMapSnapshot: setSummaryHistoryMapSnapshot2,
      getSummaryHistory: getSummaryHistory2,
      getPromptSummaryRenderMode,
      getCurrentSummaryRenderMode,
      resolveSummaryRenderMode: resolveSummaryRenderMode2,
      captureCurrentSummaryRequestContext: captureCurrentSummaryRequestContext2,
      applySummaryOutputFilters,
      renderSummaryMarkup,
      clearSummaryRenderPayload: clearSummaryRenderPayload2,
      renderSidebarSummaryContent: renderSidebarSummaryContent2,
      renderSidebarHistoryRecord: renderSidebarHistoryRecord2,
      renderListSummaryContent: renderListSummaryContent2,
      renderTopicHistoryRecord: renderTopicHistoryRecord2,
      normalizeHistoryListForDisplay: normalizeHistoryListForDisplay2,
      normalizeSummaryHistoryItemForStorage,
      normalizeSummaryHistoryListForStorage,
      normalizeSummaryHistoryMapForStorage,
      updateSummaryHtml: updateSummaryHtml2
    };
  }

  // src/ui/icons.js
  var ASK_BUTTON_ICON_SVG = `<svg class="ask-button-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <g fill="currentColor" stroke="currentColor" stroke-width="0.5" stroke-linejoin="round">
    <path d="M17,23h-2v-2h2V23z M17,17.899c2.279-0.464,4-2.485,4-4.899c0-2.757-2.243-5-5-5s-5,2.243-5,5h2c0-1.654,1.346-3,3-3s3,1.346,3,3s-1.346,3-3,3h-1v4h2V17.899z"></path>
    <path d="M16,2C8.268,2,2,8.268,2,16c0,2.863,0.863,5.522,2.338,7.74L2,29l1,1l5.26-2.338C10.478,29.137,13.137,30,16,30c7.732,0,14-6.268,14-14S23.732,2,16,2z M16,28.923c-2.551,0-5.021-0.746-7.144-2.158l-0.493-0.328l-5.042,2.241l2.241-5.042l-0.328-0.493C3.823,21.021,3.077,18.551,3.077,16C3.077,8.874,8.874,3.077,16,3.077c7.126,0,12.923,5.797,12.923,12.923S23.126,28.923,16,28.923z"></path>
  </g>
</svg>`;
  function renderAskButtonIcon(button, label = "提问 / 追问") {
    if (!button) return false;
    const hasIcon = Boolean(button.querySelector?.(".ask-button-icon"));
    const hasExactMarkup = String(button.innerHTML || "").trim() === ASK_BUTTON_ICON_SVG.trim();
    if (!hasIcon && !hasExactMarkup) {
      button.textContent = "";
      button.innerHTML = ASK_BUTTON_ICON_SVG;
    }
    button.title = label;
    button.setAttribute?.("aria-label", label);
    return !hasIcon && !hasExactMarkup;
  }

  var CONTENT_FILTER_REFRESH_EVENT = "content-blocker:navigation";
  var CONTENT_FILTER_REFRESH_DELAY = 120;
  var contentFilterRefreshTimer = null;
  var contentFilterRefreshDispatching = false;
  function dispatchContentFilterRefreshEvent() {
    try {
      window.dispatchEvent(new Event(CONTENT_FILTER_REFRESH_EVENT));
      return true;
    } catch (error) {
      console.warn("[LINUX DO Summary] Failed to dispatch content filter refresh event:", error);
      return false;
    }
  }
  function scheduleContentFilterRefreshEvent() {
    if (contentFilterRefreshDispatching) return false;
    if (contentFilterRefreshTimer !== null) {
      clearTimeout(contentFilterRefreshTimer);
    }
    contentFilterRefreshTimer = setTimeout(() => {
      contentFilterRefreshTimer = null;
      if (contentFilterRefreshDispatching) return;
      contentFilterRefreshDispatching = true;
      try {
        dispatchContentFilterRefreshEvent();
      } finally {
        contentFilterRefreshDispatching = false;
      }
    }, CONTENT_FILTER_REFRESH_DELAY);
    return true;
  }
  function mutationBatchAddsTopicRows(mutations) {
    for (const mutation of mutations || []) {
      if (mutation?.type !== "childList" || !mutation.addedNodes?.length) continue;
      for (const node of mutation.addedNodes) {
        if (!node || node.nodeType !== 1) continue;
        if (node.matches?.(".topic-list-item") || node.querySelector?.(".topic-list-item")) {
          return true;
        }
      }
    }
    return false;
  }

  // src/features/listPage/index.js
  var TOPIC_SUMMARY_VIEW_MODE = Object.freeze({
    SUMMARY: "summary",
    HISTORY: "history",
    QUESTION: "question"
  });
  function createTopicListFeature(deps = {}) {
    const {
      state: state2,
      pendingManualAfterDriveFailTopics: pendingManualAfterDriveFailTopics2,
      createToast: createToast2,
      createSummarizingToast: createSummarizingToast2,
      captureCurrentSummaryRequestContext: captureCurrentSummaryRequestContext2,
      clearSummaryRenderPayload: clearSummaryRenderPayload2,
      renderListSummaryContent: renderListSummaryContent2,
      renderTopicHistoryRecord: renderTopicHistoryRecord2,
      resolveSummaryRenderMode: resolveSummaryRenderMode2,
      setListSummaryHtml,
      applySummaryWidthSettings: applySummaryWidthSettings2,
      getSummaryHistoryMapSnapshot: getSummaryHistoryMapSnapshot3,
      getSummaryHistory: getSummaryHistory2,
      isTopicMarkedSummarized: isTopicMarkedSummarized2,
      hasDriveSummaryCredentials: hasDriveSummaryCredentials2,
      pullTopicHistoryFromDrive: pullTopicHistoryFromDrive2,
      areSummaryHistoryListsEqual: areSummaryHistoryListsEqual2,
      saveSummaryHistory: saveSummaryHistory2,
      autoShowHistoryIfExists: autoShowHistoryIfExists2,
      loadHistoryForCurrentTopic: loadHistoryForCurrentTopic2,
      updateSidebarSubmitButtonState: updateSidebarSubmitButtonState2,
      getFullFloorRangeForTopic,
      getCurrentApiConfiguration: getCurrentApiConfiguration2,
      main,
      extractTopicIdFromElement: extractTopicIdFromElement2,
      isListSummaryPageUrl: isListSummaryPageUrl2,
      isSummarySelectionLocked: isSummarySelectionLocked2,
      openListQuestionPanel
    } = deps;
    const LIST_SUMMARY_INTERNAL_SELECTOR = ".topic-summary-row, .topic-summary-container, .topic-summary-button, .topic-dearrow-button, .topic-question-button, .topic-summary-button-group, .topic-summary-control-button, .topic-summary-history-browser, .topic-summary-history-content, .topic-summary-content, .topic-summary-history-indicator, .topic-question-panel, .topic-question-header, .topic-question-title, .topic-question-presets, .topic-question-preset-button, .topic-question-preset-menu, .topic-question-preset-menu-item, .topic-question-history, .topic-question-compose, .topic-question-input-shell, .topic-question-input, .topic-question-compose-actions, .topic-question-send, .topic-question-status";
    const LIST_SUMMARY_TOPIC_CONTAINER_SELECTOR = ".topic-list, .topic-list-body, .topic-list-item";
    let listSummaryRefreshTimer = null;
    let listSummaryPostRenderTimer = null;
    const topicSummaryViewModeByTopic = /* @__PURE__ */ new Map();
    const topicSummaryHistoryCursorByTopic = /* @__PURE__ */ new Map();
    const listDriveHistoryPullingTopics = /* @__PURE__ */ new Set();
    function normalizeTopicId4(topicId) {
      if (topicId === null || topicId === void 0) return "";
      return String(topicId).trim();
    }
    function escapeHtml(value) {
      return String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[char]);
    }
    function normalizeErrorMessage(error, fallback = "未知错误") {
      if (error instanceof Error && error.message) return error.message;
      if (error && typeof error.message === "string" && error.message) return error.message;
      const text = String(error ?? "").trim();
      return text || fallback;
    }
    function stringifyErrorDetailValue(value) {
      if (value === null || value === void 0) return "";
      if (typeof value === "string") return value;
      try {
        return JSON.stringify(value, null, 2);
      } catch (_2) {
        return String(value);
      }
    }
    function collectErrorDetails(error, sections, seen = /* @__PURE__ */ new Set(), label = "") {
      if (!error || typeof error !== "object" && typeof error !== "function") {
        return;
      }
      if (seen.has(error)) {
        sections.push(`${label || "Error"}: [Circular reference]`);
        return;
      }
      seen.add(error);
      const prefix = label ? `${label}: ` : "";
      if (error instanceof Error) {
        sections.push(`${prefix}${error.name || "Error"}: ${error.message || "未知错误"}`);
        if (error.details) {
          sections.push(`${label ? `${label} ` : ""}Details:
${stringifyErrorDetailValue(error.details)}`);
        }
        if (error.stack) {
          sections.push(`${label ? `${label} ` : ""}Stack:
${error.stack}`);
        }
        if (error.cause) {
          collectErrorDetails(error.cause, sections, seen, "Cause");
        }
        return;
      }
      sections.push(`${prefix}${stringifyErrorDetailValue(error)}`);
    }
    function buildTopicSummaryErrorDetails({ title, topicId, error, message, action }) {
      const sections = [
        `${title}：${message}`
      ];
      if (topicId) {
        sections.push(`话题 ID：${topicId}`);
      }
      collectErrorDetails(error, sections);
      if (action) {
        sections.push(`建议操作：${action}`);
      }
      return sections.map((section) => String(section || "").trim()).filter(Boolean).join("\n\n");
    }
    async function copyTextToClipboard(text) {
      const value = String(text ?? "");
      if (!value) return false;
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
      }
      if (typeof document === "undefined" || !document.body || typeof document.createElement !== "function") {
        throw new Error("当前环境不支持剪贴板复制");
      }
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.top = "-9999px";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand?.("copy") === true;
      textarea.remove();
      if (!copied) {
        throw new Error("浏览器拒绝复制操作");
      }
      return true;
    }
    function bindTopicSummaryErrorControls(contentWrapper) {
      if (!contentWrapper) return;
      contentWrapper.querySelectorAll?.(".topic-summary-error-toggle").forEach((button) => {
        if (button.dataset.bound === "true") return;
        button.dataset.bound = "true";
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const errorBox = button.closest?.(".topic-summary-error");
          const details = errorBox?.querySelector?.(".topic-summary-error-details");
          if (!details) return;
          const expanded = button.getAttribute("aria-expanded") === "true";
          const nextExpanded = !expanded;
          details.hidden = !nextExpanded;
          button.setAttribute("aria-expanded", String(nextExpanded));
          button.textContent = nextExpanded ? "收起" : "详情";
          button.title = nextExpanded ? "收起完整报错" : "展开完整报错";
        });
      });
      contentWrapper.querySelectorAll?.(".topic-summary-error-copy").forEach((button) => {
        if (button.dataset.bound === "true") return;
        button.dataset.bound = "true";
        button.addEventListener("click", async (event) => {
          event.preventDefault();
          event.stopPropagation();
          const originalText = button.textContent || "复制";
          try {
            const errorBox = button.closest?.(".topic-summary-error");
            const detailsText = errorBox?.querySelector?.(".topic-summary-error-details-text")?.textContent || "";
            await copyTextToClipboard(detailsText);
            button.textContent = "已复制";
            createToast2?.("完整报错已复制", "success", 1800);
            setTimeout(() => {
              button.textContent = originalText;
            }, 1400);
          } catch (copyError) {
            const message = normalizeErrorMessage(copyError, "复制失败");
            button.textContent = "复制失败";
            createToast2?.(`复制失败：${message}`, "error", 2600);
            setTimeout(() => {
              button.textContent = originalText;
            }, 1800);
          }
        });
      });
    }
    function isSoftHidden(elem) {
      if (!elem) return false;
      const cs = getComputedStyle(elem);
      if (cs.display === "none") return true;
      if (cs.visibility === "collapse" || cs.visibility === "hidden") return true;
      if (cs.position === "absolute") {
        const left = parseInt(cs.left, 10);
        if (!Number.isNaN(left) && left < -900) return true;
      }
      return false;
    }
    function canAttemptDrivePull() {
      if (!state2.driveSummarySettings?.enabled) return false;
      if (typeof hasDriveSummaryCredentials2 === "function") {
        return hasDriveSummaryCredentials2();
      }
      return true;
    }
    function getTopicSummaryState(topicId) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      const hasLocalHistory = normalizedTopicId ? getSummaryHistory2(normalizedTopicId).length > 0 : false;
      const hasSummaryState = normalizedTopicId ? hasLocalHistory || isTopicMarkedSummarized2(normalizedTopicId) : false;
      return {
        topicId: normalizedTopicId,
        hasLocalHistory,
        hasSummaryState
      };
    }
    function isTopicDrivePulling(topicId) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!normalizedTopicId) return false;
      return listDriveHistoryPullingTopics.has(normalizedTopicId);
    }
    function isTopicSummaryBusy(topicId) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!normalizedTopicId) return false;
      return state2.summarizingTopics.has(normalizedTopicId) || listDriveHistoryPullingTopics.has(normalizedTopicId);
    }
    function getTopicSummaryBusyButtonLabel(topicId) {
      return isTopicDrivePulling(topicId) ? "☁️ 拉取中..." : "⏳ 总结中...";
    }
    function getTopicSummaryBusyLoadingMessage(topicId) {
      return isTopicDrivePulling(topicId) ? "正在从 Drive 拉取总结，请稍候..." : "正在生成总结，请稍候...";
    }
    function getTopicSummaryBusyToastMessage(topicId) {
      return isTopicDrivePulling(topicId) ? "该话题正在从 Drive 拉取总结，请稍候..." : "该话题正在总结中，请稍候...";
    }
    function renderTopicSummaryError(container, buttonGroup, topicId, error, options = {}) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!container || !normalizedTopicId) return false;
      const { contentWrapper, historyBrowser } = ensureTopicSummaryContentElements(container, buttonGroup);
      if (!contentWrapper) return false;
      const summaryRow = typeof container.closest === "function" ? container.closest(".topic-summary-row") : null;
      if (summaryRow) summaryRow.style.display = "table-row";
      container.style.display = "block";
      if (buttonGroup) buttonGroup.style.display = "flex";
      if (historyBrowser) historyBrowser.style.display = "none";
      contentWrapper.style.display = "block";
      syncTopicSummaryHistoryButtonState(buttonGroup, false);
      setTopicSummaryViewMode(normalizedTopicId, TOPIC_SUMMARY_VIEW_MODE.SUMMARY);
      const title = options.title || "总结生成失败";
      const message = normalizeErrorMessage(error);
      const action = options.action ? `<br>${escapeHtml(options.action)}` : "";
      const detailText = buildTopicSummaryErrorDetails({
        title,
        topicId: normalizedTopicId,
        error,
        message,
        action: options.action || ""
      });
      clearSummaryRenderPayload2(contentWrapper);
      const didUpdate = setListSummaryHtml(
        contentWrapper,
        [
          '<div class="topic-summary-error error-message">',
          '  <div class="topic-summary-error-summary">',
          `    <span class="topic-summary-error-text">${escapeHtml(title)}：${escapeHtml(message)}${action}</span>`,
          '    <div class="topic-summary-error-actions">',
          '      <button type="button" class="topic-summary-error-toggle" data-action="toggle-error-details" aria-expanded="false" title="展开完整报错">详情</button>',
          "    </div>",
          "  </div>",
          '  <div class="topic-summary-error-details" hidden>',
          '    <div class="topic-summary-error-detail-toolbar">',
          '      <button type="button" class="topic-summary-error-copy" data-action="copy-error-details" title="复制完整报错">复制完整报错</button>',
          "    </div>",
          `    <pre class="topic-summary-error-details-text">${escapeHtml(detailText)}</pre>`,
          "  </div>",
          "</div>"
        ].join(""),
        { preserveSelection: false }
      );
      bindTopicSummaryErrorControls(contentWrapper);
      return didUpdate;
    }
    function shouldPreservePendingExpandedTopic(topicId) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!normalizedTopicId) return false;
      return getTopicSummaryViewMode(normalizedTopicId) === TOPIC_SUMMARY_VIEW_MODE.QUESTION || isTopicSummaryBusy(normalizedTopicId) || getSummaryHistory2(normalizedTopicId).length > 0;
    }
    function getTrackedExpandedTopicIds() {
      return Array.from(state2.expandedSummaryRows).map((id) => normalizeTopicId4(id)).filter(Boolean);
    }
    function getTrackedExpandedTopicId() {
      const ids = getTrackedExpandedTopicIds();
      return ids.length ? ids[ids.length - 1] : null;
    }
    function isAllowMultipleListSummaries() {
      return state2.autoShowSummaryInList !== true;
    }
    function setTrackedExpandedTopicId(topicId) {
      const normalized = normalizeTopicId4(topicId);
      if (!normalized) {
        state2.expandedSummaryRows.clear();
        return;
      }
      if (!isAllowMultipleListSummaries()) {
        state2.expandedSummaryRows.clear();
      }
      state2.expandedSummaryRows.add(normalized);
    }
    function untrackExpandedTopicId(topicId) {
      const normalized = normalizeTopicId4(topicId);
      if (normalized) {
        state2.expandedSummaryRows.delete(normalized);
      }
    }
    function normalizeTopicSummaryViewMode(mode) {
      if (mode === TOPIC_SUMMARY_VIEW_MODE.QUESTION) return TOPIC_SUMMARY_VIEW_MODE.QUESTION;
      return mode === TOPIC_SUMMARY_VIEW_MODE.HISTORY ? TOPIC_SUMMARY_VIEW_MODE.HISTORY : TOPIC_SUMMARY_VIEW_MODE.SUMMARY;
    }
    function getTopicSummaryViewMode(topicId) {
      const normalized = normalizeTopicId4(topicId);
      if (!normalized) return TOPIC_SUMMARY_VIEW_MODE.SUMMARY;
      const mode = topicSummaryViewModeByTopic.get(normalized);
      return normalizeTopicSummaryViewMode(mode);
    }
    function setTopicSummaryViewMode(topicId, mode) {
      const normalized = normalizeTopicId4(topicId);
      if (!normalized) return TOPIC_SUMMARY_VIEW_MODE.SUMMARY;
      const normalizedMode = normalizeTopicSummaryViewMode(mode);
      topicSummaryViewModeByTopic.set(normalized, normalizedMode);
      return normalizedMode;
    }
    function pruneTopicSummaryViewState(topicIdsOnPage) {
      if (!(topicIdsOnPage instanceof Set)) return;
      Array.from(topicSummaryViewModeByTopic.keys()).forEach((topicId) => {
        if (!topicIdsOnPage.has(topicId)) {
          topicSummaryViewModeByTopic.delete(topicId);
        }
      });
      Array.from(topicSummaryHistoryCursorByTopic.keys()).forEach((topicId) => {
        if (!topicIdsOnPage.has(topicId)) {
          topicSummaryHistoryCursorByTopic.delete(topicId);
        }
      });
    }
    function getTopicHistoryCursor(topicId, maxLength) {
      const normalized = normalizeTopicId4(topicId);
      if (!normalized) return 0;
      const raw = topicSummaryHistoryCursorByTopic.get(normalized);
      if (!Number.isFinite(raw)) return 0;
      if (!Number.isFinite(maxLength) || maxLength <= 0) return 0;
      const maxIndex = Math.max(0, maxLength - 1);
      return Math.max(0, Math.min(maxIndex, raw));
    }
    function setTopicHistoryCursor(topicId, index, maxLength) {
      const normalized = normalizeTopicId4(topicId);
      if (!normalized) return 0;
      if (!Number.isFinite(maxLength) || maxLength <= 0) {
        topicSummaryHistoryCursorByTopic.delete(normalized);
        return 0;
      }
      const maxIndex = Math.max(0, maxLength - 1);
      const clamped = Math.max(0, Math.min(maxIndex, Number(index) || 0));
      topicSummaryHistoryCursorByTopic.set(normalized, clamped);
      return clamped;
    }
    function syncTopicSummaryHistoryButtonState(buttonGroup, isHistoryVisible) {
      if (!buttonGroup) return;
      const historyBtn = buttonGroup.querySelector('[data-action="history"]');
      if (!historyBtn) return;
      historyBtn.classList.toggle("active", isHistoryVisible);
    }
    function syncTopicQuestionButtonState(topicId, isQuestionVisible) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!normalizedTopicId) return;
      const questionButton = document.querySelector(`.topic-question-button[data-topic-id="${normalizedTopicId}"]`);
      if (!questionButton) return;
      questionButton.classList.toggle("active", isQuestionVisible);
      questionButton.dataset.expanded = isQuestionVisible ? "true" : "false";
    }
    function bindSummaryContainerScrollGuard(container) {
      if (!container || container.dataset.scrollGuardBound === "true") return;
      container.dataset.scrollGuardBound = "true";
      container.addEventListener("wheel", (event) => {
        const canScroll = container.scrollHeight > container.clientHeight + 1;
        if (!canScroll) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        const deltaY = Number(event.deltaY) || 0;
        if (deltaY === 0) {
          event.stopPropagation();
          return;
        }
        const atTop = container.scrollTop <= 0;
        const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
        if (deltaY < 0 && atTop || deltaY > 0 && atBottom) {
          event.preventDefault();
        }
        event.stopPropagation();
      }, { passive: false });
    }
    function ensureTopicSummaryContentElements(container, buttonGroup) {
      if (!container) {
        return {
          contentWrapper: null,
          historyBrowser: null
        };
      }
      let contentWrapper = container.querySelector(".topic-summary-content");
      if (!contentWrapper) {
        contentWrapper = document.createElement("div");
        contentWrapper.className = "topic-summary-content";
        if (buttonGroup && buttonGroup.parentNode === container) {
          container.insertBefore(contentWrapper, buttonGroup);
        } else {
          container.appendChild(contentWrapper);
        }
      }
      let historyBrowser = container.querySelector(".topic-summary-history-browser");
      if (!historyBrowser) {
        historyBrowser = document.createElement("div");
        historyBrowser.className = "topic-summary-history-browser";
        if (contentWrapper.nextSibling) {
          container.insertBefore(historyBrowser, contentWrapper.nextSibling);
        } else if (buttonGroup && buttonGroup.parentNode === container) {
          container.insertBefore(historyBrowser, buttonGroup);
        } else {
          container.appendChild(historyBrowser);
        }
      }
      return {
        contentWrapper,
        historyBrowser
      };
    }
    function getTopicSummaryElements(topicId) {
      const normalized = normalizeTopicId4(topicId);
      if (!normalized) {
        return {
          topicId: "",
          summaryRow: null,
          container: null,
          buttonGroup: null,
          button: null,
          questionButton: null
        };
      }
      const summaryRow = document.querySelector(`.topic-summary-row[data-topic-id="${normalized}"]`);
      const container = summaryRow?.querySelector(".topic-summary-container") || null;
      const buttonGroup = container?.querySelector(".topic-summary-button-group") || null;
      const button = document.querySelector(`.topic-summary-button[data-topic-id="${normalized}"]`);
      const questionButton = document.querySelector(`.topic-question-button[data-topic-id="${normalized}"]`);
      return {
        topicId: normalized,
        summaryRow,
        container,
        buttonGroup,
        button,
        questionButton
      };
    }
    function isDisplayed(element) {
      if (!element) return false;
      const inlineDisplay = String(element.style?.display || "").trim();
      if (inlineDisplay) {
        return inlineDisplay !== "none";
      }
      if (typeof getComputedStyle === "function") {
        return getComputedStyle(element).display !== "none";
      }
      return true;
    }
    function isSummaryRowExpandedByTopicId(topicId) {
      const { summaryRow, container, buttonGroup } = getTopicSummaryElements(topicId);
      return isDisplayed(summaryRow) && isDisplayed(container) && isDisplayed(buttonGroup);
    }
    function getTopicSummaryContentState(contentWrapper) {
      const currentHtml = String(contentWrapper?.innerHTML || "").trim();
      if (!currentHtml) return "empty";
      if (contentWrapper?.querySelector?.(".loading-indicator") || currentHtml.includes("loading-indicator")) {
        return "loading";
      }
      if (contentWrapper?.querySelector?.(".error-message") || currentHtml.includes("error-message")) {
        return "error";
      }
      return "ready";
    }
    function collapseTopicSummaryView(topicId, options = {}) {
      const normalized = normalizeTopicId4(topicId);
      if (!normalized) return false;
      const clearTracking = options.clearTracking !== false;
      const { summaryRow, container, buttonGroup, button, questionButton } = getTopicSummaryElements(normalized);
      if (!summaryRow && !container && !buttonGroup && !button && !questionButton) return false;
      if (summaryRow) summaryRow.style.display = "none";
      if (container) container.style.display = "none";
      if (buttonGroup) buttonGroup.style.display = "none";
      if (button) button.dataset.expanded = "false";
      if (questionButton) questionButton.dataset.expanded = "false";
      const questionPanel = container?.querySelector(".topic-question-panel");
      if (questionPanel) questionPanel.style.display = "none";
      setTopicSummaryViewMode(normalized, TOPIC_SUMMARY_VIEW_MODE.SUMMARY);
      syncTopicSummaryHistoryButtonState(buttonGroup, false);
      syncTopicQuestionButtonState(normalized, false);
      if (clearTracking) {
        untrackExpandedTopicId(normalized);
      }
      return true;
    }
    function collapseAllTopicSummaryViewsExcept(topicId = null, options = {}) {
      const keepTopicId = normalizeTopicId4(topicId);
      const preserveTracking = options.preserveTracking === true;
      const summaryRows = document.querySelectorAll(".topic-summary-row[data-topic-id]");
      summaryRows.forEach((summaryRow) => {
        const rowTopicId = normalizeTopicId4(summaryRow.dataset.topicId);
        if (!rowTopicId || keepTopicId && rowTopicId === keepTopicId) return;
        collapseTopicSummaryView(rowTopicId, { clearTracking: false });
      });
      const summaryButtons = document.querySelectorAll(".topic-summary-button[data-topic-id]");
      summaryButtons.forEach((button) => {
        const buttonTopicId = normalizeTopicId4(button.dataset.topicId);
        if (!buttonTopicId || keepTopicId && buttonTopicId === keepTopicId) return;
        button.dataset.expanded = "false";
      });
      const questionButtons = document.querySelectorAll(".topic-question-button[data-topic-id]");
      questionButtons.forEach((button) => {
        const buttonTopicId = normalizeTopicId4(button.dataset.topicId);
        if (!buttonTopicId || keepTopicId && buttonTopicId === keepTopicId) return;
        button.dataset.expanded = "false";
        button.classList.remove("active");
      });
      if (keepTopicId) {
        state2.expandedSummaryRows.clear();
        state2.expandedSummaryRows.add(keepTopicId);
      } else if (!preserveTracking) {
        state2.expandedSummaryRows.clear();
      }
    }
    function expandTopicSummaryView(topicId, options = {}) {
      const normalized = normalizeTopicId4(topicId);
      if (!normalized) return false;
      const closeOthers = !isAllowMultipleListSummaries() && options.closeOthers !== false;
      const track = options.track !== false;
      const preserveTrackingOnFailure = options.preserveTrackingOnFailure === true;
      if (closeOthers) {
        collapseAllTopicSummaryViewsExcept(normalized);
      }
      const { summaryRow, container, buttonGroup, button } = getTopicSummaryElements(normalized);
      if (!summaryRow || !container || !buttonGroup) {
        if (track && !preserveTrackingOnFailure) untrackExpandedTopicId(normalized);
        return false;
      }
      summaryRow.style.display = "table-row";
      container.style.display = "block";
      buttonGroup.style.display = "flex";
      if (button) {
        button.dataset.expanded = "true";
      }
      if (track) {
        setTrackedExpandedTopicId(normalized);
      }
      return true;
    }
    function expandSummaryRowByTopicId2(topicId, options = {}) {
      const normalized = normalizeTopicId4(topicId);
      if (!normalized) return false;
      if (!expandTopicSummaryView(normalized, {
        closeOthers: true,
        track: true,
        preserveTrackingOnFailure: shouldPreservePendingExpandedTopic(normalized)
      })) {
        return false;
      }
      const preferredMode = normalizeTopicSummaryViewMode(
        options.preferredMode || getTopicSummaryViewMode(normalized)
      );
      if (preferredMode === TOPIC_SUMMARY_VIEW_MODE.QUESTION) {
        const { container: container2, buttonGroup: buttonGroup2 } = getTopicSummaryElements(normalized);
        if (container2 && buttonGroup2) {
          showTopicQuestionPanel(container2, buttonGroup2, normalized, { focus: false });
          return true;
        }
      }
      const { container, buttonGroup } = getTopicSummaryElements(normalized);
      if (isTopicSummaryBusy(normalized)) {
        if (container && buttonGroup) {
          const contentWrapper2 = container.querySelector(".topic-summary-content");
          if (getTopicSummaryContentState(contentWrapper2) !== "loading") {
            showTopicSummaryLoading(
              container,
              buttonGroup,
              normalized,
              getTopicSummaryBusyLoadingMessage(normalized)
            );
          }
        }
        return true;
      }
      if (!container || !buttonGroup) {
        return true;
      }
      const contentWrapper = container.querySelector(".topic-summary-content");
      const contentState = getTopicSummaryContentState(contentWrapper);
      if (contentState === "error") {
        return true;
      }
      if (contentState === "ready" && preferredMode !== TOPIC_SUMMARY_VIEW_MODE.HISTORY) {
        applyTopicSummaryViewMode(container, buttonGroup, normalized, preferredMode, {
          historyList: []
        });
        return true;
      }
      const history = getSummaryHistory2(normalized);
      if (history.length > 0) {
        if (contentState === "ready") {
          applyTopicSummaryViewMode(container, buttonGroup, normalized, preferredMode, {
            historyList: history
          });
        } else {
          showTopicSummary(container, buttonGroup, history[0].summary, normalized, {
            preferredMode,
            historyList: history
          });
        }
      }
      return true;
    }
    function cleanupTopicListSummaryItem(item) {
      if (!item) return;
      Array.from(item.querySelectorAll?.(".topic-summary-button") || []).forEach((button) => button.remove());
      Array.from(item.querySelectorAll?.(".topic-question-button") || []).forEach((button) => button.remove());
      let nextRow = item.nextElementSibling;
      while (nextRow?.classList?.contains?.("topic-summary-row")) {
        nextRow.remove();
        nextRow = item.nextElementSibling;
      }
      item.classList.remove("has-summary-button");
      item.classList.remove("has-question-button");
      item.classList.remove("has-summary");
    }
    function removeOrphanSummaryRows() {
      const summaryRows = document.querySelectorAll(".topic-summary-row");
      summaryRows.forEach((row) => {
        const previous = row.previousElementSibling;
        if (!previous || !previous.classList?.contains("topic-list-item")) {
          row.remove();
        }
      });
    }
    function createTopicListSummaryRow(item, topicId) {
      const summaryRow = document.createElement("tr");
      summaryRow.className = "topic-summary-row";
      summaryRow.dataset.topicId = topicId;
      summaryRow.style.display = "none";
      const summaryCell = document.createElement("td");
      summaryCell.colSpan = item.querySelectorAll("td").length || 1;
      const summaryContainer = document.createElement("div");
      summaryContainer.style.width = state2.summaryWidthType === "percent" ? `${state2.summaryWidthValue}%` : `${state2.summaryWidthValue}px`;
      summaryContainer.className = "topic-summary-container";
      summaryContainer.dataset.topicId = topicId;
      summaryContainer.style.display = "none";
      summaryContainer.style.maxHeight = `calc(1.5em * ${state2.listPageSummaryMaxLines})`;
      bindSummaryContainerScrollGuard(summaryContainer);
      const buttonGroup = document.createElement("div");
      buttonGroup.className = "topic-summary-button-group";
      buttonGroup.style.display = "none";
      buttonGroup.dataset.topicId = topicId;
      const historyBtn = document.createElement("button");
      historyBtn.className = "topic-summary-control-button";
      historyBtn.dataset.action = "history";
      historyBtn.innerHTML = "📜";
      historyBtn.title = "查看历史记录";
      historyBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await toggleHistoryBrowser(summaryContainer, historyBtn, topicId);
      });
      const refreshBtn = document.createElement("button");
      refreshBtn.className = "topic-summary-control-button";
      refreshBtn.dataset.action = "refresh";
      refreshBtn.innerHTML = "⚡";
      refreshBtn.title = "重新总结";
      refreshBtn.addEventListener("click", (e) => {
        e.preventDefault();
        refreshTopicSummary(summaryContainer, topicId);
      });
      const closeBtn = document.createElement("button");
      closeBtn.className = "topic-summary-control-button";
      closeBtn.dataset.action = "close";
      closeBtn.innerHTML = "✕";
      closeBtn.title = "关闭总结";
      closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        collapseTopicSummaryView(topicId, { clearTracking: true });
      });
      buttonGroup.appendChild(historyBtn);
      buttonGroup.appendChild(refreshBtn);
      buttonGroup.appendChild(closeBtn);
      summaryCell.appendChild(summaryContainer);
      summaryContainer.appendChild(buttonGroup);
      summaryRow.appendChild(summaryCell);
      item.parentNode.insertBefore(summaryRow, item.nextSibling);
      return { summaryRow, summaryContainer, buttonGroup };
    }
    function getTopicListButtonMountTarget(item) {
      if (!item) return null;
      const mainLink = item.querySelector(".main-link") || item.querySelector("td:nth-child(2)");
      if (item.classList?.contains("bookmark-list-item")) {
        return item.querySelector(".link-bottom-line") || mainLink || item;
      }
      return mainLink || item;
    }
    function mountTopicListButton(item, button) {
      const mountTarget = getTopicListButtonMountTarget(item);
      if (item?.classList?.contains("bookmark-list-item") && button?.classList?.contains("topic-summary-button") && button.parentNode?.classList?.contains("topic-dearrow-control-stack")) {
        return;
      }
      if (!mountTarget || !button || button.parentNode === mountTarget) return;
      mountTarget.appendChild(button);
    }
    function setTopicSummaryButtonBusyState(button, label) {
      if (!button) return null;
      button.disabled = true;
      button.classList.add("loading");
      button.classList.remove("has-summary");
      button.textContent = label;
      const topicItem = button.closest(".topic-list-item");
      if (topicItem) {
        topicItem.classList.remove("has-summary");
      }
      return topicItem;
    }
    function scheduleListSummaryPostRenderTasks(delay = 80) {
      if (listSummaryPostRenderTimer) {
        clearTimeout(listSummaryPostRenderTimer);
      }
      listSummaryPostRenderTimer = setTimeout(() => {
        listSummaryPostRenderTimer = null;
        if (typeof isSummarySelectionLocked2 === "function" && isSummarySelectionLocked2()) {
          scheduleListSummaryPostRenderTasks(120);
          return;
        }
        if (!document.getElementById("summary-width-style") && typeof applySummaryWidthSettings2 === "function") {
          applySummaryWidthSettings2();
        }
      }, Math.max(0, delay));
    }
    function scheduleListSummaryRefresh2(delay = 150) {
      if (!state2.listPageSummaryEnabled) return;
      const shouldRefreshOnCurrentPage = typeof isListSummaryPageUrl2 === "function" ? isListSummaryPageUrl2(state2.currentPageUrl) : false;
      if (!shouldRefreshOnCurrentPage) {
        return;
      }
      if (listSummaryRefreshTimer) {
        clearTimeout(listSummaryRefreshTimer);
      }
      listSummaryRefreshTimer = setTimeout(() => {
        listSummaryRefreshTimer = null;
        if (typeof isSummarySelectionLocked2 === "function" && isSummarySelectionLocked2()) {
          scheduleListSummaryRefresh2(120);
          return;
        }
        addTopicListSummaryButtons();
        restoreExpandedSummaryRows();
      }, delay);
    }
    function applyTrackedSummaryExpansions(topicIdsOnPage) {
      const onPage = topicIdsOnPage instanceof Set ? topicIdsOnPage : /* @__PURE__ */ new Set();
      const trackedIds = getTrackedExpandedTopicIds();
      const trackedOnPage = trackedIds.filter((id) => onPage.has(id));
      const preserveTrackedExpansion = trackedIds.some((id) => !onPage.has(id) && shouldPreservePendingExpandedTopic(id));
      if (isAllowMultipleListSummaries()) {
        if (trackedOnPage.length === 0) {
          collapseAllTopicSummaryViewsExcept(null, {
            preserveTracking: preserveTrackedExpansion
          });
          return;
        }
        trackedOnPage.forEach((id) => {
          expandSummaryRowByTopicId2(id, {
            preferredMode: getTopicSummaryViewMode(id)
          });
        });
        return;
      }
      const targetExpandedTopicId = trackedOnPage.length ? trackedOnPage[trackedOnPage.length - 1] : null;
      if (targetExpandedTopicId) {
        const expanded = expandSummaryRowByTopicId2(targetExpandedTopicId, {
          preferredMode: getTopicSummaryViewMode(targetExpandedTopicId)
        });
        if (!expanded) {
          const shouldKeepTracking = shouldPreservePendingExpandedTopic(targetExpandedTopicId);
          if (!shouldKeepTracking) {
            untrackExpandedTopicId(targetExpandedTopicId);
          }
          collapseAllTopicSummaryViewsExcept(null, {
            preserveTracking: shouldKeepTracking
          });
        }
        return;
      }
      collapseAllTopicSummaryViewsExcept(null, {
        preserveTracking: preserveTrackedExpansion
      });
    }
    function addTopicListSummaryButtons() {
      if (!state2.listPageSummaryEnabled) return;
      removeOrphanSummaryRows();
      const topicIdsOnPage = /* @__PURE__ */ new Set();
      const topicItems = document.querySelectorAll(".topic-list-item");
      const historyMap = typeof getSummaryHistoryMapSnapshot3 === "function" ? getSummaryHistoryMapSnapshot3() : null;
      topicItems.forEach((item) => {
        if (isSoftHidden(item)) {
          cleanupTopicListSummaryItem(item);
          return;
        }
        const rawTopicId = extractTopicIdFromElement2(item);
        const topicId = normalizeTopicId4(rawTopicId);
        if (!topicId) {
          cleanupTopicListSummaryItem(item);
          return;
        }
        topicIdsOnPage.add(topicId);
        const existingSummaryButtons = Array.from(item.querySelectorAll?.(".topic-summary-button") || []);
        let summaryButton = existingSummaryButtons.find((button) => button.dataset?.topicId === topicId) || null;
        existingSummaryButtons.forEach((button) => {
          if (button !== summaryButton) button.remove();
        });
        const existingQuestionButtons = Array.from(item.querySelectorAll?.(".topic-question-button") || []);
        let questionButton = existingQuestionButtons.find((button) => button.dataset?.topicId === topicId) || null;
        existingQuestionButtons.forEach((button) => {
          if (button !== questionButton) button.remove();
        });
        const history = historyMap ? historyMap[topicId] || [] : getSummaryHistory2(topicId);
        const hasLocalHistory = history.length > 0;
        const hasSummaryState = hasLocalHistory || isTopicMarkedSummarized2(topicId);
        const isBusy = isTopicSummaryBusy(topicId);
        const busyLabel = getTopicSummaryBusyButtonLabel(topicId);
        if (!summaryButton) {
          summaryButton = document.createElement("button");
          summaryButton.className = "topic-summary-button";
          summaryButton.dataset.topicId = topicId;
          summaryButton.dataset.expanded = "false";
          summaryButton.addEventListener("click", (e) => {
            e.preventDefault();
            const activeTopicId = normalizeTopicId4(summaryButton.dataset.topicId);
            if (!activeTopicId) return;
            const { summaryRow: summaryRow2, container, buttonGroup: buttonGroup2 } = getTopicSummaryElements(activeTopicId);
            if (summaryRow2 && container && buttonGroup2) {
              handleTopicSummaryButtonClick(summaryButton, container, buttonGroup2, activeTopicId, summaryRow2);
            }
          });
        } else {
          summaryButton.dataset.topicId = topicId;
          if (!summaryButton.dataset.expanded) {
            summaryButton.dataset.expanded = "false";
          }
        }
        mountTopicListButton(item, summaryButton);
        if (!questionButton) {
          questionButton = document.createElement("button");
          questionButton.className = "topic-question-button";
          questionButton.dataset.topicId = topicId;
          questionButton.dataset.expanded = "false";
          renderAskButtonIcon(questionButton);
          questionButton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const activeTopicId = normalizeTopicId4(questionButton.dataset.topicId);
            if (!activeTopicId) return;
            const { summaryRow: summaryRow2, container, buttonGroup: buttonGroup2 } = getTopicSummaryElements(activeTopicId);
            if (summaryRow2 && container && buttonGroup2) {
              handleTopicQuestionButtonClick(questionButton, container, buttonGroup2, activeTopicId, summaryRow2);
            }
          });
        } else {
          questionButton.dataset.topicId = topicId;
          renderAskButtonIcon(questionButton);
          if (!questionButton.dataset.expanded) {
            questionButton.dataset.expanded = "false";
          }
        }
        mountTopicListButton(item, questionButton);
        summaryButton.disabled = isBusy;
        if (isBusy) {
          summaryButton.classList.add("loading");
          summaryButton.classList.remove("has-summary");
          summaryButton.textContent = busyLabel;
        } else if (hasSummaryState) {
          summaryButton.classList.add("has-summary");
          summaryButton.classList.remove("loading");
          summaryButton.textContent = "📝 已总结";
        } else {
          summaryButton.classList.remove("loading", "has-summary");
          summaryButton.textContent = "📝 总结";
        }
        item.classList.add("has-summary-button");
        item.classList.add("has-question-button");
        if (hasSummaryState && !isBusy) {
          item.classList.add("has-summary");
        } else {
          item.classList.remove("has-summary");
        }
        let summaryRow = item.nextElementSibling;
        if (summaryRow && summaryRow.classList.contains("topic-summary-row")) {
          if (summaryRow.dataset.topicId !== topicId) {
            summaryRow.remove();
            summaryRow = null;
          }
        } else {
          summaryRow = document.querySelector(`.topic-summary-row[data-topic-id="${topicId}"]`);
          if (summaryRow && summaryRow.previousElementSibling !== item) {
            summaryRow.remove();
            summaryRow = null;
          }
        }
        let summaryContainer = summaryRow?.querySelector(".topic-summary-container");
        let buttonGroup = summaryContainer?.querySelector(".topic-summary-button-group");
        if (summaryRow && (!summaryContainer || !buttonGroup)) {
          summaryRow.remove();
          summaryRow = null;
        }
        if (!summaryRow) {
          const built = createTopicListSummaryRow(item, topicId);
          summaryRow = built.summaryRow;
          summaryContainer = built.summaryContainer;
          buttonGroup = built.buttonGroup;
        } else {
          summaryRow.dataset.topicId = topicId;
          if (summaryContainer) {
            summaryContainer.dataset.topicId = topicId;
            summaryContainer.style.maxHeight = `calc(1.5em * ${state2.listPageSummaryMaxLines})`;
            bindSummaryContainerScrollGuard(summaryContainer);
          }
          if (buttonGroup) {
            buttonGroup.dataset.topicId = topicId;
          }
        }
        if (!summaryContainer || !buttonGroup) return;
        const nextWidth = state2.summaryWidthType === "percent" ? `${state2.summaryWidthValue}%` : `${state2.summaryWidthValue}px`;
        const nextMaxHeight = `calc(1.5em * ${state2.listPageSummaryMaxLines})`;
        if (summaryContainer.style.width !== nextWidth) {
          summaryContainer.style.width = nextWidth;
        }
        if (summaryContainer.style.maxHeight !== nextMaxHeight) {
          summaryContainer.style.maxHeight = nextMaxHeight;
        }
        if (hasLocalHistory && !isBusy) {
          const historyBrowser = summaryContainer.querySelector(".topic-summary-history-browser");
          const isHistoryVisible = historyBrowser && historyBrowser.style.display === "block";
          const contentWrapper = summaryContainer.querySelector(".topic-summary-content");
          const contentEmpty = !contentWrapper || !contentWrapper.innerHTML.trim();
          if (!isHistoryVisible && contentEmpty) {
            showTopicSummary(summaryContainer, buttonGroup, history[0].summary, topicId, {
              preferredMode: getTopicSummaryViewMode(topicId),
              historyList: history
            });
          }
        }
      });
      pruneTopicSummaryViewState(topicIdsOnPage);
      applyTrackedSummaryExpansions(topicIdsOnPage);
      scheduleListSummaryPostRenderTasks();
    }
    async function silentlyMergeTopicHistoryFromDrive(topicId) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!normalizedTopicId || !canAttemptDrivePull() || typeof pullTopicHistoryFromDrive2 !== "function") {
        return { ok: false, skipped: true, reason: "drive-unavailable", history: [] };
      }
      const localHistoryBefore = getSummaryHistory2(normalizedTopicId);
      if (localHistoryBefore.length === 0) {
        return { ok: false, skipped: true, reason: "local-history-missing", history: [] };
      }
      try {
        const pullResult = await pullTopicHistoryFromDrive2(normalizedTopicId, {
          silent: true,
          suppressStatus: true,
          mergeWithLocal: true
        });
        const refreshedHistory = getSummaryHistory2(normalizedTopicId);
        const historyChanged = !areSummaryHistoryListsEqual2(localHistoryBefore, refreshedHistory);
        if (pullResult?.ok) {
          updateTopicSummaryButtons(normalizedTopicId);
        }
        return {
          ok: pullResult?.ok === true,
          changed: historyChanged,
          source: pullResult?.source || "none",
          history: refreshedHistory.length > 0 ? refreshedHistory : localHistoryBefore,
          error: pullResult?.error || null
        };
      } catch (error) {
        console.warn(`Silent Drive merge failed for topic ${normalizedTopicId}:`, error);
        return {
          ok: false,
          changed: false,
          error,
          history: localHistoryBefore
        };
      }
    }
    async function handleTopicSummaryButtonClick(button, container, buttonGroup, topicId, summaryRow) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!button || !container || !buttonGroup || !summaryRow || !normalizedTopicId) return;
      const isExpanded = isSummaryRowExpandedByTopicId(normalizedTopicId);
      if (isExpanded && !pendingManualAfterDriveFailTopics2.has(normalizedTopicId)) {
        collapseTopicSummaryView(normalizedTopicId, { clearTracking: true });
        return;
      }
      if (!expandTopicSummaryView(normalizedTopicId, { closeOthers: true, track: true })) {
        return;
      }
      if (isTopicSummaryBusy(normalizedTopicId)) {
        createToast2(getTopicSummaryBusyToastMessage(normalizedTopicId), "info", null, normalizedTopicId);
        return;
      }
      const { hasLocalHistory, hasSummaryState } = getTopicSummaryState(normalizedTopicId);
      const history = hasLocalHistory ? getSummaryHistory2(normalizedTopicId) : [];
      if (hasLocalHistory) {
        pendingManualAfterDriveFailTopics2.delete(normalizedTopicId);
        showTopicSummary(container, buttonGroup, history[0].summary, normalizedTopicId, {
          renderMode: history[0]?.renderMode
        });
        const mergeResult = await silentlyMergeTopicHistoryFromDrive(normalizedTopicId);
        if (mergeResult.changed && Array.isArray(mergeResult.history) && mergeResult.history.length > 0) {
          const latest = mergeResult.history[0];
          if (latest?.summary) {
            showTopicSummary(container, buttonGroup, latest.summary, normalizedTopicId, {
              renderMode: latest.renderMode,
              preferredMode: getTopicSummaryViewMode(normalizedTopicId),
              historyList: mergeResult.history
            });
          }
        }
        return;
      }
      if (hasSummaryState && canAttemptDrivePull() && !pendingManualAfterDriveFailTopics2.has(normalizedTopicId)) {
        if (button.classList.contains("loading")) return;
        listDriveHistoryPullingTopics.add(normalizedTopicId);
        updateTopicSummaryButtons(normalizedTopicId);
        let pullContentWrapper = container.querySelector(".topic-summary-content");
        if (!pullContentWrapper) {
          pullContentWrapper = document.createElement("div");
          pullContentWrapper.className = "topic-summary-content";
          container.insertBefore(pullContentWrapper, buttonGroup);
        }
        clearSummaryRenderPayload2(pullContentWrapper);
        setListSummaryHtml(
          pullContentWrapper,
          '<div class="loading-indicator">正在从 Drive 拉取总结，请稍候...</div>',
          { preserveSelection: true }
        );
        pullContentWrapper.style.display = "block";
        applyTopicSummaryViewMode(
          container,
          buttonGroup,
          normalizedTopicId,
          TOPIC_SUMMARY_VIEW_MODE.SUMMARY,
          { historyList: history }
        );
        try {
          const pullResult = await pullTopicHistoryFromDrive2(normalizedTopicId, { silent: true });
          if (pullResult.ok && Array.isArray(pullResult.history) && pullResult.history.length > 0) {
            pendingManualAfterDriveFailTopics2.delete(normalizedTopicId);
            const refreshedHistory = getSummaryHistory2(normalizedTopicId);
            const latest = refreshedHistory[0] || pullResult.history[0];
            if (latest?.summary) {
              showTopicSummary(container, buttonGroup, latest.summary, normalizedTopicId, {
                renderMode: latest.renderMode
              });
            }
            createToast2("已从 Drive 拉取该话题总结。", "success", 2400, normalizedTopicId);
            return;
          }
          pendingManualAfterDriveFailTopics2.add(normalizedTopicId);
          const reason = normalizeErrorMessage(pullResult?.error);
          createToast2(`Drive 拉取失败：${reason}。再次点击将手动重新总结。`, "warning", null, normalizedTopicId);
          renderTopicSummaryError(container, buttonGroup, normalizedTopicId, reason, {
            title: "Drive 拉取失败",
            action: "再次点击即可手动重新总结。"
          });
          return;
        } finally {
          listDriveHistoryPullingTopics.delete(normalizedTopicId);
          updateTopicSummaryButtons(normalizedTopicId);
        }
      }
      if (button.classList.contains("loading")) return;
      setTopicSummaryButtonBusyState(button, "⏳ 总结中...");
      let contentWrapper = container.querySelector(".topic-summary-content");
      if (!contentWrapper) {
        contentWrapper = document.createElement("div");
        contentWrapper.className = "topic-summary-content";
        container.insertBefore(contentWrapper, buttonGroup);
      }
      clearSummaryRenderPayload2(contentWrapper);
      setListSummaryHtml(
        contentWrapper,
        '<div class="loading-indicator">正在生成总结，请稍候...</div>',
        { preserveSelection: true }
      );
      contentWrapper.style.display = "block";
      applyTopicSummaryViewMode(
        container,
        buttonGroup,
        normalizedTopicId,
        TOPIC_SUMMARY_VIEW_MODE.SUMMARY
      );
      const summarizingToast = createSummarizingToast2(normalizedTopicId);
      const requestContext = captureCurrentSummaryRequestContext2();
      const operationApi = {
        ...typeof getCurrentApiConfiguration2 === "function" ? getCurrentApiConfiguration2() : {}
      };
      state2.summarizingTopics.add(normalizedTopicId);
      updateSidebarSubmitButtonState2(normalizedTopicId);
      try {
        const { startFloor, endFloor } = await getFullFloorRangeForTopic(
          normalizedTopicId,
          void 0,
          operationApi
        );
        const summary = await main(normalizedTopicId, startFloor, endFloor, 0, operationApi);
        summarizingToast.changeType("success");
        summarizingToast.update("总结生成成功！");
        saveSummaryHistory2(normalizedTopicId, summary, requestContext.model, requestContext);
        pendingManualAfterDriveFailTopics2.delete(normalizedTopicId);
        loadHistoryForCurrentTopic2();
        autoShowHistoryIfExists2(normalizedTopicId);
        showTopicSummary(container, buttonGroup, summary, normalizedTopicId, requestContext);
        if (getTrackedExpandedTopicId() === normalizedTopicId) {
          expandTopicSummaryView(normalizedTopicId, { closeOthers: true, track: true });
        }
        button.classList.remove("loading");
        button.classList.add("has-summary");
        button.textContent = "📝 已总结";
        button.disabled = false;
        const topicItem = button.closest(".topic-list-item");
        if (topicItem) topicItem.classList.add("has-summary");
      } catch (error) {
        console.error(`List summary failed for ${normalizedTopicId}:`, error);
        const reason = normalizeErrorMessage(error);
        summarizingToast.changeType("error");
        summarizingToast.update(`总结失败: ${reason}`);
        renderTopicSummaryError(container, buttonGroup, normalizedTopicId, error);
        button.classList.remove("loading");
        const { hasSummaryState: hasNextSummaryState } = getTopicSummaryState(normalizedTopicId);
        if (hasNextSummaryState) {
          button.classList.add("has-summary");
          button.textContent = "📝 已总结";
        } else {
          button.classList.remove("has-summary");
          button.textContent = "📝 总结";
        }
        button.disabled = false;
        if (getTrackedExpandedTopicId() === normalizedTopicId) {
          expandTopicSummaryView(normalizedTopicId, { closeOthers: true, track: true });
        }
      } finally {
        state2.summarizingTopics.delete(normalizedTopicId);
        updateTopicSummaryButtons(normalizedTopicId);
        updateSidebarSubmitButtonState2(normalizedTopicId);
      }
    }
    function handleTopicQuestionButtonClick(button, container, buttonGroup, topicId, summaryRow) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!button || !container || !buttonGroup || !summaryRow || !normalizedTopicId) return;
      const isQuestionExpanded = getTopicSummaryViewMode(normalizedTopicId) === TOPIC_SUMMARY_VIEW_MODE.QUESTION && getComputedStyle(summaryRow).display !== "none";
      if (isQuestionExpanded) {
        collapseTopicSummaryView(normalizedTopicId, { clearTracking: true });
        return;
      }
      if (!expandTopicSummaryView(normalizedTopicId, { closeOthers: true, track: true })) {
        return;
      }
      showTopicQuestionPanel(container, buttonGroup, normalizedTopicId, { focus: true });
    }
    function restoreExpandedSummaryRows() {
      const topicIdsOnPage = /* @__PURE__ */ new Set();
      document.querySelectorAll(".topic-summary-button[data-topic-id]").forEach((button) => {
        const topicId = normalizeTopicId4(button.dataset.topicId);
        if (topicId) topicIdsOnPage.add(topicId);
      });
      applyTrackedSummaryExpansions(topicIdsOnPage);
    }
    function applyTopicSummaryViewMode(container, buttonGroup, topicId, mode, options = {}) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!container || !buttonGroup || !normalizedTopicId) {
        return TOPIC_SUMMARY_VIEW_MODE.SUMMARY;
      }
      const desiredMode = normalizeTopicSummaryViewMode(mode);
      const { contentWrapper, historyBrowser } = ensureTopicSummaryContentElements(container, buttonGroup);
      if (!contentWrapper || !historyBrowser) {
        return TOPIC_SUMMARY_VIEW_MODE.SUMMARY;
      }
      const questionPanel = container.querySelector(".topic-question-panel");
      const historyList = Array.isArray(options.historyList) ? options.historyList : getSummaryHistory2(normalizedTopicId);
      if (desiredMode === TOPIC_SUMMARY_VIEW_MODE.QUESTION) {
        contentWrapper.style.display = "none";
        historyBrowser.style.display = "none";
        if (questionPanel) questionPanel.style.display = "flex";
        syncTopicSummaryHistoryButtonState(buttonGroup, false);
        syncTopicQuestionButtonState(normalizedTopicId, true);
        return setTopicSummaryViewMode(normalizedTopicId, TOPIC_SUMMARY_VIEW_MODE.QUESTION);
      }
      if (questionPanel) questionPanel.style.display = "none";
      syncTopicQuestionButtonState(normalizedTopicId, false);
      if (desiredMode === TOPIC_SUMMARY_VIEW_MODE.HISTORY) {
        if (historyList.length === 0) {
          historyBrowser.style.display = "none";
          contentWrapper.style.display = "block";
          syncTopicSummaryHistoryButtonState(buttonGroup, false);
          return setTopicSummaryViewMode(normalizedTopicId, TOPIC_SUMMARY_VIEW_MODE.SUMMARY);
        }
        createHistoryBrowserUI(historyBrowser, historyList, normalizedTopicId);
        historyBrowser.style.display = "block";
        contentWrapper.style.display = "none";
        syncTopicSummaryHistoryButtonState(buttonGroup, true);
        return setTopicSummaryViewMode(normalizedTopicId, TOPIC_SUMMARY_VIEW_MODE.HISTORY);
      }
      historyBrowser.style.display = "none";
      contentWrapper.style.display = "block";
      syncTopicSummaryHistoryButtonState(buttonGroup, false);
      return setTopicSummaryViewMode(normalizedTopicId, TOPIC_SUMMARY_VIEW_MODE.SUMMARY);
    }
    function showTopicSummary(container, buttonGroup, summary, topicId, options = {}) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!container || !buttonGroup || !normalizedTopicId) return;
      const { contentWrapper } = ensureTopicSummaryContentElements(container, buttonGroup);
      if (!contentWrapper) return;
      const historyList = Array.isArray(options.historyList) ? options.historyList : null;
      const renderMode = resolveSummaryRenderMode2(
        options.renderMode || historyList?.[0]?.renderMode,
        summary
      );
      renderListSummaryContent2(contentWrapper, summary, {
        preserveSelection: true,
        emptyHtml: "<p><i>总结加载失败或为空。</i></p>",
        renderMode
      });
      const preferredMode = normalizeTopicSummaryViewMode(
        options.preferredMode || getTopicSummaryViewMode(normalizedTopicId)
      );
      applyTopicSummaryViewMode(container, buttonGroup, normalizedTopicId, preferredMode, {
        historyList
      });
    }
    function showTopicQuestionPanel(container, buttonGroup, topicId, options = {}) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!container || !buttonGroup || !normalizedTopicId) return null;
      if (typeof openListQuestionPanel !== "function") return null;
      const panel = openListQuestionPanel({
        topicId: normalizedTopicId,
        container,
        buttonGroup,
        focus: options.focus !== false,
        onClose: () => collapseTopicSummaryView(normalizedTopicId, { clearTracking: true })
      });
      applyTopicSummaryViewMode(
        container,
        buttonGroup,
        normalizedTopicId,
        TOPIC_SUMMARY_VIEW_MODE.QUESTION
      );
      return panel;
    }
    function showTopicSummaryLoading(container, buttonGroup, topicId, message = "正在生成总结，请稍候...") {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!container || !buttonGroup || !normalizedTopicId) return false;
      const { contentWrapper } = ensureTopicSummaryContentElements(container, buttonGroup);
      if (!contentWrapper) return false;
      clearSummaryRenderPayload2(contentWrapper);
      setListSummaryHtml(
        contentWrapper,
        `<div class="loading-indicator">${message}</div>`,
        { preserveSelection: true }
      );
      contentWrapper.style.display = "block";
      applyTopicSummaryViewMode(
        container,
        buttonGroup,
        normalizedTopicId,
        TOPIC_SUMMARY_VIEW_MODE.SUMMARY,
        { historyList: [] }
      );
      return true;
    }
    async function toggleHistoryBrowser(container, historyButton, topicId) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!container || !historyButton || !normalizedTopicId) return;
      const buttonGroup = container.querySelector(".topic-summary-button-group");
      if (!buttonGroup) return;
      const { historyBrowser } = ensureTopicSummaryContentElements(container, buttonGroup);
      const historyVisible = historyBrowser ? getComputedStyle(historyBrowser).display !== "none" : false;
      const nextMode = historyVisible ? TOPIC_SUMMARY_VIEW_MODE.SUMMARY : TOPIC_SUMMARY_VIEW_MODE.HISTORY;
      let historyList = getSummaryHistory2(normalizedTopicId);
      if (nextMode === TOPIC_SUMMARY_VIEW_MODE.HISTORY) {
        const mergeResult = await silentlyMergeTopicHistoryFromDrive(normalizedTopicId);
        if (Array.isArray(mergeResult.history) && mergeResult.history.length > 0) {
          historyList = mergeResult.history;
        }
        if (mergeResult.changed && historyList.length > 0) {
          const latest = historyList[0];
          if (latest?.summary) {
            showTopicSummary(container, buttonGroup, latest.summary, normalizedTopicId, {
              preferredMode: nextMode,
              historyList
            });
            return;
          }
        }
      }
      applyTopicSummaryViewMode(container, buttonGroup, normalizedTopicId, nextMode, {
        historyList
      });
    }
    function createHistoryBrowserUI(historyBrowser, history, topicId) {
      if (!historyBrowser) return;
      clearSummaryRenderPayload2(historyBrowser);
      setListSummaryHtml(historyBrowser, "", { preserveSelection: true });
      if (!Array.isArray(history) || history.length === 0) return;
      const nav = document.createElement("div");
      nav.className = "topic-summary-history-nav";
      const counter = document.createElement("span");
      counter.style.fontSize = "12px";
      const prevButton = document.createElement("button");
      prevButton.className = "topic-summary-control-button";
      prevButton.innerHTML = '← <span style="font-size:10px">新</span>';
      prevButton.title = "上一条记录 (较新)";
      const nextButton = document.createElement("button");
      nextButton.className = "topic-summary-control-button";
      nextButton.innerHTML = '<span style="font-size:10px">旧</span> →';
      nextButton.title = "下一条记录 (较旧)";
      nav.appendChild(prevButton);
      nav.appendChild(counter);
      nav.appendChild(nextButton);
      const historyContent = document.createElement("div");
      historyContent.className = "topic-summary-history-content";
      let currentIndex = getTopicHistoryCursor(topicId, history.length);
      currentIndex = setTopicHistoryCursor(topicId, currentIndex, history.length);
      function updateHistoryContent() {
        const record = history[currentIndex];
        if (!record) return;
        renderTopicHistoryRecord2(historyContent, record, { preserveSelection: true });
        counter.textContent = `${currentIndex + 1} / ${history.length}`;
        setTopicHistoryCursor(topicId, currentIndex, history.length);
      }
      function updateNavButtons() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= history.length - 1;
      }
      prevButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentIndex > 0) {
          currentIndex -= 1;
          updateHistoryContent();
          updateNavButtons();
        }
      });
      nextButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentIndex < history.length - 1) {
          currentIndex += 1;
          updateHistoryContent();
          updateNavButtons();
        }
      });
      updateHistoryContent();
      updateNavButtons();
      historyBrowser.appendChild(nav);
      historyBrowser.appendChild(historyContent);
    }
    async function refreshTopicSummary(container, topicId) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!container || !normalizedTopicId) return;
      const buttonGroup = container.querySelector(".topic-summary-button-group");
      if (state2.summarizingTopics.has(normalizedTopicId)) {
        createToast2("该话题正在总结中，请稍候...", "info", null, normalizedTopicId);
        return;
      }
      let contentWrapper = container.querySelector(".topic-summary-content");
      if (!contentWrapper) {
        contentWrapper = document.createElement("div");
        contentWrapper.className = "topic-summary-content";
        if (buttonGroup) container.insertBefore(contentWrapper, buttonGroup);
        else container.appendChild(contentWrapper);
      }
      clearSummaryRenderPayload2(contentWrapper);
      setListSummaryHtml(
        contentWrapper,
        '<div class="loading-indicator">正在重新生成总结，请稍候...</div>',
        { preserveSelection: true }
      );
      contentWrapper.style.display = "block";
      if (buttonGroup) {
        applyTopicSummaryViewMode(
          container,
          buttonGroup,
          normalizedTopicId,
          TOPIC_SUMMARY_VIEW_MODE.SUMMARY
        );
      }
      const topicItem = container.closest("tr.topic-summary-row")?.previousElementSibling;
      let summaryButton = null;
      if (topicItem) {
        summaryButton = topicItem.querySelector(`.topic-summary-button[data-topic-id="${normalizedTopicId}"]`);
        if (summaryButton) {
          setTopicSummaryButtonBusyState(summaryButton, "⏳ 总结中...");
        }
      }
      const summarizingToast = createSummarizingToast2(normalizedTopicId);
      const requestContext = captureCurrentSummaryRequestContext2();
      const operationApi = {
        ...typeof getCurrentApiConfiguration2 === "function" ? getCurrentApiConfiguration2() : {}
      };
      state2.summarizingTopics.add(normalizedTopicId);
      updateSidebarSubmitButtonState2(normalizedTopicId);
      try {
        const { startFloor, endFloor } = await getFullFloorRangeForTopic(
          normalizedTopicId,
          void 0,
          operationApi
        );
        const summary = await main(normalizedTopicId, startFloor, endFloor, 0, operationApi);
        summarizingToast.changeType("success");
        summarizingToast.update("总结更新成功！");
        saveSummaryHistory2(normalizedTopicId, summary, requestContext.model, requestContext);
        pendingManualAfterDriveFailTopics2.delete(normalizedTopicId);
        loadHistoryForCurrentTopic2();
        autoShowHistoryIfExists2(normalizedTopicId);
        showTopicSummary(container, buttonGroup, summary, normalizedTopicId, requestContext);
        if (getTrackedExpandedTopicId() === normalizedTopicId) {
          expandTopicSummaryView(normalizedTopicId, { closeOthers: true, track: true });
        }
        if (summaryButton) {
          summaryButton.classList.remove("loading");
          summaryButton.classList.add("has-summary");
          summaryButton.textContent = "📝 已总结";
          summaryButton.disabled = false;
        }
        if (topicItem) topicItem.classList.add("has-summary");
      } catch (error) {
        console.error(`List refresh failed for ${normalizedTopicId}:`, error);
        const reason = normalizeErrorMessage(error);
        summarizingToast.changeType("error");
        summarizingToast.update(`总结失败: ${reason}`);
        renderTopicSummaryError(container, buttonGroup, normalizedTopicId, error);
        if (summaryButton) {
          summaryButton.classList.remove("loading");
          const { hasSummaryState } = getTopicSummaryState(normalizedTopicId);
          if (hasSummaryState) {
            summaryButton.classList.add("has-summary");
            summaryButton.textContent = "📝 已总结";
          } else {
            summaryButton.classList.remove("has-summary");
            summaryButton.textContent = "📝 总结";
          }
          summaryButton.disabled = false;
        }
      } finally {
        state2.summarizingTopics.delete(normalizedTopicId);
        updateTopicSummaryButtons(normalizedTopicId);
        updateSidebarSubmitButtonState2(normalizedTopicId);
      }
    }
    function removeTopicListSummaryButtons2(options = {}) {
      const preserveExpanded = options.preserveExpanded === true;
      const preserveViewState = options.preserveViewState === true || preserveExpanded;
      const summaryButtons = document.querySelectorAll(".topic-summary-button");
      const questionButtons = document.querySelectorAll(".topic-question-button");
      const summaryRows = document.querySelectorAll(".topic-summary-row");
      summaryButtons.forEach((button) => {
        button.remove();
      });
      questionButtons.forEach((button) => {
        button.remove();
      });
      summaryRows.forEach((row) => {
        row.remove();
      });
      document.querySelectorAll(".topic-list-item").forEach((item) => {
        item.classList.remove("has-summary-button");
        item.classList.remove("has-question-button");
        item.classList.remove("has-summary");
      });
      if (!preserveExpanded) {
        state2.expandedSummaryRows.clear();
      }
      if (!preserveViewState) {
        topicSummaryViewModeByTopic.clear();
        topicSummaryHistoryCursorByTopic.clear();
      }
    }
    function updateListSummaryStyles() {
      let styleElement = document.getElementById("list-summary-styles");
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "list-summary-styles";
        document.head.appendChild(styleElement);
      }
      styleElement.textContent = `
            .topic-summary-container {
                max-height: calc(1.5em * ${state2.listPageSummaryMaxLines}) !important;
            }
        `;
    }
    function updateTopicSummaryButtons(topicId) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      const buttons = document.querySelectorAll(`.topic-summary-button[data-topic-id="${normalizedTopicId}"]`);
      if (!buttons.length) return;
      const { hasSummaryState } = getTopicSummaryState(normalizedTopicId);
      const isSummarizing = state2.summarizingTopics.has(normalizedTopicId);
      const isDrivePulling = listDriveHistoryPullingTopics.has(normalizedTopicId);
      const isBusy = isSummarizing || isDrivePulling;
      const busyLabel = isDrivePulling ? "☁️ 拉取中..." : "⏳ 总结中...";
      buttons.forEach((button) => {
        button.disabled = isBusy;
        if (isBusy) {
          button.classList.add("loading");
          button.classList.remove("has-summary");
          button.textContent = busyLabel;
        } else if (hasSummaryState) {
          button.classList.remove("loading");
          button.classList.add("has-summary");
          button.textContent = "📝 已总结";
        } else {
          button.classList.remove("loading");
          button.classList.remove("has-summary");
          button.textContent = "📝 总结";
        }
        const topicItem = button.closest(".topic-list-item");
        if (topicItem) {
          if (hasSummaryState && !isBusy) {
            topicItem.classList.add("has-summary");
          } else {
            topicItem.classList.remove("has-summary");
          }
        }
      });
      if (isBusy || !hasSummaryState) {
        return;
      }
      const history = getSummaryHistory2(normalizedTopicId);
      if (history.length === 0) {
        return;
      }
      const { summaryRow, container, buttonGroup } = getTopicSummaryElements(normalizedTopicId);
      if (!summaryRow || !container || !buttonGroup) {
        return;
      }
      const historyBrowser = container.querySelector(".topic-summary-history-browser");
      if (historyBrowser && historyBrowser.style.display === "block") {
        return;
      }
      const contentWrapper = container.querySelector(".topic-summary-content");
      const currentHtml = String(contentWrapper?.innerHTML || "").trim();
      const shouldHydrateContent = summaryRow.style.display !== "none" && container.style.display !== "none" && (!currentHtml || currentHtml.includes("loading-indicator"));
      if (!shouldHydrateContent) {
        return;
      }
      showTopicSummary(container, buttonGroup, history[0].summary, normalizedTopicId, {
        preferredMode: getTopicSummaryViewMode(normalizedTopicId),
        historyList: history
      });
    }
    function updateAllSummaryButtonsAndContainers() {
      const buttons = document.querySelectorAll(".topic-summary-button");
      const topicIds = /* @__PURE__ */ new Set();
      buttons.forEach((button) => {
        const topicId = normalizeTopicId4(button.dataset.topicId);
        if (!topicId) return;
        if (topicIds.has(topicId)) return;
        topicIds.add(topicId);
        updateTopicSummaryButtons(topicId);
      });
      pruneTopicSummaryViewState(topicIds);
      applyTrackedSummaryExpansions(topicIds);
    }
    function hasListSummaryButtonsCoverage2() {
      if (!state2.listPageSummaryEnabled || !isListSummaryPageUrl2(state2.currentPageUrl)) return true;
      const topicItems = Array.from(document.querySelectorAll(".topic-list-item")).filter((item) => !isSoftHidden(item));
      if (topicItems.length === 0) return false;
      return topicItems.every((item) => {
        const topicId = normalizeTopicId4(extractTopicIdFromElement2(item));
        if (!topicId) return false;
        const summaryButtons = Array.from(item.querySelectorAll?.(".topic-summary-button") || []);
        const questionButtons = Array.from(item.querySelectorAll?.(".topic-question-button") || []);
        if (summaryButtons.length !== 1 || questionButtons.length !== 1) return false;
        const summaryButton = summaryButtons[0];
        const questionButton = questionButtons[0];
        if (normalizeTopicId4(summaryButton.dataset?.topicId) !== topicId || normalizeTopicId4(questionButton.dataset?.topicId) !== topicId) {
          return false;
        }
        if (!item.classList?.contains?.("has-summary-button") || !item.classList?.contains?.("has-question-button")) {
          return false;
        }
        const mountTarget = getTopicListButtonMountTarget(item);
        const summaryInBookmarkStack = item.classList?.contains?.("bookmark-list-item") && summaryButton.parentNode?.classList?.contains?.("topic-dearrow-control-stack");
        if (!mountTarget || !summaryInBookmarkStack && summaryButton.parentNode !== mountTarget) return false;
        if (questionButton.parentNode !== mountTarget) return false;
        const summaryRow = item.nextElementSibling;
        return Boolean(
          summaryRow?.classList?.contains?.("topic-summary-row") && normalizeTopicId4(summaryRow.dataset?.topicId) === topicId
        );
      });
    }
    function shouldIgnoreListSummaryMutationNode(node) {
      if (!node || node.nodeType !== 1) return true;
      const element = node;
      if (element.closest?.("#summary-sidebar, #settings-modal, #summary-toast-container")) return true;
      if (element.matches?.(LIST_SUMMARY_INTERNAL_SELECTOR)) return true;
      if (element.closest?.(LIST_SUMMARY_INTERNAL_SELECTOR)) return true;
      if (element.querySelector?.(LIST_SUMMARY_INTERNAL_SELECTOR)) return true;
      return false;
    }
    function mutationTouchesTopicList(mutation) {
      const targetElement = mutation.target && mutation.target.nodeType === 1 ? mutation.target : null;
      if (targetElement && targetElement.closest(LIST_SUMMARY_TOPIC_CONTAINER_SELECTOR)) {
        return true;
      }
      const changedNodes = [...mutation.addedNodes, ...mutation.removedNodes];
      for (const node of changedNodes) {
        if (!node || node.nodeType !== 1) continue;
        const element = node;
        if (element.matches(LIST_SUMMARY_TOPIC_CONTAINER_SELECTOR)) return true;
        if (element.querySelector && element.querySelector(".topic-list-item")) return true;
      }
      return false;
    }
    function shouldRefreshListSummaryFromMutations2(mutations) {
      if (!state2.listPageSummaryEnabled || !isListSummaryPageUrl2(state2.currentPageUrl)) return false;
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const item = mutation.target;
          if (!item?.matches?.(".topic-list-item")) continue;
          const hasSummaryButton = Boolean(item.querySelector?.(".topic-summary-button"));
          const hasQuestionButton = Boolean(item.querySelector?.(".topic-question-button"));
          if (hasSummaryButton !== item.classList?.contains?.("has-summary-button") || hasQuestionButton !== item.classList?.contains?.("has-question-button")) {
            return true;
          }
          continue;
        }
        if (mutation.type !== "childList") continue;
        if (!mutation.addedNodes.length && !mutation.removedNodes.length) continue;
        if (!mutationTouchesTopicList(mutation)) continue;
        const targetElement = mutation.target && mutation.target.nodeType === 1 ? mutation.target : null;
        if (targetElement && shouldIgnoreListSummaryMutationNode(targetElement)) continue;
        const changedNodes = [...mutation.addedNodes, ...mutation.removedNodes];
        let hasMeaningfulChanges = false;
        for (const node of changedNodes) {
          if (shouldIgnoreListSummaryMutationNode(node)) continue;
          hasMeaningfulChanges = true;
          break;
        }
        if (hasMeaningfulChanges) return true;
      }
      return false;
    }
    return {
      addTopicListSummaryButtons,
      updateAllSummaryButtonsAndContainers,
      scheduleListSummaryRefresh: scheduleListSummaryRefresh2,
      expandSummaryRowByTopicId: expandSummaryRowByTopicId2,
      isSummaryRowExpandedByTopicId,
      restoreExpandedSummaryRows,
      removeTopicListSummaryButtons: removeTopicListSummaryButtons2,
      updateTopicSummaryButtons,
      updateListSummaryStyles,
      hasListSummaryButtonsCoverage: hasListSummaryButtonsCoverage2,
      shouldRefreshListSummaryFromMutations: shouldRefreshListSummaryFromMutations2
    };
  }

  // src/features/questionAnswer/index.js
  function createQuestionAnswerFeature(deps = {}) {
    const {
      state: state2,
      createToast: createToast2,
      getQuestionHistory,
      getQuestionPromptPresets: getQuestionPromptPresets2,
      askTopicQuestion: askTopicQuestion2,
      getCurrentApiConfiguration: getCurrentApiConfiguration2,
      normalizeAutoRetryCount: normalizeAutoRetryCount2,
      normalizeAutoRetryInterval: normalizeAutoRetryInterval2,
      waitForRetry,
      pullTopicQuestionHistoryFromDrive: pullTopicQuestionHistoryFromDrive2,
      setQuestionHtml
    } = deps;
    const activePanelsByTopic = /* @__PURE__ */ new Map();
    function normalizeTopicId4(topicId) {
      if (topicId === null || topicId === void 0) return "";
      return String(topicId).trim();
    }
    function escapeHtml(value) {
      return String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[char]);
    }
    function getPresets() {
      if (typeof getQuestionPromptPresets2 === "function") {
        return getQuestionPromptPresets2();
      }
      return getAllQuestionPromptPresets(state2?.customQuestionPresets || []);
    }
    function updateHtml(target, html, options = {}) {
      if (!target) return false;
      const nextHtml = html === null || html === void 0 ? "" : String(html);
      if (typeof setQuestionHtml === "function") {
        return setQuestionHtml(target, nextHtml, options);
      }
      target.innerHTML = nextHtml;
      return true;
    }
    function renderAnswerMarkdown(answer) {
      const text = answer === null || answer === void 0 ? "" : String(answer);
      if (!text.trim()) return "<p><i>回答内容为空。</i></p>";
      return g.parse(text);
    }
    function renderQuestionHistory(panel) {
      if (!panel) return;
      const topicId = normalizeTopicId4(panel.dataset.topicId);
      const historyEl = panel.querySelector(".topic-question-history");
      if (!historyEl || !topicId) return;
      const history = typeof getQuestionHistory === "function" ? getQuestionHistory(topicId) : [];
      if (!Array.isArray(history) || history.length === 0) {
        updateHtml(historyEl, '<p class="topic-question-empty">暂无问答记录。</p>', { preserveSelection: true });
        return;
      }
      const html = history.map((record) => {
        const presetLabel = record?.presetName ? `<span class="topic-question-preset-label">${escapeHtml(record.presetName)}</span>` : "";
        const timestamp = record?.timestamp ? new Date(record.timestamp).toLocaleString() : "";
        const meta = [
          timestamp ? escapeHtml(timestamp) : "",
          record?.model ? escapeHtml(record.model) : ""
        ].filter(Boolean).join(" · ");
        return `
                <article class="topic-question-record">
                    <div class="topic-question-record-question">
                        ${presetLabel}
                        <strong>问：</strong>${escapeHtml(record?.question || "")}
                    </div>
                    <div class="topic-question-record-answer markdown-content">${renderAnswerMarkdown(record?.answer || "")}</div>
                    ${meta ? `<div class="topic-question-record-meta">${meta}</div>` : ""}
                </article>
            `;
      }).join("");
      updateHtml(historyEl, html, { preserveSelection: true });
    }
    function renderPresetButtons(panel) {
      if (!panel) return;
      const presetBar = panel.querySelector(".topic-question-presets");
      const menu = panel.querySelector(".topic-question-preset-menu");
      if (!presetBar || !menu) return;
      const presets = getPresets();
      const makeButton = (preset, className = "topic-question-preset-button") => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = className;
        button.dataset.presetId = preset.id;
        button.textContent = preset.name;
        button.title = preset.prompt;
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.currentTarget?.blur?.();
          fillPreset(panel, preset);
          hidePresetMenu(panel);
        });
        return button;
      };
      presetBar.innerHTML = "";
      menu.innerHTML = "";
      presets.forEach((preset) => {
        presetBar.appendChild(makeButton(preset));
        menu.appendChild(makeButton(preset, "topic-question-preset-menu-item"));
      });
    }
    function fillPreset(panel, preset) {
      if (!panel || !preset) return;
      const input = panel.querySelector(".topic-question-input");
      if (!input) return;
      input.value = preset.prompt || preset.name || "";
      input.dataset.presetId = preset.id || "";
      input.dataset.presetName = preset.name || "";
      input.focus();
    }
    function hidePresetMenu(panel) {
      const menu = panel?.querySelector(".topic-question-preset-menu");
      if (menu) menu.hidden = true;
      panel?.classList.remove("topic-question-menu-open");
    }
    function showPresetMenu(panel) {
      const menu = panel?.querySelector(".topic-question-preset-menu");
      if (!menu) return;
      renderPresetButtons(panel);
      menu.hidden = false;
      panel?.classList.add("topic-question-menu-open");
    }
    function setPanelStatus(panel, message = "", type = "") {
      const status = panel?.querySelector(".topic-question-status");
      if (!status) return;
      status.textContent = message || "";
      status.classList.remove("info", "success", "warning", "error");
      if (type) status.classList.add(type);
    }
    function setPanelLoading(panel, isLoading, sendButtonLabel = "发送") {
      if (!panel) return;
      const input = panel.querySelector(".topic-question-input");
      const sendButton = panel.querySelector(".topic-question-send");
      panel.classList.toggle("topic-question-panel-loading", Boolean(isLoading));
      if (input) input.disabled = Boolean(isLoading);
      if (sendButton) {
        sendButton.disabled = Boolean(isLoading);
        sendButton.textContent = isLoading ? "等待回复" : sendButtonLabel;
      }
    }
    function normalizeFallbackRetryNumber(value, fallback = 0) {
      const parsedFallback = parseInt(fallback, 10);
      const normalizedFallback = Number.isNaN(parsedFallback) ? 0 : Math.max(0, parsedFallback);
      const parsed = parseInt(value, 10);
      if (Number.isNaN(parsed)) return normalizedFallback;
      return Math.max(0, parsed);
    }
    function getQuestionRetrySettings() {
      const currentConfig = typeof getCurrentApiConfiguration2 === "function" ? getCurrentApiConfiguration2() : null;
      const fallbackRetryCount = state2?.autoRetryCount ?? 0;
      const fallbackRetryInterval = state2?.autoRetryInterval ?? 0;
      const retryCountSource = currentConfig?.retryCount ?? fallbackRetryCount;
      const retryIntervalSource = currentConfig?.retryInterval ?? fallbackRetryInterval;
      const retryCount = typeof normalizeAutoRetryCount2 === "function" ? normalizeAutoRetryCount2(retryCountSource, fallbackRetryCount) : normalizeFallbackRetryNumber(retryCountSource, fallbackRetryCount);
      const retryInterval = typeof normalizeAutoRetryInterval2 === "function" ? normalizeAutoRetryInterval2(retryIntervalSource, fallbackRetryInterval) : normalizeFallbackRetryNumber(retryIntervalSource, fallbackRetryInterval);
      if (state2 && retryCount > 0) {
        state2.autoRetryCount = retryCount;
        state2.autoRetryInterval = retryInterval;
      }
      return {
        retryCount,
        retryInterval
      };
    }
    function isNonRetryableQuestionError(error) {
      if (!error || typeof error !== "object") return false;
      return error.retryable === false || error.code === "CONTENT_FILTER_BLOCKED";
    }
    function waitBeforeRetry(seconds) {
      if (typeof waitForRetry === "function") {
        return waitForRetry(seconds);
      }
      return new Promise((resolve) => setTimeout(resolve, Math.max(0, seconds) * 1e3));
    }
    async function askTopicQuestionWithRetry({ panel, topicId, question, preset }) {
      let retryAttempt = 0;
      while (true) {
        try {
          return await askTopicQuestion2({
            topicId,
            question,
            preset
          });
        } catch (error) {
          const { retryCount, retryInterval } = getQuestionRetrySettings();
          if (!isNonRetryableQuestionError(error) && retryAttempt < retryCount) {
            const message = `提问失败，正在尝试第 ${retryAttempt + 2}/${retryCount + 1} 次重试...`;
            setPanelStatus(panel, message, "warning");
            if (typeof createToast2 === "function") {
              createToast2(message, "warning", null, topicId);
            }
            retryAttempt += 1;
            await waitBeforeRetry(retryInterval);
            continue;
          }
          if (isNonRetryableQuestionError(error) || retryCount <= 0) {
            throw error;
          }
          const finalError = new Error(`提问失败，已达到最大重试次数 (${retryCount + 1})。错误: ${error.message}`);
          finalError.cause = error;
          throw finalError;
        }
      }
    }
    function syncSidebarQuestionButtonState(isActive) {
      const questionButton = document.getElementById("question-button");
      if (!questionButton) return;
      questionButton.classList.toggle("active", Boolean(isActive));
      questionButton.dataset.expanded = isActive ? "true" : "false";
    }
    async function refreshQuestionHistoryFromDrive(panel, topicId) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!normalizedTopicId || typeof pullTopicQuestionHistoryFromDrive2 !== "function") return;
      if (!state2?.driveSummarySettings?.enabled) return;
      try {
        const result = await pullTopicQuestionHistoryFromDrive2(normalizedTopicId, {
          silent: true,
          suppressStatus: true,
          mergeWithLocal: true
        });
        if (result?.ok) {
          renderQuestionHistory(panel);
        }
      } catch (error) {
        console.warn(`Failed to pull question history for topic ${normalizedTopicId}:`, error);
      }
    }
    async function sendQuestion(panel) {
      const topicId = normalizeTopicId4(panel?.dataset.topicId);
      const input = panel?.querySelector(".topic-question-input");
      const sendButton = panel?.querySelector(".topic-question-send");
      if (!topicId || !input) return;
      const question = String(input.value || "").trim();
      if (!question) {
        setPanelStatus(panel, "请输入问题。", "warning");
        return;
      }
      const preset = {
        id: input.dataset.presetId || "",
        name: input.dataset.presetName || "",
        prompt: question
      };
      const sendButtonLabel = sendButton?.textContent || "发送";
      setPanelLoading(panel, true, sendButtonLabel);
      setPanelStatus(panel, "正在等待 AI 回复...", "info");
      try {
        if (typeof askTopicQuestion2 !== "function") {
          throw new Error("缺少提问请求处理函数");
        }
        await askTopicQuestionWithRetry({
          panel,
          topicId,
          question,
          preset
        });
        input.value = "";
        input.dataset.presetId = "";
        input.dataset.presetName = "";
        setPanelStatus(panel, "回答已生成。", "success");
        renderQuestionHistory(panel);
      } catch (error) {
        const message = error?.message || String(error || "未知错误");
        setPanelStatus(panel, `提问失败：${message}`, "error");
        if (typeof createToast2 === "function") {
          createToast2(`提问失败：${message}`, "error", null, topicId);
        }
      } finally {
        setPanelLoading(panel, false, sendButtonLabel);
        input.focus();
      }
    }
    function bindPanelEvents(panel) {
      if (!panel || panel.dataset.bound === "true") return;
      panel.dataset.bound = "true";
      const input = panel.querySelector(".topic-question-input");
      const sendButton = panel.querySelector(".topic-question-send");
      const closeButton = panel.querySelector(".topic-question-close");
      if (sendButton) {
        sendButton.addEventListener("click", (event) => {
          event.preventDefault();
          sendQuestion(panel);
        });
      }
      if (closeButton) {
        closeButton.addEventListener("click", (event) => {
          event.preventDefault();
          closeQuestionPanel(panel);
        });
      }
      if (input) {
        input.addEventListener("keydown", (event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
            event.preventDefault();
            sendQuestion(panel);
            return;
          }
          if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey) {
            const value = input.value || "";
            const start = input.selectionStart ?? value.length;
            const end = input.selectionEnd ?? value.length;
            const before = value.slice(0, start);
            const after = value.slice(end);
            if (!before.trim() && !after.trim()) {
              event.preventDefault();
              showPresetMenu(panel);
            }
          }
          if (event.key === "Escape") {
            hidePresetMenu(panel);
          }
        });
        input.addEventListener("input", () => {
          if (input.value.trim()) {
            hidePresetMenu(panel);
          }
          if (!input.value.trim()) {
            input.dataset.presetId = "";
            input.dataset.presetName = "";
          }
        });
      }
    }
    function createQuestionPanel(topicId, mode = "sidebar") {
      const panel = document.createElement("div");
      panel.className = `topic-question-panel topic-question-panel-${mode}`;
      panel.dataset.topicId = topicId;
      panel.dataset.mode = mode;
      panel.style.display = "none";
      panel.innerHTML = `
            <div class="topic-question-header">
                <div class="topic-question-title">
                    <span class="topic-question-title-mark" aria-hidden="true">?</span>
                    <strong>提问 / 追问</strong>
                </div>
                <button type="button" class="topic-question-close" title="关闭提问面板" aria-label="关闭提问面板">✕</button>
            </div>
            <div class="topic-question-presets" aria-label="提问预设"></div>
            <div class="topic-question-history"></div>
            <div class="topic-question-compose">
                <div class="topic-question-input-shell">
                    <div class="topic-question-preset-menu" hidden></div>
                    <textarea class="topic-question-input" rows="4" placeholder="输入问题，或输入 / 选择预设"></textarea>
                </div>
                <div class="topic-question-compose-actions">
                    <button type="button" class="topic-question-send">发送</button>
                </div>
            </div>
            <div class="topic-question-status" aria-live="polite"></div>
        `;
      bindPanelEvents(panel);
      renderPresetButtons(panel);
      return panel;
    }
    function preparePanel(panel, topicId, options = {}) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!panel || !normalizedTopicId) return null;
      panel.dataset.topicId = normalizedTopicId;
      renderPresetButtons(panel);
      renderQuestionHistory(panel);
      setPanelStatus(panel, "", "");
      panel.style.display = "flex";
      activePanelsByTopic.set(normalizedTopicId, panel);
      const input = panel.querySelector(".topic-question-input");
      if (input && options.focus !== false) {
        const focusInput = () => input.focus();
        if (typeof requestAnimationFrame === "function") {
          requestAnimationFrame(focusInput);
        } else {
          setTimeout(focusInput, 0);
        }
      }
      if (options.pullRemote !== false) {
        refreshQuestionHistoryFromDrive(panel, normalizedTopicId);
      }
      return panel;
    }
    function openSidebarQuestionPanel(topicId, options = {}) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!normalizedTopicId) {
        createToast2?.("无法获取当前主题ID！", "error");
        return null;
      }
      const scrollContainer = document.getElementById("summary-scroll-container");
      const resultDiv = document.getElementById("summary-result");
      const historyDiv = document.getElementById("summary-history");
      if (!scrollContainer) return null;
      let panel = scrollContainer.querySelector(".topic-question-panel-sidebar");
      if (!panel) {
        panel = createQuestionPanel(normalizedTopicId, "sidebar");
        if (resultDiv && resultDiv.parentNode === scrollContainer) {
          scrollContainer.insertBefore(panel, resultDiv);
        } else {
          scrollContainer.appendChild(panel);
        }
      }
      if (resultDiv) resultDiv.style.display = "none";
      if (historyDiv) historyDiv.style.display = "none";
      const historyButton = document.getElementById("history-button");
      if (historyButton) {
        historyButton.classList.remove("active");
        historyButton.style.backgroundColor = "";
        historyButton.style.color = "";
      }
      const preparedPanel = preparePanel(panel, normalizedTopicId, options);
      if (preparedPanel) syncSidebarQuestionButtonState(true);
      return preparedPanel;
    }
    function openListQuestionPanel({ topicId, container, buttonGroup, focus = true, onClose = null } = {}) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!normalizedTopicId || !container) return null;
      let panel = container.querySelector(".topic-question-panel-list");
      if (!panel) {
        panel = createQuestionPanel(normalizedTopicId, "list");
        if (buttonGroup && buttonGroup.parentNode === container) {
          container.insertBefore(panel, buttonGroup);
        } else {
          container.appendChild(panel);
        }
      }
      panel.__topicQuestionOnClose = typeof onClose === "function" ? onClose : null;
      const contentWrapper = container.querySelector(".topic-summary-content");
      const historyBrowser = container.querySelector(".topic-summary-history-browser");
      if (contentWrapper) contentWrapper.style.display = "none";
      if (historyBrowser) historyBrowser.style.display = "none";
      return preparePanel(panel, normalizedTopicId, { focus, pullRemote: true });
    }
    function closeQuestionPanel(panel) {
      if (!panel) return;
      const topicId = normalizeTopicId4(panel.dataset.topicId);
      panel.style.display = "none";
      hidePresetMenu(panel);
      if (topicId && activePanelsByTopic.get(topicId) === panel) {
        activePanelsByTopic.delete(topicId);
      }
      if (panel.dataset.mode === "sidebar") {
        syncSidebarQuestionButtonState(false);
        const resultDiv = document.getElementById("summary-result");
        if (resultDiv) resultDiv.style.display = "flex";
      } else if (typeof panel.__topicQuestionOnClose === "function") {
        panel.__topicQuestionOnClose(panel);
      }
    }
    function refreshOpenQuestionPanels(topicId = "") {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (normalizedTopicId) {
        const panel = activePanelsByTopic.get(normalizedTopicId);
        if (panel) renderQuestionHistory(panel);
        return;
      }
      activePanelsByTopic.forEach((panel) => renderQuestionHistory(panel));
    }
    return {
      openSidebarQuestionPanel,
      openListQuestionPanel,
      closeQuestionPanel,
      renderQuestionHistory,
      refreshOpenQuestionPanels,
      getPresets
    };
  }

  // src/features/sidebarUI/index.js
  function createSidebarUI({
    getSummaryHistory: getSummaryHistory2,
    renderSidebarHistoryRecord: renderSidebarHistoryRecord2,
    normalizeHistoryListForDisplay: normalizeHistoryListForDisplay2,
    onSubmit,
    onQuestionClick,
    onToggleSidebar
  } = {}) {
    let summarySelectionGuardsBound = false;
    let summarySelectionPointerActive = false;
    let summarySelectionRestoring = false;
    let summarySelectionRestoreScheduled = false;
    let summarySelectionSnapshotRange = null;
    let summarySelectionSnapshotHost = null;
    const SUMMARY_SELECTION_SCOPE_SELECTOR = [
      "#summary-result",
      "#summary-history",
      ".summary-content-wrapper",
      ".history-summary-wrapper",
      ".topic-summary-container",
      ".topic-summary-content",
      ".topic-summary-history-browser",
      ".topic-summary-history-content",
      ".topic-question-panel",
      ".topic-question-history",
      ".topic-question-record-answer"
    ].join(", ");
    const SUMMARY_CONTROL_SELECTOR = [
      "#summary-sidebar button",
      "#summary-sidebar input",
      "#summary-sidebar textarea",
      "#summary-sidebar select",
      ".topic-summary-button-group button",
      ".topic-summary-button",
      ".topic-question-button",
      ".topic-question-panel button",
      ".topic-question-panel textarea",
      ".topic-summary-control-button",
      '[role="button"]'
    ].join(", ");
    function createSidebar2() {
      const existingSidebar = document.getElementById("summary-sidebar");
      if (existingSidebar) {
        renderAskButtonIcon(existingSidebar.querySelector?.("#question-button"));
        return existingSidebar;
      }
      const sidebar = document.createElement("div");
      sidebar.id = "summary-sidebar";
      document.body.appendChild(sidebar);
      const scrollContainer = document.createElement("div");
      scrollContainer.id = "summary-scroll-container";
      sidebar.appendChild(scrollContainer);
      const form = document.createElement("form");
      form.id = "summary-form";
      form.innerHTML = `<div class="input-container">
                  <input type="text" id="building" name="building" placeholder="当前主题id" title="当前主题 ID" readonly tabindex="-1" aria-readonly="true">
            </div>
            <div class="button-container row-1">
                  <button type="button" id="settings-button" class="custom-button" title="脚本设置" >🛠️</button>
                  <button type="button" id="refresh-button" class="custom-button" title="刷新页面" >🔄</button>
                  <button type="button" id="question-button" class="custom-button question-button" title="提问 / 追问" aria-label="提问 / 追问">${ASK_BUTTON_ICON_SVG}</button>
            </div>
            <div class="button-container row-2">
                  <button type="button" id="history-button" class="custom-button history-button" title="查看历史记录" >📜 历史</button>
                  <button type="button" id="submit-button" class="custom-button save-button" title="总结 主题&回复" >⚡ 总结</button>
            </div>`;
      scrollContainer.appendChild(form);
      const resultDiv = document.createElement("div");
      resultDiv.id = "summary-result";
      scrollContainer.appendChild(resultDiv);
      const historyDiv = document.createElement("div");
      historyDiv.id = "summary-history";
      historyDiv.style.display = "none";
      scrollContainer.appendChild(historyDiv);
      const toggleBar = document.createElement("div");
      toggleBar.id = "toggle-bar";
      toggleBar.title = "展开/收起 侧边栏";
      sidebar.appendChild(toggleBar);
      toggleBar.addEventListener("mousedown", (event) => {
        event.preventDefault();
        if (typeof onToggleSidebar === "function") {
          onToggleSidebar();
        }
      });
      createHistoryNavigation(historyDiv);
      bindSidebarScrollGuard(sidebar, scrollContainer);
      const submitButton = form.querySelector("#submit-button");
      if (submitButton) {
        submitButton.addEventListener("click", function(event) {
          event.preventDefault();
          if (typeof onSubmit === "function") {
            onSubmit(event);
          }
        });
      }
      const questionButton = form.querySelector("#question-button");
      if (questionButton) {
        renderAskButtonIcon(questionButton);
        questionButton.addEventListener("click", function(event) {
          event.preventDefault();
          if (typeof onQuestionClick === "function") {
            onQuestionClick(event);
          }
        });
      }
      return sidebar;
    }
    function isSidebarScrollableElement(element) {
      if (!(element instanceof HTMLElement)) return false;
      const overflowY = window.getComputedStyle(element).overflowY || "";
      return /(auto|scroll|overlay)/.test(overflowY) && element.scrollHeight > element.clientHeight + 1;
    }
    function canSidebarElementScroll(element, deltaY) {
      if (!isSidebarScrollableElement(element)) return false;
      const maxScrollTop = Math.max(0, element.scrollHeight - element.clientHeight);
      if (maxScrollTop <= 1) return false;
      if (deltaY < 0) return element.scrollTop > 0;
      if (deltaY > 0) return element.scrollTop < maxScrollTop - 1;
      return false;
    }
    function normalizeSidebarWheelDelta(event, fallbackHeight) {
      let deltaY = Number(event.deltaY) || 0;
      if (event.deltaMode === 1) {
        deltaY *= 16;
      } else if (event.deltaMode === 2) {
        deltaY *= fallbackHeight || window.innerHeight || 1;
      }
      return deltaY;
    }
    function collectSidebarScrollTargets(root, startNode) {
      if (!root) return [];
      const targets = [];
      let element = startNode && startNode.nodeType === 1 ? startNode : startNode?.parentElement || null;
      if (!element || !root.contains(element)) {
        element = root;
      }
      while (element) {
        if (isSidebarScrollableElement(element) && !targets.includes(element)) {
          targets.push(element);
        }
        if (element === root) break;
        element = element.parentElement;
      }
      if (!targets.includes(root) && isSidebarScrollableElement(root)) {
        targets.push(root);
      }
      return targets;
    }
    function findSidebarScrollTarget(root, startNode, deltaY) {
      const targets = collectSidebarScrollTargets(root, startNode);
      if (!targets.length) return null;
      if (deltaY === 0) return targets[0];
      return targets.find((target) => canSidebarElementScroll(target, deltaY)) || targets[0];
    }
    function applySidebarScrollDelta(target, deltaY) {
      if (!target || !deltaY) return false;
      const maxScrollTop = Math.max(0, target.scrollHeight - target.clientHeight);
      if (maxScrollTop <= 1) return false;
      const nextScrollTop = Math.min(maxScrollTop, Math.max(0, target.scrollTop + deltaY));
      if (Math.abs(nextScrollTop - target.scrollTop) < 0.5) return false;
      target.scrollTop = nextScrollTop;
      return true;
    }
    function bindSidebarScrollGuard(sidebar, scrollContainer) {
      if (!sidebar || !scrollContainer || sidebar.dataset.scrollGuardBound === "true") return;
      sidebar.dataset.scrollGuardBound = "true";
      let activeTouchId = null;
      let lastTouchX = null;
      let lastTouchY = null;
      sidebar.addEventListener("wheel", (event) => {
        if (event.ctrlKey) return;
        const deltaY = normalizeSidebarWheelDelta(event, scrollContainer.clientHeight);
        if (deltaY === 0) return;
        const scrollTarget = findSidebarScrollTarget(scrollContainer, event.target, deltaY);
        if (event.cancelable) event.preventDefault();
        event.stopPropagation();
        applySidebarScrollDelta(scrollTarget, deltaY);
      }, { passive: false, capture: true });
      sidebar.addEventListener("touchstart", (event) => {
        const touch = event.touches?.[0];
        activeTouchId = touch ? touch.identifier : null;
        lastTouchX = touch ? touch.clientX : null;
        lastTouchY = touch ? touch.clientY : null;
      }, { passive: true, capture: true });
      sidebar.addEventListener("touchmove", (event) => {
        if (activeTouchId === null) return;
        const touch = Array.from(event.touches || []).find((item) => item.identifier === activeTouchId) || event.touches?.[0];
        if (!touch || lastTouchX === null || lastTouchY === null) return;
        const deltaX = lastTouchX - touch.clientX;
        const deltaY = lastTouchY - touch.clientY;
        lastTouchX = touch.clientX;
        lastTouchY = touch.clientY;
        if (Math.abs(deltaY) <= Math.abs(deltaX)) return;
        const scrollTarget = findSidebarScrollTarget(scrollContainer, event.target, deltaY);
        if (event.cancelable) event.preventDefault();
        event.stopPropagation();
        applySidebarScrollDelta(scrollTarget, deltaY);
      }, { passive: false, capture: true });
      const resetTouchTracking = (event) => {
        if (activeTouchId === null) return;
        const activeStillExists = Array.from(event.touches || []).some((item) => item.identifier === activeTouchId);
        if (activeStillExists) return;
        activeTouchId = null;
        lastTouchX = null;
        lastTouchY = null;
      };
      sidebar.addEventListener("touchend", resetTouchTracking, { passive: true, capture: true });
      sidebar.addEventListener("touchcancel", resetTouchTracking, { passive: true, capture: true });
    }
    function createHistoryNavigation(historyDiv) {
      const applyHtml = setSummaryElementHtmlWithSelection;
      const navContainer = document.createElement("div");
      navContainer.id = "history-nav";
      navContainer.style.display = "flex";
      navContainer.style.justifyContent = "space-between";
      navContainer.style.alignItems = "center";
      navContainer.style.marginTop = "0px";
      const prevButton = document.createElement("button");
      prevButton.id = "prev-history";
      prevButton.className = "custom-button nav-button";
      prevButton.textContent = "← 新";
      prevButton.disabled = true;
      const counter = document.createElement("span");
      counter.id = "history-counter";
      counter.innerHTML = "0 / 0";
      counter.style.padding = "10px";
      const nextButton = document.createElement("button");
      nextButton.id = "next-history";
      nextButton.className = "custom-button nav-button";
      nextButton.textContent = "旧 →";
      nextButton.disabled = true;
      navContainer.appendChild(prevButton);
      navContainer.appendChild(counter);
      navContainer.appendChild(nextButton);
      historyDiv.appendChild(navContainer);
      const historyContent = document.createElement("div");
      historyContent.id = "history-content";
      historyContent.style.marginTop = "0px";
      historyDiv.appendChild(historyContent);
      let currentHistoryIndex = 0;
      let currentHistory = [];
      prevButton.addEventListener("click", () => {
        if (currentHistoryIndex > 0) {
          currentHistoryIndex -= 1;
          updateHistoryDisplay();
        }
      });
      nextButton.addEventListener("click", () => {
        if (currentHistoryIndex < currentHistory.length - 1) {
          currentHistoryIndex += 1;
          updateHistoryDisplay();
        }
      });
      function loadHistory(topicId) {
        let rawHistory = [];
        try {
          rawHistory = typeof getSummaryHistory2 === "function" ? getSummaryHistory2(topicId) : [];
        } catch (error) {
          console.warn("Failed to read summary history:", error);
          rawHistory = [];
        }
        currentHistory = typeof normalizeHistoryListForDisplay2 === "function" ? normalizeHistoryListForDisplay2(rawHistory) : [];
        currentHistoryIndex = 0;
        updateHistoryButtons();
        updateHistoryDisplay();
      }
      function updateHistoryDisplay() {
        const historyContentElement = document.getElementById("history-content");
        if (!historyContentElement) return;
        if (currentHistory.length === 0) {
          applyHtml(historyContentElement, "<p>暂无历史记录。</p>", { preserveSelection: true });
          counter.textContent = "0 / 0";
          return;
        }
        const record = currentHistory[currentHistoryIndex];
        if (!record || typeof record !== "object") {
          applyHtml(historyContentElement, "<p>暂无历史记录。</p>", { preserveSelection: true });
          counter.textContent = "0 / 0";
          return;
        }
        if (typeof renderSidebarHistoryRecord2 === "function") {
          renderSidebarHistoryRecord2(historyContentElement, record, { preserveSelection: true });
        }
        counter.textContent = `${currentHistoryIndex + 1} / ${currentHistory.length}`;
        updateHistoryButtons();
      }
      function updateHistoryButtons() {
        prevButton.disabled = currentHistoryIndex === 0;
        nextButton.disabled = currentHistoryIndex >= currentHistory.length - 1;
      }
      historyDiv.loadHistory = loadHistory;
    }
    function toElement(node) {
      if (!node) return null;
      if (node.nodeType === 1) return node;
      return node.parentElement || null;
    }
    function getSummaryScopeHost(node) {
      const element = toElement(node);
      if (!element) return null;
      return element.closest(SUMMARY_SELECTION_SCOPE_SELECTOR);
    }
    function getActiveSummarySelectionScope() {
      const selection = typeof window.getSelection === "function" ? window.getSelection() : null;
      if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        return null;
      }
      for (let index = 0; index < selection.rangeCount; index += 1) {
        const range = selection.getRangeAt(index);
        const startHost = getSummaryScopeHost(range.startContainer);
        const endHost = getSummaryScopeHost(range.endContainer);
        if (startHost && endHost) {
          if (startHost === endHost || startHost.contains(endHost)) {
            return { host: startHost, range };
          }
          if (endHost.contains(startHost)) {
            return { host: endHost, range };
          }
          return { host: startHost, range };
        }
      }
      return null;
    }
    function isSummaryControlTarget(node) {
      const element = toElement(node);
      if (!element) return false;
      return Boolean(element.closest(SUMMARY_CONTROL_SELECTOR));
    }
    function clearSummarySelectionSnapshot() {
      summarySelectionPointerActive = false;
      summarySelectionRestoring = false;
      summarySelectionRestoreScheduled = false;
      summarySelectionSnapshotRange = null;
      summarySelectionSnapshotHost = null;
    }
    function rememberSummarySelection(scope) {
      if (!scope || !scope.range || !scope.host) return false;
      try {
        summarySelectionSnapshotRange = scope.range.cloneRange();
        summarySelectionSnapshotHost = scope.host;
        return true;
      } catch (_2) {
        clearSummarySelectionSnapshot();
        return false;
      }
    }
    function captureSummarySelectionSnapshot() {
      const scope = getActiveSummarySelectionScope();
      if (!scope) return false;
      return rememberSummarySelection(scope);
    }
    function isSummarySelectionLocked2() {
      if (!summarySelectionSnapshotRange || !summarySelectionSnapshotHost) {
        return false;
      }
      if (!summarySelectionSnapshotHost.isConnected) {
        clearSummarySelectionSnapshot();
        return false;
      }
      const startNode = summarySelectionSnapshotRange.startContainer;
      if (startNode && typeof startNode.isConnected === "boolean" && !startNode.isConnected) {
        clearSummarySelectionSnapshot();
        return false;
      }
      return true;
    }
    function isEditableTarget(node) {
      const element = toElement(node);
      if (!element) return false;
      const tagName = String(element.tagName || "").toLowerCase();
      if (tagName === "input" || tagName === "textarea" || tagName === "select") return true;
      if (element.isContentEditable) return true;
      return Boolean(element.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]'));
    }
    function isSelectionInsideSummaryElement(element) {
      const target = toElement(element);
      if (!target) return false;
      const activeScope = getActiveSummarySelectionScope();
      if (activeScope && activeScope.host) {
        if (target === activeScope.host) return true;
        if (target.contains(activeScope.host) || activeScope.host.contains(target)) return true;
      }
      if (!isSummarySelectionLocked2()) return false;
      if (target === summarySelectionSnapshotHost) return true;
      if (target.contains(summarySelectionSnapshotHost)) return true;
      if (summarySelectionSnapshotHost.contains(target)) return true;
      return false;
    }
    function setSummaryElementHtmlWithSelection(element, html, options = {}) {
      const target = toElement(element);
      if (!target) return false;
      const nextHtml = html === null || html === void 0 ? "" : String(html);
      if (target.innerHTML === nextHtml) return false;
      const preserveSelection = options.preserveSelection !== false;
      if (preserveSelection && isSummarySelectionLocked2() && isSelectionInsideSummaryElement(target)) {
        return false;
      }
      target.innerHTML = nextHtml;
      return true;
    }
    function restoreSummarySelectionFromSnapshot() {
      if (!isSummarySelectionLocked2()) return false;
      const activeElement = document.activeElement;
      if (isEditableTarget(activeElement) && !getSummaryScopeHost(activeElement)) {
        clearSummarySelectionSnapshot();
        return false;
      }
      const selection = typeof window.getSelection === "function" ? window.getSelection() : null;
      if (!selection) return false;
      try {
        const nextRange = summarySelectionSnapshotRange.cloneRange();
        summarySelectionRestoring = true;
        selection.removeAllRanges();
        selection.addRange(nextRange);
        summarySelectionSnapshotRange = nextRange.cloneRange();
        summarySelectionSnapshotHost = getSummaryScopeHost(nextRange.startContainer) || summarySelectionSnapshotHost;
        return true;
      } catch (_2) {
        clearSummarySelectionSnapshot();
        return false;
      } finally {
        setTimeout(() => {
          summarySelectionRestoring = false;
        }, 0);
      }
    }
    function scheduleSummarySelectionRestore() {
      if (summarySelectionRestoreScheduled) return;
      if (summarySelectionPointerActive || summarySelectionRestoring) return;
      if (!isSummarySelectionLocked2()) return;
      summarySelectionRestoreScheduled = true;
      requestAnimationFrame(() => {
        summarySelectionRestoreScheduled = false;
        if (summarySelectionPointerActive || summarySelectionRestoring) return;
        const activeScope = getActiveSummarySelectionScope();
        if (activeScope) {
          rememberSummarySelection(activeScope);
          return;
        }
        restoreSummarySelectionFromSnapshot();
      });
    }
    function bindSummarySelectionGuards2() {
      if (summarySelectionGuardsBound) return;
      summarySelectionGuardsBound = true;
      const pointerDownHandler = (event) => {
        const targetHost = getSummaryScopeHost(event.target);
        if (targetHost && !isSummaryControlTarget(event.target)) {
          summarySelectionPointerActive = true;
          if (!captureSummarySelectionSnapshot()) {
            summarySelectionSnapshotHost = targetHost;
          }
          return;
        }
        clearSummarySelectionSnapshot();
      };
      const pointerUpHandler = () => {
        if (!summarySelectionPointerActive) return;
        summarySelectionPointerActive = false;
        const captured = captureSummarySelectionSnapshot();
        if (!captured) {
          clearSummarySelectionSnapshot();
        }
      };
      const selectionChangeHandler = () => {
        if (summarySelectionRestoring) return;
        const activeScope = getActiveSummarySelectionScope();
        if (activeScope) {
          rememberSummarySelection(activeScope);
          return;
        }
        scheduleSummarySelectionRestore();
      };
      const keyDownHandler = (event) => {
        if (event.key === "Escape") {
          clearSummarySelectionSnapshot();
        }
      };
      window.addEventListener("pointerdown", pointerDownHandler, true);
      window.addEventListener("mousedown", pointerDownHandler, true);
      window.addEventListener("pointerup", pointerUpHandler, true);
      window.addEventListener("mouseup", pointerUpHandler, true);
      window.addEventListener("keydown", keyDownHandler, true);
      document.addEventListener("selectionchange", selectionChangeHandler, true);
    }
    return {
      createSidebar: createSidebar2,
      createHistoryNavigation,
      bindSummarySelectionGuards: bindSummarySelectionGuards2,
      setSummaryElementHtml: setSummaryElementHtmlWithSelection,
      isSummarySelectionLocked: isSummarySelectionLocked2
    };
  }

  // src/features/settings/index.js
  function createSettingsController(deps = {}) {
    const {
      state: state2,
      GM_getValue: GM_getValue2,
      GM_setValue: GM_setValue2,
      GM_registerMenuCommand: GM_registerMenuCommand2,
      defaultSummaryPrompt: defaultSummaryPrompt2,
      defaultHTMLPrompt: defaultHTMLPrompt2,
      defaultSummaryOutputFilters: defaultSummaryOutputFilters2,
      DEFAULT_SUMMARY_WIDTH_OFFSET: DEFAULT_SUMMARY_WIDTH_OFFSET2,
      MIN_SUMMARY_PANEL_WIDTH: MIN_SUMMARY_PANEL_WIDTH2,
      createDefaultApiConfiguration: createDefaultApiConfiguration2,
      initializeImportExportFeature: initializeImportExportFeature2,
      resolveImportedSidebarSettings: resolveImportedSidebarSettings2,
      normalizeApiConfiguration: normalizeApiConfiguration2,
      normalizeApiConfigurations: normalizeApiConfigurations2,
      normalizeAutoRetryCount: normalizeAutoRetryCount2,
      normalizeAutoRetryInterval: normalizeAutoRetryInterval2,
      normalizeCurrentApiIndex: normalizeCurrentApiIndex2,
      normalizeDeArrowApiIndex: normalizeDeArrowApiIndex2,
      normalizeDeArrowPrompt: normalizeDeArrowPrompt2,
      normalizeDeArrowScopeRules: normalizeDeArrowScopeRules2,
      defaultDeArrowSettings: defaultDeArrowSettings2,
      validateDeArrowScopeRules: validateDeArrowScopeRules2,
      normalizeDeArrowTopicStates: normalizeDeArrowTopicStates2,
      normalizeSummaryOutputFilters: normalizeSummaryOutputFilters2,
      normalizeSummaryWidthOffset: normalizeSummaryWidthOffset2,
      sanitizeSummaryTopicIds: sanitizeSummaryTopicIds2,
      normalizeQuestionPromptPresets: normalizeQuestionPromptPresets2,
      getCurrentApiConfiguration: getCurrentApiConfiguration2,
      syncAutoRetrySettingsFromCurrentApiConfiguration: syncAutoRetrySettingsFromCurrentApiConfiguration2,
      persistApiConfigurations: persistApiConfigurations2,
      persistDriveSummarySettings: persistDriveSummarySettings2,
      persistSummaryTopicIds: persistSummaryTopicIds2,
      syncDriveSummarySettingsUI: syncDriveSummarySettingsUI2,
      createToast: createToast2,
      createSettingsToast: createSettingsToast2,
      getSummaryHistoryMap,
      setSummaryHistoryMap,
      getTopicQuestionHistoryMap,
      setTopicQuestionHistoryMap,
      getDeArrowTopicStates,
      setDeArrowTopicStates,
      syncSummaryTopicIdsFromSources: syncSummaryTopicIdsFromSources2,
      replaceSummaryTopicIdsFromHistoryMap: replaceSummaryTopicIdsFromHistoryMap2,
      markDriveSummaryTopicsDirty: markDriveSummaryTopicsDirty2,
      markDriveDeArrowDirty: markDriveDeArrowDirty2,
      scheduleDriveSummarySync: scheduleDriveSummarySync2,
      updateAllSummaryButtonsAndContainers,
      refreshListSummaryForCurrentPage: refreshListSummaryForCurrentPage2,
      clearListSummaryBootstrapWatcher: clearListSummaryBootstrapWatcher2,
      removeTopicListSummaryButtons: removeTopicListSummaryButtons2,
      addTopicListSummaryButtons,
      restoreExpandedSummaryRows,
      updateListSummaryStyles,
      refreshDeArrowForCurrentPage: refreshDeArrowForCurrentPage2,
      cancelDeArrowAutoRewrites: cancelDeArrowAutoRewrites2,
      updateSidebarSubmitButtonState: updateSidebarSubmitButtonState2,
      uploadSummaryHistoryToDrive: uploadSummaryHistoryToDrive2,
      rebuildSummaryTopicIdsFromDrive: rebuildSummaryTopicIdsFromDrive2,
      getDriveSummarySettings,
      extractTopicId: extractTopicId2,
      attemptAutoSummarize: attemptAutoSummarize2,
      isSidebarWidthScriptActive: isSidebarWidthScriptActive2,
      isListSummaryPageUrl: isListSummaryPageUrl2,
      registerPublicApiHandlers: registerPublicApiHandlers2
    } = deps;
    let persistListSummarySettingsHandler = null;
    let importExportFeatureController = null;
    let updatePromptSelect = () => {
    };
    let updateQuestionPresetSelect = () => {
    };
    let updateApiSelect = () => {
    };
    let updateDeArrowSettingsInputs = () => {
    };
    let updateSummaryWidthOffset = () => {
    };
    let updateAdjustmentPrompts2 = () => {
    };
    let updateSidebarPreview = () => {
      const sidebar = document.getElementById("summary-sidebar");
      if (!sidebar) return;
      const sidebarWidthSlider = document.getElementById("sidebar-width-slider");
      const sidebarTopSlider = document.getElementById("sidebar-top-slider");
      const sidebarBottomSlider = document.getElementById("sidebar-bottom-slider");
      const sidebarWidthValue = document.getElementById("sidebar-width-value");
      const sidebarTopValue = document.getElementById("sidebar-top-value");
      const sidebarBottomValue = document.getElementById("sidebar-bottom-value");
      const offsetInput = document.getElementById("summary-width-offset");
      if (!sidebarWidthSlider || !sidebarTopSlider || !sidebarBottomSlider || !sidebarWidthValue || !sidebarTopValue || !sidebarBottomValue || !offsetInput) {
        return;
      }
      const widthPercent = sidebarWidthSlider.value;
      const top = `${sidebarTopSlider.value}%`;
      const bottom = `${sidebarBottomSlider.value}%`;
      const widthOffset = parseInt(offsetInput.value, 10) || 0;
      let previewWidth;
      if (isSidebarWidthScriptActive2()) {
        const mainSidebarWidthStr = localStorage.getItem("discourseSidebarWidth") || "250px";
        const mainSidebarWidth = parseInt(mainSidebarWidthStr.replace("px", ""), 10) || 250;
        const rawWidth = mainSidebarWidth + widthOffset;
        const clampedWidth = Math.max(MIN_SUMMARY_PANEL_WIDTH2, rawWidth);
        previewWidth = `${clampedWidth}px`;
      } else {
        previewWidth = `${widthPercent}%`;
      }
      sidebar.style.width = previewWidth;
      sidebar.style.top = top;
      sidebar.style.height = `calc(100vh - ${top} - ${bottom})`;
      sidebarWidthValue.textContent = `${widthPercent}%`;
      sidebarTopValue.textContent = top;
      sidebarBottomValue.textContent = bottom;
    };
    let applyTabsCollapsedState = () => {
    };
    function lockBodyScroll() {
      const docEl = document.documentElement;
      const body = document.body;
      if (docEl) docEl.classList.add("settings-modal-open");
      if (body) body.classList.add("settings-modal-open");
    }
    function unlockBodyScroll() {
      const docEl = document.documentElement;
      const body = document.body;
      if (docEl) docEl.classList.remove("settings-modal-open");
      if (body) body.classList.remove("settings-modal-open");
    }
    function applySummaryWidthSettings2() {
      let cssValue;
      if (state2.summaryWidthType === "percent") {
        cssValue = `${state2.summaryWidthValue}%`;
      } else {
        cssValue = `${state2.summaryWidthValue}px`;
      }
      document.documentElement.style.setProperty("--summary-width-type", state2.summaryWidthType);
      document.documentElement.style.setProperty("--summary-width-value", cssValue);
      let styleElement = document.getElementById("summary-width-style");
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "summary-width-style";
        document.head.appendChild(styleElement);
      }
      styleElement.textContent = `
            .topic-summary-container {
                width: ${cssValue} !important;
                max-width: 100% !important;
                margin-left: 0 !important;
                margin-right: auto !important;
                box-sizing: border-box !important;
            }

            @media (max-width: ${state2.summaryWidthType === "pixel" ? parseInt(state2.summaryWidthValue, 10) + 40 + "px" : "768px"}) {
                .topic-summary-container {
                    width: 100% !important;
                }
            }
        `;
    }
    function saveAndApplySidebarSettings() {
      const widthSlider = document.getElementById("sidebar-width-slider");
      const topSlider = document.getElementById("sidebar-top-slider");
      const bottomSlider = document.getElementById("sidebar-bottom-slider");
      const positionSwitch = document.getElementById("sidebar-position-switch");
      const offsetInput = document.getElementById("summary-width-offset");
      const width = widthSlider ? `${widthSlider.value}%` : "15%";
      const top = topSlider ? `${topSlider.value}%` : "5%";
      const bottom = bottomSlider ? `${bottomSlider.value}%` : "5%";
      const position = positionSwitch && positionSwitch.checked ? "right" : "left";
      const clampedOffset = normalizeSummaryWidthOffset2(
        offsetInput ? offsetInput.value : state2.summaryWidthOffset,
        state2.summaryWidthOffset
      );
      if (offsetInput) {
        offsetInput.value = clampedOffset;
      }
      state2.summaryWidthOffset = clampedOffset;
      GM_setValue2("sidebarWidth", width);
      GM_setValue2("sidebarTopDistance", top);
      GM_setValue2("sidebarBottomDistance", bottom);
      GM_setValue2("sidebarPosition", position);
      GM_setValue2("summaryWidthOffset", state2.summaryWidthOffset);
      applySidebarSettings2();
    }
    function syncUIWithStoredSettings2() {
      const sidebarPositionSwitch = document.getElementById("sidebar-position-switch");
      const sidebarWidthSlider = document.getElementById("sidebar-width-slider");
      const sidebarWidthValue = document.getElementById("sidebar-width-value");
      const sidebarTopSlider = document.getElementById("sidebar-top-slider");
      const sidebarTopValue = document.getElementById("sidebar-top-value");
      const sidebarBottomSlider = document.getElementById("sidebar-bottom-slider");
      const sidebarBottomValue = document.getElementById("sidebar-bottom-value");
      const defaultOpenSidebarSwitch = document.getElementById("default-open-sidebar-switch");
      const sidebarAutoSummarizeSwitch = document.getElementById("sidebar-auto-summarize-switch");
      const summaryWidthOffsetInput = document.getElementById("summary-width-offset");
      const summaryFilterEnabled = document.getElementById("summary-filter-enabled");
      const summaryFilterPrefixes = document.getElementById("summary-filter-prefixes");
      const summaryFilterSuffixes = document.getElementById("summary-filter-suffixes");
      if (sidebarPositionSwitch) {
        const storedPosition = GM_getValue2("sidebarPosition", "left");
        sidebarPositionSwitch.checked = storedPosition === "right";
      }
      if (sidebarWidthSlider && sidebarWidthValue) {
        const storedWidth = GM_getValue2("sidebarWidth", "15%");
        sidebarWidthSlider.value = parseInt(storedWidth, 10);
        sidebarWidthValue.textContent = storedWidth;
      }
      if (sidebarTopSlider && sidebarTopValue) {
        const storedTopDistance = GM_getValue2("sidebarTopDistance", "5%");
        sidebarTopSlider.value = parseInt(storedTopDistance, 10);
        sidebarTopValue.textContent = storedTopDistance;
      }
      if (sidebarBottomSlider && sidebarBottomValue) {
        const storedBottomDistance = GM_getValue2("sidebarBottomDistance", "5%");
        sidebarBottomSlider.value = parseInt(storedBottomDistance, 10);
        sidebarBottomValue.textContent = storedBottomDistance;
      }
      if (defaultOpenSidebarSwitch) {
        defaultOpenSidebarSwitch.checked = state2.defaultOpenSidebar;
      }
      if (sidebarAutoSummarizeSwitch) {
        sidebarAutoSummarizeSwitch.checked = state2.newTopicAutoSummarize;
      }
      if (summaryWidthOffsetInput) {
        summaryWidthOffsetInput.value = state2.summaryWidthOffset;
      }
      if (summaryFilterEnabled || summaryFilterPrefixes || summaryFilterSuffixes) {
        const filterConfig = normalizeSummaryOutputFilters2(state2.summaryOutputFilters);
        if (summaryFilterEnabled) summaryFilterEnabled.checked = filterConfig.enabled;
        if (summaryFilterPrefixes) summaryFilterPrefixes.value = filterConfig.leadingTokens.join("\n");
        if (summaryFilterSuffixes) summaryFilterSuffixes.value = filterConfig.trailingTokens.join("\n");
      }
    }
    function parseSummaryFilterLines(value) {
      if (!value) return [];
      return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    }
    function updateSummaryFilterInputs() {
      const summaryFilterEnabled = document.getElementById("summary-filter-enabled");
      const summaryFilterPrefixes = document.getElementById("summary-filter-prefixes");
      const summaryFilterSuffixes = document.getElementById("summary-filter-suffixes");
      if (!summaryFilterEnabled && !summaryFilterPrefixes && !summaryFilterSuffixes) return;
      const filterConfig = normalizeSummaryOutputFilters2(state2.summaryOutputFilters);
      if (summaryFilterEnabled) summaryFilterEnabled.checked = filterConfig.enabled;
      if (summaryFilterPrefixes) summaryFilterPrefixes.value = filterConfig.leadingTokens.join("\n");
      if (summaryFilterSuffixes) summaryFilterSuffixes.value = filterConfig.trailingTokens.join("\n");
    }
    function saveSummaryFilterSettings({ showToast = true } = {}) {
      const summaryFilterEnabled = document.getElementById("summary-filter-enabled");
      const summaryFilterPrefixes = document.getElementById("summary-filter-prefixes");
      const summaryFilterSuffixes = document.getElementById("summary-filter-suffixes");
      if (!summaryFilterEnabled || !summaryFilterPrefixes || !summaryFilterSuffixes) return;
      state2.summaryOutputFilters = normalizeSummaryOutputFilters2({
        enabled: summaryFilterEnabled.checked,
        leadingTokens: parseSummaryFilterLines(summaryFilterPrefixes.value),
        trailingTokens: parseSummaryFilterLines(summaryFilterSuffixes.value)
      });
      GM_setValue2("summaryOutputFilters", state2.summaryOutputFilters);
      if (showToast) {
        createSettingsToast2("输出过滤设置已保存！", "success", 2400);
      }
    }
    function resetSummaryFilterSettings() {
      state2.summaryOutputFilters = normalizeSummaryOutputFilters2(defaultSummaryOutputFilters2);
      GM_setValue2("summaryOutputFilters", state2.summaryOutputFilters);
      updateSummaryFilterInputs();
      createSettingsToast2("输出过滤已恢复默认！", "info", 2400);
    }
    function applySidebarSettings2() {
      const sidebar = document.getElementById("summary-sidebar");
      if (!sidebar) return;
      const toggleBar = document.getElementById("toggle-bar");
      const position = GM_getValue2("sidebarPosition", "left");
      const topDistance = GM_getValue2("sidebarTopDistance", "5%");
      const bottomDistance = GM_getValue2("sidebarBottomDistance", "5%");
      const isOpen = sidebar.classList.contains("open");
      const mainSidebarWidthStr = localStorage.getItem("discourseSidebarWidth") || "250px";
      const mainSidebarWidth = parseInt(mainSidebarWidthStr.replace("px", ""), 10) || 250;
      const rawWidth = mainSidebarWidth + state2.summaryWidthOffset;
      const summaryPanelWidthPx = Math.max(MIN_SUMMARY_PANEL_WIDTH2, rawWidth);
      const summaryPanelWidth = `${summaryPanelWidthPx}px`;
      sidebar.className = `${position} ${isOpen ? "open" : ""}`;
      sidebar.style.width = summaryPanelWidth;
      sidebar.style.top = topDistance;
      sidebar.style.height = `calc(100vh - ${topDistance} - ${bottomDistance})`;
      if (isOpen) {
        sidebar.style[position] = "0";
      } else {
        sidebar.style[position] = `-${summaryPanelWidth}`;
      }
      if (toggleBar) {
        if (position === "left") {
          toggleBar.style.right = "-20px";
          toggleBar.style.left = "auto";
          toggleBar.style.borderRadius = "0 5px 5px 0";
        } else {
          toggleBar.style.left = "-20px";
          toggleBar.style.right = "auto";
          toggleBar.style.borderRadius = "5px 0 0 5px";
        }
      }
      syncUIWithStoredSettings2();
    }
    function toggleSummaryPanel2() {
      const currentUrl = window.location.href;
      const isTopicPage = /^https:\/\/linux\.do\/t\/topic\/\d+/.test(currentUrl);
      const sidebar = document.getElementById("summary-sidebar");
      if (!sidebar) return;
      sidebar.style.display = isTopicPage ? "flex" : "none";
    }
    function openSettingsModal() {
      const settingsModal = document.getElementById("settings-modal");
      if (settingsModal) {
        settingsModal.style.display = "block";
        lockBodyScroll();
      }
      updatePromptSelect();
      updateQuestionPresetSelect();
      updateSummaryFilterInputs();
      updateApiSelect();
      updateDeArrowSettingsInputs();
      updateSummaryWidthOffset();
      updateAdjustmentPrompts2();
      applyTabsCollapsedState(state2.settingsTabsCollapsed);
      requestAnimationFrame(() => {
        syncUIWithStoredSettings2();
        updateAdjustmentPrompts2();
        updateSidebarPreview();
      });
    }
    function initializeSettingsModal2() {
      const settingsModal = document.getElementById("settings-modal");
      const closeSettings = document.getElementById("close-settings");
      const toggleTabsButton = document.getElementById("toggle-tabs-button");
      const modalContentElement = settingsModal ? settingsModal.querySelector(".modal-content") : null;
      const tabButtons = document.querySelectorAll(".tab-button");
      const tabContents = document.querySelectorAll(".tab-content");
      const mobileTabSelect = document.getElementById("mobile-tab-select");
      const mobileTabSelectWrapper = settingsModal ? settingsModal.querySelector(".mobile-tab-select-wrapper") : null;
      const settingsButton = document.getElementById("settings-button");
      const refreshButton = document.getElementById("refresh-button");
      const sidebarWidthSlider = document.getElementById("sidebar-width-slider");
      const sidebarWidthValue = document.getElementById("sidebar-width-value");
      const sidebarTopSlider = document.getElementById("sidebar-top-slider");
      const sidebarTopValue = document.getElementById("sidebar-top-value");
      const sidebarBottomSlider = document.getElementById("sidebar-bottom-slider");
      const sidebarBottomValue = document.getElementById("sidebar-bottom-value");
      const saveSidebarSettings = document.getElementById("save-sidebar-settings");
      const promptSelect = document.getElementById("prompt-select");
      const promptName = document.getElementById("prompt-name");
      const promptSummaryMethod = document.getElementById("prompt-summary-method");
      const promptOutputFormat = document.getElementById("prompt-output-format");
      const questionPresetSelect = document.getElementById("question-preset-select");
      const questionPresetName = document.getElementById("question-preset-name");
      const questionPresetPrompt = document.getElementById("question-preset-prompt");
      const saveQuestionPreset = document.getElementById("save-question-preset");
      const deleteQuestionPreset = document.getElementById("delete-question-preset");
      const addQuestionPreset = document.getElementById("add-question-preset");
      const saveSummaryFilters = document.getElementById("save-summary-filters");
      const resetSummaryFilters = document.getElementById("reset-summary-filters");
      const savePrompt = document.getElementById("save-prompt");
      const deletePrompt = document.getElementById("delete-prompt");
      const addPrompt = document.getElementById("add-prompt");
      const apiSelect = document.getElementById("api-select");
      const apiName = document.getElementById("api-name");
      const apiUrl = document.getElementById("api-url");
      const apiKey = document.getElementById("api-key");
      const apiModel = document.getElementById("api-model");
      const apiImageInputEnabled = document.getElementById("api-image-input-enabled");
      const apiImageOptions = document.getElementById("api-image-options");
      const apiImageDetail = document.getElementById("api-image-detail");
      const apiMaxImages = document.getElementById("api-max-images");
      const apiMaxImageMb = document.getElementById("api-max-image-mb");
      const apiMaxTotalImageMb = document.getElementById("api-max-total-image-mb");
      const apiKeyWrap = apiKey && apiKey.closest(".ld-secret-wrap");
      if (apiKeyWrap && apiKey) {
        const adjustApiKeyTextarea = (revealed) => {
          const lineHeight = parseInt(getComputedStyle(apiKey).lineHeight, 10) || 18;
          const minHeight = Math.max(lineHeight, 22);
          if (revealed) {
            apiKey.style.overflowY = "hidden";
            apiKey.style.height = "auto";
            const maxLines = 3;
            const lines = (apiKey.value.match(/\n/g) || []).length + 1;
            if (lines <= maxLines) {
              apiKey.style.height = `${Math.max(apiKey.scrollHeight, minHeight)}px`;
              apiKey.style.overflowY = "hidden";
            } else {
              apiKey.style.height = `${lineHeight * maxLines}px`;
              apiKey.style.overflowY = "auto";
            }
          } else {
            apiKey.style.overflowY = "hidden";
            apiKey.style.height = `${minHeight}px`;
          }
        };
        bindSecretField(apiKeyWrap, {
          onRevealChange: (revealed) => adjustApiKeyTextarea(revealed)
        });
        apiKey.addEventListener("input", () => {
          if (apiKeyWrap.classList.contains("is-revealed")) adjustApiKeyTextarea(true);
        });
      }
      const saveApi = document.getElementById("save-api");
      const deleteApi = document.getElementById("delete-api");
      const addApi = document.getElementById("add-api");
      const populateMobileTabSelect = () => {
        if (!mobileTabSelect || !tabButtons.length) return;
        mobileTabSelect.innerHTML = "";
        tabButtons.forEach((button) => {
          const tabId = button.getAttribute("data-tab");
          if (!tabId) return;
          const option = document.createElement("option");
          const label = button.querySelector(".tab-label")?.textContent?.trim() || button.textContent.trim();
          option.value = tabId;
          option.textContent = label;
          mobileTabSelect.appendChild(option);
        });
      };
      const syncMobileTabSelectValue = () => {
        if (!mobileTabSelect) return;
        const activeButton = document.querySelector(".tab-button.active");
        const activeTabId = activeButton?.getAttribute("data-tab");
        if (activeTabId && mobileTabSelect.value !== activeTabId) {
          mobileTabSelect.value = activeTabId;
        }
      };
      populateMobileTabSelect();
      syncMobileTabSelectValue();
      const isElementActuallyVisible = (element) => {
        if (!element) return false;
        const styles = window.getComputedStyle(element);
        if (styles.display === "none" || styles.visibility === "hidden" || parseFloat(styles.opacity || "1") === 0) {
          return false;
        }
        if ((element.offsetWidth ?? 0) <= 0 && (element.offsetHeight ?? 0) <= 0) {
          return false;
        }
        return true;
      };
      const updateTabsToggleVisibility = () => {
        if (!toggleTabsButton) return;
        const shouldHide = isElementActuallyVisible(mobileTabSelectWrapper);
        toggleTabsButton.classList.toggle("mobile-tabs-hidden", shouldHide);
        if (shouldHide) {
          toggleTabsButton.setAttribute("aria-hidden", "true");
          toggleTabsButton.setAttribute("tabindex", "-1");
        } else {
          toggleTabsButton.removeAttribute("aria-hidden");
          toggleTabsButton.removeAttribute("tabindex");
        }
      };
      applyTabsCollapsedState = (collapsed) => {
        if (modalContentElement) {
          modalContentElement.classList.toggle("tabs-collapsed", collapsed);
        }
        if (toggleTabsButton) {
          toggleTabsButton.classList.toggle("active", collapsed);
          toggleTabsButton.setAttribute("aria-pressed", collapsed ? "true" : "false");
          toggleTabsButton.setAttribute("title", collapsed ? "展开按钮栏" : "折叠按钮栏");
          toggleTabsButton.setAttribute("aria-label", collapsed ? "展开左侧按钮栏" : "折叠左侧按钮栏");
        }
        updateTabsToggleVisibility();
      };
      if (toggleTabsButton) {
        applyTabsCollapsedState(state2.settingsTabsCollapsed);
        toggleTabsButton.addEventListener("click", () => {
          state2.settingsTabsCollapsed = !state2.settingsTabsCollapsed;
          GM_setValue2("settingsTabsCollapsed", state2.settingsTabsCollapsed);
          applyTabsCollapsedState(state2.settingsTabsCollapsed);
          syncMobileTabSelectValue();
        });
      }
      updateTabsToggleVisibility();
      window.addEventListener("resize", updateTabsToggleVisibility);
      if (mobileTabSelect) {
        mobileTabSelect.addEventListener("change", () => {
          const targetTabId = mobileTabSelect.value;
          if (!targetTabId) return;
          const targetButton = document.querySelector(`.tab-button[data-tab="${targetTabId}"]`);
          if (targetButton) {
            targetButton.click();
          }
        });
      }
      const defaultOpenSidebarSwitch = document.getElementById("default-open-sidebar-switch");
      const sidebarAutoSummarizeSwitch = document.getElementById("sidebar-auto-summarize-switch");
      const importSettingsButton = document.getElementById("import-settings-button");
      const exportSettingsButton = document.getElementById("export-settings-button");
      const importSettingsFile = document.getElementById("import-settings-file");
      const newTopicAutoSummarizeCheckbox = document.getElementById("new-topic-auto-summarize");
      const autoRetryCountInput = document.getElementById("auto-retry-count");
      const autoRetryIntervalInput = document.getElementById("auto-retry-interval");
      const listSummaryEnabledSwitch = document.getElementById("list-summary-enabled-switch");
      const autoShowSummarySwitch = document.getElementById("auto-show-summary-switch");
      const listSummaryMaxLinesInput = document.getElementById("list-summary-max-lines");
      const dearrowEnabledSwitch = document.getElementById("dearrow-enabled-switch");
      const dearrowAutoRewriteSwitch = document.getElementById("dearrow-auto-rewrite-switch");
      const dearrowJudgmentPromptInput = document.getElementById("dearrow-judgment-prompt");
      const dearrowRewritePromptInput = document.getElementById("dearrow-rewrite-prompt");
      const dearrowJudgmentApiSelect = document.getElementById("dearrow-judgment-api-select");
      const dearrowRewriteApiSelect = document.getElementById("dearrow-rewrite-api-select");
      const dearrowScopeRulesInput = document.getElementById("dearrow-scope-rules");
      const dearrowScopeError = document.getElementById("dearrow-scope-error");
      const saveDeArrowSettingsButtons = document.querySelectorAll("#dearrow-settings .save-dearrow-settings");
      const getDefaultDeArrowPrompt = (key) => String(defaultDeArrowSettings2?.[key] || "").trim();
      const normalizePromptValue = (value, fallback = "") => typeof normalizeDeArrowPrompt2 === "function" ? normalizeDeArrowPrompt2(value, fallback) : String(value ?? "").trim() || String(fallback || "").trim();
      const syncAutoSummarizeSwitches = () => {
        if (newTopicAutoSummarizeCheckbox) {
          newTopicAutoSummarizeCheckbox.checked = state2.newTopicAutoSummarize;
        }
        if (sidebarAutoSummarizeSwitch) {
          sidebarAutoSummarizeSwitch.checked = state2.newTopicAutoSummarize;
        }
      };
      if (settingsButton) {
        settingsButton.addEventListener("click", () => {
          openSettingsModal();
          syncAutoSummarizeSwitches();
        });
      }
      if (refreshButton) {
        refreshButton.addEventListener("click", () => {
          location.reload();
        });
      }
      if (closeSettings) {
        closeSettings.addEventListener("click", () => {
          if (settingsModal) settingsModal.style.display = "none";
          unlockBodyScroll();
        });
      }
      if (tabButtons && tabContents) {
        tabButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const tabId = button.getAttribute("data-tab");
            tabButtons.forEach((btn) => btn.classList.remove("active"));
            tabContents.forEach((content) => content.classList.remove("active"));
            button.classList.add("active");
            const targetContent = document.getElementById(tabId);
            if (targetContent) targetContent.classList.add("active");
            syncMobileTabSelectValue();
          });
        });
      }
      const sidebarSubTabButtons = document.querySelectorAll("#sidebar-settings .sidebar-sub-tab-button");
      const sidebarSubTabContents = document.querySelectorAll("#sidebar-settings .sidebar-sub-tab-content");
      if (sidebarSubTabButtons.length && sidebarSubTabContents.length) {
        sidebarSubTabButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-sidebar-tab");
            sidebarSubTabButtons.forEach((btn) => btn.classList.remove("active"));
            sidebarSubTabContents.forEach((content) => content.classList.remove("active"));
            button.classList.add("active");
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add("active");
            if (targetId === "sidebar-settings-dimensions") {
              requestAnimationFrame(() => {
                syncUIWithStoredSettings2();
                updateAdjustmentPrompts2();
                updateSidebarPreview();
              });
            }
          });
        });
      }
      const promptSubTabButtons = document.querySelectorAll("#prompt-settings .prompt-sub-tab-button");
      const promptSubTabContents = document.querySelectorAll("#prompt-settings .prompt-sub-tab-content");
      if (promptSubTabButtons.length && promptSubTabContents.length) {
        promptSubTabButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-prompt-tab");
            promptSubTabButtons.forEach((btn) => btn.classList.remove("active"));
            promptSubTabContents.forEach((content) => content.classList.remove("active"));
            button.classList.add("active");
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add("active");
          });
        });
      }
      const apiSubTabButtons = document.querySelectorAll("#api-settings .api-sub-tab-button");
      const apiSubTabContents = document.querySelectorAll("#api-settings .api-sub-tab-content");
      if (apiSubTabButtons.length && apiSubTabContents.length) {
        apiSubTabButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-api-tab");
            apiSubTabButtons.forEach((btn) => btn.classList.remove("active"));
            apiSubTabContents.forEach((content) => content.classList.remove("active"));
            button.classList.add("active");
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add("active");
          });
        });
      }
      const listSummarySubTabButtons = document.querySelectorAll("#list-summary-settings .list-summary-sub-tab-button");
      const listSummarySubTabContents = document.querySelectorAll("#list-summary-settings .list-summary-sub-tab-content");
      if (listSummarySubTabButtons.length && listSummarySubTabContents.length) {
        listSummarySubTabButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-list-summary-tab");
            listSummarySubTabButtons.forEach((btn) => btn.classList.remove("active"));
            listSummarySubTabContents.forEach((content) => content.classList.remove("active"));
            button.classList.add("active");
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add("active");
          });
        });
      }
      const dearrowSubTabButtons = document.querySelectorAll("#dearrow-settings .dearrow-sub-tab-button");
      const dearrowSubTabContents = document.querySelectorAll("#dearrow-settings .dearrow-sub-tab-content");
      if (dearrowSubTabButtons.length && dearrowSubTabContents.length) {
        dearrowSubTabButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-dearrow-tab");
            dearrowSubTabButtons.forEach((btn) => btn.classList.remove("active"));
            dearrowSubTabContents.forEach((content) => content.classList.remove("active"));
            button.classList.add("active");
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add("active");
          });
        });
      }
      if (sidebarWidthSlider && sidebarWidthValue) {
        sidebarWidthSlider.addEventListener("input", () => {
          sidebarWidthValue.textContent = `${sidebarWidthSlider.value}%`;
        });
      }
      if (sidebarTopSlider && sidebarTopValue) {
        sidebarTopSlider.addEventListener("input", () => {
          sidebarTopValue.textContent = `${sidebarTopSlider.value}%`;
        });
      }
      if (sidebarBottomSlider && sidebarBottomValue) {
        sidebarBottomSlider.addEventListener("input", () => {
          sidebarBottomValue.textContent = `${sidebarBottomSlider.value}%`;
        });
      }
      if (saveSidebarSettings) {
        saveSidebarSettings.addEventListener("click", () => {
          saveAndApplySidebarSettings();
          createSettingsToast2("侧边栏设置已保存并应用！", "success", 3e3);
        });
      }
      const sidebarPositionSwitch = document.getElementById("sidebar-position-switch");
      if (sidebarPositionSwitch) {
        sidebarPositionSwitch.addEventListener("change", function() {
          const newPosition = this.checked ? "right" : "left";
          GM_setValue2("sidebarPosition", newPosition);
          saveAndApplySidebarSettings();
        });
      }
      ["sidebar-width-slider", "sidebar-top-slider", "sidebar-bottom-slider"].forEach((sliderId) => {
        const slider = document.getElementById(sliderId);
        if (slider) {
          slider.addEventListener("input", () => {
            updateSidebarPreview();
          });
          slider.addEventListener("change", () => {
            saveAndApplySidebarSettings();
          });
        }
      });
      if (listSummaryEnabledSwitch && autoShowSummarySwitch && listSummaryMaxLinesInput) {
        listSummaryEnabledSwitch.checked = state2.listPageSummaryEnabled;
        autoShowSummarySwitch.checked = state2.autoShowSummaryInList;
        listSummaryMaxLinesInput.value = state2.listPageSummaryMaxLines;
        const autoSaveListSummarySettings = ({ showToast = true } = {}) => {
          const previousEnabled = state2.listPageSummaryEnabled;
          state2.listPageSummaryEnabled = listSummaryEnabledSwitch.checked;
          state2.autoShowSummaryInList = autoShowSummarySwitch.checked;
          let parsedMaxLines = parseInt(listSummaryMaxLinesInput.value, 10);
          if (Number.isNaN(parsedMaxLines)) parsedMaxLines = 6;
          parsedMaxLines = Math.min(20, Math.max(1, parsedMaxLines));
          if (String(parsedMaxLines) !== listSummaryMaxLinesInput.value) {
            listSummaryMaxLinesInput.value = parsedMaxLines;
          }
          state2.listPageSummaryMaxLines = parsedMaxLines;
          if (state2.summaryWidthType === "percent") {
            const percentInput = document.getElementById("summary-percent-value");
            let percentValue = parseInt(percentInput ? percentInput.value : state2.summaryWidthValue, 10);
            if (Number.isNaN(percentValue)) percentValue = 100;
            percentValue = Math.min(100, Math.max(10, percentValue));
            state2.summaryWidthValue = percentValue;
            if (percentInput && percentInput.value !== String(percentValue)) {
              percentInput.value = percentValue;
            }
            const percentRange = document.getElementById("percent-range");
            if (percentRange && percentRange.value !== String(percentValue)) {
              percentRange.value = percentValue;
            }
          } else {
            const pixelInput = document.getElementById("summary-pixel-value");
            let pixelValue = parseInt(pixelInput ? pixelInput.value : state2.summaryWidthValue, 10);
            if (Number.isNaN(pixelValue)) pixelValue = 500;
            pixelValue = Math.min(2e3, Math.max(100, pixelValue));
            state2.summaryWidthValue = pixelValue;
            if (pixelInput && pixelInput.value !== String(pixelValue)) {
              pixelInput.value = pixelValue;
            }
            const pixelRange = document.getElementById("pixel-range");
            if (pixelRange && pixelRange.value !== String(pixelValue)) {
              pixelRange.value = pixelValue;
            }
          }
          GM_setValue2("listPageSummaryEnabled", state2.listPageSummaryEnabled);
          GM_setValue2("autoShowSummaryInList", state2.autoShowSummaryInList);
          GM_setValue2("listPageSummaryMaxLines", state2.listPageSummaryMaxLines);
          GM_setValue2("summaryWidthType", state2.summaryWidthType);
          GM_setValue2("summaryWidthValue", state2.summaryWidthValue);
          updateListSummaryStyles();
          applySummaryWidthSettings2();
          const onListSummaryPage = isListSummaryPageUrl2(state2.currentPageUrl);
          if (!state2.listPageSummaryEnabled) {
            clearListSummaryBootstrapWatcher2?.();
            removeTopicListSummaryButtons2?.({ preserveExpanded: true });
            if (window.topicListObserver) window.topicListObserver.disconnect();
          } else if (onListSummaryPage) {
            if (typeof refreshListSummaryForCurrentPage2 === "function") {
              refreshListSummaryForCurrentPage2({
                forceRebuild: state2.listPageSummaryEnabled !== previousEnabled,
                delay: 0
              });
            } else {
              addTopicListSummaryButtons?.();
            }
            restoreExpandedSummaryRows?.();
          } else {
            clearListSummaryBootstrapWatcher2?.();
          }
          if (showToast) {
            createSettingsToast2("列表页总结设置已自动保存！", "success", 2200);
          }
        };
        persistListSummarySettingsHandler = autoSaveListSummarySettings;
        listSummaryEnabledSwitch.addEventListener("change", () => autoSaveListSummarySettings());
        autoShowSummarySwitch.addEventListener("change", () => autoSaveListSummarySettings());
        listSummaryMaxLinesInput.addEventListener("change", () => autoSaveListSummarySettings());
      }
      const renderDeArrowScopeError = (messages = []) => {
        if (!dearrowScopeError) return;
        const normalizedMessages = Array.isArray(messages) ? messages.map((message) => String(message || "").trim()).filter(Boolean) : [];
        dearrowScopeError.textContent = normalizedMessages.join("\n");
        dearrowScopeError.classList.toggle("visible", normalizedMessages.length > 0);
      };
      updateDeArrowSettingsInputs = () => {
        if (dearrowEnabledSwitch) {
          dearrowEnabledSwitch.checked = state2.dearrowEnabled === true;
        }
        if (dearrowAutoRewriteSwitch) {
          dearrowAutoRewriteSwitch.checked = state2.dearrowAutoRewrite === true;
        }
        if (dearrowJudgmentPromptInput) {
          dearrowJudgmentPromptInput.value = normalizePromptValue(
            state2.dearrowJudgmentPrompt,
            getDefaultDeArrowPrompt("dearrowJudgmentPrompt")
          );
        }
        if (dearrowRewritePromptInput) {
          dearrowRewritePromptInput.value = normalizePromptValue(
            state2.dearrowRewritePrompt,
            getDefaultDeArrowPrompt("dearrowRewritePrompt")
          );
        }
        const apiList = Array.isArray(state2.apiConfigurations) ? state2.apiConfigurations : [];
        const populateDeArrowApiSelect = (select, stateKey) => {
          if (!select) return;
          const normalizedIndex = typeof normalizeDeArrowApiIndex2 === "function" ? normalizeDeArrowApiIndex2(state2[stateKey], apiList) : Math.max(0, Math.min(Math.max(0, apiList.length - 1), parseInt(state2[stateKey], 10) || 0));
          state2[stateKey] = normalizedIndex;
          select.innerHTML = "";
          apiList.forEach((config, index) => {
            const option = document.createElement("option");
            option.value = String(index);
            const name = String(config?.name || "").trim();
            const model = String(config?.model || "").trim();
            option.textContent = name && model && name !== model ? `${name}（${model}）` : name || model || `API ${index + 1}`;
            select.appendChild(option);
          });
          select.value = String(normalizedIndex);
          select.disabled = apiList.length === 0;
        };
        populateDeArrowApiSelect(dearrowJudgmentApiSelect, "dearrowJudgmentApiIndex");
        populateDeArrowApiSelect(dearrowRewriteApiSelect, "dearrowRewriteApiIndex");
        if (dearrowScopeRulesInput) {
          const rules = typeof normalizeDeArrowScopeRules2 === "function" ? normalizeDeArrowScopeRules2(state2.dearrowScopeRules) : Array.isArray(state2.dearrowScopeRules) ? state2.dearrowScopeRules : [];
          dearrowScopeRulesInput.value = rules.join("\n");
        }
        renderDeArrowScopeError([]);
      };
      let dearrowSettingsRefreshTimer = null;
      let dearrowPendingRefreshOptions = null;
      const scheduleDeArrowSettingsRefresh = (options) => {
        dearrowPendingRefreshOptions = {
          forceRebuild: dearrowPendingRefreshOptions?.forceRebuild === true || options?.forceRebuild === true,
          pullDrive: false,
          judge: dearrowPendingRefreshOptions?.judge === true || options?.judge === true
        };
        if (dearrowSettingsRefreshTimer !== null) {
          clearTimeout(dearrowSettingsRefreshTimer);
        }
        dearrowSettingsRefreshTimer = setTimeout(() => {
          dearrowSettingsRefreshTimer = null;
          const refreshOptions = dearrowPendingRefreshOptions;
          dearrowPendingRefreshOptions = null;
          Promise.resolve(refreshDeArrowForCurrentPage2?.(refreshOptions)).catch((error) => console.warn("[DeArrow] 应用设置失败:", error));
        }, 120);
      };
      const saveDeArrowSettings = ({ showToast = true } = {}) => {
        if (!dearrowEnabledSwitch || !dearrowJudgmentApiSelect || !dearrowRewriteApiSelect || !dearrowScopeRulesInput) return false;
        const rawScopeRules = dearrowScopeRulesInput.value;
        const validation = typeof validateDeArrowScopeRules2 === "function" ? validateDeArrowScopeRules2(rawScopeRules) : {
          valid: rawScopeRules.split(/\r?\n/).some((line) => line.trim()),
          rules: rawScopeRules.split(/\r?\n/).map((line) => line.trim()).filter(Boolean),
          errors: []
        };
        if (!validation.valid) {
          const messages = (validation.errors || []).map((error) => error?.message || String(error));
          renderDeArrowScopeError(messages.length ? messages : ["作用范围配置无效"]);
          if (showToast) {
            createSettingsToast2("DeArrow 作用范围配置无效，请检查后重试。", "error", 3200);
          }
          return false;
        }
        const previous = {
          dearrowEnabled: state2.dearrowEnabled === true,
          dearrowAutoRewrite: state2.dearrowAutoRewrite === true,
          dearrowJudgmentPrompt: state2.dearrowJudgmentPrompt,
          dearrowRewritePrompt: state2.dearrowRewritePrompt,
          dearrowJudgmentApiIndex: state2.dearrowJudgmentApiIndex,
          dearrowRewriteApiIndex: state2.dearrowRewriteApiIndex,
          dearrowScopeRules: Array.isArray(state2.dearrowScopeRules) ? [...state2.dearrowScopeRules] : []
        };
        const apiList = Array.isArray(state2.apiConfigurations) ? state2.apiConfigurations : [];
        state2.dearrowEnabled = dearrowEnabledSwitch.checked === true;
        state2.dearrowAutoRewrite = dearrowAutoRewriteSwitch?.checked === true;
        if (dearrowJudgmentPromptInput) {
          state2.dearrowJudgmentPrompt = normalizePromptValue(
            dearrowJudgmentPromptInput.value,
            getDefaultDeArrowPrompt("dearrowJudgmentPrompt")
          );
        }
        if (dearrowRewritePromptInput) {
          state2.dearrowRewritePrompt = normalizePromptValue(
            dearrowRewritePromptInput.value,
            getDefaultDeArrowPrompt("dearrowRewritePrompt")
          );
        }
        state2.dearrowJudgmentApiIndex = typeof normalizeDeArrowApiIndex2 === "function" ? normalizeDeArrowApiIndex2(dearrowJudgmentApiSelect.value, apiList) : Math.max(0, parseInt(dearrowJudgmentApiSelect.value, 10) || 0);
        state2.dearrowRewriteApiIndex = typeof normalizeDeArrowApiIndex2 === "function" ? normalizeDeArrowApiIndex2(dearrowRewriteApiSelect.value, apiList) : Math.max(0, parseInt(dearrowRewriteApiSelect.value, 10) || 0);
        state2.dearrowScopeRules = validation.rules;
        if (previous.dearrowEnabled !== state2.dearrowEnabled) {
          GM_setValue2("dearrowEnabled", state2.dearrowEnabled);
        }
        if (previous.dearrowAutoRewrite !== state2.dearrowAutoRewrite) {
          GM_setValue2("dearrowAutoRewrite", state2.dearrowAutoRewrite);
        }
        if (previous.dearrowJudgmentPrompt !== state2.dearrowJudgmentPrompt && state2.dearrowJudgmentPrompt !== void 0) {
          GM_setValue2("dearrowJudgmentPrompt", state2.dearrowJudgmentPrompt);
        }
        if (previous.dearrowRewritePrompt !== state2.dearrowRewritePrompt && state2.dearrowRewritePrompt !== void 0) {
          GM_setValue2("dearrowRewritePrompt", state2.dearrowRewritePrompt);
        }
        if (previous.dearrowJudgmentApiIndex !== state2.dearrowJudgmentApiIndex) {
          GM_setValue2("dearrowJudgmentApiIndex", state2.dearrowJudgmentApiIndex);
        }
        if (previous.dearrowRewriteApiIndex !== state2.dearrowRewriteApiIndex) {
          GM_setValue2("dearrowRewriteApiIndex", state2.dearrowRewriteApiIndex);
        }
        const scopeChanged = previous.dearrowScopeRules.join("\n") !== state2.dearrowScopeRules.join("\n");
        if (scopeChanged) {
          GM_setValue2("dearrowScopeRules", state2.dearrowScopeRules);
        }
        renderDeArrowScopeError([]);
        const activationChanged = previous.dearrowEnabled !== state2.dearrowEnabled;
        if (previous.dearrowAutoRewrite !== state2.dearrowAutoRewrite) {
          cancelDeArrowAutoRewrites2?.();
        }
        const autoRewriteEnabled = !previous.dearrowAutoRewrite && state2.dearrowAutoRewrite;
        if (activationChanged || scopeChanged || autoRewriteEnabled) {
          scheduleDeArrowSettingsRefresh({
            forceRebuild: activationChanged || scopeChanged,
            pullDrive: false,
            judge: activationChanged || scopeChanged
          });
        }
        if (showToast) {
          createSettingsToast2("DeArrow 设置已保存并应用！", "success", 2400);
        }
        return true;
      };
      if (dearrowEnabledSwitch) {
        dearrowEnabledSwitch.addEventListener("change", () => saveDeArrowSettings({ showToast: false }));
      }
      dearrowAutoRewriteSwitch?.addEventListener("change", () => saveDeArrowSettings({ showToast: false }));
      dearrowJudgmentApiSelect?.addEventListener("change", () => saveDeArrowSettings({ showToast: false }));
      dearrowRewriteApiSelect?.addEventListener("change", () => saveDeArrowSettings({ showToast: false }));
      saveDeArrowSettingsButtons.forEach((button) => {
        button.addEventListener("click", () => saveDeArrowSettings());
      });
      updateDeArrowSettingsInputs();
      function updatePromptConfigInputs() {
        if (!promptName || !promptSummaryMethod || !promptOutputFormat) return;
        const currentConfig = state2.promptConfigurations[state2.currentPromptIndex];
        if (!currentConfig) return;
        promptName.value = currentConfig.name;
        promptSummaryMethod.value = currentConfig.summaryMethod;
        promptOutputFormat.value = currentConfig.outputFormat;
      }
      updatePromptSelect = () => {
        if (!promptSelect) return;
        promptSelect.innerHTML = "";
        state2.promptConfigurations.forEach((config, index) => {
          const option = document.createElement("option");
          option.value = index;
          option.textContent = config.name;
          promptSelect.appendChild(option);
        });
        promptSelect.value = state2.currentPromptIndex;
        updatePromptConfigInputs();
      };
      if (promptSelect) {
        promptSelect.addEventListener("change", (e) => {
          state2.currentPromptIndex = parseInt(e.target.value, 10);
          GM_setValue2("currentPromptIndex", state2.currentPromptIndex);
          updatePromptConfigInputs();
        });
      }
      if (savePrompt) {
        savePrompt.addEventListener("click", () => {
          if (!promptName || !promptSummaryMethod || !promptOutputFormat) return;
          if (!promptName.value.trim()) {
            createSettingsToast2("请填写提示词配置的名称！", "warning", 3e3);
            return;
          }
          state2.promptConfigurations[state2.currentPromptIndex] = {
            name: promptName.value.trim(),
            summaryMethod: promptSummaryMethod.value.trim(),
            outputFormat: promptOutputFormat.value.trim()
          };
          GM_setValue2("promptConfigurations", state2.promptConfigurations);
          updatePromptSelect();
          createSettingsToast2("提示词配置已保存！", "success", 3e3);
        });
      }
      if (deletePrompt) {
        deletePrompt.addEventListener("click", () => {
          if (state2.promptConfigurations.length > 1) {
            if (confirm("确定要删除当前提示词配置吗？")) {
              state2.promptConfigurations.splice(state2.currentPromptIndex, 1);
              state2.currentPromptIndex = 0;
              GM_setValue2("promptConfigurations", state2.promptConfigurations);
              GM_setValue2("currentPromptIndex", state2.currentPromptIndex);
              updatePromptSelect();
              createSettingsToast2("提示词配置已删除！", "success", 3e3);
            }
          } else {
            createSettingsToast2("至少需要保留一个提示词配置！", "warning", 3e3);
          }
        });
      }
      if (addPrompt) {
        addPrompt.addEventListener("click", () => {
          const newPrompt = {
            name: "新 总结 + 输出 配置",
            summaryMethod: defaultSummaryPrompt2,
            outputFormat: defaultHTMLPrompt2
          };
          state2.promptConfigurations.push(newPrompt);
          state2.currentPromptIndex = state2.promptConfigurations.length - 1;
          GM_setValue2("promptConfigurations", state2.promptConfigurations);
          GM_setValue2("currentPromptIndex", state2.currentPromptIndex);
          updatePromptSelect();
          createSettingsToast2("新提示词配置已添加！", "info", 3e3);
        });
      }
      function getNormalizedQuestionPresets() {
        const normalizer = typeof normalizeQuestionPromptPresets2 === "function" ? normalizeQuestionPromptPresets2 : (value) => Array.isArray(value) ? value : [];
        state2.customQuestionPresets = normalizer(state2.customQuestionPresets);
        return state2.customQuestionPresets;
      }
      function updateQuestionPresetInputs() {
        if (!questionPresetName || !questionPresetPrompt) return;
        const presets = getNormalizedQuestionPresets();
        const selectedIndex = questionPresetSelect ? parseInt(questionPresetSelect.value, 10) : 0;
        const preset = presets[selectedIndex];
        if (!preset) {
          questionPresetName.value = "";
          questionPresetPrompt.value = "";
          return;
        }
        questionPresetName.value = preset.name;
        questionPresetPrompt.value = preset.prompt;
      }
      updateQuestionPresetSelect = () => {
        if (!questionPresetSelect) return;
        const presets = getNormalizedQuestionPresets();
        questionPresetSelect.innerHTML = "";
        if (presets.length === 0) {
          const option = document.createElement("option");
          option.value = "0";
          option.textContent = "暂无自定义预设";
          questionPresetSelect.appendChild(option);
          questionPresetSelect.disabled = true;
        } else {
          questionPresetSelect.disabled = false;
          presets.forEach((preset, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = preset.name;
            questionPresetSelect.appendChild(option);
          });
          const currentValue = parseInt(questionPresetSelect.dataset.currentIndex || "0", 10);
          questionPresetSelect.value = Math.min(Math.max(0, currentValue), presets.length - 1);
        }
        updateQuestionPresetInputs();
      };
      if (questionPresetSelect) {
        questionPresetSelect.addEventListener("change", () => {
          questionPresetSelect.dataset.currentIndex = questionPresetSelect.value;
          updateQuestionPresetInputs();
        });
      }
      if (addQuestionPreset) {
        addQuestionPreset.addEventListener("click", () => {
          const presets = getNormalizedQuestionPresets();
          const newPreset = {
            id: `custom-${Date.now()}`,
            name: "新提问预设",
            prompt: "请基于当前话题回答："
          };
          state2.customQuestionPresets = [...presets, newPreset];
          GM_setValue2("customQuestionPresets", state2.customQuestionPresets);
          if (questionPresetSelect) {
            questionPresetSelect.dataset.currentIndex = String(state2.customQuestionPresets.length - 1);
          }
          updateQuestionPresetSelect();
          createSettingsToast2("新提问预设已添加！", "info", 2600);
        });
      }
      if (saveQuestionPreset) {
        saveQuestionPreset.addEventListener("click", () => {
          if (!questionPresetName || !questionPresetPrompt) return;
          const presets = getNormalizedQuestionPresets();
          const selectedIndex = questionPresetSelect ? parseInt(questionPresetSelect.value, 10) : 0;
          if (!presets[selectedIndex]) {
            createSettingsToast2("请先添加一个自定义提问预设！", "warning", 2800);
            return;
          }
          const name = questionPresetName.value.trim();
          const prompt = questionPresetPrompt.value.trim();
          if (!name || !prompt) {
            createSettingsToast2("请填写预设名称和预设问题！", "warning", 2800);
            return;
          }
          const nextPresets = presets.slice();
          nextPresets[selectedIndex] = {
            ...nextPresets[selectedIndex],
            name,
            prompt
          };
          state2.customQuestionPresets = typeof normalizeQuestionPromptPresets2 === "function" ? normalizeQuestionPromptPresets2(nextPresets) : nextPresets;
          GM_setValue2("customQuestionPresets", state2.customQuestionPresets);
          if (questionPresetSelect) {
            questionPresetSelect.dataset.currentIndex = String(selectedIndex);
          }
          updateQuestionPresetSelect();
          createSettingsToast2("提问预设已保存！", "success", 2600);
        });
      }
      if (deleteQuestionPreset) {
        deleteQuestionPreset.addEventListener("click", () => {
          const presets = getNormalizedQuestionPresets();
          const selectedIndex = questionPresetSelect ? parseInt(questionPresetSelect.value, 10) : 0;
          if (!presets[selectedIndex]) {
            createSettingsToast2("暂无可删除的自定义预设！", "warning", 2600);
            return;
          }
          if (!confirm("确定要删除当前提问预设吗？")) return;
          const nextPresets = presets.filter((_2, index) => index !== selectedIndex);
          state2.customQuestionPresets = typeof normalizeQuestionPromptPresets2 === "function" ? normalizeQuestionPromptPresets2(nextPresets) : nextPresets;
          GM_setValue2("customQuestionPresets", state2.customQuestionPresets);
          if (questionPresetSelect) {
            questionPresetSelect.dataset.currentIndex = String(Math.max(0, selectedIndex - 1));
          }
          updateQuestionPresetSelect();
          createSettingsToast2("提问预设已删除！", "success", 2600);
        });
      }
      if (saveSummaryFilters) {
        saveSummaryFilters.addEventListener("click", () => {
          saveSummaryFilterSettings();
        });
      }
      if (resetSummaryFilters) {
        resetSummaryFilters.addEventListener("click", () => {
          resetSummaryFilterSettings();
        });
      }
      const bytesToMbInputValue = (bytes, fallbackBytes) => {
        const numeric = Number(bytes);
        const fallback = Number(fallbackBytes);
        const normalized = Number.isFinite(numeric) && numeric > 0 ? numeric : Number.isFinite(fallback) && fallback > 0 ? fallback : 4 * 1024 * 1024;
        const mb = normalized / (1024 * 1024);
        return Number.isInteger(mb) ? String(mb) : String(Number(mb.toFixed(2)));
      };
      const mbInputToBytes = (value, fallbackBytes) => {
        const parsed = Number(value);
        if (!Number.isFinite(parsed) || parsed <= 0) return fallbackBytes;
        return Math.round(parsed * 1024 * 1024);
      };
      function syncApiImageOptionsState() {
        const enabled = apiImageInputEnabled?.checked === true;
        if (apiImageOptions) {
          apiImageOptions.style.display = enabled ? "" : "none";
          apiImageOptions.querySelectorAll("input, select").forEach((input) => {
            input.disabled = !enabled;
          });
        }
      }
      function updateApiConfigInputs() {
        if (!apiName || !apiUrl || !apiKey || !apiModel || !newTopicAutoSummarizeCheckbox || !autoRetryCountInput || !autoRetryIntervalInput) return;
        const currentConfig = getCurrentApiConfiguration2();
        if (!currentConfig) return;
        syncAutoRetrySettingsFromCurrentApiConfiguration2?.();
        apiName.value = currentConfig.name;
        apiUrl.value = currentConfig.url;
        apiKey.value = currentConfig.key;
        apiModel.value = currentConfig.model;
        newTopicAutoSummarizeCheckbox.checked = state2.newTopicAutoSummarize;
        if (sidebarAutoSummarizeSwitch) {
          sidebarAutoSummarizeSwitch.checked = state2.newTopicAutoSummarize;
        }
        autoRetryCountInput.value = normalizeAutoRetryCount2(currentConfig.retryCount, state2.autoRetryCount);
        autoRetryIntervalInput.value = normalizeAutoRetryInterval2(currentConfig.retryInterval, state2.autoRetryInterval);
        if (apiImageInputEnabled) {
          apiImageInputEnabled.checked = currentConfig.imageInputEnabled === true;
        }
        if (apiImageDetail) {
          apiImageDetail.value = currentConfig.imageDetail || "auto";
        }
        if (apiMaxImages) {
          apiMaxImages.value = currentConfig.maxImagesPerRequest || 6;
        }
        if (apiMaxImageMb) {
          apiMaxImageMb.value = bytesToMbInputValue(currentConfig.maxImageBytes, 4 * 1024 * 1024);
        }
        if (apiMaxTotalImageMb) {
          apiMaxTotalImageMb.value = bytesToMbInputValue(currentConfig.maxTotalImageBytes, 12 * 1024 * 1024);
        }
        syncApiImageOptionsState();
      }
      updateApiSelect = () => {
        if (!apiSelect) return;
        state2.currentApiIndex = normalizeCurrentApiIndex2(state2.currentApiIndex, state2.apiConfigurations);
        apiSelect.innerHTML = "";
        state2.apiConfigurations.forEach((config, index) => {
          const option = document.createElement("option");
          option.value = index;
          option.textContent = config.name;
          apiSelect.appendChild(option);
        });
        apiSelect.value = String(state2.currentApiIndex);
        updateApiConfigInputs();
        updateDeArrowSettingsInputs();
      };
      if (apiSelect) {
        apiSelect.addEventListener("change", (e) => {
          state2.currentApiIndex = normalizeCurrentApiIndex2(e.target.value, state2.apiConfigurations);
          GM_setValue2("currentApiIndex", state2.currentApiIndex);
          syncAutoRetrySettingsFromCurrentApiConfiguration2?.();
          updateApiConfigInputs();
        });
      }
      if (apiImageInputEnabled) {
        apiImageInputEnabled.addEventListener("change", () => {
          syncApiImageOptionsState();
        });
      }
      if (saveApi) {
        saveApi.addEventListener("click", () => {
          if (!apiName || !apiUrl || !apiKey || !apiModel || !newTopicAutoSummarizeCheckbox || !autoRetryCountInput || !autoRetryIntervalInput) return;
          if (!apiName.value.trim() || !apiUrl.value.trim() || !apiKey.value.trim() || !apiModel.value.trim()) {
            createToast2("请填写所有API配置项！", "warning", 3e3);
            return;
          }
          const currentConfig = getCurrentApiConfiguration2();
          const nextRetryCount = parseInt(autoRetryCountInput.value, 10);
          const nextRetryInterval = parseInt(autoRetryIntervalInput.value, 10);
          state2.newTopicAutoSummarize = newTopicAutoSummarizeCheckbox.checked;
          if (Number.isNaN(nextRetryCount) || nextRetryCount < 1 || nextRetryCount > 10) {
            createToast2("重试次数必须在1到10之间！", "warning", 3e3);
            autoRetryCountInput.value = currentConfig && currentConfig.retryCount ? currentConfig.retryCount : state2.autoRetryCount;
            return;
          }
          if (Number.isNaN(nextRetryInterval) || nextRetryInterval < 1 || nextRetryInterval > 600) {
            createToast2("重试间隔时间必须在1到600秒之间！", "warning", 3e3);
            autoRetryIntervalInput.value = currentConfig && currentConfig.retryInterval ? currentConfig.retryInterval : state2.autoRetryInterval;
            return;
          }
          state2.apiConfigurations[state2.currentApiIndex] = normalizeApiConfiguration2({
            name: apiName.value.trim(),
            url: apiUrl.value.trim(),
            key: apiKey.value.trim(),
            model: apiModel.value.trim(),
            retryCount: nextRetryCount,
            retryInterval: nextRetryInterval,
            imageInputEnabled: apiImageInputEnabled?.checked === true,
            imageDetail: apiImageDetail?.value || currentConfig?.imageDetail || "auto",
            maxImagesPerRequest: apiMaxImages?.value || currentConfig?.maxImagesPerRequest || 6,
            maxImageBytes: mbInputToBytes(apiMaxImageMb?.value, currentConfig?.maxImageBytes || 4 * 1024 * 1024),
            maxTotalImageBytes: mbInputToBytes(apiMaxTotalImageMb?.value, currentConfig?.maxTotalImageBytes || 12 * 1024 * 1024)
          }, currentConfig || {});
          state2.autoRetryCount = nextRetryCount;
          state2.autoRetryInterval = nextRetryInterval;
          persistApiConfigurations2?.();
          GM_setValue2("newTopicAutoSummarize", state2.newTopicAutoSummarize);
          updateApiSelect();
          createSettingsToast2("API配置已保存！", "success", 3e3);
        });
      }
      if (deleteApi) {
        deleteApi.addEventListener("click", () => {
          if (state2.apiConfigurations.length > 1) {
            if (confirm("确定要删除当前API配置吗？")) {
              state2.apiConfigurations.splice(state2.currentApiIndex, 1);
              state2.currentApiIndex = normalizeCurrentApiIndex2(state2.currentApiIndex, state2.apiConfigurations);
              persistApiConfigurations2?.();
              updateApiSelect();
              createSettingsToast2("API配置已删除！", "success", 3e3);
            }
          } else {
            createToast2("至少需要保留一个API配置！", "warning", 3e3);
          }
        });
      }
      if (addApi) {
        addApi.addEventListener("click", () => {
          const currentConfig = getCurrentApiConfiguration2();
          const retryFallback = {
            retryCount: currentConfig && currentConfig.retryCount,
            retryInterval: currentConfig && currentConfig.retryInterval
          };
          const newApi = createDefaultApiConfiguration2({}, retryFallback);
          state2.apiConfigurations.push(newApi);
          state2.currentApiIndex = state2.apiConfigurations.length - 1;
          persistApiConfigurations2?.();
          updateApiSelect();
          createSettingsToast2("新API配置已添加！", "info", 3e3);
        });
      }
      if (defaultOpenSidebarSwitch) {
        defaultOpenSidebarSwitch.checked = state2.defaultOpenSidebar;
        defaultOpenSidebarSwitch.addEventListener("change", function() {
          state2.defaultOpenSidebar = this.checked;
          GM_setValue2("defaultOpenSidebar", state2.defaultOpenSidebar);
        });
      }
      if (sidebarAutoSummarizeSwitch) {
        sidebarAutoSummarizeSwitch.checked = state2.newTopicAutoSummarize;
        sidebarAutoSummarizeSwitch.addEventListener("change", () => {
          state2.newTopicAutoSummarize = sidebarAutoSummarizeSwitch.checked;
          GM_setValue2("newTopicAutoSummarize", state2.newTopicAutoSummarize);
          if (newTopicAutoSummarizeCheckbox) {
            newTopicAutoSummarizeCheckbox.checked = state2.newTopicAutoSummarize;
          }
          if (state2.newTopicAutoSummarize) {
            const topicId = document.getElementById("building")?.value || extractTopicId2?.();
            if (topicId && /^https:\/\/linux\.do\/t\/topic\/\d+/.test(window.location.href)) {
              attemptAutoSummarize2?.(topicId);
            }
          }
        });
      }
      updateSummaryWidthOffset = () => {
        const offsetInput2 = document.getElementById("summary-width-offset");
        if (!offsetInput2) return;
        state2.summaryWidthOffset = normalizeSummaryWidthOffset2(
          offsetInput2.value,
          DEFAULT_SUMMARY_WIDTH_OFFSET2
        );
        offsetInput2.value = state2.summaryWidthOffset;
        GM_setValue2("summaryWidthOffset", state2.summaryWidthOffset);
        applySidebarSettings2();
      };
      const offsetInput = document.getElementById("summary-width-offset");
      if (offsetInput) {
        offsetInput.addEventListener("change", () => {
          updateSummaryWidthOffset();
        });
      }
      updatePromptSelect();
      updateSummaryFilterInputs();
      updateApiSelect();
      updateSummaryWidthOffset();
      function exportSettings(returnObjOnly = false) {
        try {
          const settings = {
            promptConfigurations: state2.promptConfigurations,
            currentPromptIndex: state2.currentPromptIndex,
            customQuestionPresets: state2.customQuestionPresets,
            apiConfigurations: state2.apiConfigurations,
            currentApiIndex: state2.currentApiIndex,
            defaultOpenSidebar: state2.defaultOpenSidebar,
            settingsTabsCollapsed: state2.settingsTabsCollapsed,
            summaryWidthOffset: state2.summaryWidthOffset,
            summaryOutputFilters: state2.summaryOutputFilters,
            newTopicAutoSummarize: state2.newTopicAutoSummarize,
            listPageSummaryEnabled: state2.listPageSummaryEnabled,
            autoShowSummaryInList: state2.autoShowSummaryInList,
            listPageSummaryMaxLines: state2.listPageSummaryMaxLines,
            dearrowEnabled: state2.dearrowEnabled === true,
            dearrowAutoRewrite: state2.dearrowAutoRewrite === true,
            dearrowJudgmentPrompt: normalizePromptValue(
              state2.dearrowJudgmentPrompt,
              getDefaultDeArrowPrompt("dearrowJudgmentPrompt")
            ),
            dearrowRewritePrompt: normalizePromptValue(
              state2.dearrowRewritePrompt,
              getDefaultDeArrowPrompt("dearrowRewritePrompt")
            ),
            dearrowJudgmentApiIndex: state2.dearrowJudgmentApiIndex,
            dearrowRewriteApiIndex: state2.dearrowRewriteApiIndex,
            dearrowScopeRules: state2.dearrowScopeRules,
            toastEnabled: state2.toastEnabled,
            toastSettings: state2.toastSettings,
            toastClickAutoOpenSidebar: state2.toastClickAutoOpenSidebar,
            summaryTopicIds: Array.from(state2.summaryTopicIds),
            summaryWidthType: state2.summaryWidthType,
            summaryWidthValue: state2.summaryWidthValue,
            driveSummarySettings: state2.driveSummarySettings,
            sidebarWidth: GM_getValue2("sidebarWidth", "15%"),
            sidebarPosition: GM_getValue2("sidebarPosition", "left"),
            sidebarTopDistance: GM_getValue2("sidebarTopDistance", "5%"),
            sidebarBottomDistance: GM_getValue2("sidebarBottomDistance", "5%")
          };
          if (returnObjOnly) {
            return settings;
          }
          const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(settings, null, 2))}`;
          const downloadAnchorNode = document.createElement("a");
          downloadAnchorNode.setAttribute("href", dataStr);
          const currentDate = /* @__PURE__ */ new Date();
          const formattedDate = currentDate.toISOString().split("T")[0];
          downloadAnchorNode.setAttribute("download", `脚本配置 - [LINUX DO] 🌟 主题 & 回复 总结_${formattedDate}.json`);
          document.body.appendChild(downloadAnchorNode);
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
          createSettingsToast2("设置已导出！", "success", 3e3);
        } catch (error) {
          createSettingsToast2("导出设置时出错！", "error");
          console.error("Export error:", error);
          if (returnObjOnly) {
            return null;
          }
        }
      }
      function importSettings(importedSettings) {
        if (!importedSettings || typeof importedSettings !== "object" || !Array.isArray(importedSettings.promptConfigurations)) {
          createSettingsToast2("导入失败：设置数据无效或格式错误！", "error");
          return false;
        }
        const importedDeArrowScopeValidation = importedSettings.dearrowScopeRules !== void 0 ? typeof validateDeArrowScopeRules2 === "function" ? validateDeArrowScopeRules2(importedSettings.dearrowScopeRules) : { valid: true, rules: importedSettings.dearrowScopeRules, errors: [] } : null;
        if (importedDeArrowScopeValidation && !importedDeArrowScopeValidation.valid) {
          const firstError = importedDeArrowScopeValidation.errors?.[0]?.message || "DeArrow 作用范围无效";
          createSettingsToast2(`导入失败：${firstError}`, "error", 3200);
          return false;
        }
        try {
          state2.promptConfigurations = importedSettings.promptConfigurations ?? state2.promptConfigurations;
          state2.currentPromptIndex = importedSettings.currentPromptIndex >= 0 && importedSettings.currentPromptIndex < state2.promptConfigurations.length ? importedSettings.currentPromptIndex : 0;
          state2.customQuestionPresets = typeof normalizeQuestionPromptPresets2 === "function" ? normalizeQuestionPromptPresets2(importedSettings.customQuestionPresets ?? state2.customQuestionPresets) : Array.isArray(importedSettings.customQuestionPresets) ? importedSettings.customQuestionPresets : state2.customQuestionPresets;
          const importedApiRetryFallback = {
            retryCount: normalizeAutoRetryCount2(importedSettings.autoRetryCount, state2.autoRetryCount),
            retryInterval: normalizeAutoRetryInterval2(importedSettings.autoRetryInterval, state2.autoRetryInterval)
          };
          state2.apiConfigurations = importedSettings.apiConfigurations ? normalizeApiConfigurations2(importedSettings.apiConfigurations, importedApiRetryFallback) : state2.apiConfigurations;
          state2.currentApiIndex = normalizeCurrentApiIndex2(importedSettings.currentApiIndex, state2.apiConfigurations);
          state2.defaultOpenSidebar = importedSettings.defaultOpenSidebar !== void 0 ? importedSettings.defaultOpenSidebar : state2.defaultOpenSidebar;
          state2.settingsTabsCollapsed = importedSettings.settingsTabsCollapsed !== void 0 ? importedSettings.settingsTabsCollapsed : state2.settingsTabsCollapsed;
          state2.summaryWidthOffset = normalizeSummaryWidthOffset2(importedSettings.summaryWidthOffset, state2.summaryWidthOffset);
          state2.summaryOutputFilters = normalizeSummaryOutputFilters2(importedSettings.summaryOutputFilters ?? state2.summaryOutputFilters);
          state2.newTopicAutoSummarize = importedSettings.newTopicAutoSummarize !== void 0 ? importedSettings.newTopicAutoSummarize : state2.newTopicAutoSummarize;
          state2.listPageSummaryEnabled = importedSettings.listPageSummaryEnabled !== void 0 ? importedSettings.listPageSummaryEnabled : state2.listPageSummaryEnabled;
          state2.autoShowSummaryInList = importedSettings.autoShowSummaryInList !== void 0 ? importedSettings.autoShowSummaryInList : state2.autoShowSummaryInList;
          state2.listPageSummaryMaxLines = importedSettings.listPageSummaryMaxLines ?? state2.listPageSummaryMaxLines;
          state2.dearrowEnabled = importedSettings.dearrowEnabled !== void 0 ? importedSettings.dearrowEnabled === true : state2.dearrowEnabled;
          state2.dearrowAutoRewrite = importedSettings.dearrowAutoRewrite !== void 0 ? importedSettings.dearrowAutoRewrite === true : state2.dearrowAutoRewrite === true;
          if (importedSettings.dearrowJudgmentPrompt !== void 0) {
            state2.dearrowJudgmentPrompt = normalizePromptValue(
              importedSettings.dearrowJudgmentPrompt,
              getDefaultDeArrowPrompt("dearrowJudgmentPrompt")
            );
          }
          if (importedSettings.dearrowRewritePrompt !== void 0) {
            state2.dearrowRewritePrompt = normalizePromptValue(
              importedSettings.dearrowRewritePrompt,
              getDefaultDeArrowPrompt("dearrowRewritePrompt")
            );
          }
          const importedLegacyDeArrowApiIndex = importedSettings.dearrowApiIndex;
          const importedJudgmentApiIndex = importedSettings.dearrowJudgmentApiIndex ?? importedLegacyDeArrowApiIndex ?? state2.dearrowJudgmentApiIndex;
          const importedRewriteApiIndex = importedSettings.dearrowRewriteApiIndex ?? importedLegacyDeArrowApiIndex ?? state2.dearrowRewriteApiIndex;
          state2.dearrowJudgmentApiIndex = typeof normalizeDeArrowApiIndex2 === "function" ? normalizeDeArrowApiIndex2(
            importedJudgmentApiIndex,
            state2.apiConfigurations
          ) : Math.max(0, parseInt(importedJudgmentApiIndex, 10) || 0);
          state2.dearrowRewriteApiIndex = typeof normalizeDeArrowApiIndex2 === "function" ? normalizeDeArrowApiIndex2(
            importedRewriteApiIndex,
            state2.apiConfigurations
          ) : Math.max(0, parseInt(importedRewriteApiIndex, 10) || 0);
          if (importedDeArrowScopeValidation) {
            state2.dearrowScopeRules = importedDeArrowScopeValidation.rules;
          }
          state2.toastEnabled = importedSettings.toastEnabled !== void 0 ? importedSettings.toastEnabled : state2.toastEnabled;
          state2.toastSettings = importedSettings.toastSettings ?? state2.toastSettings;
          state2.toastClickAutoOpenSidebar = importedSettings.toastClickAutoOpenSidebar !== void 0 ? importedSettings.toastClickAutoOpenSidebar : state2.toastClickAutoOpenSidebar;
          state2.summaryWidthType = importedSettings.summaryWidthType ?? state2.summaryWidthType;
          state2.summaryWidthValue = importedSettings.summaryWidthValue ?? state2.summaryWidthValue;
          if (importedSettings.driveSummarySettings) {
            state2.driveSummarySettings = persistDriveSummarySettings2(importedSettings.driveSummarySettings);
          }
          if (Array.isArray(importedSettings.summaryTopicIds)) {
            state2.summaryTopicIds = new Set(sanitizeSummaryTopicIds2(importedSettings.summaryTopicIds));
            persistSummaryTopicIds2?.();
          }
          const resolvedSidebarSettings = resolveImportedSidebarSettings2(importedSettings, {
            sidebarWidth: GM_getValue2("sidebarWidth", "15%"),
            sidebarPosition: GM_getValue2("sidebarPosition", "left"),
            sidebarTopDistance: GM_getValue2("sidebarTopDistance", "5%"),
            sidebarBottomDistance: GM_getValue2("sidebarBottomDistance", "5%")
          });
          GM_setValue2("promptConfigurations", state2.promptConfigurations);
          GM_setValue2("currentPromptIndex", state2.currentPromptIndex);
          GM_setValue2("customQuestionPresets", state2.customQuestionPresets);
          persistApiConfigurations2?.({ retryFallback: importedApiRetryFallback });
          GM_setValue2("defaultOpenSidebar", state2.defaultOpenSidebar);
          GM_setValue2("settingsTabsCollapsed", state2.settingsTabsCollapsed);
          GM_setValue2("summaryWidthOffset", state2.summaryWidthOffset);
          GM_setValue2("summaryOutputFilters", state2.summaryOutputFilters);
          GM_setValue2("newTopicAutoSummarize", state2.newTopicAutoSummarize);
          GM_setValue2("listPageSummaryEnabled", state2.listPageSummaryEnabled);
          GM_setValue2("autoShowSummaryInList", state2.autoShowSummaryInList);
          GM_setValue2("listPageSummaryMaxLines", state2.listPageSummaryMaxLines);
          GM_setValue2("dearrowEnabled", state2.dearrowEnabled);
          GM_setValue2("dearrowAutoRewrite", state2.dearrowAutoRewrite);
          if (state2.dearrowJudgmentPrompt !== void 0) {
            GM_setValue2("dearrowJudgmentPrompt", state2.dearrowJudgmentPrompt);
          }
          if (state2.dearrowRewritePrompt !== void 0) {
            GM_setValue2("dearrowRewritePrompt", state2.dearrowRewritePrompt);
          }
          GM_setValue2("dearrowJudgmentApiIndex", state2.dearrowJudgmentApiIndex);
          GM_setValue2("dearrowRewriteApiIndex", state2.dearrowRewriteApiIndex);
          GM_setValue2("dearrowScopeRules", state2.dearrowScopeRules);
          GM_setValue2("toastEnabled", state2.toastEnabled);
          GM_setValue2("toastSettings", state2.toastSettings);
          GM_setValue2("toastClickAutoOpenSidebar", state2.toastClickAutoOpenSidebar);
          GM_setValue2("summaryWidthType", state2.summaryWidthType);
          GM_setValue2("summaryWidthValue", state2.summaryWidthValue);
          GM_setValue2("sidebarWidth", resolvedSidebarSettings.sidebarWidth);
          GM_setValue2("sidebarPosition", resolvedSidebarSettings.sidebarPosition);
          GM_setValue2("sidebarTopDistance", resolvedSidebarSettings.sidebarTopDistance);
          GM_setValue2("sidebarBottomDistance", resolvedSidebarSettings.sidebarBottomDistance);
          const listSummaryEnabledSwitchEl = document.getElementById("list-summary-enabled-switch");
          const autoShowSummarySwitchEl = document.getElementById("auto-show-summary-switch");
          const listSummaryMaxLinesInputEl = document.getElementById("list-summary-max-lines");
          const summaryWidthOffsetInput = document.getElementById("summary-width-offset");
          const newTopicAutoSummarizeCheckboxEl = document.getElementById("new-topic-auto-summarize");
          const sidebarAutoSummarizeSwitchEl = document.getElementById("sidebar-auto-summarize-switch");
          const toastClickAutoOpenSidebarSwitchEl = document.getElementById("toast-click-auto-open-sidebar-switch");
          const autoRetryCountInputEl = document.getElementById("auto-retry-count");
          const autoRetryIntervalInputEl = document.getElementById("auto-retry-interval");
          if (listSummaryEnabledSwitchEl) listSummaryEnabledSwitchEl.checked = state2.listPageSummaryEnabled;
          if (autoShowSummarySwitchEl) autoShowSummarySwitchEl.checked = state2.autoShowSummaryInList;
          if (listSummaryMaxLinesInputEl) listSummaryMaxLinesInputEl.value = state2.listPageSummaryMaxLines;
          updatePromptSelect();
          updateQuestionPresetSelect();
          updateSummaryFilterInputs();
          updateApiSelect();
          applySidebarSettings2();
          if (summaryWidthOffsetInput) summaryWidthOffsetInput.value = state2.summaryWidthOffset;
          if (newTopicAutoSummarizeCheckboxEl) newTopicAutoSummarizeCheckboxEl.checked = state2.newTopicAutoSummarize;
          if (sidebarAutoSummarizeSwitchEl) sidebarAutoSummarizeSwitchEl.checked = state2.newTopicAutoSummarize;
          if (toastClickAutoOpenSidebarSwitchEl) toastClickAutoOpenSidebarSwitchEl.checked = state2.toastClickAutoOpenSidebar;
          if (autoRetryCountInputEl) autoRetryCountInputEl.value = state2.autoRetryCount;
          if (autoRetryIntervalInputEl) autoRetryIntervalInputEl.value = state2.autoRetryInterval;
          updateDeArrowSettingsInputs();
          try {
            addToastSettingsToModal2();
            updateAdjustmentPrompts2();
            updateListSummaryStyles?.();
            applySummaryWidthSettings2();
            enhanceSummaryWidthSettings2();
            syncDriveSummarySettingsUI2?.();
            const onListSummaryPage = isListSummaryPageUrl2(state2.currentPageUrl);
            if (state2.listPageSummaryEnabled && onListSummaryPage) {
              if (typeof refreshListSummaryForCurrentPage2 === "function") {
                refreshListSummaryForCurrentPage2({ forceRebuild: true, delay: 0 });
              } else {
                removeTopicListSummaryButtons2?.({ preserveExpanded: true });
                addTopicListSummaryButtons?.();
                restoreExpandedSummaryRows?.();
              }
            } else {
              clearListSummaryBootstrapWatcher2?.();
              removeTopicListSummaryButtons2?.({ preserveExpanded: true });
              if (window.topicListObserver) window.topicListObserver.disconnect();
            }
            refreshDeArrowForCurrentPage2?.({ forceRebuild: true, pullDrive: true });
            updateAllSummaryButtonsAndContainers?.();
            const currentTopicId = document.getElementById("building")?.value || extractTopicId2?.();
            if (currentTopicId) {
              updateSidebarSubmitButtonState2?.(currentTopicId);
            }
            applyTabsCollapsedState(state2.settingsTabsCollapsed);
          } catch (uiErr) {
            console.warn("UI refresh after import failed:", uiErr);
          }
          createSettingsToast2("设置已成功导入并应用！", "success", 3e3);
          return true;
        } catch (error) {
          createSettingsToast2("应用导入的设置时出错！", "error");
          console.error("Error applying imported settings:", error);
          return false;
        }
      }
      if (exportSettingsButton && exportSettingsButton.dataset.bound !== "true") {
        exportSettingsButton.dataset.bound = "true";
        exportSettingsButton.addEventListener("click", (event) => {
          event.preventDefault();
          exportSettings(false);
        });
      }
      if (importSettingsButton && importSettingsFile && importSettingsButton.dataset.bound !== "true") {
        importSettingsButton.dataset.bound = "true";
        importSettingsButton.addEventListener("click", (event) => {
          event.preventDefault();
          importSettingsFile.click();
        });
      }
      if (importSettingsFile && importSettingsFile.dataset.bound !== "true") {
        importSettingsFile.dataset.bound = "true";
        importSettingsFile.addEventListener("change", (event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          if (typeof FileReader !== "function") {
            createSettingsToast2("导入失败：当前浏览器不支持读取文件", "error", 3e3);
            importSettingsFile.value = "";
            return;
          }
          const reader = new FileReader();
          reader.onload = (loadEvent) => {
            try {
              importSettings(JSON.parse(loadEvent.target.result));
            } catch (error) {
              createSettingsToast2("导入失败：格式有误", "error", 3e3);
              console.error("Import settings parse error:", error);
            } finally {
              importSettingsFile.value = "";
            }
          };
          reader.onerror = () => {
            createSettingsToast2("导入失败：无法读取文件", "error", 3e3);
            importSettingsFile.value = "";
          };
          reader.readAsText(file);
        });
      }
      registerPublicApiHandlers2?.({
        exportSettings,
        importSettings
      });
      if (!importExportFeatureController) {
        importExportFeatureController = initializeImportExportFeature2({
          createToast: createToast2,
          createSettingsToast: createSettingsToast2,
          exportSettingsObject: () => exportSettings(true),
          importSettings,
          getSummaryHistoryMap: () => getSummaryHistoryMap(),
          setSummaryHistoryMap: (summaryHistory) => setSummaryHistoryMap(summaryHistory),
          getTopicQuestionHistoryMap: () => getTopicQuestionHistoryMap?.() || {},
          setTopicQuestionHistoryMap: (questionHistory) => setTopicQuestionHistoryMap?.(questionHistory),
          getDeArrowTopicStates: () => getDeArrowTopicStates?.() || {},
          setDeArrowTopicStates: (topicStates) => setDeArrowTopicStates?.(topicStates),
          normalizeDeArrowTopicStates: normalizeDeArrowTopicStates2,
          syncSummaryTopicIdsFromSources: syncSummaryTopicIdsFromSources2,
          replaceSummaryTopicIdsFromHistoryMap: replaceSummaryTopicIdsFromHistoryMap2,
          markDriveSummaryTopicsDirty: markDriveSummaryTopicsDirty2,
          markDriveDeArrowDirty: markDriveDeArrowDirty2,
          scheduleDriveSummarySync: scheduleDriveSummarySync2,
          updateAllSummaryButtonsAndContainers,
          syncDriveSummarySettingsUI: syncDriveSummarySettingsUI2,
          persistDriveSummarySettings: persistDriveSummarySettings2,
          getDriveSummarySettings,
          uploadSummaryHistoryToDrive: uploadSummaryHistoryToDrive2,
          rebuildSummaryTopicIdsFromDrive: rebuildSummaryTopicIdsFromDrive2
        });
      }
      importExportFeatureController?.mountPanels?.();
      registerPublicApiHandlers2?.({
        exportSummaryContent: importExportFeatureController?.exportSummaryContent,
        exportAllData: importExportFeatureController?.exportAllData,
        importAllData: importExportFeatureController?.importAllData
      });
      updateAdjustmentPrompts2 = () => {
        const sidebarWidthScriptActive = isSidebarWidthScriptActive2();
        const widthMsg = document.getElementById("width-adjustment-message");
        const offsetMsg = document.getElementById("offset-adjustment-message");
        const widthSlider = document.getElementById("sidebar-width-slider");
        const offsetInput2 = document.getElementById("summary-width-offset");
        if (!widthMsg || !offsetMsg || !widthSlider || !offsetInput2) {
          return;
        }
        if (sidebarWidthScriptActive) {
          widthMsg.textContent = "已锁定🔒！（宽度已由侧边栏宽度控制脚本接管！）";
          widthMsg.classList.remove("inactive");
          widthSlider.disabled = true;
          offsetMsg.textContent = "已解锁🔓！（宽度偏差值可正负调整，负值会收窄面板）";
          offsetMsg.classList.remove("inactive");
          offsetInput2.disabled = false;
        } else {
          widthMsg.textContent = "已解锁🔓！（未检测到侧边栏宽度控制脚本，宽度不受接管！）";
          widthMsg.classList.add("inactive");
          widthSlider.disabled = false;
          offsetMsg.textContent = "已锁定🔒！（未检测到侧边栏宽度控制脚本，偏差值不可用）";
          offsetMsg.classList.add("inactive");
          offsetInput2.disabled = true;
        }
      };
    }
    function enhanceSummaryWidthSettings2() {
      const listSummarySettingsTab = document.getElementById("list-summary-settings");
      if (!listSummarySettingsTab) return;
      const widthSettings = listSummarySettingsTab.querySelector(".width-settings");
      if (!widthSettings) return;
      widthSettings.innerHTML = "";
      const widthTypeWrapper = document.createElement("div");
      widthTypeWrapper.className = "width-type-options";
      const widthTypeTitle = document.createElement("label");
      widthTypeTitle.className = "width-type-title";
      widthTypeTitle.textContent = "选择宽度类型：";
      widthTypeWrapper.appendChild(widthTypeTitle);
      const widthTypeOptions = [
        { value: "percent", label: "相对宽度 (百分比)" },
        { value: "pixel", label: "绝对宽度 (像素)" }
      ];
      const widthTypeSelect = document.createElement("details");
      widthTypeSelect.id = "summary-width-type";
      widthTypeSelect.className = "select-kit single-select combobox combo-box has-selection width-type-select";
      const selectHeader = document.createElement("summary");
      selectHeader.id = "summary-width-type-header";
      selectHeader.className = "select-kit-header single-select-header combo-box-header";
      selectHeader.setAttribute("role", "listbox");
      selectHeader.setAttribute("tabindex", "0");
      const headerWrapper = document.createElement("div");
      headerWrapper.className = "select-kit-header-wrapper";
      const selectedName = document.createElement("div");
      selectedName.className = "select-kit-selected-name selected-name choice";
      const selectedNameText = document.createElement("span");
      selectedNameText.className = "name";
      selectedName.appendChild(selectedNameText);
      const caretIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      caretIcon.setAttribute("class", "fa d-icon d-icon-caret-down svg-icon fa-width-auto caret-icon svg-string");
      caretIcon.setAttribute("aria-hidden", "true");
      caretIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      const caretUse = document.createElementNS("http://www.w3.org/2000/svg", "use");
      caretUse.setAttribute("href", "#caret-down");
      caretIcon.appendChild(caretUse);
      headerWrapper.appendChild(selectedName);
      headerWrapper.appendChild(caretIcon);
      selectHeader.appendChild(headerWrapper);
      widthTypeSelect.appendChild(selectHeader);
      const selectBody = document.createElement("div");
      selectBody.id = "summary-width-type-body";
      selectBody.className = "select-kit-body";
      const selectCollection = document.createElement("div");
      selectCollection.className = "select-kit-collection";
      selectBody.appendChild(selectCollection);
      widthTypeSelect.appendChild(selectBody);
      const widthTypeRows = [];
      function normalizeWidthType(value) {
        return widthTypeOptions.some((option) => option.value === value) ? value : widthTypeOptions[0].value;
      }
      function updateWidthTypeSelect() {
        state2.summaryWidthType = normalizeWidthType(state2.summaryWidthType);
        const activeOption = widthTypeOptions.find((option) => option.value === state2.summaryWidthType) || widthTypeOptions[0];
        const label = activeOption.label;
        selectedNameText.textContent = label;
        selectedName.title = label;
        selectedName.dataset.value = activeOption.value;
        selectedName.dataset.name = label;
        selectHeader.dataset.value = activeOption.value;
        selectHeader.dataset.name = label;
        selectHeader.setAttribute("name", label);
        selectHeader.setAttribute("aria-label", `选择宽度类型：${label}`);
        widthTypeRows.forEach(({ row, option }) => {
          const isSelected = option.value === activeOption.value;
          row.classList.toggle("is-selected", isSelected);
          row.setAttribute("aria-selected", isSelected ? "true" : "false");
        });
      }
      widthTypeOptions.forEach((option) => {
        const row = document.createElement("div");
        row.className = "select-kit-row";
        row.dataset.value = option.value;
        row.dataset.name = option.label;
        row.setAttribute("role", "option");
        row.setAttribute("tabindex", "0");
        const rowLabel = document.createElement("span");
        rowLabel.className = "name";
        rowLabel.textContent = option.label;
        row.appendChild(rowLabel);
        const selectOption = () => {
          if (state2.summaryWidthType === option.value) {
            widthTypeSelect.open = false;
            return;
          }
          state2.summaryWidthType = option.value;
          toggleWidthContainers(state2.summaryWidthType);
          updatePreview();
          updateWidthTypeSelect();
          widthTypeSelect.open = false;
          if (typeof persistListSummarySettingsHandler === "function") {
            persistListSummarySettingsHandler({ showToast: false });
          }
        };
        row.addEventListener("click", selectOption);
        row.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            selectOption();
          }
        });
        widthTypeRows.push({ row, option });
        selectCollection.appendChild(row);
      });
      widthTypeWrapper.appendChild(widthTypeSelect);
      widthSettings.appendChild(widthTypeWrapper);
      function createWidthInputSection(config) {
        const { id, title, min, max, unit, defaultValue, rangeId, inputId } = config;
        const container = document.createElement("div");
        container.id = id;
        container.className = "width-input-container";
        const titleSpan = document.createElement("span");
        titleSpan.className = "width-input-title";
        const titleMatch = title.match(/^(.*?)(\s*\(.*\))$/);
        if (titleMatch) {
          const mainTitle = document.createElement("span");
          mainTitle.className = "width-input-title-main";
          mainTitle.textContent = titleMatch[1];
          const metaTitle = document.createElement("span");
          metaTitle.className = "width-input-title-meta";
          metaTitle.textContent = titleMatch[2];
          titleSpan.appendChild(mainTitle);
          titleSpan.appendChild(metaTitle);
        } else {
          titleSpan.textContent = title;
        }
        const headerRow = document.createElement("div");
        headerRow.className = "width-input-header";
        const inlineGroup = document.createElement("div");
        inlineGroup.className = "width-input-inline";
        const range = document.createElement("input");
        range.type = "range";
        range.id = rangeId;
        range.className = "width-range";
        range.min = String(min);
        range.max = String(max);
        range.value = String(defaultValue);
        const numberWrap = document.createElement("div");
        numberWrap.className = "width-number-wrap";
        const numberInput = document.createElement("input");
        numberInput.type = "number";
        numberInput.id = inputId;
        numberInput.className = "number-input summary-width-value-input";
        numberInput.min = String(min);
        numberInput.max = String(max);
        numberInput.value = String(defaultValue);
        const unitSpan = document.createElement("span");
        unitSpan.className = "unit-label";
        unitSpan.textContent = unit;
        numberWrap.appendChild(numberInput);
        numberWrap.appendChild(unitSpan);
        headerRow.appendChild(titleSpan);
        headerRow.appendChild(numberWrap);
        inlineGroup.appendChild(range);
        container.appendChild(headerRow);
        container.appendChild(inlineGroup);
        return { container, range, numberInput };
      }
      const percentDefaults = state2.summaryWidthType === "percent" ? state2.summaryWidthValue : 100;
      const pixelDefaults = state2.summaryWidthType === "pixel" ? state2.summaryWidthValue : 500;
      const percentSection = createWidthInputSection({
        id: "percent-width-container",
        title: "宽度值 (10-100%)",
        min: 10,
        max: 100,
        unit: "%",
        defaultValue: percentDefaults,
        rangeId: "percent-range",
        inputId: "summary-percent-value"
      });
      const pixelSection = createWidthInputSection({
        id: "pixel-width-container",
        title: "宽度值 (100-2000px)",
        min: 100,
        max: 2e3,
        unit: "px",
        defaultValue: pixelDefaults,
        rangeId: "pixel-range",
        inputId: "summary-pixel-value"
      });
      widthSettings.appendChild(percentSection.container);
      widthSettings.appendChild(pixelSection.container);
      const widthPreview = document.createElement("div");
      widthPreview.className = "width-preview";
      const previewHeader = document.createElement("div");
      previewHeader.className = "width-preview-header";
      const previewLabel = document.createElement("span");
      previewLabel.textContent = "当前预览宽度：";
      const previewValue = document.createElement("span");
      previewValue.id = "current-width-display";
      previewValue.textContent = state2.summaryWidthType === "percent" ? `${percentDefaults}%` : `${pixelDefaults}px`;
      previewHeader.appendChild(previewLabel);
      previewHeader.appendChild(previewValue);
      const previewBarWrapper = document.createElement("div");
      previewBarWrapper.className = "width-preview-bar-wrapper";
      const previewBar = document.createElement("div");
      previewBar.id = "width-preview-box";
      previewBarWrapper.appendChild(previewBar);
      widthPreview.appendChild(previewHeader);
      widthPreview.appendChild(previewBarWrapper);
      widthSettings.appendChild(widthPreview);
      const percentContainer = percentSection.container;
      const pixelContainer = pixelSection.container;
      const percentRange = percentSection.range;
      const percentValue = percentSection.numberInput;
      const pixelRange = pixelSection.range;
      const pixelValue = pixelSection.numberInput;
      const previewBox = previewBar;
      const currentWidthDisplay = previewValue;
      function clampPercent(value) {
        let val = parseInt(value, 10);
        if (Number.isNaN(val)) val = 10;
        return Math.max(10, Math.min(100, val));
      }
      function clampPixel(value) {
        let val = parseInt(value, 10);
        if (Number.isNaN(val)) val = 100;
        return Math.max(100, Math.min(2e3, val));
      }
      function toggleWidthContainers(activeType) {
        if (activeType === "percent") {
          percentContainer.style.display = "";
          pixelContainer.style.display = "none";
        } else {
          percentContainer.style.display = "none";
          pixelContainer.style.display = "";
        }
      }
      function getPercentValue() {
        const raw = percentValue ? percentValue.value : percentDefaults;
        const clamped = clampPercent(raw);
        if (percentValue) percentValue.value = clamped;
        if (percentRange) percentRange.value = clamped;
        return clamped;
      }
      function getPixelValue() {
        const raw = pixelValue ? pixelValue.value : pixelDefaults;
        const clamped = clampPixel(raw);
        if (pixelValue) pixelValue.value = clamped;
        if (pixelRange) pixelRange.value = clamped;
        return clamped;
      }
      function updatePreview() {
        if (!previewBox || !currentWidthDisplay) return;
        if (state2.summaryWidthType === "percent") {
          const percent = getPercentValue();
          previewBox.style.width = `${percent}%`;
          currentWidthDisplay.textContent = `${percent}%`;
        } else {
          const px = getPixelValue();
          const percent = Math.min(100, Math.max(0, Math.round(px / 2e3 * 100)));
          previewBox.style.width = `${percent}%`;
          currentWidthDisplay.textContent = `${px}px`;
        }
      }
      if (percentRange && percentValue) {
        const applyPercentFromRange = () => {
          const clamped = clampPercent(percentRange.value);
          percentRange.value = clamped;
          percentValue.value = clamped;
          if (state2.summaryWidthType === "percent") updatePreview();
        };
        const applyPercentFromInput = () => {
          const clamped = clampPercent(percentValue.value);
          percentValue.value = clamped;
          percentRange.value = clamped;
          if (state2.summaryWidthType === "percent") updatePreview();
        };
        percentRange.addEventListener("input", applyPercentFromRange);
        percentValue.addEventListener("input", applyPercentFromInput);
        percentRange.addEventListener("change", () => {
          applyPercentFromRange();
          if (typeof persistListSummarySettingsHandler === "function") {
            persistListSummarySettingsHandler({ showToast: false });
          }
        });
        percentValue.addEventListener("change", () => {
          applyPercentFromInput();
          if (typeof persistListSummarySettingsHandler === "function") {
            persistListSummarySettingsHandler({ showToast: false });
          }
        });
      }
      if (pixelRange && pixelValue) {
        const applyPixelFromRange = () => {
          const clamped = clampPixel(pixelRange.value);
          pixelRange.value = clamped;
          pixelValue.value = clamped;
          if (state2.summaryWidthType === "pixel") updatePreview();
        };
        const applyPixelFromInput = () => {
          const clamped = clampPixel(pixelValue.value);
          pixelValue.value = clamped;
          pixelRange.value = clamped;
          if (state2.summaryWidthType === "pixel") updatePreview();
        };
        pixelRange.addEventListener("input", applyPixelFromRange);
        pixelValue.addEventListener("input", applyPixelFromInput);
        pixelRange.addEventListener("change", () => {
          applyPixelFromRange();
          if (typeof persistListSummarySettingsHandler === "function") {
            persistListSummarySettingsHandler({ showToast: false });
          }
        });
        pixelValue.addEventListener("change", () => {
          applyPixelFromInput();
          if (typeof persistListSummarySettingsHandler === "function") {
            persistListSummarySettingsHandler({ showToast: false });
          }
        });
      }
      updateWidthTypeSelect();
      toggleWidthContainers(state2.summaryWidthType);
      updatePreview();
    }
    function addToastSettingsToModal2() {
      const toastSettingsTab = document.getElementById("toast-settings");
      if (!toastSettingsTab) return;
      toastSettingsTab.innerHTML = "";
      const subTabs = document.createElement("div");
      subTabs.className = "toast-sub-tabs";
      subTabs.innerHTML = `
            <button class="toast-sub-tab-button active" data-toast-tab="toast-settings-basic">
                <span class="tab-icon" aria-hidden="true">🔔</span>
                <span class="tab-label">开关/自动展开</span>
            </button>
            <button class="toast-sub-tab-button" data-toast-tab="toast-settings-delay">
                <span class="tab-icon" aria-hidden="true">⏱️</span>
                <span class="tab-label">关闭延迟</span>
            </button>
        `;
      toastSettingsTab.appendChild(subTabs);
      const subTabPanels = document.createElement("div");
      subTabPanels.className = "toast-sub-tab-panels";
      toastSettingsTab.appendChild(subTabPanels);
      const basicContent = document.createElement("div");
      basicContent.className = "toast-sub-tab-content settings-card active";
      basicContent.id = "toast-settings-basic";
      subTabPanels.appendChild(basicContent);
      const basicSwitchDiv = document.createElement("div");
      basicSwitchDiv.className = "switch-container";
      basicSwitchDiv.innerHTML = `
            <span class="switch-label">1. Toast通知总开关（关/开）</span>
            <label class="switch switch-on-off">
                <input type="checkbox" id="toast-enabled-switch" ${state2.toastEnabled ? "checked" : ""}>
                <span class="slider"></span>
            </label>
            <span class="tooltip">是否显示操作结果的Toast通知？</span>
        `;
      basicContent.appendChild(basicSwitchDiv);
      const autoExpandSwitchDiv = document.createElement("div");
      autoExpandSwitchDiv.className = "switch-container";
      autoExpandSwitchDiv.innerHTML = `
            <span class="switch-label">2. Toast点击自动展开总结（关/开）</span>
            <label class="switch switch-on-off">
                <input type="checkbox" id="toast-auto-expand-switch" ${state2.toastAutoExpand ? "checked" : ""}>
                <span class="slider"></span>
            </label>
            <span class="tooltip">启用后，点击总结完成Toast会自动展开对应总结。</span>
        `;
      basicContent.appendChild(autoExpandSwitchDiv);
      const clickAutoOpenSidebarSwitchDiv = document.createElement("div");
      clickAutoOpenSidebarSwitchDiv.className = "switch-container";
      clickAutoOpenSidebarSwitchDiv.innerHTML = `
            <span class="switch-label">3. 点击 Toast 自动展开侧边栏（关/开）</span>
            <label class="switch switch-on-off">
                <input type="checkbox" id="toast-click-auto-open-sidebar-switch" ${state2.toastClickAutoOpenSidebar ? "checked" : ""}>
                <span class="slider"></span>
            </label>
            <span class="tooltip">启用后，在话题页点击当前话题Toast会自动展开折叠的侧边栏。</span>
        `;
      basicContent.appendChild(clickAutoOpenSidebarSwitchDiv);
      const toastAutoExpandSwitch = document.getElementById("toast-auto-expand-switch");
      if (toastAutoExpandSwitch) {
        toastAutoExpandSwitch.addEventListener("change", () => {
          state2.toastAutoExpand = toastAutoExpandSwitch.checked;
          GM_setValue2("toastAutoExpand", state2.toastAutoExpand);
        });
      }
      const toastClickAutoOpenSidebarSwitch = document.getElementById("toast-click-auto-open-sidebar-switch");
      if (toastClickAutoOpenSidebarSwitch) {
        toastClickAutoOpenSidebarSwitch.addEventListener("change", () => {
          state2.toastClickAutoOpenSidebar = toastClickAutoOpenSidebarSwitch.checked;
          GM_setValue2("toastClickAutoOpenSidebar", state2.toastClickAutoOpenSidebar);
        });
      }
      const delayContent = document.createElement("div");
      delayContent.className = "toast-sub-tab-content settings-card";
      delayContent.id = "toast-settings-delay";
      subTabPanels.appendChild(delayContent);
      const typeSettingsHeader = document.createElement("div");
      typeSettingsHeader.className = "toast-settings-header";
      typeSettingsHeader.innerHTML = `
            <div class="toast-settings-header-top">
                <span class="switch-label toast-delay-title">Toast通知延迟关闭设置</span>
                <button type="button" class="toast-delay-toggle" aria-expanded="false" aria-controls="toast-delay-description">
                    展开提示
                </button>
            </div>
            <div id="toast-delay-description" class="toast-settings-description hidden">
                每种通知类型可以单独设置是否自动关闭以及延迟关闭时间。
                <br>→ <b>延迟关闭时间</b>：设置为0秒表示通知永不自动关闭；设置为其他值表示通知显示多少秒后自动关闭。
                <br>→ 点击“预览”按钮可以查看该类型通知的实际效果。
            </div>
        `;
      delayContent.appendChild(typeSettingsHeader);
      const toastTypeGrid = document.createElement("div");
      toastTypeGrid.className = "toast-type-grid";
      toastTypeGrid.innerHTML = `
            <div class="toast-type-row header">
                <div class="toast-type-cell">类型</div>
                <div class="toast-type-cell">预览</div>
                <div class="toast-type-cell">自动关闭</div>
                <div class="toast-type-cell">关闭延迟</div>
            </div>
        `;
      const toastTypes = {
        info: { name: "信息", icon: "ℹ️", description: "一般信息提示" },
        success: { name: "成功", icon: "✅", description: "操作成功提示" },
        warning: { name: "警告", icon: "⚠️", description: "警告信息提示" },
        error: { name: "错误", icon: "❌", description: "错误信息提示" }
      };
      Object.entries(toastTypes).forEach(([type, info]) => {
        const settings = state2.toastSettings[type] || {
          autoClose: type !== "error" && type !== "success",
          duration: type === "info" ? 3 : type === "warning" ? 5 : 0
        };
        state2.toastSettings[type] = settings;
        const row = document.createElement("div");
        row.className = "toast-type-row";
        row.innerHTML = `
                <div class="toast-type-cell" data-label="类型">
                    <div class="toast-type-info">
                        <span class="toast-type-icon">${info.icon}</span>
                        <div class="toast-type-details">
                            <span class="toast-type-name">${info.name}</span>
                            <span class="toast-type-description">${info.description}</span>
                        </div>
                    </div>
                </div>
                <div class="toast-type-cell" data-label="预览">
                    <button id="preview-toast-${type}" class="preview-toast-button">预览</button>
                </div>
                <div class="toast-type-cell" data-label="自动关闭">
                    <label class="switch switch-on-off">
                        <input type="checkbox" id="toast-${type}-autoclose" ${settings.autoClose ? "checked" : ""}>
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="toast-type-cell" data-label="延迟关闭时间">
                    <div class="duration-input-container">
                        <input type="number" id="toast-${type}-duration" min="0" max="60" value="${settings.duration}" ${!settings.autoClose ? "disabled" : ""}>
                        <span class="duration-unit">秒</span>
                    </div>
                </div>
            `;
        toastTypeGrid.appendChild(row);
      });
      delayContent.appendChild(toastTypeGrid);
      const toastSubTabButtons = toastSettingsTab.querySelectorAll(".toast-sub-tab-button");
      const toastSubTabContents = toastSettingsTab.querySelectorAll(".toast-sub-tab-content");
      toastSubTabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const targetId = button.getAttribute("data-toast-tab");
          toastSubTabButtons.forEach((btn) => btn.classList.remove("active"));
          toastSubTabContents.forEach((content) => content.classList.remove("active"));
          button.classList.add("active");
          const targetContent = toastSettingsTab.querySelector(`#${targetId}`);
          if (targetContent) {
            targetContent.classList.add("active");
          }
        });
      });
      const toastDelayToggle = typeSettingsHeader.querySelector(".toast-delay-toggle");
      const toastDelayDescription = typeSettingsHeader.querySelector(".toast-settings-description");
      if (toastDelayToggle && toastDelayDescription) {
        toastDelayToggle.addEventListener("click", () => {
          const expanded = toastDelayToggle.getAttribute("aria-expanded") === "true";
          const nextState = !expanded;
          toastDelayToggle.setAttribute("aria-expanded", String(nextState));
          toastDelayDescription.classList.toggle("hidden", !nextState);
          toastDelayToggle.textContent = nextState ? "收起提示" : "展开提示";
        });
      }
      setTimeout(() => {
        Object.keys(toastTypes).forEach((type) => {
          const autoCloseSwitch = document.getElementById(`toast-${type}-autoclose`);
          const durationInput = document.getElementById(`toast-${type}-duration`);
          const previewButton = document.getElementById(`preview-toast-${type}`);
          if (autoCloseSwitch && durationInput) {
            autoCloseSwitch.addEventListener("change", function() {
              durationInput.disabled = !this.checked;
              if (!this.checked) {
                durationInput.value = 0;
              } else if (parseInt(durationInput.value, 10) === 0) {
                durationInput.value = type === "info" ? 3 : type === "warning" ? 5 : 1;
              }
              saveToastSettings();
            });
            durationInput.addEventListener("change", () => {
              saveToastSettings();
            });
          }
          if (previewButton) {
            previewButton.addEventListener("click", () => {
              const autoClose = document.getElementById(`toast-${type}-autoclose`)?.checked ?? false;
              const durationValue = parseInt(document.getElementById(`toast-${type}-duration`)?.value, 10);
              const duration = Number.isNaN(durationValue) || durationValue < 0 ? 0 : durationValue;
              const message = `这是一条${toastTypes[type].name}类型的通知示例`;
              const customDurationMs = autoClose && duration > 0 ? duration * 1e3 : 0;
              createToast2(message, type, customDurationMs);
            });
          }
        });
        const toastEnabledSwitch = document.getElementById("toast-enabled-switch");
        if (toastEnabledSwitch) {
          toastEnabledSwitch.addEventListener("change", function() {
            state2.toastEnabled = this.checked;
            GM_setValue2("toastEnabled", state2.toastEnabled);
            const grid2 = document.querySelector(".toast-type-grid");
            if (grid2) {
              grid2.style.opacity = state2.toastEnabled ? "1" : "0.5";
              grid2.querySelectorAll("input, button").forEach((el) => {
                el.disabled = !state2.toastEnabled;
              });
            }
          });
          const grid = document.querySelector(".toast-type-grid");
          if (grid) {
            grid.style.opacity = state2.toastEnabled ? "1" : "0.5";
            grid.querySelectorAll("input, button").forEach((el) => {
              el.disabled = !state2.toastEnabled;
            });
          }
        }
      }, 0);
    }
    function saveToastSettings({ showToast = true } = {}) {
      ["info", "success", "warning", "error"].forEach((type) => {
        const autoCloseSwitch = document.getElementById(`toast-${type}-autoclose`);
        const durationInput = document.getElementById(`toast-${type}-duration`);
        if (autoCloseSwitch && durationInput) {
          let duration = parseInt(durationInput.value, 10);
          if (Number.isNaN(duration)) duration = type === "info" ? 3 : type === "warning" ? 5 : 0;
          duration = Math.max(0, Math.min(60, duration));
          state2.toastSettings[type] = {
            autoClose: autoCloseSwitch.checked,
            duration
          };
          durationInput.value = duration;
          durationInput.disabled = !autoCloseSwitch.checked;
        }
      });
      GM_setValue2("toastSettings", state2.toastSettings);
      if (showToast) {
        createSettingsToast2("Toast设置已自动保存！", "success", 2200);
      }
    }
    function registerMenuCommand2() {
      GM_registerMenuCommand2("打开设置", () => {
        openSettingsModal();
      });
    }
    return {
      initializeSettingsModal: initializeSettingsModal2,
      enhanceSummaryWidthSettings: enhanceSummaryWidthSettings2,
      addToastSettingsToModal: addToastSettingsToModal2,
      saveToastSettings,
      applySidebarSettings: applySidebarSettings2,
      applySummaryWidthSettings: applySummaryWidthSettings2,
      syncUIWithStoredSettings: syncUIWithStoredSettings2,
      toggleSummaryPanel: toggleSummaryPanel2,
      updateAdjustmentPrompts: () => updateAdjustmentPrompts2(),
      updateSummaryWidthOffset: () => updateSummaryWidthOffset(),
      updateSidebarPreview: () => updateSidebarPreview(),
      openSettingsModal,
      registerMenuCommand: registerMenuCommand2,
      lockBodyScroll,
      unlockBodyScroll
    };
  }

  // src/features/settingsUI/index.js
  function createSettingsModal(summaryWidthOffset2) {
    const existingModal = document.getElementById("settings-modal");
    if (existingModal) {
      return existingModal;
    }
    const settingsModal = document.createElement("div");
    settingsModal.id = "settings-modal";
    settingsModal.innerHTML = `<div class="modal-content">
            <div class="modal-header">
                <button type="button" id="toggle-tabs-button" class="modal-header-button" title="折叠按钮栏" aria-label="折叠左侧按钮栏" aria-pressed="false">
                    <svg class="modal-header-button-icon" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M 7.7148 49.5742 L 48.2852 49.5742 C 53.1836 49.5742 55.6446 47.1367 55.6446 42.3086 L 55.6446 13.6914 C 55.6446 8.8633 53.1836 6.4258 48.2852 6.4258 L 7.7148 6.4258 C 2.8398 6.4258 .3554 8.8398 .3554 13.6914 L .3554 42.3086 C .3554 47.1602 2.8398 49.5742 7.7148 49.5742 Z M 7.7851 45.8008 C 5.4413 45.8008 4.1288 44.5586 4.1288 42.1211 L 4.1288 13.8789 C 4.1288 11.4414 5.4413 10.1992 7.7851 10.1992 L 18.2148 10.1992 L 18.2148 45.8008 Z M 48.2147 10.1992 C 50.5350 10.1992 51.8708 11.4414 51.8708 13.8789 L 51.8708 42.1211 C 51.8708 44.5586 50.5350 45.8008 48.2147 45.8008 L 21.8944 45.8008 L 21.8944 10.1992 Z M 13.7148 18.8945 C 14.4179 18.8945 15.0507 18.2617 15.0507 17.5820 C 15.0507 16.8789 14.4179 16.2696 13.7148 16.2696 L 8.6757 16.2696 C 7.9726 16.2696 7.3632 16.8789 7.3632 17.5820 C 7.3632 18.2617 7.9726 18.8945 8.6757 18.8945 Z M 13.7148 24.9649 C 14.4179 24.9649 15.0507 24.3320 15.0507 23.6289 C 15.0507 22.9258 14.4179 22.3398 13.7148 22.3398 L 8.6757 22.3398 C 7.9726 22.3398 7.3632 22.9258 7.3632 23.6289 C 7.3632 24.3320 7.9726 24.9649 8.6757 24.9649 Z M 13.7148 31.0118 C 14.4179 31.0118 15.0507 30.4258 15.0507 29.7227 C 15.0507 29.0196 14.4179 28.4102 13.7148 28.4102 L 8.6757 28.4102 C 7.9726 28.4102 7.3632 29.0196 7.3632 29.7227 C 7.3632 30.4258 7.9726 31.0118 8.6757 31.0118 Z" fill="currentColor"></path>
                    </svg>
                </button>
                <h2>🛠️ [LINUX DO] 话题&回复 内容总结 设置</h2>
                <button id="close-settings"  title="关闭设置窗口" >✕</button>
            </div>
            <div class="modal-body">
                <div class="mobile-tab-select-wrapper" data-mobile-tabs>
                    <label for="mobile-tab-select" class="mobile-tab-select-label">设置分组</label>
                    <select id="mobile-tab-select" class="mobile-tab-select" aria-label="选择设置分组"></select>
                </div>
                <div class="modal-tabs">
                    <button class="tab-button" data-tab="list-summary-settings">
                        <span class="tab-icon" aria-hidden="true">📋</span>
                        <span class="tab-label">话题列表</span>
                    </button>
                    <button class="tab-button" data-tab="dearrow-settings">
                        <span class="tab-icon" aria-hidden="true">🛡️</span>
                        <span class="tab-label">DeArrow</span>
                    </button>
                    <button class="tab-button active" data-tab="sidebar-settings">
                        <span class="tab-icon" aria-hidden="true">📌</span>
                        <span class="tab-label">话题侧栏</span>
                    </button>
                    <button class="tab-button" data-tab="prompt-settings">
                        <span class="tab-icon" aria-hidden="true">🧩</span>
                        <span class="tab-label">提示词</span>
                    </button>
                    <button class="tab-button" data-tab="api-settings">
                        <span class="tab-icon" aria-hidden="true">🤖</span>
                        <span class="tab-label">AI</span>
                    </button>
                    <button class="tab-button" data-tab="toast-settings">
                        <span class="tab-icon" aria-hidden="true">🔔</span>
                        <span class="tab-label">通知设置</span>
                    </button>
                    <!-- === Import/Export Tab === -->
                    <button class="tab-button" data-tab="import-export-settings">
                        <span class="tab-icon" aria-hidden="true">🔄</span>
                        <span class="tab-label">同步</span>
                    </button>
                    <button class="tab-button" data-tab="drive-settings">
                        <span class="tab-icon" aria-hidden="true">☁️</span>
                        <span class="tab-label">G Drive</span>
                    </button>
                </div>
                <div class="modal-panels">
            <div class="tab-content active" id="sidebar-settings">
                <div class="sidebar-sub-tabs">
                    <button class="sidebar-sub-tab-button active" data-sidebar-tab="sidebar-settings-position">位置 / 自动展开</button>
                    <button class="sidebar-sub-tab-button" data-sidebar-tab="sidebar-settings-dimensions">高度 / 宽度</button>
                </div>
                <div class="sidebar-sub-tab-panels">
                    <div class="sidebar-sub-tab-content settings-card active" id="sidebar-settings-position">
                        <div class="switch-container">
                            <span class="switch-label">1. 边栏位置（左/右）</span>
                            <label class="switch switch-left-right">
                                <input type="checkbox" id="sidebar-position-switch">
                                <span class="slider"></span>
                            </label>
                            <span class="tooltip">如果不生效，请刷新页面！</span>
                        </div>
                        <hr class="sidebar-settings-divider">
                        <div class="switch-container">
                            <span class="switch-label">2. 自动展开（关/开）</span>
                            <label class="switch switch-on-off">
                                <input type="checkbox" id="default-open-sidebar-switch">
                                <span class="slider"></span>
                            </label>
                            <span class="tooltip">自动展开侧边栏？</span>
                        </div>
                        <div class="switch-container">
                            <span class="switch-label">3. 自动总结（关/开）</span>
                            <label class="switch switch-on-off">
                                <input type="checkbox" id="sidebar-auto-summarize-switch">
                                <span class="slider"></span>
                            </label>
                            <span class="tooltip">自动总结新话题？</span>
                        </div>
                    </div>
                    <div class="sidebar-sub-tab-content settings-card" id="sidebar-settings-dimensions">
                        <div class="sidebar-dimension-group">
                            <label class="sidebar-dimension-section-label">1. 高度 调节 🔧：
                                <span id="height-adjustment-prompt" class="adjustment-prompt"></span>
                            </label>
                            <hr>
                            <label class="sidebar-dimension-control">
                                <span class="sidebar-dimension-label-text">⬆️ 距离顶部：</span>
                                <span id="sidebar-top-value" class="sidebar-dimension-value">5%</span>
                                <input type="range" id="sidebar-top-slider" min="0" max="50" value="5" class="sidebar-dimension-range">
                            </label>
                            <label class="sidebar-dimension-control">
                                <span class="sidebar-dimension-label-text">⬇️ 距离底部：</span>
                                <span id="sidebar-bottom-value" class="sidebar-dimension-value">5%</span>
                                <input type="range" id="sidebar-bottom-slider" min="0" max="50" value="5" class="sidebar-dimension-range">
                            </label>
                            <hr>
                            <label class="sidebar-dimension-section-label">2. 宽度 调节 🔧：
                                <span id="width-adjustment-prompt" class="adjustment-prompt"></span>
                            </label>
                            <hr>
                            <label class="sidebar-dimension-control">
                                <span class="sidebar-dimension-label-text">↔️ 宽 度：</span>
                                <span id="sidebar-width-value" class="sidebar-dimension-value">15%</span>
                                <span id="width-adjustment-message" class="adjustment-message"></span>
                                <input type="range" id="sidebar-width-slider" min="10" max="80" value="15" class="sidebar-dimension-range">
                            </label>
                            <label class="sidebar-dimension-control">
                                <span class="sidebar-dimension-label-text">⇆ 宽度偏差值（px）：</span>
                                <input type="number" id="summary-width-offset" min="-200" max="200" value="${summaryWidthOffset2}" class="sidebar-dimension-number" title="可设置为负值以让面板更窄，或正值以加宽面板">
                                <span id="offset-adjustment-message" class="adjustment-message"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-content" id="prompt-settings">
                <div class="prompt-sub-tabs">
                    <button class="prompt-sub-tab-button active" data-prompt-tab="prompt-settings-main">提示词</button>
                    <button class="prompt-sub-tab-button" data-prompt-tab="prompt-settings-questions">提问预设</button>
                    <button class="prompt-sub-tab-button" data-prompt-tab="prompt-settings-filters">输出过滤</button>
                </div>
                <div class="prompt-sub-tab-panels">
                    <div class="prompt-sub-tab-content active" id="prompt-settings-main">
                        <div class="settings-card prompt-custom-config">
                            <div class="prompt-config-top">
                                <label class="prompt-config-picker">
                                    🌟 提示词配置：
                                    <select id="prompt-select">
                                    </select>
                                </label>
                            </div>
                            <div id="prompt-config" class="prompt-config-grid">
                                <div class="prompt-config-title">✍️ 自定义配置</div>
                                <div class="prompt-config-fields">
                                    <label class="prompt-field prompt-name-field">🏷️ 备注名称：
                                        <input type="text" id="prompt-name" placeholder="Prompt Name">
                                    </label>
                                    <label class="prompt-field prompt-input-section">提示词1️⃣：(用于自定义总结方法)
                                        <textarea id="prompt-summary-method" rows="5" placeholder="提示词1️⃣" required></textarea>
                                    </label>
                                    <label class="prompt-field prompt-input-section">提示词2️⃣：(用于自定义输出格式)
                                        <textarea id="prompt-output-format" rows="5" placeholder="提示词2️⃣" required></textarea>
                                    </label>
                                </div>
                                <div class="prompt-actions">
                                    <div class="button-group">
                                        <button id="save-prompt" class="custom-button btn btn-icon-text btn-primary save-button"><span class="button-icon d-icon" aria-hidden="true">💾</span><span class="button-label d-button-label">保存</span></button>
                                        <button id="delete-prompt" class="custom-button btn btn-icon-text btn-danger delete-button"><span class="button-icon d-icon" aria-hidden="true">🗑️</span><span class="button-label d-button-label">删除</span></button>
                                        <button id="add-prompt" class="custom-button btn btn-icon-text btn-success add-button"><span class="button-icon d-icon" aria-hidden="true">✍️</span><span class="button-label d-button-label">添加</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="prompt-sub-tab-content" id="prompt-settings-questions">
                        <div class="settings-card question-preset-config">
                            <div class="question-preset-builtins">
                                <span class="switch-label">内置预设：</span>
                                <div class="question-preset-builtins-list">是否解决 / 最佳方案</div>
                            </div>
                            <hr>
                            <label>自定义预设：
                                <select id="question-preset-select"></select>
                            </label>
                            <label>🏷️ 预设名称：
                                <input type="text" id="question-preset-name" placeholder="预设名称">
                            </label>
                            <label>💬 预设问题：
                                <textarea id="question-preset-prompt" rows="5" placeholder="输入预设问题或提问指令"></textarea>
                            </label>
                            <div class="settings-card-actions">
                                <div class="button-group">
                                    <button id="save-question-preset" class="custom-button btn btn-icon-text btn-primary save-button"><span class="button-icon d-icon" aria-hidden="true">💾</span><span class="button-label d-button-label">保存</span></button>
                                    <button id="delete-question-preset" class="custom-button btn btn-icon-text btn-danger delete-button"><span class="button-icon d-icon" aria-hidden="true">🗑️</span><span class="button-label d-button-label">删除</span></button>
                                    <button id="add-question-preset" class="custom-button btn btn-icon-text btn-success add-button"><span class="button-icon d-icon" aria-hidden="true">✍️</span><span class="button-label d-button-label">添加</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="prompt-sub-tab-content" id="prompt-settings-filters">
                        <div class="settings-card summary-filter-config">
                            <div class="switch-container">
                                <span class="switch-label">输出过滤（关/开）</span>
                                <label class="switch switch-on-off">
                                    <input type="checkbox" id="summary-filter-enabled">
                                    <span class="slider"></span>
                                </label>
                                <span class="tooltip">用于清理 AI 回答首尾的多余标记</span>
                            </div>
                            <hr>
                            <label>回答开头过滤（每行一条）：
                                <textarea id="summary-filter-prefixes" rows="3" placeholder="例如：&#96;&#96;&#96;html"></textarea>
                            </label>
                            <label>回答结尾过滤（每行一条）：
                                <textarea id="summary-filter-suffixes" rows="3" placeholder="例如：&#96;&#96;&#96;"></textarea>
                            </label>
                            <div class="settings-card-actions">
                                <div class="button-group">
                                    <button id="reset-summary-filters" class="custom-button btn btn-icon-text btn-default neutral-button"><span class="button-icon d-icon" aria-hidden="true">↩️</span><span class="button-label d-button-label">重置默认</span></button>
                                    <button id="save-summary-filters" class="custom-button btn btn-icon-text btn-primary save-button"><span class="button-icon d-icon" aria-hidden="true">💾</span><span class="button-label d-button-label">保存</span></button>
                                </div>
                            </div>
                            <p class="tooltip">仅匹配文本开头/结尾，不会改动正文内容。</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-content" id="api-settings">
                <div class="api-sub-tabs">
                    <button class="api-sub-tab-button active" data-api-tab="api-settings-main">API配置</button>
                    <button class="api-sub-tab-button" data-api-tab="api-settings-auto">自动总结/重试</button>
                </div>
                <div class="api-sub-tab-panels">
                    <div class="api-sub-tab-content settings-card active" id="api-settings-main">
                        <div class="api-settings-current-card">
                            <label>🌟 当前配置：
                                <select id="api-select">
                                </select>
                            </label>
                        </div>
                        <div class="api-settings-custom-card">
                            <label class="api-settings-custom-title">✍️ 自定义配置</label>
                            <div id="api-config">
                                <label>🏷️ 备注名称：
                                    <input type="text" id="api-name" placeholder="API Remark Name">
                                </label>
                                <label>🔗 完整路径 (URL)：
                                    <input type="text" id="api-url" placeholder="API full path (URL)">
                                </label>
                                <label class="api-key-label ld-secret-field">🔑 密钥：
                                    <div class="ld-secret-wrap">
                                        <textarea id="api-key" class="api-key-input ld-secret-input" rows="1" placeholder="API Key" autocomplete="off" spellcheck="false"></textarea>
                                        <button type="button" id="toggle-api-key" class="ld-secret-toggle" data-show-label="显示密钥" data-hide-label="隐藏密钥" aria-pressed="false"></button>
                                    </div>
                                </label>
                                <label>🤖 模型名：
                                    <input type="text" id="api-model" placeholder="API model name">
                                </label>
                                <div class="api-image-settings">
                                    <div class="switch-container">
                                        <span class="switch-label">🖼️ 图片输入（关/开）</span>
                                        <label class="switch switch-on-off">
                                            <input type="checkbox" id="api-image-input-enabled">
                                            <span class="slider"></span>
                                        </label>
                                        <span class="tooltip">启用后，该 API 配置会把话题图片随请求发送给支持视觉输入的模型。</span>
                                    </div>
                                    <div id="api-image-options" class="api-image-options">
                                        <label>图片清晰度：
                                            <select id="api-image-detail">
                                                <option value="auto">auto</option>
                                                <option value="low">low</option>
                                                <option value="high">high</option>
                                            </select>
                                        </label>
                                        <label>每次最多图片数：
                                            <input type="number" id="api-max-images" min="1" max="20" step="1">
                                        </label>
                                        <label>单图上限（MB）：
                                            <input type="number" id="api-max-image-mb" min="0.25" max="20" step="0.25">
                                        </label>
                                        <label>总图片上限（MB）：
                                            <input type="number" id="api-max-total-image-mb" min="0.25" max="60" step="0.25">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="api-settings-action-bar">
                                <div class="button-group">
                                    <button id="save-api" class="custom-button btn btn-icon-text btn-primary save-button"><span class="button-icon d-icon" aria-hidden="true">💾</span><span class="button-label d-button-label">保存</span></button>
                                    <button id="delete-api" class="custom-button btn btn-icon-text btn-danger delete-button"><span class="button-icon d-icon" aria-hidden="true">🗑️</span><span class="button-label d-button-label">删除</span></button>
                                    <button id="add-api" class="custom-button btn btn-icon-text btn-success add-button"><span class="button-icon d-icon" aria-hidden="true">✍️</span><span class="button-label d-button-label">添加</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="api-sub-tab-content settings-card" id="api-settings-auto">
                        <div class="api-auto-settings-card">
                            <div class="switch-container">
                                <span class="switch-label">1. 新话题自动总结（关/开）</span>
                                <label class="switch switch-on-off">
                                    <input type="checkbox" id="new-topic-auto-summarize">
                                    <span class="slider"></span>
                                </label>
                                <span class="tooltip">启用或禁用自动总结新话题功能。</span>
                            </div>
                            <hr>
                            <div class="api-auto-section">
                                <span class="api-auto-section-title">2. 自动重试设置：</span>
                                <div class="auto-retry-settings">
                                    <label class="auto-retry-label">
                                        <span class="auto-retry-text">🔄 重试次数：(1-10)</span>
                                        <input type="number" id="auto-retry-count" class="auto-retry-input" min="1" max="10" required>
                                    </label>
                                    <label class="auto-retry-label">
                                        <span class="auto-retry-text">⏲️ 重试间隔时间（秒）：(1-600)</span>
                                        <input type="number" id="auto-retry-interval" class="auto-retry-input" min="1" max="600" required>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 新增列表页总结设置 -->
            <div class="tab-content" id="list-summary-settings">
                <div class="list-summary-sub-tabs">
                    <button class="list-summary-sub-tab-button active" data-list-summary-tab="list-summary-position">位置 / 自动展开</button>
                    <button class="list-summary-sub-tab-button" data-list-summary-tab="list-summary-dimensions">高度 / 宽度</button>
                </div>
                <div class="list-summary-sub-tab-panels">
                    <div class="list-summary-sub-tab-content settings-card active" id="list-summary-position">
                        <div class="switch-container">
                            <span class="switch-label">1. 列表页总结功能（关/开）</span>
                            <label class="switch switch-on-off">
                                <input type="checkbox" id="list-summary-enabled-switch">
                                <span class="slider"></span>
                            </label>
                            <span class="tooltip">是否在话题列表页显示总结按钮？</span>
                        </div>
                        <hr>
                        <div class="switch-container">
                            <span class="switch-label">2. 只展开一个总结区域（关/开）</span>
                            <label class="switch switch-on-off">
                                <input type="checkbox" id="auto-show-summary-switch">
                                <span class="slider"></span>
                            </label>
                            <span class="tooltip">开启后，展开一个总结会收起其他已展开的总结；关闭后可同时展开多个。</span>
                        </div>
                    </div>
                    <div class="list-summary-sub-tab-content settings-card" id="list-summary-dimensions">
                        <label class="list-summary-lines-label">
                            <span class="list-summary-lines-text">1. 总结显示行数：</span>
                            <input type="number" id="list-summary-max-lines" class="list-summary-lines-input" min="1" max="20">
                            <span class="tooltip">设置列表页总结内容的最大显示行数，超出将显示滚动条</span>
                        </label>
                        <hr>
                        <label class="list-summary-section-label">2. 总结区域宽度设置：</label>
                        <div class="width-settings">
                            <!-- 宽度设置内容将通过JavaScript动态生成 -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-content" id="dearrow-settings">
                <div class="dearrow-sub-tabs">
                    <button class="dearrow-sub-tab-button active" data-dearrow-tab="dearrow-settings-switches">自动</button>
                    <button class="dearrow-sub-tab-button" data-dearrow-tab="dearrow-settings-prompts">提示词</button>
                    <button class="dearrow-sub-tab-button" data-dearrow-tab="dearrow-settings-models">模型 / 范围</button>
                </div>
                <div class="dearrow-sub-tab-panels">
                    <div class="dearrow-sub-tab-content settings-card dearrow-settings-card active" id="dearrow-settings-switches">
                    <div class="switch-container">
                        <span class="switch-label">1. 标题党自动替换（关/开）</span>
                        <label class="switch switch-on-off">
                            <input type="checkbox" id="dearrow-enabled-switch">
                            <span class="slider"></span>
                        </label>
                        <span class="tooltip">开启后，在命中的话题列表中自动判断标题党，并显示 DeArrow 按钮。</span>
                    </div>
                    <hr>
                    <div class="switch-container">
                        <span class="switch-label">2. 标题党自动重写（关/开）</span>
                        <label class="switch switch-on-off">
                            <input type="checkbox" id="dearrow-auto-rewrite-switch">
                            <span class="slider"></span>
                        </label>
                        <span class="tooltip">判定为标题党后自动读取首帖并重写标题；关闭时仍可点击 DeArrow 按钮手动重写。</span>
                    </div>
                    <p class="tooltip dearrow-drive-note">判断和改写结果会保存在本地；启用 Google Drive 同步后也会自动跨设备同步。以上选项会立即保存。</p>
                    </div>
                    <div class="dearrow-sub-tab-content settings-card dearrow-settings-card" id="dearrow-settings-prompts">
                    <label class="dearrow-setting-field dearrow-prompt-field">
                        <span class="dearrow-setting-label">1. 标题党判断提示词：</span>
                        <textarea id="dearrow-judgment-prompt" rows="8" spellcheck="false" placeholder="留空使用默认提示词"></textarea>
                        <span class="tooltip">用于判断原标题是否为标题党。留空恢复默认提示词；请保留严格 JSON 返回格式。</span>
                    </label>
                    <hr>
                    <label class="dearrow-setting-field dearrow-prompt-field">
                        <span class="dearrow-setting-label">2. 标题重写提示词：</span>
                        <textarea id="dearrow-rewrite-prompt" rows="8" spellcheck="false" placeholder="留空使用默认提示词"></textarea>
                        <span class="tooltip">用于根据首帖重写标题。留空恢复默认提示词；请保留严格 JSON 返回格式。</span>
                    </label>
                    <div class="settings-card-actions dearrow-settings-actions">
                        <button type="button" class="custom-button btn btn-icon-text btn-primary save-button save-dearrow-settings"><span class="button-icon d-icon" aria-hidden="true">💾</span><span class="button-label d-button-label">保存并应用</span></button>
                    </div>
                    </div>
                    <div class="dearrow-sub-tab-content settings-card dearrow-settings-card" id="dearrow-settings-models">
                    <label class="dearrow-setting-field">
                        <span class="dearrow-setting-label">1. 标题判断模型（API 配置）：</span>
                        <select id="dearrow-judgment-api-select"></select>
                        <span class="tooltip">用于批量判断原标题是否为标题党，建议选择速度快、成本低的小模型。</span>
                    </label>
                    <hr>
                    <label class="dearrow-setting-field">
                        <span class="dearrow-setting-label">2. 标题重写模型（API 配置）：</span>
                        <select id="dearrow-rewrite-api-select"></select>
                        <span class="tooltip">用于读取首帖正文后生成新标题，可独立选择更适合写作的模型。</span>
                    </label>
                    <hr>
                    <label class="dearrow-setting-field dearrow-scope-field">
                        <span class="dearrow-setting-label">3. 作用范围（每行一个完整 URL）：</span>
                        <textarea id="dearrow-scope-rules" rows="5" spellcheck="false" placeholder="https://linux.do/latest?order=created"></textarea>
                        <span class="tooltip">默认精确匹配；可使用 * 匹配任意字符。仅接受 https://linux.do URL，URL 的 #hash 会被忽略。</span>
                    </label>
                    <div id="dearrow-scope-error" class="dearrow-scope-error" role="status" aria-live="polite"></div>
                    <div class="settings-card-actions dearrow-settings-actions">
                        <button type="button" class="custom-button btn btn-icon-text btn-primary save-button save-dearrow-settings"><span class="button-icon d-icon" aria-hidden="true">💾</span><span class="button-label d-button-label">保存并应用</span></button>
                    </div>
                    </div>
                </div>
            </div>
            <!-- 新增Toast设置页面 -->
            <div class="tab-content" id="toast-settings">
                <!-- Toast设置内容将通过JavaScript动态生成 -->
            </div>
            <!-- === Import/Export Settings Tab Content === -->
            <div class="tab-content" id="import-export-settings">
                <span class="switch-label">1. 脚本配置：</span>
                <p>(文件格式：脚本配置 - [LINUX DO] 🌟 主题 & 回复 总结_yyyy-mm-dd.json)</p>
                <input type="file" id="import-settings-file" accept=".json" style="display: none;">
              <div class="button-group">
                <button id="import-settings-button" class="custom-button btn btn-icon-text btn-primary add-button"><span class="button-icon d-icon" aria-hidden="true">📤</span><span class="button-label d-button-label">导入</span></button>
                <button id="export-settings-button" class="custom-button btn btn-icon-text btn-success save-button"><span class="button-icon d-icon" aria-hidden="true">📥</span><span class="button-label d-button-label">导出</span></button>
                </div>
            </div>
            <div class="tab-content" id="drive-settings"></div>
                </div>
            </div>
        </div>`;
    document.body.appendChild(settingsModal);
  }

  // src/features/styles/index.js
  var SUMMARY_BASE_STYLE_ID = "linux-do-summary-base-style";
  function addStyles() {
    let style = document.getElementById(SUMMARY_BASE_STYLE_ID);
    if (style) {
      return style;
    }
    style = document.createElement("style");
    style.id = SUMMARY_BASE_STYLE_ID;
    style.textContent = `:root {
            --bg-color: #ffffff;
            --text-color: #333333;
            --border-color: #cccccc;
            --highlight-color: #4a90e2;
            --shadow-color: rgba(0, 0, 0, 0.1);
            --input-bg: #f5f5f5;
            --ld-accent: var(--tertiary, var(--d-input-focused-color, var(--highlight-color)));
            --ld-input-bg: var(--d-input-bg-color, var(--secondary, var(--input-bg)));
            --ld-input-fg: var(--d-input-text-color, var(--primary, var(--text-color)));
            --ld-input-border: var(--input-border-color, var(--primary-400, var(--border-color)));
            --ld-input-radius: 4px;
            --ld-input-focus: var(--ld-accent, var(--d-input-focused-color, var(--highlight-color)));
            --ld-input-placeholder: var(--primary-medium, var(--message-color-active));
            --ld-font: var(--font-0, 1em);
            --ld-font-sm: var(--font-down-1, 0.8706em);
            --ld-btn-radius: 4px;
            --ld-btn-height: 40px;
            --button-text: #ffffff;
            --result-bg: #f9f9f9;
            --modal-bg: #ffffff;
            --modal-text: #333333;
            --tab-active-bg: #e0e0e0;
            --tab-hover-bg: #f0f0f0;
            --primary-button-bg: #4a90e2;
            --secondary-button-bg: #f0f0f0;
            --secondary-button-text: #333333;
            --floor-switch-color: #64b5f6;
            --delete-button-bg: #e74c3c;
            --delete-button-hover-bg: #c0392b;
            --add-button-bg: #2ecc71;
            --add-button-hover-bg: #27ae60;
            --prompt-highlight-bg: #ffeb3b;
            --prompt-lowlight-opacity: 0.5;
            --message-color-active: #555555;
            --message-color-inactive: #888888;
            --active-button-bg: #4a90e2; /* 新增用于激活状态的按钮背景色 */
            /* Scrollbar Variables */
            --scrollbar-thumb-light: rgba(0, 0, 0, 0.15);
            --scrollbar-thumb-hover-light: rgba(0, 0, 0, 0.3);
            --scrollbar-thumb-dark: rgba(255, 255, 255, 0.15);
            --scrollbar-thumb-hover-dark: rgba(255, 255, 255, 0.3);
            --scrollbar-width: 4px;
            /* 已总结话题按钮样式 - 修改为绿色 */
            --summarized-button-bg: #2ecc71;
            --summarized-button-hover-bg: #27ae60;
            --summarized-button-text: #ffffff;
            /* Toast通知颜色 */
            --toast-bg-info: rgba(74, 144, 226, 0.9);
            --toast-bg-success: rgba(46, 204, 113, 0.9);
            --toast-bg-warning: rgba(241, 196, 15, 0.9);
            --toast-bg-error: rgba(231, 76, 60, 0.9);
            --toast-text: #ffffff;
            /* 普通生成中状态，对齐 info toast */
            --summarizing-button-bg: var(--toast-bg-info);
            --summarizing-button-text: var(--toast-text);
            /* 自动重试状态，单独对齐 warning toast，避免污染普通生成/拉取 */
            --summary-retry-bg: var(--toast-bg-warning);
            --summary-retry-text: var(--toast-text);
            --summary-retry-inline-color: #f1c40f;
            /* 总结区域宽度变量 */
            --summary-width-type: percent;
            --summary-width-value: 100%;
            /* 设置面板 Tab 背景 */
            --tab-bg-default: rgba(74, 144, 226, 0.05);
            --tab-bg-sidebar: rgba(74, 144, 226, 0.12);
            --tab-bg-floor: rgba(255, 193, 7, 0.12);
            --tab-bg-prompt: rgba(156, 39, 176, 0.12);
            --tab-bg-api: rgba(0, 188, 212, 0.12);
            --tab-bg-list: rgba(255, 152, 0, 0.12);
            --tab-bg-toast: rgba(76, 175, 80, 0.12);
            --tab-bg-import: rgba(121, 85, 72, 0.22);
            --tab-bg-drive: rgba(0, 150, 136, 0.14);
            --settings-card-rgb: 74, 144, 226;
            /* Discourse-like button palette */
            --btn-primary-bg: #4a90e2;
            --btn-primary-hover: #3f7fc8;
            --btn-primary-active: #3571b1;
            --btn-primary-focus: rgba(74, 144, 226, 0.35);
            --btn-success-bg: #2ecc71;
            --btn-success-hover: #27b864;
            --btn-success-active: #22a75a;
            --btn-success-focus: rgba(46, 204, 113, 0.35);
            --btn-danger-bg: #d04437;
            --btn-danger-hover: #b93a2f;
            --btn-danger-active: #a5332a;
            --btn-default-bg: #f5f6f7;
            --btn-default-hover: #e6e8ea;
            --btn-default-active: #dfe2e6;
            --btn-default-text: #1f2933;
            --btn-default-border: #d0d5db;
        }
        @media (prefers-color-scheme: dark) {
            :root {
                --bg-color: #2c2c2c;
                --text-color: #e0e0e0;
                --border-color: #555555;
                --highlight-color: #64b5f6;
                --shadow-color: rgba(0, 0, 0, 0.45);
                --input-bg: #3a3a3a;
                --button-text: #ffffff;
                --result-bg: #1e1e1e;
                --modal-bg: #333333;
                --modal-text: #e0e0e0;
                --tab-active-bg: rgba(100, 181, 246, 0.32);
                --tab-hover-bg: rgba(100, 181, 246, 0.12);
                --primary-button-bg: #64b5f6;
                --secondary-button-bg: #4a4a4a;
                --secondary-button-text: #e0e0e0;
                --floor-switch-color: #4a90e2;
                --delete-button-bg: #c0392b;
                --delete-button-hover-bg: #a93226;
                --add-button-bg: #27ae60;
                --add-button-hover-bg: #229954;
                --prompt-highlight-bg: #ffc107;
                --message-color-active: #aaaaaa;
                --message-color-inactive: #cccccc;
                --active-button-bg: #64b5f6; /* 新增用于激活状态的按钮背景色 */
                /* Scrollbar Variables for Dark Mode */
                --scrollbar-thumb-light: rgba(255, 255, 255, 0.15);
                --scrollbar-thumb-hover-light: rgba(255, 255, 255, 0.3);
                /* 已总结话题按钮样式 - 暗色模式下的绿色 */
                --summarized-button-bg: #27ae60;
                --summarized-button-hover-bg: #229954;
                /* Toast通知颜色 - 暗色模式 */
                --toast-bg-info: rgba(74, 144, 226, 0.85);
                --toast-bg-success: rgba(46, 204, 113, 0.85);
                --toast-bg-warning: rgba(241, 196, 15, 0.85);
                --toast-bg-error: rgba(231, 76, 60, 0.85);
                --summarizing-button-bg: var(--toast-bg-info);
                --summarizing-button-text: var(--toast-text);
                --summary-retry-bg: var(--toast-bg-warning);
                --summary-retry-inline-color: #f1c40f;
                /* 设置面板 Tab 背景（暗色） */
                --tab-bg-default: rgba(100, 181, 246, 0.08);
                --tab-bg-sidebar: rgba(100, 181, 246, 0.18);
                --tab-bg-floor: rgba(255, 213, 79, 0.18);
                --tab-bg-prompt: rgba(206, 147, 216, 0.2);
                --tab-bg-api: rgba(128, 222, 234, 0.2);
                --tab-bg-list: rgba(255, 183, 77, 0.18);
                --tab-bg-toast: rgba(129, 199, 132, 0.2);
                --tab-bg-import: rgba(161, 136, 127, 0.32);
                --tab-bg-drive: rgba(38, 166, 154, 0.22);
                --settings-card-rgb: 74, 144, 226;
                /* Discourse-like button palette (dark) */
                --btn-primary-bg: #64b5f6;
                --btn-primary-hover: #5aa7e4;
                --btn-primary-active: #5197cf;
                --btn-primary-focus: rgba(100, 181, 246, 0.45);
                --btn-success-bg: #27ae60;
                --btn-success-hover: #229954;
                --btn-success-active: #1f874c;
                --btn-success-focus: rgba(39, 174, 96, 0.45);
                --btn-danger-bg: #d95a4f;
                --btn-danger-hover: #c24f45;
                --btn-danger-active: #ad453c;
                --btn-default-bg: #3a3f45;
                --btn-default-hover: #434a52;
                --btn-default-active: #353b42;
                --btn-default-text: #e9edf2;
                --btn-default-border: #4b525a;
            }
        }
        body.dark,
        body[data-theme="dark"],
        html.dark {
            --bg-color: #2c2c2c;
            --text-color: #e0e0e0;
            --border-color: #555555;
            --highlight-color: #64b5f6;
            --shadow-color: rgba(0, 0, 0, 0.45);
            --input-bg: #3a3a3a;
            --button-text: #ffffff;
            --result-bg: #1e1e1e;
            --modal-bg: #333333;
            --modal-text: #e0e0e0;
            --tab-active-bg: rgba(100, 181, 246, 0.32);
            --tab-hover-bg: rgba(100, 181, 246, 0.12);
            --primary-button-bg: #64b5f6;
            --secondary-button-bg: #4a4a4a;
            --secondary-button-text: #e0e0e0;
            --floor-switch-color: #4a90e2;
            --delete-button-bg: #c0392b;
            --delete-button-hover-bg: #a93226;
            --add-button-bg: #27ae60;
            --add-button-hover-bg: #229954;
            --prompt-highlight-bg: #ffc107;
            --message-color-active: #aaaaaa;
            --message-color-inactive: #cccccc;
            --active-button-bg: #64b5f6;
            --scrollbar-thumb-light: rgba(255, 255, 255, 0.15);
            --scrollbar-thumb-hover-light: rgba(255, 255, 255, 0.3);
            --summarized-button-bg: #27ae60;
            --summarized-button-hover-bg: #229954;
            --toast-bg-info: rgba(74, 144, 226, 0.85);
            --toast-bg-success: rgba(46, 204, 113, 0.85);
            --toast-bg-warning: rgba(241, 196, 15, 0.85);
            --toast-bg-error: rgba(231, 76, 60, 0.85);
            --summarizing-button-bg: var(--toast-bg-info);
            --summarizing-button-text: var(--toast-text);
            --summary-retry-bg: var(--toast-bg-warning);
            --summary-retry-inline-color: #f1c40f;
            --tab-bg-default: rgba(100, 181, 246, 0.08);
            --tab-bg-sidebar: rgba(100, 181, 246, 0.18);
            --tab-bg-floor: rgba(255, 213, 79, 0.18);
            --tab-bg-prompt: rgba(206, 147, 216, 0.2);
            --tab-bg-api: rgba(128, 222, 234, 0.2);
            --tab-bg-list: rgba(255, 183, 77, 0.18);
            --tab-bg-toast: rgba(129, 199, 132, 0.2);
            --tab-bg-import: rgba(161, 136, 127, 0.32);
            --tab-bg-drive: rgba(38, 166, 154, 0.22);
            --settings-card-rgb: 74, 144, 226;
                /* Discourse-like button palette (dark) */
                --btn-primary-bg: #64b5f6;
                --btn-primary-hover: #5aa7e4;
                --btn-primary-active: #5197cf;
                --btn-primary-focus: rgba(100, 181, 246, 0.45);
                --btn-success-bg: #27ae60;
                --btn-success-hover: #229954;
                --btn-success-active: #1f874c;
                --btn-success-focus: rgba(39, 174, 96, 0.45);
                --btn-danger-bg: #d95a4f;
                --btn-danger-hover: #c24f45;
                --btn-danger-active: #ad453c;
                --btn-default-bg: #3a3f45;
                --btn-default-hover: #434a52;
                --btn-default-active: #353b42;
                --btn-default-text: #e9edf2;
                --btn-default-border: #4b525a;
        }
        #summary-sidebar {
            position: fixed;
            top: 0;
            width: 300px;
            height: 100vh;
            background-color: var(--bg-color);
            color: var(--text-color);
            border-left: 1px solid var(--border-color);
            transition: right 0.3s ease, left 0.3s ease, width 0.3s ease, top 0.3s ease, height 0.3s ease;
            box-shadow: -2px 0 10px var(--shadow-color);
            z-index: 1000;
            display: flex;
            flex-direction: column;
        }
        #summary-scroll-container {
            flex: 1;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            /* Scrollbar Styles */
            scrollbar-width: thin;
            scrollbar-color: var(--scrollbar-thumb-dark) transparent;
        }
        #summary-result, #summary-history {
            overflow-y: auto;
            /* Scrollbar Styles */
            scrollbar-width: thin;
            scrollbar-color: var(--scrollbar-thumb-dark) transparent;
        }
        /* Webkit Scrollbar Styles for Summary Panels */
        #summary-scroll-container::-webkit-scrollbar,
        #summary-result::-webkit-scrollbar,
        #summary-history::-webkit-scrollbar {
            width: var(--scrollbar-width);
            height: var(--scrollbar-width);
        }

        #summary-scroll-container::-webkit-scrollbar-thumb,
        #summary-result::-webkit-scrollbar-thumb,
        #summary-history::-webkit-scrollbar-thumb {
            background: var(--scrollbar-thumb-light);
            border-radius: 4px;
            cursor: pointer;
        }

        #summary-scroll-container::-webkit-scrollbar-thumb:hover,
        #summary-result::-webkit-scrollbar-thumb:hover,
        #summary-history::-webkit-scrollbar-thumb:hover {
            background: var(--scrollbar-thumb-hover-light);
        }

        /* For Dark Mode */
        @media (prefers-color-scheme: dark) {
            #summary-scroll-container::-webkit-scrollbar-thumb,
            #summary-result::-webkit-scrollbar-thumb,
            #summary-history::-webkit-scrollbar-thumb {
                background: var(--scrollbar-thumb-dark);
            }

            #summary-scroll-container::-webkit-scrollbar-thumb:hover,
            #summary-result::-webkit-scrollbar-thumb:hover,
            #summary-history::-webkit-scrollbar-thumb:hover {
                background: var(--scrollbar-thumb-hover-dark);
            }
        }

        #summary-sidebar.left {
            left: -300px;
        }
        #summary-sidebar.right {
            right: -300px;
        }
        #summary-sidebar.open.left {
            left: 0;
        }
        #summary-sidebar.open.right {
            right: 0;
        }
        #toggle-bar {
            position: absolute;
            top: 50%;
            width: 20px;
            height: 60px;
            background-color: var(--highlight-color);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px var(--shadow-color);
            border-radius: 10px;
            transform: translateY(-50%);
        }
        #summary-sidebar.left #toggle-bar {
            right: -20px;
            border-radius: 0 5px 5px 0;
        }
        #summary-sidebar.right #toggle-bar {
            left: -20px;
            border-radius: 5px 0 0 5px;
        }
        #toggle-bar::after {
            content: "◀";
            color: var(--button-text);
            font-size: 14px;
        }
        #summary-sidebar.open.left #toggle-bar::after {
            content: "▶";
        }
        #summary-sidebar.open.right #toggle-bar::after {
            content: "◀";
        }
        #summary-form {
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            position: sticky;
            top: 0;
            background-color: var(--bg-color);
            z-index: 1;
            box-shadow: 0 2px 5px var(--shadow-color);
        }
        .input-container {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        .button-container {
            display: flex;
            gap: 5px;
            flex-wrap: wrap;
        }
        .button-container.row-1,
        .button-container.row-2 {
            display: flex;
            gap: 5px;
        }
        #summary-form button {
            width: 100%;
            min-height: var(--ld-btn-height, 40px);
            padding: 8px 12px;
            border: 1px solid var(--ld-input-border, var(--border-color));
            border-radius: var(--ld-btn-radius, 4px);
            background-color: var(--ld-input-bg, var(--input-bg));
            color: var(--ld-input-fg, var(--text-color));
            font: inherit;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;
        }
        #summary-form button:hover:not(:disabled) {
            border-color: color-mix(in srgb, var(--ld-accent, var(--highlight-color)) 40%, var(--ld-input-border, var(--border-color)));
            background-color: color-mix(in srgb, var(--ld-accent, var(--highlight-color)) 10%, var(--ld-input-bg, var(--input-bg)));
        }
        #summary-form button:focus,
        #summary-form button:focus-visible {
            outline: none;
            border-color: var(--ld-accent, var(--highlight-color));
            box-shadow: 0 0 0 2px var(--ld-accent, var(--highlight-color));
        }
        #summary-form button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        #summary-form input,
        #settings-modal select,
        #settings-modal input,
        #settings-modal textarea {
            width: 100%;
            box-sizing: border-box;
            min-height: 40px;
            padding: 8px 12px;
            border: 1px solid var(--ld-input-border, var(--border-color));
            border-radius: var(--ld-input-radius, 4px);
            background-color: var(--ld-input-bg, var(--input-bg));
            color: var(--ld-input-fg, var(--text-color));
            font: inherit;
            font-size: var(--font-0, 1em);
            line-height: var(--line-height-large, 1.45);
            caret-color: currentcolor;
            color-scheme: inherit;
            transition: border-color 0.16s ease, box-shadow 0.16s ease, background-color 0.16s ease;
        }
        #summary-form input:hover:not(:disabled):not([readonly]),
        #settings-modal input:hover:not(:disabled):not([readonly]),
        #settings-modal select:hover:not(:disabled),
        #settings-modal textarea:hover:not(:disabled) {
            border-color: color-mix(in srgb, var(--ld-accent, var(--highlight-color)) 40%, var(--ld-input-border, var(--border-color)));
        }
        #summary-form input:focus,
        #settings-modal input:focus,
        #settings-modal select:focus,
        #settings-modal textarea:focus,
        #summary-form input:focus-visible,
        #settings-modal input:focus-visible,
        #settings-modal select:focus-visible,
        #settings-modal textarea:focus-visible {
            outline: none;
            border-color: var(--ld-accent, var(--d-input-focused-color, var(--highlight-color)));
            box-shadow: 0 0 0 2px var(--ld-accent, var(--d-input-focused-color, var(--highlight-color)));
        }
        #summary-form input:disabled,
        #settings-modal input:disabled,
        #settings-modal select:disabled,
        #settings-modal textarea:disabled,
        #summary-form input[readonly],
        #settings-modal input[readonly],
        #settings-modal textarea[readonly] {
            cursor: not-allowed;
            opacity: 1;
            color: var(--ld-muted, var(--message-color-active));
            background-color: color-mix(in srgb, var(--ld-input-bg, var(--input-bg)) 72%, var(--ld-line, var(--border-color)));
            border-color: var(--ld-line, var(--border-color));
        }
        #settings-modal input:user-invalid,
        #settings-modal textarea:user-invalid,
        #settings-modal select:user-invalid,
        #settings-modal input[aria-invalid="true"],
        #settings-modal textarea[aria-invalid="true"] {
            border-color: var(--danger, var(--toast-bg-error, #e74c3c));
        }
        #settings-modal input:user-invalid:focus,
        #settings-modal textarea:user-invalid:focus,
        #settings-modal input[aria-invalid="true"]:focus,
        #settings-modal textarea[aria-invalid="true"]:focus,
        #settings-modal input:user-invalid:focus-visible,
        #settings-modal textarea:user-invalid:focus-visible,
        #settings-modal input[aria-invalid="true"]:focus-visible,
        #settings-modal textarea[aria-invalid="true"]:focus-visible {
            outline: none;
            border-color: var(--danger, var(--toast-bg-error, #e74c3c));
            box-shadow: 0 0 0 2px var(--danger, var(--toast-bg-error, #e74c3c));
        }
        #summary-form input::placeholder,
        #settings-modal input::placeholder,
        #settings-modal textarea::placeholder {
            color: var(--ld-input-placeholder, var(--message-color-active));
            opacity: 1;
        }
        /* 开关容器样式 */
        .switch-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .switch-label {
          font-weight: bold;
          margin-right: 10px;
        }
        /* 开关样式 */
        .switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
          flex: 0 0 auto;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
          min-height: 0;
          padding: 0;
          border: 0;
          box-shadow: none;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--ld-line, #ccc);
          transition: background-color 0.16s ease, transform 0.16s ease;
          border-radius: 999px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: transform 0.16s ease;
          border-radius: 50%;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
        }
        input:checked + .slider {
          background-color: var(--ld-accent, var(--highlight-color));
        }
        input:checked + .slider:before {
          transform: translateX(20px);
        }
        .switch-left-right .slider:before {
          content: "左";
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          color: #334155;
        }
        .switch-left-right input:checked + .slider:before {
          content: "右";
        }
        .switch-on-off .slider:before {
          content: "关";
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          color: #334155;
        }
        .switch-on-off input:checked + .slider:before {
          content: "开";
        }
        /* 楼层默认值设置的开关按钮样式 */
        .floor-switch .slider {
          background-color: #ccc;
        }
        .floor-switch input:checked + .slider {
          background-color: var(--floor-switch-color);
        }
        .tooltip {
          visibility: hidden;
          width: 120px;
          background-color: #555;
          color: #fff;
          text-align: center;
          border-radius: 6px;
          padding: 5px 0;
          position: absolute;
          z-index: 1;
          bottom: 125%;
          left: 50%;
          margin-left: -60px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .switch-container:hover .tooltip {
          visibility: visible;
          opacity: 1;
        }
        .custom-button {
          min-height: var(--ld-btn-height, 40px);
          padding: 8px 16px;
          border: 1px solid transparent;
          border-radius: var(--ld-btn-radius, 4px);
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;
          flex: 1;
          max-width: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .custom-button:focus {
          outline: none;
          box-shadow: none;
        }
        .custom-button:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--ld-accent, var(--highlight-color));
        }
        .custom-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .save-button {
          background-color: var(--primary-button-bg);
          color: var(--button-text);
        }
        .save-button:hover {
          filter: brightness(1.1);
        }
        .delete-button {
          background-color: var(--delete-button-bg);
          color: var(--button-text);
        }
        .delete-button:hover {
          background-color: var(--delete-button-hover-bg);
        }
        .add-button {
          background-color: var(--add-button-bg);
          color: var(--button-text);
        }
        .add-button:hover {
          background-color: var(--add-button-hover-bg);
        }
        .neutral-button {
          background-color: var(--secondary-button-bg);
          color: var(--secondary-button-text);
        }
        .neutral-button:hover {
          filter: brightness(1.05);
        }
        .history-button {
          background-color: var(--secondary-button-bg);
          color: var(--secondary-button-text);
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .history-button.active {
          background-color: var(--active-button-bg);
          color: var(--button-text);
        }
        .history-button:hover {
          background-color: var(--highlight-color);
          color: var(--button-text);
        }
        #summary-result {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            border-top: 1px solid var(--border-color);
            background-color: var(--result-bg);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        #summary-result .markdown-content {
            width: 100%;
            max-width: 100%;
            overflow-wrap: break-word;
            word-wrap: break-word;
            hyphens: auto;
        }
        #summary-result,
        #summary-history,
        .summary-content-wrapper,
        .history-summary-wrapper,
        .topic-summary-container,
        .topic-summary-content,
        .topic-summary-history-content {
            -webkit-user-select: text !important;
            user-select: text !important;
        }
        .loading-indicator {
            text-align: center;
            margin: 0;
            color: var(--highlight-color);
            font-weight: bold;
        }
        .loading-indicator.retrying,
        .summary-retrying .loading-indicator {
            color: var(--summary-retry-inline-color);
        }
        .topic-summary-error {
            color: var(--toast-bg-error);
            background-color: rgba(231, 76, 60, 0.1);
            border: 1px solid var(--toast-bg-error);
            border-radius: 4px;
            padding: 10px;
            margin: 0;
            font-weight: 600;
        }
        .topic-summary-error-summary {
            display: flex;
            align-items: flex-start;
            gap: 10px;
        }
        .topic-summary-error-text {
            flex: 1 1 auto;
            min-width: 0;
            overflow-wrap: anywhere;
        }
        .topic-summary-error-actions,
        .topic-summary-error-detail-toolbar {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            flex: 0 0 auto;
        }
        .topic-summary-error-toggle,
        .topic-summary-error-copy {
            border: 1px solid var(--toast-bg-error);
            border-radius: 4px;
            background-color: rgba(231, 76, 60, 0.12);
            color: var(--toast-bg-error);
            cursor: pointer;
            font-size: 12px;
            font-weight: 700;
            line-height: 1.2;
            padding: 5px 9px;
            white-space: nowrap;
        }
        .topic-summary-error-toggle:hover,
        .topic-summary-error-copy:hover {
            background-color: rgba(231, 76, 60, 0.2);
        }
        .topic-summary-error-details {
            border-top: 1px solid rgba(231, 76, 60, 0.35);
            margin-top: 10px;
            padding-top: 10px;
        }
        .topic-summary-error-details[hidden] {
            display: none !important;
        }
        .topic-summary-error-detail-toolbar {
            margin-bottom: 8px;
        }
        .topic-summary-error-details-text {
            max-height: 260px;
            overflow: auto;
            white-space: pre-wrap;
            word-break: break-word;
            user-select: text;
            color: var(--text-color);
            background-color: rgba(0, 0, 0, 0.08);
            border-radius: 4px;
            padding: 10px;
            margin: 0;
            font-size: 12px;
            line-height: 1.45;
            font-weight: 500;
        }
        #summary-form input[name="building"],
        #summary-form #building {
            cursor: default;
            color: var(--ld-muted, var(--message-color-active));
            background-color: color-mix(in srgb, var(--ld-input-bg, var(--input-bg)) 78%, var(--ld-line, var(--border-color)));
            border-style: dashed;
        }
        @media (max-width: 768px) {
            #summary-sidebar {
                width: 100%;
            }
            #summary-sidebar.left {
                left: -100%;
            }
            #summary-sidebar.right {
                right: -100%;
            }
            .input-container {
                flex-direction: column;
            }
            .button-container {
                flex-direction: column;
            }
            .button-container.row-1,
            .button-container.row-2 {
                flex-direction: row;
            }
            .floor-settings-container {
                flex-direction: column;
            }
        }
        #summary-result a {
            color: var(--highlight-color);
        }
        #summary-result pre, #summary-result code {
            background-color: var(--input-bg);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 5px;
        }
        html.settings-modal-open,
        body.settings-modal-open {
            overflow: hidden;
        }
        #settings-modal {
            display: none;
            position: fixed;
            z-index: 1001;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.4);
            overflow-y: auto;
        }
        #settings-modal .modal-content {
            background-color: var(--modal-bg);
            color: var(--modal-text);
            margin: 5% auto;
            padding: 24px;
            border: 1px solid var(--border-color);
            border-radius: 5px;
            width: 68%;
            max-width: 760px;
        }
        #settings-modal .modal-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
        }
        #settings-modal .modal-header h2 {
            margin: 0;
            color: var(--highlight-color);
        }
        #settings-modal .modal-header-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 8px;
            border: none;
            background: none;
            color: var(--highlight-color);
            cursor: pointer;
            transition: color 0.2s ease, transform 0.2s ease;
        }
        #settings-modal .modal-header-button:hover {
            color: var(--highlight-color);
            transform: translateY(-1px);
        }
        #settings-modal .modal-header-button:focus-visible {
            outline: 2px solid var(--highlight-color);
            outline-offset: 2px;
        }
        #settings-modal .modal-header-button.active {
            color: var(--highlight-color);
        }
        #settings-modal .modal-header-button-icon {
            width: 20px;
            height: 20px;
        }
        #settings-modal #close-settings {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--text-color);
            margin-left: auto;
        }
        #settings-modal .modal-body {
            display: flex;
            gap: 24px;
            align-items: flex-start;
            margin-top: 24px;
            min-height: 70vh; /* 固定主体高度，避免折叠按钮栏时面板高度波动 */
        }
        #settings-modal .modal-tabs {
            display: flex;
            flex-direction: column;
            gap: 10px;
            flex: 0 0 120px;
            min-width: 100px;
            margin-bottom: 0;
        }
        #settings-modal .modal-panels {
            flex: 1;
            min-width: 0;
            min-height: 70vh; /* 与 max-height 保持一致，确保内容面板高度恒定 */
            max-height: 70vh;
            overflow-y: auto;
            overflow-x: hidden;
            padding-right: 4px;
        }
        #settings-modal .modal-content.tabs-collapsed .modal-body {
            flex-direction: row;
        }
        #settings-modal .modal-content.tabs-collapsed .modal-tabs {
            display: none;
        }
        #settings-modal .modal-content.tabs-collapsed .modal-panels {
            flex: 1 1 auto;
            height: 100%;
            width: 100%;
        }
        #settings-modal .tab-button {
            display: inline-flex;
            align-items: center;
            justify-content: flex-start;
            gap: 8px;
            width: 100%;
            padding: 12px 14px;
            background-color: var(--input-bg);
            border: 1px solid transparent;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
            color: var(--text-color);
            text-align: center;
            white-space: nowrap;
        }
        #settings-modal .tab-button:hover {
            background-color: var(--tab-hover-bg);
            transform: translateY(-1px);
        }
        #settings-modal .tab-button:focus {
            outline: none;
            box-shadow: none;
        }
        #settings-modal .tab-button:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px var(--ld-accent, var(--highlight-color));
        }
        #settings-modal .tab-button.active {
            background-color: var(--tab-active-bg);
            border-color: transparent;
        }
        #settings-modal .tab-button .tab-icon {
            font-size: 18px;
            line-height: 1;
        }
        #settings-modal .tab-button .tab-label {
            font-size: 14px;
            line-height: 1;
            font-weight: 600;
        }
        .mobile-tab-select-wrapper {
            display: none;
            width: 100%;
            flex-direction: column;
            gap: 6px;
            margin-bottom: 0;
        }
        .mobile-tab-select-label {
            font-size: var(--font-0, 1em);
            font-weight: 600;
            color: var(--modal-text);
        }
        .mobile-tab-select {
            width: 100%;
            min-height: 40px;
            padding: 8px 12px;
            border-radius: var(--ld-input-radius, 4px);
            border: 1px solid var(--ld-input-border, var(--border-color));
            background-color: var(--ld-input-bg, var(--input-bg));
            color: var(--ld-input-fg, var(--text-color));
            font: inherit;
            font-size: var(--font-0, 1em);
            transition: border-color 0.16s ease, box-shadow 0.16s ease;
        }
        .mobile-tab-select:focus,
        .mobile-tab-select:focus-visible {
            outline: none;
            border-color: var(--ld-accent, var(--highlight-color));
            box-shadow: 0 0 0 2px var(--ld-accent, var(--highlight-color));
        }
        #toggle-tabs-button.mobile-tabs-hidden {
            display: none !important;
        }
        @media (max-width: 1024px) {
            #settings-modal .modal-content {
                width: 80%;
                max-width: 720px;
            }
        }
        @media (max-width: 768px) {
            #settings-modal .modal-content {
                width: 92%;
                max-width: 640px;
            }
            #settings-modal .modal-body {
                flex-direction: column;
                gap: 16px;
            }
            #toggle-tabs-button {
                display: none;
            }
            #settings-modal .modal-tabs {
                display: none;
            }
            #settings-modal .modal-panels {
                max-height: none;
                padding-right: 0;
            }
            .mobile-tab-select-wrapper {
                display: flex;
            }
        }
        #settings-modal .tab-content {
            display: none;
            width: 100%;
            box-sizing: border-box;
            overflow-x: hidden;
            background-color: var(--tab-bg-default);
            border-radius: 12px;
            padding: 18px;
            box-shadow: none;
            transition: background-color 0.2s ease, box-shadow 0.2s ease;
        }
        #settings-modal #sidebar-settings {
            background-color: var(--tab-bg-sidebar);
            --settings-card-rgb: 74, 144, 226;
        }
        #settings-modal #floor-settings {
            background-color: var(--tab-bg-floor);
            --settings-card-rgb: 255, 193, 7;
        }
        #settings-modal #prompt-settings {
            background-color: var(--tab-bg-prompt);
            --settings-card-rgb: 156, 39, 176;
        }
        #settings-modal #api-settings {
            background-color: var(--tab-bg-api);
            --settings-card-rgb: 0, 188, 212;
        }
        #settings-modal #list-summary-settings {
            background-color: var(--tab-bg-list);
            --settings-card-rgb: 255, 152, 0;
        }
        #settings-modal #dearrow-settings {
            background-color: var(--tab-bg-list);
            --settings-card-rgb: 255, 152, 0;
        }
        #settings-modal #toast-settings {
            background-color: var(--tab-bg-toast);
            --settings-card-rgb: 76, 175, 80;
        }
        #settings-modal #import-export-settings {
            background-color: transparent;
            box-shadow: none;
            --settings-card-rgb: 121, 85, 72;
        }
        #settings-modal #drive-settings {
            background-color: var(--tab-bg-drive);
            --settings-card-rgb: 0, 150, 136;
        }
        #settings-modal .tab-content.active {
            display: block;
        }
        #settings-modal .settings-card {
            background-color: rgba(var(--settings-card-rgb, 74, 144, 226), 0.16);
            border: 1px solid rgba(var(--settings-card-rgb, 74, 144, 226), 0.32);
            border-radius: 12px;
            padding: 18px;
            margin-bottom: 18px;
            box-shadow: none;
            transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
        }
        #settings-modal .settings-card:last-child {
            margin-bottom: 0;
        }
        #settings-modal .settings-card hr {
            border: none;
            border-top: 1px dashed rgba(var(--settings-card-rgb, 74, 144, 226), 0.35);
            margin: 12px 0;
        }
        @media (prefers-color-scheme: dark) {
            #settings-modal .settings-card {
                background-color: rgba(var(--settings-card-rgb, 74, 144, 226), 0.24);
                border-color: rgba(var(--settings-card-rgb, 74, 144, 226), 0.48);
                box-shadow: none;
            }
            #settings-modal .settings-card hr {
                border-top-color: rgba(var(--settings-card-rgb, 74, 144, 226), 0.45);
            }
        }
        body.dark #settings-modal .settings-card,
        body[data-theme="dark"] #settings-modal .settings-card,
        html.dark #settings-modal .settings-card {
            background-color: rgba(var(--settings-card-rgb, 74, 144, 226), 0.26);
            border-color: rgba(var(--settings-card-rgb, 74, 144, 226), 0.5);
        }
        body.dark #settings-modal .settings-card hr,
        body[data-theme="dark"] #settings-modal .settings-card hr,
        html.dark #settings-modal .settings-card hr {
            border-top-color: rgba(var(--settings-card-rgb, 74, 144, 226), 0.5);
        }
        .api-sub-tabs,
        .sidebar-sub-tabs,
        .list-summary-sub-tabs,
        .dearrow-sub-tabs,
        .prompt-sub-tabs,
        .toast-sub-tabs {
            display: inline-flex;
            gap: 10px;
            margin-bottom: 16px;
            flex-wrap: wrap;
        }
        .api-sub-tab-button,
        .sidebar-sub-tab-button,
        .list-summary-sub-tab-button,
        .dearrow-sub-tab-button,
        .prompt-sub-tab-button,
        .toast-sub-tab-button {
            min-height: var(--ld-btn-height, 40px);
            padding: 8px 14px;
            border-radius: var(--ld-btn-radius, 4px);
            border: 1px solid transparent;
            background-color: var(--secondary-button-bg);
            color: var(--secondary-button-text);
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;
        }
        .api-sub-tab-button:focus,
        .sidebar-sub-tab-button:focus,
        .list-summary-sub-tab-button:focus,
        .dearrow-sub-tab-button:focus,
        .prompt-sub-tab-button:focus,
        .toast-sub-tab-button:focus {
            outline: none;
            box-shadow: none;
        }
        .api-sub-tab-button:focus-visible,
        .sidebar-sub-tab-button:focus-visible,
        .list-summary-sub-tab-button:focus-visible,
        .dearrow-sub-tab-button:focus-visible,
        .prompt-sub-tab-button:focus-visible,
        .toast-sub-tab-button:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px var(--ld-accent, var(--highlight-color));
        }
        .api-sub-tab-button:hover,
        .sidebar-sub-tab-button:hover,
        .list-summary-sub-tab-button:hover,
        .dearrow-sub-tab-button:hover,
        .prompt-sub-tab-button:hover {
            background-color: var(--tab-hover-bg);
            transform: translateY(-1px);
        }
        .api-sub-tab-button.active,
        .sidebar-sub-tab-button.active,
        .list-summary-sub-tab-button.active,
        .dearrow-sub-tab-button.active,
        .prompt-sub-tab-button.active,
        .toast-sub-tab-button.active {
            background-color: var(--tab-active-bg);
            border-color: transparent;
            color: var(--text-color);
        }
        .api-sub-tab-panels,
        .sidebar-sub-tab-panels,
        .list-summary-sub-tab-panels,
        .dearrow-sub-tab-panels,
        .prompt-sub-tab-panels,
        .toast-sub-tab-panels {
            position: relative;
        }
        .api-sub-tab-content,
        .sidebar-sub-tab-content,
        .list-summary-sub-tab-content,
        .dearrow-sub-tab-content,
        .prompt-sub-tab-content,
        .toast-sub-tab-content {
            display: none;
        }
        .api-sub-tab-content.active,
        .sidebar-sub-tab-content.active,
        .list-summary-sub-tab-content.active,
        .dearrow-sub-tab-content.active,
        .prompt-sub-tab-content.active,
        .toast-sub-tab-content.active {
            display: block;
        }
        @media (max-width: 768px) {
            .api-sub-tabs,
            .sidebar-sub-tabs,
            .list-summary-sub-tabs,
            .dearrow-sub-tabs,
            .prompt-sub-tabs,
            .toast-sub-tabs {
                width: 100%;
            }
            .api-sub-tab-button,
            .sidebar-sub-tab-button,
            .list-summary-sub-tab-button,
            .dearrow-sub-tab-button,
            .prompt-sub-tab-button,
            .toast-sub-tab-button {
                flex: 1 1 48%;
                text-align: center;
            }
        }
        #settings-modal label {
            display: block;
            margin-bottom: 10px;
        }
        #settings-modal select, #settings-modal input, #settings-modal textarea {
            margin-bottom: 10px;
        }
        #api-config, #prompt-config, .auto-retry-settings {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 10px;
        }
        #settings-modal button {
            margin-top: 10px;
        }
        .hidden {
            display: none !important;
        }
        .button-group {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        .settings-card-actions {
            display: flex;
            justify-content: flex-end;
            padding: 14px 18px;
        }
        .settings-card-actions .button-group {
            width: 100%;
            margin: 0;
            justify-content: flex-end;
            flex-wrap: wrap;
            gap: 12px;
        }
        .settings-card-actions .custom-button {
            flex: 0 1 160px;
        }
        /* Settings modal action buttons (Discourse-like) */
        #settings-modal .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-height: var(--ld-btn-height, 40px);
            padding: 8px 12px;
            border-radius: var(--ld-btn-radius, 4px);
            border: 1px solid transparent;
            font-weight: 600;
            font-size: 14px;
            line-height: 1.2;
            cursor: pointer;
            white-space: nowrap;
            background-color: var(--btn-default-bg);
            color: var(--btn-default-text);
            border-color: var(--btn-default-border);
            box-shadow: none;
            transition: background-color 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;
            flex: 0 0 auto;
            max-width: none;
            margin-top: 0;
        }
        #settings-modal .btn:hover {
            background-color: var(--btn-default-hover);
            filter: none;
        }
        #settings-modal .btn:active {
            background-color: var(--btn-default-active);
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.18);
        }
        #settings-modal .btn:focus {
            outline: none;
            box-shadow: none;
        }
        #settings-modal .btn:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px var(--ld-accent, var(--highlight-color));
        }
        #settings-modal .btn-success:focus {
            box-shadow: none;
        }
        #settings-modal .btn-success:focus-visible {
            box-shadow: 0 0 0 2px var(--btn-success-bg);
        }
        #settings-modal .btn-danger:focus {
            box-shadow: none;
        }
        #settings-modal .btn-danger:focus-visible {
            box-shadow: 0 0 0 2px var(--btn-danger-bg);
        }
        #settings-modal .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            box-shadow: none;
        }
        #settings-modal .btn-icon-text {
            gap: 6px;
        }
        #settings-modal .btn-icon-text .d-icon,
        #settings-modal .btn-icon-text .button-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1em;
            height: 1em;
            font-size: 15px;
            line-height: 1;
        }
        #settings-modal .btn-icon-text .d-button-label,
        #settings-modal .btn-icon-text .button-label {
            line-height: 1;
        }
        #settings-modal .btn-primary {
            background-color: var(--btn-primary-bg);
            border-color: var(--btn-primary-bg);
            color: #ffffff;
        }
        #settings-modal .btn-primary:hover {
            background-color: var(--btn-primary-hover);
            border-color: var(--btn-primary-hover);
        }
        #settings-modal .btn-primary:active {
            background-color: var(--btn-primary-active);
            border-color: var(--btn-primary-active);
        }
        #settings-modal .btn-success {
            background-color: var(--btn-success-bg);
            border-color: var(--btn-success-bg);
            color: #ffffff;
        }
        #settings-modal .btn-success:hover {
            background-color: var(--btn-success-hover);
            border-color: var(--btn-success-hover);
        }
        #settings-modal .btn-success:active {
            background-color: var(--btn-success-active);
            border-color: var(--btn-success-active);
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.18);
        }
        #settings-modal .btn-danger {
            background-color: var(--btn-danger-bg);
            border-color: var(--btn-danger-bg);
            color: #ffffff;
        }
        #settings-modal .btn-danger:hover {
            background-color: var(--btn-danger-hover);
            border-color: var(--btn-danger-hover);
        }
        #settings-modal .btn-danger:active {
            background-color: var(--btn-danger-active);
            border-color: var(--btn-danger-active);
        }
        #settings-modal .btn-default {
            background-color: var(--btn-default-bg);
            border-color: var(--btn-default-border);
            color: var(--btn-default-text);
        }
        #settings-modal .btn-default:hover {
            background-color: var(--btn-default-hover);
        }
        #settings-modal .btn-default:active {
            background-color: var(--btn-default-active);
        }
        #settings-modal .button-group .btn,
        #settings-modal .settings-card-actions .btn {
            margin-top: 0;
        }
        #import-export-settings .button-group .btn {
            width: auto;
        }
        #drive-settings .button-group .btn {
            width: auto;
        }
        @media (max-width: 768px) {
            .settings-card-actions {
                justify-content: center;
            }
            .settings-card-actions .button-group {
                justify-content: center;
                gap: 8px;
            }
            #settings-modal .button-group .btn {
                flex: 1 1 auto;
                min-width: 0;
            }
            #import-export-settings .button-group .btn {
                width: 100%;
            }
            #drive-settings .button-group .btn {
                width: 100%;
            }
        }
        .api-settings-current-card {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 18px;
            margin-bottom: 20px;
            border-radius: 12px;
            background-color: rgba(var(--settings-card-rgb, 0, 188, 212), 0.22);
            border: 1px solid rgba(var(--settings-card-rgb, 0, 188, 212), 0.45);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        }
        .api-settings-current-card label {
            margin: 0;
            font-weight: 600;
            color: var(--modal-text);
        }
        .api-settings-custom-card {
            display: flex;
            flex-direction: column;
            gap: 14px;
            padding: 18px;
            border-radius: 12px;
            background-color: rgba(var(--settings-card-rgb, 0, 188, 212), 0.18);
            border: 1px solid rgba(var(--settings-card-rgb, 0, 188, 212), 0.4);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.07);
        }
        .api-auto-settings-card {
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: 18px;
            border-radius: 12px;
            background-color: rgba(var(--settings-card-rgb, 0, 188, 212), 0.18);
            border: 1px solid rgba(var(--settings-card-rgb, 0, 188, 212), 0.4);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.07);
        }
        .api-auto-settings-card .switch-container {
            margin-bottom: 0;
        }
        .api-auto-settings-card hr {
            border: none;
            border-top: 1px dashed rgba(var(--settings-card-rgb, 0, 188, 212), 0.35);
            margin: 2px 0;
        }
        .api-auto-section {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .api-auto-section-title {
            font-weight: 600;
            color: var(--modal-text);
        }
        .api-settings-custom-title {
            font-weight: 600;
            color: var(--modal-text);
        }
        .api-image-settings {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 12px;
            border-radius: 8px;
            border: 1px dashed rgba(var(--settings-card-rgb, 0, 188, 212), 0.38);
        }
        .api-image-settings .switch-container {
            margin-bottom: 0;
        }
        .api-image-options {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
        }
        .api-image-options label {
            margin: 0;
        }
        @media (max-width: 768px) {
            .api-image-options {
                grid-template-columns: 1fr;
            }
        }
        .api-settings-action-bar {
            display: flex;
            justify-content: flex-end;
            margin-top: 6px;
        }
        .api-settings-action-bar .button-group {
            width: 100%;
            margin-top: 0;
            justify-content: flex-end;
            flex-wrap: wrap;
            gap: 12px;
        }
        #api-settings-main {
            margin-bottom: 0;
            padding-bottom: 12px;
        }
        #api-settings .api-sub-tabs {
            margin-bottom: 12px;
        }
        #api-settings .api-sub-tab-panels {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        #api-settings .api-sub-tab-content > * + * {
            margin-top: 14px;
        }
        @media (max-width: 768px) {
            .api-settings-action-bar {
                justify-content: center;
            }
            .api-settings-action-bar .button-group {
                justify-content: center;
                gap: 8px;
            }
        }
        #api-settings .api-sub-tab-content.settings-card {
            background-color: transparent;
            border: none;
            box-shadow: none;
            padding: 0;
        }
        #api-settings .api-sub-tab-content.settings-card + .api-sub-tab-content.settings-card {
            margin-top: 12px;
        }
        #prompt-settings .prompt-custom-config {
            background-color: transparent;
            border: none;
            box-shadow: none;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 0;
        }
        #prompt-settings .prompt-config-top {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            margin: 0;
            padding: 18px;
            border-radius: 12px;
            background-color: rgba(var(--settings-card-rgb, 156, 39, 176), 0.22);
            border: 1px solid rgba(var(--settings-card-rgb, 156, 39, 176), 0.45);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        }
        #prompt-settings .prompt-config-picker {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            width: 100%;
            font-weight: 600;
            color: var(--modal-text);
        }
        #prompt-settings .prompt-config-picker select {
            width: 100%;
            min-width: 0;
            margin-bottom: 0;
        }
        #prompt-settings #prompt-config {
            background-color: rgba(var(--settings-card-rgb, 156, 39, 176), 0.18);
            border: 1px solid rgba(var(--settings-card-rgb, 156, 39, 176), 0.4);
            border-radius: 12px;
            padding: 18px 18px 14px;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.07);
            display: flex;
            flex-direction: column;
            gap: 14px;
            margin-top: 0;
        }
        #prompt-settings #prompt-config .prompt-config-title {
            font-weight: 600;
            color: var(--modal-text);
            margin-bottom: 4px;
        }
        #prompt-settings #prompt-config .prompt-config-fields {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        #prompt-settings #prompt-config .prompt-field {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
            width: 100%;
            margin-bottom: 0;
            font-weight: 600;
            color: var(--modal-text);
        }
        #prompt-settings #prompt-config .prompt-field input,
        #prompt-settings #prompt-config .prompt-field textarea {
            width: 100%;
            margin-bottom: 0;
        }
        #prompt-settings #prompt-config .prompt-input-section {
            min-width: 0;
        }
        #prompt-settings #prompt-config .prompt-input-section textarea {
            min-height: 180px;
            resize: vertical;
        }
        #prompt-settings .prompt-actions {
            display: flex;
            justify-content: flex-end;
            margin-top: 12px;
            padding: 0;
        }
        #prompt-settings .prompt-actions .button-group {
            margin: 0;
            width: 100%;
            justify-content: flex-end;
            flex-wrap: wrap;
            gap: 12px;
        }
        @media (max-width: 768px) {
            #prompt-settings .prompt-actions {
                justify-content: center;
            }
            #prompt-settings .prompt-actions .button-group {
                justify-content: center;
                gap: 8px;
            }
        }
        /* === Import/Export Styles === */
        #import-export-settings h3 {
            margin-top: 20px;
            color: var(--highlight-color);
        }
        #import-settings-button, #export-settings-button {
            margin-top: 10px;
        }
        /* Adjust styles for import/export buttons */
        #import-export-settings button {
            width: 100%;
        }
        #import-export-settings .import-export-section {
            background-color: rgba(var(--settings-card-rgb, 121, 85, 72), 0.22);
            border-color: rgba(var(--settings-card-rgb, 121, 85, 72), 0.4);
        }
        #import-export-settings.import-export-sections .import-export-section + .import-export-section {
            margin-top: 16px;
        }
        #import-export-settings .import-export-section .switch-label {
            display: inline-block;
            margin-bottom: 6px;
            font-size: var(--font-0, 1em);
            font-weight: 600;
            color: var(--modal-text);
        }
        #import-export-settings .import-export-section p {
            margin-top: 0;
            margin-bottom: 14px;
            font-size: var(--font-down-1, 0.8706em);
            color: var(--message-color-active);
        }
        #import-export-settings .import-export-section .button-group {
            margin-top: 0;
        }
        /* === Drive Settings Styles === */
        #drive-settings .drive-summary-section .switch-label {
            display: inline-block;
            margin-bottom: 6px;
            font-size: var(--font-0, 1em);
            font-weight: 600;
            color: var(--modal-text);
        }
        #drive-settings .drive-summary-section p {
            margin-top: 0;
            margin-bottom: 14px;
            font-size: var(--font-down-1, 0.8706em);
            color: var(--message-color-active);
        }
        #drive-settings .drive-summary-section .button-group {
            margin-top: 0;
        }
        #drive-settings .drive-summary-fields {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 8px;
        }
        #drive-settings .drive-summary-hint {
            margin: 6px 0 12px;
            font-size: var(--font-down-1, 0.8706em);
            color: var(--message-color-active);
        }
        #drive-settings .drive-summary-status {
            min-height: 18px;
            margin-top: 8px;
            font-size: var(--font-down-1, 0.8706em);
            color: var(--message-color-active);
        }
        #drive-settings .drive-summary-status.success {
            color: var(--summarized-button-bg);
        }
        #drive-settings .drive-summary-status.error {
            color: var(--delete-button-bg);
        }
        @media (prefers-color-scheme: dark) {
            #import-export-settings .import-export-section {
                background-color: rgba(var(--settings-card-rgb, 121, 85, 72), 0.32);
                border-color: rgba(var(--settings-card-rgb, 121, 85, 72), 0.56);
            }
        }
        body.dark #import-export-settings .import-export-section,
        body[data-theme="dark"] #import-export-settings .import-export-section,
        html.dark #import-export-settings .import-export-section {
            background-color: rgba(var(--settings-card-rgb, 121, 85, 72), 0.34);
            border-color: rgba(var(--settings-card-rgb, 121, 85, 72), 0.58);
        }
        /* === 新增提示样式 === */
        .adjustment-prompt {
            margin-left: 10px;
            font-size: var(--font-down-1, 0.8706em);
            color: var(--message-color-active);
        }
        .adjustment-message {
            display: block;
            margin-top: 5px;
            font-size: var(--font-down-1, 0.8706em);
            color: var(--message-color-active);
        }
        .adjustment-message.inactive {
            color: var(--message-color-inactive);
        }
        /* === 历史记录样式 === */
        #summary-history {
            padding: 20px;
            background-color: var(--result-bg);
            border-top: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        #history-nav .custom-button {
            flex: 1;
            max-width: 120px;
        }
        #history-content p {
            white-space: pre-wrap;
        }
        /* 确保历史记录内容正确显示 */
        .history-summary-wrapper {
            width: 100%;
            max-width: 100%;
            overflow-wrap: break-word;
            word-wrap: break-word;
            overflow-x: hidden;
        }
        /* 删除历史记录界面与总结区域之间的间距 */
        #history-content {
            margin-top: 0 !important;
        }
        #history-content hr {
            margin: 10px 0 !important;
        }
        /* === 新增总结按钮悬停效果 === */
        #submit-button:not(.summarizing):not(.summarized):hover {
            background-color: var(--highlight-color);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        /* === 新增自动重试设置样式 === */
        .auto-retry-settings input {
            padding: 8px 12px;
            border: 1px solid var(--ld-input-border, var(--border-color));
            border-radius: var(--ld-input-radius, 4px);
            background-color: var(--ld-input-bg, var(--input-bg));
            color: var(--ld-input-fg, var(--text-color));
            transition: border-color 0.16s ease, box-shadow 0.16s ease;
        }
        #settings-modal .auto-retry-label {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
            width: 100%;
            margin-bottom: 0;
        }
        #settings-modal .auto-retry-text {
            flex: 1;
            min-width: 0;
            padding-left: 1.5em;
        }
        #settings-modal .auto-retry-input {
            width: 120px;
            min-width: 88px;
            margin-left: auto;
            margin-bottom: 0;
        }
        .auto-retry-settings input:focus,
        .auto-retry-settings input:focus-visible {
            outline: none;
            border-color: var(--ld-accent, var(--highlight-color));
            box-shadow: 0 0 0 2px var(--ld-accent, var(--highlight-color));
        }
        @media (max-width: 768px) {
            #settings-modal .auto-retry-label {
                flex-direction: column;
                align-items: flex-start;
            }
            #settings-modal .auto-retry-input {
                width: 100%;
                margin-left: 0;
            }
        }
        /* === Dark Mode Adaptations for Buttons === */
        @media (prefers-color-scheme: dark) {
            /* Adjust '新' / '旧' 翻页按钮颜色 */
            .nav-button {
                background-color: var(--secondary-button-bg);
                color: var(--secondary-button-text);
            }
            .nav-button:hover {
                background-color: var(--highlight-color);
                color: var(--button-text);
            }
            /* Adjust history navigation buttons */
            #prev-history, #next-history {
                background-color: var(--secondary-button-bg);
                color: var(--secondary-button-text);
            }
            #prev-history:hover, #next-history:hover {
                background-color: var(--highlight-color);
                color: var(--button-text);
            }
        }
        /* === 新增总结按钮在黑暗模式下的适配 === */
        @media (prefers-color-scheme: dark) {
            #submit-button:not(.summarizing):not(.summarized) {
                background-color: var(--primary-button-bg);
                color: var(--button-text);
            }
            #submit-button:not(.summarizing):not(.summarized):hover {
                background-color: var(--highlight-color);
                color: var(--button-text);
            }
        }

        /* === 新增列表页总结按钮样式 === */

        .topic-list-item.has-summary-button {
            position: relative;
        }

        .topic-list-item.has-dearrow-button {
            position: relative;
        }

        .topic-list-item:not(.bookmark-list-item) .main-link {
            position: relative;
            box-sizing: border-box;
            min-height: 46px;
            padding-right: 142px;
        }

        .topic-list-item:not(.bookmark-list-item) .main-link:has(.topic-dearrow-button):has(.topic-summary-button) {
            min-height: 74px;
        }

        /* === Mobile layout fix for summary button === */
        @media (max-width: 1000px) {
            .topic-list-item:not(.bookmark-list-item) .main-link {
                min-height: 44px;
                padding-right: 132px;
            }
            .topic-summary-button {
                top: auto !important;
                bottom: 8px !important;
                right: 8px !important;
            }
            .topic-question-button {
                top: auto !important;
                bottom: 8px !important;
                right: 88px !important;
            }
            .topic-dearrow-button {
                top: auto !important;
                bottom: 36px !important;
                right: 8px !important;
            }
            .topic-list-item:not(.bookmark-list-item) .main-link:has(.topic-dearrow-button):not(:has(.topic-summary-button)) .topic-dearrow-button {
                bottom: 8px !important;
            }
        }

        .topic-dearrow-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            appearance: none;
            -webkit-appearance: none;
            background-color: transparent !important;
            background-image: none !important;
            color: inherit;
            border: 0 !important;
            border-radius: 0;
            box-shadow: none !important;
            outline: 0 !important;
            padding: 2px 4px;
            margin-left: 8px;
            margin-right: 0;
            width: 28px;
            min-width: 28px;
            height: 24px;
            line-height: 1;
            cursor: pointer;
            transition: opacity 0.2s ease;
            position: absolute;
            right: 10px;
            top: auto;
            bottom: 38px;
            z-index: 10;
        }

        .topic-dearrow-button .topic-dearrow-icon {
            display: block;
            width: 20px;
            height: 20px;
            flex: none;
            pointer-events: none;
        }

        .topic-dearrow-button .topic-dearrow-icon path {
            transition: fill 0.18s ease;
        }

        .topic-dearrow-button:focus-visible {
            outline: 2px solid var(--tertiary, #4A90E2) !important;
            outline-offset: 2px !important;
            border-radius: 50%;
        }

        /* AI 已判断为非标题党：常驻灰度图标。 */
        .topic-dearrow-button.is-neutral .topic-dearrow-icon path:nth-of-type(1) {
            fill: #6B6B6B;
        }

        .topic-dearrow-button.is-neutral .topic-dearrow-icon path:nth-of-type(2) {
            fill: #BDBDBD;
        }

        .topic-dearrow-button.is-neutral .topic-dearrow-icon path:nth-of-type(3) {
            fill: #8A8A8A;
        }

        .topic-dearrow-button.is-clickbait .topic-dearrow-icon path:nth-of-type(1) {
            fill: #C62828;
        }

        .topic-dearrow-button.is-clickbait .topic-dearrow-icon path:nth-of-type(2) {
            fill: #FFFFFF;
        }

        .topic-dearrow-button.is-clickbait .topic-dearrow-icon path:nth-of-type(3) {
            fill: #E53935;
        }

        /* Hover 或键盘聚焦预览原标题时，统一切换为灰度变体。 */
        .topic-dearrow-button:hover .topic-dearrow-icon path:nth-of-type(1),
        .topic-dearrow-button.is-previewing-original .topic-dearrow-icon path:nth-of-type(1) {
            fill: #6B6B6B;
        }

        .topic-dearrow-button:hover .topic-dearrow-icon path:nth-of-type(2),
        .topic-dearrow-button.is-previewing-original .topic-dearrow-icon path:nth-of-type(2) {
            fill: #BDBDBD;
        }

        .topic-dearrow-button:hover .topic-dearrow-icon path:nth-of-type(3),
        .topic-dearrow-button.is-previewing-original .topic-dearrow-icon path:nth-of-type(3) {
            fill: #8A8A8A;
        }

        /* 未判断的 idle 状态与正在判断共用虚线图标；是否等待由
           独立操作状态决定，不再由图标样式隐式推断。 */
        .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(1),
        .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(2),
        .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(3),
        .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(1),
        .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(2),
        .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(3) {
            fill: none;
            stroke-width: 0.18;
            stroke-dasharray: 0.55 0.38;
            stroke-linecap: round;
        }

        .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(1),
        .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(1) {
            stroke: #5A5A5A;
        }

        .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(2),
        .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(2) {
            stroke: #9E9E9E;
        }

        .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(3),
        .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(3) {
            stroke: #757575;
        }

        @media (prefers-color-scheme: dark) {
            .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(1),
            .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(1) {
                stroke: #B0B0B0;
            }

            .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(2),
            .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(2) {
                stroke: #E8E8E8;
            }

            .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(3),
            .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(3) {
                stroke: #D0D0D0;
            }
        }

        body.dark .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(1),
        body.dark .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(1),
        body[data-theme="dark"] .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(1),
        body[data-theme="dark"] .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(1),
        html.dark .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(1),
        html.dark .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(1) {
            stroke: #B0B0B0;
        }

        body.dark .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(2),
        body.dark .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(2),
        body[data-theme="dark"] .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(2),
        body[data-theme="dark"] .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(2),
        html.dark .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(2),
        html.dark .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(2) {
            stroke: #E8E8E8;
        }

        body.dark .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(3),
        body.dark .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(3),
        body[data-theme="dark"] .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(3),
        body[data-theme="dark"] .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(3),
        html.dark .topic-dearrow-button.is-unjudged .topic-dearrow-icon path:nth-of-type(3),
        html.dark .topic-dearrow-button.is-checking .topic-dearrow-icon path:nth-of-type(3) {
            stroke: #D0D0D0;
        }

        /* 等待判断或提取首帖时是准备阶段：灰度实体、无动画。 */
        .topic-dearrow-button.is-preparing .topic-dearrow-icon path:nth-of-type(1) {
            animation: none;
            fill: #6B6B6B;
            stroke: none;
        }

        .topic-dearrow-button.is-preparing .topic-dearrow-icon path:nth-of-type(2) {
            animation: none;
            fill: #BDBDBD;
            stroke: none;
        }

        .topic-dearrow-button.is-preparing .topic-dearrow-icon path:nth-of-type(3) {
            animation: none;
            fill: #8A8A8A;
            stroke: none;
        }

        /* 只有 AI 模型正在重写标题时才显示动画。 */
        .topic-dearrow-button.is-rewriting .topic-dearrow-icon path:nth-of-type(1) {
            animation: dearrow-rewrite-outer 1.8s ease-in-out infinite alternate;
        }

        .topic-dearrow-button.is-rewriting .topic-dearrow-icon path:nth-of-type(2) {
            animation: dearrow-rewrite-middle 1.8s ease-in-out infinite alternate;
        }

        .topic-dearrow-button.is-rewriting .topic-dearrow-icon path:nth-of-type(3) {
            animation: dearrow-rewrite-center 1.8s ease-in-out infinite alternate;
        }

        @keyframes dearrow-rewrite-outer {
            0% { fill: #6B6B6B; }
            100% { fill: #1213BD; }
        }

        @keyframes dearrow-rewrite-middle {
            0% { fill: #BDBDBD; }
            100% { fill: #88c9f9; }
        }

        @keyframes dearrow-rewrite-center {
            0% { fill: #8A8A8A; }
            100% { fill: #0a62a5; }
        }

        /* 判断或重写失败：停止可能残留的重写动画，并固定为灰度。
           按钮本身仍可点击，以便用户重试。 */
        .topic-dearrow-button.has-error .topic-dearrow-icon path:nth-of-type(1) {
            animation: none;
            fill: #6B6B6B;
            stroke: none;
        }

        .topic-dearrow-button.has-error .topic-dearrow-icon path:nth-of-type(2) {
            animation: none;
            fill: #BDBDBD;
            stroke: none;
        }

        .topic-dearrow-button.has-error .topic-dearrow-icon path:nth-of-type(3) {
            animation: none;
            fill: #8A8A8A;
            stroke: none;
        }

        @media (prefers-reduced-motion: reduce) {
            .topic-dearrow-button {
                transition: none;
            }

            .topic-dearrow-button .topic-dearrow-icon path {
                transition: none;
            }

            .topic-dearrow-button.is-rewriting:not(.has-error) .topic-dearrow-icon path:nth-of-type(1) {
                animation: none;
                fill: #1213BD;
            }

            .topic-dearrow-button.is-rewriting:not(.has-error) .topic-dearrow-icon path:nth-of-type(2) {
                animation: none;
                fill: #88c9f9;
            }

            .topic-dearrow-button.is-rewriting:not(.has-error) .topic-dearrow-icon path:nth-of-type(3) {
                animation: none;
                fill: #0a62a5;
            }
        }

        .topic-list-item:not(.bookmark-list-item) .main-link:has(.topic-dearrow-button):not(:has(.topic-summary-button)) .topic-dearrow-button {
            bottom: 10px;
        }

        .topic-dearrow-button.is-checking,
        .topic-dearrow-button.is-preparing,
        .topic-dearrow-button.is-rewriting {
            cursor: wait;
        }

        .topic-dearrow-button:disabled {
            cursor: wait;
            opacity: 0.82;
        }

        .topic-dearrow-button.is-preparing:disabled,
        .topic-dearrow-button.is-rewriting:disabled {
            opacity: 1;
        }

        .topic-summary-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: var(--secondary-button-bg);
            color: var(--secondary-button-text);
            border: none;
            border-radius: 4px;
            padding: 4px 8px;
            margin-left: 8px;
            margin-right: 0;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: absolute;
            right: 10px;
            top: auto;
            bottom: 10px;
            height: 24px; /* 保持按钮高度固定 */
            white-space: nowrap;
            z-index: 10; /* 确保按钮始终在顶层 */
        }

        .topic-summary-button:hover {
            background-color: var(--highlight-color);
            color: var(--button-text);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .topic-question-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            appearance: none;
            -webkit-appearance: none;
            background-color: transparent !important;
            background-image: none !important;
            color: var(--secondary-button-text);
            border: 0 !important;
            border-radius: 0;
            box-shadow: none !important;
            outline: 0 !important;
            padding: 2px 4px;
            margin-left: 6px;
            margin-right: 0;
            font-size: 12px;
            cursor: pointer;
            transition: color 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
            position: absolute;
            right: 92px;
            top: auto;
            bottom: 10px;
            width: 28px;
            height: 24px;
            min-width: 28px;
            z-index: 10;
            opacity: 0;
            transform: scale(0.92);
            pointer-events: none;
        }

        .topic-question-button .ask-button-icon,
        #question-button .ask-button-icon {
            display: block;
            width: 20px;
            height: 20px;
            flex: none;
            pointer-events: none;
        }

        #question-button {
            appearance: none;
            -webkit-appearance: none;
            background-color: transparent !important;
            background-image: none !important;
            color: var(--secondary-button-text);
            border: 0 !important;
            border-radius: 0;
            box-shadow: none !important;
            outline: 0 !important;
        }

        /* 对照屏蔽脚本的按需交互：保留每行按钮作为其定位锚点，
           但仅在当前行 hover / 键盘聚焦 / 面板激活时显示。 */
        .topic-list-item:hover .topic-question-button,
        .topic-list-item:focus-within .topic-question-button,
        .topic-question-button.active,
        .topic-question-button:focus-visible {
            opacity: 1;
            transform: scale(1);
            pointer-events: auto;
        }

        /* 触屏设备没有可靠 hover，保持按钮可直接点击。 */
        @media (hover: none), (pointer: coarse) {
            .topic-question-button {
                opacity: 1;
                transform: scale(1);
                pointer-events: auto;
            }
        }

        .topic-question-button:hover,
        .topic-question-button.active {
            background-color: transparent !important;
            background-image: none !important;
            color: var(--highlight-color);
            border: 0 !important;
            box-shadow: none !important;
            outline: 0 !important;
        }

        #question-button:hover,
        #question-button:focus-visible,
        #question-button.active {
            background-color: transparent !important;
            background-image: none !important;
            color: var(--highlight-color);
            border: 0 !important;
            box-shadow: none !important;
            outline: 0 !important;
        }

        /* 总结中状态 */
        .topic-summary-button.loading {
            background-color: var(--summarizing-button-bg);
            color: var(--summarizing-button-text);
            cursor: wait;
        }

        .topic-summary-button.loading.retrying {
            background-color: var(--summary-retry-bg);
            color: var(--summary-retry-text);
        }

        /* 已总结话题按钮样式 - 已修改为绿色 */
        .topic-summary-button.has-summary {
            background-color: var(--summarized-button-bg);
            color: var(--summarized-button-text);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            font-weight: bold;
        }

        .topic-summary-button.has-summary:hover {
            background-color: var(--summarized-button-hover-bg);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }

        /* 已总结话题项样式 */
        .topic-list-item.has-summary .topic-summary-button {
            background-color: var(--summarized-button-bg);
            color: var(--summarized-button-text);
        }

        /* 忙碌态优先于父级已总结态，避免重绘时被刷回绿色 */
        .topic-list-item.has-summary .topic-summary-button.loading {
            background-color: var(--summarizing-button-bg);
            color: var(--summarizing-button-text);
        }

        .topic-list-item.has-summary .topic-summary-button.loading.retrying {
            background-color: var(--summary-retry-bg);
            color: var(--summary-retry-text);
        }

        /* Bookmark list layout: keep button in flow to avoid excerpt overlap */
        .bookmark-list-item .link-bottom-line {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
        }

        .bookmark-list-item .topic-summary-button {
            position: static;
            margin-left: auto;
            top: auto;
            right: auto;
            bottom: auto;
        }

        .bookmark-list-item .topic-question-button {
            position: static;
            top: auto;
            right: auto;
            bottom: auto;
        }

        .bookmark-list-item .topic-dearrow-control-stack {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 4px;
            margin-left: auto;
            order: 20;
        }

        .bookmark-list-item .topic-dearrow-control-stack .topic-summary-button,
        .bookmark-list-item .topic-dearrow-control-stack .topic-dearrow-button {
            position: static;
            top: auto;
            right: auto;
            bottom: auto;
            margin: 0;
        }

        /* === 修正后的总结行样式 === */
        .topic-summary-row {
            display: none; /* 默认隐藏 */
        }

        /* 总结容器样式 */
        .topic-summary-container {
            width: var(--summary-width-value) !important;
            padding: 10px;
            background-color: var(--result-bg);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            max-height: calc(1.5em * 6);
            overflow-y: auto;
            overscroll-behavior-y: contain;
            font-size: 13px;
            line-height: 1.5;
            position: relative;
            overflow-x: hidden;
            box-sizing: border-box;
            margin-left: 0 !important; /* 确保靠左对齐 */
            margin-right: auto;
        }

        /* 总结按钮控制组 - 固定在容器可视区域右下角 */
        .topic-summary-button-group {
            position: sticky;
            right: 10px;
            bottom: 10px;
            display: flex;
            gap: 4px;
            z-index: 100;
            background-color: var(--bg-color);
            padding: 4px;
            border-radius: 4px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
            margin-left: auto;
            width: fit-content;
        }


        /* 总结控制按钮样式 */
        .topic-summary-control-button {
            background-color: var(--secondary-button-bg);
            color: var(--secondary-button-text);
            border: none;
            border-radius: 3px;
            width: 24px;
            height: 24px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .topic-summary-control-button:hover {
            background-color: var(--highlight-color);
            color: var(--button-text);
        }

        /* 控制按钮活动状态 */
        .topic-summary-control-button.active {
            background-color: var(--active-button-bg);
            color: var(--button-text);
        }

        /* 历史记录浏览器 - 独立层叠上下文 */
        .topic-summary-history-browser {
            background-color: var(--bg-color);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 10px;
            margin-bottom: 0; /* 移除间距 */
            display: none;
            position: relative;
            z-index: 10;
        }

        .topic-summary-history-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
        }

        .topic-summary-history-content {
            margin-top: 5px;
            padding-top: 5px;
            border-top: 1px solid var(--border-color);
            overflow-x: hidden;
            width: 100%;
        }

        /* 滚动条样式 */
        .topic-summary-container::-webkit-scrollbar {
            width: var(--scrollbar-width);
            height: var(--scrollbar-width);
        }

        .topic-summary-container::-webkit-scrollbar-thumb {
            background: var(--scrollbar-thumb-light);
            border-radius: 4px;
        }

        .topic-summary-container::-webkit-scrollbar-thumb:hover {
            background: var(--scrollbar-thumb-hover-light);
        }

        /* 黑暗模式滚动条 */
        @media (prefers-color-scheme: dark) {
            .topic-summary-container::-webkit-scrollbar-thumb {
                background: var(--scrollbar-thumb-dark);
            }

            .topic-summary-container::-webkit-scrollbar-thumb:hover {
                background: var(--scrollbar-thumb-hover-dark);
            }
        }

        /* 总结容器内部样式 */
        .topic-summary-container h3 {
            font-size: 14px;
            margin: 5px 0;
            color: var(--highlight-color);
        }

        .topic-summary-container p {
            margin: 5px 0;
        }

        .topic-summary-container ol {
            margin: 5px 0;
            padding-left: 20px;
        }

        .topic-summary-container li {
            margin: 2px 0;
        }

        .topic-summary-container hr {
            border: none;
            border-top: 1px solid var(--border-color);
            margin: 8px 0;
        }

        /* 适配链接底部行 */
        .link-bottom-line {
            position: relative;
        }

        /* 总结历史记录指示器 */
        .topic-summary-history-indicator {
            display: inline-block;
            margin-left: 5px;
            font-size: 11px;
            color: var(--highlight-color);
        }

        /* 确保总结内容容器正确显示 */
        .topic-summary-content {
            width: 100%;
            max-width: 100%;
            overflow-wrap: break-word;
            word-wrap: break-word;
            overflow-x: hidden;
        }

        .topic-question-panel {
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 8px;
            color: var(--text-color);
            overflow-wrap: break-word;
            word-wrap: break-word;
            overflow: visible;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background-color: var(--bg-color);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        }

        .topic-question-panel-sidebar {
            margin: 4px 8px 12px;
        }

        .topic-question-panel-list {
            margin-bottom: 8px;
            background-color: var(--input-bg);
        }

        .topic-question-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            min-height: 28px;
        }

        .topic-question-title {
            display: inline-flex;
            align-items: center;
            min-width: 0;
            gap: 7px;
            font-size: 14px;
            line-height: 1.3;
        }

        .topic-question-title-mark {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            flex: 0 0 20px;
            border-radius: 6px;
            background-color: var(--active-button-bg);
            color: var(--button-text);
            font-size: 13px;
            font-weight: 700;
        }

        .topic-question-close {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            min-width: 28px;
            padding: 0;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            background-color: var(--secondary-button-bg);
            color: var(--secondary-button-text);
            cursor: pointer;
            font-size: 16px;
            font-weight: 700;
            line-height: 1;
            transition: background-color 0.16s ease, color 0.16s ease, border-color 0.16s ease;
        }

        .topic-question-close:hover,
        .topic-question-close:focus-visible {
            background-color: var(--delete-button-bg);
            border-color: var(--delete-button-bg);
            color: var(--button-text);
        }

        .topic-question-presets {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            min-width: 0;
        }

        .topic-question-preset-menu[hidden] {
            display: none;
        }

        .topic-question-preset-menu {
            position: absolute;
            left: 8px;
            right: 8px;
            bottom: calc(100% + 6px);
            z-index: 130;
            display: flex;
            flex-wrap: wrap;
            align-items: start;
            gap: 6px;
            max-height: 150px;
            overflow: auto;
            padding: 8px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background-color: var(--bg-color);
            box-shadow: 0 8px 22px rgba(0, 0, 0, 0.22);
        }

        .topic-question-preset-button,
        .topic-question-preset-menu-item {
            width: auto !important;
            max-width: 100%;
            padding: 5px 9px !important;
            border: 1px solid var(--border-color);
            border-radius: 999px;
            background-color: var(--secondary-button-bg);
            color: var(--secondary-button-text);
            cursor: pointer;
            font-size: 12px;
            font-weight: 600;
            line-height: 1.25;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: background-color 0.16s ease, color 0.16s ease, border-color 0.16s ease;
        }

        .topic-question-preset-menu-item {
            border-radius: 6px;
            text-align: left;
        }

        .topic-question-preset-button:hover,
        .topic-question-preset-button:focus-visible,
        .topic-question-preset-menu-item:hover,
        .topic-question-preset-menu-item:focus-visible {
            background-color: var(--highlight-color);
            border-color: var(--highlight-color);
            color: var(--button-text);
        }

        .topic-question-history {
            display: flex;
            flex-direction: column;
            gap: 8px;
            min-height: 34px;
            max-height: 260px;
            overflow-y: auto;
            overflow-x: hidden;
            padding-right: 2px;
        }

        .topic-question-empty {
            margin: 0;
            padding: 10px;
            border: 1px dashed var(--border-color);
            border-radius: 8px;
            text-align: center;
            font-size: 13px;
            opacity: 0.68;
        }

        .topic-question-record {
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 9px 10px;
            background-color: var(--bg-color);
        }

        .topic-question-record-question {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            gap: 5px;
            margin-bottom: 7px;
            line-height: 1.45;
            font-size: 13px;
            font-weight: 600;
        }

        .topic-question-record-answer {
            line-height: 1.55;
            font-size: 13px;
        }

        .topic-question-record-answer > :first-child {
            margin-top: 0;
        }

        .topic-question-record-answer > :last-child {
            margin-bottom: 0;
        }

        .topic-question-record-meta {
            margin-top: 7px;
            font-size: 11px;
            opacity: 0.75;
        }

        .topic-question-preset-label {
            display: inline-block;
            margin-right: 6px;
            padding: 2px 6px;
            border-radius: 999px;
            background-color: var(--active-button-bg);
            color: var(--button-text);
            font-size: 11px;
            line-height: 1.2;
        }

        .topic-question-compose {
            display: flex;
            flex-direction: column;
            gap: 7px;
            min-width: 0;
        }

        .topic-question-input-shell {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 0;
            padding: 8px 10px;
            border: 1px solid var(--ld-input-border, var(--border-color));
            border-radius: var(--ld-input-radius, 4px);
            background-color: var(--ld-input-bg, var(--input-bg));
            transition: border-color 0.16s ease, box-shadow 0.16s ease;
        }

        .topic-question-input-shell:focus-within {
            border-color: var(--ld-accent, var(--highlight-color));
            box-shadow: 0 0 0 2px var(--ld-accent, var(--highlight-color));
        }

        .topic-question-panel-loading .topic-question-input-shell {
            border-color: var(--border-color);
            background-color: var(--input-bg);
        }

        .topic-question-input {
            width: 100%;
            min-height: 78px;
            resize: vertical;
            box-sizing: border-box;
            padding: 0;
            border: none;
            outline: none;
            background: transparent;
            color: var(--text-color);
            font: inherit;
            line-height: 1.5;
        }

        .topic-question-input:focus {
            outline: none;
            box-shadow: none;
        }

        .topic-question-input:disabled {
            background: transparent !important;
            color: var(--text-color);
            -webkit-text-fill-color: var(--text-color);
            opacity: 0.78;
            cursor: wait;
        }

        .topic-question-input::placeholder {
            color: var(--ld-input-placeholder, var(--message-color-active));
            opacity: 1;
        }

        .topic-question-input:disabled::placeholder {
            color: var(--secondary-button-text);
            -webkit-text-fill-color: var(--secondary-button-text);
            opacity: 0.5;
        }

        .topic-question-compose-actions {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            min-height: 30px;
        }

        .topic-question-send {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 64px;
            height: 30px;
            padding: 0 13px;
            border: 1px solid var(--primary-button-bg);
            border-radius: 6px;
            background-color: var(--primary-button-bg);
            color: var(--button-text);
            cursor: pointer;
            font-size: 13px;
            font-weight: 700;
            line-height: 1;
            transition: background-color 0.16s ease, border-color 0.16s ease, filter 0.16s ease;
        }

        .topic-question-send:hover,
        .topic-question-send:focus-visible {
            filter: brightness(1.08);
        }

        .topic-question-send:disabled {
            cursor: wait;
            opacity: 0.68;
            filter: none;
        }

        .topic-question-panel-loading .topic-question-send {
            min-width: 82px;
        }

        .topic-question-status {
            min-height: 16px;
            font-size: 12px;
            line-height: 1.35;
            opacity: 0.9;
        }

        .topic-question-status.info {
            color: var(--highlight-color);
        }

        .topic-question-status.success {
            color: var(--summarized-button-bg);
        }

        .topic-question-status.warning {
            color: var(--toast-bg-warning);
        }

        .topic-question-status.error {
            color: var(--toast-bg-error);
        }

        @media (max-width: 700px) {
            .topic-question-panel {
                padding: 9px;
                gap: 7px;
            }

            .topic-question-presets {
                flex-wrap: nowrap;
                overflow-x: auto;
                padding-bottom: 2px;
            }

            .topic-question-preset-button {
                flex: 0 0 auto;
            }
        }

        /* 总结内容包装器 */
        .summary-content-wrapper {
            width: 100%;
            max-width: 100%;
            overflow-wrap: break-word;
            word-wrap: break-word;
            overflow-x: hidden;
        }

        /* === Toast容器样式 - 重构为卡片式布局 === */
        #summary-toast-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 10000;
            max-width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            overflow-x: hidden;
            pointer-events: none; /* 容器本身不接收点击事件 */
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        /* 滚动条样式 */
        #summary-toast-container::-webkit-scrollbar {
            width: 0;
            height: 0;
        }

        #summary-toast-container::-webkit-scrollbar-thumb {
            background-color: transparent;
        }

        /* Toast样式 */
        .summary-toast {
            padding: 12px 30px 12px 15px; /* 右侧留出空间给关闭按钮 */
            border-radius: 8px;
            min-width: 250px;
            max-width: 100%;
            color: var(--toast-text);
            transform: translateY(8px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            position: relative;
            pointer-events: auto; /* 恢复点击事件 */
            overflow: hidden;
        }

        .summary-toast.show {
            transform: translateY(0);
            opacity: 1;
        }

        /* 关闭按钮 */
        .toast-close-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            background: transparent;
            border: none;
            color: var(--toast-text);
            font-size: 16px;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
            padding: 2px 5px;
            border-radius: 50%;
        }

        .toast-close-btn:hover {
            opacity: 1;
            background-color: rgba(255, 255, 255, 0.2);
        }

        /* Toast类型样式 */
        .summary-toast.info {
            background-color: var(--toast-bg-info);
        }

        .summary-toast.success {
            background-color: var(--toast-bg-success);
        }

        .summary-toast.warning {
            background-color: var(--toast-bg-warning);
        }

        .summary-toast.error {
            background-color: var(--toast-bg-error);
        }

        /* Toast内容样式 */
        .toast-content {
            display: flex;
            flex-direction: column;
            gap: 5px;
            word-break: break-word;
        }

        .toast-topic-info {
            font-size: 12px;
            opacity: 0.9;
            padding-top: 5px;
            border-top: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* 可点击的Toast样式 */
        .summary-toast[data-topic-id] {
            cursor: pointer;
        }

        /* 总结中按钮状态 (侧边栏) */
        #submit-button.summarizing {
            background-color: var(--summarizing-button-bg);
            color: var(--summarizing-button-text);
            cursor: wait;
            opacity: 0.8;
        }

        #submit-button.summarizing.retrying {
            background-color: var(--summary-retry-bg);
            color: var(--summary-retry-text);
        }

        /* 总结完成按钮状态 (侧边栏) */
        #submit-button.summarized {
            background-color: var(--summarized-button-bg);
            color: var(--summarized-button-text);
        }

        /* 侧边栏总结按钮禁用状态 */
        #submit-button:disabled:not(.summarizing):not(.summarized) {
            opacity: 0.6;
            cursor: not-allowed;
        }

        #settings-modal .list-summary-lines-label {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
            width: 100%;
            position: relative;
        }

        #settings-modal #list-summary-dimensions .list-summary-lines-text,
        #settings-modal #list-summary-dimensions .list-summary-section-label,
        #settings-modal #list-summary-dimensions .width-type-title,
        #settings-modal #list-summary-dimensions .width-input-title {
            font-weight: bold;
            color: var(--text-color);
        }

        #settings-modal #list-summary-dimensions .width-type-title,
        #settings-modal #list-summary-dimensions .width-input-title {
            margin-left: 1.5em;
        }

        #settings-modal .list-summary-lines-input {
            width: 88px;
            min-width: 72px;
            margin-left: auto;
            margin-bottom: 0;
        }

        #settings-modal #dearrow-settings .dearrow-setting-field {
            display: flex;
            flex-direction: column;
            gap: 7px;
            width: 100%;
            margin-bottom: 0;
        }

        #settings-modal #dearrow-settings .dearrow-setting-label {
            color: var(--text-color);
            font-weight: 600;
        }

        #settings-modal #dearrow-judgment-api-select,
        #settings-modal #dearrow-rewrite-api-select,
        #settings-modal #dearrow-scope-rules {
            width: 100%;
            box-sizing: border-box;
            margin-bottom: 0;
        }

        #settings-modal #dearrow-judgment-prompt,
        #settings-modal #dearrow-rewrite-prompt {
            width: 100%;
            box-sizing: border-box;
            margin-bottom: 0;
            min-height: 132px;
            resize: vertical;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: var(--font-0, 1em);
            line-height: 1.45;
        }

        #settings-modal #dearrow-scope-rules {
            min-height: 112px;
            resize: vertical;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: var(--font-0, 1em);
            line-height: 1.45;
        }

        #settings-modal .dearrow-scope-error {
            display: none;
            margin: 8px 0;
            color: var(--toast-bg-error);
            font-size: 12px;
            white-space: pre-wrap;
        }

        #settings-modal .dearrow-scope-error.visible {
            display: block;
        }

        #settings-modal .dearrow-settings-actions {
            justify-content: flex-end;
            margin-top: 14px;
        }

        #settings-modal .dearrow-drive-note {
            display: block;
            margin: 10px 0 0;
        }

        #settings-modal #sidebar-settings-dimensions .sidebar-dimension-section-label,
        #settings-modal #sidebar-settings-dimensions .sidebar-dimension-label-text {
            font-weight: bold;
            color: var(--text-color);
        }

        #settings-modal #sidebar-settings-dimensions .sidebar-dimension-control {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
            width: 100%;
            position: relative;
        }

        #settings-modal #sidebar-settings-dimensions .sidebar-dimension-value {
            margin-left: auto;
            font-weight: 600;
            color: var(--highlight-color);
        }

        #settings-modal #sidebar-settings-dimensions .sidebar-dimension-range {
            flex: 1 1 100%;
            margin-top: 6px;
            margin-bottom: 0;
        }

        #settings-modal #sidebar-settings-dimensions .sidebar-dimension-number {
            width: 88px;
            min-width: 72px;
            margin-left: auto;
            margin-bottom: 0;
        }

        #settings-modal #sidebar-settings-dimensions .adjustment-message {
            flex-basis: 100%;
        }


        /* 宽度设置样式 */
        .width-settings {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .width-type-options {
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            justify-content: flex-start;
            gap: 12px;
            margin-top: 4px;
            width: 100%;
            flex-wrap: wrap;
        }
        #settings-modal .width-type-options .width-type-title {
            font-weight: 600;
            color: var(--message-color-active);
            margin: 0;
            white-space: nowrap;
        }
        .width-type-select {
            position: relative;
            width: min(260px, 100%);
            margin-left: auto;
        }
        .width-type-select summary {
            list-style: none;
        }
        .width-type-select summary::-webkit-details-marker {
            display: none;
        }
        .width-type-select .select-kit-header {
            width: 100%;
        }
        .width-type-select .select-kit-header-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            width: 100%;
        }
        .width-type-select .select-kit-selected-name {
            min-width: 0;
        }
        .width-type-select .select-kit-body {
            display: none;
            position: absolute;
            top: calc(100% + 6px);
            left: 0;
            right: 0;
            z-index: 1000;
        }
        .width-type-select[open] .select-kit-body {
            display: block;
        }
        .width-type-select .select-kit-collection {
            max-height: 240px;
            overflow-y: auto;
        }
        .width-input-container {
            display: flex;
            flex-direction: column;
            gap: 8px;
            width: 100%;
        }

        .width-input-header {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
            width: 100%;
        }

        .width-input-header .width-number-wrap {
            margin-left: auto;
        }

        .width-input-title {
            font-weight: 600;
        }

        .width-input-title-meta {
            font-weight: 400;
        }

        .width-input-inline {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 12px;
        }

        .width-number-wrap {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .width-preview {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .width-preview-header {
            display: flex;
            gap: 8px;
            align-items: center;
            font-size: 13px;
            color: var(--message-color-active);
        }

        #current-width-display {
            font-weight: 600;
            color: var(--highlight-color);
        }

        .width-preview-bar-wrapper {
            width: 100%;
            height: 8px;
            border-radius: 4px;
            background-color: var(--border-color);
            overflow: hidden;
        }

        #width-preview-box {
            height: 100%;
            width: 0%;
            background-color: var(--highlight-color);
            border-radius: 4px;
            transition: width 0.3s ease;
        }

        @media (max-width: 768px) {
            #settings-modal .list-summary-lines-label {
                flex-direction: column;
                align-items: flex-start;
            }
            #settings-modal .list-summary-lines-input {
                margin-left: 0;
                width: 100%;
            }
            #settings-modal #sidebar-settings-dimensions .sidebar-dimension-control {
                flex-direction: column;
                align-items: flex-start;
            }
            #settings-modal #sidebar-settings-dimensions .sidebar-dimension-value {
                margin-left: 0;
            }
            #settings-modal #sidebar-settings-dimensions .sidebar-dimension-number {
                width: 100%;
                margin-left: 0;
            }
            .width-input-header {
                flex-direction: column;
                align-items: flex-start;
            }
            .width-input-header .width-number-wrap {
                margin-left: 0;
            }
            .width-input-inline {
                flex-direction: column;
                align-items: flex-start;
            }
            .width-type-options {
                flex-direction: column;
                align-items: flex-start;
            }
            .width-type-select {
                margin-left: 0;
            }
        }

        /* Toast设置样式 - 优化版 */
        .toast-settings-header {
            margin-bottom: 25px;
        }

        .toast-settings-header-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
        }

        .toast-settings-header-top .toast-delay-title {
            margin-right: auto;
            font-weight: bold;
        }

        .toast-delay-toggle {
            border: 1px solid var(--highlight-color);
            background: transparent;
            color: var(--highlight-color);
            border-radius: 6px;
            padding: 4px 12px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
        }

        .toast-delay-toggle:hover,
        .toast-delay-toggle:focus-visible {
            background-color: var(--highlight-color);
            color: var(--button-text);
            box-shadow: 0 2px 6px rgba(74, 144, 226, 0.35);
        }

        .toast-delay-toggle:focus-visible {
            outline: none;
        }

        .toast-delay-toggle[aria-expanded="true"] {
            background-color: var(--highlight-color);
            color: var(--button-text);
        }

        .toast-settings-description.hidden {
            display: none;
        }

        .toast-settings-description {
            color: var(--message-color-active);
            font-size: 14px;
            line-height: 1.5;
            margin-top: 5px;
            background-color: var(--input-bg);
            padding: 12px;
            border-radius: 6px;
            border-left: 3px solid var(--highlight-color);
        }

        /* Toast类型网格 */
        .toast-type-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
            margin-bottom: 20px;
        }

        /* 表头行 */
        .toast-type-row.header {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 10px;
            padding: 10px 15px;
            font-weight: 600;
            color: var(--modal-text);
            background-color: rgba(var(--settings-card-rgb, 255, 152, 0), 0.22);
            border-bottom: 2px solid rgba(var(--settings-card-rgb, 255, 152, 0), 0.45);
        }

        #toast-settings .toast-type-row.header .toast-type-cell:first-child {
            padding-left: calc(30px + 12px);
        }

        /* 数据行 */
        .toast-type-row {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 10px;
            align-items: stretch;
            padding: 15px;
            border-radius: 8px;
            background-color: rgba(var(--settings-card-rgb, 255, 152, 0), 0.1);
            border: 1px solid rgba(var(--settings-card-rgb, 255, 152, 0), 0.28);
            transition: all 0.2s ease;
            box-shadow: none;
        }

        .toast-type-cell {
            display: flex;
            align-items: flex-end;
        }

        #toast-settings .toast-type-cell label,
        #toast-settings .toast-type-cell button,
        #toast-settings .toast-type-cell input {
            margin: 0;
        }

        #toast-settings .toast-type-cell label.switch {
            display: inline-flex;
            align-items: flex-end;
        }

        #toast-settings .duration-input-container {
            align-items: flex-end;
        }

        #toast-settings .duration-unit {
            line-height: 1;
            position: relative;
            top: -10px;
        }

        /* 类型信息列 */
        .toast-type-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .toast-type-icon {
            font-size: 20px;
            flex-shrink: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }

        .toast-type-details {
            display: flex;
            flex-direction: column;
        }

        .toast-type-name {
            font-weight: 600;
            color: var(--text-color);
            margin-bottom: 2px;
        }

        .toast-type-description {
            font-size: 12px;
            color: var(--message-color-active);
        }

        /* 预览按钮 */
        .preview-toast-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 32px;
            align-self: flex-end;
            margin-top: 0;
            padding: 0 12px;
            background-color: var(--secondary-button-bg);
            color: var(--secondary-button-text);
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 13px;
            font-weight: 500;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .preview-toast-button:hover {
            background-color: var(--highlight-color);
            color: var(--button-text);
            transform: translateY(-2px);
            box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
        }

        /* 自动关闭开关 */
        .toast-type-row .switch {
            width: 44px;
            height: 24px;
        }

        .toast-type-row .switch .slider:before {
            height: 18px;
            width: 18px;
        }

        .toast-type-row .switch input:checked + .slider:before {
            transform: translateX(20px);
        }

        /* 持续时间输入 */
        .duration-input-container {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .duration-input-container input {
            width: 72px;
            min-height: 40px;
            padding: 8px 10px;
            border: 1px solid var(--ld-input-border, var(--border-color));
            border-radius: var(--ld-input-radius, 4px);
            background-color: var(--ld-input-bg, var(--input-bg));
            color: var(--ld-input-fg, var(--text-color));
            text-align: right;
            font-variant-numeric: tabular-nums;
            transition: border-color 0.16s ease, box-shadow 0.16s ease;
        }

        .duration-input-container input:focus,
        .duration-input-container input:focus-visible {
            outline: none;
            border-color: var(--ld-accent, var(--highlight-color));
            box-shadow: 0 0 0 2px var(--ld-accent, var(--highlight-color));
        }

        .duration-input-container input:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .duration-unit {
            color: var(--message-color-active);
            font-size: 13px;
        }

        @media (prefers-color-scheme: dark) {
            #toast-settings .toast-type-row.header {
                background-color: rgba(var(--settings-card-rgb, 255, 152, 0), 0.3);
                border-bottom-color: rgba(var(--settings-card-rgb, 255, 152, 0), 0.55);
            }
            #toast-settings .toast-type-row {
                background-color: rgba(var(--settings-card-rgb, 255, 152, 0), 0.18);
                border-color: rgba(var(--settings-card-rgb, 255, 152, 0), 0.36);
            }
        }
        body.dark #toast-settings .toast-type-row.header,
        body[data-theme="dark"] #toast-settings .toast-type-row.header,
        html.dark #toast-settings .toast-type-row.header {
            background-color: rgba(var(--settings-card-rgb, 255, 152, 0), 0.32);
            border-bottom-color: rgba(var(--settings-card-rgb, 255, 152, 0), 0.58);
        }
        body.dark #toast-settings .toast-type-row,
        body[data-theme="dark"] #toast-settings .toast-type-row,
        html.dark #toast-settings .toast-type-row {
            background-color: rgba(var(--settings-card-rgb, 255, 152, 0), 0.2);
            border-color: rgba(var(--settings-card-rgb, 255, 152, 0), 0.4);
        }

        /* 响应式调整 */
        @media (max-width: 768px) {
            .toast-type-row {
                grid-template-columns: 1fr;
                gap: 15px;
                padding: 15px;
            }

            .toast-type-row.header {
                display: none;
            }

            .toast-type-cell {
                position: relative;
                padding: 5px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid var(--border-color);
            }

            .toast-type-cell:last-child {
                border-bottom: none;
            }

            .toast-type-cell:before {
                content: attr(data-label);
                font-weight: 600;
                margin-right: 10px;
                color: var(--highlight-color);
            }

            .toast-type-info {
                width: 100%;
            }
        }

        /* === WIDTH CONTROLS TWEAKS 20250512 === */
        .number-input.summary-width-value-input{
            width: 72px !important;
            min-width: 72px;
        }
        .unit-label{
            margin-left:4px;
            font-weight:600;
        }
        .width-range,
        .width-input-container input[type="range"] {
            width: 100% !important;
            box-sizing: border-box !important;
        }

        /* Secret field toggle is restyled in INPUT CONTRACT below */
    `;
    style.textContent += `

        /* === INPUT CONTRACT 20260830 v1.0.2 === */
        #settings-modal input[type="number"],
        #settings-modal .auto-retry-input,
        #settings-modal .list-summary-lines-input,
        #settings-modal .sidebar-dimension-number,
        #settings-modal .number-input,
        .duration-input-container input {
            text-align: right;
            font-variant-numeric: tabular-nums;
        }
        #settings-modal input[type="number"]::-webkit-inner-spin-button,
        #settings-modal input[type="number"]::-webkit-outer-spin-button {
            opacity: 0.45;
            height: 22px;
        }
        #settings-modal input[type="range"],
        .width-input-container input[type="range"],
        .sidebar-dimension-range {
            -webkit-appearance: none;
            appearance: none;
            height: 6px;
            min-height: 6px;
            padding: 0;
            background: var(--ld-line, var(--border-color));
            border: 0;
            border-radius: 999px;
            box-shadow: none;
        }
        #settings-modal input[type="range"]::-webkit-slider-thumb,
        .width-input-container input[type="range"]::-webkit-slider-thumb,
        .sidebar-dimension-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--ld-accent, var(--highlight-color));
            border: 2px solid var(--ld-modal, var(--modal-bg, #fff));
            box-shadow: 0 0 0 1px var(--ld-accent, var(--highlight-color));
            cursor: pointer;
        }
        #settings-modal input[type="range"]::-moz-range-thumb,
        .width-input-container input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--ld-accent, var(--highlight-color));
            border: 2px solid var(--ld-modal, var(--modal-bg, #fff));
            cursor: pointer;
        }
        #settings-modal input[type="range"]:focus,
        #settings-modal input[type="range"]:focus-visible {
            outline: none;
            box-shadow: none;
            border-color: transparent;
        }
        #settings-modal input[type="range"]:focus::-webkit-slider-thumb,
        #settings-modal input[type="range"]:focus-visible::-webkit-slider-thumb {
            box-shadow: 0 0 0 2px var(--ld-accent, var(--highlight-color));
        }
        .api-key-input {
            -webkit-text-security: disc;
            resize: vertical;
        }
        .api-key-input.is-revealed {
            -webkit-text-security: none;
        }
        @media (max-width: 768px) {
            #settings-modal input,
            #settings-modal select,
            #settings-modal textarea,
            .topic-question-input,
            #summary-form input {
                font-size: 16px;
            }
        }
        /* === SLIDER RIGHT MARGIN FIX 20250427 === */
        #sidebar-settings input[type="range"],
        .width-input-container input[type="range"],
        .range-slider {
            margin-left: 10px;
            margin-right: 10px;
            width: calc(100% - 20px) !important;
            box-sizing: border-box !important;
        }

        /* === SECRET FIELD + FONT CONTRACT 20260830 v1.0.5 === */
        #settings-modal label,
        #settings-modal .switch-label,
        #settings-modal .api-key-label,
        #settings-modal .api-settings-custom-title,
        #settings-modal .api-auto-section-title,
        #settings-modal .mobile-tab-select-label {
            font-size: var(--font-0, 1em);
        }
        #settings-modal .ld-secret-field {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 6px;
            pointer-events: auto;
        }
        #settings-modal .ld-secret-wrap {
            display: flex;
            align-items: stretch;
            width: 100%;
            min-height: 40px;
            box-sizing: border-box;
            background-color: var(--ld-input-bg, var(--input-bg));
            border: 1px solid var(--ld-input-border, var(--border-color));
            border-radius: var(--ld-input-radius, 4px);
            transition: border-color 0.16s ease, box-shadow 0.16s ease, background-color 0.16s ease;
        }
        #settings-modal .ld-secret-wrap:hover:not(:focus-within) {
            border-color: color-mix(in srgb, var(--ld-accent, var(--highlight-color)) 40%, var(--ld-input-border, var(--border-color)));
        }
        #settings-modal .ld-secret-wrap.is-focused,
        #settings-modal .ld-secret-wrap:focus-within {
            border-color: var(--ld-accent, var(--d-input-focused-color, var(--highlight-color)));
            box-shadow: 0 0 0 2px var(--ld-accent, var(--d-input-focused-color, var(--highlight-color)));
        }
        #settings-modal .ld-secret-wrap .ld-secret-input,
        #settings-modal .ld-secret-wrap input,
        #settings-modal .ld-secret-wrap textarea {
            flex: 1 1 auto;
            width: auto;
            min-width: 0;
            min-height: 0;
            margin: 0;
            padding: 8px 10px;
            border: 0 !important;
            box-shadow: none !important;
            outline: none !important;
            background: transparent;
            color: var(--ld-input-fg, var(--text-color));
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: var(--font-0, 1em);
            line-height: var(--line-height-large, 1.45);
            resize: none;
        }
        #settings-modal .ld-secret-wrap textarea.ld-secret-input {
            overflow-wrap: anywhere;
            min-height: 22px;
        }
        #settings-modal .ld-secret-wrap.is-revealed textarea.ld-secret-input {
            resize: vertical;
        }
        #settings-modal .ld-secret-toggle {
            flex: 0 0 40px;
            width: 40px;
            min-width: 40px;
            min-height: 0;
            margin: 0 !important;
            padding: 0;
            border: 0;
            border-radius: var(--ld-input-radius, 4px);
            background: transparent;
            color: var(--ld-muted, var(--primary-medium, var(--message-color-active)));
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: none !important;
        }
        #settings-modal .ld-secret-toggle:hover,
        #settings-modal .ld-secret-toggle:focus-visible {
            color: var(--ld-accent, var(--highlight-color));
            background-color: color-mix(in srgb, var(--ld-accent, var(--highlight-color)) 12%, transparent);
        }
        #settings-modal .ld-secret-toggle:focus,
        #settings-modal .ld-secret-toggle:focus-visible {
            outline: none;
            box-shadow: none !important;
        }
        #settings-modal .ld-secret-toggle svg {
            width: 18px;
            height: 18px;
            display: block;
        }
        #settings-modal .api-key-label {
            pointer-events: auto;
        }
    `;
    document.head.appendChild(style);
    return style;
  }
  function appendSettingsToastStyles() {
    const st = document.createElement("style");
    st.textContent = `
/* === Settings Toast (below settings panel) === */
#settings-toast-container{
    display:flex;
    flex-direction:column;
    gap:8px;
    pointer-events:none;
}
.settings-toast{
    pointer-events:auto;
}
`;
    document.head.appendChild(st);
  }

  // src/features/toast/index.js
  var TOAST_COLOR_VARS = Object.freeze({
    info: "var(--toast-bg-info)",
    success: "var(--toast-bg-success)",
    warning: "var(--toast-bg-warning)",
    error: "var(--toast-bg-error)"
  });
  function getToastColorVar(type) {
    return TOAST_COLOR_VARS[type] || TOAST_COLOR_VARS.info;
  }
  function setToastElementType(toastElement, type, { show = false } = {}) {
    if (!toastElement) return;
    const normalizedType = TOAST_COLOR_VARS[type] ? type : "info";
    toastElement.dataset.toastType = normalizedType;
    toastElement.className = `summary-toast ${normalizedType}${show ? " show" : ""}`;
  }
  function createToastFeature({
    getToastEnabled,
    getToastSettings,
    activeToastsByTopic: activeToastsByTopic2,
    topicTitleMap: topicTitleMap2,
    topicTitleFetchPromises: topicTitleFetchPromises2,
    getFetchOptions: getFetchOptions2,
    onToastClick
  } = {}) {
    function createToastContainer() {
      let container = document.getElementById("summary-toast-container");
      if (!container) {
        container = document.createElement("div");
        container.id = "summary-toast-container";
        document.body.appendChild(container);
      }
      return container;
    }
    function updateToastTopicInfo(toastElement, topicId, topicTitle) {
      if (!toastElement) return;
      const topicInfoDiv = toastElement.querySelector(".toast-topic-info");
      if (!topicInfoDiv) return;
      topicInfoDiv.textContent = formatToastTopicLabel(topicId, topicTitle);
    }
    function hydrateToastTopicTitle(toastElement, topicId) {
      if (!toastElement || !topicId) return;
      ensureTopicTitle2(topicId).then((resolvedTitle) => {
        if (!resolvedTitle) return;
        if (!document.body.contains(toastElement)) return;
        updateToastTopicInfo(toastElement, topicId, resolvedTitle);
      }).catch(() => {
      });
    }
    function createToast2(message, type = "info", customDuration = null, topicId = null) {
      if (!getToastEnabled?.()) return null;
      const toastSettings2 = getToastSettings?.() || {};
      const typeSettings = toastSettings2[type] || toastSettings2.info || {
        autoClose: true,
        duration: 3
      };
      const duration = customDuration !== null ? customDuration : typeSettings.autoClose ? typeSettings.duration * 1e3 : 0;
      const container = createToastContainer();
      if (topicId && activeToastsByTopic2[topicId]) {
        const existingToast = activeToastsByTopic2[topicId];
        existingToast.update(message);
        setToastElementType(existingToast.element, type, { show: true });
        existingToast.type = type;
        updateToastTopicInfo(existingToast.element, topicId, getTopicTitle2(topicId));
        hydrateToastTopicTitle(existingToast.element, topicId);
        if (existingToast.timer) {
          clearTimeout(existingToast.timer);
          existingToast.timer = null;
        }
        if (typeSettings.autoClose && duration > 0) {
          existingToast.timer = setTimeout(() => {
            removeToast2(existingToast.id);
          }, duration);
        }
        return existingToast;
      }
      const toastId = `toast-${Date.now()}-${Math.floor(Math.random() * 1e3)}`;
      const toast = document.createElement("div");
      toast.id = toastId;
      setToastElementType(toast, type);
      if (topicId) {
        const topicTitle = getTopicTitle2(topicId) || `话题#${topicId}`;
        const contentDiv = document.createElement("div");
        contentDiv.className = "toast-content";
        const messageSpan = document.createElement("span");
        messageSpan.textContent = message;
        contentDiv.appendChild(messageSpan);
        const topicInfoDiv = document.createElement("div");
        topicInfoDiv.className = "toast-topic-info";
        topicInfoDiv.textContent = formatToastTopicLabel(topicId, topicTitle);
        contentDiv.appendChild(topicInfoDiv);
        toast.appendChild(contentDiv);
        toast.dataset.topicId = topicId;
        hydrateToastTopicTitle(toast, topicId);
        toast.style.cursor = "pointer";
        toast.addEventListener("click", (event) => {
          event.stopPropagation();
          if (typeof onToastClick === "function") {
            const currentToastType = activeToastsByTopic2[topicId]?.type || toast.dataset.toastType || type;
            onToastClick(topicId, toastId, currentToastType);
          }
        });
      } else {
        toast.textContent = message;
      }
      const closeBtn = document.createElement("button");
      closeBtn.className = "toast-close-btn";
      closeBtn.innerHTML = "&times;";
      closeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        removeToast2(toastId);
      });
      toast.appendChild(closeBtn);
      container.appendChild(toast);
      setTimeout(() => {
        toast.classList.add("show");
      }, 10);
      const toastObj = {
        id: toastId,
        element: toast,
        topicId,
        type,
        timer: null,
        update: (newMessage) => updateToast(toastId, newMessage),
        remove: () => removeToast2(toastId),
        changeType: (newType) => changeToastType(toastId, newType)
      };
      if (typeSettings.autoClose && duration > 0) {
        toastObj.timer = setTimeout(() => {
          removeToast2(toastId);
        }, duration);
      }
      if (topicId) {
        activeToastsByTopic2[topicId] = toastObj;
      }
      return toastObj;
    }
    function removeToast2(toastId) {
      const toast = document.getElementById(toastId);
      if (!toast) return;
      const topicId = toast.dataset.topicId;
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
        if (topicId && activeToastsByTopic2[topicId] && activeToastsByTopic2[topicId].id === toastId) {
          const toastInfo = activeToastsByTopic2[topicId];
          if (toastInfo.timer) {
            clearTimeout(toastInfo.timer);
          }
          delete activeToastsByTopic2[topicId];
        }
        const container = document.getElementById("summary-toast-container");
        if (container && container.children.length === 0) {
          container.remove();
        }
      }, 300);
    }
    function updateToast(toastId, newMessage) {
      const toast = document.getElementById(toastId);
      if (!toast) return;
      const messageSpan = toast.querySelector(".toast-content span");
      if (messageSpan) {
        messageSpan.textContent = newMessage;
      } else if (!toast.querySelector(".toast-content")) {
        const closeBtn = toast.querySelector(".toast-close-btn");
        toast.textContent = newMessage;
        if (closeBtn) {
          toast.appendChild(closeBtn);
        }
      }
    }
    function changeToastType(toastId, newType) {
      const toast = document.getElementById(toastId);
      if (!toast) return;
      let toastObj = null;
      for (const topicId in activeToastsByTopic2) {
        if (activeToastsByTopic2[topicId].id === toastId) {
          toastObj = activeToastsByTopic2[topicId];
          break;
        }
      }
      if (!toastObj) return;
      toastObj.type = newType;
      setToastElementType(toast, newType, { show: true });
      const toastSettings2 = getToastSettings?.() || {};
      const typeSettings = toastSettings2[newType] || toastSettings2.info || {
        autoClose: true,
        duration: 3
      };
      if (toastObj.timer) {
        clearTimeout(toastObj.timer);
        toastObj.timer = null;
      }
      if (typeSettings.autoClose && typeSettings.duration > 0) {
        toastObj.timer = setTimeout(() => {
          removeToast2(toastId);
        }, typeSettings.duration * 1e3);
      }
    }
    function createSummarizingToast2(topicId) {
      if (!getToastEnabled?.()) {
        return {
          id: null,
          element: null,
          clear: () => {
          },
          update: () => {
          },
          changeType: () => {
          }
        };
      }
      const toast = createToast2("正在生成总结，请稍候...", "info", 0, topicId);
      if (!toast) {
        return {
          id: null,
          element: null,
          clear: () => {
          },
          update: () => {
          },
          changeType: () => {
          }
        };
      }
      let dots = 0;
      const intervalId = setInterval(() => {
        if (toast.type !== "info") return;
        dots = (dots + 1) % 4;
        const dotsText = ".".repeat(dots);
        toast.update(`正在生成总结，请稍候${dotsText}`);
      }, 500);
      return {
        id: toast.id,
        element: toast.element,
        clear: () => {
          clearInterval(intervalId);
          removeToast2(toast.id);
        },
        update: (message) => {
          toast.update(message);
        },
        changeType: (newType) => {
          clearInterval(intervalId);
          toast.changeType(newType);
        }
      };
    }
    function getTopicTitleFromDom(topicId) {
      const normalizedTopicId = normalizeTopicIdForTitle(topicId);
      if (!normalizedTopicId) return null;
      if (window.location.pathname.includes(`/${normalizedTopicId}`)) {
        const titleElement = document.querySelector("h1 a.fancy-title, h1 .fancy-title");
        const title = titleElement?.textContent?.trim() || "";
        if (title) {
          return title;
        }
      }
      const topicElement = document.querySelector(`.topic-list-item[data-topic-id="${normalizedTopicId}"]`);
      if (topicElement) {
        const titleElement = topicElement.querySelector("a.title");
        const title = titleElement?.textContent?.trim() || "";
        if (title) {
          return title;
        }
      }
      return null;
    }
    async function fetchTopicTitleFromTopicJson(topicId) {
      const normalizedTopicId = normalizeTopicIdForTitle(topicId);
      if (!normalizedTopicId) return null;
      const topicJsonUrl = `https://linux.do/t/${encodeURIComponent(normalizedTopicId)}.json`;
      let fetchOptions = {
        method: "GET",
        credentials: "include",
        headers: {
          accept: "application/json"
        }
      };
      if (typeof getFetchOptions2 === "function") {
        try {
          fetchOptions = {
            ...getFetchOptions2(),
            method: "GET"
          };
        } catch (_2) {
        }
      }
      const response = await fetch(topicJsonUrl, fetchOptions);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const topicJson = await response.json();
      const title = typeof topicJson?.title === "string" ? topicJson.title.trim() : "";
      return title || null;
    }
    async function ensureTopicTitle2(topicId, options = {}) {
      const normalizedTopicId = normalizeTopicIdForTitle(topicId);
      if (!normalizedTopicId) return null;
      const cachedTitle = topicTitleMap2[normalizedTopicId];
      if (cachedTitle) return cachedTitle;
      const force = options.force === true;
      if (!force && topicTitleFetchPromises2.has(normalizedTopicId)) {
        return topicTitleFetchPromises2.get(normalizedTopicId);
      }
      let fetchPromise = null;
      fetchPromise = (async () => {
        try {
          const titleFromApi = await fetchTopicTitleFromTopicJson(normalizedTopicId);
          if (titleFromApi) {
            topicTitleMap2[normalizedTopicId] = titleFromApi;
            return titleFromApi;
          }
        } catch (error) {
          console.warn(`Failed to fetch topic title via /t/${normalizedTopicId}.json:`, error);
        }
        const titleFromDom = getTopicTitleFromDom(normalizedTopicId);
        if (titleFromDom) {
          topicTitleMap2[normalizedTopicId] = titleFromDom;
          return titleFromDom;
        }
        return null;
      })().finally(() => {
        if (topicTitleFetchPromises2.get(normalizedTopicId) === fetchPromise) {
          topicTitleFetchPromises2.delete(normalizedTopicId);
        }
      });
      topicTitleFetchPromises2.set(normalizedTopicId, fetchPromise);
      return fetchPromise;
    }
    function getTopicTitle2(topicId) {
      const normalizedTopicId = normalizeTopicIdForTitle(topicId);
      if (!normalizedTopicId) return null;
      const cachedTitle = topicTitleMap2[normalizedTopicId];
      if (cachedTitle) return cachedTitle;
      ensureTopicTitle2(normalizedTopicId).catch(() => {
      });
      return null;
    }
    function scrollToAndHighlightTopic2(topicId, toastType = "info", options = {}) {
      const topicElement = document.querySelector(`.topic-list-item[data-topic-id="${topicId}"]`);
      if (topicElement) {
        const originalBorder = topicElement.style.border;
        const originalBoxShadow = topicElement.style.boxShadow;
        const originalTransition = topicElement.style.transition;
        const toastColor = getToastColorVar(toastType);
        const scrollOptions = options && typeof options === "object" ? options : {};
        const scrollBehavior = scrollOptions.behavior === "auto" ? "auto" : "smooth";
        topicElement.scrollIntoView({ behavior: scrollBehavior, block: "center" });
        topicElement.style.transition = "border 0.3s ease, box-shadow 0.3s ease";
        topicElement.style.border = `2px solid ${toastColor}`;
        topicElement.style.boxShadow = `0 0 10px ${toastColor}`;
        setTimeout(() => {
          topicElement.style.border = originalBorder;
          topicElement.style.boxShadow = originalBoxShadow;
          setTimeout(() => {
            topicElement.style.transition = originalTransition;
          }, 300);
        }, 3e3);
      } else {
        window.location.href = `/t/topic/${topicId}`;
      }
    }
    function createSettingsToast2(message, type = "info", duration = 3e3) {
      let container = document.getElementById("settings-toast-container");
      if (!container) {
        container = document.createElement("div");
        container.id = "settings-toast-container";
        container.style.position = "fixed";
        container.style.zIndex = "10002";
        container.style.pointerEvents = "none";
        document.body.appendChild(container);
      }
      const modal = document.querySelector("#settings-modal .modal-content");
      if (modal) {
        const rect = modal.getBoundingClientRect();
        container.style.top = `${rect.bottom + 10}px`;
        container.style.left = `${rect.left + rect.width / 2}px`;
        container.style.transform = "translateX(-50%)";
      } else {
        container.style.bottom = "20px";
        container.style.left = "50%";
        container.style.transform = "translateX(-50%)";
      }
      const toast = document.createElement("div");
      toast.className = `settings-toast ${type}`;
      toast.textContent = message;
      toast.style.padding = "10px 18px";
      toast.style.borderRadius = "6px";
      toast.style.minWidth = "200px";
      toast.style.maxWidth = "500px";
      toast.style.color = "var(--toast-text)";
      toast.style.backgroundColor = getToastColorVar(type);
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      container.appendChild(toast);
      requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
      });
      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(8px)";
        setTimeout(() => {
          toast.remove();
          if (container.children.length === 0) {
            container.remove();
          }
        }, 300);
      }, duration);
    }
    return {
      createToastContainer,
      createToast: createToast2,
      removeToast: removeToast2,
      updateToast,
      changeToastType,
      createSummarizingToast: createSummarizingToast2,
      updateToastTopicInfo,
      hydrateToastTopicTitle,
      getTopicTitleFromDom,
      fetchTopicTitleFromTopicJson,
      ensureTopicTitle: ensureTopicTitle2,
      getTopicTitle: getTopicTitle2,
      scrollToAndHighlightTopic: scrollToAndHighlightTopic2,
      createSettingsToast: createSettingsToast2
    };
  }

  // src/services/imageInput.js
  var DEFAULT_BASE_URL = "https://linux.do/";
  var PREFERRED_IMAGE_URL_ATTRS = ["data-orig-src", "data-original-src", "data-src"];
  var TRUSTED_IMAGE_HOST_SUFFIXES = ["linux.do", "ldstatic.com", "discourse-cdn.com"];
  var SKIP_CLASS_RE = /\b(?:avatar|emoji|emojione|twemoji|site-icon|favicon)\b/i;
  var SKIP_URL_RE = /(?:\/emoji\/|\/letter_avatar_proxy\/|\/user_avatar\/|twemoji|emojione)/i;
  var IMAGE_EXTENSION_RE = /\.(?:apng|avif|gif|jpe?g|png|webp)(?:[?#].*)?$/i;
  var SUPPORTED_IMAGE_MIME_TYPES = /* @__PURE__ */ new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"
  ]);
  function normalizeText2(value) {
    return value === null || value === void 0 ? "" : String(value).trim();
  }
  function escapePlaceholderText(value) {
    return normalizeText2(value).replace(/\s+/g, " ").slice(0, 120);
  }
  function getAttributeFromString(source, name) {
    const pattern = new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s"'=<>\`]+))`, "i");
    const match = String(source || "").match(pattern);
    if (!match) return "";
    return match[2] || match[3] || match[4] || "";
  }
  function createFallbackImageElement(tagSource) {
    return {
      getAttribute(name) {
        return getAttributeFromString(tagSource, name);
      }
    };
  }
  function getImageElementsFromCooked(cooked) {
    const html = String(cooked || "");
    if (!html || !html.includes("<img")) return [];
    if (typeof DOMParser === "function") {
      try {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return Array.from(doc.querySelectorAll("img"));
      } catch (_2) {
      }
    }
    if (typeof document !== "undefined" && typeof document.createElement === "function") {
      try {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = html;
        return Array.from(wrapper.querySelectorAll("img"));
      } catch (_2) {
      }
    }
    return Array.from(html.matchAll(/<img\b[^>]*>/gi)).map((match) => createFallbackImageElement(match[0]));
  }
  function firstSrcsetUrl(element) {
    const srcset = normalizeText2(element?.getAttribute?.("srcset"));
    if (!srcset) return "";
    const candidates = srcset.split(",").map((candidate) => normalizeText2(candidate).split(/\s+/)[0]).filter(Boolean);
    return candidates.length > 0 ? candidates[candidates.length - 1] : "";
  }
  function firstImageUrlAttr(element) {
    for (const attr of PREFERRED_IMAGE_URL_ATTRS) {
      const value = normalizeText2(element?.getAttribute?.(attr));
      if (value) return value;
    }
    const srcsetUrl = firstSrcsetUrl(element);
    if (srcsetUrl) return srcsetUrl;
    const src = normalizeText2(element?.getAttribute?.("src"));
    if (src) return src;
    return "";
  }
  function resolveImageUrl(rawUrl, baseUrl = DEFAULT_BASE_URL) {
    const value = normalizeText2(rawUrl);
    if (!value) return "";
    if (/^data:image\//i.test(value)) return value;
    if (/^\/\//.test(value)) return `https:${value}`;
    try {
      return new URL(value, baseUrl || DEFAULT_BASE_URL).href;
    } catch (_2) {
      return "";
    }
  }
  function shouldSkipImageElement(element, rawUrl, resolvedUrl) {
    if (!rawUrl || !resolvedUrl) return "missing-url";
    const className = normalizeText2(element?.getAttribute?.("class"));
    const role = normalizeText2(element?.getAttribute?.("role"));
    const alt = normalizeText2(element?.getAttribute?.("alt"));
    if (SKIP_CLASS_RE.test(className)) return "decorative-image";
    if (role === "presentation") return "decorative-image";
    if (SKIP_URL_RE.test(resolvedUrl)) return "decorative-image";
    if (/^data:image\//i.test(resolvedUrl)) return "";
    if (IMAGE_EXTENSION_RE.test(resolvedUrl)) return "";
    if (/\/uploads\//i.test(resolvedUrl)) return "";
    if (alt || normalizeText2(element?.getAttribute?.("title"))) return "";
    return "unknown-image-url";
  }
  function extractImagesFromCooked(cooked, options = {}) {
    const baseUrl = options.baseUrl || DEFAULT_BASE_URL;
    const images = [];
    const skippedImages = [];
    const elements = getImageElementsFromCooked(cooked);
    elements.forEach((element, index) => {
      const rawUrl = firstImageUrlAttr(element);
      const url = resolveImageUrl(rawUrl, baseUrl);
      const skipReason = shouldSkipImageElement(element, rawUrl, url);
      const image = {
        url,
        rawUrl,
        alt: normalizeText2(element?.getAttribute?.("alt")),
        title: normalizeText2(element?.getAttribute?.("title")),
        width: normalizeText2(element?.getAttribute?.("width")),
        height: normalizeText2(element?.getAttribute?.("height")),
        index
      };
      if (skipReason) {
        skippedImages.push({ ...image, reason: skipReason });
        return;
      }
      images.push(image);
    });
    return { images, skippedImages };
  }
  function formatImagePlaceholder(image) {
    const parts = [
      `图片#${image?.id || "?"}`,
      image?.floor ? `楼层:${image.floor}` : "",
      image?.username ? `作者:${image.username}` : "",
      image?.alt ? `alt:${escapePlaceholderText(image.alt)}` : "",
      image?.title ? `title:${escapePlaceholderText(image.title)}` : "",
      image?.url ? `url:${image.url}` : ""
    ].filter(Boolean);
    return `[${parts.join(" ")}]`;
  }
  function normalizeMimeType(value, fallbackUrl = "") {
    const normalized = normalizeText2(value).split(";")[0].trim().toLowerCase();
    if (normalized === "image/jpg") return "image/jpeg";
    if (SUPPORTED_IMAGE_MIME_TYPES.has(normalized)) return normalized;
    const url = normalizeText2(fallbackUrl).toLowerCase();
    if (/\.(?:jpg|jpeg)(?:[?#].*)?$/.test(url)) return "image/jpeg";
    if (/\.png(?:[?#].*)?$/.test(url)) return "image/png";
    if (/\.webp(?:[?#].*)?$/.test(url)) return "image/webp";
    if (/\.gif(?:[?#].*)?$/.test(url)) return "image/gif";
    return normalized || "application/octet-stream";
  }
  function parseResponseContentType(headers) {
    const headerText = String(headers || "");
    const match = headerText.match(/^content-type:\s*([^\r\n]+)/im);
    return match ? match[1].trim() : "";
  }
  function arrayBufferToBase64(buffer) {
    if (typeof Buffer !== "undefined") {
      return Buffer.from(buffer).toString("base64");
    }
    const bytes = new Uint8Array(buffer);
    const chunkSize = 32768;
    let binary = "";
    for (let index = 0; index < bytes.length; index += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
    }
    return btoa(binary);
  }
  function dataUrlToByteLength(dataUrl) {
    const value = normalizeText2(dataUrl);
    const commaIndex = value.indexOf(",");
    if (commaIndex < 0) return 0;
    const base64Length = value.length - commaIndex - 1;
    return Math.floor(base64Length * 3 / 4);
  }
  function parseDataImageUrl(dataUrl) {
    const match = normalizeText2(dataUrl).match(/^data:(image\/[a-z0-9.+-]+);base64,/i);
    if (!match) return null;
    const mimeType = normalizeMimeType(match[1]);
    if (!SUPPORTED_IMAGE_MIME_TYPES.has(mimeType)) return null;
    return {
      url: dataUrl,
      mimeType,
      byteLength: dataUrlToByteLength(dataUrl)
    };
  }
  function requestImageArrayBufferWithGM(requestImpl, url, timeoutMs) {
    return new Promise((resolve, reject) => {
      let settled = false;
      const finish = (callback, value) => {
        if (settled) return;
        settled = true;
        callback(value);
      };
      let result;
      try {
        result = requestImpl({
          method: "GET",
          url,
          responseType: "arraybuffer",
          timeout: timeoutMs,
          headers: {
            Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8"
          },
          onload(response) {
            const status = Number(response?.status || 0);
            if (status && (status < 200 || status >= 300)) {
              finish(reject, new Error(`Image HTTP ${status}`));
              return;
            }
            finish(resolve, {
              arrayBuffer: response?.response,
              contentType: parseResponseContentType(response?.responseHeaders)
            });
          },
          onerror(error) {
            finish(reject, error instanceof Error ? error : new Error("Image request failed"));
          },
          ontimeout() {
            finish(reject, new Error("Image request timed out"));
          }
        });
      } catch (error) {
        finish(reject, error);
        return;
      }
      if (result && typeof result.then === "function") {
        result.then((response) => {
          const status = Number(response?.status || 0);
          if (status && (status < 200 || status >= 300)) {
            finish(reject, new Error(`Image HTTP ${status}`));
            return;
          }
          finish(resolve, {
            arrayBuffer: response?.response,
            contentType: parseResponseContentType(response?.responseHeaders)
          });
        }, (error) => {
          finish(reject, error instanceof Error ? error : new Error("Image request failed"));
        });
      }
    });
  }
  async function requestImageArrayBufferWithFetch(fetchImpl, url) {
    const response = await fetchImpl(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8"
      }
    });
    if (!response.ok) {
      throw new Error(`Image HTTP ${response.status}`);
    }
    return {
      arrayBuffer: await response.arrayBuffer(),
      contentType: response.headers?.get?.("content-type") || ""
    };
  }
  function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      if (typeof FileReader !== "function") {
        reject(new Error("FileReader is unavailable"));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(reader.error || new Error("Failed to read image blob"));
      reader.readAsDataURL(blob);
    });
  }
  function canvasToBlob(canvas, mimeType, quality) {
    return new Promise((resolve) => {
      if (typeof canvas.toBlob !== "function") {
        resolve(null);
        return;
      }
      canvas.toBlob((blob) => resolve(blob), mimeType, quality);
    });
  }
  async function loadBlobImage(blob) {
    if (typeof createImageBitmap === "function") {
      return createImageBitmap(blob);
    }
    if (typeof Image !== "function" || typeof URL === "undefined" || typeof URL.createObjectURL !== "function") {
      return null;
    }
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(blob);
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(url);
        resolve(image);
      };
      image.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Failed to load image for compression"));
      };
      image.src = url;
    });
  }
  async function compressImageArrayBuffer(arrayBuffer, mimeType, maxBytes) {
    if (typeof Blob !== "function" || typeof document === "undefined" || typeof document.createElement !== "function") {
      return null;
    }
    const sourceBlob = new Blob([arrayBuffer], { type: mimeType });
    const bitmap = await loadBlobImage(sourceBlob);
    if (!bitmap) return null;
    try {
      const sourceWidth = Number(bitmap.width || bitmap.naturalWidth || 0);
      const sourceHeight = Number(bitmap.height || bitmap.naturalHeight || 0);
      if (!sourceWidth || !sourceHeight) return null;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext?.("2d");
      if (!ctx) return null;
      let scale = Math.min(1, 1600 / Math.max(sourceWidth, sourceHeight));
      const qualities = [0.84, 0.74, 0.64, 0.54];
      for (let scaleAttempt = 0; scaleAttempt < 4; scaleAttempt += 1) {
        const width = Math.max(1, Math.round(sourceWidth * scale));
        const height = Math.max(1, Math.round(sourceHeight * scale));
        canvas.width = width;
        canvas.height = height;
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(bitmap, 0, 0, width, height);
        for (const quality of qualities) {
          const blob = await canvasToBlob(canvas, "image/jpeg", quality);
          if (blob && blob.size <= maxBytes) {
            return {
              dataUrl: await blobToDataUrl(blob),
              mimeType: "image/jpeg",
              byteLength: blob.size,
              compressed: true
            };
          }
        }
        scale *= 0.72;
      }
    } finally {
      if (typeof bitmap.close === "function") {
        bitmap.close();
      }
    }
    return null;
  }
  async function downloadImageAsDataUrl(image, options = {}) {
    const requestImpl = options.requestImpl;
    const fetchImpl = options.fetchImpl;
    const timeoutMs = Number(options.timeoutMs || 15e3);
    const maxImageBytes = Number(options.maxImageBytes || 4 * 1024 * 1024);
    const url = image?.url;
    const response = typeof requestImpl === "function" ? await requestImageArrayBufferWithGM(requestImpl, url, timeoutMs) : await requestImageArrayBufferWithFetch(fetchImpl || fetch, url);
    const arrayBuffer = response?.arrayBuffer;
    if (!(arrayBuffer instanceof ArrayBuffer) && !ArrayBuffer.isView(arrayBuffer)) {
      throw new Error("Image response is not binary");
    }
    const normalizedBuffer = arrayBuffer instanceof ArrayBuffer ? arrayBuffer : arrayBuffer.buffer.slice(arrayBuffer.byteOffset, arrayBuffer.byteOffset + arrayBuffer.byteLength);
    const byteLength = normalizedBuffer.byteLength;
    const mimeType = normalizeMimeType(response?.contentType, url);
    if (!SUPPORTED_IMAGE_MIME_TYPES.has(mimeType)) {
      throw new Error(`Unsupported image type: ${mimeType}`);
    }
    if (byteLength > maxImageBytes) {
      const compressed = await compressImageArrayBuffer(normalizedBuffer, mimeType, maxImageBytes);
      if (compressed) return compressed;
      throw new Error(`Image exceeds ${maxImageBytes} bytes`);
    }
    return {
      dataUrl: `data:${mimeType};base64,${arrayBufferToBase64(normalizedBuffer)}`,
      mimeType,
      byteLength,
      compressed: false
    };
  }
  function hostnameMatchesSuffix(hostname, suffix) {
    return hostname === suffix || hostname.endsWith(`.${suffix}`);
  }
  function isTrustedDiscourseImageUrl(url, baseUrl = DEFAULT_BASE_URL) {
    try {
      const imageUrl = new URL(url, baseUrl);
      const hostname = imageUrl.hostname.toLowerCase();
      return TRUSTED_IMAGE_HOST_SUFFIXES.some((suffix) => hostnameMatchesSuffix(hostname, suffix));
    } catch (_2) {
      return false;
    }
  }
  async function prepareImageInputsForApi(images = [], options = {}) {
    const apiConfig = options.apiConfig || {};
    if (apiConfig.imageInputEnabled !== true) {
      return {
        imageInputs: [],
        preparedImages: [],
        skippedImages: []
      };
    }
    const maxImages = Math.max(1, Number(apiConfig.maxImagesPerRequest || 6));
    const maxImageBytes = Math.max(1, Number(apiConfig.maxImageBytes || 4 * 1024 * 1024));
    const maxTotalImageBytes = Math.max(1, Number(apiConfig.maxTotalImageBytes || 12 * 1024 * 1024));
    const detail = normalizeText2(apiConfig.imageDetail) || "auto";
    const requestImpl = options.requestImpl;
    const fetchImpl = options.fetchImpl;
    const baseUrl = options.baseUrl || DEFAULT_BASE_URL;
    const imageInputs = [];
    const preparedImages = [];
    const skippedImages = [];
    let totalBytes = 0;
    for (const image of Array.isArray(images) ? images : []) {
      if (imageInputs.length >= maxImages) {
        skippedImages.push({ ...image, reason: "max-images-exceeded" });
        continue;
      }
      try {
        let prepared;
        if (/^data:image\//i.test(image?.url || "")) {
          prepared = parseDataImageUrl(image.url);
          if (!prepared) {
            skippedImages.push({ ...image, reason: "unsupported-data-image" });
            continue;
          }
        } else if (isTrustedDiscourseImageUrl(image?.url, baseUrl)) {
          prepared = await downloadImageAsDataUrl(image, {
            requestImpl,
            fetchImpl,
            maxImageBytes
          });
          prepared = {
            url: prepared.dataUrl,
            mimeType: prepared.mimeType,
            byteLength: prepared.byteLength,
            compressed: prepared.compressed
          };
        } else {
          skippedImages.push({ ...image, reason: "external-image" });
          continue;
        }
        if (prepared.byteLength > maxImageBytes) {
          skippedImages.push({ ...image, reason: "max-image-bytes-exceeded" });
          continue;
        }
        if (totalBytes + prepared.byteLength > maxTotalImageBytes) {
          skippedImages.push({ ...image, reason: "max-total-image-bytes-exceeded" });
          continue;
        }
        totalBytes += prepared.byteLength;
        const imageInput = {
          id: image.id,
          url: prepared.url,
          detail
        };
        imageInputs.push(imageInput);
        preparedImages.push({
          ...image,
          mimeType: prepared.mimeType,
          byteLength: prepared.byteLength,
          compressed: prepared.compressed === true
        });
      } catch (error) {
        skippedImages.push({
          ...image,
          reason: "download-failed",
          error: error?.message || String(error)
        });
      }
    }
    return {
      imageInputs,
      preparedImages,
      skippedImages
    };
  }

  // src/features/topicPage/index.js
  var DEFAULT_FULL_FLOOR_END = 9999;
  var TOPIC_IMAGE_BASE_URL = "https://linux.do/";
  var CONTENT_RATE_LIMIT_INITIAL_DELAY_SECONDS = 10;
  var LINUX_DO_CONTENT_RATE_LIMIT_EXHAUSTED = "LINUX_DO_CONTENT_RATE_LIMIT_EXHAUSTED";
  function normalizeContentRetryCount(value) {
    const parsed = parseInt(value, 10);
    if (!Number.isFinite(parsed)) return 0;
    return Math.max(0, parsed);
  }
  function isLinuxDoContentUrl(url) {
    try {
      const parsed = new URL(String(url));
      if (parsed.origin !== "https://linux.do") return false;
      return /^\/t\/[^/]+\/(?:post_ids|posts)\.json$/.test(parsed.pathname) || /^\/t\/[^/]+\.json$/.test(parsed.pathname);
    } catch (error) {
      return false;
    }
  }
  function defaultContentRetryWait(seconds) {
    return new Promise((resolve) => setTimeout(resolve, Math.max(0, seconds) * 1e3));
  }
  function createContentRateLimitExhaustedError(url, retryCount, response) {
    const attempts = retryCount + 1;
    const error = new Error(
      `HTTP error 429 fetching Linux DO content after ${attempts} attempt${attempts === 1 ? "" : "s"}`
    );
    error.name = "LinuxDoContentRateLimitError";
    error.code = LINUX_DO_CONTENT_RATE_LIMIT_EXHAUSTED;
    error.status = 429;
    error.retryable = false;
    error.url = String(url);
    error.retryCount = retryCount;
    error.attempts = attempts;
    error.response = response;
    return error;
  }
  async function fetchLinuxDoContentWith429Retry(url, fetchOptions, options = {}) {
    const fetchImpl = typeof options.fetchImpl === "function" ? options.fetchImpl : globalThis.fetch;
    if (typeof fetchImpl !== "function") {
      throw new TypeError("fetch implementation is required");
    }
    const retryCount = normalizeContentRetryCount(options.retryCount);
    const waitForRetry = typeof options.waitForRetry === "function" ? options.waitForRetry : defaultContentRetryWait;
    const onRetry = typeof options.onRetry === "function" ? options.onRetry : null;
    const shouldHandleRateLimit = isLinuxDoContentUrl(url);
    let retryAttempt = 0;
    while (true) {
      const response = await fetchImpl(url, fetchOptions);
      if (!shouldHandleRateLimit || response?.status !== 429) {
        return response;
      }
      if (retryAttempt >= retryCount) {
        throw createContentRateLimitExhaustedError(url, retryCount, response);
      }
      const delaySeconds = CONTENT_RATE_LIMIT_INITIAL_DELAY_SECONDS * 2 ** retryAttempt;
      const retryInfo = {
        url: String(url),
        status: 429,
        delaySeconds,
        retryAttempt: retryAttempt + 1,
        retryCount
      };
      if (onRetry) {
        await onRetry(retryInfo);
      }
      await waitForRetry(delaySeconds, retryInfo);
      retryAttempt += 1;
    }
  }
  function createTopicSummaryFeature(deps = {}) {
    const {
      state: state2,
      pendingManualAfterDriveFailTopics: pendingManualAfterDriveFailTopics2,
      createToast: createToast2,
      createSummarizingToast: createSummarizingToast2,
      ensureTopicTitle: ensureTopicTitle2,
      getTopicTitle: getTopicTitle2,
      captureCurrentSummaryRequestContext: captureCurrentSummaryRequestContext2,
      renderSidebarSummaryContent: renderSidebarSummaryContent2,
      setSidebarSummaryHtml,
      setSummaryElementHtml: setSummaryElementHtml2,
      getSummaryHistory: getSummaryHistory2,
      isTopicMarkedSummarized: isTopicMarkedSummarized2,
      hasDriveSummaryCredentials: hasDriveSummaryCredentials2,
      pullTopicHistoryFromDrive: pullTopicHistoryFromDrive2,
      shouldAttemptTopicHistoryDrivePull: shouldAttemptTopicHistoryDrivePull2,
      saveSummaryHistory: saveSummaryHistory2,
      autoShowHistoryIfExists: autoShowHistoryIfExists2,
      updateTopicSummaryButtons,
      getFetchOptions: getFetchOptions2,
      summarizeSomething: summarizeSomething2,
      getCurrentApiConfiguration: getCurrentApiConfiguration2,
      normalizeAutoRetryCount: normalizeAutoRetryCount2,
      normalizeAutoRetryInterval: normalizeAutoRetryInterval2,
      extractTopicId: extractTopicId2,
      isTopicPageUrl: isTopicPageUrl2,
      loadHistoryIntoSidebar,
      setTopicTitle: setTopicTitle2,
      imageRequest,
      waitForContentRetry,
      onContentFetchRetry
    } = deps;
    const sidebarDriveHistoryPullingTopics = /* @__PURE__ */ new Set();
    function normalizeTopicId4(topicId) {
      if (topicId === null || topicId === void 0) return "";
      return String(topicId).trim();
    }
    function getTopicSummaryState(topicId) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      const hasLocalHistory = normalizedTopicId ? getSummaryHistory2(normalizedTopicId).length > 0 : false;
      const hasSummaryState = normalizedTopicId ? hasLocalHistory || isTopicMarkedSummarized2(normalizedTopicId) : false;
      return {
        topicId: normalizedTopicId,
        hasLocalHistory,
        hasSummaryState
      };
    }
    function canAttemptDrivePull() {
      if (!state2.driveSummarySettings?.enabled) return false;
      if (typeof hasDriveSummaryCredentials2 === "function") {
        return hasDriveSummaryCredentials2();
      }
      return true;
    }
    function isNonRetryableSummaryError(error) {
      if (!error || typeof error !== "object") return false;
      return error.retryable === false || error.code === "CONTENT_FILTER_BLOCKED";
    }
    function getContentRetryCount(operationApi = null) {
      const currentApiConfig = operationApi || (typeof getCurrentApiConfiguration2 === "function" ? getCurrentApiConfiguration2() : null);
      const source = currentApiConfig?.retryCount ?? state2?.autoRetryCount ?? 0;
      if (typeof normalizeAutoRetryCount2 === "function") {
        return normalizeContentRetryCount(
          normalizeAutoRetryCount2(source, state2?.autoRetryCount ?? 0)
        );
      }
      return normalizeContentRetryCount(source);
    }
    function fetchLinuxDoTopicContent(url, fetchOptions, context = {}) {
      return fetchLinuxDoContentWith429Retry(url, fetchOptions, {
        retryCount: getContentRetryCount(context.currentApi),
        waitForRetry: waitForContentRetry,
        onRetry: async (retryInfo) => {
          const event = { ...retryInfo, ...context };
          if (typeof onContentFetchRetry === "function") {
            await onContentFetchRetry(event);
            return;
          }
          if (typeof createToast2 === "function") {
            createToast2(
              `内容提取返回 429，${retryInfo.delaySeconds} 秒后重试 (${retryInfo.retryAttempt}/${retryInfo.retryCount})...`,
              "warning",
              null,
              context.topicId
            );
          }
        }
      });
    }
    function updateSidebarSubmitButtonState2(topicId) {
      const submitButton = document.getElementById("submit-button");
      const buildingInput = document.getElementById("building");
      if (!submitButton || !buildingInput) return;
      if (buildingInput.value === topicId) {
        const hasLocalHistory = getSummaryHistory2(topicId).length > 0;
        const hasSummaryState = hasLocalHistory || isTopicMarkedSummarized2(topicId);
        if (state2.summarizingTopics.has(topicId)) {
          submitButton.disabled = true;
          submitButton.classList.add("summarizing");
          submitButton.classList.remove("summarized");
          submitButton.textContent = "⏳ 总结中...";
          submitButton.title = "正在生成总结...";
        } else {
          submitButton.disabled = false;
          submitButton.classList.remove("summarizing");
          submitButton.classList.toggle("summarized", hasSummaryState);
          submitButton.textContent = hasSummaryState ? "📝 已总结" : "⚡ 总结";
          submitButton.title = hasSummaryState ? "重新总结 主题&回复" : "总结 主题&回复";
        }
      } else {
        submitButton.disabled = false;
        submitButton.classList.remove("summarizing");
        submitButton.classList.remove("summarized");
        submitButton.textContent = "⚡ 总结";
        submitButton.title = "总结 主题&回复";
      }
    }
    function showSummarizingInterface(resultDiv, topicId) {
      if (!resultDiv) return;
      resultDiv.innerHTML = "";
      const contentWrapper = document.createElement("div");
      contentWrapper.className = "summary-content-wrapper";
      contentWrapper.style.width = "100%";
      contentWrapper.style.position = "relative";
      const loadingIndicator = document.createElement("div");
      loadingIndicator.className = "loading-indicator";
      loadingIndicator.textContent = "正在生成总结，请稍候...";
      contentWrapper.appendChild(loadingIndicator);
      resultDiv.appendChild(contentWrapper);
      resultDiv.style.display = "flex";
      updateSidebarSubmitButtonState2(topicId);
    }
    function toggleClass(element, className, enabled) {
      if (!element?.classList) return;
      if (enabled) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    }
    function setTopicRetryVisualState(topicId, isRetrying) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!normalizedTopicId) return;
      const buildingInput = document.getElementById("building");
      if (!buildingInput || normalizeTopicId4(buildingInput.value) === normalizedTopicId) {
        toggleClass(document.getElementById("submit-button"), "retrying", isRetrying);
        document.querySelectorAll("#summary-result .loading-indicator").forEach((indicator) => {
          toggleClass(indicator, "retrying", isRetrying);
        });
      }
      document.querySelectorAll(`.topic-summary-button[data-topic-id="${normalizedTopicId}"]`).forEach((button) => {
        toggleClass(button, "retrying", isRetrying);
      });
      document.querySelectorAll(`.topic-summary-row[data-topic-id="${normalizedTopicId}"] .loading-indicator`).forEach((indicator) => {
        toggleClass(indicator, "retrying", isRetrying);
      });
    }
    function displayResult(text, options = {}) {
      const resultDiv = document.getElementById("summary-result");
      if (!resultDiv) return;
      resultDiv.innerHTML = "";
      const contentWrapper = document.createElement("div");
      contentWrapper.className = "summary-content-wrapper";
      renderSidebarSummaryContent2(contentWrapper, text, {
        preserveSelection: true,
        renderMode: options.renderMode
      });
      const infoContainer = document.createElement("div");
      infoContainer.id = "summary-info";
      infoContainer.style.marginTop = "20px";
      infoContainer.style.fontSize = "0.9em";
      infoContainer.style.color = "var(--message-color-active)";
      infoContainer.style.paddingBottom = "10px";
      const timestamp = (/* @__PURE__ */ new Date()).toLocaleString();
      const model = options.model || getCurrentApiConfiguration2()?.model || "未知模型";
      setSidebarSummaryHtml(
        infoContainer,
        `<p>🕒 时间：${timestamp}</p><p>🤖 模型：${model}</p>`,
        { preserveSelection: true }
      );
      resultDiv.appendChild(contentWrapper);
      resultDiv.appendChild(infoContainer);
      resultDiv.style.display = "flex";
    }
    function displayError(message) {
      const resultDiv = document.getElementById("summary-result");
      if (!resultDiv) return;
      resultDiv.innerHTML = "";
      const contentWrapper = document.createElement("div");
      contentWrapper.className = "summary-content-wrapper";
      const errorDiv = document.createElement("div");
      errorDiv.style.color = "var(--toast-bg-error)";
      errorDiv.style.padding = "10px";
      errorDiv.style.backgroundColor = "rgba(231, 76, 60, 0.1)";
      errorDiv.style.border = "1px solid var(--toast-bg-error)";
      errorDiv.style.borderRadius = "5px";
      errorDiv.style.marginTop = "10px";
      errorDiv.textContent = message;
      contentWrapper.appendChild(errorDiv);
      resultDiv.appendChild(contentWrapper);
      resultDiv.style.display = "flex";
    }
    function createTopicContentAccumulator() {
      return {
        dialogues: [],
        images: [],
        skippedImages: [],
        seenImageUrls: /* @__PURE__ */ new Set(),
        nextImageId: 1
      };
    }
    function appendPostImagesToAccumulator(post, cooked, accumulator, fallbackFloor) {
      const username = post?.username || "未知用户";
      const floor = post?.post_number || fallbackFloor || "";
      const extracted = extractImagesFromCooked(cooked, { baseUrl: TOPIC_IMAGE_BASE_URL });
      const postImages = [];
      extracted.images.forEach((image) => {
        const urlKey = image.url;
        if (!urlKey) {
          accumulator.skippedImages.push({
            ...image,
            username,
            floor,
            reason: "missing-url"
          });
          return;
        }
        if (accumulator.seenImageUrls.has(urlKey)) {
          accumulator.skippedImages.push({
            ...image,
            username,
            floor,
            reason: "duplicate-image"
          });
          return;
        }
        accumulator.seenImageUrls.add(urlKey);
        const normalizedImage = {
          ...image,
          id: accumulator.nextImageId,
          username,
          floor
        };
        accumulator.nextImageId += 1;
        accumulator.images.push(normalizedImage);
        postImages.push(normalizedImage);
      });
      extracted.skippedImages.forEach((image) => {
        accumulator.skippedImages.push({
          ...image,
          username,
          floor
        });
      });
      return postImages;
    }
    function formatDialogues(json, accumulator = createTopicContentAccumulator()) {
      if (!json?.post_stream?.posts) return [];
      return json.post_stream.posts.map((post, index) => {
        const cooked = post.cooked || "";
        const username = post.username || "未知用户";
        const replyToUsername = post.reply_to_user?.username;
        const postImages = appendPostImagesToAccumulator(
          post,
          cooked,
          accumulator,
          accumulator.dialogues.length + index + 1
        );
        const imageText = postImages.length > 0 ? `
${postImages.map(formatImagePlaceholder).join("\n")}` : "";
        return replyToUsername ? `${username}回复${replyToUsername}说：${cooked}${imageText}` : `${username}说：${cooked}${imageText}`;
      });
    }
    async function fetchTopicPostIds(topicId, currentApi = null) {
      if (!topicId) throw new Error("Missing topicId");
      const postIdsUrl = `https://linux.do/t/${topicId}/post_ids.json`;
      const idResponse = await fetchLinuxDoTopicContent(postIdsUrl, getFetchOptions2(), {
        topicId: normalizeTopicId4(topicId),
        requestKind: "post_ids",
        currentApi
      });
      if (!idResponse.ok) {
        throw new Error(`HTTP error ${idResponse.status} fetching post IDs`);
      }
      const idJson = await idResponse.json();
      if (!Array.isArray(idJson.post_ids)) {
        throw new Error("Invalid post_ids format received");
      }
      return idJson.post_ids;
    }
    function getFullFloorRangeFromPostIds(postIds, maxEnd = DEFAULT_FULL_FLOOR_END) {
      const totalPosts = Array.isArray(postIds) ? postIds.length : 0;
      const endFloor = Math.min(totalPosts, Math.max(1, maxEnd));
      return { startFloor: 1, endFloor };
    }
    async function getFullFloorRangeForTopic(topicId, maxEnd = DEFAULT_FULL_FLOOR_END, currentApi = null) {
      const postIds = await fetchTopicPostIds(topicId, currentApi);
      if (!postIds || postIds.length === 0) {
        throw new Error("No post_ids returned");
      }
      return getFullFloorRangeFromPostIds(postIds, maxEnd);
    }
    async function buildTopicContentContext(building, startFloor, endFloor, currentApi = null) {
      const urls = await postid_to_url(building, startFloor, endFloor, currentApi);
      if (!urls || urls.length === 0) {
        return {
          dialogues: [],
          contentText: "",
          images: [],
          skippedImages: []
        };
      }
      const accumulator = createTopicContentAccumulator();
      const fetchOptions = getFetchOptions2();
      for (const url of urls) {
        const response = await fetchLinuxDoTopicContent(url, fetchOptions, {
          topicId: normalizeTopicId4(building),
          requestKind: "posts",
          currentApi
        });
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status} fetching posts`);
        }
        const json = await response.json();
        const dialogues = formatDialogues(json, accumulator);
        accumulator.dialogues = accumulator.dialogues.concat(dialogues);
      }
      return {
        dialogues: accumulator.dialogues,
        contentText: accumulator.dialogues.join("\n\n"),
        images: accumulator.images,
        skippedImages: accumulator.skippedImages
      };
    }
    async function prepareTopicImagesForCurrentApi(topicContent, operationApi = null) {
      const currentApi = operationApi || getCurrentApiConfiguration2?.() || {};
      return prepareImageInputsForApi(topicContent?.images || [], {
        apiConfig: currentApi,
        requestImpl: imageRequest,
        fetchImpl: typeof fetch === "function" ? fetch : void 0,
        baseUrl: TOPIC_IMAGE_BASE_URL
      });
    }
    function safeSlice(arr, start, end) {
      if (!Array.isArray(arr)) return [];
      start = Math.max(start, 0);
      end = end === void 0 || end > arr.length ? arr.length : end;
      return arr.slice(start, end);
    }
    async function postid_to_url(building, startFloor, endFloor, currentApi = null) {
      const fetchOptions = getFetchOptions2();
      const allPostIds = await fetchTopicPostIds(building, currentApi);
      let targetPostIds = [];
      if (startFloor === 1 && endFloor >= allPostIds.length) {
        targetPostIds = allPostIds;
      } else {
        targetPostIds = safeSlice(allPostIds, startFloor - 1, endFloor);
        if (startFloor === 1) {
          const topicUrl = `https://linux.do/t/${building}.json`;
          const topicResponse = await fetchLinuxDoTopicContent(topicUrl, fetchOptions, {
            topicId: normalizeTopicId4(building),
            requestKind: "topic",
            currentApi
          });
          if (topicResponse.ok) {
            const topicJson = await topicResponse.json();
            const firstPostId = topicJson?.post_stream?.posts?.[0]?.id;
            if (firstPostId && (!targetPostIds.length || targetPostIds[0] !== firstPostId)) {
              targetPostIds.unshift(firstPostId);
              if (targetPostIds.length > 1 && targetPostIds[1] === firstPostId) {
                targetPostIds.splice(1, 1);
              }
            }
            if (topicJson?.title) {
              setTopicTitle2?.(building, topicJson.title);
            }
          }
        }
      }
      if (targetPostIds.length === 0) {
        return [];
      }
      const chunkSize = 100;
      const urls = [];
      for (let index = 0; index < targetPostIds.length; index += chunkSize) {
        const chunk = targetPostIds.slice(index, index + chunkSize);
        const postIdsParam = chunk.map((id) => `post_ids[]=${id}`).join("&");
        urls.push(`https://linux.do/t/${building}/posts.json?${postIdsParam}&include_suggested=false`);
      }
      return urls;
    }
    async function main(building, startFloor, endFloor, retryAttempt = 0, operationApi = null) {
      const currentApi = operationApi || {
        ...typeof getCurrentApiConfiguration2 === "function" ? getCurrentApiConfiguration2() : {}
      };
      try {
        const topicTitle = typeof ensureTopicTitle2 === "function" ? await ensureTopicTitle2(building) : getTopicTitle2?.(building);
        const topicContent = await buildTopicContentContext(
          building,
          startFloor,
          endFloor,
          currentApi
        );
        if (!topicContent?.contentText) {
          throw new Error("未能获取到帖子内容");
        }
        const imageContext = await prepareTopicImagesForCurrentApi(topicContent, currentApi);
        const imageInstruction = imageContext.imageInputs?.length ? `本次请求附带了 ${imageContext.imageInputs.length} 张话题图片，请结合图片视觉内容和正文中的 [图片#] 占位符理解。` : "";
        const prompt = [
          "请基于以上要求，对下面的话题及其讨论回复进行总结。",
          topicTitle ? `话题标题：${topicTitle}` : `话题ID：${building}`,
          imageInstruction,
          "原文如下：",
          topicContent.contentText
        ].filter(Boolean).join("\n");
        const summary = await summarizeSomething2(prompt, {
          currentApi,
          imageInputs: imageContext.imageInputs,
          images: topicContent.images,
          skippedImages: [
            ...topicContent.skippedImages || [],
            ...imageContext.skippedImages || []
          ]
        });
        if (!summary) {
          throw new Error("API返回了空的总结内容");
        }
        if (retryAttempt > 0) {
          setTopicRetryVisualState(building, false);
        }
        return summary;
      } catch (error) {
        const currentApiConfig = currentApi;
        const retryCount = normalizeAutoRetryCount2(currentApiConfig && currentApiConfig.retryCount, state2.autoRetryCount);
        const retryInterval = normalizeAutoRetryInterval2(currentApiConfig && currentApiConfig.retryInterval, state2.autoRetryInterval);
        state2.autoRetryCount = retryCount;
        state2.autoRetryInterval = retryInterval;
        if (!isNonRetryableSummaryError(error) && retryAttempt < retryCount) {
          setTopicRetryVisualState(building, true);
          createToast2(`总结失败，正在尝试第 ${retryAttempt + 2}/${retryCount + 1} 次重试...`, "warning", null, building);
          await new Promise((resolve) => setTimeout(resolve, retryInterval * 1e3));
          return main(building, startFloor, endFloor, retryAttempt + 1, currentApi);
        }
        setTopicRetryVisualState(building, false);
        if (isNonRetryableSummaryError(error)) {
          throw error;
        }
        const finalError = new Error(`总结失败，已达到最大重试次数 (${retryCount + 1})。错误: ${error.message}`);
        finalError.cause = error;
        throw finalError;
      }
    }
    async function buildTopicQuestionContext(topicId, operationApi = null) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!normalizedTopicId) {
        throw new Error("Missing topicId");
      }
      const currentApi = operationApi || {
        ...typeof getCurrentApiConfiguration2 === "function" ? getCurrentApiConfiguration2() : {}
      };
      const topicTitle = typeof ensureTopicTitle2 === "function" ? await ensureTopicTitle2(normalizedTopicId) : getTopicTitle2?.(normalizedTopicId);
      const { startFloor, endFloor } = await getFullFloorRangeForTopic(
        normalizedTopicId,
        DEFAULT_FULL_FLOOR_END,
        currentApi
      );
      const topicContent = await buildTopicContentContext(
        normalizedTopicId,
        startFloor,
        endFloor,
        currentApi
      );
      if (!topicContent?.contentText) {
        throw new Error("未能获取到帖子内容");
      }
      const imageContext = await prepareTopicImagesForCurrentApi(topicContent, currentApi);
      return {
        topicId: normalizedTopicId,
        title: topicTitle || getTopicTitle2?.(normalizedTopicId) || "",
        contentText: topicContent.contentText,
        images: topicContent.images,
        skippedImages: [
          ...topicContent.skippedImages || [],
          ...imageContext.skippedImages || []
        ],
        imageInputs: imageContext.imageInputs
      };
    }
    async function handleFormSubmit2(event) {
      if (event && typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      const resultDiv = document.getElementById("summary-result");
      const historyDiv = document.getElementById("summary-history");
      const submitButton = document.getElementById("submit-button");
      const topicIdInput = document.getElementById("building");
      if (!resultDiv || !historyDiv || !submitButton || !topicIdInput) {
        console.error("Sidebar form elements not found!");
        return;
      }
      const topicId = normalizeTopicId4(topicIdInput.value);
      if (!topicId) {
        createToast2("无法获取当前主题ID！", "error");
        return;
      }
      if (state2.summarizingTopics.has(topicId)) {
        createToast2("该话题正在总结中，请稍候...", "info", null, topicId);
        showSummarizingInterface(resultDiv, topicId);
        historyDiv.style.display = "none";
        updateSidebarSubmitButtonState2(topicId);
        return;
      }
      const safeGetTopicHistory = () => {
        try {
          const history = getSummaryHistory2(topicId);
          return Array.isArray(history) ? history : [];
        } catch (error) {
          console.warn(`Failed to read local history for topic ${topicId}:`, error);
          return [];
        }
      };
      let localHistory = safeGetTopicHistory();
      const hasSummaryState = localHistory.length > 0 || isTopicMarkedSummarized2(topicId);
      const drivePullAllowed = state2.driveSummarySettings?.enabled && (typeof hasDriveSummaryCredentials2 !== "function" || hasDriveSummaryCredentials2());
      const hasManualFallbackArmed = pendingManualAfterDriveFailTopics2.has(topicId);
      if (!localHistory.length && hasSummaryState && drivePullAllowed && !hasManualFallbackArmed) {
        const pullResult = await ensureSidebarTopicHistoryFromDrive(topicId, {
          force: true,
          probeOnly: false
        });
        localHistory = safeGetTopicHistory();
        if (pullResult?.ok && localHistory.length > 0) {
          pendingManualAfterDriveFailTopics2.delete(topicId);
          if (typeof historyDiv.loadHistory === "function") {
            historyDiv.loadHistory(topicId);
          }
          autoShowHistoryIfExists2(topicId);
          updateSidebarSubmitButtonState2(topicId);
          return;
        }
        if (pullResult?.skipped && pullResult?.reason === "pull-in-flight") {
          updateSidebarSubmitButtonState2(topicId);
          return;
        }
        updateSidebarSubmitButtonState2(topicId);
      }
      if (hasManualFallbackArmed) {
        pendingManualAfterDriveFailTopics2.delete(topicId);
      }
      state2.summarizingTopics.add(topicId);
      updateSidebarSubmitButtonState2(topicId);
      resultDiv.innerHTML = "";
      const contentWrapper = document.createElement("div");
      contentWrapper.className = "summary-content-wrapper";
      contentWrapper.style.width = "100%";
      contentWrapper.style.position = "relative";
      const loadingIndicator = document.createElement("div");
      loadingIndicator.className = "loading-indicator";
      loadingIndicator.textContent = "正在生成总结，请稍候...";
      contentWrapper.appendChild(loadingIndicator);
      resultDiv.appendChild(contentWrapper);
      resultDiv.style.display = "flex";
      historyDiv.style.display = "none";
      const historyButton = document.getElementById("history-button");
      if (historyButton) historyButton.classList.remove("active");
      const summarizingToast = createSummarizingToast2(topicId);
      const requestContext = captureCurrentSummaryRequestContext2();
      const operationApi = {
        ...typeof getCurrentApiConfiguration2 === "function" ? getCurrentApiConfiguration2() : {}
      };
      try {
        let startFloor;
        let endFloor;
        const postIds = await fetchTopicPostIds(topicId, operationApi);
        if (!postIds || postIds.length === 0) {
          throw new Error("未能获取楼层信息");
        }
        ({ startFloor, endFloor } = getFullFloorRangeFromPostIds(postIds));
        if (Number.isNaN(startFloor) || Number.isNaN(endFloor)) {
          throw new Error("无法获取有效的楼层范围！");
        }
        if (endFloor < startFloor) {
          throw new Error("结束楼层不得小于起始楼层！");
        }
        const maxFloorRange = 1e4;
        if (endFloor - startFloor + 1 > maxFloorRange) {
          throw new Error(`楼层范围不能超过${maxFloorRange}楼！`);
        }
        const summary = await main(topicId, startFloor, endFloor, 0, operationApi);
        if (!summary) {
          throw new Error("生成总结失败 (空响应)");
        }
        displayResult(summary, requestContext);
        saveSummaryHistory2(topicId, summary, requestContext.model, requestContext);
        loadHistoryForCurrentTopic2();
        autoShowHistoryIfExists2(topicId);
        loadHistoryForCurrentTopic2();
        summarizingToast.changeType("success");
        summarizingToast.update("总结生成成功！");
        if (submitButton) {
          submitButton.classList.remove("summarizing");
          submitButton.classList.add("summarized");
          submitButton.textContent = "✅ 已总结";
          setTimeout(() => {
            updateSidebarSubmitButtonState2(topicId);
          }, 3e3);
        }
      } catch (error) {
        console.error("Summary failed:", error);
        const message = error?.message || String(error || "未知错误");
        displayError(`发生错误: ${message}`);
        summarizingToast.changeType("error");
        summarizingToast.update(`总结失败: ${message}`);
      } finally {
        state2.summarizingTopics.delete(topicId);
        updateTopicSummaryButtons?.(topicId);
        if (submitButton && !submitButton.classList.contains("summarized")) {
          updateSidebarSubmitButtonState2(topicId);
        }
        updateTopicSummaryButtons?.(topicId);
      }
    }
    async function attemptAutoSummarize2(topicId) {
      if (!state2.newTopicAutoSummarize) return;
      const { hasSummaryState } = getTopicSummaryState(topicId);
      if (hasSummaryState) {
        return;
      }
      if (state2.summarizingTopics.has(topicId)) {
        return;
      }
      getTopicTitle2?.(topicId);
      const summarizingToast = createSummarizingToast2(topicId);
      const requestContext = captureCurrentSummaryRequestContext2();
      const operationApi = {
        ...typeof getCurrentApiConfiguration2 === "function" ? getCurrentApiConfiguration2() : {}
      };
      state2.summarizingTopics.add(topicId);
      updateSidebarSubmitButtonState2(topicId);
      try {
        const { startFloor, endFloor } = await getFullFloorRangeForTopic(
          topicId,
          DEFAULT_FULL_FLOOR_END,
          operationApi
        );
        const summary = await main(topicId, startFloor, endFloor, 0, operationApi);
        summarizingToast.changeType("success");
        summarizingToast.update("话题自动总结完成！");
        saveSummaryHistory2(topicId, summary, requestContext.model, requestContext);
        pendingManualAfterDriveFailTopics2.delete(topicId);
        loadHistoryForCurrentTopic2();
        autoShowHistoryIfExists2(topicId);
        if (document.getElementById("building")?.value === topicId) {
          loadHistoryForCurrentTopic2();
        }
      } catch (error) {
        console.error(`Auto summarize error for topic ${topicId}:`, error);
        summarizingToast.changeType("error");
        summarizingToast.update(`自动总结失败: ${error.message}`);
        if (document.getElementById("building")?.value === topicId) {
          displayError(`自动总结失败: ${error.message}`);
        }
      } finally {
        state2.summarizingTopics.delete(topicId);
        updateTopicSummaryButtons?.(topicId);
        updateSidebarSubmitButtonState2(topicId);
        updateTopicSummaryButtons?.(topicId);
      }
    }
    async function ensureSidebarTopicHistoryFromDrive(topicId, {
      force = false,
      probeOnly = false
    } = {}) {
      const normalizedTopicId = normalizeTopicId4(topicId);
      if (!normalizedTopicId) return { ok: false, skipped: true, reason: "invalid-topic-id" };
      if (typeof pullTopicHistoryFromDrive2 !== "function") {
        return { ok: false, skipped: true, reason: "drive-api-unavailable" };
      }
      if (!canAttemptDrivePull()) {
        return {
          ok: false,
          skipped: true,
          reason: state2.driveSummarySettings?.enabled ? "drive-credentials-missing" : "drive-disabled"
        };
      }
      const localHistory = getSummaryHistory2(normalizedTopicId);
      const hasLocalHistory = localHistory.length > 0;
      if (hasLocalHistory && !force) {
        return { ok: true, skipped: true, reason: "local-history-exists" };
      }
      if (probeOnly) {
        if (!state2.driveSummarySettings?.enabled) {
          return { ok: false, skipped: true, reason: "drive-disabled" };
        }
        if (typeof hasDriveSummaryCredentials2 === "function" && !hasDriveSummaryCredentials2()) {
          return { ok: false, skipped: true, reason: "drive-credentials-missing" };
        }
      }
      if (sidebarDriveHistoryPullingTopics.has(normalizedTopicId)) {
        return { ok: false, skipped: true, reason: "pull-in-flight" };
      }
      sidebarDriveHistoryPullingTopics.add(normalizedTopicId);
      const resultDiv = document.getElementById("summary-result");
      const historyDiv = document.getElementById("summary-history");
      const historyButton = document.getElementById("history-button");
      const submitButton = document.getElementById("submit-button");
      const shouldShowPullUi = !probeOnly && !hasLocalHistory;
      const shouldToastPullResult = !probeOnly && !hasLocalHistory;
      if (shouldShowPullUi && resultDiv && historyDiv) {
        const loadingHtml = '<div class="summary-content-wrapper"><div class="loading-indicator">正在从 Drive 拉取总结，请稍候...</div></div>';
        setSummaryElementHtml2(resultDiv, loadingHtml, { preserveSelection: false });
        resultDiv.style.display = "flex";
        historyDiv.style.display = "none";
        if (historyButton) {
          historyButton.classList.remove("active");
          historyButton.style.backgroundColor = "";
          historyButton.style.color = "";
        }
      }
      if (shouldShowPullUi && submitButton && !state2.summarizingTopics.has(normalizedTopicId)) {
        submitButton.disabled = true;
        submitButton.classList.add("summarizing");
        submitButton.classList.remove("summarized");
        submitButton.textContent = "☁️ 拉取中...";
      }
      try {
        const pullResult = await pullTopicHistoryFromDrive2(normalizedTopicId, {
          silent: true,
          suppressStatus: probeOnly || hasLocalHistory,
          mergeWithLocal: force === true
        });
        if (pullResult.ok && Array.isArray(pullResult.history) && pullResult.history.length > 0) {
          const refreshedHistory = getSummaryHistory2(normalizedTopicId);
          updateTopicSummaryButtons?.(normalizedTopicId);
          if (historyDiv && typeof historyDiv.loadHistory === "function" && refreshedHistory.length > 0) {
            try {
              historyDiv.loadHistory(normalizedTopicId);
            } catch (error) {
              console.warn(`Failed to load sidebar history for topic ${normalizedTopicId}:`, error);
            }
          }
          autoShowHistoryIfExists2(normalizedTopicId);
          if (shouldToastPullResult) {
            createToast2("已从 Drive 拉取该话题总结。", "success", 2400, normalizedTopicId);
          }
          return {
            ok: true,
            pulled: true,
            history: refreshedHistory.length > 0 ? refreshedHistory : pullResult.history
          };
        }
        const reason = pullResult?.error?.message || "未知错误";
        if (shouldShowPullUi && resultDiv) {
          const errorHtml = `<div class="summary-content-wrapper"><div class="error-message" style="padding: 10px;">Drive 拉取失败：${reason}<br>点击“⚡ 总结”可手动重新生成。</div></div>`;
          setSummaryElementHtml2(resultDiv, errorHtml, { preserveSelection: false });
          resultDiv.style.display = "flex";
        }
        if (shouldToastPullResult) {
          createToast2(`Drive 拉取失败：${reason}。可点击“⚡ 总结”手动重新生成。`, "warning", null, normalizedTopicId);
        }
        return { ok: false, pulled: false, error: pullResult?.error || new Error(reason) };
      } catch (error) {
        const reason = error?.message || String(error);
        if (shouldShowPullUi && resultDiv) {
          const errorHtml = `<div class="summary-content-wrapper"><div class="error-message" style="padding: 10px;">Drive 拉取失败：${reason}<br>点击“⚡ 总结”可手动重新生成。</div></div>`;
          setSummaryElementHtml2(resultDiv, errorHtml, { preserveSelection: false });
          resultDiv.style.display = "flex";
        }
        if (shouldToastPullResult) {
          createToast2(`Drive 拉取失败：${reason}。可点击“⚡ 总结”手动重新生成。`, "warning", null, normalizedTopicId);
        }
        return { ok: false, pulled: false, error };
      } finally {
        sidebarDriveHistoryPullingTopics.delete(normalizedTopicId);
        updateSidebarSubmitButtonState2(normalizedTopicId);
      }
    }
    async function loadHistoryForCurrentTopic2(options = {}) {
      const forceDrivePull = options.forceDrivePull === true;
      const requestedTopicId = normalizeTopicId4(options.topicId);
      const topicIdInput = document.getElementById("building");
      const topicIdFromInput = topicIdInput ? normalizeTopicId4(topicIdInput.value) : "";
      const topicId = requestedTopicId || topicIdFromInput;
      if (!topicId) return;
      if (topicIdInput && topicIdInput.value !== topicId) {
        topicIdInput.value = topicId;
      }
      const onTopicPage = typeof isTopicPageUrl2 === "function" ? isTopicPageUrl2(state2.currentPageUrl) : /\/t\/topic\/\d+/.test(window.location.href);
      if (!onTopicPage) return;
      const activeTopicId = typeof extractTopicId2 === "function" ? normalizeTopicId4(extractTopicId2()) : "";
      if (activeTopicId && activeTopicId !== topicId) return;
      const historyDiv = document.getElementById("summary-history");
      if (!(historyDiv && typeof historyDiv.loadHistory === "function")) {
        console.warn("History div or loadHistory method not found.");
        return;
      }
      const safeGetTopicHistory = () => {
        try {
          const history = getSummaryHistory2(topicId);
          return Array.isArray(history) ? history : [];
        } catch (error) {
          console.warn(`Failed to read history for topic ${topicId}:`, error);
          return [];
        }
      };
      let localHistory = safeGetTopicHistory();
      const hasLocalHistory = localHistory.length > 0;
      const hasSummaryState = hasLocalHistory || isTopicMarkedSummarized2(topicId);
      const shouldTryDrivePull = canAttemptDrivePull() && shouldAttemptTopicHistoryDrivePull2({
        hasLocalHistory,
        hasSummaryState,
        forceDrivePull
      });
      if (shouldTryDrivePull) {
        try {
          await ensureSidebarTopicHistoryFromDrive(topicId, {
            force: forceDrivePull,
            probeOnly: !hasSummaryState && !forceDrivePull
          });
        } catch (error) {
          console.warn(`Drive pull failed while loading topic ${topicId} history:`, error);
        }
        localHistory = safeGetTopicHistory();
      }
      try {
        historyDiv.loadHistory(topicId);
      } catch (error) {
        console.warn(`History panel render failed for topic ${topicId}.`, error);
      }
      updateSidebarSubmitButtonState2(topicId);
      return {
        topicId,
        hasLocalHistory: localHistory.length > 0,
        hasSummaryState
      };
    }
    return {
      handleFormSubmit: handleFormSubmit2,
      loadHistoryForCurrentTopic: loadHistoryForCurrentTopic2,
      attemptAutoSummarize: attemptAutoSummarize2,
      updateSidebarSubmitButtonState: updateSidebarSubmitButtonState2,
      getFullFloorRangeForTopic,
      fetchTopicPostIds,
      getFullFloorRangeFromPostIds,
      main,
      buildTopicContentContext,
      buildTopicQuestionContext,
      ensureSidebarTopicHistoryFromDrive,
      displayError
    };
  }

  // src/features/driveSummary/index.js
  function createLatestValueProxy(getter) {
    return new Proxy({}, {
      get(_target, property) {
        const current = typeof getter === "function" ? getter() : null;
        return current?.[property];
      },
      has(_target, property) {
        const current = typeof getter === "function" ? getter() : null;
        return Reflect.has(current || {}, property);
      },
      ownKeys() {
        const current = typeof getter === "function" ? getter() : null;
        return Reflect.ownKeys(current || {});
      },
      getOwnPropertyDescriptor(_target, property) {
        const current = typeof getter === "function" ? getter() : null;
        const descriptor = Object.getOwnPropertyDescriptor(current || {}, property);
        return descriptor ? { ...descriptor, configurable: true } : void 0;
      }
    });
  }
  var DRIVE_DEARROW_STORAGE_VERSION = 1;
  function normalizeDriveDeArrowTimestamp(value) {
    const text = value === null || value === void 0 ? "" : String(value).trim();
    if (!text) return "";
    const parsed = Date.parse(text);
    return Number.isFinite(parsed) ? new Date(parsed).toISOString() : "";
  }
  function createDriveDeArrowSafetyError(message, code = "DRIVE_DEARROW_INVALID_STATE") {
    const error = new Error(message);
    error.code = code;
    error.retryable = false;
    return error;
  }
  function normalizeDriveDeArrowTopicStates(rawStates) {
    return normalizeDeArrowTopicStates(rawStates);
  }
  function mergeDriveDeArrowTopicStates(leftStates, rightStates) {
    return mergeDeArrowTopicStates(leftStates, rightStates);
  }
  function normalizeDriveDeArrowPayload(rawPayload, {
    storageVersion = DRIVE_DEARROW_STORAGE_VERSION,
    normalizeTopicStates = normalizeDriveDeArrowTopicStates
  } = {}) {
    if (!rawPayload || typeof rawPayload !== "object" || Array.isArray(rawPayload)) {
      throw createDriveDeArrowSafetyError("Drive DeArrow state must be a JSON object.");
    }
    const parsedVersion = Number(rawPayload.version);
    if (!Number.isInteger(parsedVersion) || parsedVersion < 1) {
      throw createDriveDeArrowSafetyError("Drive DeArrow state has an invalid or missing version.");
    }
    if (parsedVersion > storageVersion) {
      throw createDriveDeArrowSafetyError(
        `Drive DeArrow state version ${parsedVersion} is newer than supported version ${storageVersion}; refusing to overwrite it.`,
        "DRIVE_DEARROW_FUTURE_VERSION"
      );
    }
    const rawTopics = rawPayload.topics ?? rawPayload.states;
    if (!rawTopics || typeof rawTopics !== "object" || Array.isArray(rawTopics)) {
      throw createDriveDeArrowSafetyError("Drive DeArrow state is missing a valid topics map.");
    }
    return {
      version: storageVersion,
      updatedAt: normalizeDriveDeArrowTimestamp(rawPayload.updatedAt),
      topics: normalizeTopicStates(rawTopics)
    };
  }
  function createDriveSummaryFeature(deps = {}) {
    const {
      getDriveSummarySettings,
      getDriveSummaryDirtyTopicIds,
      setDriveSummaryDirtyTopicIds,
      loadTopicIdSetFromStorage: loadTopicIdSetFromStorage2,
      serializeTopicIdsForStorage: serializeTopicIdsForStorage2,
      createSettingsToast: createSettingsToast2,
      getSummaryHistoryMapSnapshot: getSummaryHistoryMapSnapshot2,
      setSummaryHistoryMapSnapshot: setSummaryHistoryMapSnapshot2,
      getTopicQuestionHistoryMapSnapshot: getTopicQuestionHistoryMapSnapshot2,
      setTopicQuestionHistoryMapSnapshot: setTopicQuestionHistoryMapSnapshot2,
      getDeArrowTopicStates: injectedGetDeArrowTopicStates,
      setDeArrowTopicStates: injectedSetDeArrowTopicStates,
      normalizeDeArrowTopicStates: injectedNormalizeDeArrowTopicStates,
      mergeDeArrowTopicStates: injectedMergeDeArrowTopicStates,
      replaceSummaryTopicIdsFromHistoryMap: replaceSummaryTopicIdsFromHistoryMap2,
      syncSummaryTopicIdsFromSources: syncSummaryTopicIdsFromSources2,
      markTopicSummarized: markTopicSummarized2,
      trimSummaryHistoryToLatestTopics: trimSummaryHistoryToLatestTopics2,
      updateAllSummaryButtonsAndContainers,
      scheduleListSummaryRefresh: scheduleListSummaryRefresh2,
      addTopicListSummaryButtons,
      restoreExpandedSummaryRows,
      DRIVE_SUMMARY_DIRTY_TOPIC_IDS_KEY: DRIVE_SUMMARY_DIRTY_TOPIC_IDS_KEY2 = "summaryDriveDirtyTopicIds",
      DRIVE_SUMMARY_FOLDER_NAME = "[LINUX DO] 🌟 话题 & 回复 总结",
      DRIVE_SUMMARY_FILENAME = "总结内容 - [LINUX DO] 🌟 主题 & 回复 总结.json",
      DRIVE_SUMMARY_INDEX_FILENAME = "summary-index.v2.json",
      DRIVE_SUMMARY_TOPICS_FOLDER_NAME = "topics",
      DRIVE_SUMMARY_STORAGE_VERSION = 3,
      DRIVE_DEARROW_FILENAME = "dearrow-state.v1.json",
      DRIVE_DEARROW_STORAGE_VERSION: driveDeArrowStorageVersion = DRIVE_DEARROW_STORAGE_VERSION,
      DRIVE_DEARROW_DIRTY_KEY = "dearrowDriveDirty",
      DRIVE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token",
      DRIVE_TOKEN_ENDPOINT_FALLBACKS = [
        "https://www.googleapis.com/oauth2/v4/token",
        "https://www.googleapis.cn/oauth2/v4/token"
      ],
      DRIVE_FILES_ENDPOINT = "https://www.googleapis.com/drive/v3/files",
      DRIVE_FILES_ENDPOINT_FALLBACKS = [
        "https://content.googleapis.com/drive/v3/files",
        "https://www.googleapis.cn/drive/v3/files"
      ],
      DRIVE_UPLOAD_ENDPOINT = "https://www.googleapis.com/upload/drive/v3/files",
      DRIVE_UPLOAD_ENDPOINT_FALLBACKS = [
        "https://content.googleapis.com/upload/drive/v3/files",
        "https://www.googleapis.cn/upload/drive/v3/files"
      ],
      DRIVE_SUMMARY_TOPIC_LIMIT = 100
    } = deps;
    const getDeArrowTopicStates = typeof injectedGetDeArrowTopicStates === "function" ? injectedGetDeArrowTopicStates : typeof deps.getTopicStates === "function" ? deps.getTopicStates : typeof deps.getDeArrowTopicStatesSnapshot === "function" ? deps.getDeArrowTopicStatesSnapshot : () => gmGetValue("dearrowTopicStates", {});
    const setDeArrowTopicStates = typeof injectedSetDeArrowTopicStates === "function" ? injectedSetDeArrowTopicStates : typeof deps.setTopicStates === "function" ? deps.setTopicStates : typeof deps.setDeArrowTopicStatesSnapshot === "function" ? deps.setDeArrowTopicStatesSnapshot : (nextStates) => gmSetValue("dearrowTopicStates", nextStates);
    const normalizeDeArrowTopicStates2 = typeof injectedNormalizeDeArrowTopicStates === "function" ? injectedNormalizeDeArrowTopicStates : normalizeDriveDeArrowTopicStates;
    const mergeDeArrowTopicStates2 = typeof injectedMergeDeArrowTopicStates === "function" ? injectedMergeDeArrowTopicStates : mergeDriveDeArrowTopicStates;
    const driveSummarySettings2 = createLatestValueProxy(getDriveSummarySettings);
    let driveSummaryDirtyTopicIds2 = typeof getDriveSummaryDirtyTopicIds === "function" ? getDriveSummaryDirtyTopicIds() : null;
    let driveSummaryAccessToken = "";
    let driveSummaryAccessTokenExpireAt = 0;
    let driveSummarySyncTimer = null;
    let driveSummarySyncInFlight = false;
    let driveSummarySyncQueued = false;
    let driveSummaryQueuedReason = "auto";
    let driveSummaryRebuildInFlight = false;
    let driveSummaryRootFolderIdCache = "";
    let driveSummaryTopicsFolderIdCache = "";
    let driveSummaryTopicsFolderParentIdCache = "";
    let driveDeArrowDirtyLoaded = false;
    let driveDeArrowDirty = false;
    let driveDeArrowDirtyRevision = 0;
    let driveDeArrowPullAttempted = false;
    let driveDeArrowPullPromise = null;
    const DRIVE_SYNC_REASON_PRIORITY = {
      auto: 1,
      queued: 2,
      import: 3,
      manual: 4
    };
    function normalizeDriveSyncReason(reason) {
      const text = String(reason || "").trim();
      if (Object.prototype.hasOwnProperty.call(DRIVE_SYNC_REASON_PRIORITY, text)) {
        return text;
      }
      return "auto";
    }
    function mergeDriveSyncReason(currentReason, nextReason) {
      const current = normalizeDriveSyncReason(currentReason);
      const next = normalizeDriveSyncReason(nextReason);
      if ((DRIVE_SYNC_REASON_PRIORITY[next] || 0) >= (DRIVE_SYNC_REASON_PRIORITY[current] || 0)) {
        return next;
      }
      return current;
    }
    function resetDriveSummaryAuthCache2() {
      driveSummaryAccessToken = "";
      driveSummaryAccessTokenExpireAt = 0;
      driveSummaryRootFolderIdCache = "";
      driveSummaryTopicsFolderIdCache = "";
      driveSummaryTopicsFolderParentIdCache = "";
      driveDeArrowPullAttempted = false;
      driveDeArrowPullPromise = null;
    }
    function resetDriveDeArrowPullState2() {
      driveDeArrowPullAttempted = false;
      driveDeArrowPullPromise = null;
    }
    function hasDriveSummaryCredentials2(settings = driveSummarySettings2) {
      return Boolean(settings.clientId && settings.clientSecret && settings.refreshToken);
    }
    function ensureDriveSummaryDirtySet() {
      if (!(driveSummaryDirtyTopicIds2 instanceof Set)) {
        driveSummaryDirtyTopicIds2 = loadTopicIdSetFromStorage2(DRIVE_SUMMARY_DIRTY_TOPIC_IDS_KEY2, []);
        if (typeof setDriveSummaryDirtyTopicIds === "function") {
          setDriveSummaryDirtyTopicIds(driveSummaryDirtyTopicIds2);
        }
      }
      return driveSummaryDirtyTopicIds2;
    }
    function persistDriveSummaryDirtyTopicIds() {
      const serialized = serializeTopicIdsForStorage2(ensureDriveSummaryDirtySet());
      gmSetValue(DRIVE_SUMMARY_DIRTY_TOPIC_IDS_KEY2, serialized);
      return serialized;
    }
    function markDriveSummaryTopicDirty2(topicId) {
      const normalizedTopicId = normalizeSummaryTopicId(topicId);
      if (!normalizedTopicId) return false;
      const dirtySet = ensureDriveSummaryDirtySet();
      const beforeSize = dirtySet.size;
      dirtySet.add(normalizedTopicId);
      const changed = dirtySet.size !== beforeSize;
      if (changed) {
        persistDriveSummaryDirtyTopicIds();
      }
      return changed;
    }
    function markDriveSummaryTopicsDirty2(topicIds) {
      if (!topicIds) return 0;
      let values = [];
      if (typeof topicIds === "string") {
        values = [topicIds];
      } else if (Array.isArray(topicIds)) {
        values = topicIds;
      } else if (topicIds instanceof Set) {
        values = Array.from(topicIds);
      } else if (typeof topicIds[Symbol.iterator] === "function") {
        values = Array.from(topicIds);
      }
      let changed = 0;
      const dirtySet = ensureDriveSummaryDirtySet();
      values.forEach((topicId) => {
        const normalizedTopicId = normalizeSummaryTopicId(topicId);
        if (!normalizedTopicId) return;
        const beforeSize = dirtySet.size;
        dirtySet.add(normalizedTopicId);
        if (dirtySet.size !== beforeSize) {
          changed += 1;
        }
      });
      if (changed > 0) {
        persistDriveSummaryDirtyTopicIds();
      }
      return changed;
    }
    function clearDriveSummaryTopicsDirty2(topicIds) {
      if (!topicIds) return 0;
      let values = [];
      if (typeof topicIds === "string") {
        values = [topicIds];
      } else if (Array.isArray(topicIds)) {
        values = topicIds;
      } else if (topicIds instanceof Set) {
        values = Array.from(topicIds);
      } else if (typeof topicIds[Symbol.iterator] === "function") {
        values = Array.from(topicIds);
      }
      const dirtySet = ensureDriveSummaryDirtySet();
      let changed = 0;
      values.forEach((topicId) => {
        const normalizedTopicId = normalizeSummaryTopicId(topicId);
        if (!normalizedTopicId) return;
        if (dirtySet.delete(normalizedTopicId)) {
          changed += 1;
        }
      });
      if (changed > 0) {
        persistDriveSummaryDirtyTopicIds();
      }
      return changed;
    }
    function ensureDriveDeArrowDirtyState() {
      if (!driveDeArrowDirtyLoaded) {
        driveDeArrowDirty = gmGetValue(DRIVE_DEARROW_DIRTY_KEY, false) === true;
        driveDeArrowDirtyLoaded = true;
      }
      return driveDeArrowDirty;
    }
    function persistDriveDeArrowDirtyState() {
      gmSetValue(DRIVE_DEARROW_DIRTY_KEY, driveDeArrowDirty === true);
    }
    function isDriveDeArrowDirty() {
      return ensureDriveDeArrowDirtyState();
    }
    function markDriveDeArrowDirty2({ schedule = true } = {}) {
      ensureDriveDeArrowDirtyState();
      driveDeArrowDirty = true;
      driveDeArrowDirtyRevision += 1;
      persistDriveDeArrowDirtyState();
      if (schedule) {
        scheduleDriveSummarySync2("auto");
      }
      return driveDeArrowDirtyRevision;
    }
    function clearDriveDeArrowDirty(expectedRevision = null) {
      ensureDriveDeArrowDirtyState();
      if (expectedRevision !== null && expectedRevision !== driveDeArrowDirtyRevision) {
        return false;
      }
      if (!driveDeArrowDirty) return false;
      driveDeArrowDirty = false;
      persistDriveDeArrowDirtyState();
      return true;
    }
    function readLocalDeArrowTopicStates() {
      return normalizeDeArrowTopicStates2(getDeArrowTopicStates() || {});
    }
    function writeLocalDeArrowTopicStates(nextStates, meta = {}) {
      const normalized = normalizeDeArrowTopicStates2(nextStates || {});
      setDeArrowTopicStates(normalized, {
        source: "drive",
        skipDriveSync: true,
        ...meta
      });
      return normalized;
    }
    function setDriveSummaryStatus(type, message) {
      const statusEl = document.getElementById("drive-summary-status");
      if (!statusEl) return;
      statusEl.textContent = message || "";
      statusEl.classList.remove("success", "error", "warning", "info");
      if (type) statusEl.classList.add(type);
    }
    function syncDriveSummarySettingsUI2() {
      const container = document.getElementById("drive-settings");
      if (!container) return;
      const enabledInput = container.querySelector("#drive-summary-enabled");
      const clientIdInput = container.querySelector("#drive-summary-client-id");
      const clientSecretInput = container.querySelector("#drive-summary-client-secret");
      const refreshTokenInput = container.querySelector("#drive-summary-refresh-token");
      if (enabledInput) enabledInput.checked = driveSummarySettings2.enabled === true;
      if (clientIdInput) clientIdInput.value = driveSummarySettings2.clientId || "";
      if (clientSecretInput) clientSecretInput.value = driveSummarySettings2.clientSecret || "";
      if (refreshTokenInput) refreshTokenInput.value = driveSummarySettings2.refreshToken || "";
      updateDriveSummaryStatusHint2();
    }
    function updateDriveSummaryStatusHint2() {
      if (!driveSummarySettings2.enabled) {
        setDriveSummaryStatus("", "");
        return;
      }
      if (!hasDriveSummaryCredentials2()) {
        setDriveSummaryStatus("error", "Drive 凭据未填写完整。");
        return;
      }
      setDriveSummaryStatus("success", "已启用自动同步。");
    }
    const resolveDriveSummaryRequest = () => {
      try {
        if (typeof GM_xmlhttpRequest === "function") {
          return GM_xmlhttpRequest;
        }
        if (typeof GM !== "undefined" && GM) {
          if (typeof GM.xmlHttpRequest === "function") {
            return GM.xmlHttpRequest.bind(GM);
          }
          if (typeof GM.xmlhttpRequest === "function") {
            return GM.xmlhttpRequest.bind(GM);
          }
        }
        if (typeof unsafeWindow !== "undefined" && typeof unsafeWindow.GM_xmlhttpRequest === "function") {
          return unsafeWindow.GM_xmlhttpRequest;
        }
        if (typeof unsafeWindow !== "undefined" && unsafeWindow?.GM) {
          if (typeof unsafeWindow.GM.xmlHttpRequest === "function") {
            return unsafeWindow.GM.xmlHttpRequest.bind(unsafeWindow.GM);
          }
          if (typeof unsafeWindow.GM.xmlhttpRequest === "function") {
            return unsafeWindow.GM.xmlhttpRequest.bind(unsafeWindow.GM);
          }
        }
        if (typeof window !== "undefined" && typeof window.GM_xmlhttpRequest === "function") {
          return window.GM_xmlhttpRequest;
        }
        if (typeof window !== "undefined" && window?.GM) {
          if (typeof window.GM.xmlHttpRequest === "function") {
            return window.GM.xmlHttpRequest.bind(window.GM);
          }
          if (typeof window.GM.xmlhttpRequest === "function") {
            return window.GM.xmlhttpRequest.bind(window.GM);
          }
        }
        if (typeof gmXmlhttpRequest === "function") {
          return gmXmlhttpRequest;
        }
      } catch (_2) {
      }
      return null;
    };
    const resolveDriveSummaryFetch = () => {
      try {
        if (typeof fetch === "function") {
          return fetch;
        }
        if (typeof globalThis !== "undefined" && typeof globalThis.fetch === "function") {
          return globalThis.fetch;
        }
        if (typeof window !== "undefined" && typeof window.fetch === "function") {
          return window.fetch.bind(window);
        }
      } catch (_2) {
      }
      return null;
    };
    const appendDriveRequestCandidate = (candidates, url) => {
      const normalized = typeof url === "string" ? url.trim() : "";
      if (!normalized) return;
      if (!candidates.includes(normalized)) {
        candidates.push(normalized);
      }
    };
    const buildDriveRequestUrlCandidates = (url) => {
      const normalizedUrl = typeof url === "string" ? url.trim() : "";
      const candidates = [];
      appendDriveRequestCandidate(candidates, normalizedUrl);
      if (!normalizedUrl) return candidates;
      const tokenFallbacks = Array.isArray(DRIVE_TOKEN_ENDPOINT_FALLBACKS) ? DRIVE_TOKEN_ENDPOINT_FALLBACKS : [];
      const filesFallbacks = Array.isArray(DRIVE_FILES_ENDPOINT_FALLBACKS) ? DRIVE_FILES_ENDPOINT_FALLBACKS : [];
      const uploadFallbacks = Array.isArray(DRIVE_UPLOAD_ENDPOINT_FALLBACKS) ? DRIVE_UPLOAD_ENDPOINT_FALLBACKS : [];
      if (typeof DRIVE_TOKEN_ENDPOINT === "string" && DRIVE_TOKEN_ENDPOINT && normalizedUrl.startsWith(DRIVE_TOKEN_ENDPOINT)) {
        const suffix = normalizedUrl.slice(DRIVE_TOKEN_ENDPOINT.length);
        tokenFallbacks.forEach((baseUrl) => {
          appendDriveRequestCandidate(candidates, `${baseUrl}${suffix}`);
        });
      }
      if (typeof DRIVE_FILES_ENDPOINT === "string" && DRIVE_FILES_ENDPOINT && normalizedUrl.startsWith(DRIVE_FILES_ENDPOINT)) {
        const suffix = normalizedUrl.slice(DRIVE_FILES_ENDPOINT.length);
        filesFallbacks.forEach((baseUrl) => {
          appendDriveRequestCandidate(candidates, `${baseUrl}${suffix}`);
        });
      }
      if (typeof DRIVE_UPLOAD_ENDPOINT === "string" && DRIVE_UPLOAD_ENDPOINT && normalizedUrl.startsWith(DRIVE_UPLOAD_ENDPOINT)) {
        const suffix = normalizedUrl.slice(DRIVE_UPLOAD_ENDPOINT.length);
        uploadFallbacks.forEach((baseUrl) => {
          appendDriveRequestCandidate(candidates, `${baseUrl}${suffix}`);
        });
      }
      return candidates;
    };
    const formatDriveRequestTransportError = (error) => {
      if (!error) return "Unknown error";
      if (typeof error === "string") return error;
      if (error && typeof error === "object") {
        const pieces = [];
        if (Number.isFinite(Number(error.status))) {
          pieces.push(`status=${Number(error.status)}`);
        }
        if (typeof error.statusText === "string" && error.statusText.trim()) {
          pieces.push(`statusText=${error.statusText.trim()}`);
        }
        if (typeof error.finalUrl === "string" && error.finalUrl.trim()) {
          pieces.push(`url=${error.finalUrl.trim()}`);
        }
        if (typeof error.error === "string" && error.error.trim()) {
          pieces.push(`error=${error.error.trim()}`);
        }
        if (typeof error.message === "string" && error.message.trim()) {
          pieces.push(`message=${error.message.trim()}`);
        }
        if (pieces.length > 0) {
          return pieces.join(", ");
        }
      }
      if (error?.error && typeof error.error === "string") return error.error;
      if (error?.message && typeof error.message === "string") return error.message;
      try {
        return JSON.stringify(error);
      } catch (_2) {
        return String(error);
      }
    };
    const performDriveSummaryRequest = async ({ method = "GET", url, headers, body } = {}) => {
      const gmRequest = resolveDriveSummaryRequest();
      const fetchApi = resolveDriveSummaryFetch();
      const isBinary = body && typeof body !== "string";
      const preference = isBinary ? ["fetch", "gm"] : ["gm", "fetch"];
      const urlCandidates = buildDriveRequestUrlCandidates(url);
      let lastError = null;
      const transportErrors = [];
      for (const requestUrl of urlCandidates) {
        for (const transport of preference) {
          try {
            if (transport === "gm" && gmRequest) {
              const response = await new Promise((resolve, reject) => {
                let settled = false;
                const safeResolve = (payload) => {
                  if (settled) return;
                  settled = true;
                  resolve(payload);
                };
                const safeReject = (error) => {
                  if (settled) return;
                  settled = true;
                  reject(error);
                };
                const options = {
                  method,
                  url: requestUrl,
                  headers,
                  anonymous: true,
                  timeout: 2e4,
                  onload: (res) => {
                    safeResolve({
                      status: res.status,
                      responseText: res.responseText || ""
                    });
                  },
                  onerror: (err) => {
                    const message = formatDriveRequestTransportError(err);
                    safeReject(new Error(message));
                  },
                  onabort: (err) => {
                    const message = formatDriveRequestTransportError(err) || "Request aborted";
                    safeReject(new Error(message));
                  },
                  ontimeout: (err) => {
                    const message = formatDriveRequestTransportError(err) || "Request timeout";
                    safeReject(new Error(message));
                  }
                };
                if (body !== void 0 && body !== null) {
                  options.data = body;
                  if (isBinary) {
                    options.binary = true;
                  }
                }
                const maybePromise = gmRequest(options);
                if (maybePromise && typeof maybePromise.then === "function") {
                  maybePromise.then((res) => {
                    safeResolve({
                      status: res?.status || 0,
                      responseText: res?.responseText || ""
                    });
                  }).catch((err) => {
                    const message = formatDriveRequestTransportError(err);
                    safeReject(new Error(message));
                  });
                }
              });
              return response;
            }
            if (transport === "fetch" && fetchApi) {
              const response = await fetchApi(requestUrl, {
                method,
                headers,
                body,
                credentials: "omit",
                mode: "cors",
                cache: "no-store"
              });
              return {
                status: response.status,
                responseText: await response.text()
              };
            }
          } catch (error) {
            const detail = formatDriveRequestTransportError(error);
            transportErrors.push(`${transport}@${requestUrl}: ${detail}`);
            lastError = error;
          }
        }
      }
      if (transportErrors.length > 0) {
        throw new Error(`Drive request failed (${method} ${url}): ${transportErrors.join(" | ")}`);
      }
      throw lastError || new Error("No request API available for Drive sync.");
    };
    const refreshDriveSummaryAccessToken = async () => {
      const body = [
        ["client_id", driveSummarySettings2.clientId],
        ["client_secret", driveSummarySettings2.clientSecret],
        ["refresh_token", driveSummarySettings2.refreshToken],
        ["grant_type", "refresh_token"]
      ].map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value || ""))}`).join("&");
      let response;
      try {
        response = await performDriveSummaryRequest({
          method: "POST",
          url: DRIVE_TOKEN_ENDPOINT,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body
        });
      } catch (error) {
        throw new Error(`Drive token request failed: ${error?.message || String(error)}`);
      }
      const text = response.responseText || "";
      let json = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch (error) {
        throw new Error(`Drive token parse failed: ${error?.message || String(error)}`);
      }
      if (response.status >= 200 && response.status < 300) {
        if (json.error) {
          throw new Error(`Drive token error: ${JSON.stringify(json)}`);
        }
        return json;
      }
      throw new Error(`Drive token HTTP ${response.status}: ${text || "[empty response]"}`);
    };
    async function ensureDriveSummaryAccessToken() {
      const now = Date.now();
      if (driveSummaryAccessToken && now < driveSummaryAccessTokenExpireAt - 6e4) {
        return driveSummaryAccessToken;
      }
      const tokenPayload = await refreshDriveSummaryAccessToken();
      driveSummaryAccessToken = tokenPayload.access_token;
      const expiresIn = Number(tokenPayload.expires_in) || 3600;
      driveSummaryAccessTokenExpireAt = now + expiresIn * 1e3;
      return driveSummaryAccessToken;
    }
    const formatDriveSummaryError = (error) => {
      if (!error) return "Unknown error";
      if (typeof error === "string") return error;
      if (error?.message) return error.message;
      try {
        return JSON.stringify(error);
      } catch {
        return String(error);
      }
    };
    const escapeDriveSummaryQueryValue = (value) => String(value || "").replace(/\\/g, "\\\\").replace(/'/g, "\\'");
    const createDriveSummaryFolder = async (folderName, parentId) => {
      const token = await ensureDriveSummaryAccessToken();
      const metadata = {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder"
      };
      if (parentId) {
        metadata.parents = [parentId];
      }
      const response = await performDriveSummaryRequest({
        method: "POST",
        url: DRIVE_FILES_ENDPOINT,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(metadata)
      });
      const text = response.responseText || "";
      let json = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch (error) {
        throw new Error(`Drive folder parse failed: ${error?.message || String(error)}`);
      }
      if (response.status >= 200 && response.status < 300) {
        if (json.id) return json.id;
        throw new Error(`Drive folder create failed: ${text || "[empty response]"}`);
      }
      throw new Error(`Drive folder HTTP ${response.status}: ${text || "[empty response]"}`);
    };
    const findDriveSummaryFolderId = async (folderName, parentId) => {
      const token = await ensureDriveSummaryAccessToken();
      const escaped = escapeDriveSummaryQueryValue(folderName);
      const parentFilter = parentId ? ` and '${escapeDriveSummaryQueryValue(parentId)}' in parents` : "";
      const query = encodeURIComponent(`name='${escaped}' and mimeType='application/vnd.google-apps.folder' and trashed=false${parentFilter}`);
      const response = await performDriveSummaryRequest({
        method: "GET",
        url: `${DRIVE_FILES_ENDPOINT}?q=${query}&fields=files(id,name)&spaces=drive`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const text = response.responseText || "";
      let json = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch (error) {
        throw new Error(`Drive folder lookup parse failed: ${error?.message || String(error)}`);
      }
      if (response.status >= 200 && response.status < 300) {
        const files = Array.isArray(json.files) ? json.files : [];
        return selectUniqueDriveEntryId(files, {
          itemLabel: "文件夹",
          itemName: folderName
        });
      }
      throw new Error(`Drive folder lookup HTTP ${response.status}: ${text || "[empty response]"}`);
    };
    const ensureDriveSummaryFolder = async (folderName, parentId) => {
      const existingId = await findDriveSummaryFolderId(folderName, parentId);
      if (existingId) return existingId;
      return createDriveSummaryFolder(folderName, parentId);
    };
    const sortTopicIds = (topicIds) => (Array.isArray(topicIds) ? topicIds : []).slice().sort((a, b2) => {
      const na = Number(a);
      const nb = Number(b2);
      if (Number.isFinite(na) && Number.isFinite(nb)) return na - nb;
      return String(a).localeCompare(String(b2));
    });
    const normalizeIsoTimestamp = (value, fallback = "") => {
      const text = value === null || value === void 0 ? "" : String(value).trim();
      if (!text) return fallback;
      const parsed = Date.parse(text);
      if (!Number.isFinite(parsed)) return fallback || text;
      return new Date(parsed).toISOString();
    };
    const buildDriveTopicFileName = (topicId) => `topic-${topicId}.json`;
    const findDriveFileIdByName = async (parentId, fileName) => {
      const token = await ensureDriveSummaryAccessToken();
      const escapedName = escapeDriveSummaryQueryValue(fileName);
      const parentFilter = parentId ? ` and '${escapeDriveSummaryQueryValue(parentId)}' in parents` : "";
      const query = encodeURIComponent(`name='${escapedName}' and trashed=false${parentFilter}`);
      const response = await performDriveSummaryRequest({
        method: "GET",
        url: `${DRIVE_FILES_ENDPOINT}?q=${query}&fields=files(id,name)&spaces=drive`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const text = response.responseText || "";
      let json = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch (error) {
        throw new Error(`Drive file lookup parse failed: ${error?.message || String(error)}`);
      }
      if (response.status >= 200 && response.status < 300) {
        const files = Array.isArray(json.files) ? json.files : [];
        return selectUniqueDriveEntryId(files, {
          itemLabel: "文件",
          itemName: fileName
        });
      }
      throw new Error(`Drive file lookup HTTP ${response.status}: ${text || "[empty response]"}`);
    };
    const findDriveSummaryFileId = async (folderId) => findDriveFileIdByName(folderId, DRIVE_SUMMARY_FILENAME);
    const listDriveFilesByParent = async (parentId) => {
      if (!parentId) return [];
      const token = await ensureDriveSummaryAccessToken();
      const escapedParentId = escapeDriveSummaryQueryValue(parentId);
      const query = encodeURIComponent(`'${escapedParentId}' in parents and trashed=false`);
      const files = [];
      let pageToken = "";
      do {
        const pageTokenQuery = pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : "";
        const response = await performDriveSummaryRequest({
          method: "GET",
          url: `${DRIVE_FILES_ENDPOINT}?q=${query}&fields=nextPageToken,files(id,name)&spaces=drive&pageSize=1000${pageTokenQuery}`,
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const text = response.responseText || "";
        let json = {};
        try {
          json = text ? JSON.parse(text) : {};
        } catch (error) {
          throw new Error(`Drive folder listing parse failed: ${error?.message || String(error)}`);
        }
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`Drive folder listing HTTP ${response.status}: ${text || "[empty response]"}`);
        }
        if (Array.isArray(json.files)) {
          files.push(...json.files);
        }
        pageToken = typeof json.nextPageToken === "string" ? json.nextPageToken : "";
      } while (pageToken);
      return files;
    };
    const listDriveTopicShardTopicIds = async (topicsFolderId, { requireSummaryHistory = false } = {}) => {
      const files = await listDriveFilesByParent(topicsFolderId);
      const topicIds = /* @__PURE__ */ new Set();
      for (const file of files) {
        const topicId = extractTopicIdFromDriveShardFileName(file?.name);
        if (!topicId) continue;
        if (requireSummaryHistory) {
          const payload = await fetchTopicPayloadFromShard({
            topicId,
            topicsFolderId,
            fileName: file?.name || "",
            fileId: file?.id || ""
          });
          if (payload.history.length === 0) {
            continue;
          }
        }
        topicIds.add(topicId);
      }
      return sortTopicIds(Array.from(topicIds));
    };
    const createEmptyDriveSummaryIndex = () => ({
      version: DRIVE_SUMMARY_STORAGE_VERSION,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      topics: {}
    });
    const normalizeSummaryHistoryItem = (item) => normalizeSummaryHistoryItemForStorage(item);
    const normalizeSummaryHistoryList = (list) => normalizeSummaryHistoryListForStorage(list);
    const normalizeSummaryHistoryMap = (raw) => normalizeSummaryHistoryMapForStorage(raw);
    const normalizeTopicQuestionHistoryList = (list) => normalizeTopicQuestionHistoryListForStorage(list);
    const normalizeTopicQuestionHistoryMap = (raw) => normalizeTopicQuestionHistoryMapForStorage(raw);
    const buildSummaryHistoryEntryKey = (item) => `${String(item?.timestamp || "")}::${String(item?.model || "")}::${String(item?.renderMode || "")}::${String(item?.summary || "")}`;
    const mergeSummaryHistoryList = (baseList, incomingList) => {
      const combined = [];
      const seen = /* @__PURE__ */ new Set();
      const addItem = (item) => {
        const normalizedItem = normalizeSummaryHistoryItem(item);
        if (!normalizedItem) return;
        const key = buildSummaryHistoryEntryKey(normalizedItem);
        if (seen.has(key)) return;
        seen.add(key);
        combined.push(normalizedItem);
      };
      normalizeSummaryHistoryList(baseList).forEach(addItem);
      normalizeSummaryHistoryList(incomingList).forEach(addItem);
      combined.sort((a, b2) => {
        const timeA = Date.parse(a?.timestamp || "");
        const timeB = Date.parse(b2?.timestamp || "");
        if (!Number.isFinite(timeA) && !Number.isFinite(timeB)) return 0;
        if (!Number.isFinite(timeA)) return 1;
        if (!Number.isFinite(timeB)) return -1;
        return timeB - timeA;
      });
      return combined;
    };
    function finalizeLocalSummaryHistoryAfterDriveSync({ syncedTopicIds = [], remoteIndex = null } = {}) {
      const currentLocalHistoryMap = normalizeSummaryHistoryMap(
        typeof getSummaryHistoryMapSnapshot2 === "function" ? getSummaryHistoryMapSnapshot2({ force: true }) : gmGetValue("summaryHistory", {})
      );
      const localTopicIds = sortTopicIds(Object.keys(currentLocalHistoryMap));
      const syncedTopicIdList = sortTopicIds(syncedTopicIds);
      const normalizedRemoteIndex = normalizeDriveSummaryIndex(remoteIndex);
      const remoteTopicIds = sortTopicIds(
        Object.keys(normalizedRemoteIndex.topics).filter((topicId) => Number(normalizedRemoteIndex.topics[topicId]?.entryCount || 0) > 0)
      );
      const syncedAllCurrentLocalTopics = localTopicIds.length > 0 && localTopicIds.length === syncedTopicIdList.length && localTopicIds.every((topicId, index) => topicId === syncedTopicIdList[index]);
      let nextHistoryMap = currentLocalHistoryMap;
      let trimmed = false;
      if (syncedAllCurrentLocalTopics && localTopicIds.length > DRIVE_SUMMARY_TOPIC_LIMIT) {
        nextHistoryMap = trimSummaryHistoryToLatestTopics2(currentLocalHistoryMap, DRIVE_SUMMARY_TOPIC_LIMIT);
        trimmed = Object.keys(nextHistoryMap).length < localTopicIds.length;
        if (trimmed) {
          setSummaryHistoryMapSnapshot2(nextHistoryMap);
        }
      }
      syncSummaryTopicIdsFromSources2(nextHistoryMap, remoteTopicIds);
      return {
        trimmed,
        syncedAllCurrentLocalTopics,
        localTopicCount: Object.keys(nextHistoryMap).length,
        remoteTopicCount: remoteTopicIds.length
      };
    }
    function refreshSummaryStateAfterRebuild() {
      if (typeof scheduleListSummaryRefresh2 === "function") {
        scheduleListSummaryRefresh2(80);
      } else {
        if (typeof addTopicListSummaryButtons === "function") {
          addTopicListSummaryButtons();
        }
        if (typeof restoreExpandedSummaryRows === "function") {
          restoreExpandedSummaryRows();
        }
      }
      if (typeof updateAllSummaryButtonsAndContainers === "function") {
        updateAllSummaryButtonsAndContainers();
      }
    }
    const fetchDriveFileText = async (fileId, { allowNotFound = false } = {}) => {
      if (!fileId) {
        if (allowNotFound) return null;
        throw new Error("Drive file id is required.");
      }
      const token = await ensureDriveSummaryAccessToken();
      const response = await performDriveSummaryRequest({
        method: "GET",
        url: `${DRIVE_FILES_ENDPOINT}/${fileId}?alt=media`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const text = response.responseText || "";
      if (response.status >= 200 && response.status < 300) {
        return text;
      }
      if (response.status === 404 && allowNotFound) {
        return null;
      }
      throw new Error(`Drive file download HTTP ${response.status}: ${text || "[empty response]"}`);
    };
    const normalizeDriveSummaryIndex = (rawIndex) => {
      const normalized = createEmptyDriveSummaryIndex();
      if (!rawIndex || typeof rawIndex !== "object" || Array.isArray(rawIndex)) {
        return normalized;
      }
      const parsedVersion = Number(rawIndex.version);
      if (Number.isFinite(parsedVersion) && parsedVersion > 0) {
        normalized.version = parsedVersion;
      }
      normalized.updatedAt = normalizeIsoTimestamp(rawIndex.updatedAt, normalized.updatedAt);
      const rawTopics = rawIndex.topics && typeof rawIndex.topics === "object" && !Array.isArray(rawIndex.topics) ? rawIndex.topics : {};
      Object.keys(rawTopics).forEach((topicId) => {
        const normalizedTopicId = normalizeSummaryTopicId(topicId);
        if (!normalizedTopicId) return;
        const entry = rawTopics[topicId];
        const fallbackFileName = buildDriveTopicFileName(normalizedTopicId);
        const parsedEntryCount = Number(entry?.entryCount ?? entry?.itemCount);
        const entryCount = Number.isFinite(parsedEntryCount) ? Math.max(0, Math.round(parsedEntryCount)) : 0;
        const parsedQuestionCount = Number(entry?.questionCount ?? entry?.qaCount);
        const questionCount = Number.isFinite(parsedQuestionCount) ? Math.max(0, Math.round(parsedQuestionCount)) : 0;
        normalized.topics[normalizedTopicId] = {
          topicId: normalizedTopicId,
          fileName: typeof entry?.fileName === "string" && entry.fileName.trim() ? entry.fileName.trim() : fallbackFileName,
          updatedAt: normalizeIsoTimestamp(entry?.updatedAt, ""),
          entryCount,
          questionCount,
          latestTimestamp: normalizeIsoTimestamp(entry?.latestTimestamp, ""),
          latestQuestionTimestamp: normalizeIsoTimestamp(entry?.latestQuestionTimestamp, ""),
          fileId: typeof entry?.fileId === "string" ? entry.fileId.trim() : ""
        };
      });
      return normalized;
    };
    const fetchDriveSummaryIndex = async (fileId) => {
      if (!fileId) return createEmptyDriveSummaryIndex();
      const text = await fetchDriveFileText(fileId, { allowNotFound: true });
      if (text === null || !text.trim()) {
        return createEmptyDriveSummaryIndex();
      }
      let json = {};
      try {
        json = JSON.parse(text);
      } catch (error) {
        throw new Error(`Drive index parse failed: ${error?.message || String(error)}`);
      }
      return normalizeDriveSummaryIndex(json);
    };
    const findDriveSummaryRootFolderId = async () => {
      if (driveSummaryRootFolderIdCache) return driveSummaryRootFolderIdCache;
      const folderId = await findDriveSummaryFolderId(DRIVE_SUMMARY_FOLDER_NAME);
      driveSummaryRootFolderIdCache = folderId || "";
      return driveSummaryRootFolderIdCache;
    };
    const ensureDriveSummaryRootFolderId = async () => {
      if (driveSummaryRootFolderIdCache) return driveSummaryRootFolderIdCache;
      const folderId = await ensureDriveSummaryFolder(DRIVE_SUMMARY_FOLDER_NAME);
      driveSummaryRootFolderIdCache = folderId || "";
      return driveSummaryRootFolderIdCache;
    };
    const getDriveSummaryTopicsFolderId = async (rootFolderId, { createIfMissing = false } = {}) => {
      if (!rootFolderId) return "";
      if (driveSummaryTopicsFolderIdCache && driveSummaryTopicsFolderParentIdCache && driveSummaryTopicsFolderParentIdCache === rootFolderId) {
        return driveSummaryTopicsFolderIdCache;
      }
      const folderId = createIfMissing ? await ensureDriveSummaryFolder(DRIVE_SUMMARY_TOPICS_FOLDER_NAME, rootFolderId) : await findDriveSummaryFolderId(DRIVE_SUMMARY_TOPICS_FOLDER_NAME, rootFolderId);
      driveSummaryTopicsFolderIdCache = folderId || "";
      driveSummaryTopicsFolderParentIdCache = folderId ? rootFolderId : "";
      return driveSummaryTopicsFolderIdCache;
    };
    const loadDriveSummaryIndexState = async (rootFolderId) => {
      const indexFileId = await findDriveFileIdByName(rootFolderId, DRIVE_SUMMARY_INDEX_FILENAME);
      if (!indexFileId) {
        return {
          exists: false,
          fileId: "",
          index: createEmptyDriveSummaryIndex()
        };
      }
      const index = await fetchDriveSummaryIndex(indexFileId);
      return {
        exists: true,
        fileId: indexFileId,
        index
      };
    };
    const createDriveDeArrowPayload = (topicStates, updatedAt = (/* @__PURE__ */ new Date()).toISOString()) => ({
      version: driveDeArrowStorageVersion,
      updatedAt: normalizeIsoTimestamp(updatedAt, (/* @__PURE__ */ new Date()).toISOString()),
      topics: normalizeDeArrowTopicStates2(topicStates || {})
    });
    const parseDriveDeArrowPayloadText = (text) => {
      let json;
      try {
        json = JSON.parse(text);
      } catch (error) {
        throw createDriveDeArrowSafetyError(
          `Drive DeArrow state parse failed: ${error?.message || String(error)}`,
          "DRIVE_DEARROW_PARSE_FAILED"
        );
      }
      try {
        return normalizeDriveDeArrowPayload(json, {
          storageVersion: driveDeArrowStorageVersion,
          normalizeTopicStates: normalizeDeArrowTopicStates2
        });
      } catch (error) {
        throw createDriveDeArrowSafetyError(
          `Drive DeArrow state validation failed: ${error?.message || String(error)}`,
          error?.code || "DRIVE_DEARROW_INVALID_STATE"
        );
      }
    };
    const loadDriveDeArrowState = async (rootFolderId) => {
      let fileId;
      try {
        fileId = await findDriveFileIdByName(rootFolderId, DRIVE_DEARROW_FILENAME);
      } catch (error) {
        if (String(error?.message || "").includes("多个同名文件")) {
          error.code = "DRIVE_DEARROW_DUPLICATE_FILES";
          error.retryable = false;
        }
        throw error;
      }
      if (!fileId) {
        return {
          exists: false,
          fileId: "",
          payload: createDriveDeArrowPayload({}, "")
        };
      }
      const text = await fetchDriveFileText(fileId, { allowNotFound: true });
      if (text === null) {
        return {
          exists: false,
          fileId: "",
          payload: createDriveDeArrowPayload({}, "")
        };
      }
      if (!text.trim()) {
        throw createDriveDeArrowSafetyError(
          "Drive DeArrow state file is empty; refusing to overwrite it.",
          "DRIVE_DEARROW_EMPTY_FILE"
        );
      }
      return {
        exists: true,
        fileId,
        payload: parseDriveDeArrowPayloadText(text)
      };
    };
    const mergeNormalizedDeArrowTopicStates = (localStates, remoteStates) => normalizeDeArrowTopicStates2(mergeDeArrowTopicStates2(
      normalizeDeArrowTopicStates2(localStates || {}),
      normalizeDeArrowTopicStates2(remoteStates || {})
    ));
    async function pullDeArrowStateFromDrive2({ silent = true, force = false } = {}) {
      const localStates = readLocalDeArrowTopicStates();
      if (!driveSummarySettings2.enabled) {
        return { ok: false, skipped: true, states: localStates, error: new Error("Drive sync is disabled") };
      }
      if (!hasDriveSummaryCredentials2()) {
        return { ok: false, skipped: true, states: localStates, error: new Error("Missing Drive credentials") };
      }
      if (!force && driveDeArrowPullPromise) {
        return driveDeArrowPullPromise;
      }
      if (!force && driveDeArrowPullAttempted) {
        return { ok: true, skipped: true, source: "session", states: localStates };
      }
      driveDeArrowPullAttempted = true;
      const pullPromise = (async () => {
        try {
          const rootFolderId = await findDriveSummaryRootFolderId();
          if (!rootFolderId) {
            return { ok: true, source: "none", states: localStates };
          }
          const remoteState = await loadDriveDeArrowState(rootFolderId);
          if (!remoteState.exists) {
            return { ok: true, source: "none", states: localStates };
          }
          const mergedStates = mergeNormalizedDeArrowTopicStates(
            readLocalDeArrowTopicStates(),
            remoteState.payload.topics
          );
          writeLocalDeArrowTopicStates(mergedStates, { kind: "hydrate" });
          return {
            ok: true,
            source: "drive-v1",
            states: mergedStates,
            remoteUpdatedAt: remoteState.payload.updatedAt || ""
          };
        } catch (error) {
          const message = formatDriveSummaryError(error);
          setDriveSummaryStatus("error", `DeArrow 拉取失败：${message}`);
          if (!silent && typeof createSettingsToast2 === "function") {
            createSettingsToast2(`DeArrow 拉取失败：${message}`, "error", 4e3);
          }
          return { ok: false, source: "none", states: localStates, error };
        }
      })();
      driveDeArrowPullPromise = pullPromise;
      try {
        return await pullPromise;
      } finally {
        if (driveDeArrowPullPromise === pullPromise) {
          driveDeArrowPullPromise = null;
        }
      }
    }
    const getLatestTimestampFromHistory = (historyList) => {
      const normalizedList = normalizeSummaryHistoryList(historyList);
      let latestTime = 0;
      normalizedList.forEach((item) => {
        const parsed = Date.parse(item?.timestamp || "");
        if (Number.isFinite(parsed) && parsed > latestTime) {
          latestTime = parsed;
        }
      });
      return latestTime > 0 ? new Date(latestTime).toISOString() : "";
    };
    const getLatestTimestampFromQuestionHistory = (questionHistoryList) => {
      const normalizedList = normalizeTopicQuestionHistoryList(questionHistoryList);
      let latestTime = 0;
      normalizedList.forEach((item) => {
        const parsed = Date.parse(item?.timestamp || "");
        if (Number.isFinite(parsed) && parsed > latestTime) {
          latestTime = parsed;
        }
      });
      return latestTime > 0 ? new Date(latestTime).toISOString() : "";
    };
    const buildIndexEntryFromHistory = (topicId, historyList, questionHistoryList = [], { fileName = "", fileId = "", updatedAt = "" } = {}) => {
      const normalizedTopicId = normalizeSummaryTopicId(topicId);
      const normalizedHistory = normalizeSummaryHistoryList(historyList);
      const normalizedQuestionHistory = normalizeTopicQuestionHistoryList(questionHistoryList);
      const resolvedFileName = fileName && String(fileName).trim() ? String(fileName).trim() : buildDriveTopicFileName(normalizedTopicId);
      return {
        fileName: resolvedFileName,
        updatedAt: normalizeIsoTimestamp(updatedAt, (/* @__PURE__ */ new Date()).toISOString()),
        entryCount: normalizedHistory.length,
        questionCount: normalizedQuestionHistory.length,
        latestTimestamp: getLatestTimestampFromHistory(normalizedHistory),
        latestQuestionTimestamp: getLatestTimestampFromQuestionHistory(normalizedQuestionHistory),
        fileId: typeof fileId === "string" ? fileId.trim() : ""
      };
    };
    const buildDriveTopicHistoryPayload = (topicId, historyList, questionHistoryList = [], updatedAt = "") => {
      const normalizedTopicId = normalizeSummaryTopicId(topicId);
      const normalizedHistory = normalizeSummaryHistoryList(historyList);
      const normalizedQuestionHistory = normalizeTopicQuestionHistoryList(questionHistoryList);
      const resolvedUpdatedAt = normalizeIsoTimestamp(updatedAt, (/* @__PURE__ */ new Date()).toISOString());
      return {
        version: DRIVE_SUMMARY_STORAGE_VERSION,
        topicId: normalizedTopicId,
        updatedAt: resolvedUpdatedAt,
        history: normalizedHistory,
        questionHistory: normalizedQuestionHistory
      };
    };
    const fetchTopicPayloadFromShard = async ({ topicId, topicsFolderId, fileName = "", fileId = "" } = {}) => {
      const normalizedTopicId = normalizeSummaryTopicId(topicId);
      const emptyPayload = { history: [], questionHistory: [] };
      if (!normalizedTopicId) return emptyPayload;
      const resolvedFileName = fileName && String(fileName).trim() ? String(fileName).trim() : buildDriveTopicFileName(normalizedTopicId);
      let resolvedFileId = fileId && String(fileId).trim() ? String(fileId).trim() : "";
      if (!resolvedFileId) {
        const normalizedTopicsFolderId = typeof topicsFolderId === "string" ? topicsFolderId.trim() : "";
        if (!normalizedTopicsFolderId) return emptyPayload;
        resolvedFileId = await findDriveFileIdByName(normalizedTopicsFolderId, resolvedFileName) || "";
      }
      if (!resolvedFileId) return emptyPayload;
      const text = await fetchDriveFileText(resolvedFileId, { allowNotFound: true });
      if (text === null || !text.trim()) return emptyPayload;
      let json = {};
      try {
        json = JSON.parse(text);
      } catch (error) {
        throw new Error(`Drive topic shard parse failed: ${error?.message || String(error)}`);
      }
      if (Array.isArray(json)) {
        return {
          history: normalizeSummaryHistoryList(json),
          questionHistory: []
        };
      }
      if (!json || typeof json !== "object") return emptyPayload;
      const history = Array.isArray(json.items) ? normalizeSummaryHistoryList(json.items) : Array.isArray(json.history) ? normalizeSummaryHistoryList(json.history) : [];
      return {
        history,
        questionHistory: normalizeTopicQuestionHistoryList(json.questionHistory)
      };
    };
    const fetchTopicHistoryFromShard = async (options = {}) => {
      const payload = await fetchTopicPayloadFromShard(options);
      return payload.history;
    };
    const fetchDriveTopicHistory = async ({ topicId, topicsFolderId, fileName = "", fileId = "" } = {}) => {
      const normalizedTopicId = normalizeSummaryTopicId(topicId);
      if (!normalizedTopicId) {
        return {
          history: [],
          questionHistory: [],
          fileId: "",
          fileName: fileName && String(fileName).trim() ? String(fileName).trim() : buildDriveTopicFileName(normalizedTopicId || topicId)
        };
      }
      const resolvedFileName = fileName && String(fileName).trim() ? String(fileName).trim() : buildDriveTopicFileName(normalizedTopicId);
      let resolvedFileId = fileId && String(fileId).trim() ? String(fileId).trim() : "";
      if (!resolvedFileId) {
        const normalizedTopicsFolderId = typeof topicsFolderId === "string" ? topicsFolderId.trim() : "";
        if (!normalizedTopicsFolderId) {
          return {
            history: [],
            questionHistory: [],
            fileId: "",
            fileName: resolvedFileName
          };
        }
        resolvedFileId = await findDriveFileIdByName(normalizedTopicsFolderId, resolvedFileName) || "";
      }
      if (!resolvedFileId) {
        return {
          history: [],
          questionHistory: [],
          fileId: "",
          fileName: resolvedFileName
        };
      }
      const payload = await fetchTopicPayloadFromShard({
        topicId: normalizedTopicId,
        topicsFolderId,
        fileName: resolvedFileName,
        fileId: resolvedFileId
      });
      return {
        history: payload.history,
        questionHistory: payload.questionHistory,
        fileId: resolvedFileId,
        fileName: resolvedFileName
      };
    };
    const fetchDriveSummaryHistory = async (fileId) => {
      if (!fileId) return {};
      const text = await fetchDriveFileText(fileId, { allowNotFound: true });
      if (text === null || !text.trim()) return {};
      let json = {};
      try {
        json = JSON.parse(text);
      } catch (error) {
        throw new Error(`Drive file parse failed: ${error?.message || String(error)}`);
      }
      return normalizeSummaryHistoryMap(json);
    };
    async function pullTopicHistoryFromDrive2(topicId, { silent = false, suppressStatus = false, mergeWithLocal = false } = {}) {
      const normalizedTopicId = normalizeSummaryTopicId(topicId);
      const fail = (message, error = null) => {
        const err = error instanceof Error ? error : new Error(message);
        if (!suppressStatus) {
          setDriveSummaryStatus("error", `拉取失败：${message}`);
        }
        if (!silent && typeof createSettingsToast2 === "function") {
          createSettingsToast2(`拉取失败：${message}`, "error", 3200);
        }
        return { ok: false, source: "none", error: err };
      };
      if (!normalizedTopicId) {
        return fail("无效的话题 ID");
      }
      const localHistoryMap = normalizeSummaryHistoryMap(
        typeof getSummaryHistoryMapSnapshot2 === "function" ? getSummaryHistoryMapSnapshot2({ force: true }) : gmGetValue("summaryHistory", {})
      );
      const localHistory = Array.isArray(localHistoryMap[normalizedTopicId]) ? localHistoryMap[normalizedTopicId] : [];
      if (localHistory.length > 0 && !mergeWithLocal) {
        markTopicSummarized2(normalizedTopicId);
        return { ok: true, source: "local", history: localHistory };
      }
      if (!driveSummarySettings2.enabled) {
        return fail("Drive 同步未启用");
      }
      if (!hasDriveSummaryCredentials2()) {
        return fail("Drive 凭据未填写完整");
      }
      if (!suppressStatus) {
        setDriveSummaryStatus("info", `正在拉取话题 ${normalizedTopicId} 的总结...`);
      }
      try {
        const rootFolderId = await findDriveSummaryRootFolderId();
        if (!rootFolderId) {
          return fail("Drive 中未找到总结文件夹");
        }
        let source = "none";
        let remoteTopicHistory = [];
        let remoteTopicQuestionHistory = [];
        const indexState = await loadDriveSummaryIndexState(rootFolderId);
        if (indexState.exists) {
          const index = normalizeDriveSummaryIndex(indexState.index);
          const topicEntry = index.topics[normalizedTopicId];
          const topicsFolderId = await getDriveSummaryTopicsFolderId(rootFolderId, { createIfMissing: false });
          if (topicEntry) {
            const payload = await fetchTopicPayloadFromShard({
              topicId: normalizedTopicId,
              topicsFolderId,
              fileName: topicEntry.fileName,
              fileId: topicEntry.fileId
            });
            remoteTopicHistory = payload.history;
            remoteTopicQuestionHistory = payload.questionHistory;
            if (remoteTopicHistory.length > 0) {
              source = "drive-v2";
            }
          }
          if (topicsFolderId) {
            if (remoteTopicHistory.length === 0) {
              const fallbackTopic = await fetchDriveTopicHistory({
                topicId: normalizedTopicId,
                topicsFolderId
              });
              remoteTopicHistory = normalizeSummaryHistoryList(fallbackTopic.history);
              remoteTopicQuestionHistory = normalizeTopicQuestionHistoryList(fallbackTopic.questionHistory);
              if (remoteTopicHistory.length > 0) {
                source = "drive-v2-fallback";
              }
            }
          }
        }
        if (remoteTopicHistory.length === 0) {
          const legacyFileId = await findDriveSummaryFileId(rootFolderId);
          if (legacyFileId) {
            const remoteHistoryMap = await fetchDriveSummaryHistory(legacyFileId);
            remoteTopicHistory = Array.isArray(remoteHistoryMap[normalizedTopicId]) ? remoteHistoryMap[normalizedTopicId] : [];
            if (remoteTopicHistory.length > 0) {
              source = "drive-legacy";
            }
          }
        }
        if (remoteTopicHistory.length === 0) {
          return fail(`Drive 中未找到话题 ${normalizedTopicId} 的总结`);
        }
        const mergedTopicHistory = mergeSummaryHistoryList(localHistory, remoteTopicHistory);
        localHistoryMap[normalizedTopicId] = mergedTopicHistory;
        if (typeof setSummaryHistoryMapSnapshot2 === "function") {
          setSummaryHistoryMapSnapshot2(localHistoryMap);
        } else {
          gmSetValue("summaryHistory", localHistoryMap);
        }
        if (remoteTopicQuestionHistory.length > 0) {
          const localQuestionHistoryMap = normalizeTopicQuestionHistoryMap(
            typeof getTopicQuestionHistoryMapSnapshot2 === "function" ? getTopicQuestionHistoryMapSnapshot2({ force: true }) : gmGetValue("topicQuestionHistory", {})
          );
          const localQuestionHistory = Array.isArray(localQuestionHistoryMap[normalizedTopicId]) ? localQuestionHistoryMap[normalizedTopicId] : [];
          localQuestionHistoryMap[normalizedTopicId] = mergeTopicQuestionHistoryList(
            localQuestionHistory,
            remoteTopicQuestionHistory
          );
          if (typeof setTopicQuestionHistoryMapSnapshot2 === "function") {
            setTopicQuestionHistoryMapSnapshot2(localQuestionHistoryMap);
          } else {
            gmSetValue("topicQuestionHistory", localQuestionHistoryMap);
          }
        }
        markTopicSummarized2(normalizedTopicId);
        if (!suppressStatus) {
          setDriveSummaryStatus("success", `已从 Drive 拉取话题 ${normalizedTopicId} 的总结。`);
        }
        if (!silent && typeof createSettingsToast2 === "function") {
          createSettingsToast2("已从 Drive 拉取话题总结。", "success", 2600);
        }
        if (source === "drive-legacy" || source === "drive-v2-fallback") {
          markDriveSummaryTopicDirty2(normalizedTopicId);
          scheduleDriveSummarySync2("import");
        }
        return { ok: true, source, history: mergedTopicHistory };
      } catch (error) {
        const message = formatDriveSummaryError(error);
        return fail(message, error);
      }
    }
    async function pullTopicQuestionHistoryFromDrive2(topicId, { silent = false, suppressStatus = false, mergeWithLocal = false } = {}) {
      const normalizedTopicId = normalizeSummaryTopicId(topicId);
      const fail = (message, error = null) => {
        const err = error instanceof Error ? error : new Error(message);
        if (!suppressStatus) {
          setDriveSummaryStatus("error", `拉取失败：${message}`);
        }
        if (!silent && typeof createSettingsToast2 === "function") {
          createSettingsToast2(`拉取失败：${message}`, "error", 3200);
        }
        return { ok: false, source: "none", error: err, questionHistory: [] };
      };
      if (!normalizedTopicId) {
        return fail("无效的话题 ID");
      }
      const localQuestionHistoryMap = normalizeTopicQuestionHistoryMap(
        typeof getTopicQuestionHistoryMapSnapshot2 === "function" ? getTopicQuestionHistoryMapSnapshot2({ force: true }) : gmGetValue("topicQuestionHistory", {})
      );
      const localQuestionHistory = Array.isArray(localQuestionHistoryMap[normalizedTopicId]) ? localQuestionHistoryMap[normalizedTopicId] : [];
      if (localQuestionHistory.length > 0 && !mergeWithLocal) {
        return { ok: true, source: "local", questionHistory: localQuestionHistory };
      }
      if (!driveSummarySettings2.enabled) {
        return fail("Drive 同步未启用");
      }
      if (!hasDriveSummaryCredentials2()) {
        return fail("Drive 凭据未填写完整");
      }
      if (!suppressStatus) {
        setDriveSummaryStatus("info", `正在拉取话题 ${normalizedTopicId} 的问答历史...`);
      }
      try {
        const rootFolderId = await findDriveSummaryRootFolderId();
        if (!rootFolderId) {
          return fail("Drive 中未找到总结文件夹");
        }
        let source = "none";
        let remoteQuestionHistory = [];
        const indexState = await loadDriveSummaryIndexState(rootFolderId);
        if (indexState.exists) {
          const index = normalizeDriveSummaryIndex(indexState.index);
          const topicEntry = index.topics[normalizedTopicId];
          const topicsFolderId = await getDriveSummaryTopicsFolderId(rootFolderId, { createIfMissing: false });
          if (topicEntry) {
            const payload = await fetchTopicPayloadFromShard({
              topicId: normalizedTopicId,
              topicsFolderId,
              fileName: topicEntry.fileName,
              fileId: topicEntry.fileId
            });
            remoteQuestionHistory = payload.questionHistory;
            if (remoteQuestionHistory.length > 0) {
              source = "drive-v3";
            }
          }
          if (topicsFolderId && remoteQuestionHistory.length === 0) {
            const fallbackTopic = await fetchDriveTopicHistory({
              topicId: normalizedTopicId,
              topicsFolderId
            });
            remoteQuestionHistory = normalizeTopicQuestionHistoryList(fallbackTopic.questionHistory);
            if (remoteQuestionHistory.length > 0) {
              source = "drive-v3-fallback";
            }
          }
        }
        if (remoteQuestionHistory.length === 0) {
          return fail(`Drive 中未找到话题 ${normalizedTopicId} 的问答历史`);
        }
        const mergedQuestionHistory = mergeTopicQuestionHistoryList(localQuestionHistory, remoteQuestionHistory);
        localQuestionHistoryMap[normalizedTopicId] = mergedQuestionHistory;
        if (typeof setTopicQuestionHistoryMapSnapshot2 === "function") {
          setTopicQuestionHistoryMapSnapshot2(localQuestionHistoryMap);
        } else {
          gmSetValue("topicQuestionHistory", localQuestionHistoryMap);
        }
        if (!suppressStatus) {
          setDriveSummaryStatus("success", `已从 Drive 拉取话题 ${normalizedTopicId} 的问答历史。`);
        }
        if (!silent && typeof createSettingsToast2 === "function") {
          createSettingsToast2("已从 Drive 拉取话题问答历史。", "success", 2600);
        }
        return { ok: true, source, questionHistory: mergedQuestionHistory };
      } catch (error) {
        const message = formatDriveSummaryError(error);
        return fail(message, error);
      }
    }
    async function rebuildSummaryTopicIdsFromDrive2({ silent = false } = {}) {
      const fail = (message, error = null) => {
        const err = error instanceof Error ? error : new Error(message);
        setDriveSummaryStatus("error", `重建失败：${message}`);
        if (!silent && typeof createSettingsToast2 === "function") {
          createSettingsToast2(`重建失败：${message}`, "error", 3600);
        }
        return { ok: false, error: err };
      };
      if (driveSummaryRebuildInFlight) {
        return fail("正在重建中，请稍候");
      }
      if (!hasDriveSummaryCredentials2()) {
        return fail("请先填写完整的 Google Drive 凭据");
      }
      if (typeof replaceSummaryTopicIdsFromHistoryMap2 !== "function") {
        return fail("缺少 summaryTopicIds 重建函数");
      }
      driveSummaryRebuildInFlight = true;
      setDriveSummaryStatus("info", "正在从 Drive 重建 summaryTopicIds...");
      try {
        const rootFolderId = await findDriveSummaryRootFolderId();
        if (!rootFolderId) {
          return fail("Drive 中未找到总结文件夹");
        }
        let source = "none";
        let indexTopics = {};
        let shardTopicIds = [];
        let legacyHistoryMap = {};
        const indexState = await loadDriveSummaryIndexState(rootFolderId);
        if (indexState.exists) {
          const index = normalizeDriveSummaryIndex(indexState.index);
          indexTopics = {};
          Object.keys(index.topics).forEach((topicId) => {
            if (Number(index.topics[topicId]?.entryCount || 0) > 0) {
              indexTopics[topicId] = index.topics[topicId];
            }
          });
        }
        const topicsFolderId = await getDriveSummaryTopicsFolderId(rootFolderId, { createIfMissing: false });
        if (topicsFolderId) {
          shardTopicIds = await listDriveTopicShardTopicIds(topicsFolderId, { requireSummaryHistory: true });
        }
        const legacyFileId = await findDriveSummaryFileId(rootFolderId);
        if (legacyFileId) {
          legacyHistoryMap = await fetchDriveSummaryHistory(legacyFileId);
        }
        const rebuildSnapshot = collectDriveRebuildTopicIds({
          indexTopics,
          shardTopicIds,
          legacyHistoryMap
        });
        const remoteTopicIds = new Set(rebuildSnapshot.topicIds);
        source = rebuildSnapshot.source;
        const localHistoryMap = normalizeSummaryHistoryMap(
          typeof getSummaryHistoryMapSnapshot2 === "function" ? getSummaryHistoryMapSnapshot2({ force: true }) : gmGetValue("summaryHistory", {})
        );
        const rebuildSourceMap = { ...localHistoryMap };
        remoteTopicIds.forEach((topicId) => {
          if (!Object.prototype.hasOwnProperty.call(rebuildSourceMap, topicId)) {
            rebuildSourceMap[topicId] = [];
          }
        });
        const rebuiltTopicIds = replaceSummaryTopicIdsFromHistoryMap2(rebuildSourceMap);
        const remoteTopicCount = remoteTopicIds.size;
        const rebuiltCount = Array.isArray(rebuiltTopicIds) ? rebuiltTopicIds.length : 0;
        refreshSummaryStateAfterRebuild();
        const sourceLabelMap = {
          "v2-index": "v2 索引",
          "v2-shards": "v2 分片",
          "v2-index+v2-shards": "v2 索引 + 分片",
          "legacy": "legacy 文件",
          "v2-index+legacy": "v2 索引 + legacy 文件",
          "v2-shards+legacy": "v2 分片 + legacy 文件",
          "v2-index+v2-shards+legacy": "v2 索引 + 分片 + legacy 文件",
          "none": "本地数据"
        };
        const sourceLabel = sourceLabelMap[source] || "本地数据";
        setDriveSummaryStatus("success", `重建完成：来源 ${sourceLabel}，远端 ${remoteTopicCount} 个话题，当前已标记 ${rebuiltCount} 个。`);
        if (!silent && typeof createSettingsToast2 === "function") {
          createSettingsToast2(`已从 Drive 重建 summaryTopicIds（${rebuiltCount} 个话题）`, "success", 3200);
        }
        return {
          ok: true,
          remoteTopicCount,
          rebuiltCount,
          source
        };
      } catch (error) {
        const message = formatDriveSummaryError(error);
        return fail(message, error);
      } finally {
        driveSummaryRebuildInFlight = false;
      }
    }
    const uploadSummaryContentToDrive = async (...args) => {
      let options = {};
      if (typeof args[0] === "string") {
        options = {
          content: args[0],
          folderId: args[1] || "",
          fileId: args[2] || "",
          fileName: DRIVE_SUMMARY_FILENAME,
          mimeType: "application/json"
        };
      } else {
        options = args[0] || {};
      }
      const content = options.content === null || options.content === void 0 ? "" : String(options.content);
      const folderId = typeof options.folderId === "string" ? options.folderId.trim() : "";
      const fileId = typeof options.fileId === "string" ? options.fileId.trim() : "";
      const fileName = typeof options.fileName === "string" && options.fileName.trim() ? options.fileName.trim() : DRIVE_SUMMARY_FILENAME;
      const mimeType = typeof options.mimeType === "string" && options.mimeType.trim() ? options.mimeType.trim() : "application/json";
      if (!fileId && !folderId) {
        throw new Error("Drive upload requires folderId when creating a new file.");
      }
      const token = await ensureDriveSummaryAccessToken();
      const boundary = `summaryBoundary${Date.now()}`;
      const metadata = {
        name: fileName,
        mimeType
      };
      if (!fileId && folderId) {
        metadata.parents = [folderId];
      }
      const multipartBody = new Blob([
        `--${boundary}\r
`,
        "Content-Type: application/json; charset=UTF-8\r\n\r\n",
        JSON.stringify(metadata),
        "\r\n",
        `--${boundary}\r
`,
        "Content-Type: application/json; charset=UTF-8\r\n\r\n",
        content,
        `\r
--${boundary}--`
      ], { type: `multipart/related; boundary=${boundary}` });
      const url = fileId ? `${DRIVE_UPLOAD_ENDPOINT}/${fileId}?uploadType=multipart` : `${DRIVE_UPLOAD_ENDPOINT}?uploadType=multipart`;
      const method = fileId ? "PATCH" : "POST";
      const response = await performDriveSummaryRequest({
        method,
        url,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": `multipart/related; boundary=${boundary}`
        },
        body: multipartBody
      });
      const text = response.responseText || "";
      if (response.status >= 200 && response.status < 300) {
        if (!text) return {};
        try {
          return JSON.parse(text);
        } catch {
          return {};
        }
      }
      throw new Error(`Drive upload HTTP ${response.status}: ${text || "[empty response]"}`);
    };
    const syncDriveDeArrowStateToRoot = async ({ rootFolderId, localStates } = {}) => {
      if (!rootFolderId) {
        throw new Error("Drive root folder id is required for DeArrow sync.");
      }
      const remoteState = await loadDriveDeArrowState(rootFolderId);
      const currentLocalStates = mergeNormalizedDeArrowTopicStates(
        localStates || {},
        readLocalDeArrowTopicStates()
      );
      const mergedStates = mergeNormalizedDeArrowTopicStates(
        currentLocalStates,
        remoteState.payload.topics
      );
      const payload = createDriveDeArrowPayload(mergedStates);
      const uploadResult = await uploadSummaryContentToDrive({
        content: JSON.stringify(payload, null, 2),
        folderId: rootFolderId,
        fileId: remoteState.fileId || "",
        fileName: DRIVE_DEARROW_FILENAME,
        mimeType: "application/json"
      });
      const latestMergedStates = mergeNormalizedDeArrowTopicStates(
        mergedStates,
        readLocalDeArrowTopicStates()
      );
      writeLocalDeArrowTopicStates(latestMergedStates, { kind: "sync" });
      return {
        fileId: typeof uploadResult?.id === "string" && uploadResult.id ? uploadResult.id : remoteState.fileId || "",
        payload,
        states: latestMergedStates,
        topicCount: Object.keys(mergedStates).length
      };
    };
    const uploadDriveSummaryIndex = async (indexData, rootFolderId, fileId = "") => {
      const normalizedIndex = normalizeDriveSummaryIndex(indexData);
      normalizedIndex.version = DRIVE_SUMMARY_STORAGE_VERSION;
      normalizedIndex.updatedAt = normalizeIsoTimestamp(normalizedIndex.updatedAt, (/* @__PURE__ */ new Date()).toISOString());
      const uploadResult = await uploadSummaryContentToDrive({
        content: JSON.stringify(normalizedIndex, null, 2),
        folderId: rootFolderId,
        fileId,
        fileName: DRIVE_SUMMARY_INDEX_FILENAME,
        mimeType: "application/json"
      });
      return {
        fileId: typeof uploadResult?.id === "string" && uploadResult.id ? uploadResult.id : fileId || "",
        index: normalizedIndex
      };
    };
    const uploadDriveTopicHistory = async ({ topicId, historyList, questionHistoryList = [], topicsFolderId, fileName = "", fileId = "" } = {}) => {
      const normalizedTopicId = normalizeSummaryTopicId(topicId);
      if (!normalizedTopicId) {
        throw new Error("Invalid topicId for Drive topic upload.");
      }
      if (!topicsFolderId) {
        throw new Error("topicsFolderId is required for Drive topic upload.");
      }
      const normalizedHistory = normalizeSummaryHistoryList(historyList);
      const normalizedQuestionHistory = normalizeTopicQuestionHistoryList(questionHistoryList);
      const resolvedFileName = fileName && String(fileName).trim() ? String(fileName).trim() : buildDriveTopicFileName(normalizedTopicId);
      const payload = buildDriveTopicHistoryPayload(normalizedTopicId, normalizedHistory, normalizedQuestionHistory, (/* @__PURE__ */ new Date()).toISOString());
      const uploadResult = await uploadSummaryContentToDrive({
        content: JSON.stringify(payload, null, 2),
        folderId: topicsFolderId,
        fileId,
        fileName: resolvedFileName,
        mimeType: "application/json"
      });
      const nextFileId = typeof uploadResult?.id === "string" && uploadResult.id ? uploadResult.id : fileId || "";
      const indexEntry = buildIndexEntryFromHistory(normalizedTopicId, normalizedHistory, normalizedQuestionHistory, {
        fileName: resolvedFileName,
        fileId: nextFileId,
        updatedAt: payload.updatedAt
      });
      return {
        fileId: nextFileId,
        fileName: resolvedFileName,
        history: normalizedHistory,
        questionHistory: normalizedQuestionHistory,
        indexEntry
      };
    };
    const migrateLegacySummaryToV2IfNeeded = async ({ rootFolderId, indexState, topicsFolderId = "" } = {}) => {
      const normalizedIndexState = indexState && typeof indexState === "object" ? indexState : { exists: false, fileId: "", index: createEmptyDriveSummaryIndex() };
      const currentIndex = normalizeDriveSummaryIndex(normalizedIndexState.index);
      if (!rootFolderId) {
        return {
          indexState: {
            exists: normalizedIndexState.exists === true,
            fileId: normalizedIndexState.fileId || "",
            index: currentIndex
          },
          topicsFolderId,
          migrated: false,
          topicCount: 0
        };
      }
      const legacyFileId = await findDriveSummaryFileId(rootFolderId);
      if (!legacyFileId) {
        return {
          indexState: {
            exists: normalizedIndexState.exists === true,
            fileId: normalizedIndexState.fileId || "",
            index: currentIndex
          },
          topicsFolderId,
          migrated: false,
          topicCount: 0
        };
      }
      const legacyHistoryMap = normalizeSummaryHistoryMap(await fetchDriveSummaryHistory(legacyFileId));
      const migrationTopicIds = collectLegacyDriveMigrationTopicIds({
        indexTopics: currentIndex.topics,
        legacyHistoryMap
      });
      if (migrationTopicIds.length === 0) {
        return {
          indexState: {
            exists: normalizedIndexState.exists === true,
            fileId: normalizedIndexState.fileId || "",
            index: currentIndex
          },
          topicsFolderId,
          migrated: false,
          topicCount: 0
        };
      }
      const ensuredTopicsFolderId = topicsFolderId || await getDriveSummaryTopicsFolderId(rootFolderId, { createIfMissing: true });
      const nextIndex = normalizeDriveSummaryIndex(currentIndex);
      for (const topicId of migrationTopicIds) {
        const historyList = normalizeSummaryHistoryList(legacyHistoryMap[topicId] || []);
        const fileName = buildDriveTopicFileName(topicId);
        const existingFileId = await findDriveFileIdByName(ensuredTopicsFolderId, fileName) || "";
        const uploadedTopic = await uploadDriveTopicHistory({
          topicId,
          historyList,
          topicsFolderId: ensuredTopicsFolderId,
          fileName,
          fileId: existingFileId
        });
        nextIndex.topics[topicId] = uploadedTopic.indexEntry;
      }
      nextIndex.version = DRIVE_SUMMARY_STORAGE_VERSION;
      nextIndex.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      const uploadedIndex = await uploadDriveSummaryIndex(nextIndex, rootFolderId, normalizedIndexState.fileId || "");
      return {
        indexState: {
          exists: true,
          fileId: uploadedIndex.fileId,
          index: uploadedIndex.index
        },
        topicsFolderId: ensuredTopicsFolderId,
        migrated: true,
        topicCount: migrationTopicIds.length
      };
    };
    const takeDriveDirtyTopicSnapshot = ({ reason = "auto", localHistoryMap = {}, localQuestionHistoryMap = {} } = {}) => {
      const normalizedReason = normalizeDriveSyncReason(reason);
      const dirtySet = ensureDriveSummaryDirtySet();
      const normalizedLocalHistoryMap = normalizeSummaryHistoryMap(localHistoryMap);
      const normalizedLocalQuestionHistoryMap = normalizeTopicQuestionHistoryMap(localQuestionHistoryMap);
      const localTopicIds = sortTopicIds([
        ...Object.keys(normalizedLocalHistoryMap),
        ...Object.keys(normalizedLocalQuestionHistoryMap)
      ]);
      if ((normalizedReason === "manual" || normalizedReason === "import") && dirtySet.size === 0 && localTopicIds.length > 0) {
        markDriveSummaryTopicsDirty2(localTopicIds);
      }
      return sortTopicIds(Array.from(dirtySet));
    };
    async function uploadSummaryHistoryToDrive2({ reason = "manual", silent = true } = {}) {
      const normalizedReason = normalizeDriveSyncReason(reason);
      if (!hasDriveSummaryCredentials2()) {
        setDriveSummaryStatus("error", "请先填写 Google Drive 凭据。");
        if (!silent && typeof createSettingsToast2 === "function") {
          createSettingsToast2("请先填写 Google Drive 凭据。", "error", 3e3);
        }
        return { ok: false, error: new Error("Missing Drive credentials") };
      }
      if (driveSummarySyncTimer) {
        clearTimeout(driveSummarySyncTimer);
        driveSummarySyncTimer = null;
      }
      if (driveSummarySyncInFlight) {
        driveSummarySyncQueued = true;
        driveSummaryQueuedReason = mergeDriveSyncReason(driveSummaryQueuedReason, normalizedReason);
        return { ok: false, queued: true, error: new Error("Drive sync already running") };
      }
      const localHistoryMap = normalizeSummaryHistoryMap(
        typeof getSummaryHistoryMapSnapshot2 === "function" ? getSummaryHistoryMapSnapshot2({ force: true }) : gmGetValue("summaryHistory", {})
      );
      const localQuestionHistoryMap = normalizeTopicQuestionHistoryMap(
        typeof getTopicQuestionHistoryMapSnapshot2 === "function" ? getTopicQuestionHistoryMapSnapshot2({ force: true }) : gmGetValue("topicQuestionHistory", {})
      );
      const dirtyTopicIds = takeDriveDirtyTopicSnapshot({
        reason: normalizedReason,
        localHistoryMap,
        localQuestionHistoryMap
      });
      const deArrowDirtyAtStart = ensureDriveDeArrowDirtyState();
      const deArrowDirtyRevisionAtStart = driveDeArrowDirtyRevision;
      const localDeArrowTopicStates = deArrowDirtyAtStart ? readLocalDeArrowTopicStates() : {};
      if (dirtyTopicIds.length === 0 && !deArrowDirtyAtStart && normalizedReason === "auto") {
        return { ok: true, skipped: true, syncedTopicCount: 0, syncedDeArrowTopicCount: 0 };
      }
      driveSummarySyncInFlight = true;
      let preventAutomaticRetry = false;
      setDriveSummaryStatus("info", dirtyTopicIds.length > 0 ? `正在同步 ${dirtyTopicIds.length} 个话题到 Drive...` : deArrowDirtyAtStart ? "正在同步 DeArrow 状态到 Drive..." : "正在检查并迁移 Drive 存储结构...");
      try {
        const rootFolderId = await ensureDriveSummaryRootFolderId();
        let syncedDeArrowTopicCount = 0;
        if (deArrowDirtyAtStart) {
          const deArrowSyncResult = await syncDriveDeArrowStateToRoot({
            rootFolderId,
            localStates: localDeArrowTopicStates
          });
          syncedDeArrowTopicCount = deArrowSyncResult.topicCount;
          clearDriveDeArrowDirty(deArrowDirtyRevisionAtStart);
        }
        if (dirtyTopicIds.length === 0 && normalizedReason === "auto") {
          const successMessage2 = `Drive 同步完成：DeArrow ${syncedDeArrowTopicCount} 个话题。`;
          setDriveSummaryStatus("success", successMessage2);
          if (!silent && typeof createSettingsToast2 === "function") {
            createSettingsToast2(successMessage2, "success", 2800);
          }
          return {
            ok: true,
            syncedTopicCount: 0,
            syncedDeArrowTopicCount
          };
        }
        let topicsFolderId = await getDriveSummaryTopicsFolderId(rootFolderId, { createIfMissing: false });
        let indexState = await loadDriveSummaryIndexState(rootFolderId);
        const migrationResult = await migrateLegacySummaryToV2IfNeeded({
          rootFolderId,
          indexState,
          topicsFolderId
        });
        indexState = migrationResult.indexState;
        topicsFolderId = migrationResult.topicsFolderId || topicsFolderId;
        const migrated = migrationResult.migrated === true;
        const migratedTopicCount = Number(migrationResult.topicCount) || 0;
        if (dirtyTopicIds.length === 0) {
          if (migrated) {
            finalizeLocalSummaryHistoryAfterDriveSync({
              syncedTopicIds: [],
              remoteIndex: indexState.index
            });
          }
          const message = migrated ? `Drive 迁移完成：已拆分 ${migratedTopicCount} 个话题${syncedDeArrowTopicCount > 0 ? `，DeArrow ${syncedDeArrowTopicCount} 个话题` : ""}。` : syncedDeArrowTopicCount > 0 ? `Drive 同步完成：DeArrow ${syncedDeArrowTopicCount} 个话题。` : "没有待同步的话题变更。";
          setDriveSummaryStatus("success", message);
          if (!silent && typeof createSettingsToast2 === "function") {
            createSettingsToast2(message, migrated ? "success" : "info", 2600);
          }
          return {
            ok: true,
            skipped: !migrated,
            migrated,
            migratedTopicCount,
            syncedTopicCount: 0,
            syncedDeArrowTopicCount
          };
        }
        topicsFolderId = topicsFolderId || await getDriveSummaryTopicsFolderId(rootFolderId, { createIfMissing: true });
        const nextIndex = normalizeDriveSummaryIndex(indexState.index);
        let syncedTopicCount = 0;
        for (const topicId of dirtyTopicIds) {
          const localTopicHistory = normalizeSummaryHistoryList(localHistoryMap[topicId] || []);
          const localTopicQuestionHistory = normalizeTopicQuestionHistoryList(localQuestionHistoryMap[topicId] || []);
          const existingEntry = nextIndex.topics[topicId] || {};
          const remoteTopic = await fetchDriveTopicHistory({
            topicId,
            topicsFolderId,
            fileName: existingEntry.fileName || "",
            fileId: existingEntry.fileId || ""
          });
          const mergedTopicHistory = mergeSummaryHistoryList(remoteTopic.history, localTopicHistory);
          const mergedTopicQuestionHistory = mergeTopicQuestionHistoryList(
            remoteTopic.questionHistory,
            localTopicQuestionHistory
          );
          const uploadedTopic = await uploadDriveTopicHistory({
            topicId,
            historyList: mergedTopicHistory,
            questionHistoryList: mergedTopicQuestionHistory,
            topicsFolderId,
            fileName: remoteTopic.fileName || existingEntry.fileName || buildDriveTopicFileName(topicId),
            fileId: remoteTopic.fileId || existingEntry.fileId || ""
          });
          nextIndex.topics[topicId] = uploadedTopic.indexEntry;
          syncedTopicCount += 1;
        }
        nextIndex.version = DRIVE_SUMMARY_STORAGE_VERSION;
        nextIndex.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
        const uploadedIndex = await uploadDriveSummaryIndex(nextIndex, rootFolderId, indexState.fileId || "");
        indexState = {
          exists: true,
          fileId: uploadedIndex.fileId,
          index: uploadedIndex.index
        };
        clearDriveSummaryTopicsDirty2(dirtyTopicIds);
        const trimResult = finalizeLocalSummaryHistoryAfterDriveSync({
          syncedTopicIds: dirtyTopicIds,
          remoteIndex: uploadedIndex.index
        });
        const migrateText = migrated ? `，并迁移 legacy ${migratedTopicCount} 个话题` : "";
        const trimText = trimResult.trimmed ? `，本地已安全裁剪到最近 ${trimResult.localTopicCount} 个话题` : "";
        const deArrowText = syncedDeArrowTopicCount > 0 ? `，DeArrow ${syncedDeArrowTopicCount} 个话题` : "";
        const successMessage = `Drive 同步完成：增量同步 ${syncedTopicCount} 个话题${deArrowText}${migrateText}${trimText}。`;
        setDriveSummaryStatus("success", successMessage);
        if (!silent && typeof createSettingsToast2 === "function") {
          createSettingsToast2(successMessage, "success", 3200);
        }
        return {
          ok: true,
          syncedTopicCount,
          syncedDeArrowTopicCount,
          migrated,
          migratedTopicCount,
          trimmedLocalHistory: trimResult.trimmed
        };
      } catch (error) {
        preventAutomaticRetry = error?.retryable === false;
        const message = formatDriveSummaryError(error);
        setDriveSummaryStatus("error", `上传失败：${message}`);
        if (!silent && typeof createSettingsToast2 === "function") {
          createSettingsToast2(`上传失败：${message}`, "error", 4e3);
        }
        return { ok: false, error };
      } finally {
        driveSummarySyncInFlight = false;
        const dirtySet = ensureDriveSummaryDirtySet();
        const hasDirty = dirtySet.size > 0 || ensureDriveDeArrowDirtyState();
        const shouldQueue = !preventAutomaticRetry && (driveSummarySyncQueued || hasDirty);
        const nextReason = shouldQueue ? mergeDriveSyncReason(driveSummaryQueuedReason, hasDirty ? "queued" : normalizedReason) : "auto";
        driveSummarySyncQueued = false;
        driveSummaryQueuedReason = "auto";
        if (shouldQueue) {
          scheduleDriveSummarySync2(nextReason);
        }
      }
    }
    async function uploadDeArrowStateToDrive2({ silent = true } = {}) {
      if (!ensureDriveDeArrowDirtyState()) {
        markDriveDeArrowDirty2({ schedule: false });
      }
      return uploadSummaryHistoryToDrive2({ reason: "auto", silent });
    }
    function scheduleDriveSummarySync2(reason = "auto") {
      if (!driveSummarySettings2.enabled) return;
      if (!hasDriveSummaryCredentials2()) {
        setDriveSummaryStatus("error", "Drive 凭据未填写完整。");
        return;
      }
      const normalizedReason = normalizeDriveSyncReason(reason);
      driveSummaryQueuedReason = mergeDriveSyncReason(driveSummaryQueuedReason, normalizedReason);
      if (driveSummarySyncInFlight) {
        driveSummarySyncQueued = true;
        return;
      }
      const hasDirty = ensureDriveSummaryDirtySet().size > 0 || ensureDriveDeArrowDirtyState();
      const reasonToRun = driveSummaryQueuedReason;
      const allowNoDirtyRun = reasonToRun === "manual" || reasonToRun === "import";
      if (!hasDirty && !allowNoDirtyRun) {
        return;
      }
      if (driveSummarySyncTimer) {
        clearTimeout(driveSummarySyncTimer);
      }
      const delay = reasonToRun === "manual" ? 120 : reasonToRun === "import" ? 450 : reasonToRun === "queued" ? 700 : 1500;
      driveSummarySyncTimer = setTimeout(() => {
        driveSummarySyncTimer = null;
        const runReason = driveSummaryQueuedReason;
        driveSummaryQueuedReason = "auto";
        uploadSummaryHistoryToDrive2({ reason: runReason, silent: true });
      }, delay);
    }
    return {
      resetDriveSummaryAuthCache: resetDriveSummaryAuthCache2,
      resetDriveDeArrowPullState: resetDriveDeArrowPullState2,
      hasDriveSummaryCredentials: hasDriveSummaryCredentials2,
      markDriveSummaryTopicDirty: markDriveSummaryTopicDirty2,
      markDriveSummaryTopicsDirty: markDriveSummaryTopicsDirty2,
      clearDriveSummaryTopicsDirty: clearDriveSummaryTopicsDirty2,
      markDriveDeArrowDirty: markDriveDeArrowDirty2,
      markDriveDeArrowStateDirty: markDriveDeArrowDirty2,
      clearDriveDeArrowDirty,
      isDriveDeArrowDirty,
      syncDriveSummarySettingsUI: syncDriveSummarySettingsUI2,
      updateDriveSummaryStatusHint: updateDriveSummaryStatusHint2,
      pullTopicHistoryFromDrive: pullTopicHistoryFromDrive2,
      pullTopicQuestionHistoryFromDrive: pullTopicQuestionHistoryFromDrive2,
      pullDeArrowStateFromDrive: pullDeArrowStateFromDrive2,
      hydrateDeArrowStateFromDriveOnce: pullDeArrowStateFromDrive2,
      rebuildSummaryTopicIdsFromDrive: rebuildSummaryTopicIdsFromDrive2,
      uploadSummaryHistoryToDrive: uploadSummaryHistoryToDrive2,
      uploadDeArrowStateToDrive: uploadDeArrowStateToDrive2,
      scheduleDriveSummarySync: scheduleDriveSummarySync2,
      normalizeDriveSyncReason,
      mergeDriveSyncReason,
      normalizeDriveDeArrowTopicStates: normalizeDeArrowTopicStates2,
      mergeDriveDeArrowTopicStates: mergeDeArrowTopicStates2
    };
  }

  // src/features/dearrow/index.js
  var DEARROW_BATCH_SIZE = 20;
  var DEARROW_AUTO_REWRITE_CONCURRENCY = 2;
  var DEARROW_BUTTON_CLASS = "topic-dearrow-button";
  var DEARROW_ICON_SVG = `<svg class="topic-dearrow-icon" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path fill="#1213BD" d="M36 18.302c0 4.981-2.46 9.198-5.655 12.462s-7.323 5.152-12.199 5.152-9.764-1.112-12.959-4.376S0 23.283 0 18.302s2.574-9.38 5.769-12.644S13.271 0 18.146 0s9.394 2.178 12.589 5.442C33.931 8.706 36 13.322 36 18.302z" />
    <path fill="#88c9f9" d="m 30.394282,18.410186 c 0,3.468849 -1.143025,6.865475 -3.416513,9.137917 -2.273489,2.272442 -5.670115,2.92874 -9.137918,2.92874 -3.467803,0 -6.373515,-1.147212 -8.6470033,-3.419654 -2.2734888,-2.272442 -3.5871299,-5.178154 -3.5871299,-8.647003 0,-3.46885 0.9420533,-6.746149 3.2144954,-9.0196379 2.2724418,-2.2734888 5.5507878,-3.9513905 9.0196378,-3.9513905 3.46885,0 6.492841,1.9322561 8.76633,4.204698 2.273489,2.2724424 3.788101,5.2974804 3.788101,8.7663304 z" />
    <path fill="#0a62a5" d="m 23.95823,17.818306 c 0,3.153748 -2.644888,5.808102 -5.798635,5.808102 -3.153748,0 -5.599825,-2.654354 -5.599825,-5.808102 0,-3.153747 2.446077,-5.721714 5.599825,-5.721714 3.153747,0 5.798635,2.567967 5.798635,5.721714 z" />
</svg>`;
  var BUTTON_SEMANTIC_CLASSES = Object.freeze([
    "is-unjudged",
    "is-clickbait",
    "is-neutral",
    "is-rewritten"
  ]);
  var BUTTON_OPERATION_CLASSES = Object.freeze([
    "is-checking",
    "is-preparing",
    "is-rewriting"
  ]);
  var BUTTON_STATE_CLASSES = Object.freeze([
    ...BUTTON_SEMANTIC_CLASSES,
    ...BUTTON_OPERATION_CLASSES,
    "has-error"
  ]);
  var DEARROW_IMAGE_BASE_URL = "https://linux.do/";
  function formatDeArrowImagePlaceholder(image) {
    const compact = (value) => normalizeString2(value).replace(/\s+/g, " ").slice(0, 120);
    const width = compact(image?.width);
    const height = compact(image?.height);
    const parts = [
      `图片#${image?.id || "?"}`,
      image?.floor ? `楼层:${image.floor}` : "",
      image?.username ? `作者:${compact(image.username)}` : "",
      image?.alt ? `alt:${compact(image.alt)}` : "",
      image?.title ? `title:${compact(image.title)}` : "",
      width || height ? `尺寸:${width || "?"}×${height || "?"}` : ""
    ].filter(Boolean);
    return `[${parts.join(" ")}]`;
  }
  var TITLE_SELECTORS = Object.freeze([
    "a.raw-topic-link",
    "a.title",
    ".link-top-line a",
    ".main-link a"
  ]);
  var SKIPPED_TITLE_CONTAINER_SELECTOR = [
    ".badge-wrapper",
    ".discourse-tags",
    ".topic-statuses",
    ".topic-list-icons",
    ".sr-only",
    ".visually-hidden",
    ".svg-icon",
    "svg",
    "img"
  ].join(",");
  function normalizeString2(value) {
    if (value === null || value === void 0) return "";
    return String(value).trim();
  }
  function normalizeTopicId2(value) {
    return normalizeString2(value);
  }
  function normalizeError(error, fallback = "未知错误") {
    if (error instanceof Error && error.message) return error.message;
    if (error && typeof error.message === "string" && error.message.trim()) return error.message.trim();
    return normalizeString2(error) || fallback;
  }
  function getCompletionText(result) {
    if (typeof result === "string") return result;
    if (typeof result?.content === "string") return result.content;
    if (typeof result?.text === "string") return result.text;
    if (typeof result?.choices?.[0]?.message?.content === "string") {
      return result.choices[0].message.content;
    }
    return "";
  }
  function extractJsonText(value) {
    const text = normalizeString2(value);
    if (!text) throw new Error("模型未返回内容");
    const fenced = text.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
    return fenced ? fenced[1].trim() : text;
  }
  function parseDeArrowJudgmentResponse(value) {
    let parsed;
    try {
      parsed = JSON.parse(extractJsonText(getCompletionText(value) || value));
    } catch (error) {
      const parseError = new Error(`DeArrow 判定返回了无效 JSON：${normalizeError(error)}`);
      parseError.code = "DEARROW_INVALID_JUDGMENT_JSON";
      parseError.retryable = false;
      throw parseError;
    }
    const source = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.results) ? parsed.results : Array.isArray(parsed?.topics) ? parsed.topics : null;
    if (!source) {
      const error = new Error("DeArrow 判定 JSON 必须包含 results 数组");
      error.code = "DEARROW_INVALID_JUDGMENT_SHAPE";
      error.retryable = false;
      throw error;
    }
    const results = [];
    const seen = /* @__PURE__ */ new Set();
    source.forEach((item) => {
      if (!item || typeof item !== "object") return;
      const topicId = normalizeTopicId2(item.topicId ?? item.topic_id ?? item.id);
      const verdict = item.verdict ?? item.isClickbait ?? item.clickbait;
      if (!topicId || typeof verdict !== "boolean" || seen.has(topicId)) return;
      seen.add(topicId);
      results.push({
        topicId,
        verdict,
        reason: normalizeString2(item.reason ?? item.verdictReason)
      });
    });
    return results;
  }
  function buildDeArrowJudgmentMessages(topics, prompt = defaultDeArrowSettings.dearrowJudgmentPrompt) {
    const normalizedTopics = Array.isArray(topics) ? topics.slice(0, DEARROW_BATCH_SIZE).map((topic) => ({
      topicId: normalizeTopicId2(topic?.topicId),
      title: normalizeString2(topic?.originalTitle ?? topic?.title)
    })).filter((topic) => topic.topicId && topic.title) : [];
    return [
      {
        role: "system",
        content: normalizeString2(prompt) || defaultDeArrowSettings.dearrowJudgmentPrompt
      },
      {
        role: "user",
        content: JSON.stringify(normalizedTopics)
      }
    ];
  }
  function isValidDeArrowTitle(value) {
    if (typeof value !== "string") return false;
    const title = value.trim();
    if (!title || /[\r\n]/.test(title)) return false;
    if (/<\/?[a-z][^>]*>/i.test(title)) return false;
    return true;
  }
  function parseDeArrowRewriteResponse(value) {
    const content = normalizeString2(getCompletionText(value) || value);
    if (!content) throw new Error("DeArrow 改写未返回标题");
    let title = content;
    const looksLikeJson = content.startsWith("{") || /^```(?:json)?/i.test(content);
    if (looksLikeJson) {
      try {
        const parsed = JSON.parse(extractJsonText(content));
        title = typeof parsed === "string" ? parsed : parsed?.title;
      } catch (error) {
        const parseError = new Error(`DeArrow 改写返回了无效 JSON：${normalizeError(error)}`);
        parseError.code = "DEARROW_INVALID_REWRITE_JSON";
        parseError.retryable = false;
        throw parseError;
      }
    }
    if (!isValidDeArrowTitle(title)) {
      const error = new Error("DeArrow 改写标题为空、包含 HTML 或包含多行内容");
      error.code = "DEARROW_INVALID_REWRITE_TITLE";
      error.retryable = false;
      throw error;
    }
    return title.trim();
  }
  function decodeBasicHtmlEntities(value) {
    return String(value || "").replace(/&(nbsp|amp|lt|gt|quot|#39);/gi, (entity) => ({
      "&nbsp;": " ",
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    })[entity.toLowerCase()] || entity);
  }
  function sanitizeDeArrowFirstPostContent(value) {
    return decodeBasicHtmlEntities(value).replace(/<\s*(script|style)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, " ").replace(/<\s*img\b[^>]*>/gi, " ").replace(/!\[[^\]]*]\([^\n)]*\)/g, " ").replace(/!\[[^\]]*]\[[^\n\]]*]/g, " ").replace(/<\/?[a-z][^>]*>/gi, " ").replace(/[ \t]+/g, " ").replace(/\n[ \t]+/g, "\n").trim();
  }
  function sanitizeDeArrowCookedContent(value) {
    const cooked = String(value || "");
    if (!cooked) return "";
    const withoutImageChrome = cooked.replace(
      /<div\b(?=[^>]*\bclass\s*=\s*(?:"[^"]*\blightbox-wrapper\b[^"]*"|'[^']*\blightbox-wrapper\b[^']*'))[^>]*>[\s\S]*?<\/a>\s*<\/div>/gi,
      " "
    ).replace(
      /<a\b(?=[^>]*\bclass\s*=\s*(?:"[^"]*\blightbox\b[^"]*"|'[^']*\blightbox\b[^']*'))[^>]*>[\s\S]*?<\/a>/gi,
      " "
    ).replace(
      /<div\b(?=[^>]*\bclass\s*=\s*(?:"[^"]*\bmeta\b[^"]*"|'[^']*\bmeta\b[^']*'))[^>]*>[\s\S]*?<\/div>/gi,
      " "
    );
    return sanitizeDeArrowFirstPostContent(withoutImageChrome);
  }
  function getDeArrowFirstPost(payload) {
    if (typeof payload === "string") return null;
    const hasPostNumber = (post) => {
      const value = normalizeString2(post?.post_number);
      return Boolean(value) && Number.isFinite(Number(value));
    };
    const posts = Array.isArray(payload?.post_stream?.posts) ? payload.post_stream.posts : Array.isArray(payload?.posts) ? payload.posts : null;
    if (posts) {
      const explicitFirstPost = posts.find((post) => hasPostNumber(post) && Number(post.post_number) === 1);
      if (explicitFirstPost) return explicitFirstPost;
      const containsNumberedPosts = posts.some(hasPostNumber);
      return containsNumberedPosts ? null : posts[0] || null;
    }
    const candidate = payload?.firstPost ?? payload;
    if (hasPostNumber(candidate) && Number(candidate.post_number) !== 1) {
      return null;
    }
    return candidate;
  }
  function extractDeArrowFirstPostContent(payload) {
    if (typeof payload === "string") return sanitizeDeArrowFirstPostContent(payload);
    const firstPost = getDeArrowFirstPost(payload);
    if (!firstPost) return "";
    if (typeof firstPost.raw === "string") {
      return sanitizeDeArrowFirstPostContent(firstPost.raw);
    }
    for (const candidate of [firstPost.content, firstPost.text]) {
      const content = sanitizeDeArrowFirstPostContent(candidate || "");
      if (content) return content;
    }
    return sanitizeDeArrowCookedContent(firstPost.cooked);
  }
  function extractDeArrowFirstPostContext(payload, options = {}) {
    const firstPost = getDeArrowFirstPost(payload);
    const textContent = extractDeArrowFirstPostContent(payload);
    const extracted = extractImagesFromCooked(firstPost?.cooked || "", {
      baseUrl: options.baseUrl || DEARROW_IMAGE_BASE_URL
    });
    const images = [];
    const skippedImages = [...extracted.skippedImages];
    const seenUrls = /* @__PURE__ */ new Set();
    extracted.images.forEach((image) => {
      if (!image.url || seenUrls.has(image.url)) {
        skippedImages.push({
          ...image,
          reason: image.url ? "duplicate-image" : "missing-url"
        });
        return;
      }
      seenUrls.add(image.url);
      images.push({
        ...image,
        id: images.length + 1,
        floor: firstPost?.post_number || 1,
        username: normalizeString2(firstPost?.username)
      });
    });
    const imagePlaceholders = images.map(formatDeArrowImagePlaceholder).join("\n");
    return {
      textContent,
      content: [textContent, imagePlaceholders].filter(Boolean).join("\n"),
      images,
      skippedImages
    };
  }
  function buildDeArrowRewriteMessages({
    originalTitle,
    content,
    imageInputs = [],
    prompt = defaultDeArrowSettings.dearrowRewritePrompt
  }) {
    const attachedImages = Array.isArray(imageInputs) ? imageInputs : [];
    const hasAttachedImages = attachedImages.length > 0;
    return [
      {
        role: "system",
        content: [
          normalizeString2(prompt) || defaultDeArrowSettings.dearrowRewritePrompt,
          hasAttachedImages ? "用户消息附有仅来自首帖的图片；必须结合图片视觉内容与 [图片#] 占位信息改写标题。" : ""
        ].filter(Boolean).join("\n")
      },
      {
        role: "user",
        content: buildUserContentWithImages(
          JSON.stringify({
            originalTitle: normalizeString2(originalTitle),
            firstPost: normalizeString2(content),
            ...hasAttachedImages ? { attachedImageCount: attachedImages.length } : {}
          }),
          attachedImages
        )
      }
    ];
  }
  function collectTitleTextNodes(root, output = []) {
    if (!root) return output;
    const childNodes = root.childNodes ? Array.from(root.childNodes) : [];
    childNodes.forEach((node) => {
      if (node?.nodeType === 3) {
        if (normalizeString2(node.nodeValue)) output.push(node);
        return;
      }
      if (node?.nodeType !== 1) return;
      if (node.matches?.(SKIPPED_TITLE_CONTAINER_SELECTOR)) return;
      collectTitleTextNodes(node, output);
    });
    return output;
  }
  function createDeArrowTitleAccessor(titleElement) {
    if (!titleElement) return null;
    const textNodes = collectTitleTextNodes(titleElement);
    if (textNodes.length > 0) {
      const firstTextNode = textNodes[0];
      const match = String(firstTextNode.nodeValue || "").match(/^(\s*)([\s\S]*?)(\s*)$/);
      const leading = match?.[1] || "";
      const trailing = textNodes.length === 1 ? match?.[3] || "" : "";
      return {
        element: titleElement,
        getText() {
          return normalizeString2(textNodes.map((node) => String(node.nodeValue || "")).join(""));
        },
        setText(value) {
          const nextText = normalizeString2(value);
          if (!nextText || this.getText() === nextText) return;
          firstTextNode.nodeValue = `${leading}${nextText}${trailing}`;
          textNodes.slice(1).forEach((node) => {
            if (node.nodeValue) node.nodeValue = "";
          });
        }
      };
    }
    const hasElementChildren = Number(titleElement.children?.length || 0) > 0;
    if (hasElementChildren) return null;
    return {
      element: titleElement,
      getText() {
        return normalizeString2(titleElement.textContent);
      },
      setText(value) {
        const nextText = normalizeString2(value);
        if (nextText && normalizeString2(titleElement.textContent) !== nextText) {
          titleElement.textContent = nextText;
        }
      }
    };
  }
  function defaultFindTitleElement(item) {
    for (const selector of TITLE_SELECTORS) {
      const element = item?.querySelector?.(selector);
      if (element) return element;
    }
    return null;
  }
  function defaultGetButtonMountTarget(item) {
    if (!item) return null;
    const summaryButton = item.querySelector?.(".topic-summary-button");
    if (summaryButton?.parentNode) return summaryButton.parentNode;
    if (item.classList?.contains("bookmark-list-item")) {
      return item.querySelector?.(".link-bottom-line") || item.querySelector?.(".main-link") || item;
    }
    return item.querySelector?.(".main-link") || item.querySelector?.("td:nth-child(2)") || item;
  }
  function getBookmarkFlowTarget(item) {
    return item?.querySelector?.(".link-bottom-line") || item?.querySelector?.(".main-link") || item;
  }
  function setAttribute(element, name, value) {
    if (typeof element?.setAttribute === "function") {
      element.setAttribute(name, String(value));
    } else if (element) {
      element[name] = String(value);
    }
  }
  function removeAttribute(element, name) {
    if (typeof element?.removeAttribute === "function") element.removeAttribute(name);
    else if (element && name in element) delete element[name];
  }
  function makeDeferred() {
    let resolve;
    let reject;
    const promise = new Promise((resolvePromise, rejectPromise) => {
      resolve = resolvePromise;
      reject = rejectPromise;
    });
    return { promise, resolve, reject };
  }
  function createDeArrowFeature(deps = {}) {
    const state2 = deps.state && typeof deps.state === "object" ? deps.state : {};
    const documentRef = deps.document ?? globalThis.document;
    const queueMicrotaskImpl = deps.queueMicrotask ?? globalThis.queueMicrotask ?? ((callback) => Promise.resolve().then(callback));
    const setTimeoutImpl = deps.setTimeout ?? globalThis.setTimeout;
    const clearTimeoutImpl = deps.clearTimeout ?? globalThis.clearTimeout;
    const now = typeof deps.now === "function" ? deps.now : () => /* @__PURE__ */ new Date();
    let internalTopicStates = normalizeDeArrowTopicStates(
      deps.initialTopicStates ?? state2.dearrowTopicStates
    );
    let refreshTimer = null;
    let destroyed = false;
    let drainPromise = null;
    let drainScheduled = false;
    const judgmentQueue = /* @__PURE__ */ new Map();
    const judgmentInFlight = /* @__PURE__ */ new Map();
    const judgmentOwnerByTopic = /* @__PURE__ */ new Map();
    const rewriteInFlight = /* @__PURE__ */ new Map();
    const rewriteOwnerByTopic = /* @__PURE__ */ new Map();
    const autoRewriteQueue = /* @__PURE__ */ new Map();
    let autoRewriteActiveCount = 0;
    let rewriteContextGeneration = 0;
    let autoRewriteGeneration = 0;
    const runtimeErrors = /* @__PURE__ */ new Map();
    let visibleDescriptors = [];
    const originalTitlePreviews = /* @__PURE__ */ new Map();
    const buttonInteractionStates = /* @__PURE__ */ new WeakMap();
    function getRawConfig() {
      const value = typeof deps.getConfig === "function" ? deps.getConfig() : state2;
      return value && typeof value === "object" ? value : {};
    }
    function getConfig() {
      const raw = getRawConfig();
      const apiConfigurations2 = typeof deps.getApiConfigurations === "function" ? deps.getApiConfigurations() : raw.apiConfigurations;
      return {
        ...raw,
        ...normalizeDeArrowSettings(raw, apiConfigurations2),
        apiConfigurations: Array.isArray(apiConfigurations2) ? apiConfigurations2 : []
      };
    }
    function getCurrentUrl() {
      if (typeof deps.getCurrentUrl === "function") return String(deps.getCurrentUrl() || "");
      if (typeof state2.currentPageUrl === "string") return state2.currentPageUrl;
      return String(globalThis.location?.href || "");
    }
    function getLiveUrl() {
      if (typeof deps.getLiveUrl === "function") return String(deps.getLiveUrl() || "");
      return String(globalThis.location?.href || getCurrentUrl());
    }
    function isActive(url = getCurrentUrl()) {
      const config = getConfig();
      return config.dearrowEnabled && isDeArrowScopeUrl(url, config.dearrowScopeRules);
    }
    function getTopicStates() {
      const topicStatesGetter = deps.getTopicStates ?? deps.getDeArrowTopicStates;
      const raw = typeof topicStatesGetter === "function" ? topicStatesGetter() : state2.dearrowTopicStates ?? internalTopicStates;
      if (raw && typeof raw === "object" && !Array.isArray(raw)) {
        internalTopicStates = raw;
      }
      return internalTopicStates;
    }
    function notifyAsyncFailure(result, label) {
      if (!result || typeof result.then !== "function") return;
      result.catch((error) => {
        deps.logger?.warn?.(`[DeArrow] ${label}:`, error);
      });
    }
    function setTopicStates(nextStates, meta = {}) {
      internalTopicStates = nextStates && typeof nextStates === "object" && !Array.isArray(nextStates) ? nextStates : {};
      const topicStatesSetter = deps.setTopicStates ?? deps.setDeArrowTopicStates;
      if (typeof topicStatesSetter === "function") {
        notifyAsyncFailure(topicStatesSetter(internalTopicStates, { ...meta, normalized: true }), "保存状态失败");
      } else {
        state2.dearrowTopicStates = internalTopicStates;
      }
      const persistenceWriter = deps.persistTopicStates ?? deps.persistDeArrowTopicStates;
      if (typeof persistenceWriter === "function") {
        notifyAsyncFailure(persistenceWriter(internalTopicStates, meta), "持久化状态失败");
      }
      if (typeof deps.scheduleDriveSync === "function") {
        notifyAsyncFailure(deps.scheduleDriveSync(meta), "Drive 同步排队失败");
      } else if (typeof deps.markDriveDeArrowDirty === "function") {
        notifyAsyncFailure(deps.markDriveDeArrowDirty({ schedule: true, meta }), "Drive 同步排队失败");
      }
      return internalTopicStates;
    }
    function commitTopicStateUpdates(updates, meta = {}) {
      if (!Array.isArray(updates) || updates.length === 0) return getTopicStates();
      const next = { ...getTopicStates() };
      updates.forEach(({ topicId, value }) => {
        const id = normalizeTopicId2(topicId);
        if (!id) return;
        const normalized = normalizeDeArrowTopicState(value);
        if (normalized) next[id] = normalized;
        else delete next[id];
      });
      return setTopicStates(next, meta);
    }
    function resolveApiForPurpose(purpose) {
      const config = getConfig();
      const dedicatedResolver = purpose === "judgment" ? deps.getDeArrowJudgmentApi : deps.getDeArrowRewriteApi;
      if (typeof dedicatedResolver === "function") {
        const selected = dedicatedResolver(config);
        if (selected) return selected;
      }
      if (typeof deps.getDeArrowApi === "function") {
        const selected = deps.getDeArrowApi(config, purpose);
        if (selected) return selected;
      }
      const index = purpose === "judgment" ? config.dearrowJudgmentApiIndex : config.dearrowRewriteApiIndex;
      return config.apiConfigurations[index] ?? config.apiConfigurations[0] ?? null;
    }
    function getModelName(api) {
      return normalizeString2(api?.model) || "未知模型";
    }
    function makeKey(topicId, originalTitle) {
      return `${normalizeTopicId2(topicId)}\0${normalizeString2(originalTitle)}`;
    }
    function getSemanticBundleFingerprint(topicId, originalTitle, kind) {
      const id = normalizeTopicId2(topicId);
      const title = normalizeString2(originalTitle);
      const stored = getTopicStates()[id];
      const matches = stored?.originalTitle === title;
      const bundle = {
        originalTitle: matches ? stored.originalTitle : stored?.originalTitle || title
      };
      if (matches && kind === "judgment") {
        ["verdict", "verdictReason", "verdictModel", "verdictUpdatedAt"].forEach((field) => {
          if (Object.hasOwn(stored, field)) bundle[field] = stored[field];
        });
      } else if (matches && kind === "rewrite") {
        ["rewrittenTitle", "rewriteModel", "rewrittenAt"].forEach((field) => {
          if (Object.hasOwn(stored, field)) bundle[field] = stored[field];
        });
      }
      return stableSerialize(bundle);
    }
    function recordRuntimeError({
      key,
      topicId,
      originalTitle,
      error,
      kind,
      baselineFingerprint
    }) {
      const normalizedKind = kind === "judgment" ? "judgment" : "rewrite";
      const baseline = normalizeString2(baselineFingerprint) || getSemanticBundleFingerprint(topicId, originalTitle, normalizedKind);
      if (getSemanticBundleFingerprint(topicId, originalTitle, normalizedKind) !== baseline) {
        runtimeErrors.delete(key);
        return null;
      }
      const value = {
        kind: normalizedKind,
        message: normalizeError(error, "DeArrow 操作失败"),
        baselineFingerprint: baseline,
        failedAt: now().toISOString()
      };
      runtimeErrors.set(key, value);
      return value;
    }
    function getCurrentRuntimeError(key, topicId, originalTitle) {
      const value = runtimeErrors.get(key);
      if (!value) return null;
      const normalized = typeof value === "string" ? {
        kind: "rewrite",
        message: value,
        baselineFingerprint: getSemanticBundleFingerprint(topicId, originalTitle, "rewrite")
      } : value;
      if (getSemanticBundleFingerprint(topicId, originalTitle, normalized.kind) !== normalized.baselineFingerprint) {
        runtimeErrors.delete(key);
        return null;
      }
      return normalized;
    }
    function pruneRuntimeErrorsForTopic(topicId, currentKey) {
      const prefix = `${normalizeTopicId2(topicId)}\0`;
      runtimeErrors.forEach((_value, key) => {
        if (key.startsWith(prefix) && key !== currentKey) runtimeErrors.delete(key);
      });
    }
    function getStoredSemanticState(topicId, originalTitle) {
      const stored = getTopicStates()[normalizeTopicId2(topicId)];
      if (!stored || stored.originalTitle !== normalizeString2(originalTitle)) {
        return { name: "unjudged", stored: null };
      }
      if (stored.rewrittenTitle) return { name: "rewritten", stored };
      if (stored.verdict === true) return { name: "clickbait", stored };
      if (stored.verdict === false) return { name: "neutral", stored };
      return { name: "unjudged", stored };
    }
    function getCurrentRewritePromise(topicId, key) {
      const promise = rewriteInFlight.get(key);
      const owner = rewriteOwnerByTopic.get(topicId);
      return promise && owner?.key === key && isRewriteOperationCurrent(owner) ? promise : null;
    }
    function drainAutoRewriteQueue() {
      if (destroyed || !isActive() || !getConfig().dearrowAutoRewrite) {
        autoRewriteQueue.clear();
        return;
      }
      while (autoRewriteActiveCount < DEARROW_AUTO_REWRITE_CONCURRENCY && autoRewriteQueue.size > 0) {
        const [key, queuedTopic] = autoRewriteQueue.entries().next().value;
        autoRewriteQueue.delete(key);
        const stored = getTopicStates()[queuedTopic.topicId];
        if (stored?.originalTitle !== queuedTopic.originalTitle || stored.verdict !== true || normalizeString2(stored.rewrittenTitle) || getCurrentRewritePromise(queuedTopic.topicId, key)) {
          continue;
        }
        if (queuedTopic.generation !== rewriteContextGeneration || queuedTopic.autoGeneration !== autoRewriteGeneration) continue;
        autoRewriteActiveCount += 1;
        let rewriteTask;
        try {
          rewriteTask = rewriteTopic(queuedTopic.topicId, {
            originalTitle: queuedTopic.originalTitle,
            automatic: true,
            generation: queuedTopic.generation,
            autoGeneration: queuedTopic.autoGeneration
          });
        } catch (error) {
          rewriteTask = Promise.reject(error);
        }
        Promise.resolve(rewriteTask).catch(() => {
        }).finally(() => {
          autoRewriteActiveCount = Math.max(0, autoRewriteActiveCount - 1);
          drainAutoRewriteQueue();
        });
      }
    }
    function invalidateRewriteContext() {
      rewriteContextGeneration += 1;
      autoRewriteGeneration += 1;
      autoRewriteQueue.clear();
      const staleError = createStaleOperationError("页面已切换，已忽略过期判断");
      judgmentQueue.forEach((entry) => finalizeJudgmentEntry(entry, "reject", staleError));
      judgmentQueue.clear();
    }
    function cancelAutoRewrites() {
      autoRewriteGeneration += 1;
      autoRewriteQueue.clear();
    }
    function maybeAutoRewriteTopic(topic) {
      const config = getConfig();
      if (!config.dearrowAutoRewrite || !isActive()) return null;
      const topicId = normalizeTopicId2(topic?.topicId);
      const originalTitle = normalizeString2(topic?.originalTitle ?? topic?.title);
      if (!topicId || !originalTitle) return null;
      const stored = getTopicStates()[topicId];
      if (stored?.originalTitle !== originalTitle || stored.verdict !== true || normalizeString2(stored.rewrittenTitle)) {
        return null;
      }
      const key = makeKey(topicId, originalTitle);
      const currentRewritePromise = getCurrentRewritePromise(topicId, key);
      if (currentRewritePromise) return currentRewritePromise;
      if (autoRewriteQueue.has(key)) return autoRewriteQueue.get(key);
      const currentError = getCurrentRuntimeError(key, topicId, originalTitle);
      if (currentError?.kind === "rewrite") return null;
      const queuedTopic = {
        topicId,
        originalTitle,
        generation: rewriteContextGeneration,
        autoGeneration: autoRewriteGeneration
      };
      autoRewriteQueue.set(key, queuedTopic);
      drainAutoRewriteQueue();
      return queuedTopic;
    }
    function scheduleAutoRewritesForVisible() {
      if (!getConfig().dearrowAutoRewrite || !isActive()) return;
      visibleDescriptors.forEach((descriptor) => {
        maybeAutoRewriteTopic(descriptor);
      });
    }
    function getOperationView(topicId, key) {
      const rewriteOperation = rewriteOwnerByTopic.get(normalizeTopicId2(topicId));
      if (rewriteOperation?.key === key && isRewriteOperationCurrent(rewriteOperation)) {
        if (rewriteOperation.phase === "awaiting-judgment") {
          return { state: "judging", message: rewriteOperation.message || "" };
        }
        if (rewriteOperation.phase === "fetching-content" || rewriteOperation.phase === "retry-wait") {
          return { state: "preparing", message: rewriteOperation.message || "" };
        }
        if (rewriteOperation.phase === "requesting-model") {
          return { state: "rewriting", message: rewriteOperation.message || "" };
        }
      }
      const judgmentOperation = judgmentOwnerByTopic.get(normalizeTopicId2(topicId));
      if (judgmentOperation?.key === key && isJudgmentEntryCurrent(judgmentOperation)) {
        return { state: "judging", message: "" };
      }
      return { state: "idle", message: "" };
    }
    function selectButtonView(descriptor) {
      const semantic = getStoredSemanticState(descriptor.topicId, descriptor.originalTitle);
      const error = getCurrentRuntimeError(
        descriptor.key,
        descriptor.topicId,
        descriptor.originalTitle
      );
      const operation = error ? { state: "idle", message: "" } : getOperationView(descriptor.topicId, descriptor.key);
      return { semantic, operation, error };
    }
    function ensureButtonIcon(button) {
      if (!button || button.querySelector?.(".topic-dearrow-icon")) return;
      button.innerHTML = DEARROW_ICON_SVG;
    }
    function renderButtonView(button, view, details = {}) {
      if (!button) return;
      ensureButtonIcon(button);
      const semanticState = view?.semantic?.name || "unjudged";
      const operationState = view?.operation?.state || "idle";
      const error = view?.error || null;
      const previewable = semanticState === "rewritten" && operationState === "idle";
      if (!previewable) {
        endOriginalTitlePreview(button, "", { force: true, restore: true });
      }
      button.classList?.remove?.(...BUTTON_STATE_CLASSES);
      button.classList?.add?.(`is-${semanticState}`);
      if (operationState === "judging") button.classList?.add?.("is-checking");
      if (operationState === "preparing") button.classList?.add?.("is-preparing");
      if (operationState === "rewriting") button.classList?.add?.("is-rewriting");
      if (error) button.classList?.add?.("has-error");
      button.dataset.semanticState = semanticState;
      button.dataset.operationState = operationState;
      if (error?.kind) button.dataset.errorKind = error.kind;
      else delete button.dataset.errorKind;
      button.dataset.state = error ? "error" : operationState === "judging" ? "checking" : operationState === "preparing" ? "preparing" : operationState === "rewriting" ? "rewriting" : semanticState;
      button.disabled = operationState === "preparing" || operationState === "rewriting";
      removeAttribute(button, "aria-busy");
      const originalTitle = normalizeString2(details.originalTitle || button.dataset.originalTitle);
      const reason = normalizeString2(view?.semantic?.stored?.verdictReason || details.reason);
      const operationMessage = normalizeString2(view?.operation?.message || details.message);
      if (originalTitle) button.dataset.originalTitle = originalTitle;
      let ariaLabel = "";
      if (error) {
        button.title = error.message ? `DeArrow 失败：${error.message}` : "DeArrow 失败，点击重试";
        ariaLabel = semanticState === "rewritten" ? `${button.title}。当前保留上次改写；悬停可临时查看原标题：${originalTitle}` : button.title;
      } else if (operationState === "judging") {
        button.title = operationMessage || "正在判断是否为标题党；点击后会在判断完成后改写";
        setAttribute(button, "aria-busy", "true");
        ariaLabel = button.title;
      } else if (operationState === "preparing") {
        button.title = operationMessage || "正在提取首帖内容";
        setAttribute(button, "aria-busy", "true");
        ariaLabel = button.title;
      } else if (operationState === "rewriting") {
        button.title = operationMessage || "正在根据首帖改写标题";
        setAttribute(button, "aria-busy", "true");
        ariaLabel = button.title;
      } else if (semanticState === "clickbait") {
        button.title = reason ? `疑似标题党：${reason}` : "疑似标题党，点击改写";
        ariaLabel = button.title;
      } else if (semanticState === "neutral") {
        button.title = reason || "未检测到标题党特征，仍可点击改写";
        ariaLabel = button.title;
      } else if (semanticState === "rewritten") {
        button.title = "";
        ariaLabel = originalTitlePreviews.has(button) ? `DeArrow 已改写，当前临时显示原标题：${originalTitle}` : `DeArrow 已改写。悬停可临时查看原标题：${originalTitle}`;
      } else {
        button.title = "尚未判断是否为标题党；点击后将先判断再改写";
        ariaLabel = button.title;
      }
      const activePreview = originalTitlePreviews.get(button);
      if (activePreview && previewable) {
        activePreview.restingTitle = button.title;
        activePreview.restingAriaLabel = ariaLabel;
        button.title = "";
        ariaLabel = `DeArrow 已改写，当前临时显示原标题：${originalTitle}`;
      }
      setAttribute(button, "aria-label", ariaLabel);
    }
    function renderStoredState(descriptor) {
      const stored = getTopicStates()[descriptor.topicId];
      const matchingStored = stored?.originalTitle === descriptor.originalTitle ? stored : null;
      if (matchingStored?.rewrittenTitle) {
        const knownRewrite = normalizeString2(descriptor.button.dataset?.rewrittenTitle) === matchingStored.rewrittenTitle;
        const preview = originalTitlePreviews.get(descriptor.button);
        if (preview && knownRewrite) {
          preview.accessor = descriptor.accessor;
          preview.originalTitle = matchingStored.originalTitle;
          preview.rewrittenTitle = matchingStored.rewrittenTitle;
        } else {
          if (preview) {
            endOriginalTitlePreview(descriptor.button, "", {
              force: true,
              restore: false
            });
          }
          descriptor.accessor.setText(matchingStored.rewrittenTitle);
          if (!knownRewrite) suppressPreviewForCurrentInteraction(descriptor.button);
        }
        descriptor.button.dataset.rewrittenTitle = matchingStored.rewrittenTitle;
      } else {
        const previousRewrite = normalizeString2(descriptor.button.dataset?.rewrittenTitle);
        if (previousRewrite) {
          endOriginalTitlePreview(descriptor.button, "", { force: true, restore: false });
          if (normalizeString2(descriptor.accessor.getText?.()) === previousRewrite) {
            descriptor.accessor.setText(descriptor.originalTitle);
          }
          delete descriptor.button.dataset.rewrittenTitle;
        }
      }
      const view = selectButtonView(descriptor);
      renderButtonView(descriptor.button, view, {
        originalTitle: descriptor.originalTitle
      });
      return Boolean(
        matchingStored?.rewrittenTitle || typeof matchingStored?.verdict === "boolean" || view.error || view.operation.state !== "idle"
      );
    }
    function renderKey(key) {
      visibleDescriptors.forEach((descriptor) => {
        if (descriptor.key === key) renderStoredState(descriptor);
      });
    }
    function invalidateChangedTitle(topicId, stored, nextOriginalTitle) {
      const id = normalizeTopicId2(topicId);
      const title = normalizeString2(nextOriginalTitle);
      if (!id || !stored || !title) return;
      const updatedAt = now().toISOString();
      commitTopicStateUpdates([{
        topicId: id,
        value: { originalTitle: title, updatedAt }
      }], {
        topicId: id,
        topicIds: [id],
        kind: "invalidate"
      });
    }
    function resolveDescriptorOriginalTitle(topicId, accessor, button) {
      const displayedTitle = normalizeString2(accessor?.getText?.());
      if (!displayedTitle) return "";
      const buttonOriginal = normalizeString2(button?.dataset?.originalTitle);
      const buttonRewrite = normalizeString2(button?.dataset?.rewrittenTitle);
      const stored = getTopicStates()[topicId];
      const displayedIsOldPresentation = Boolean(
        buttonOriginal && (displayedTitle === buttonOriginal || displayedTitle === buttonRewrite)
      );
      const displayedIsStoredPresentation = Boolean(
        stored && (displayedTitle === normalizeString2(stored.originalTitle) || displayedTitle === normalizeString2(stored.rewrittenTitle))
      );
      if (stored && (displayedIsOldPresentation || displayedIsStoredPresentation)) {
        const activePreview = originalTitlePreviews.get(button);
        const canPreservePreview = Boolean(
          activePreview && displayedTitle === activePreview.originalTitle && normalizeString2(stored.originalTitle) === activePreview.originalTitle && normalizeString2(stored.rewrittenTitle) === activePreview.rewrittenTitle
        );
        if (canPreservePreview) {
          activePreview.accessor = accessor;
          const nextKey2 = makeKey(topicId, activePreview.originalTitle);
          pruneRuntimeErrorsForTopic(topicId, nextKey2);
          return activePreview.originalTitle;
        }
        endOriginalTitlePreview(button, "", { force: true, restore: false });
        const nextOriginalTitle = normalizeString2(stored.originalTitle);
        const nextRewrittenTitle = normalizeString2(stored.rewrittenTitle);
        const nextDisplayedTitle = nextRewrittenTitle || nextOriginalTitle;
        if (nextDisplayedTitle && displayedTitle !== nextDisplayedTitle) {
          accessor.setText?.(nextDisplayedTitle);
          suppressPreviewForCurrentInteraction(button);
        }
        button.dataset.originalTitle = nextOriginalTitle;
        if (nextRewrittenTitle) button.dataset.rewrittenTitle = nextRewrittenTitle;
        else delete button.dataset.rewrittenTitle;
        const nextKey = makeKey(topicId, nextOriginalTitle);
        pruneRuntimeErrorsForTopic(topicId, nextKey);
        return nextOriginalTitle;
      }
      if (!stored && displayedIsOldPresentation) {
        endOriginalTitlePreview(button, "", { force: true, restore: false });
        if (buttonOriginal && displayedTitle !== buttonOriginal) {
          accessor.setText?.(buttonOriginal);
          suppressPreviewForCurrentInteraction(button);
        }
        delete button.dataset.rewrittenTitle;
        const nextKey = makeKey(topicId, buttonOriginal);
        pruneRuntimeErrorsForTopic(topicId, nextKey);
        return buttonOriginal;
      }
      if (stored) {
        invalidateChangedTitle(topicId, stored, displayedTitle);
      }
      pruneRuntimeErrorsForTopic(topicId, makeKey(topicId, displayedTitle));
      return displayedTitle;
    }
    function findTitleElement(item) {
      if (typeof deps.findTitleElement === "function") return deps.findTitleElement(item);
      return defaultFindTitleElement(item);
    }
    function getTitleAccessor(item) {
      if (typeof deps.getTitleAccessor === "function") return deps.getTitleAccessor(item);
      return createDeArrowTitleAccessor(findTitleElement(item));
    }
    function beginOriginalTitlePreview(button, item, reason) {
      if (!button || button.dataset?.semanticState !== "rewritten" || button.dataset?.operationState !== "idle") return;
      const originalTitle = normalizeString2(button.dataset?.originalTitle);
      const topicId = normalizeTopicId2(button.dataset?.topicId);
      const stored = getTopicStates()[topicId];
      const rewrittenTitle = stored?.originalTitle === originalTitle ? normalizeString2(stored.rewrittenTitle) : "";
      if (!originalTitle || !rewrittenTitle) return;
      let preview = originalTitlePreviews.get(button);
      if (!preview) {
        const accessor = getTitleAccessor(item);
        if (!accessor) return;
        preview = {
          accessor,
          originalTitle,
          rewrittenTitle,
          hover: false,
          focus: false,
          restingTitle: button.title || "",
          restingAriaLabel: button.getAttribute?.("aria-label") || ""
        };
        originalTitlePreviews.set(button, preview);
        if (normalizeString2(accessor.getText?.()) === rewrittenTitle) {
          accessor.setText?.(originalTitle);
        }
        button.classList?.add?.("is-previewing-original");
      }
      if (reason === "focus") preview.focus = true;
      else preview.hover = true;
      button.title = "";
      setAttribute(button, "aria-label", `DeArrow 已改写，当前临时显示原标题：${originalTitle}`);
    }
    function endOriginalTitlePreview(button, reason, options = {}) {
      const preview = originalTitlePreviews.get(button);
      if (!preview) return;
      if (reason === "focus") preview.focus = false;
      else if (reason === "hover") preview.hover = false;
      if (!options.force && (preview.hover || preview.focus)) return;
      originalTitlePreviews.delete(button);
      button.classList?.remove?.("is-previewing-original");
      if (options.restore !== false) {
        const topicId = normalizeTopicId2(button.dataset?.topicId);
        const stored = getTopicStates()[topicId];
        const rewrittenTitle = stored?.originalTitle === preview.originalTitle ? normalizeString2(stored.rewrittenTitle) : normalizeString2(button.dataset?.rewrittenTitle || preview.rewrittenTitle);
        if (rewrittenTitle && normalizeString2(preview.accessor.getText?.()) === preview.originalTitle) {
          preview.accessor.setText?.(rewrittenTitle);
          button.dataset.rewrittenTitle = rewrittenTitle;
        }
      }
      if (button.dataset?.semanticState === "rewritten") {
        button.title = preview.restingTitle || "";
        setAttribute(
          button,
          "aria-label",
          preview.restingAriaLabel || `DeArrow 已改写。悬停可临时查看原标题：${preview.originalTitle}`
        );
      }
    }
    function suppressPreviewForCurrentInteraction(button) {
      const interaction = buttonInteractionStates.get(button);
      if (!interaction) return;
      if (interaction.hover) interaction.suppressHoverPreview = true;
      if (interaction.focus) interaction.suppressFocusPreview = true;
    }
    function setButtonInteraction(button, item, reason, active) {
      const interaction = buttonInteractionStates.get(button) || {
        hover: false,
        focus: false,
        suppressHoverPreview: false,
        suppressFocusPreview: false
      };
      if (reason === "focus") {
        interaction.focus = active;
        if (!active) interaction.suppressFocusPreview = false;
      } else {
        interaction.hover = active;
        if (!active) interaction.suppressHoverPreview = false;
      }
      buttonInteractionStates.set(button, interaction);
      if (!active) {
        endOriginalTitlePreview(button, reason);
        return;
      }
      const isSuppressed = reason === "focus" ? interaction.suppressFocusPreview : interaction.suppressHoverPreview;
      if (!isSuppressed) beginOriginalTitlePreview(button, item, reason);
    }
    function getTopicId(item) {
      if (typeof deps.extractTopicIdFromElement === "function") {
        return normalizeTopicId2(deps.extractTopicIdFromElement(item));
      }
      const explicit = normalizeTopicId2(item?.dataset?.topicId);
      if (explicit) return explicit;
      const href = findTitleElement(item)?.getAttribute?.("href") || "";
      return normalizeTopicId2(href.match(/\/t\/(?:[^/]+\/)?(\d+)/)?.[1]);
    }
    function mountButton(item, button) {
      if (item?.classList?.contains?.("bookmark-list-item")) {
        const flowTarget = getBookmarkFlowTarget(item);
        if (!flowTarget) return false;
        let stack = item.querySelector?.(".topic-dearrow-control-stack");
        if (!stack) {
          stack = documentRef?.createElement?.("div");
          if (!stack) return false;
          stack.className = "topic-dearrow-control-stack";
          flowTarget.appendChild?.(stack);
        } else if (stack.parentNode !== flowTarget) {
          flowTarget.appendChild?.(stack);
        }
        const summaryButton2 = item.querySelector?.(".topic-summary-button");
        if (button.parentNode !== stack) {
          if (summaryButton2?.parentNode === stack && typeof stack.insertBefore === "function") {
            stack.insertBefore(button, summaryButton2);
          } else {
            stack.appendChild?.(button);
          }
        }
        if (summaryButton2 && summaryButton2.parentNode !== stack) {
          stack.appendChild?.(summaryButton2);
        }
        return true;
      }
      const target = typeof deps.getButtonMountTarget === "function" ? deps.getButtonMountTarget(item) : defaultGetButtonMountTarget(item);
      if (!target) return false;
      const summaryButton = item.querySelector?.(".topic-summary-button");
      if (summaryButton?.parentNode === target && button.nextSibling !== summaryButton && typeof target.insertBefore === "function") {
        target.insertBefore(button, summaryButton);
      } else if (button.parentNode !== target) {
        target.appendChild?.(button);
      }
      return true;
    }
    function createButton(item, topicId) {
      const button = documentRef?.createElement?.("button");
      if (!button) return null;
      button.type = "button";
      button.className = DEARROW_BUTTON_CLASS;
      button.dataset.topicId = topicId;
      ensureButtonIcon(button);
      button.addEventListener?.("click", (event) => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        endOriginalTitlePreview(button, "", { force: true, restore: true });
        const activeTopicId = normalizeTopicId2(button.dataset.topicId);
        const originalTitle = normalizeString2(button.dataset.originalTitle);
        rewriteTopic(activeTopicId, { originalTitle }).catch(() => {
        });
      });
      button.addEventListener?.("mouseenter", () => setButtonInteraction(button, item, "hover", true));
      button.addEventListener?.("mouseleave", () => setButtonInteraction(button, item, "hover", false));
      button.addEventListener?.("focus", () => setButtonInteraction(button, item, "focus", true));
      button.addEventListener?.("blur", () => setButtonInteraction(button, item, "focus", false));
      return button;
    }
    function isSoftHidden(item) {
      if (typeof deps.isSoftHidden === "function") return deps.isSoftHidden(item) === true;
      const getStyle = deps.getComputedStyle ?? globalThis.getComputedStyle;
      if (!item || typeof getStyle !== "function") return false;
      const style = getStyle(item);
      if (style?.display === "none") return true;
      if (style?.visibility === "collapse" || style?.visibility === "hidden") return true;
      if (style?.position === "absolute") {
        const left = Number.parseInt(style.left, 10);
        if (Number.isFinite(left) && left < -900) return true;
      }
      return false;
    }
    function restoreItemFromStoredState(item, button = null) {
      const accessor = getTitleAccessor(item);
      if (!accessor) return;
      const topicId = normalizeTopicId2(button?.dataset?.topicId) || getTopicId(item);
      const stored = getTopicStates()[topicId];
      const originalTitle = normalizeString2(
        button?.dataset?.originalTitle || stored?.originalTitle
      );
      const rewrittenTitle = normalizeString2(
        button?.dataset?.rewrittenTitle || stored?.rewrittenTitle
      );
      if (originalTitle && rewrittenTitle && normalizeString2(accessor.getText()) === rewrittenTitle) {
        accessor.setText(originalTitle);
      }
    }
    function cleanupItem(item) {
      if (!item) return;
      visibleDescriptors.filter((descriptor) => descriptor.item === item).forEach(restoreDescriptorTitle);
      const buttons = Array.from(item.querySelectorAll?.(`.${DEARROW_BUTTON_CLASS}`) || []);
      if (buttons.length === 0) restoreItemFromStoredState(item);
      buttons.forEach((button) => {
        endOriginalTitlePreview(button, "", { force: true, restore: false });
        restoreItemFromStoredState(item, button);
        button.remove?.();
      });
      const stack = item.querySelector?.(".topic-dearrow-control-stack");
      if (stack?.parentNode) {
        const summaryButton = stack.querySelector?.(".topic-summary-button");
        if (summaryButton) {
          stack.parentNode.insertBefore?.(summaryButton, stack);
        }
        stack.remove?.();
      }
      item.classList?.remove?.("has-dearrow-button");
    }
    function collectVisibleDescriptors() {
      const descriptors = [];
      const topicItems = Array.from(documentRef?.querySelectorAll?.(".topic-list-item") || []);
      topicItems.forEach((item) => {
        if (isSoftHidden(item)) {
          cleanupItem(item);
          return;
        }
        const topicId = getTopicId(item);
        if (!topicId) {
          cleanupItem(item);
          return;
        }
        const accessor = getTitleAccessor(item);
        if (!accessor) {
          cleanupItem(item);
          return;
        }
        const existingButtons = Array.from(item.querySelectorAll?.(`.${DEARROW_BUTTON_CLASS}`) || []);
        let button = existingButtons.find((candidate) => normalizeTopicId2(candidate.dataset?.topicId) === topicId) || null;
        existingButtons.forEach((candidate) => {
          if (candidate === button) return;
          endOriginalTitlePreview(candidate, "", { force: true, restore: false });
          candidate.remove?.();
        });
        if (!button) button = createButton(item, topicId);
        if (!button) return;
        const originalTitle = resolveDescriptorOriginalTitle(topicId, accessor, button);
        if (!originalTitle) {
          cleanupItem(item);
          return;
        }
        button.dataset.topicId = topicId;
        button.dataset.originalTitle = originalTitle;
        item.classList?.add?.("has-dearrow-button");
        if (item.querySelector?.(".topic-summary-button")) {
          item.classList?.add?.("has-summary-button");
        } else {
          item.classList?.remove?.("has-summary-button");
        }
        const descriptor = {
          item,
          button,
          accessor,
          topicId,
          originalTitle,
          key: makeKey(topicId, originalTitle)
        };
        renderStoredState(descriptor);
        if (!mountButton(item, button)) return;
        descriptors.push(descriptor);
      });
      const currentButtons = new Set(descriptors.map((descriptor) => descriptor.button));
      originalTitlePreviews.forEach((_preview, button) => {
        if (!currentButtons.has(button)) {
          endOriginalTitlePreview(button, "", { force: true, restore: false });
        }
      });
      return descriptors;
    }
    function restoreDescriptorTitle(descriptor) {
      const originalTitle = normalizeString2(
        descriptor?.button?.dataset?.originalTitle || descriptor?.originalTitle
      );
      const rewrittenTitle = normalizeString2(descriptor?.button?.dataset?.rewrittenTitle);
      const displayedTitle = normalizeString2(descriptor?.accessor?.getText?.());
      if (originalTitle && rewrittenTitle && displayedTitle === rewrittenTitle) {
        descriptor.accessor?.setText?.(originalTitle);
      }
    }
    function cleanup() {
      invalidateRewriteContext();
      originalTitlePreviews.forEach((_preview, button) => {
        endOriginalTitlePreview(button, "", { force: true, restore: false });
      });
      visibleDescriptors.forEach(restoreDescriptorTitle);
      const knownDescriptors = new Map(visibleDescriptors.map((descriptor) => [descriptor.button, descriptor]));
      const buttons = Array.from(documentRef?.querySelectorAll?.(`.${DEARROW_BUTTON_CLASS}`) || []);
      buttons.forEach((button) => {
        let descriptor = knownDescriptors.get(button);
        if (!descriptor) {
          const item2 = button.closest?.(".topic-list-item");
          const accessor = getTitleAccessor(item2);
          descriptor = { button, accessor, originalTitle: button.dataset?.originalTitle };
        }
        restoreDescriptorTitle(descriptor);
        const item = button.closest?.(".topic-list-item");
        button.remove?.();
        item?.classList?.remove?.("has-dearrow-button");
      });
      Array.from(documentRef?.querySelectorAll?.(".topic-list-item.has-dearrow-button") || []).forEach((item) => cleanupItem(item));
      visibleDescriptors = [];
    }
    async function callCompletion(messages, purpose, currentApi) {
      const requestCompletion = deps.requestCompletion ?? deps.requestChatCompletion;
      if (typeof requestCompletion !== "function") {
        throw new Error("DeArrow 缺少模型请求实现");
      }
      return requestCompletion({ currentApi, messages, purpose });
    }
    async function prepareFirstPostImages(firstPostContext, currentApi) {
      const images = Array.isArray(firstPostContext?.images) ? firstPostContext.images : [];
      if (currentApi?.imageInputEnabled !== true || images.length === 0) {
        return {
          imageInputs: [],
          preparedImages: [],
          skippedImages: []
        };
      }
      const prepareImages = typeof deps.prepareImageInputsForApi === "function" ? deps.prepareImageInputsForApi : prepareImageInputsForApi;
      try {
        return await prepareImages(images, {
          apiConfig: currentApi,
          requestImpl: deps.imageRequest,
          fetchImpl: deps.imageFetch,
          baseUrl: DEARROW_IMAGE_BASE_URL
        });
      } catch (error) {
        deps.logger?.warn?.("[DeArrow] first-post image preparation failed:", error);
        return {
          imageInputs: [],
          preparedImages: [],
          skippedImages: images.map((image) => ({
            ...image,
            reason: "image-preparation-failed",
            error: normalizeError(error)
          }))
        };
      }
    }
    function createStaleOperationError(message = "DeArrow 操作已过期") {
      const error = new Error(message);
      error.code = "DEARROW_STALE_OPERATION";
      error.retryable = false;
      return error;
    }
    function isStaleOperationError(error) {
      return error?.code === "DEARROW_STALE_OPERATION";
    }
    function finalizeJudgmentEntry(entry, action, value) {
      if (!entry || entry.settled) return false;
      entry.settled = true;
      if (judgmentInFlight.get(entry.key) === entry.deferred.promise) {
        judgmentInFlight.delete(entry.key);
      }
      if (judgmentOwnerByTopic.get(entry.topic.topicId) === entry) {
        judgmentOwnerByTopic.delete(entry.topic.topicId);
      }
      if (action === "resolve") entry.deferred.resolve(value);
      else entry.deferred.reject(value);
      return true;
    }
    function isJudgmentEntryCurrent(entry) {
      if (destroyed || !entry || entry.settled || !isActive() || entry.generation !== rewriteContextGeneration || entry.sourceUrl !== getLiveUrl() || judgmentOwnerByTopic.get(entry.topic.topicId) !== entry || !isOperationOriginalStillCurrent(entry.topic.topicId, entry.topic.originalTitle)) {
        return false;
      }
      return getSemanticBundleFingerprint(
        entry.topic.topicId,
        entry.topic.originalTitle,
        "judgment"
      ) === entry.baselineFingerprint;
    }
    function rejectStaleJudgmentEntry(entry) {
      const staleError = createStaleOperationError("标题已变更，已忽略过期判断结果");
      finalizeJudgmentEntry(entry, "reject", staleError);
      renderKey(entry.key);
      if (!destroyed && isActive()) scheduleRefresh(0, { judge: false });
    }
    async function processJudgmentBatch(entries) {
      const topics = entries.map((entry) => entry.topic);
      const currentApi = resolveApiForPurpose("judgment");
      if (!currentApi) throw new Error("DeArrow 没有可用的标题判断 API 配置");
      const response = await callCompletion(
        buildDeArrowJudgmentMessages(topics, getConfig().dearrowJudgmentPrompt),
        "dearrow-judgment",
        currentApi
      );
      const parsed = parseDeArrowJudgmentResponse(response);
      const byTopicId = new Map(parsed.map((item) => [item.topicId, item]));
      const timestamp = now().toISOString();
      const updates = [];
      const successes = [];
      const missing = [];
      entries.forEach((entry) => {
        if (!isJudgmentEntryCurrent(entry)) {
          rejectStaleJudgmentEntry(entry);
          return;
        }
        const result = byTopicId.get(entry.topic.topicId);
        if (!result) {
          missing.push(entry);
          return;
        }
        const existing = getTopicStates()[entry.topic.topicId];
        const value = updateDeArrowVerdictState(existing, {
          originalTitle: entry.topic.originalTitle,
          verdict: result.verdict,
          reason: result.reason,
          model: getModelName(currentApi),
          timestamp
        });
        if (!value) return;
        updates.push({ topicId: entry.topic.topicId, value });
        successes.push({ entry, result, value });
      });
      if (updates.length > 0) {
        const topicIds = updates.map((update) => update.topicId);
        commitTopicStateUpdates(updates, {
          topicId: topicIds.length === 1 ? topicIds[0] : "",
          topicIds,
          kind: "verdict"
        });
      }
      successes.forEach(({ entry, value }) => {
        runtimeErrors.delete(entry.key);
        finalizeJudgmentEntry(entry, "resolve", value);
        renderKey(entry.key);
        maybeAutoRewriteTopic(entry.topic);
      });
      missing.forEach((entry) => {
        const error = new Error(`DeArrow 判定结果缺少话题 ${entry.topic.topicId}`);
        error.code = "DEARROW_MISSING_JUDGMENT";
        error.retryable = false;
        recordRuntimeError({
          key: entry.key,
          topicId: entry.topic.topicId,
          originalTitle: entry.topic.originalTitle,
          error,
          kind: "judgment",
          baselineFingerprint: entry.baselineFingerprint
        });
        finalizeJudgmentEntry(entry, "reject", error);
        renderKey(entry.key);
      });
    }
    async function drainJudgmentQueue() {
      if (drainPromise) return drainPromise;
      drainScheduled = false;
      drainPromise = (async () => {
        while (!destroyed && judgmentQueue.size > 0) {
          const entries = Array.from(judgmentQueue.values()).slice(0, DEARROW_BATCH_SIZE);
          entries.forEach((entry) => judgmentQueue.delete(entry.key));
          try {
            await processJudgmentBatch(entries);
          } catch (error) {
            entries.forEach((entry) => {
              if (entry.settled) return;
              if (!isJudgmentEntryCurrent(entry)) {
                rejectStaleJudgmentEntry(entry);
                return;
              }
              recordRuntimeError({
                key: entry.key,
                topicId: entry.topic.topicId,
                originalTitle: entry.topic.originalTitle,
                error,
                kind: "judgment",
                baselineFingerprint: entry.baselineFingerprint
              });
              finalizeJudgmentEntry(entry, "reject", error);
              renderKey(entry.key);
            });
          }
        }
      })().finally(() => {
        drainPromise = null;
        if (!destroyed && judgmentQueue.size > 0) scheduleQueueDrain();
      });
      return drainPromise;
    }
    function scheduleQueueDrain() {
      if (drainScheduled || drainPromise || destroyed) return;
      drainScheduled = true;
      queueMicrotaskImpl(() => {
        drainJudgmentQueue().catch((error) => deps.logger?.warn?.("[DeArrow] judgment queue failed:", error));
      });
    }
    function ensureJudgment(topic, options = {}) {
      const topicId = normalizeTopicId2(topic?.topicId);
      const originalTitle = normalizeString2(topic?.originalTitle ?? topic?.title);
      if (!topicId || !originalTitle) return Promise.reject(new Error("DeArrow 话题信息不完整"));
      const key = makeKey(topicId, originalTitle);
      const stored = getTopicStates()[topicId];
      if (stored?.originalTitle === originalTitle && typeof stored.verdict === "boolean") {
        return Promise.resolve(stored);
      }
      const existingPromise = judgmentInFlight.get(key);
      if (existingPromise) {
        const existingEntry = judgmentOwnerByTopic.get(topicId);
        if (existingEntry?.key === key && isJudgmentEntryCurrent(existingEntry)) {
          return existingPromise;
        }
        if (existingEntry?.key === key) {
          finalizeJudgmentEntry(existingEntry, "reject", createStaleOperationError("页面或标题已变更，已忽略过期判断"));
        } else {
          judgmentInFlight.delete(key);
        }
      }
      const previousError = getCurrentRuntimeError(key, topicId, originalTitle);
      if (previousError && options.retryErrors !== true) {
        return Promise.reject(new Error(previousError.message));
      }
      runtimeErrors.delete(key);
      const deferred = makeDeferred();
      const entry = {
        key,
        topic: { topicId, originalTitle },
        deferred,
        generation: rewriteContextGeneration,
        sourceUrl: getLiveUrl(),
        baselineFingerprint: getSemanticBundleFingerprint(topicId, originalTitle, "judgment"),
        settled: false
      };
      const previousOwner = judgmentOwnerByTopic.get(topicId);
      if (previousOwner && previousOwner !== entry && !previousOwner.settled) {
        if (judgmentQueue.delete(previousOwner.key)) {
          finalizeJudgmentEntry(
            previousOwner,
            "reject",
            createStaleOperationError("同一话题已有新标题等待判断")
          );
          renderKey(previousOwner.key);
        }
      }
      judgmentOwnerByTopic.set(topicId, entry);
      judgmentQueue.set(key, entry);
      judgmentInFlight.set(key, deferred.promise);
      renderKey(key);
      scheduleQueueDrain();
      return deferred.promise;
    }
    async function judgeTopics(topics, options = {}) {
      const unique = /* @__PURE__ */ new Map();
      (Array.isArray(topics) ? topics : []).forEach((topic) => {
        const topicId = normalizeTopicId2(topic?.topicId);
        const originalTitle = normalizeString2(topic?.originalTitle ?? topic?.title);
        if (!topicId || !originalTitle) return;
        unique.set(makeKey(topicId, originalTitle), { topicId, originalTitle });
      });
      const results = await Promise.allSettled(
        Array.from(unique.values()).map((topic) => ensureJudgment(topic, options))
      );
      return results;
    }
    async function judgeVisibleTopics(options = {}) {
      return judgeTopics(visibleDescriptors, options);
    }
    function applyRewriteToVisible(topicId, originalTitle, rewrittenTitle) {
      visibleDescriptors = collectVisibleDescriptors();
      let appliedCount = 0;
      visibleDescriptors.forEach((descriptor) => {
        if (descriptor.topicId !== topicId || descriptor.originalTitle !== originalTitle) return;
        endOriginalTitlePreview(descriptor.button, "", {
          force: true,
          restore: false
        });
        descriptor.button.dataset.rewrittenTitle = rewrittenTitle;
        descriptor.accessor.setText(rewrittenTitle);
        suppressPreviewForCurrentInteraction(descriptor.button);
        renderStoredState(descriptor);
        appliedCount += 1;
      });
      return appliedCount;
    }
    function onContentRetry(operation, info = {}) {
      if (!isRewriteOperationCurrent(operation)) return;
      const attempt = Number(info.attempt || info.retryAttempt || 0);
      const delayMs = Number(info.delayMs || info.delay || 0);
      const seconds = Number(info.delaySeconds || 0) || (delayMs > 0 ? Math.round(delayMs / 1e3) : 0);
      const message = seconds > 0 ? `内容提取被限流，${seconds} 秒后重试${attempt ? `（第 ${attempt} 次）` : ""}` : "内容提取被限流，稍后重试";
      operation.phase = "retry-wait";
      operation.message = message;
      renderKey(operation.key);
      const toastDelayMs = delayMs || seconds * 1e3;
      deps.createToast?.(message, "warning", Math.max(2500, Math.min(toastDelayMs || 2500, 8e3)));
    }
    function assertRewriteOperationCurrent(operation) {
      if (!isRewriteOperationCurrent(operation)) {
        throw createStaleOperationError("标题或改写状态已更新，已忽略过期改写");
      }
    }
    async function performRewrite(operation) {
      const { topicId, originalTitle, key } = operation;
      await ensureJudgment({ topicId, originalTitle }, { retryErrors: true });
      assertRewriteOperationCurrent(operation);
      operation.phase = "fetching-content";
      operation.message = "正在提取首帖内容";
      renderKey(key);
      const currentApi = operation.currentApi;
      if (!currentApi) throw new Error("DeArrow 没有可用的标题重写 API 配置");
      if (typeof deps.fetchFirstPost !== "function") {
        throw new Error("DeArrow 缺少首帖内容提取实现");
      }
      const payload = await deps.fetchFirstPost(topicId, {
        currentApi,
        onRetry: (info) => onContentRetry(operation, info)
      });
      assertRewriteOperationCurrent(operation);
      const firstPostContext = extractDeArrowFirstPostContext(payload);
      if (!firstPostContext.textContent && firstPostContext.images.length === 0) {
        throw new Error("DeArrow 未能提取首帖文本或图片");
      }
      if (currentApi.imageInputEnabled === true && firstPostContext.images.length > 0) {
        operation.message = `正在准备首帖图片（${firstPostContext.images.length} 张）`;
        renderKey(key);
      }
      const imageContext = await prepareFirstPostImages(firstPostContext, currentApi);
      assertRewriteOperationCurrent(operation);
      const imageInputs = Array.isArray(imageContext.imageInputs) ? imageContext.imageInputs : [];
      if (!firstPostContext.textContent && imageInputs.length === 0) {
        const error = new Error(
          currentApi.imageInputEnabled === true ? "DeArrow 首帖仅包含图片，但图片未能成功准备，无法进行可靠改写" : "DeArrow 首帖仅包含图片，请在标题重写 API 配置中开启图片输入"
        );
        error.code = "DEARROW_IMAGE_INPUT_REQUIRED";
        error.retryable = false;
        throw error;
      }
      const preparedImageIds = new Set(
        imageInputs.map((image) => normalizeString2(image?.id)).filter(Boolean)
      );
      const preparedImages = firstPostContext.images.filter((image) => preparedImageIds.has(normalizeString2(image.id)));
      const rewriteContent = [
        firstPostContext.textContent,
        preparedImages.map(formatDeArrowImagePlaceholder).join("\n")
      ].filter(Boolean).join("\n");
      operation.phase = "requesting-model";
      operation.message = "正在根据首帖改写标题";
      renderKey(key);
      const response = await callCompletion(
        buildDeArrowRewriteMessages({
          originalTitle,
          content: rewriteContent,
          imageInputs,
          prompt: operation.rewritePrompt
        }),
        "dearrow-rewrite",
        currentApi
      );
      const rewrittenTitle = parseDeArrowRewriteResponse(response);
      return {
        topicId,
        originalTitle,
        rewrittenTitle,
        model: getModelName(currentApi),
        timestamp: now().toISOString()
      };
    }
    function isOperationOriginalStillCurrent(topicId, originalTitle) {
      const stored = getTopicStates()[topicId];
      if (stored?.originalTitle && stored.originalTitle !== originalTitle) return false;
      const liveItems = Array.from(documentRef?.querySelectorAll?.(".topic-list-item") || []).filter((item) => !isSoftHidden(item) && getTopicId(item) === topicId);
      for (const item of liveItems) {
        const accessor = getTitleAccessor(item);
        if (!accessor) continue;
        const displayedTitle = normalizeString2(accessor.getText?.());
        if (displayedTitle === originalTitle) continue;
        const button = item.querySelector?.(`.${DEARROW_BUTTON_CLASS}`);
        const buttonOriginal = normalizeString2(button?.dataset?.originalTitle);
        const buttonRewrite = normalizeString2(button?.dataset?.rewrittenTitle);
        if (buttonOriginal === originalTitle && buttonRewrite && displayedTitle === buttonRewrite) {
          continue;
        }
        if (stored?.originalTitle === originalTitle && stored.rewrittenTitle && displayedTitle === normalizeString2(stored.rewrittenTitle)) {
          continue;
        }
        return false;
      }
      return true;
    }
    function isRewriteOperationCurrent(operation) {
      if (!operation || destroyed || rewriteOwnerByTopic.get(operation.topicId) !== operation || !isOperationOriginalStillCurrent(operation.topicId, operation.originalTitle)) {
        return false;
      }
      if (operation.generation !== rewriteContextGeneration || operation.sourceUrl !== getLiveUrl() || !isActive()) {
        return false;
      }
      if (operation.automatic && (operation.autoGeneration !== autoRewriteGeneration || !getConfig().dearrowAutoRewrite)) {
        return false;
      }
      return getSemanticBundleFingerprint(
        operation.topicId,
        operation.originalTitle,
        "rewrite"
      ) === operation.rewriteBaselineFingerprint;
    }
    function commitRewriteResult(result) {
      const existing = getTopicStates()[result.topicId];
      const value = updateDeArrowRewriteState(existing, {
        originalTitle: result.originalTitle,
        rewrittenTitle: result.rewrittenTitle,
        model: result.model,
        timestamp: result.timestamp
      });
      commitTopicStateUpdates([{ topicId: result.topicId, value }], {
        topicId: result.topicId,
        topicIds: [result.topicId],
        kind: "rewrite"
      });
      return { ...result, state: value };
    }
    function rewriteTopic(rawTopicId, options = {}) {
      const topicId = normalizeTopicId2(rawTopicId);
      let originalTitle = normalizeString2(options.originalTitle);
      if (!originalTitle) {
        originalTitle = visibleDescriptors.find((descriptor) => descriptor.topicId === topicId)?.originalTitle || getTopicStates()[topicId]?.originalTitle || "";
      }
      if (!topicId || !originalTitle) {
        return Promise.reject(new Error("DeArrow 无法确定话题或原标题"));
      }
      const key = makeKey(topicId, originalTitle);
      if (options.automatic !== true) {
        autoRewriteQueue.delete(key);
      }
      const existingPromise = getCurrentRewritePromise(topicId, key);
      if (existingPromise) {
        const existingOperation = rewriteOwnerByTopic.get(topicId);
        if (options.automatic !== true && existingOperation) {
          existingOperation.automatic = false;
        }
        return existingPromise;
      }
      rewriteInFlight.delete(key);
      const selectedRewriteApi = resolveApiForPurpose("rewrite");
      const operation = {
        key,
        topicId,
        originalTitle,
        currentApi: selectedRewriteApi ? { ...selectedRewriteApi } : null,
        rewritePrompt: getConfig().dearrowRewritePrompt,
        automatic: options.automatic === true,
        generation: Number.isInteger(options.generation) ? options.generation : rewriteContextGeneration,
        autoGeneration: Number.isInteger(options.autoGeneration) ? options.autoGeneration : autoRewriteGeneration,
        sourceUrl: getLiveUrl(),
        phase: "awaiting-judgment",
        message: "",
        judgmentBaselineFingerprint: getSemanticBundleFingerprint(
          topicId,
          originalTitle,
          "judgment"
        ),
        rewriteBaselineFingerprint: getSemanticBundleFingerprint(
          topicId,
          originalTitle,
          "rewrite"
        )
      };
      runtimeErrors.delete(key);
      rewriteOwnerByTopic.set(topicId, operation);
      renderKey(key);
      let trackedPromise;
      trackedPromise = performRewrite(operation).then((result) => {
        const ownsKey = rewriteInFlight.get(key) === trackedPromise;
        const ownsTopic = rewriteOwnerByTopic.get(topicId) === operation;
        const isCurrent = ownsKey && ownsTopic && isRewriteOperationCurrent(operation);
        if (ownsKey) rewriteInFlight.delete(key);
        if (ownsTopic) rewriteOwnerByTopic.delete(topicId);
        if (!isCurrent) {
          if (!destroyed && isActive()) scheduleRefresh(0, { judge: false });
          return { ...result, stale: true };
        }
        const committedResult = commitRewriteResult(result);
        runtimeErrors.delete(key);
        if (isActive()) {
          applyRewriteToVisible(topicId, originalTitle, result.rewrittenTitle);
          scheduleRefresh(0, { judge: false });
        }
        return committedResult;
      }, (error) => {
        const ownsKey = rewriteInFlight.get(key) === trackedPromise;
        const ownsTopic = rewriteOwnerByTopic.get(topicId) === operation;
        const isCurrent = ownsKey && ownsTopic && isRewriteOperationCurrent(operation);
        if (ownsKey) rewriteInFlight.delete(key);
        if (ownsTopic) rewriteOwnerByTopic.delete(topicId);
        if (isStaleOperationError(error) || !isCurrent) {
          if (!destroyed && isActive()) scheduleRefresh(0, { judge: false });
          return { topicId, originalTitle, stale: true };
        }
        if (!destroyed) {
          const errorKind = operation.phase === "awaiting-judgment" ? "judgment" : "rewrite";
          const baselineFingerprint = errorKind === "judgment" ? operation.judgmentBaselineFingerprint : operation.rewriteBaselineFingerprint;
          const message = normalizeError(error, "DeArrow 改写失败");
          const recorded = recordRuntimeError({
            key,
            topicId,
            originalTitle,
            error,
            kind: errorKind,
            baselineFingerprint
          });
          if (recorded && isActive()) {
            renderKey(key);
            const label = errorKind === "judgment" ? "判断" : "改写";
            deps.createToast?.(`DeArrow ${label}失败：${message}`, "error", 4200);
          }
        }
        throw error;
      });
      rewriteInFlight.set(key, trackedPromise);
      return trackedPromise;
    }
    async function refresh(options = {}) {
      if (destroyed) return { active: false, count: 0, judgments: [] };
      if (!isActive(options.url)) {
        cleanup();
        return { active: false, count: 0, judgments: [] };
      }
      visibleDescriptors = collectVisibleDescriptors();
      const unique = /* @__PURE__ */ new Map();
      visibleDescriptors.forEach((descriptor) => {
        const hasCachedState = renderStoredState(descriptor);
        if (!hasCachedState) unique.set(descriptor.key, descriptor);
      });
      const judgments = options.judge === false ? [] : await judgeTopics(Array.from(unique.values()), { retryErrors: options.retryErrors === true });
      scheduleAutoRewritesForVisible();
      return { active: true, count: visibleDescriptors.length, judgments };
    }
    function scheduleRefresh(delay = 120, options = {}) {
      if (refreshTimer !== null) clearTimeoutImpl?.(refreshTimer);
      refreshTimer = setTimeoutImpl?.(() => {
        refreshTimer = null;
        refresh(options).catch((error) => deps.logger?.warn?.("[DeArrow] refresh failed:", error));
      }, Math.max(0, Number(delay) || 0));
      return refreshTimer;
    }
    function hasButtonCoverage() {
      if (!isActive()) return true;
      const items = Array.from(documentRef?.querySelectorAll?.(".topic-list-item") || []);
      const topicStates = getTopicStates();
      return items.filter((item) => !isSoftHidden(item) && getTopicId(item) && getTitleAccessor(item)).every((item) => {
        const topicId = getTopicId(item);
        const accessor = getTitleAccessor(item);
        const buttons = Array.from(item.querySelectorAll?.(`.${DEARROW_BUTTON_CLASS}`) || []);
        if (buttons.length !== 1) return false;
        const button = buttons[0];
        if (normalizeTopicId2(button.dataset?.topicId) !== topicId || !item.classList?.contains?.("has-dearrow-button")) {
          return false;
        }
        const hasSummaryButton = Boolean(item.querySelector?.(".topic-summary-button"));
        if (hasSummaryButton !== item.classList?.contains?.("has-summary-button")) return false;
        if (item.classList?.contains?.("bookmark-list-item")) {
          const flowTarget = getBookmarkFlowTarget(item);
          const stack = item.querySelector?.(".topic-dearrow-control-stack");
          if (!flowTarget || !stack || stack.parentNode !== flowTarget || button.parentNode !== stack) {
            return false;
          }
        } else {
          const expectedTarget = typeof deps.getButtonMountTarget === "function" ? deps.getButtonMountTarget(item) : item.querySelector?.(".main-link") || item.querySelector?.("td:nth-child(2)") || item;
          if (!expectedTarget || button.parentNode !== expectedTarget) return false;
        }
        const displayedTitle = normalizeString2(accessor?.getText?.());
        const originalTitle = normalizeString2(button.dataset?.originalTitle);
        const rewrittenTitle = normalizeString2(button.dataset?.rewrittenTitle);
        if (!displayedTitle || !originalTitle) return false;
        const key = makeKey(topicId, originalTitle);
        const stored = topicStates[topicId];
        if (stored?.originalTitle && stored.originalTitle !== originalTitle) return false;
        if (rewriteInFlight.has(key)) {
          return displayedTitle === originalTitle || displayedTitle === rewrittenTitle;
        }
        if (stored?.originalTitle === originalTitle && stored.rewrittenTitle) {
          if (originalTitlePreviews.has(button)) return displayedTitle === originalTitle;
          return displayedTitle === normalizeString2(stored.rewrittenTitle);
        }
        return displayedTitle === originalTitle || displayedTitle === rewrittenTitle;
      });
    }
    function shouldRefreshFromMutations(mutations) {
      if (!isActive()) return false;
      for (const mutation of Array.isArray(mutations) ? mutations : []) {
        if (mutation?.type === "characterData") {
          const parent = mutation.target?.parentElement;
          if (parent?.closest?.(TITLE_SELECTORS.join(",")) && !parent.closest?.(SKIPPED_TITLE_CONTAINER_SELECTOR) && parent.closest?.(".topic-list-item")) {
            return true;
          }
          continue;
        }
        if (mutation?.type === "attributes") {
          const target = mutation.target;
          if (mutation.attributeName === "class" && target?.matches?.(".topic-list-item")) {
            const hasDeArrowButton = Boolean(target.querySelector?.(`.${DEARROW_BUTTON_CLASS}`));
            const hasSummaryButton = Boolean(target.querySelector?.(".topic-summary-button"));
            if (hasDeArrowButton !== target.classList?.contains?.("has-dearrow-button") || hasSummaryButton !== target.classList?.contains?.("has-summary-button")) {
              return true;
            }
            continue;
          }
          if (mutation.attributeName === "data-topic-id" && target?.matches?.(".topic-list-item")) {
            return true;
          }
          if (mutation.attributeName === "href" && target?.matches?.(TITLE_SELECTORS.join(",")) && target.closest?.(".topic-list-item")) {
            return true;
          }
          continue;
        }
        if (mutation?.type !== "childList") continue;
        const nodes = [...Array.from(mutation.addedNodes || []), ...Array.from(mutation.removedNodes || [])];
        let hasMeaningfulNode = false;
        for (const node of nodes) {
          if (!node) continue;
          if (node.nodeType === 3) {
            const parent = node.parentElement || mutation.target;
            if (parent?.closest?.(TITLE_SELECTORS.join(",")) && !parent.closest?.(SKIPPED_TITLE_CONTAINER_SELECTOR) && parent.closest?.(".topic-list-item")) {
              return true;
            }
            continue;
          }
          if (node.nodeType !== 1) continue;
          if (node.matches?.(`.${DEARROW_BUTTON_CLASS}`) || node.closest?.(`.${DEARROW_BUTTON_CLASS}`)) continue;
          hasMeaningfulNode = true;
          if (node.matches?.(".topic-list-item") || node.querySelector?.(".topic-list-item")) return true;
        }
        if (hasMeaningfulNode && mutation.target?.closest?.(".topic-list, .topic-list-body, .topic-list-item")) return true;
      }
      return false;
    }
    function destroy() {
      destroyed = true;
      if (refreshTimer !== null) clearTimeoutImpl?.(refreshTimer);
      refreshTimer = null;
      cleanup();
      const error = new Error("DeArrow 功能已销毁");
      judgmentQueue.forEach((entry) => entry.deferred.reject(error));
      judgmentQueue.clear();
      judgmentInFlight.clear();
      judgmentOwnerByTopic.clear();
      rewriteInFlight.clear();
      rewriteOwnerByTopic.clear();
      autoRewriteQueue.clear();
      runtimeErrors.clear();
    }
    return {
      isActive,
      refresh,
      addDeArrowButtons: refresh,
      scheduleRefresh,
      cleanup,
      removeDeArrowButtons: cleanup,
      destroy,
      judgeTopics,
      judgeVisibleTopics,
      rewriteTopic,
      hasButtonCoverage,
      shouldRefreshFromMutations,
      invalidateRewriteContext,
      cancelAutoRewrites,
      getTopicStates,
      getInFlightJudgmentCount: () => judgmentInFlight.size,
      getInFlightRewriteCount: () => rewriteInFlight.size,
      getQueuedAutoRewriteCount: () => autoRewriteQueue.size,
      getActiveAutoRewriteCount: () => autoRewriteActiveCount
    };
  }

  // src/bootstrap/runtime.js
  function createAppRuntime({
    appState: appState2 = appState,
    initialConfig = {},
    initialCurrentPageUrl = "",
    initialDriveSummaryDirtyTopicIds = null
  } = {}) {
    const config = { ...initialConfig };
    let currentPageUrl2 = typeof initialCurrentPageUrl === "string" ? initialCurrentPageUrl : String(initialCurrentPageUrl || "");
    if (initialDriveSummaryDirtyTopicIds instanceof Set) {
      appState2.driveSummaryDirtyTopicIds = initialDriveSummaryDirtyTopicIds;
    }
    const getCollection = (key, fallbackFactory) => {
      const current = appState2?.[key];
      if (current) return current;
      const fallback = fallbackFactory();
      appState2[key] = fallback;
      return fallback;
    };
    return {
      getConfigSnapshot() {
        return { ...config };
      },
      getConfigValue(key) {
        return config[key];
      },
      setConfigValue(key, value) {
        config[key] = value;
        return value;
      },
      updateConfig(patch = {}) {
        if (patch && typeof patch === "object") {
          Object.assign(config, patch);
        }
        return { ...config };
      },
      getCurrentPageUrl() {
        return currentPageUrl2;
      },
      setCurrentPageUrl(url) {
        currentPageUrl2 = typeof url === "string" ? url : String(url || "");
        return currentPageUrl2;
      },
      getActiveToastsByTopic() {
        return getCollection("activeToastsByTopic", () => ({}));
      },
      getTopicTitleMap() {
        return getCollection("topicTitleMap", () => ({}));
      },
      getTopicTitleFetchPromises() {
        return getCollection("topicTitleFetchPromises", () => /* @__PURE__ */ new Map());
      },
      getSummarizingTopics() {
        return getCollection("summarizingTopics", () => /* @__PURE__ */ new Set());
      },
      getExpandedSummaryRows() {
        return getCollection("expandedSummaryRows", () => /* @__PURE__ */ new Set());
      },
      getDriveSummaryDirtyTopicIds() {
        return getCollection("driveSummaryDirtyTopicIds", () => /* @__PURE__ */ new Set());
      },
      setDriveSummaryDirtyTopicIds(nextSet) {
        const normalized = nextSet instanceof Set ? nextSet : /* @__PURE__ */ new Set();
        appState2.driveSummaryDirtyTopicIds = normalized;
        return normalized;
      }
    };
  }

  // src/bootstrap/app.js
  var defaultSummaryPrompt = `
      任务：对给定(技术类)话题及其讨论回复进行结构化总结。
      要求：
      1. 总结格式：[1️⃣内容概述 + 2️⃣关键要点 + 3️⃣核心总结]
        - 1️⃣内容概述：简洁完整地概括话题的主要内容
        - 2️⃣关键要点：使用编号列表(1. 2. 3.) ，列出核心要点
        - 3️⃣核心总结：用一句话概括话题的核心内容

      2. 注意事项：
       - 识别话题发起人：序号为1的帖子对应话题的发起人
       - 识别话题讨论回复：序号1后面的所有帖子
       - 根据讨论复杂度调整总结详细程度
       - 指出含糊不清的观点，提供合理推测
       - 保持客观中立的语气
       - 使用简洁、明确的语言，避免重复和冗余
       - 忽略与主题无关的评论;`;
  var defaultHTMLPrompt = `3. 输出格式：
       - 仅按照输出模版，仅输出总结内容，不添加其他说明(如：html, 三引号...)
       - - 输出模版中的[]，仅代表总结内容，输出总结内容时请省略[]
       - 语言：简体中文
       - 格式：
       - - HTML
       - - 1️⃣、2️⃣、3️⃣部分之间，用分割线分隔(<hr>)
       - 样式：
       - - 使用HTML标签来设置所有样式！(<br>,<b>,<h3>...)
       - - - 确保样式美观
       - - 将输出文字中 所有的用户名 斜体加粗(<b><i>用户名</i></b>)
       - - - 如果是 话题发起人的用户名 颜色设为醒目
       - - - 如果是 其他的用户名 颜色设为醒目，但醒目程度要低于话题发起人的用户名
       - - - 注意：用户名 不得使用红色
       - - 对重要的文字，设置文字颜色
       - - - 各部分文字的样式(大小、粗细...)，予以区分，方便阅读
       - - 必要时采用合适的 图形符号/文字符号/表情符号，增强表达效果

      4. 输出模版：
      <div><!-- 输出模版 开始  -->
          <h3>1️⃣内容概述：</h3>
          <p>[简洁完整地概括话题的主要内容]<p>
          <hr>
          <h3>2️⃣关键要点：</h3>
          <ol>
              <li>[核心要点1]</li>
              <li>[核心要点2]</li>
              <li>[核心要点3]</li>
              <!-- ... 可根据需求添加更多要点 -->
              <li>[核心要点N]</li>
          </ol>
          <hr>
          <h3>3️⃣核心总结：</h3>
          <p>[用一句话概括话题的核心内容]</p>
      </div><!-- 输出模版 结束  -->;
    `;
  var defaultMarkdownPrompt = `
      3. 输出格式：
       - 仅按照输出模版，输出总结内容，不添加其他说明(如：Markdown, 三引号...)
       - - 输出模版中的[]，仅代表总结内容，输出总结内容时请省略[]
       - 语言：简体中文
       - 格式：
       - - Markdown
       - - 1️⃣、2️⃣、3️⃣部分之间，用分割线分隔(---)
       - 样式：
       - - 使用Markdown语法来设置样式！
       - - - 确保样式美观
       - - 将输出文字中 所有的用户名 斜体(*用户名*)
       - - - 如果是 话题发起人的用户名 斜体加粗(***用户名***)
       - - 对重要的文字，可以使用加粗或斜体强调
       - - 必要时采用合适的 图形符号/文字符号/表情，增强表达效果

      4. 输出模版：
      ### 1️⃣ 内容概述：[简洁完整地概括话题的主要内容]
      ---
      ### 2️⃣ 关键要点：
      1. [核心要点1]
      2. [核心要点2]
      3. [核心要点3]
      ...N. [核心要点N]
      ---
      ### 3️⃣ 核心总结：[用一句话概括话题的核心内容]
    `;
  var MIN_SUMMARY_PANEL_WIDTH = 200;
  var DRIVE_SUMMARY_SETTINGS_KEY = "summaryDriveSettings";
  var DRIVE_SUMMARY_DIRTY_TOPIC_IDS_KEY = "summaryDriveDirtyTopicIds";
  var SUMMARY_TOPIC_IDS_KEY = "summaryTopicIds";
  var TOPIC_QUESTION_HISTORY_KEY = "topicQuestionHistory";
  var TOPIC_QUESTION_HISTORY_CACHE_MAX_AGE_MS = 300;
  var promptConfigurations;
  var currentPromptIndex;
  var customQuestionPresets;
  var apiConfigurations;
  var currentApiIndex;
  var defaultOpenSidebar;
  var settingsTabsCollapsed;
  var summaryWidthOffset;
  var newTopicAutoSummarize;
  var autoRetryCount = DEFAULT_AUTO_RETRY_COUNT;
  var autoRetryInterval = DEFAULT_AUTO_RETRY_INTERVAL;
  var listPageSummaryMaxLines;
  var listPageSummaryEnabled;
  var autoShowSummaryInList;
  var dearrowEnabled;
  var dearrowAutoRewrite;
  var dearrowJudgmentApiIndex;
  var dearrowRewriteApiIndex;
  var dearrowJudgmentPrompt;
  var dearrowRewritePrompt;
  var dearrowScopeRules;
  var dearrowTopicStates;
  var toastEnabled;
  var toastSettings;
  var driveSummarySettings;
  var driveSummaryDirtyTopicIds;
  var summaryOutputFilters;
  var summaryTopicIds;
  var toastAutoExpand;
  var toastClickAutoOpenSidebar;
  var summaryWidthType;
  var summaryWidthValue;
  var runtime;
  var summarizingTopics;
  var currentPageUrl;
  var activeToastsByTopic;
  var topicTitleMap;
  var topicTitleFetchPromises;
  var expandedSummaryRows;
  var pendingManualAfterDriveFailTopics;
  var publicApiHandlers;
  var topicQuestionHistoryCacheMap = null;
  var topicQuestionHistoryCacheUpdatedAt = 0;
  var sidebarUIFeature = null;
  var topicSummaryFeature = null;
  var topicListFeature = null;
  var dearrowFeature = null;
  var questionAnswerFeature = null;
  var settingsController = null;
  var resetDriveSummaryAuthCache = () => {
  };
  var state;
  var getSummaryHistoryMapSnapshot;
  var setSummaryHistoryMapSnapshot;
  var getSummaryHistory;
  var resolveSummaryRenderMode;
  var captureCurrentSummaryRequestContext;
  var clearSummaryRenderPayload;
  var renderSidebarSummaryContent;
  var renderSidebarHistoryRecord;
  var renderListSummaryContent;
  var renderTopicHistoryRecord;
  var normalizeHistoryListForDisplay;
  var updateSummaryHtml;
  var createToast;
  var removeToast;
  var createSummarizingToast;
  var ensureTopicTitle;
  var getTopicTitle;
  var scrollToAndHighlightTopic;
  var createSettingsToast;
  var createSidebar;
  var bindSummarySelectionGuards;
  var setSummaryElementHtml;
  var isSummarySelectionLocked;
  var hasDriveSummaryCredentials;
  var markDriveSummaryTopicDirty;
  var markDriveSummaryTopicsDirty;
  var clearDriveSummaryTopicsDirty;
  var syncDriveSummarySettingsUI;
  var updateDriveSummaryStatusHint;
  var pullTopicHistoryFromDrive;
  var pullTopicQuestionHistoryFromDrive;
  var rebuildSummaryTopicIdsFromDrive;
  var uploadSummaryHistoryToDrive;
  var scheduleDriveSummarySync;
  var markDriveDeArrowDirty;
  var pullDeArrowStateFromDrive;
  var uploadDeArrowStateToDrive;
  var resetDriveDeArrowPullState;
  var appContextInitialized = false;
  var publicApi = null;
  var appInstance = null;
  function createDefaultPromptConfigurations() {
    return [
      {
        name: "默认总结 + HTML输出",
        summaryMethod: defaultSummaryPrompt,
        outputFormat: defaultHTMLPrompt
      },
      {
        name: "默认总结 + Markdown输出",
        summaryMethod: defaultSummaryPrompt,
        outputFormat: defaultMarkdownPrompt
      }
    ];
  }
  function createDefaultToastSettings() {
    return {
      error: {
        autoClose: false,
        duration: 0
      },
      success: {
        autoClose: false,
        duration: 0
      },
      info: {
        autoClose: true,
        duration: 3
      },
      warning: {
        autoClose: true,
        duration: 5
      }
    };
  }
  function openSidebarIfClosedForToastClick({
    enabled,
    sidebar,
    openSidebar
  } = {}) {
    if (!enabled || !sidebar?.classList || typeof openSidebar !== "function") {
      return false;
    }
    if (sidebar.classList.contains("open")) {
      return false;
    }
    openSidebar();
    return true;
  }
  function normalizeToastActionTopicId(topicId) {
    if (topicId === null || topicId === void 0) return "";
    return String(topicId).trim();
  }
  function scheduleToastDeferredAction(action) {
    if (typeof action !== "function") return false;
    const run = () => {
      try {
        action();
      } catch (error) {
        console.error("[LINUX DO Summary] Toast deferred action failed:", error);
      }
    };
    if (typeof requestAnimationFrame === "function" && typeof setTimeout === "function") {
      requestAnimationFrame(() => {
        setTimeout(run, 0);
      });
      return true;
    }
    if (typeof setTimeout === "function") {
      setTimeout(run, 0);
      return true;
    }
    Promise.resolve().then(run);
    return true;
  }
  function queueToastAutoExpand({
    topicId,
    shouldAutoExpandSummary,
    expandSummaryRow,
    isSummaryRowExpanded,
    scheduleToastAutoExpand
  } = {}) {
    if (!shouldAutoExpandSummary || typeof expandSummaryRow !== "function") {
      return false;
    }
    if (typeof isSummaryRowExpanded === "function" && isSummaryRowExpanded(topicId)) {
      return false;
    }
    const schedule = typeof scheduleToastAutoExpand === "function" ? scheduleToastAutoExpand : scheduleToastDeferredAction;
    schedule(() => expandSummaryRow(topicId));
    return true;
  }
  function handleToastClickAction({
    topicId,
    toastId,
    toastType = "info",
    onTopicPage = false,
    currentTopicId = null,
    toastAutoExpand: shouldAutoExpandSummary = false,
    findRecommendedElement,
    scrollToAndHighlightTopic: scrollToAndHighlightTopic2,
    expandSummaryRowInList: expandSummaryRowInList2,
    expandSummaryRowInRecommended: expandSummaryRowInRecommended2,
    isSummaryRowExpanded,
    scheduleToastAutoExpand,
    toastScrollBehavior = "auto",
    openSidebarForToastClick: openSidebarForToastClick2,
    removeToast: removeToast2
  } = {}) {
    const normalizedTopicId = normalizeToastActionTopicId(topicId);
    if (!normalizedTopicId) return null;
    if (!onTopicPage) {
      scrollToAndHighlightTopic2?.(normalizedTopicId, toastType, { behavior: toastScrollBehavior });
      removeToast2?.(toastId);
      queueToastAutoExpand({
        topicId: normalizedTopicId,
        shouldAutoExpandSummary,
        expandSummaryRow: expandSummaryRowInList2,
        isSummaryRowExpanded,
        scheduleToastAutoExpand
      });
      return "list";
    }
    const normalizedCurrentTopicId = normalizeToastActionTopicId(currentTopicId);
    if (normalizedCurrentTopicId === normalizedTopicId) {
      openSidebarForToastClick2?.();
      removeToast2?.(toastId);
      return "topic-current";
    }
    if (findRecommendedElement?.(normalizedTopicId)) {
      scrollToAndHighlightTopic2?.(normalizedTopicId, toastType, { behavior: toastScrollBehavior });
      removeToast2?.(toastId);
      queueToastAutoExpand({
        topicId: normalizedTopicId,
        shouldAutoExpandSummary,
        expandSummaryRow: expandSummaryRowInRecommended2,
        isSummaryRowExpanded,
        scheduleToastAutoExpand
      });
      return "topic-recommended";
    }
    return null;
  }
  function getCurrentApiConfiguration() {
    currentApiIndex = normalizeCurrentApiIndex(currentApiIndex, apiConfigurations);
    return apiConfigurations[currentApiIndex] || createDefaultApiConfiguration();
  }
  function syncAutoRetrySettingsFromCurrentApiConfiguration() {
    const currentConfig = getCurrentApiConfiguration();
    autoRetryCount = normalizeAutoRetryCount(
      currentConfig && currentConfig.retryCount,
      DEFAULT_AUTO_RETRY_COUNT
    );
    autoRetryInterval = normalizeAutoRetryInterval(
      currentConfig && currentConfig.retryInterval,
      DEFAULT_AUTO_RETRY_INTERVAL
    );
    return currentConfig;
  }
  function persistApiConfigurations(options = {}) {
    const retryFallback = options.retryFallback || {
      retryCount: autoRetryCount,
      retryInterval: autoRetryInterval
    };
    apiConfigurations = normalizeApiConfigurations(apiConfigurations, retryFallback);
    currentApiIndex = normalizeCurrentApiIndex(currentApiIndex, apiConfigurations);
    dearrowJudgmentApiIndex = normalizeDeArrowApiIndex(dearrowJudgmentApiIndex, apiConfigurations);
    dearrowRewriteApiIndex = normalizeDeArrowApiIndex(dearrowRewriteApiIndex, apiConfigurations);
    gmSetValue("apiConfigurations", apiConfigurations);
    gmSetValue("currentApiIndex", currentApiIndex);
    gmSetValue("dearrowJudgmentApiIndex", dearrowJudgmentApiIndex);
    gmSetValue("dearrowRewriteApiIndex", dearrowRewriteApiIndex);
    if (options.syncRetrySettings === false) {
      return getCurrentApiConfiguration();
    }
    return syncAutoRetrySettingsFromCurrentApiConfiguration();
  }
  function getDeArrowTopicStatesSnapshot() {
    return dearrowTopicStates;
  }
  function setDeArrowTopicStatesSnapshot(nextStates, meta = {}) {
    dearrowTopicStates = meta.normalized === true && nextStates && typeof nextStates === "object" && !Array.isArray(nextStates) ? nextStates : normalizeDeArrowTopicStates(nextStates);
    gmSetValue("dearrowTopicStates", dearrowTopicStates);
    if (runtime) {
      syncRuntimeConfigValue("dearrowTopicStates", dearrowTopicStates);
    }
    if (dearrowFeature && meta.refresh !== false) {
      dearrowFeature.scheduleRefresh?.(0, { judge: false });
    }
    return dearrowTopicStates;
  }
  function loadDriveSummarySettings() {
    const raw = gmGetValue(DRIVE_SUMMARY_SETTINGS_KEY, null);
    if (!raw) return { ...defaultDriveSummarySettings };
    if (typeof raw === "string") {
      try {
        return normalizeDriveSummarySettings(JSON.parse(raw));
      } catch (e) {
        return { ...defaultDriveSummarySettings };
      }
    }
    return normalizeDriveSummarySettings(raw);
  }
  function serializeTopicIdsForStorage(topicIds) {
    const values = Array.isArray(topicIds) ? topicIds : topicIds instanceof Set ? Array.from(topicIds) : [];
    return sanitizeSummaryTopicIds(values).sort((a, b2) => {
      const na = Number(a);
      const nb = Number(b2);
      if (Number.isFinite(na) && Number.isFinite(nb)) return na - nb;
      return a.localeCompare(b2);
    });
  }
  function loadTopicIdSetFromStorage(storageKey, fallback = []) {
    const raw = gmGetValue(storageKey, fallback);
    if (typeof raw === "string") {
      try {
        return new Set(sanitizeSummaryTopicIds(JSON.parse(raw)));
      } catch (_2) {
        return /* @__PURE__ */ new Set();
      }
    }
    return new Set(sanitizeSummaryTopicIds(raw));
  }
  function persistDriveSummarySettings(patch = {}) {
    const prev = { ...driveSummarySettings };
    const wasUsable = prev.enabled === true && Boolean(prev.clientId && prev.clientSecret && prev.refreshToken);
    driveSummarySettings = normalizeDriveSummarySettings({ ...driveSummarySettings, ...patch });
    const credentialsChanged = prev.clientId !== driveSummarySettings.clientId || prev.clientSecret !== driveSummarySettings.clientSecret || prev.refreshToken !== driveSummarySettings.refreshToken;
    if (credentialsChanged) {
      resetDriveSummaryAuthCache();
    }
    gmSetValue(DRIVE_SUMMARY_SETTINGS_KEY, driveSummarySettings);
    const isUsable = driveSummarySettings.enabled === true && Boolean(
      driveSummarySettings.clientId && driveSummarySettings.clientSecret && driveSummarySettings.refreshToken
    );
    if ((!wasUsable || credentialsChanged) && isUsable && dearrowFeature?.isActive?.()) {
      resetDriveDeArrowPullState?.();
      Promise.resolve(refreshDeArrowForCurrentPage({ pullDrive: true, judge: false })).catch((error) => console.warn("[DeArrow] Drive activation hydrate failed:", error));
    }
    return driveSummarySettings;
  }
  function loadSummaryTopicIds() {
    return loadTopicIdSetFromStorage(SUMMARY_TOPIC_IDS_KEY, []);
  }
  function persistSummaryTopicIds() {
    const serialized = serializeTopicIdsForStorage(summaryTopicIds);
    gmSetValue(SUMMARY_TOPIC_IDS_KEY, serialized);
    return serialized;
  }
  function isTopicMarkedSummarized(topicId) {
    const normalized = normalizeSummaryTopicId(topicId);
    if (!normalized) return false;
    return summaryTopicIds.has(normalized);
  }
  function markTopicSummarized(topicId) {
    const normalized = normalizeSummaryTopicId(topicId);
    if (!normalized) return false;
    if (summaryTopicIds.has(normalized)) return false;
    summaryTopicIds.add(normalized);
    persistSummaryTopicIds();
    return true;
  }
  function replaceSummaryTopicIds(nextTopicIds) {
    summaryTopicIds = new Set(serializeTopicIdsForStorage(nextTopicIds));
    persistSummaryTopicIds();
    return Array.from(summaryTopicIds);
  }
  function syncSummaryTopicIdsFromSources(...sources) {
    const merged = [];
    sources.forEach((source) => {
      if (!source) return;
      if (Array.isArray(source)) {
        merged.push(...source);
        return;
      }
      if (source instanceof Set) {
        merged.push(...Array.from(source));
        return;
      }
      if (typeof source === "object") {
        merged.push(...Object.keys(source));
      }
    });
    return replaceSummaryTopicIds(merged);
  }
  function replaceSummaryTopicIdsFromHistoryMap(historyMap) {
    return syncSummaryTopicIdsFromSources(historyMap);
  }
  function initializeRuntimeState() {
    if (appContextInitialized) {
      return;
    }
    promptConfigurations = gmGetValue("promptConfigurations", createDefaultPromptConfigurations());
    currentPromptIndex = gmGetValue("currentPromptIndex", 0);
    customQuestionPresets = normalizeQuestionPromptPresets(
      gmGetValue("customQuestionPresets", [])
    );
    const legacyAutoRetryCount = normalizeAutoRetryCount(
      gmGetValue(LEGACY_AUTO_RETRY_COUNT_KEY, DEFAULT_AUTO_RETRY_COUNT),
      DEFAULT_AUTO_RETRY_COUNT
    );
    const legacyAutoRetryInterval = normalizeAutoRetryInterval(
      gmGetValue(LEGACY_AUTO_RETRY_INTERVAL_KEY, DEFAULT_AUTO_RETRY_INTERVAL),
      DEFAULT_AUTO_RETRY_INTERVAL
    );
    const storedApiConfigurations = gmGetValue("apiConfigurations", [
      createDefaultApiConfiguration({}, {
        retryCount: legacyAutoRetryCount,
        retryInterval: legacyAutoRetryInterval
      })
    ]);
    apiConfigurations = normalizeApiConfigurations(storedApiConfigurations, {
      retryCount: legacyAutoRetryCount,
      retryInterval: legacyAutoRetryInterval
    });
    const storedCurrentApiIndex = gmGetValue("currentApiIndex", 0);
    currentApiIndex = normalizeCurrentApiIndex(storedCurrentApiIndex, apiConfigurations);
    if (JSON.stringify(storedApiConfigurations) !== JSON.stringify(apiConfigurations)) {
      gmSetValue("apiConfigurations", apiConfigurations);
    }
    if (storedCurrentApiIndex !== currentApiIndex) {
      gmSetValue("currentApiIndex", currentApiIndex);
    }
    defaultOpenSidebar = gmGetValue("defaultOpenSidebar", false);
    settingsTabsCollapsed = gmGetValue("settingsTabsCollapsed", false);
    const storedSummaryWidthOffset = gmGetValue("summaryWidthOffset", DEFAULT_SUMMARY_WIDTH_OFFSET);
    summaryWidthOffset = normalizeSummaryWidthOffset(
      storedSummaryWidthOffset,
      DEFAULT_SUMMARY_WIDTH_OFFSET
    );
    if (storedSummaryWidthOffset !== summaryWidthOffset) {
      gmSetValue("summaryWidthOffset", summaryWidthOffset);
    }
    newTopicAutoSummarize = gmGetValue("newTopicAutoSummarize", false);
    autoRetryCount = DEFAULT_AUTO_RETRY_COUNT;
    autoRetryInterval = DEFAULT_AUTO_RETRY_INTERVAL;
    syncAutoRetrySettingsFromCurrentApiConfiguration();
    listPageSummaryMaxLines = gmGetValue("listPageSummaryMaxLines", 6);
    listPageSummaryEnabled = gmGetValue("listPageSummaryEnabled", true);
    autoShowSummaryInList = gmGetValue("autoShowSummaryInList", true);
    const legacyDeArrowApiIndex = gmGetValue("dearrowApiIndex", 0);
    const dearrowSettings = normalizeDeArrowSettings({
      dearrowEnabled: gmGetValue("dearrowEnabled", defaultDeArrowSettings.dearrowEnabled),
      dearrowAutoRewrite: gmGetValue("dearrowAutoRewrite", defaultDeArrowSettings.dearrowAutoRewrite),
      dearrowJudgmentApiIndex: gmGetValue("dearrowJudgmentApiIndex", legacyDeArrowApiIndex),
      dearrowRewriteApiIndex: gmGetValue("dearrowRewriteApiIndex", legacyDeArrowApiIndex),
      dearrowJudgmentPrompt: gmGetValue(
        "dearrowJudgmentPrompt",
        defaultDeArrowSettings.dearrowJudgmentPrompt
      ),
      dearrowRewritePrompt: gmGetValue(
        "dearrowRewritePrompt",
        defaultDeArrowSettings.dearrowRewritePrompt
      ),
      dearrowScopeRules: gmGetValue("dearrowScopeRules", defaultDeArrowSettings.dearrowScopeRules)
    }, apiConfigurations);
    dearrowEnabled = dearrowSettings.dearrowEnabled;
    dearrowAutoRewrite = dearrowSettings.dearrowAutoRewrite;
    dearrowJudgmentApiIndex = dearrowSettings.dearrowJudgmentApiIndex;
    dearrowRewriteApiIndex = dearrowSettings.dearrowRewriteApiIndex;
    dearrowJudgmentPrompt = dearrowSettings.dearrowJudgmentPrompt;
    dearrowRewritePrompt = dearrowSettings.dearrowRewritePrompt;
    dearrowScopeRules = dearrowSettings.dearrowScopeRules;
    gmSetValue("dearrowJudgmentApiIndex", dearrowJudgmentApiIndex);
    gmSetValue("dearrowRewriteApiIndex", dearrowRewriteApiIndex);
    dearrowTopicStates = normalizeDeArrowTopicStates(gmGetValue("dearrowTopicStates", {}));
    toastEnabled = gmGetValue("toastEnabled", true);
    toastSettings = gmGetValue("toastSettings", createDefaultToastSettings());
    driveSummarySettings = loadDriveSummarySettings();
    driveSummaryDirtyTopicIds = loadTopicIdSetFromStorage(DRIVE_SUMMARY_DIRTY_TOPIC_IDS_KEY, []);
    summaryOutputFilters = normalizeSummaryOutputFilters(
      gmGetValue("summaryOutputFilters", defaultSummaryOutputFilters)
    );
    summaryTopicIds = loadSummaryTopicIds();
    const existingSummaryTopicIdsRaw = gmGetValue(SUMMARY_TOPIC_IDS_KEY, null);
    if (existingSummaryTopicIdsRaw === null) {
      const summaryHistorySnapshot = gmGetValue("summaryHistory", {});
      if (summaryHistorySnapshot && typeof summaryHistorySnapshot === "object" && !Array.isArray(summaryHistorySnapshot) && Object.keys(summaryHistorySnapshot).length > 0) {
        replaceSummaryTopicIdsFromHistoryMap(summaryHistorySnapshot);
      }
    }
    toastAutoExpand = gmGetValue("toastAutoExpand", true);
    toastClickAutoOpenSidebar = gmGetValue("toastClickAutoOpenSidebar", true);
    summaryWidthType = gmGetValue("summaryWidthType", "percent");
    summaryWidthValue = gmGetValue("summaryWidthValue", 100);
    runtime = createAppRuntime({
      appState,
      initialConfig: {
        promptConfigurations,
        currentPromptIndex,
        customQuestionPresets,
        apiConfigurations,
        currentApiIndex,
        newTopicAutoSummarize,
        listPageSummaryMaxLines,
        listPageSummaryEnabled,
        autoShowSummaryInList,
        dearrowEnabled,
        dearrowAutoRewrite,
        dearrowJudgmentApiIndex,
        dearrowRewriteApiIndex,
        dearrowJudgmentPrompt,
        dearrowRewritePrompt,
        dearrowScopeRules,
        dearrowTopicStates,
        toastEnabled,
        toastSettings,
        toastAutoExpand,
        toastClickAutoOpenSidebar,
        summaryWidthOffset,
        summaryWidthType,
        summaryWidthValue,
        summaryOutputFilters,
        summaryTopicIds,
        driveSummarySettings
      },
      initialCurrentPageUrl: globalThis?.window?.location?.href ?? "",
      initialDriveSummaryDirtyTopicIds: driveSummaryDirtyTopicIds
    });
    summarizingTopics = runtime.getSummarizingTopics();
    currentPageUrl = runtime.getCurrentPageUrl();
    activeToastsByTopic = runtime.getActiveToastsByTopic();
    topicTitleMap = runtime.getTopicTitleMap();
    topicTitleFetchPromises = runtime.getTopicTitleFetchPromises();
    expandedSummaryRows = runtime.getExpandedSummaryRows();
    pendingManualAfterDriveFailTopics = /* @__PURE__ */ new Set();
    publicApiHandlers = {
      exportSettings: null,
      exportSummaryContent: null,
      exportAllData: null,
      importSettings: null,
      importAllData: null
    };
    appContextInitialized = true;
  }
  function syncRuntimeConfigValue(key, value) {
    runtime.setConfigValue(key, value);
    return value;
  }
  function createStateFacade() {
    const facade = {};
    const defineValue = (key, getter, setter = null) => {
      Object.defineProperty(facade, key, {
        enumerable: true,
        configurable: false,
        get: getter,
        set: setter || (() => {
        })
      });
    };
    defineValue("promptConfigurations", () => promptConfigurations, (value) => {
      promptConfigurations = value;
      syncRuntimeConfigValue("promptConfigurations", value);
    });
    defineValue("currentPromptIndex", () => currentPromptIndex, (value) => {
      currentPromptIndex = value;
      syncRuntimeConfigValue("currentPromptIndex", value);
    });
    defineValue("customQuestionPresets", () => customQuestionPresets, (value) => {
      customQuestionPresets = normalizeQuestionPromptPresets(value);
      syncRuntimeConfigValue("customQuestionPresets", customQuestionPresets);
    });
    defineValue("apiConfigurations", () => apiConfigurations, (value) => {
      apiConfigurations = value;
      syncRuntimeConfigValue("apiConfigurations", value);
    });
    defineValue("currentApiIndex", () => currentApiIndex, (value) => {
      currentApiIndex = value;
      syncRuntimeConfigValue("currentApiIndex", value);
    });
    defineValue("defaultOpenSidebar", () => defaultOpenSidebar, (value) => {
      defaultOpenSidebar = value;
      syncRuntimeConfigValue("defaultOpenSidebar", value);
    });
    defineValue("settingsTabsCollapsed", () => settingsTabsCollapsed, (value) => {
      settingsTabsCollapsed = value;
      syncRuntimeConfigValue("settingsTabsCollapsed", value);
    });
    defineValue("summaryWidthOffset", () => summaryWidthOffset, (value) => {
      summaryWidthOffset = value;
      syncRuntimeConfigValue("summaryWidthOffset", value);
    });
    defineValue("summaryOutputFilters", () => summaryOutputFilters, (value) => {
      summaryOutputFilters = value;
      syncRuntimeConfigValue("summaryOutputFilters", value);
    });
    defineValue("newTopicAutoSummarize", () => newTopicAutoSummarize, (value) => {
      newTopicAutoSummarize = value;
      syncRuntimeConfigValue("newTopicAutoSummarize", value);
    });
    defineValue("autoRetryCount", () => autoRetryCount, (value) => {
      autoRetryCount = value;
    });
    defineValue("autoRetryInterval", () => autoRetryInterval, (value) => {
      autoRetryInterval = value;
    });
    defineValue("listPageSummaryMaxLines", () => listPageSummaryMaxLines, (value) => {
      listPageSummaryMaxLines = value;
      syncRuntimeConfigValue("listPageSummaryMaxLines", value);
    });
    defineValue("listPageSummaryEnabled", () => listPageSummaryEnabled, (value) => {
      listPageSummaryEnabled = value;
      syncRuntimeConfigValue("listPageSummaryEnabled", value);
    });
    defineValue("autoShowSummaryInList", () => autoShowSummaryInList, (value) => {
      autoShowSummaryInList = value;
      syncRuntimeConfigValue("autoShowSummaryInList", value);
    });
    defineValue("dearrowEnabled", () => dearrowEnabled, (value) => {
      dearrowEnabled = value === true;
      syncRuntimeConfigValue("dearrowEnabled", dearrowEnabled);
    });
    defineValue("dearrowAutoRewrite", () => dearrowAutoRewrite, (value) => {
      dearrowAutoRewrite = value === true;
      syncRuntimeConfigValue("dearrowAutoRewrite", dearrowAutoRewrite);
    });
    defineValue("dearrowJudgmentApiIndex", () => dearrowJudgmentApiIndex, (value) => {
      dearrowJudgmentApiIndex = normalizeDeArrowApiIndex(value, apiConfigurations);
      syncRuntimeConfigValue("dearrowJudgmentApiIndex", dearrowJudgmentApiIndex);
    });
    defineValue("dearrowRewriteApiIndex", () => dearrowRewriteApiIndex, (value) => {
      dearrowRewriteApiIndex = normalizeDeArrowApiIndex(value, apiConfigurations);
      syncRuntimeConfigValue("dearrowRewriteApiIndex", dearrowRewriteApiIndex);
    });
    defineValue("dearrowJudgmentPrompt", () => dearrowJudgmentPrompt, (value) => {
      dearrowJudgmentPrompt = normalizeDeArrowPrompt(
        value,
        defaultDeArrowSettings.dearrowJudgmentPrompt
      );
      syncRuntimeConfigValue("dearrowJudgmentPrompt", dearrowJudgmentPrompt);
    });
    defineValue("dearrowRewritePrompt", () => dearrowRewritePrompt, (value) => {
      dearrowRewritePrompt = normalizeDeArrowPrompt(
        value,
        defaultDeArrowSettings.dearrowRewritePrompt
      );
      syncRuntimeConfigValue("dearrowRewritePrompt", dearrowRewritePrompt);
    });
    defineValue("dearrowScopeRules", () => dearrowScopeRules, (value) => {
      dearrowScopeRules = normalizeDeArrowScopeRules(value);
      syncRuntimeConfigValue("dearrowScopeRules", dearrowScopeRules);
    });
    defineValue("dearrowTopicStates", () => dearrowTopicStates, (value) => {
      dearrowTopicStates = normalizeDeArrowTopicStates(value);
      syncRuntimeConfigValue("dearrowTopicStates", dearrowTopicStates);
    });
    defineValue("toastEnabled", () => toastEnabled, (value) => {
      toastEnabled = value;
      syncRuntimeConfigValue("toastEnabled", value);
    });
    defineValue("toastSettings", () => toastSettings, (value) => {
      toastSettings = value;
      syncRuntimeConfigValue("toastSettings", value);
    });
    defineValue("toastAutoExpand", () => toastAutoExpand, (value) => {
      toastAutoExpand = value;
      syncRuntimeConfigValue("toastAutoExpand", value);
    });
    defineValue("toastClickAutoOpenSidebar", () => toastClickAutoOpenSidebar, (value) => {
      toastClickAutoOpenSidebar = value;
      syncRuntimeConfigValue("toastClickAutoOpenSidebar", value);
    });
    defineValue("summaryTopicIds", () => summaryTopicIds, (value) => {
      summaryTopicIds = value instanceof Set ? value : new Set(value || []);
      syncRuntimeConfigValue("summaryTopicIds", summaryTopicIds);
    });
    defineValue("summaryWidthType", () => summaryWidthType, (value) => {
      summaryWidthType = value;
      syncRuntimeConfigValue("summaryWidthType", value);
    });
    defineValue("summaryWidthValue", () => summaryWidthValue, (value) => {
      summaryWidthValue = value;
      syncRuntimeConfigValue("summaryWidthValue", value);
    });
    defineValue("driveSummarySettings", () => driveSummarySettings, (value) => {
      driveSummarySettings = value;
      syncRuntimeConfigValue("driveSummarySettings", value);
    });
    defineValue("currentPageUrl", () => currentPageUrl, (value) => {
      currentPageUrl = runtime.setCurrentPageUrl(value);
    });
    defineValue("summarizingTopics", () => summarizingTopics);
    defineValue("expandedSummaryRows", () => expandedSummaryRows);
    defineValue("activeToastsByTopic", () => activeToastsByTopic);
    defineValue("topicTitleMap", () => topicTitleMap);
    defineValue("topicTitleFetchPromises", () => topicTitleFetchPromises);
    return facade;
  }
  function callPublicApiHandler(name, ...args) {
    const handler = publicApiHandlers?.[name];
    if (typeof handler !== "function") {
      return void 0;
    }
    return handler(...args);
  }
  function registerPublicApiHandlers(handlers = {}) {
    initializeRuntimeState();
    Object.entries(handlers).forEach(([name, handler]) => {
      if (typeof handler === "function") {
        publicApiHandlers[name] = handler;
      }
    });
    return publicApiHandlers;
  }
  function getTopicQuestionHistoryMapSnapshot(options = {}) {
    const force = options.force === true;
    const maxAgeMs = Number.isFinite(options.maxAgeMs) ? Math.max(0, Number(options.maxAgeMs)) : TOPIC_QUESTION_HISTORY_CACHE_MAX_AGE_MS;
    const now = Date.now();
    const cacheExpired = now - topicQuestionHistoryCacheUpdatedAt > maxAgeMs;
    if (force || !topicQuestionHistoryCacheMap || cacheExpired) {
      const stored = gmGetValue(TOPIC_QUESTION_HISTORY_KEY, {});
      topicQuestionHistoryCacheMap = normalizeTopicQuestionHistoryMapForStorage(stored);
      topicQuestionHistoryCacheUpdatedAt = now;
    }
    return topicQuestionHistoryCacheMap;
  }
  function setTopicQuestionHistoryMapSnapshot(historyMap) {
    const normalized = normalizeTopicQuestionHistoryMapForStorage(historyMap);
    topicQuestionHistoryCacheMap = normalized;
    topicQuestionHistoryCacheUpdatedAt = Date.now();
    gmSetValue(TOPIC_QUESTION_HISTORY_KEY, normalized);
    questionAnswerFeature?.refreshOpenQuestionPanels?.();
    return normalized;
  }
  function getTopicQuestionHistory(topicId) {
    const normalizedTopicId = normalizeTopicId3(topicId);
    if (!normalizedTopicId) return [];
    const historyMap = getTopicQuestionHistoryMapSnapshot();
    return historyMap[normalizedTopicId] || [];
  }
  function createTopicQuestionRecordId(topicId) {
    const normalizedTopicId = normalizeTopicId3(topicId) || "topic";
    const randomPart = Math.random().toString(36).slice(2, 8);
    return `${normalizedTopicId}-${Date.now()}-${randomPart}`;
  }
  function saveTopicQuestionAnswer(topicId, record = {}) {
    const normalizedTopicId = normalizeTopicId3(topicId);
    if (!normalizedTopicId) return [];
    const currentMap = getTopicQuestionHistoryMapSnapshot({ force: true, maxAgeMs: 0 }) || {};
    const nextMap = { ...currentMap };
    const existingHistory = normalizeTopicQuestionHistoryListForStorage(nextMap[normalizedTopicId]);
    const normalizedRecord = normalizeTopicQuestionHistoryItemForStorage({
      ...record,
      id: record.id || createTopicQuestionRecordId(normalizedTopicId),
      timestamp: record.timestamp || (/* @__PURE__ */ new Date()).toISOString(),
      model: record.model ?? getCurrentApiConfiguration()?.model ?? "未知模型",
      renderMode: "markdown"
    });
    if (!normalizedRecord) {
      return existingHistory;
    }
    nextMap[normalizedTopicId] = mergeTopicQuestionHistoryList([normalizedRecord], existingHistory);
    setTopicQuestionHistoryMapSnapshot(nextMap);
    markDriveSummaryTopicDirty?.(normalizedTopicId);
    scheduleDriveSummarySync?.("auto");
    return nextMap[normalizedTopicId];
  }
  function getQuestionPromptPresets() {
    return getAllQuestionPromptPresets(customQuestionPresets);
  }
  function createSettingsModal2() {
    return createSettingsModal(summaryWidthOffset);
  }
  function initializeFeatureControllers() {
    initializeRuntimeState();
    if (state) {
      return;
    }
    state = createStateFacade();
    const historyStateFeature = createHistoryStateFeature({
      GM_getValue: gmGetValue,
      GM_setValue: gmSetValue,
      getSummaryOutputFilters: () => summaryOutputFilters,
      getPromptConfigurations: () => promptConfigurations,
      getCurrentPromptIndex: () => currentPromptIndex,
      getCurrentApiConfiguration,
      setSummaryElementHtml: (...args) => sidebarUIFeature?.setSummaryElementHtml?.(...args)
    });
    ({
      getSummaryHistoryMapSnapshot,
      setSummaryHistoryMapSnapshot,
      getSummaryHistory,
      resolveSummaryRenderMode,
      captureCurrentSummaryRequestContext,
      clearSummaryRenderPayload,
      renderSidebarSummaryContent,
      renderSidebarHistoryRecord,
      renderListSummaryContent,
      renderTopicHistoryRecord,
      normalizeHistoryListForDisplay,
      updateSummaryHtml
    } = historyStateFeature);
    const toastFeature = createToastFeature({
      getToastEnabled: () => toastEnabled,
      getToastSettings: () => toastSettings,
      activeToastsByTopic,
      topicTitleMap,
      topicTitleFetchPromises,
      getFetchOptions: () => getFetchOptions(),
      onToastClick: (...args) => handleToastClick(...args)
    });
    ({
      createToast,
      removeToast,
      createSummarizingToast,
      ensureTopicTitle,
      getTopicTitle,
      scrollToAndHighlightTopic,
      createSettingsToast
    } = toastFeature);
    sidebarUIFeature = createSidebarUI({
      getSummaryHistory: (...args) => getSummaryHistory(...args),
      renderSidebarHistoryRecord: (...args) => renderSidebarHistoryRecord(...args),
      normalizeHistoryListForDisplay: (...args) => normalizeHistoryListForDisplay(...args),
      onSubmit: (event) => handleFormSubmit(event),
      onQuestionClick: () => {
        const topicId = normalizeTopicId3(document.getElementById("building")?.value || extractTopicId());
        questionAnswerFeature?.openSidebarQuestionPanel?.(topicId);
      },
      onToggleSidebar: () => toggleSidebar()
    });
    ({
      createSidebar,
      bindSummarySelectionGuards,
      setSummaryElementHtml,
      isSummarySelectionLocked
    } = sidebarUIFeature);
    const driveSummaryFeature = createDriveSummaryFeature({
      getDriveSummarySettings: () => driveSummarySettings,
      getDriveSummaryDirtyTopicIds: () => runtime.getDriveSummaryDirtyTopicIds(),
      setDriveSummaryDirtyTopicIds: (nextSet) => {
        driveSummaryDirtyTopicIds = runtime.setDriveSummaryDirtyTopicIds(
          nextSet instanceof Set ? nextSet : /* @__PURE__ */ new Set()
        );
        return driveSummaryDirtyTopicIds;
      },
      loadTopicIdSetFromStorage,
      serializeTopicIdsForStorage,
      createSettingsToast,
      getSummaryHistoryMapSnapshot,
      setSummaryHistoryMapSnapshot,
      getTopicQuestionHistoryMapSnapshot,
      setTopicQuestionHistoryMapSnapshot,
      getDeArrowTopicStates: getDeArrowTopicStatesSnapshot,
      setDeArrowTopicStates: setDeArrowTopicStatesSnapshot,
      normalizeDeArrowTopicStates,
      mergeDeArrowTopicStates,
      replaceSummaryTopicIdsFromHistoryMap,
      syncSummaryTopicIdsFromSources,
      markTopicSummarized,
      trimSummaryHistoryToLatestTopics,
      updateAllSummaryButtonsAndContainers: (...args) => topicListFeature?.updateAllSummaryButtonsAndContainers?.(...args),
      scheduleListSummaryRefresh: (...args) => topicListFeature?.scheduleListSummaryRefresh?.(...args),
      addTopicListSummaryButtons: (...args) => topicListFeature?.addTopicListSummaryButtons?.(...args),
      restoreExpandedSummaryRows: (...args) => topicListFeature?.restoreExpandedSummaryRows?.(...args),
      DRIVE_SUMMARY_TOPIC_LIMIT: 100
    });
    resetDriveSummaryAuthCache = driveSummaryFeature.resetDriveSummaryAuthCache;
    ({
      hasDriveSummaryCredentials,
      markDriveSummaryTopicDirty,
      markDriveSummaryTopicsDirty,
      clearDriveSummaryTopicsDirty,
      syncDriveSummarySettingsUI,
      updateDriveSummaryStatusHint,
      pullTopicHistoryFromDrive,
      pullTopicQuestionHistoryFromDrive,
      rebuildSummaryTopicIdsFromDrive,
      uploadSummaryHistoryToDrive,
      scheduleDriveSummarySync,
      markDriveDeArrowDirty,
      pullDeArrowStateFromDrive,
      uploadDeArrowStateToDrive,
      resetDriveDeArrowPullState
    } = driveSummaryFeature);
    topicSummaryFeature = createTopicSummaryFeature({
      state,
      pendingManualAfterDriveFailTopics,
      createToast,
      createSummarizingToast,
      ensureTopicTitle,
      getTopicTitle,
      captureCurrentSummaryRequestContext,
      renderSidebarSummaryContent,
      setSidebarSummaryHtml: (...args) => setSummaryElementHtml(...args),
      setSummaryElementHtml,
      getSummaryHistory,
      isTopicMarkedSummarized,
      hasDriveSummaryCredentials,
      pullTopicHistoryFromDrive,
      shouldAttemptTopicHistoryDrivePull,
      saveSummaryHistory,
      autoShowHistoryIfExists,
      updateTopicSummaryButtons: (...args) => topicListFeature?.updateTopicSummaryButtons?.(...args),
      getFetchOptions,
      summarizeSomething,
      getCurrentApiConfiguration,
      normalizeAutoRetryCount,
      normalizeAutoRetryInterval,
      extractTopicId,
      isTopicPageUrl,
      setTopicTitle,
      imageRequest: (...args) => gmXmlhttpRequest(...args)
    });
    questionAnswerFeature = createQuestionAnswerFeature({
      state,
      createToast,
      getQuestionHistory: (...args) => getTopicQuestionHistory(...args),
      getQuestionPromptPresets,
      askTopicQuestion,
      getCurrentApiConfiguration,
      normalizeAutoRetryCount,
      normalizeAutoRetryInterval,
      pullTopicQuestionHistoryFromDrive: (...args) => pullTopicQuestionHistoryFromDrive?.(...args),
      setQuestionHtml: (...args) => setSummaryElementHtml(...args)
    });
    topicListFeature = createTopicListFeature({
      state,
      pendingManualAfterDriveFailTopics,
      createToast,
      createSummarizingToast,
      captureCurrentSummaryRequestContext,
      clearSummaryRenderPayload,
      renderListSummaryContent,
      renderTopicHistoryRecord,
      resolveSummaryRenderMode,
      setListSummaryHtml: (...args) => updateSummaryHtml(...args),
      applySummaryWidthSettings: (...args) => settingsController?.applySummaryWidthSettings?.(...args),
      getSummaryHistoryMapSnapshot,
      getSummaryHistory,
      isTopicMarkedSummarized,
      hasDriveSummaryCredentials,
      pullTopicHistoryFromDrive,
      areSummaryHistoryListsEqual,
      saveSummaryHistory,
      autoShowHistoryIfExists,
      loadHistoryForCurrentTopic: (...args) => topicSummaryFeature?.loadHistoryForCurrentTopic?.(...args),
      updateSidebarSubmitButtonState: (...args) => topicSummaryFeature?.updateSidebarSubmitButtonState?.(...args),
      getFullFloorRangeForTopic: (...args) => topicSummaryFeature?.getFullFloorRangeForTopic?.(...args),
      getCurrentApiConfiguration,
      main: (...args) => topicSummaryFeature?.main?.(...args),
      extractTopicIdFromElement,
      isListSummaryPageUrl,
      isSummarySelectionLocked,
      openListQuestionPanel: (...args) => questionAnswerFeature?.openListQuestionPanel?.(...args)
    });
    dearrowFeature = createDeArrowFeature({
      state,
      getConfig: () => ({
        dearrowEnabled,
        dearrowAutoRewrite,
        dearrowJudgmentApiIndex,
        dearrowRewriteApiIndex,
        dearrowJudgmentPrompt,
        dearrowRewritePrompt,
        dearrowScopeRules,
        apiConfigurations
      }),
      getCurrentUrl: () => currentPageUrl,
      getLiveUrl: () => window.location.href,
      getApiConfigurations: () => apiConfigurations,
      extractTopicIdFromElement,
      requestCompletion: ({ currentApi, messages }) => requestChatCompletion({
        currentApi,
        messages,
        fetchImpl: fetch
      }),
      fetchFirstPost: fetchDeArrowFirstPost,
      imageRequest: (...args) => gmXmlhttpRequest(...args),
      imageFetch: fetch,
      getTopicStates: getDeArrowTopicStatesSnapshot,
      setTopicStates: (nextStates, meta) => setDeArrowTopicStatesSnapshot(nextStates, {
        ...meta,
        refresh: false
      }),
      scheduleDriveSync: (meta = {}) => {
        if (meta.source === "drive" || meta.skipDriveSync) return;
        markDriveDeArrowDirty?.();
      },
      createToast
    });
    settingsController = createSettingsController({
      state,
      GM_getValue: gmGetValue,
      GM_setValue: gmSetValue,
      GM_registerMenuCommand: gmRegisterMenuCommand,
      defaultSummaryPrompt,
      defaultHTMLPrompt,
      defaultSummaryOutputFilters,
      DEFAULT_SUMMARY_WIDTH_OFFSET,
      MIN_SUMMARY_PANEL_WIDTH,
      createDefaultApiConfiguration,
      initializeImportExportFeature,
      resolveImportedSidebarSettings,
      normalizeApiConfiguration,
      normalizeApiConfigurations,
      normalizeAutoRetryCount,
      normalizeAutoRetryInterval,
      normalizeCurrentApiIndex,
      normalizeDeArrowApiIndex,
      normalizeDeArrowScopeRules,
      validateDeArrowScopeRules,
      normalizeDeArrowTopicStates,
      normalizeSummaryOutputFilters,
      normalizeSummaryWidthOffset,
      sanitizeSummaryTopicIds,
      normalizeQuestionPromptPresets,
      getCurrentApiConfiguration,
      syncAutoRetrySettingsFromCurrentApiConfiguration,
      persistApiConfigurations,
      persistDriveSummarySettings,
      persistSummaryTopicIds,
      syncDriveSummarySettingsUI,
      createToast,
      createSettingsToast,
      getSummaryHistoryMap: () => getSummaryHistoryMapSnapshot(),
      setSummaryHistoryMap: (historyMap) => setSummaryHistoryMapSnapshot(historyMap),
      getTopicQuestionHistoryMap: () => getTopicQuestionHistoryMapSnapshot(),
      setTopicQuestionHistoryMap: (historyMap) => setTopicQuestionHistoryMapSnapshot(historyMap),
      getDeArrowTopicStates: getDeArrowTopicStatesSnapshot,
      setDeArrowTopicStates: setDeArrowTopicStatesSnapshot,
      syncSummaryTopicIdsFromSources,
      replaceSummaryTopicIdsFromHistoryMap,
      markDriveSummaryTopicsDirty,
      markDriveDeArrowDirty,
      scheduleDriveSummarySync,
      updateAllSummaryButtonsAndContainers: (...args) => topicListFeature?.updateAllSummaryButtonsAndContainers?.(...args),
      refreshListSummaryForCurrentPage,
      clearListSummaryBootstrapWatcher,
      removeTopicListSummaryButtons: (...args) => topicListFeature?.removeTopicListSummaryButtons?.(...args),
      addTopicListSummaryButtons: (...args) => topicListFeature?.addTopicListSummaryButtons?.(...args),
      restoreExpandedSummaryRows: (...args) => topicListFeature?.restoreExpandedSummaryRows?.(...args),
      updateListSummaryStyles: (...args) => topicListFeature?.updateListSummaryStyles?.(...args),
      refreshDeArrowForCurrentPage,
      cancelDeArrowAutoRewrites: () => dearrowFeature?.cancelAutoRewrites?.(),
      updateSidebarSubmitButtonState: (...args) => topicSummaryFeature?.updateSidebarSubmitButtonState?.(...args),
      uploadSummaryHistoryToDrive,
      uploadDeArrowStateToDrive,
      rebuildSummaryTopicIdsFromDrive,
      getDriveSummarySettings: () => driveSummarySettings,
      extractTopicId,
      attemptAutoSummarize: (...args) => topicSummaryFeature?.attemptAutoSummarize?.(...args),
      isSidebarWidthScriptActive,
      isListSummaryPageUrl,
      registerPublicApiHandlers
    });
    appendSettingsToastStyles();
  }
  function normalizeTopicId3(topicId) {
    return normalizeSummaryTopicId(topicId);
  }
  function isSidebarWidthScriptActive() {
    const sidebarWidth = localStorage.getItem("discourseSidebarWidth");
    return sidebarWidth !== null;
  }
  async function summarizeSomething(txt, options = {}) {
    const currentApi = options.currentApi || getCurrentApiConfiguration();
    try {
      return await requestSummaryCompletion({
        currentApi,
        promptConfig: state.promptConfigurations[state.currentPromptIndex],
        txt,
        imageInputs: options.imageInputs || [],
        fetchImpl: fetch
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  function buildTopicQuestionMessages({
    topicId,
    title,
    contentText,
    imageInputs = [],
    question,
    questionHistory = []
  } = {}) {
    const historyText = normalizeTopicQuestionHistoryListForStorage(questionHistory).slice(0, 8).reverse().map((record, index) => [
      `追问记录 ${index + 1}`,
      `问：${record.question || ""}`,
      `答：${record.answer || ""}`
    ].join("\n")).join("\n\n");
    const userContent = [
      "请基于下面的 LINUX DO 话题及回复回答用户问题。",
      title ? `话题标题：${title}` : `话题ID：${topicId}`,
      imageInputs.length ? `本次请求附带了 ${imageInputs.length} 张话题图片，请结合图片视觉内容和正文中的 [图片#] 占位符回答。` : "",
      historyText ? `已有问答历史：
${historyText}` : "已有问答历史：暂无",
      `用户问题：${question}`,
      "原文如下：",
      contentText || ""
    ].filter(Boolean).join("\n\n");
    return [
      {
        role: "system",
        content: [
          "你是一个严谨的技术话题阅读助手。",
          "只根据提供的话题原文和问答历史回答，不要编造未出现的信息。",
          "使用简体中文和 Markdown 输出。",
          "如果证据不足，请明确说明仍需确认。"
        ].join("\n")
      },
      { role: "user", content: buildUserContentWithImages(userContent, imageInputs) }
    ];
  }
  async function askTopicQuestion({ topicId, question, preset = {} } = {}) {
    const normalizedTopicId = normalizeTopicId3(topicId);
    const normalizedQuestion = question === null || question === void 0 ? "" : String(question).trim();
    if (!normalizedTopicId) {
      throw new Error("无法获取当前主题ID");
    }
    if (!normalizedQuestion) {
      throw new Error("问题不能为空");
    }
    const currentApi = getCurrentApiConfiguration();
    const topicContext = await topicSummaryFeature?.buildTopicQuestionContext?.(
      normalizedTopicId,
      currentApi
    );
    if (!topicContext?.contentText) {
      throw new Error("未能获取到帖子内容");
    }
    const questionHistory = getTopicQuestionHistory(normalizedTopicId);
    const messages = buildTopicQuestionMessages({
      topicId: normalizedTopicId,
      title: topicContext.title,
      contentText: topicContext.contentText,
      imageInputs: topicContext.imageInputs || [],
      question: normalizedQuestion,
      questionHistory
    });
    const answer = await requestChatCompletion({
      currentApi,
      messages,
      fetchImpl: fetch
    });
    if (!answer) {
      throw new Error("API返回了空的回答内容");
    }
    const normalizedPresetId = typeof preset?.id === "string" ? preset.id.trim() : "";
    const normalizedPresetName = typeof preset?.name === "string" ? preset.name.trim() : "";
    const nextHistory = saveTopicQuestionAnswer(normalizedTopicId, {
      question: normalizedQuestion,
      answer,
      presetId: normalizedPresetId,
      presetName: normalizedPresetName,
      model: currentApi?.model || "未知模型",
      renderMode: "markdown"
    });
    return nextHistory[0];
  }
  function setTopicTitle(topicId, title) {
    const normalizedTopicId = normalizeTopicIdForTitle(topicId);
    const normalizedTitle = typeof title === "string" ? title.trim() : "";
    if (!normalizedTopicId || !normalizedTitle) {
      return "";
    }
    topicTitleMap[normalizedTopicId] = normalizedTitle;
    return normalizedTitle;
  }
  function setSidebarHistoryButtonActive(isActive) {
    const historyButton = document.getElementById("history-button");
    if (!historyButton) return;
    historyButton.classList.toggle("active", Boolean(isActive));
    historyButton.style.backgroundColor = isActive ? "var(--active-button-bg)" : "";
    historyButton.style.color = isActive ? "var(--button-text)" : "";
  }
  function hideSidebarQuestionPanel() {
    const questionPanel = document.querySelector(".topic-question-panel-sidebar");
    if (questionPanel) {
      questionPanel.style.display = "none";
    }
    const questionButton = document.getElementById("question-button");
    if (questionButton) {
      questionButton.classList.remove("active");
      questionButton.dataset.expanded = "false";
    }
  }
  function saveSummaryHistory(topicId, summary, model, requestContext = {}) {
    const normalizedTopicId = normalizeTopicId3(topicId);
    if (!normalizedTopicId) return [];
    const currentHistoryMap = getSummaryHistoryMapSnapshot({ force: true, maxAgeMs: 0 }) || {};
    const nextHistoryMap = { ...currentHistoryMap };
    const existingHistory = normalizeSummaryHistoryListForStorage(nextHistoryMap[normalizedTopicId]);
    const normalizedRecord = normalizeSummaryHistoryItemForStorage({
      summary,
      timestamp: requestContext?.timestamp || (/* @__PURE__ */ new Date()).toISOString(),
      model: model ?? requestContext?.model ?? getCurrentApiConfiguration()?.model ?? "未知模型",
      renderMode: resolveSummaryRenderMode(requestContext?.renderMode, summary)
    });
    if (!normalizedRecord) {
      return existingHistory;
    }
    nextHistoryMap[normalizedTopicId] = [normalizedRecord, ...existingHistory];
    setSummaryHistoryMapSnapshot(nextHistoryMap);
    markTopicSummarized(normalizedTopicId);
    markDriveSummaryTopicDirty(normalizedTopicId);
    scheduleDriveSummarySync("auto");
    topicListFeature?.updateTopicSummaryButtons?.(normalizedTopicId);
    return nextHistoryMap[normalizedTopicId];
  }
  function autoShowHistoryIfExists(topicId) {
    const normalizedTopicId = normalizeTopicId3(topicId);
    if (!normalizedTopicId || !isTopicPageUrl(currentPageUrl)) {
      setSidebarHistoryButtonActive(false);
      return false;
    }
    const buildingInput = document.getElementById("building");
    const activeTopicId = normalizeTopicId3(buildingInput?.value || extractTopicId());
    if (activeTopicId && activeTopicId !== normalizedTopicId) {
      return false;
    }
    const history = getSummaryHistory(normalizedTopicId);
    const historyDiv = document.getElementById("summary-history");
    const resultDiv = document.getElementById("summary-result");
    if (!historyDiv || !resultDiv) {
      return false;
    }
    if (!Array.isArray(history) || history.length === 0) {
      historyDiv.style.display = "none";
      resultDiv.style.display = "flex";
      setSidebarHistoryButtonActive(false);
      return false;
    }
    try {
      historyDiv.loadHistory?.(normalizedTopicId);
    } catch (error) {
      console.warn(`History panel render failed for topic ${normalizedTopicId}.`, error);
    }
    historyDiv.style.display = "flex";
    resultDiv.style.display = "none";
    setSidebarHistoryButtonActive(true);
    return true;
  }
  function getCsrfToken() {
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    return metaTag ? metaTag.getAttribute("content") : "";
  }
  function getFetchOptions() {
    const csrfToken = getCsrfToken();
    const headers = {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "discourse-logged-in": "true",
      "discourse-present": "true",
      "x-requested-with": "XMLHttpRequest"
    };
    if (csrfToken) {
      headers["x-csrf-token"] = csrfToken;
    }
    return {
      headers,
      method: "GET",
      mode: "cors",
      credentials: "include"
    };
  }
  async function fetchDeArrowFirstPost(topicId, { currentApi, onRetry } = {}) {
    const normalizedTopicId = normalizeTopicId3(topicId);
    if (!normalizedTopicId) {
      throw new Error("DeArrow 话题 ID 无效");
    }
    const response = await fetchLinuxDoContentWith429Retry(
      `https://linux.do/t/${normalizedTopicId}.json`,
      getFetchOptions(),
      {
        fetchImpl: fetch,
        retryCount: normalizeAutoRetryCount(
          currentApi?.retryCount,
          DEFAULT_AUTO_RETRY_COUNT
        ),
        onRetry
      }
    );
    if (!response.ok) {
      const error = new Error(`DeArrow 获取首帖失败：HTTP ${response.status}`);
      error.status = response.status;
      throw error;
    }
    return response.json();
  }
  function handleFormSubmit(event) {
    hideSidebarQuestionPanel();
    return topicSummaryFeature?.handleFormSubmit?.(event);
  }
  function loadHistoryForCurrentTopic(options = {}) {
    return topicSummaryFeature?.loadHistoryForCurrentTopic?.(options);
  }
  function attemptAutoSummarize(topicId) {
    return topicSummaryFeature?.attemptAutoSummarize?.(topicId);
  }
  function updateSidebarSubmitButtonState(topicId) {
    return topicSummaryFeature?.updateSidebarSubmitButtonState?.(topicId);
  }
  function removeTopicListSummaryButtons(options = {}) {
    return topicListFeature?.removeTopicListSummaryButtons?.(options);
  }
  function scheduleListSummaryRefresh(delay = 150) {
    return topicListFeature?.scheduleListSummaryRefresh?.(delay);
  }
  function expandSummaryRowByTopicId(topicId, options = {}) {
    return topicListFeature?.expandSummaryRowByTopicId?.(topicId, options);
  }
  function isSummaryRowExpandedInList(topicId) {
    return topicListFeature?.isSummaryRowExpandedByTopicId?.(topicId) ?? false;
  }
  function hasListSummaryButtonsCoverage() {
    return topicListFeature?.hasListSummaryButtonsCoverage?.() ?? true;
  }
  function shouldRefreshListSummaryFromMutations(mutations) {
    return topicListFeature?.shouldRefreshListSummaryFromMutations?.(mutations) ?? false;
  }
  async function refreshDeArrowForCurrentPage({
    forceRebuild = false,
    pullDrive = false,
    judge = true
  } = {}) {
    if (!dearrowFeature) return { active: false, count: 0, judgments: [] };
    if (!dearrowFeature.isActive()) {
      dearrowFeature.cleanup();
      return { active: false, count: 0, judgments: [] };
    }
    if (pullDrive && driveSummarySettings?.enabled && hasDriveSummaryCredentials?.()) {
      const pullResult = await pullDeArrowStateFromDrive?.({ silent: false });
      if (pullResult?.ok) {
        scheduleDriveSummarySync?.("auto");
      }
    }
    if (forceRebuild) {
      dearrowFeature.cleanup();
    }
    return dearrowFeature.refresh({ judge });
  }
  function scheduleDeArrowRefresh(delay = LIST_SUMMARY_MUTATION_REFRESH_DELAY, options = {}) {
    return dearrowFeature?.scheduleRefresh?.(delay, options);
  }
  function hasDeArrowButtonCoverage() {
    return dearrowFeature?.hasButtonCoverage?.() ?? true;
  }
  function shouldRefreshDeArrowFromMutations(mutations) {
    return dearrowFeature?.shouldRefreshFromMutations?.(mutations) ?? false;
  }
  function applySidebarSettings() {
    return settingsController?.applySidebarSettings?.();
  }
  function applySummaryWidthSettings() {
    return settingsController?.applySummaryWidthSettings?.();
  }
  function syncUIWithStoredSettings() {
    return settingsController?.syncUIWithStoredSettings?.();
  }
  function toggleSummaryPanel() {
    return settingsController?.toggleSummaryPanel?.();
  }
  function initializeSettingsModal() {
    return settingsController?.initializeSettingsModal?.();
  }
  function enhanceSummaryWidthSettings() {
    return settingsController?.enhanceSummaryWidthSettings?.();
  }
  function addToastSettingsToModal() {
    return settingsController?.addToastSettingsToModal?.();
  }
  function updateAdjustmentPrompts() {
    return settingsController?.updateAdjustmentPrompts?.();
  }
  function registerMenuCommand() {
    return settingsController?.registerMenuCommand?.();
  }
  function toggleSidebar() {
    const sidebar = document.getElementById("summary-sidebar");
    if (!sidebar) return;
    sidebar.classList.toggle("open");
    updateSidebarWidth();
  }
  function openSidebarForToastClick() {
    const sidebar = document.getElementById("summary-sidebar");
    return openSidebarIfClosedForToastClick({
      enabled: toastClickAutoOpenSidebar,
      sidebar,
      openSidebar: () => toggleSidebar()
    });
  }
  function updateSidebarWidth() {
    applySidebarSettings();
  }
  function extractTopicId() {
    const match = window.location.href.match(/\/t\/topic\/(\d+)/);
    return match ? match[1] : null;
  }
  function extractTopicIdFromElement(element) {
    if (!element) return null;
    const explicitTopicId = element.getAttribute?.("data-topic-id") || element.dataset?.topicId;
    if (explicitTopicId) return explicitTopicId;
    const linkElement = element.querySelector?.("a.raw-topic-link, a.title, .link-top-line a, .main-link a");
    if (linkElement) {
      const href = linkElement.getAttribute("href") || "";
      const match = href.match(/\/t\/(?:[^/?#]+\/)?(\d+)(?:[/?#]|$)/);
      if (match) return match[1];
      const topicId = linkElement.getAttribute("data-topic-id");
      if (topicId) return topicId;
    }
    const rowElement = element.closest?.("tr[data-topic-id]");
    if (rowElement) {
      return rowElement.getAttribute("data-topic-id");
    }
    return null;
  }
  function scheduleAutoSummarize(topicId) {
    const normalizedTopicId = normalizeTopicId3(topicId);
    if (!normalizedTopicId) return;
    attemptAutoSummarize(normalizedTopicId);
    setTimeout(() => {
      attemptAutoSummarize(normalizedTopicId);
    }, 800);
  }
  var TOPIC_PAGE_URL_REGEX = /^https:\/\/linux\.do\/t\/topic\/\d+/;
  var LIST_SUMMARY_PAGE_URL_REGEX = /^https:\/\/linux\.do\/(?:$|[?#]|latest(?:[/?#]|$)|new(?:[/?#]|$)|unread(?:[/?#]|$)|unseen(?:[/?#]|$)|bookmarks(?:[/?#]|$)|categories(?:[/?#]|$)|c\/|tags\/|u\/|search(?:[/?#]|$)|top(?:[/?#]|$))/;
  var LIST_SUMMARY_BOOTSTRAP_MAX_ATTEMPTS = 12;
  var LIST_SUMMARY_BOOTSTRAP_INTERVAL = 500;
  var LIST_SUMMARY_MUTATION_REFRESH_DELAY = 120;
  var listSummaryBootstrapTimer = null;
  var listSummaryBootstrapAttempt = 0;
  function isTopicPageUrl(url = currentPageUrl) {
    return TOPIC_PAGE_URL_REGEX.test(String(url || ""));
  }
  function isListSummaryPageUrl(url = currentPageUrl) {
    return LIST_SUMMARY_PAGE_URL_REGEX.test(String(url || ""));
  }
  function clearListSummaryBootstrapWatcher() {
    if (listSummaryBootstrapTimer) {
      clearTimeout(listSummaryBootstrapTimer);
      listSummaryBootstrapTimer = null;
    }
    listSummaryBootstrapAttempt = 0;
  }
  function runListSummaryBootstrapStep() {
    if (!state.listPageSummaryEnabled || !isListSummaryPageUrl(currentPageUrl)) {
      clearListSummaryBootstrapWatcher();
      return;
    }
    if (hasListSummaryButtonsCoverage()) {
      clearListSummaryBootstrapWatcher();
      return;
    }
    scheduleListSummaryRefresh(0);
    listSummaryBootstrapAttempt += 1;
    if (listSummaryBootstrapAttempt >= LIST_SUMMARY_BOOTSTRAP_MAX_ATTEMPTS) {
      clearListSummaryBootstrapWatcher();
      return;
    }
    listSummaryBootstrapTimer = setTimeout(runListSummaryBootstrapStep, LIST_SUMMARY_BOOTSTRAP_INTERVAL);
  }
  function startListSummaryBootstrapWatcher({ immediate = true, resetAttempts = true } = {}) {
    if (!state.listPageSummaryEnabled || !isListSummaryPageUrl(currentPageUrl)) {
      clearListSummaryBootstrapWatcher();
      return;
    }
    if (resetAttempts) {
      listSummaryBootstrapAttempt = 0;
    }
    if (listSummaryBootstrapTimer) {
      clearTimeout(listSummaryBootstrapTimer);
      listSummaryBootstrapTimer = null;
    }
    if (immediate) {
      runListSummaryBootstrapStep();
      return;
    }
    listSummaryBootstrapTimer = setTimeout(runListSummaryBootstrapStep, LIST_SUMMARY_BOOTSTRAP_INTERVAL);
  }
  function refreshListSummaryForCurrentPage({ forceRebuild = false, delay = 0 } = {}) {
    if (!state.listPageSummaryEnabled || !isListSummaryPageUrl(currentPageUrl)) {
      clearListSummaryBootstrapWatcher();
      return;
    }
    if (forceRebuild) {
      removeTopicListSummaryButtons({ preserveExpanded: true });
    }
    scheduleListSummaryRefresh(Math.max(0, delay));
    startListSummaryBootstrapWatcher({ immediate: false, resetAttempts: true });
  }
  var mainSidebarWidthMonitorStarted = false;
  var lastMainSidebarWidth = null;
  function getStoredMainSidebarWidthValue() {
    return localStorage.getItem("discourseSidebarWidth") || "";
  }
  function handleExternalSidebarWidthChange(force = false) {
    const nextWidthValue = getStoredMainSidebarWidthValue();
    if (!force && nextWidthValue === lastMainSidebarWidth) {
      return;
    }
    lastMainSidebarWidth = nextWidthValue;
    applySidebarSettings();
    updateAdjustmentPrompts();
    settingsController?.updateSidebarPreview?.();
  }
  function monitorMainSidebarWidth() {
    if (mainSidebarWidthMonitorStarted) {
      return;
    }
    mainSidebarWidthMonitorStarted = true;
    lastMainSidebarWidth = getStoredMainSidebarWidthValue();
    window.addEventListener("storage", (event) => {
      if (event.key && event.key !== "discourseSidebarWidth") {
        return;
      }
      handleExternalSidebarWidthChange(true);
    });
    window.addEventListener("resize", () => {
      handleExternalSidebarWidthChange(true);
    }, { passive: true });
    setInterval(() => {
      handleExternalSidebarWidthChange(false);
    }, 1e3);
  }
  var urlChangeMonitorStarted = false;
  function queueUrlChangeHandling(previousUrl) {
    dearrowFeature?.invalidateRewriteContext?.();
    Promise.resolve(handleUrlChange(previousUrl)).catch((error) => {
      console.error("[LINUX DO Summary] URL change handling failed:", error);
    });
  }
  function monitorURLChangeAndUpdateButton() {
    if (urlChangeMonitorStarted) {
      return;
    }
    urlChangeMonitorStarted = true;
    const pageObserver = new MutationObserver((mutations) => {
      if (isListSummaryPageUrl(window.location.href) && mutationBatchAddsTopicRows(mutations)) {
        scheduleContentFilterRefreshEvent();
      }
      if (window.location.href !== currentPageUrl) {
        const previousUrl = currentPageUrl;
        state.currentPageUrl = window.location.href;
        queueUrlChangeHandling(previousUrl);
        return;
      }
      if (shouldRefreshListSummaryFromMutations(mutations)) {
        scheduleListSummaryRefresh(LIST_SUMMARY_MUTATION_REFRESH_DELAY);
        startListSummaryBootstrapWatcher({ immediate: false, resetAttempts: true });
      }
      if (shouldRefreshDeArrowFromMutations(mutations)) {
        scheduleDeArrowRefresh(LIST_SUMMARY_MUTATION_REFRESH_DELAY);
      }
    });
    const observerRoot = document.querySelector("#main-outlet") || document.body;
    pageObserver.observe(observerRoot, {
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["href", "data-topic-id", "class"],
      subtree: true
    });
    const checkForUrlChange = () => {
      if (window.location.href !== currentPageUrl) {
        const previousUrl = currentPageUrl;
        state.currentPageUrl = window.location.href;
        queueUrlChangeHandling(previousUrl);
      }
    };
    window.addEventListener("popstate", checkForUrlChange, { passive: true });
    window.addEventListener("pageshow", checkForUrlChange, { passive: true });
  }
  async function handleUrlChange(previousUrl) {
    const sidebar = document.getElementById("summary-sidebar");
    const buildingInput = document.getElementById("building");
    const onTopicPage = isTopicPageUrl(currentPageUrl);
    if (sidebar && buildingInput) {
      if (onTopicPage) {
        const topicId = extractTopicId();
        buildingInput.value = topicId || "";
        toggleSummaryPanel();
        applySidebarSettings();
        if (topicId) {
          updateSidebarSubmitButtonState(topicId);
          await loadHistoryForCurrentTopic({ topicId });
          autoShowHistoryIfExists(topicId);
          scheduleAutoSummarize(topicId);
        } else {
          updateSidebarSubmitButtonState(null);
          setSidebarHistoryButtonActive(false);
        }
      } else {
        buildingInput.value = "";
        updateSidebarSubmitButtonState(null);
        toggleSummaryPanel();
        setSidebarHistoryButtonActive(false);
        const historyDiv = document.getElementById("summary-history");
        const resultDiv = document.getElementById("summary-result");
        if (historyDiv) historyDiv.style.display = "none";
        if (resultDiv) resultDiv.style.display = "flex";
      }
    }
    if (state.listPageSummaryEnabled && isListSummaryPageUrl(currentPageUrl)) {
      refreshListSummaryForCurrentPage({
        forceRebuild: previousUrl !== currentPageUrl,
        delay: LIST_SUMMARY_MUTATION_REFRESH_DELAY
      });
    } else {
      clearListSummaryBootstrapWatcher();
      removeTopicListSummaryButtons({ preserveExpanded: true });
    }
    scheduleContentFilterRefreshEvent();
    refreshDeArrowForCurrentPage({
      forceRebuild: previousUrl !== currentPageUrl,
      pullDrive: true
    }).catch((error) => {
      console.error("[LINUX DO Summary] DeArrow refresh failed:", error);
    });
  }
  function bindSidebarHistoryButton() {
    const historyButton = document.getElementById("history-button");
    if (!historyButton || historyButton.dataset.bound === "true") {
      return;
    }
    historyButton.dataset.bound = "true";
    historyButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const historyDiv = document.getElementById("summary-history");
      const resultDiv = document.getElementById("summary-result");
      if (!historyDiv || !resultDiv) return;
      hideSidebarQuestionPanel();
      const isHidden = historyDiv.style.display === "none" || historyDiv.style.display === "";
      if (!isHidden) {
        historyDiv.style.display = "none";
        resultDiv.style.display = "flex";
        setSidebarHistoryButtonActive(false);
        return;
      }
      const currentTopicId = normalizeTopicId3(document.getElementById("building")?.value || extractTopicId());
      const originalLabel = historyButton.textContent;
      historyButton.disabled = true;
      historyButton.textContent = "⏳ 拉取中...";
      try {
        if (currentTopicId) {
          await loadHistoryForCurrentTopic({
            forceDrivePull: true,
            topicId: currentTopicId
          });
        } else {
          historyDiv.loadHistory?.(currentTopicId);
        }
      } finally {
        historyButton.disabled = false;
        historyButton.textContent = originalLabel;
      }
      historyDiv.style.display = "flex";
      resultDiv.style.display = "none";
      setSidebarHistoryButtonActive(true);
    });
  }
  function expandSummaryRowInList(topicId) {
    const normalizedTopicId = normalizeTopicId3(topicId);
    if (!normalizedTopicId) return;
    if (isSummaryRowExpandedInList(normalizedTopicId)) {
      return;
    }
    if (expandSummaryRowByTopicId(normalizedTopicId)) {
      return;
    }
    const summaryButton = document.querySelector(`.topic-summary-button[data-topic-id="${normalizedTopicId}"]`);
    if (summaryButton) {
      summaryButton.click();
      return;
    }
    scheduleListSummaryRefresh(80);
    setTimeout(() => {
      if (expandSummaryRowByTopicId(normalizedTopicId)) {
        return;
      }
      const retryButton = document.querySelector(`.topic-summary-button[data-topic-id="${normalizedTopicId}"]`);
      if (retryButton) {
        retryButton.click();
      }
    }, 120);
  }
  function expandSummaryRowInRecommended(topicId) {
    expandSummaryRowInList(topicId);
  }
  function handleToastClick(topicId, toastId, toastType = "info") {
    return handleToastClickAction({
      topicId,
      toastId,
      toastType,
      onTopicPage: /^\/t\/topic\/\d+/.test(window.location.pathname),
      currentTopicId: extractTopicId(),
      toastAutoExpand,
      findRecommendedElement: (normalizedTopicId) => document.querySelector(`.topic-list-item[data-topic-id="${normalizedTopicId}"]`),
      scrollToAndHighlightTopic,
      expandSummaryRowInList,
      expandSummaryRowInRecommended,
      isSummaryRowExpanded: isSummaryRowExpandedInList,
      scheduleToastAutoExpand: scheduleToastDeferredAction,
      openSidebarForToastClick,
      removeToast
    });
  }
  var initializePromise = null;
  var bootstrapInitializationScheduled = false;
  var sidebarShortcutBound = false;
  function bindSidebarShortcut() {
    if (sidebarShortcutBound) {
      return;
    }
    sidebarShortcutBound = true;
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        toggleSidebar();
      }
    });
  }
  async function initialize() {
    initializeFeatureControllers();
    if (initializePromise) {
      return initializePromise;
    }
    initializePromise = (async () => {
      createSidebar();
      addStyles();
      createSettingsModal2();
      bindSummarySelectionGuards();
      bindSidebarHistoryButton();
      bindSidebarShortcut();
      registerMenuCommand();
      const initialTopicId = extractTopicId();
      const buildingInput = document.getElementById("building");
      if (buildingInput) {
        buildingInput.value = initialTopicId || "";
        buildingInput.disabled = true;
      }
      applySummaryWidthSettings();
      applySidebarSettings();
      syncUIWithStoredSettings();
      initializeSettingsModal();
      enhanceSummaryWidthSettings();
      addToastSettingsToModal();
      toggleSummaryPanel();
      monitorMainSidebarWidth();
      monitorURLChangeAndUpdateButton();
      if (defaultOpenSidebar) {
        const sidebar = document.getElementById("summary-sidebar");
        if (sidebar && !sidebar.classList.contains("open")) {
          toggleSidebar();
        }
      }
      if (initialTopicId) {
        updateSidebarSubmitButtonState(initialTopicId);
        scheduleAutoSummarize(initialTopicId);
        await loadHistoryForCurrentTopic({ topicId: initialTopicId });
        autoShowHistoryIfExists(initialTopicId);
      } else {
        setSidebarHistoryButtonActive(false);
      }
      if (state.listPageSummaryEnabled && isListSummaryPageUrl(currentPageUrl)) {
        refreshListSummaryForCurrentPage({
          forceRebuild: false,
          delay: LIST_SUMMARY_MUTATION_REFRESH_DELAY
        });
      } else {
        clearListSummaryBootstrapWatcher();
      }
      refreshDeArrowForCurrentPage({ pullDrive: true }).catch((error) => {
        console.error("[LINUX DO Summary] Initial DeArrow refresh failed:", error);
      });
      scheduleContentFilterRefreshEvent();
      return publicApi;
    })().catch((error) => {
      initializePromise = null;
      throw error;
    });
    return initializePromise;
  }
  function bootstrapInitialization() {
    initializeFeatureControllers();
    if (bootstrapInitializationScheduled) {
      return;
    }
    bootstrapInitializationScheduled = true;
    const startInitialization = () => {
      if (!document.body) {
        requestAnimationFrame(startInitialization);
        return;
      }
      initialize().catch((error) => {
        console.error("[LINUX DO Summary] Initialization failed:", error);
      });
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", startInitialization, { once: true });
      return;
    }
    startInitialization();
  }
  function createApp() {
    if (appInstance) {
      return appInstance;
    }
    initializeFeatureControllers();
    if (!publicApi) {
      publicApi = Object.freeze({
        initialize,
        toggleSidebar,
        exportSettings: (...args) => callPublicApiHandler("exportSettings", ...args),
        exportSummaryContent: (...args) => callPublicApiHandler("exportSummaryContent", ...args),
        exportAllData: (...args) => callPublicApiHandler("exportAllData", ...args),
        importSettings: (...args) => callPublicApiHandler("importSettings", ...args),
        importAllData: (...args) => callPublicApiHandler("importAllData", ...args)
      });
    }
    appInstance = {
      publicApi,
      initialize,
      bootstrapInitialization
    };
    return appInstance;
  }

  // src/bootstrap/adapter.js
  var LEGACY_PUBLIC_API_ALIAS_MAP = Object.freeze({
    exportSettings: "exportSettings",
    exportSummaryContent: "exportSummaryContent",
    exportAllData: "exportAllData",
    exportAllData_fixed: "exportAllData",
    importSettings: "importSettings",
    importAllDataFixed: "importAllData"
  });
  function attachLegacyGlobalAliases(targetWindow, publicApi2) {
    Object.entries(LEGACY_PUBLIC_API_ALIAS_MAP).forEach(([globalName, publicMethodName]) => {
      targetWindow[globalName] = (...args) => publicApi2?.[publicMethodName]?.(...args);
    });
  }
  function bootstrapUserscriptRuntime({
    targetWindow = globalThis?.window ?? globalThis,
    createAppImpl = createApp
  } = {}) {
    const app = createAppImpl();
    const nextPublicApi = app?.publicApi;
    if (!targetWindow || typeof targetWindow !== "object") {
      throw new Error("bootstrapUserscriptRuntime requires a writable window-like target.");
    }
    if (!nextPublicApi || typeof nextPublicApi !== "object") {
      throw new Error("bootstrapUserscriptRuntime requires createApp() to return a public API object.");
    }
    targetWindow.LinuxDoSummary = nextPublicApi;
    if (typeof window !== "undefined" && targetWindow === window) {
      window.LinuxDoSummary = nextPublicApi;
    }
    attachLegacyGlobalAliases(targetWindow, nextPublicApi);
    app?.bootstrapInitialization?.();
    return nextPublicApi;
  }

  // src/main.js
  bootstrapUserscriptRuntime();
})();

/* ===== [LINUX DO] 弹窗优化 [20260830] v1.0.10 ===== */
(() => {
  "use strict";

  const VERSION = "[20260830] v1.0.10";
  const STYLE_ID = "ld-popup-polish-style";
  const CONFIRM_ID = "ld-popup-polish-confirm";
  const DELETE_MESSAGES = {
    "delete-prompt": "确定要删除当前提示词配置吗？",
    "delete-question-preset": "确定要删除当前提问预设吗？",
    "delete-api": "确定要删除当前API配置吗？",
  };

  const nativeConfirm = window.confirm.bind(window);
  let autoConfirmYes = false;
  let lastFocus = null;
  let trapBound = false;

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
/* [LINUX DO] 弹窗优化 ${VERSION} */
#settings-modal,
#summary-toast-container,
#settings-toast-container,
.topic-question-preset-menu,
.ld-polish-confirm {
  --ld-accent: var(--tertiary, var(--highlight-color, #4a90e2));
  --ld-modal: var(--secondary, var(--modal-bg, #ffffff));
  --ld-ink: var(--primary, var(--modal-text, #1e242b));
  --ld-muted: var(--primary-medium, #5c6770);
  --ld-line: var(--primary-low, var(--border-color, #d5dbe1));
  --ld-overlay: color-mix(in srgb, #000 56%, transparent);
  --ld-radius: 16px;
  --ld-input-bg: var(--d-input-bg-color, var(--secondary, var(--input-bg)));
  --ld-input-fg: var(--d-input-text-color, var(--primary, var(--text-color)));
  --ld-input-border: var(--input-border-color, var(--primary-400, var(--ld-line)));
  --ld-input-radius: 4px;
  --ld-input-focus: var(--ld-accent);
  --ld-input-placeholder: var(--primary-medium, var(--ld-muted));
  --ld-font: var(--font-0, 1em);
  --ld-font-sm: var(--font-down-1, 0.8706em);
}

html.dark #settings-modal,
html.dark #summary-toast-container,
html.dark #settings-toast-container,
html.dark .topic-question-preset-menu,
html.dark .ld-polish-confirm,
body.dark #settings-modal,
body[data-theme="dark"] #settings-modal {
  --ld-accent: var(--tertiary, var(--highlight-color, #64b5f6));
  --ld-modal: var(--secondary, var(--modal-bg, #2a2e34));
  --ld-ink: var(--primary, var(--modal-text, #e8edf2));
  --ld-muted: var(--primary-medium, #9aa3ad);
  --ld-line: var(--primary-low, var(--border-color, #3d444c));
  --ld-overlay: rgba(0, 0, 0, 0.62);
  --ld-input-bg: var(--d-input-bg-color, var(--secondary, var(--input-bg)));
  --ld-input-fg: var(--d-input-text-color, var(--primary, var(--text-color)));
  --ld-input-border: var(--input-border-color, var(--primary-400, var(--ld-line)));
  --ld-input-radius: 4px;
  --ld-input-focus: var(--ld-accent);
  --ld-input-placeholder: var(--primary-medium, var(--ld-muted));
  --ld-font: var(--font-0, 1em);
  --ld-font-sm: var(--font-down-1, 0.8706em);
}

#settings-modal {
  position: fixed !important;
  inset: 0 !important;
  z-index: 1001 !important;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden !important;
  background: var(--ld-overlay) !important;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

#settings-modal.ld-polish-open {
  display: flex !important;
  align-items: center;
  justify-content: center;
  padding: 12px;
}

#settings-modal .modal-content {
  display: flex !important;
  flex-direction: column !important;
  box-sizing: border-box !important;
  width: min(760px, calc(100vw - 32px)) !important;
  max-width: 760px !important;
  height: min(70vh, calc(100dvh - 24px)) !important;
  min-height: min(70vh, calc(100dvh - 24px)) !important;
  max-height: calc(100dvh - 24px) !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  color: var(--ld-ink) !important;
  background: var(--ld-modal) !important;
  border: 0 !important;
  border-radius: var(--ld-radius) !important;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
}

#settings-modal .modal-content:focus,
#settings-modal .modal-content:focus-visible {
  outline: none !important;
}

#settings-modal .modal-header {
  flex: 0 0 auto;
  margin: 0 !important;
  padding: 16px 20px !important;
  border-bottom: 1px solid var(--ld-line);
  background: var(--ld-modal);
}

#settings-modal .modal-header h2 {
  font-size: 16px;
  line-height: 1.3;
}

#settings-modal .modal-body {
  display: flex !important;
  flex: 1 1 auto !important;
  align-items: stretch !important;
  min-height: 0 !important;
  max-height: none !important;
  margin: 0 !important;
  padding: 16px 20px 20px !important;
  overflow: hidden !important;
}

#settings-modal .modal-tabs {
  flex: 0 0 auto;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

#settings-modal .modal-panels {
  flex: 1 1 0 !important;
  min-width: 0 !important;
  min-height: 0 !important;
  max-height: none !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
}

#settings-modal .modal-header-button:hover {
  background: color-mix(in srgb, var(--ld-accent) 16%, transparent);
}

#settings-modal #close-settings {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  font-size: 20px;
  line-height: 1;
}

#settings-modal #close-settings:hover {
  background: color-mix(in srgb, var(--ld-accent) 16%, transparent);
}

#settings-modal #close-settings:focus,
#settings-modal .modal-header-button:focus {
  outline: none !important;
  box-shadow: none !important;
}

#settings-modal #close-settings:focus-visible,
#settings-modal .modal-header-button:focus-visible {
  outline: none !important;
  box-shadow: 0 0 0 2px var(--ld-accent);
}

#settings-modal .tab-button:focus,
#settings-modal .api-sub-tab-button:focus,
#settings-modal .sidebar-sub-tab-button:focus,
#settings-modal .list-summary-sub-tab-button:focus,
#settings-modal .dearrow-sub-tab-button:focus,
#settings-modal .prompt-sub-tab-button:focus,
#settings-modal .toast-sub-tab-button:focus,
#settings-modal .btn:focus,
#settings-modal .custom-button:focus {
  outline: none !important;
  box-shadow: none !important;
}

#settings-modal .tab-button:focus-visible,
#settings-modal .api-sub-tab-button:focus-visible,
#settings-modal .sidebar-sub-tab-button:focus-visible,
#settings-modal .list-summary-sub-tab-button:focus-visible,
#settings-modal .dearrow-sub-tab-button:focus-visible,
#settings-modal .prompt-sub-tab-button:focus-visible,
#settings-modal .toast-sub-tab-button:focus-visible,
#settings-modal .btn:focus-visible,
#settings-modal .custom-button:focus-visible {
  outline: none !important;
  box-shadow: 0 0 0 2px var(--ld-accent);
}

#settings-modal .tab-button.active,
#settings-modal .api-sub-tab-button.active,
#settings-modal .sidebar-sub-tab-button.active,
#settings-modal .list-summary-sub-tab-button.active,
#settings-modal .dearrow-sub-tab-button.active,
#settings-modal .prompt-sub-tab-button.active,
#settings-modal .toast-sub-tab-button.active {
  background: var(--tab-active-bg);
  border-color: transparent;
  box-shadow: none;
}

#settings-modal .tab-button.active:focus-visible,
#settings-modal .api-sub-tab-button.active:focus-visible,
#settings-modal .sidebar-sub-tab-button.active:focus-visible,
#settings-modal .list-summary-sub-tab-button.active:focus-visible,
#settings-modal .dearrow-sub-tab-button.active:focus-visible,
#settings-modal .prompt-sub-tab-button.active:focus-visible,
#settings-modal .toast-sub-tab-button.active:focus-visible {
  box-shadow: 0 0 0 2px var(--ld-accent);
}

.summary-toast {
  position: relative;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, #fff 22%, transparent);
  border-radius: 12px !important;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
}

.summary-toast::before {
  content: "";
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 0;
  width: 3px;
  border-radius: 999px;
  background: #fff;
}

.summary-toast.warning {
  color: #2a2108 !important;
}
.summary-toast.warning::before {
  background: #2a2108;
}

#settings-toast-container {
  z-index: 10002 !important;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

#settings-toast-container .settings-toast,
#settings-toast-container .summary-toast {
  pointer-events: auto;
  border-radius: 12px !important;
}

.topic-question-preset-menu {
  z-index: 1100 !important;
  max-width: min(320px, calc(100vw - 24px));
  background: var(--ld-modal) !important;
  border-color: var(--ld-line) !important;
  border-radius: 12px !important;
}

.switch-container .tooltip {
  z-index: 10050 !important;
  width: max-content;
  max-width: 240px;
  padding: 8px 10px !important;
  border-radius: 8px !important;
  font-size: var(--font-down-1, 0.8706em);
  line-height: 1.45;
  text-align: left !important;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
}

.ld-polish-confirm-root {
  position: fixed;
  inset: 0;
  z-index: 1010;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: var(--ld-overlay, rgba(0, 0, 0, 0.62));
  backdrop-filter: blur(2px);
}

.ld-polish-confirm-root[data-open="true"] {
  display: flex;
}

.ld-polish-confirm {
  width: min(420px, calc(100vw - 32px));
  overflow: hidden;
  color: var(--ld-ink, #e8edf2);
  background: var(--ld-modal, #2a2e34);
  border-radius: 16px;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.35);
}

.ld-polish-confirm header,
.ld-polish-confirm footer {
  padding: 16px 20px;
}

.ld-polish-confirm header {
  border-bottom: 1px solid var(--ld-line, #3d444c);
  font-size: 16px;
  font-weight: 700;
}

.ld-polish-confirm p {
  margin: 0;
  padding: 16px 20px;
  color: var(--ld-muted, #9aa3ad);
  font-size: 14px;
  line-height: 1.55;
}

.ld-polish-confirm footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1px solid var(--ld-line, #3d444c);
}

.ld-polish-confirm button {
  min-height: 40px;
  padding: 8px 16px;
  border: 0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.ld-polish-cancel {
  color: var(--ld-ink, #e8edf2);
  background: color-mix(in srgb, var(--ld-ink, #e8edf2) 8%, transparent);
}

.ld-polish-ok {
  color: #fff6f5;
  background: #d95a4f;
}

.ld-polish-confirm button:focus {
  outline: none;
  box-shadow: none;
}

.ld-polish-confirm button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--ld-accent, #64b5f6);
}

@media (max-width: 720px) {
  #settings-modal.ld-polish-open {
    align-items: flex-end;
    padding: 0;
  }
  #settings-modal .modal-content {
    width: 100% !important;
    max-width: 100% !important;
    height: 85dvh !important;
    min-height: 85dvh !important;
    max-height: 85dvh !important;
    border-radius: 16px 16px 0 0 !important;
  }
  #settings-modal .modal-body {
    flex-direction: column !important;
  }
  #settings-modal .modal-panels {
    max-height: calc(85dvh - 5.5rem) !important;
  }
}

#settings-modal input,
#settings-modal select,
#settings-modal textarea,
#settings-modal .mobile-tab-select {
  font-size: var(--font-0, 1em);
}

#settings-modal .ld-secret-wrap {
  display: flex;
  align-items: stretch;
  width: 100%;
  min-height: 40px;
  box-sizing: border-box;
  background: var(--ld-input-bg);
  border: 1px solid var(--ld-input-border);
  border-radius: var(--ld-input-radius, 4px);
}

#settings-modal .ld-secret-wrap.is-focused,
#settings-modal .ld-secret-wrap:focus-within {
  border-color: var(--ld-accent);
  box-shadow: 0 0 0 2px var(--ld-accent);
}

#settings-modal .ld-secret-wrap .ld-secret-input,
#settings-modal .ld-secret-wrap input,
#settings-modal .ld-secret-wrap textarea {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  margin: 0;
  border: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: var(--font-0, 1em);
}

#settings-modal .ld-secret-toggle {
  flex: 0 0 40px;
  width: 40px;
  min-width: 40px;
  margin: 0 !important;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--ld-muted);
  box-shadow: none !important;
}

#settings-modal .ld-secret-toggle:hover,
#settings-modal .ld-secret-toggle:focus-visible {
  color: var(--ld-accent);
  background: color-mix(in srgb, var(--ld-accent) 12%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  #settings-modal,
  #settings-modal .modal-content,
  #settings-modal input,
  #settings-modal select,
  #settings-modal textarea,
  #summary-form input,
  .topic-question-input-shell,
  .slider,
  .summary-toast,
  .settings-toast,
  .ld-polish-confirm-root {
    backdrop-filter: none !important;
    transition: none !important;
    animation: none !important;
  }
}
`;
    document.documentElement.appendChild(style);
  }

  function isModalOpen(modal) {
    if (!modal) return false;
    const inline = modal.style.display;
    if (inline === "none") return false;
    if (inline && inline !== "") return true;
    return getComputedStyle(modal).display !== "none";
  }

  function focusables(root) {
    return [...root.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )].filter((el) => el.offsetParent !== null || el.getClientRects().length);
  }

  function focusQuiet(el) {
    if (!el || typeof el.focus !== "function") return;
    try {
      el.focus({ preventScroll: true, focusVisible: false });
    } catch {
      el.focus();
    }
  }

  function focusDialogShell(modal) {
    const content = modal.querySelector(".modal-content") || modal;
    if (content.getAttribute("tabindex") !== "-1") {
      content.setAttribute("tabindex", "-1");
    }
    focusQuiet(content);
  }

  function trapKey(event) {
    const modal = document.getElementById("settings-modal");
    if (!modal || !modal.classList.contains("ld-polish-open")) return;
    if (document.getElementById(CONFIRM_ID)?.dataset.open === "true") return;

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeModal(modal);
      return;
    }
    if (event.key !== "Tab") return;
    const items = focusables(modal.querySelector(".modal-content") || modal);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function closeModal(modal) {
    const closeBtn = document.getElementById("close-settings");
    if (closeBtn) {
      closeBtn.click();
      return;
    }
    modal.style.display = "none";
    document.documentElement.classList.remove("settings-modal-open");
    document.body.classList.remove("settings-modal-open");
    restoreFocus();
  }

  function restoreFocus() {
    const target = lastFocus || document.getElementById("settings-button");
    if (target && typeof target.focus === "function") {
      requestAnimationFrame(() => focusQuiet(target));
    }
  }

  function layoutModal(modal) {
    const content = modal.querySelector(".modal-content");
    const header = modal.querySelector(".modal-header");
    const body = modal.querySelector(".modal-body");
    const panels = modal.querySelector(".modal-panels");
    const tabs = modal.querySelector(".modal-tabs");
    if (!content || !panels || !isModalOpen(modal)) return;

    const viewport = Math.round(window.visualViewport?.height || window.innerHeight);
    const mobile = window.innerWidth <= 720;
    const gutter = mobile ? 0 : 24;
    const boxMax = Math.max(240, viewport - gutter);
    const shellH = Math.max(240, Math.min(Math.round(viewport * (mobile ? 0.85 : 0.7)), boxMax));
    content.style.setProperty("height", `${shellH}px`, "important");
    content.style.setProperty("min-height", `${shellH}px`, "important");
    content.style.setProperty("max-height", `${boxMax}px`, "important");

    const headerH = header ? Math.ceil(header.getBoundingClientRect().height) : 56;
    const bodyStyle = body ? getComputedStyle(body) : null;
    const bodyChrome = bodyStyle
      ? (parseFloat(bodyStyle.paddingTop) || 0) + (parseFloat(bodyStyle.paddingBottom) || 0)
      : 36;
    const panelsMax = Math.max(160, Math.floor(shellH - headerH - bodyChrome));
    panels.style.setProperty("height", `${panelsMax}px`, "important");
    panels.style.setProperty("min-height", "0px", "important");
    panels.style.setProperty("max-height", `${panelsMax}px`, "important");
    if (tabs) tabs.style.setProperty("max-height", `${panelsMax}px`, "important");
  }

  function bindLayout(modal) {
    if (modal.dataset.ldLayout === "1") {
      layoutModal(modal);
      return;
    }
    modal.dataset.ldLayout = "1";
    const run = () => layoutModal(modal);
    window.addEventListener("resize", run);
    window.visualViewport?.addEventListener("resize", run);
    run();
  }

  function enhanceModal(modal) {
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    const title = modal.querySelector(".modal-header h2");
    if (title) {
      if (!title.id) title.id = "ld-settings-title";
      modal.setAttribute("aria-labelledby", title.id);
      title.parentElement?.querySelector(".ld-polish-version")?.remove();
    }

    const open = isModalOpen(modal);
    const wasOpen = modal.dataset.ldWasOpen === "true";
    modal.classList.toggle("ld-polish-open", open);
    if (open) {
      bindLayout(modal);
      if (!trapBound) {
        document.addEventListener("keydown", trapKey, true);
        trapBound = true;
      }
      requestAnimationFrame(() => {
        if (!wasOpen) focusDialogShell(modal);
        layoutModal(modal);
      });
    } else if (wasOpen) {
      restoreFocus();
    }
    modal.dataset.ldWasOpen = open ? "true" : "false";
  }

  function watchModal() {
    const attach = (modal) => {
      if (modal.dataset.ldPolish === "1") {
        enhanceModal(modal);
        return;
      }
      modal.dataset.ldPolish = "1";
      modal.addEventListener("mousedown", (event) => {
        if (event.target === modal) closeModal(modal);
      });
      modal.addEventListener("click", (event) => {
        if (event.target.closest?.(".tab-button, .sidebar-sub-tab-button, .prompt-sub-tab-button, .api-sub-tab-button, .list-summary-sub-tab-button, .dearrow-sub-tab-button, .toast-sub-tab-button, .mobile-tab-select, #mobile-tab-select, #toggle-tabs-button")) {
          requestAnimationFrame(() => layoutModal(modal));
        }
      });
      const mobileSelect = modal.querySelector("#mobile-tab-select");
      mobileSelect?.addEventListener("change", () => requestAnimationFrame(() => layoutModal(modal)));
      enhanceModal(modal);
      new MutationObserver(() => enhanceModal(modal)).observe(modal, {
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    };

    const existing = document.getElementById("settings-modal");
    if (existing) attach(existing);

    new MutationObserver(() => {
      const modal = document.getElementById("settings-modal");
      if (modal) attach(modal);
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  function rememberFocus() {
    document.addEventListener(
      "click",
      (event) => {
        const trigger = event.target.closest?.("#settings-button, [id$='settings-button']");
        if (trigger) lastFocus = trigger;
      },
      true,
    );
  }

  function ensureConfirmUi() {
    let root = document.getElementById(CONFIRM_ID);
    if (root) return root;
    root = document.createElement("div");
    root.id = CONFIRM_ID;
    root.className = "ld-polish-confirm-root";
    root.innerHTML = `
      <div class="ld-polish-confirm" role="alertdialog" aria-modal="true" aria-labelledby="ld-polish-confirm-title" aria-describedby="ld-polish-confirm-desc">
        <header id="ld-polish-confirm-title">确认删除</header>
        <p id="ld-polish-confirm-desc"></p>
        <footer>
          <button type="button" class="ld-polish-cancel">取消</button>
          <button type="button" class="ld-polish-ok">删除</button>
        </footer>
      </div>`;
    document.body.appendChild(root);
    return root;
  }

  function askConfirm(message) {
    return new Promise((resolve) => {
      const root = ensureConfirmUi();
      const desc = root.querySelector("#ld-polish-confirm-desc");
      const cancel = root.querySelector(".ld-polish-cancel");
      const ok = root.querySelector(".ld-polish-ok");
      desc.textContent = message;
      root.dataset.open = "true";
      const finish = (value) => {
        root.dataset.open = "false";
        cancel.removeEventListener("click", onCancel);
        ok.removeEventListener("click", onOk);
        root.removeEventListener("mousedown", onBackdrop);
        document.removeEventListener("keydown", onKey, true);
        resolve(value);
      };
      const onCancel = () => finish(false);
      const onOk = () => finish(true);
      const onBackdrop = (event) => {
        if (event.target === root) finish(false);
      };
      const onKey = (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          finish(false);
        }
      };
      cancel.addEventListener("click", onCancel);
      ok.addEventListener("click", onOk);
      root.addEventListener("mousedown", onBackdrop);
      document.addEventListener("keydown", onKey, true);
      requestAnimationFrame(() => focusQuiet(cancel));
    });
  }

  function interceptConfirms() {
    const replaying = new WeakSet();
    document.addEventListener(
      "click",
      (event) => {
        const btn = event.target.closest?.("#delete-prompt, #delete-api, #delete-question-preset");
        if (!btn || replaying.has(btn)) return;
        const message = DELETE_MESSAGES[btn.id];
        if (!message) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        askConfirm(message).then((ok) => {
          if (!ok) return;
          autoConfirmYes = true;
          replaying.add(btn);
          btn.click();
          replaying.delete(btn);
          autoConfirmYes = false;
        });
      },
      true,
    );

    window.confirm = function patchedConfirm(message) {
      if (autoConfirmYes) return true;
      return nativeConfirm(message);
    };
  }

  function clampSettingsToasts() {
    const place = () => {
      const container = document.getElementById("settings-toast-container");
      const modal = document.querySelector("#settings-modal .modal-content");
      if (!container || !modal || !isModalOpen(document.getElementById("settings-modal"))) return;
      const rect = modal.getBoundingClientRect();
      const top = Math.min(rect.bottom + 10, window.innerHeight - 80);
      container.style.top = `${Math.max(12, top)}px`;
      container.style.left = `${rect.left + rect.width / 2}px`;
      container.style.right = "auto";
      container.style.bottom = "auto";
      container.style.transform = "translateX(-50%)";
    };
    window.addEventListener("resize", place);
    new MutationObserver(place).observe(document.body, { childList: true, subtree: true });
  }

  function markTooltips() {
    document.querySelectorAll("#settings-modal .tooltip").forEach((el) => {
      el.setAttribute("role", "tooltip");
    });
  }

  injectStyle();
  rememberFocus();
  watchModal();
  interceptConfirms();
  clampSettingsToasts();
  markTooltips();
  document.documentElement.dataset.ldPopupPolish = VERSION;
})();
