

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


describe('PostTitleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HEALTHCARE_GOV_CONTENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('HEALTHCARE_GOV_CONTENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HealthcareGovContentSDK.test()
    const ent = testsdk.PostTitle()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HealthcareGovContentSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PostTitle().list({"post_title":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HEALTHCARE_GOV_CONTENT_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'post_title.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"author":{"a":true,"h":"Author","n":"author","r":false,"sh":"The author of the content post","t":"`$STRING`","key$":"author","index$":0},"categories":{"a":true,"h":"Categories","n":"categories","r":false,"sh":"Content types and language code","t":"`$ARRAY`","key$":"categories","index$":1},"content":{"a":true,"h":"Content","n":"content","r":false,"sh":"The HTML body content of the post","t":"`$STRING`","key$":"content","index$":2},"date":{"a":true,"h":"Date","n":"date","r":false,"sh":"The publication or last modified date","t":"`$STRING`","key$":"date","index$":3},"lang":{"a":true,"h":"Lang","n":"lang","r":false,"sh":"Language code: 'en' for English, 'es' for Spanish","t":"`$STRING`","key$":"lang","index$":4},"layout":{"a":true,"h":"Layout","n":"layout","r":false,"sh":"The layout used to display the content","t":"`$STRING`","key$":"layout","index$":5},"order":{"a":true,"h":"Order","n":"order","r":false,"sh":"Contextual position of the content","t":"`$INTEGER`","key$":"order","index$":6},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"sh":"An array of content tags, such as 'promote'","t":"`$ARRAY`","key$":"tags","index$":7},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"The title of the content post","t":"`$STRING`","key$":"title","index$":8},"topics":{"a":true,"h":"Topics","n":"topics","r":false,"sh":"Associated topics (for articles)","t":"`$ARRAY`","key$":"topics","index$":9},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"The URL path to the content post","t":"`$STRING`","key$":"url","index$":10}},"name":"post_title","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /{post-title}.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"accessibility","k":"param","n":"post_title","or":"post-title","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/{post-title}.json","q":{"exist":["post_title"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"{post_title}.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"post_title","name__orig":"post_title","Name":"PostTitle","name_":"post_title","name-":"post-title","NAME":"POST_TITLE","index$":2}, {"active":true,"entity":"post_title","key$":"BasicPostTitleFlow","kind":"basic","name":"BasicPostTitleFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"post_title":"post_title01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"post_title_ref01"}}],"index$":0}]}, 'PostTitle', {"GET /{post-title}.json":{"protocol":"http","parameters":[{"name":"post-title","in":"path","required":true,"description":"The title/slug of the post to retrieve","schema":{"type":"string"},"example":"accessibility","index$":0},{"name":"callback","in":"query","required":false,"description":"JSONP callback function name for cross-domain requests","schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let post_title_ref01_data = Object.values(setup.data.existing.post_title)[0] as any

    // LIST
    const post_title_ref01_ent = client.PostTitle()
    const post_title_ref01_match: any = {}
    post_title_ref01_match['post_title'] = setup.idmap['post_title01']

    const post_title_ref01_list = (await post_title_ref01_ent.list(post_title_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/post_title/PostTitleTestData.json')

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
    ['post_title01','post_title02','post_title03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HEALTHCARE_GOV_CONTENT_TEST_POST_TITLE_ENTID': idmap,
    'HEALTHCARE_GOV_CONTENT_TEST_LIVE': 'FALSE',
    'HEALTHCARE_GOV_CONTENT_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['HEALTHCARE_GOV_CONTENT_TEST_POST_TITLE_ENTID']

  const live = 'TRUE' === env.HEALTHCARE_GOV_CONTENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HEALTHCARE_GOV_CONTENT_TEST_POST_TITLE_ENTID']
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
  
