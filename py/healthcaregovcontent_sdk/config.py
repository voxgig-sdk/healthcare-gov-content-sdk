# HealthcareGovContent SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
                "args": {
                  "params": [
                    {
                      "example": "glossary",
                      "kind": "param",
                      "name": "content_type",
                      "orig": "content_type",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/{content-type}.json",
                "parts": [
                  "api",
                  "{content-type}.json",
                ],
                "select": {
                  "exist": [
                    "callback",
                    "content_type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "api",
            ],
          ],
        },
      },
      "index": {
        "fields": [
          {
            "name": "bite",
            "type": "`$STRING`",
          },
          {
            "name": "categories",
            "type": "`$ARRAY`",
          },
          {
            "name": "esbite",
            "type": "`$STRING`",
          },
          {
            "name": "estitle",
            "type": "`$STRING`",
          },
          {
            "name": "state",
            "type": "`$ARRAY`",
          },
          {
            "name": "tags",
            "type": "`$ARRAY`",
          },
          {
            "name": "title",
            "type": "`$STRING`",
          },
          {
            "name": "topics",
            "type": "`$ARRAY`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
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
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/index.json",
                "parts": [
                  "api",
                  "index.json",
                ],
                "select": {
                  "exist": [
                    "callback",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$STRING`",
          },
          {
            "name": "categories",
            "type": "`$ARRAY`",
          },
          {
            "name": "content",
            "type": "`$STRING`",
          },
          {
            "name": "date",
            "type": "`$STRING`",
          },
          {
            "name": "lang",
            "type": "`$STRING`",
          },
          {
            "name": "layout",
            "type": "`$STRING`",
          },
          {
            "name": "order",
            "type": "`$INTEGER`",
          },
          {
            "name": "tags",
            "type": "`$ARRAY`",
          },
          {
            "name": "title",
            "type": "`$STRING`",
          },
          {
            "name": "topics",
            "type": "`$ARRAY`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{post-title}.json",
                "parts": [
                  "{post-title}.json",
                ],
                "select": {
                  "exist": [
                    "callback",
                    "post_title",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
