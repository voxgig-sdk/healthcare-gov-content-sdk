

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


describe('ContentCollectionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HEALTHCARE_GOV_CONTENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('HEALTHCARE_GOV_CONTENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HealthcareGovContentSDK.test()
    const ent = testsdk.ContentCollection()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HEALTHCARE_GOV_CONTENT_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'content_collection.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"glossary","req":false,"type":"`$ARRAY`","index$":0}],"name":"content_collection","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"glossary","kind":"param","name":"content_type","orig":"content_type","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"callback","orig":"callback","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/{content-type}.json","json":"{\"operationId\":\"getContentCollection\",\"parameters\":[{\"description\":\"The type of content to retrieve\",\"example\":\"glossary\",\"in\":\"path\",\"name\":\"content-type\",\"required\":true,\"schema\":{\"enum\":[\"articles\",\"blog\",\"questions\",\"glossary\",\"states\",\"topics\"],\"type\":\"string\"}},{\"description\":\"JSONP callback function name for cross-domain requests\",\"in\":\"query\",\"name\":\"callback\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"glossary\":{\"summary\":\"Glossary collection example\",\"value\":{\"glossary\":[{\"categories\":[\"glossary\",\"en\"],\"content\":\"<p>Definition content...</p>\",\"lang\":\"en\",\"layout\":\"glossary\",\"order\":0,\"tags\":[],\"title\":\"Children's Health Insurance Program (CHIP)\",\"topics\":[],\"url\":\"/glossary/childrens-health-insurance-program-chip/\"}]}}},\"schema\":{\"additionalProperties\":{\"items\":{\"description\":\"A complete content post with body content and metadata\",\"properties\":{\"author\":{\"description\":\"The author of the content post\",\"example\":\"HealthCare.gov\",\"type\":\"string\"},\"categories\":{\"description\":\"Content types and language code\",\"example\":[\"article\",\"en\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"content\":{\"description\":\"The HTML body content of the post\",\"example\":\"<p>Content about accessibility...</p>\",\"type\":\"string\"},\"date\":{\"description\":\"The publication or last modified date\",\"example\":\"2023-01-01\",\"type\":\"string\"},\"lang\":{\"description\":\"Language code: 'en' for English, 'es' for Spanish\",\"enum\":[\"en\",\"es\"],\"example\":\"en\",\"type\":\"string\"},\"layout\":{\"description\":\"The layout used to display the content\",\"example\":\"basic\",\"type\":\"string\"},\"order\":{\"description\":\"Contextual position of the content\",\"example\":0,\"type\":\"integer\"},\"tags\":{\"description\":\"An array of content tags, such as 'promote'\",\"example\":[\"promote\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"description\":\"The title of the content post\",\"example\":\"Accessibility\",\"type\":\"string\"},\"topics\":{\"description\":\"Associated topics (for articles)\",\"example\":[\"getting-coverage\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"description\":\"The URL path to the content post\",\"example\":\"/accessibility/\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"description\":\"A collection of content posts by content type\",\"example\":{\"glossary\":[{\"categories\":[\"glossary\",\"en\"],\"content\":\"<p>The amount you pay...</p>\",\"lang\":\"en\",\"layout\":\"glossary\",\"order\":0,\"tags\":[],\"title\":\"Premium\",\"topics\":[],\"url\":\"/glossary/premium/\"}]},\"type\":\"object\"}}},\"description\":\"Successful response with content collection\"},\"404\":{\"description\":\"Content type not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/{content-type}.json","segments":[{"lit":"api"},{"lit":"{content-type}.json"}],"select":{"exist":["callback","content_type"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"content_collection","name__orig":"content_collection","Name":"ContentCollection","name_":"content_collection","name-":"content-collection","NAME":"CONTENT_COLLECTION","index$":0}, {"active":true,"entity":"content_collection","key$":"BasicContentCollectionFlow","kind":"basic","name":"BasicContentCollectionFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"content_collection_ref01","srcdatavar":"content_collection_ref01_data","suffix":"_dt0"},"match":{"content_type":"content_type01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-content_collection_ref01"}}],"index$":0}]}, 'ContentCollection')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let content_collection_ref01_data = Object.values(setup.data.existing.content_collection)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const content_collection_ref01_ent = client.ContentCollection()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/content_collection/ContentCollectionTestData.json')

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
    ['content_collection01','content_collection02','content_collection03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HEALTHCARE_GOV_CONTENT_TEST_CONTENT_COLLECTION_ENTID': idmap,
    'HEALTHCARE_GOV_CONTENT_TEST_LIVE': 'FALSE',
    'HEALTHCARE_GOV_CONTENT_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['HEALTHCARE_GOV_CONTENT_TEST_CONTENT_COLLECTION_ENTID']

  const live = 'TRUE' === env.HEALTHCARE_GOV_CONTENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HEALTHCARE_GOV_CONTENT_TEST_CONTENT_COLLECTION_ENTID']
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
  
