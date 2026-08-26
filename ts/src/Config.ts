
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'HealthcareGovContent',
        slug: "healthcare-gov-content",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://www.healthcare.gov",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      content_collection: {
      },

      index: {
      },

      post_title: {
      },

    }
  }


  entity = {
    "content_collection": {
      "fields": [
        {
          "name": "glossary",
          "type": "`$ARRAY`"
        }
      ],
      "name": "content_collection",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "glossary",
                    "kind": "param",
                    "name": "content_type",
                    "orig": "content_type",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "callback",
                    "orig": "callback",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/{content-type}.json",
              "parts": [
                "api",
                "{content-type}.json"
              ],
              "select": {
                "exist": [
                  "callback",
                  "content_type"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "api"
          ]
        ]
      }
    },
    "index": {
      "fields": [
        {
          "name": "bite",
          "short": "A short summary of the post",
          "type": "`$STRING`"
        },
        {
          "name": "categories",
          "short": "Content types and language code",
          "type": "`$ARRAY`"
        },
        {
          "name": "esbite",
          "short": "The post summary in Spanish",
          "type": "`$STRING`"
        },
        {
          "name": "estitle",
          "short": "Spanish translation of the post's title",
          "type": "`$STRING`"
        },
        {
          "name": "state",
          "short": "Associated states for the post",
          "type": "`$ARRAY`"
        },
        {
          "name": "tags",
          "short": "An array of content tags, such as 'promote'",
          "type": "`$ARRAY`"
        },
        {
          "name": "title",
          "short": "The post's title",
          "type": "`$STRING`"
        },
        {
          "name": "topics",
          "short": "Associated topics (for articles)",
          "type": "`$ARRAY`"
        },
        {
          "name": "url",
          "short": "URL to the HTML version of the post (add .json for post object)",
          "type": "`$STRING`"
        }
      ],
      "name": "index",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "callback",
                    "orig": "callback",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/index.json",
              "parts": [
                "api",
                "index.json"
              ],
              "select": {
                "exist": [
                  "callback"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "post_title": {
      "fields": [
        {
          "name": "author",
          "short": "The author of the content post",
          "type": "`$STRING`"
        },
        {
          "name": "categories",
          "short": "Content types and language code",
          "type": "`$ARRAY`"
        },
        {
          "name": "content",
          "short": "The HTML body content of the post",
          "type": "`$STRING`"
        },
        {
          "name": "date",
          "short": "The publication or last modified date",
          "type": "`$STRING`"
        },
        {
          "name": "lang",
          "short": "Language code: 'en' for English, 'es' for Spanish",
          "type": "`$STRING`"
        },
        {
          "name": "layout",
          "short": "The layout used to display the content",
          "type": "`$STRING`"
        },
        {
          "name": "order",
          "short": "Contextual position of the content",
          "type": "`$INTEGER`"
        },
        {
          "name": "tags",
          "short": "An array of content tags, such as 'promote'",
          "type": "`$ARRAY`"
        },
        {
          "name": "title",
          "short": "The title of the content post",
          "type": "`$STRING`"
        },
        {
          "name": "topics",
          "short": "Associated topics (for articles)",
          "type": "`$ARRAY`"
        },
        {
          "name": "url",
          "short": "The URL path to the content post",
          "type": "`$STRING`"
        }
      ],
      "name": "post_title",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "accessibility",
                    "kind": "param",
                    "name": "post_title",
                    "orig": "post_title",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "callback",
                    "orig": "callback",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{post-title}.json",
              "parts": [
                "{post-title}.json"
              ],
              "select": {
                "exist": [
                  "callback",
                  "post_title"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

