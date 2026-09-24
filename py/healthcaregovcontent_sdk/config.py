# HealthcareGovContent SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "HealthcareGovContent",
            "slug": "healthcare-gov-content",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://www.healthcare.gov",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "content_collection": {},
                "index": {},
                "post_title": {},
            },
        },
        "entity": {
      "content_collection": {
        "fields": [
          {
            "name": "glossary",
            "title": "Glossary",
            "type": "`$ARRAY`",
          },
        ],
        "name": "content_collection",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/{content-type}.json",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "{content-type}.json",
                  },
                ],
                "parts": [
                  "api",
                  "{content-type}.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "content_type",
                      "orig": "content_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "glossary",
                    },
                  ],
                  "query": [
                    {
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "callback",
                    "content_type",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "index": {
        "fields": [
          {
            "name": "bite",
            "title": "Bite",
            "type": "`$STRING`",
            "short": "A short summary of the post",
          },
          {
            "name": "categories",
            "title": "Categories",
            "type": "`$ARRAY`",
            "short": "Content types and language code",
          },
          {
            "name": "esbite",
            "title": "Esbite",
            "type": "`$STRING`",
            "short": "The post summary in Spanish",
          },
          {
            "name": "estitle",
            "title": "Estitle",
            "type": "`$STRING`",
            "short": "Spanish translation of the post's title",
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$ARRAY`",
            "short": "Associated states for the post",
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
            "short": "An array of content tags, such as 'promote'",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "short": "The post's title",
          },
          {
            "name": "topics",
            "title": "Topics",
            "type": "`$ARRAY`",
            "short": "Associated topics (for articles)",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "short": "URL to the HTML version of the post (add .json for post object)",
          },
        ],
        "name": "index",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/index.json",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "index.json",
                  },
                ],
                "parts": [
                  "api",
                  "index.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "callback",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "post_title": {
        "fields": [
          {
            "name": "author",
            "title": "Author",
            "type": "`$STRING`",
            "short": "The author of the content post",
          },
          {
            "name": "categories",
            "title": "Categories",
            "type": "`$ARRAY`",
            "short": "Content types and language code",
          },
          {
            "name": "content",
            "title": "Content",
            "type": "`$STRING`",
            "short": "The HTML body content of the post",
          },
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
            "short": "The publication or last modified date",
          },
          {
            "name": "lang",
            "title": "Lang",
            "type": "`$STRING`",
            "short": "Language code: 'en' for English, 'es' for Spanish",
          },
          {
            "name": "layout",
            "title": "Layout",
            "type": "`$STRING`",
            "short": "The layout used to display the content",
          },
          {
            "name": "order",
            "title": "Order",
            "type": "`$INTEGER`",
            "short": "Contextual position of the content",
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
            "short": "An array of content tags, such as 'promote'",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "short": "The title of the content post",
          },
          {
            "name": "topics",
            "title": "Topics",
            "type": "`$ARRAY`",
            "short": "Associated topics (for articles)",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "short": "The URL path to the content post",
          },
        ],
        "name": "post_title",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/{post-title}.json",
                "segments": [
                  {
                    "lit": "{post-title}.json",
                  },
                ],
                "parts": [
                  "{post-title}.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "post_title",
                      "orig": "post_title",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "accessibility",
                    },
                  ],
                  "query": [
                    {
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "callback",
                    "post_title",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
