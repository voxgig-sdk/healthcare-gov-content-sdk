

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { HealthcareGovContentSDK, BaseFeature, stdutil } from '../../..'

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


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HEALTHCARE_GOV_CONTENT_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'index.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bite":{"a":true,"h":"Bite","n":"bite","r":false,"sh":"A short summary of the post","t":"`$STRING`","key$":"bite","index$":0},"categories":{"a":true,"h":"Categories","n":"categories","r":false,"sh":"Content types and language code","t":"`$ARRAY`","key$":"categories","index$":1},"esbite":{"a":true,"h":"Esbite","n":"esbite","r":false,"sh":"The post summary in Spanish","t":"`$STRING`","key$":"esbite","index$":2},"estitle":{"a":true,"h":"Estitle","n":"estitle","r":false,"sh":"Spanish translation of the post's title","t":"`$STRING`","key$":"estitle","index$":3},"state":{"a":true,"h":"State","n":"state","r":false,"sh":"Associated states for the post","t":"`$ARRAY`","key$":"state","index$":4},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"sh":"An array of content tags, such as 'promote'","t":"`$ARRAY`","key$":"tags","index$":5},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"The post's title","t":"`$STRING`","key$":"title","index$":6},"topics":{"a":true,"h":"Topics","n":"topics","r":false,"sh":"Associated topics (for articles)","t":"`$ARRAY`","key$":"topics","index$":7},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"URL to the HTML version of the post (add .json for post object)","t":"`$STRING`","key$":"url","index$":8}},"name":"index","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/index.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/index.json","q":{"exist":["callback"]},"r":{},"s":[{"lit":"api"},{"lit":"index.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"index","name__orig":"index","Name":"Index","name_":"index","name-":"index","NAME":"INDEX","index$":1}, {"active":true,"entity":"index","key$":"BasicIndexFlow","kind":"basic","name":"BasicIndexFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"index_ref01"}}],"index$":0}]}, 'Index', {"GET /api/index.json":{"protocol":"http","operationId":"getContentIndex","responses":{"200":{"description":"Successful response with content index","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","description":"Abridged metadata for a content post in the site-wide index","properties":{"tags":{"type":"array","description":"An array of content tags, such as 'promote'","items":{"type":"string"},"example":["promote"],"key$":"tags"},"categories":{"type":"array","description":"Content types and language code","items":{"type":"string"},"example":["article","en"],"key$":"categories"},"topics":{"type":"array","description":"Associated topics (for articles)","items":{"type":"string"},"example":["getting-coverage"],"key$":"topics"},"title":{"type":"string","description":"The post's title","example":"How to apply for coverage","key$":"title"},"es-title":{"type":"string","description":"Spanish translation of the post's title","example":"Cómo solicitar cobertura","key$":"es-title"},"url":{"type":"string","description":"URL to the HTML version of the post (add .json for post object)","example":"/how-to-apply/","key$":"url"},"bite":{"type":"string","description":"A short summary of the post","example":"Learn how to apply for health insurance coverage","key$":"bite"},"es-bite":{"type":"string","description":"The post summary in Spanish","example":"Aprenda cómo solicitar cobertura de seguro médico","key$":"es-bite"},"state":{"type":"array","description":"Associated states for the post","items":{"type":"string"},"example":[],"key$":"state"}},"x-ref":"#/components/schemas/IndexItem","index$":0}},"example":[{"tags":["promote"],"categories":["article","en"],"topics":["getting-coverage"],"title":"How to apply for coverage","es-title":"Cómo solicitar cobertura","url":"/how-to-apply/","bite":"Learn how to apply for health insurance coverage","es-bite":"Aprenda cómo solicitar cobertura de seguro médico","state":[]},{"tags":[],"categories":["glossary","en"],"topics":[],"title":"Premium","es-title":"Prima","url":"/glossary/premium/","bite":"The amount you pay for your health insurance every month","es-bite":"La cantidad que paga por su seguro médico cada mes","state":[]}]}}}},"parameters":[{"name":"callback","in":"query","required":false,"description":"JSONP callback function name for cross-domain requests","schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
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
  
