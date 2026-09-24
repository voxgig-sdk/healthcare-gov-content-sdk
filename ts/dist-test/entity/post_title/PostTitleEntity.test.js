"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PostTitleEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HEALTHCARE_GOV_CONTENT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HEALTHCARE_GOV_CONTENT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HealthcareGovContentSDK.test();
        const ent = testsdk.PostTitle();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HEALTHCARE_GOV_CONTENT_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'post_title.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "author": { "a": true, "h": "Author", "n": "author", "r": false, "sh": "The author of the content post", "t": "`$STRING`", "key$": "author", "index$": 0 }, "categories": { "a": true, "h": "Categories", "n": "categories", "r": false, "sh": "Content types and language code", "t": "`$ARRAY`", "key$": "categories", "index$": 1 }, "content": { "a": true, "h": "Content", "n": "content", "r": false, "sh": "The HTML body content of the post", "t": "`$STRING`", "key$": "content", "index$": 2 }, "date": { "a": true, "h": "Date", "n": "date", "r": false, "sh": "The publication or last modified date", "t": "`$STRING`", "key$": "date", "index$": 3 }, "lang": { "a": true, "h": "Lang", "n": "lang", "r": false, "sh": "Language code: 'en' for English, 'es' for Spanish", "t": "`$STRING`", "key$": "lang", "index$": 4 }, "layout": { "a": true, "h": "Layout", "n": "layout", "r": false, "sh": "The layout used to display the content", "t": "`$STRING`", "key$": "layout", "index$": 5 }, "order": { "a": true, "h": "Order", "n": "order", "r": false, "sh": "Contextual position of the content", "t": "`$INTEGER`", "key$": "order", "index$": 6 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "An array of content tags, such as 'promote'", "t": "`$ARRAY`", "key$": "tags", "index$": 7 }, "title": { "a": true, "h": "Title", "n": "title", "r": false, "sh": "The title of the content post", "t": "`$STRING`", "key$": "title", "index$": 8 }, "topics": { "a": true, "h": "Topics", "n": "topics", "r": false, "sh": "Associated topics (for articles)", "t": "`$ARRAY`", "key$": "topics", "index$": 9 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "The URL path to the content post", "t": "`$STRING`", "key$": "url", "index$": 10 } }, "name": "post_title", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /{post-title}.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "accessibility", "k": "param", "n": "post_title", "or": "post_title", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "callback", "or": "callback", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/{post-title}.json", "q": { "exist": ["callback", "post_title"] }, "r": {}, "s": [{ "lit": "{post-title}.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "post_title", "name__orig": "post_title", "Name": "PostTitle", "name_": "post_title", "name-": "post-title", "NAME": "POST_TITLE", "index$": 2 }, { "active": true, "entity": "post_title", "key$": "BasicPostTitleFlow", "kind": "basic", "name": "BasicPostTitleFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "post_title": "post_title01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "post_title_ref01" } }], "index$": 0 }] }, 'PostTitle', { "GET /{post-title}.json": { "protocol": "http", "operationId": "getContentObject", "responses": { "200": { "description": "Successful response with content object", "content": { "application/json": { "schema": { "type": "object", "description": "A complete content post with body content and metadata", "properties": { "url": { "description": "The URL path to the content post", "example": "/accessibility/", "key$": "url", "type": "string" }, "title": { "description": "The title of the content post", "example": "Accessibility", "key$": "title", "type": "string" }, "content": { "description": "The HTML body content of the post", "example": "<p>Content about accessibility...</p>", "key$": "content", "type": "string" }, "author": { "description": "The author of the content post", "example": "HealthCare.gov", "key$": "author", "type": "string" }, "date": { "description": "The publication or last modified date", "example": "2023-01-01", "key$": "date", "type": "string" }, "lang": { "description": "Language code: 'en' for English, 'es' for Spanish", "enum": ["en", "es"], "example": "en", "key$": "lang", "type": "string" }, "categories": { "description": "Content types and language code", "example": ["article", "en"], "items": { "type": "string" }, "key$": "categories", "type": "array" }, "tags": { "description": "An array of content tags, such as 'promote'", "example": ["promote"], "items": { "type": "string" }, "key$": "tags", "type": "array" }, "topics": { "description": "Associated topics (for articles)", "example": ["getting-coverage"], "items": { "type": "string" }, "key$": "topics", "type": "array" }, "layout": { "description": "The layout used to display the content", "example": "basic", "key$": "layout", "type": "string" }, "order": { "description": "Contextual position of the content", "example": 0, "key$": "order", "type": "integer" } }, "x-ref": "#/components/schemas/ContentObject", "index$": 0 }, "example": { "url": "/accessibility/", "title": "Accessibility", "content": "<p>Content about accessibility...</p>", "author": "HealthCare.gov", "date": "2023-01-01", "lang": "en", "categories": ["article", "en"], "tags": ["promote"], "topics": ["getting-coverage"], "layout": "basic", "order": 0 } } } }, "404": { "description": "Content not found" } }, "parameters": [{ "name": "post-title", "in": "path", "required": true, "description": "The title/slug of the post to retrieve", "schema": { "type": "string" }, "example": "accessibility", "index$": 0 }, { "name": "callback", "in": "query", "required": false, "description": "JSONP callback function name for cross-domain requests", "schema": { "type": "string" }, "index$": 1 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let post_title_ref01_data = Object.values(setup.data.existing.post_title)[0];
        // LIST
        const post_title_ref01_ent = client.PostTitle();
        const post_title_ref01_match = {};
        post_title_ref01_match['post_title'] = setup.idmap['post_title01'];
        const post_title_ref01_list = (await post_title_ref01_ent.list(post_title_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/post_title/PostTitleTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HealthcareGovContentSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['post_title01', 'post_title02', 'post_title03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HEALTHCARE_GOV_CONTENT_TEST_POST_TITLE_ENTID': idmap,
        'HEALTHCARE_GOV_CONTENT_TEST_LIVE': 'FALSE',
        'HEALTHCARE_GOV_CONTENT_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['HEALTHCARE_GOV_CONTENT_TEST_POST_TITLE_ENTID'];
    const live = 'TRUE' === env.HEALTHCARE_GOV_CONTENT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HEALTHCARE_GOV_CONTENT_TEST_POST_TITLE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.HealthcareGovContentSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.HEALTHCARE_GOV_CONTENT_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PostTitleEntity.test.js.map