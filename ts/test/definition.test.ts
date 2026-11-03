import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "content_collection",
    "accessor": "ContentCollection",
    "op": "load",
    "method": "GET",
    "path": "/api/{content-type}.json",
    "args": [
      {
        "name": "content_type",
        "wire": "content-type",
        "value": "glossary"
      }
    ],
    "select": {
      "callback": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "callback"
    ],
    "queryArgs": [
      {
        "name": "callback",
        "wire": "callback"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "glossary": [
        {
          "url": "/glossary/childrens-health-insurance-program-chip/",
          "title": "Children's Health Insurance Program (CHIP)",
          "content": "<p>Definition content...</p>",
          "lang": "en",
          "categories": [
            "glossary",
            "en"
          ],
          "tags": [],
          "topics": [],
          "layout": "glossary",
          "order": 0
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "index",
    "accessor": "Index",
    "op": "list",
    "method": "GET",
    "path": "/api/index.json",
    "args": [],
    "select": {
      "callback": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "callback"
    ],
    "queryArgs": [
      {
        "name": "callback",
        "wire": "callback"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "tags": [
          "promote"
        ],
        "categories": [
          "article",
          "en"
        ],
        "topics": [
          "getting-coverage"
        ],
        "title": "How to apply for coverage",
        "es-title": "Cómo solicitar cobertura",
        "url": "/how-to-apply/",
        "bite": "Learn how to apply for health insurance coverage",
        "es-bite": "Aprenda cómo solicitar cobertura de seguro médico",
        "state": []
      },
      {
        "tags": [],
        "categories": [
          "glossary",
          "en"
        ],
        "topics": [],
        "title": "Premium",
        "es-title": "Prima",
        "url": "/glossary/premium/",
        "bite": "The amount you pay for your health insurance every month",
        "es-bite": "La cantidad que paga por su seguro médico cada mes",
        "state": []
      }
    ],
    "idField": "id"
  },
  {
    "entity": "post_title",
    "accessor": "PostTitle",
    "op": "list",
    "method": "GET",
    "path": "/{post-title}.json",
    "args": [
      {
        "name": "post_title",
        "wire": "post-title",
        "value": "accessibility"
      }
    ],
    "select": {
      "callback": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "callback"
    ],
    "queryArgs": [
      {
        "name": "callback",
        "wire": "callback"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "url": "/accessibility/",
      "title": "Accessibility",
      "content": "<p>Content about accessibility...</p>",
      "author": "HealthCare.gov",
      "date": "2023-01-01",
      "lang": "en",
      "categories": [
        "article",
        "en"
      ],
      "tags": [
        "promote"
      ],
      "topics": [
        "getting-coverage"
      ],
      "layout": "basic",
      "order": 0
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
