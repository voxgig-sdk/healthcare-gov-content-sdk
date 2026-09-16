

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"bite","req":false,"short":"A short summary of the post","type":"`$STRING`","index$":0},{"active":true,"name":"categories","req":false,"short":"Content types and language code","type":"`$ARRAY`","index$":1},{"active":true,"name":"esbite","req":false,"short":"The post summary in Spanish","type":"`$STRING`","index$":2},{"active":true,"name":"estitle","req":false,"short":"Spanish translation of the post's title","type":"`$STRING`","index$":3},{"active":true,"name":"state","req":false,"short":"Associated states for the post","type":"`$ARRAY`","index$":4},{"active":true,"name":"tags","req":false,"short":"An array of content tags, such as 'promote'","type":"`$ARRAY`","index$":5},{"active":true,"name":"title","req":false,"short":"The post's title","type":"`$STRING`","index$":6},{"active":true,"name":"topics","req":false,"short":"Associated topics (for articles)","type":"`$ARRAY`","index$":7},{"active":true,"name":"url","req":false,"short":"URL to the HTML version of the post (add .json for post object)","type":"`$STRING`","index$":8}],"name":"index","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"callback","orig":"callback","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/index.json","json":"{\"operationId\":\"getContentIndex\",\"parameters\":[{\"description\":\"JSONP callback function name for cross-domain requests\",\"in\":\"query\",\"name\":\"callback\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[{\"bite\":\"Learn how to apply for health insurance coverage\",\"categories\":[\"article\",\"en\"],\"es-bite\":\"Aprenda cómo solicitar cobertura de seguro médico\",\"es-title\":\"Cómo solicitar cobertura\",\"state\":[],\"tags\":[\"promote\"],\"title\":\"How to apply for coverage\",\"topics\":[\"getting-coverage\"],\"url\":\"/how-to-apply/\"},{\"bite\":\"The amount you pay for your health insurance every month\",\"categories\":[\"glossary\",\"en\"],\"es-bite\":\"La cantidad que paga por su seguro médico cada mes\",\"es-title\":\"Prima\",\"state\":[],\"tags\":[],\"title\":\"Premium\",\"topics\":[],\"url\":\"/glossary/premium/\"}],\"schema\":{\"items\":{\"description\":\"Abridged metadata for a content post in the site-wide index\",\"properties\":{\"bite\":{\"description\":\"A short summary of the post\",\"example\":\"Learn how to apply for health insurance coverage\",\"type\":\"string\"},\"categories\":{\"description\":\"Content types and language code\",\"example\":[\"article\",\"en\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"es-bite\":{\"description\":\"The post summary in Spanish\",\"example\":\"Aprenda cómo solicitar cobertura de seguro médico\",\"type\":\"string\"},\"es-title\":{\"description\":\"Spanish translation of the post's title\",\"example\":\"Cómo solicitar cobertura\",\"type\":\"string\"},\"state\":{\"description\":\"Associated states for the post\",\"example\":[],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"tags\":{\"description\":\"An array of content tags, such as 'promote'\",\"example\":[\"promote\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"description\":\"The post's title\",\"example\":\"How to apply for coverage\",\"type\":\"string\"},\"topics\":{\"description\":\"Associated topics (for articles)\",\"example\":[\"getting-coverage\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"description\":\"URL to the HTML version of the post (add .json for post object)\",\"example\":\"/how-to-apply/\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with content index\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/index.json","segments":[{"lit":"api"},{"lit":"index.json"}],"select":{"exist":["callback"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"index","name__orig":"index","Name":"Index","name_":"index","name-":"index","NAME":"INDEX","index$":1}, {"active":true,"entity":"index","key$":"BasicIndexFlow","kind":"basic","name":"BasicIndexFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"index_ref01"}}],"index$":0}]}, 'Index')
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
  
