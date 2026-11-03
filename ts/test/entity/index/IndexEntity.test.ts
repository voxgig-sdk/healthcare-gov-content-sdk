

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { HealthcareGovContentSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('IndexEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HEALTHCARE_GOV_CONTENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('HEALTHCARE_GOV_CONTENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HealthcareGovContentSDK.test()
    const ent = testsdk.Index()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('index hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of HealthcareGovContentSDK.test(offline).Index().stream('list')) { }
    }, /offline/)

    for await (const _item of HealthcareGovContentSDK.test(offline).Index()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = HealthcareGovContentSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Index().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of HealthcareGovContentSDK.test().Index().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new HealthcareGovContentSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Index().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Index().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HealthcareGovContentSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Index().list({"callback":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HEALTHCARE_GOV_CONTENT_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'index.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bite":{"a":true,"h":"Bite","n":"bite","r":false,"sh":"A short summary of the post","t":"`$STRING`","key$":"bite","index$":0},"categories":{"a":true,"h":"Categories","n":"categories","r":false,"sh":"Content types and language code","t":"`$ARRAY`","key$":"categories","index$":1},"esbite":{"a":true,"h":"Esbite","n":"esbite","r":false,"sh":"The post summary in Spanish","t":"`$STRING`","key$":"esbite","index$":2},"estitle":{"a":true,"h":"Estitle","n":"estitle","r":false,"sh":"Spanish translation of the post's title","t":"`$STRING`","key$":"estitle","index$":3},"state":{"a":true,"h":"State","n":"state","r":false,"sh":"Associated states for the post","t":"`$ARRAY`","key$":"state","index$":4},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"sh":"An array of content tags, such as 'promote'","t":"`$ARRAY`","key$":"tags","index$":5},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"The post's title","t":"`$STRING`","key$":"title","index$":6},"topics":{"a":true,"h":"Topics","n":"topics","r":false,"sh":"Associated topics (for articles)","t":"`$ARRAY`","key$":"topics","index$":7},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"URL to the HTML version of the post (add .json for post object)","t":"`$STRING`","key$":"url","index$":8}},"name":"index","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/index.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/index.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"index.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"index","name__orig":"index","Name":"Index","name_":"index","name-":"index","NAME":"INDEX","index$":1}, {"active":true,"entity":"index","key$":"BasicIndexFlow","kind":"basic","name":"BasicIndexFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"index_ref01"}}],"index$":0}]}, 'Index', {"GET /api/index.json":{"protocol":"http","parameters":[{"name":"callback","in":"query","required":false,"description":"JSONP callback function name for cross-domain requests","schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let index_ref01_data = Object.values(setup.data.existing.index)[0] as any

    // LIST
    const index_ref01_ent = client.Index()
    const index_ref01_match: any = {}

    const index_ref01_list = (await index_ref01_ent.list(index_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/index/IndexTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = HealthcareGovContentSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['index01','index02','index03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HEALTHCARE_GOV_CONTENT_TEST_INDEX_ENTID': idmap,
    'HEALTHCARE_GOV_CONTENT_TEST_LIVE': 'FALSE',
    'HEALTHCARE_GOV_CONTENT_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['HEALTHCARE_GOV_CONTENT_TEST_INDEX_ENTID']

  const live = 'TRUE' === env.HEALTHCARE_GOV_CONTENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HEALTHCARE_GOV_CONTENT_TEST_INDEX_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new HealthcareGovContentSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
