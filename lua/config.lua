-- HealthcareGovContent SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "HealthcareGovContent",
      slug = "healthcare-gov-content",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://www.healthcare.gov",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["content_collection"] = {},
        ["index"] = {},
        ["post_title"] = {},
      },
    },
    entity = {
      ["content_collection"] = {
        ["fields"] = {
          {
            ["name"] = "glossary",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "content_collection",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "glossary",
                      ["kind"] = "param",
                      ["name"] = "content_type",
                      ["orig"] = "content_type",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "callback",
                      ["orig"] = "callback",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/{content-type}.json",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "{content-type}.json",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "callback",
                    "content_type",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "{content-type}.json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["index"] = {
        ["fields"] = {
          {
            ["name"] = "bite",
            ["short"] = "A short summary of the post",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "categories",
            ["short"] = "Content types and language code",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "esbite",
            ["short"] = "The post summary in Spanish",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "estitle",
            ["short"] = "Spanish translation of the post's title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "state",
            ["short"] = "Associated states for the post",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "tags",
            ["short"] = "An array of content tags, such as 'promote'",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "title",
            ["short"] = "The post's title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "topics",
            ["short"] = "Associated topics (for articles)",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "url",
            ["short"] = "URL to the HTML version of the post (add .json for post object)",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "index",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "callback",
                      ["orig"] = "callback",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/index.json",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "index.json",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "callback",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "index.json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["post_title"] = {
        ["fields"] = {
          {
            ["name"] = "author",
            ["short"] = "The author of the content post",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "categories",
            ["short"] = "Content types and language code",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "content",
            ["short"] = "The HTML body content of the post",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "date",
            ["short"] = "The publication or last modified date",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lang",
            ["short"] = "Language code: 'en' for English, 'es' for Spanish",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "layout",
            ["short"] = "The layout used to display the content",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "order",
            ["short"] = "Contextual position of the content",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "tags",
            ["short"] = "An array of content tags, such as 'promote'",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "title",
            ["short"] = "The title of the content post",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "topics",
            ["short"] = "Associated topics (for articles)",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "url",
            ["short"] = "The URL path to the content post",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "post_title",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "accessibility",
                      ["kind"] = "param",
                      ["name"] = "post_title",
                      ["orig"] = "post_title",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "callback",
                      ["orig"] = "callback",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{post-title}.json",
                ["segments"] = {
                  {
                    ["lit"] = "{post-title}.json",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "callback",
                    "post_title",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "{post-title}.json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
