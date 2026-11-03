-- PostTitle entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("healthcare-gov-content_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("PostTitleEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:PostTitle(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:PostTitle(nil):list({ ["post_title"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = post_title_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "post_title." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      for _live_key, _live_ex in pairs({["post_title01"] = "accessibility"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          setup.idmap[_live_key] = _live_ex
        end
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local post_title_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.post_title")))
    local post_title_ref01_data = nil
    if #post_title_ref01_data_raw > 0 then
      post_title_ref01_data = helpers.to_map(post_title_ref01_data_raw[1][2])
    end

    -- LIST
    local post_title_ref01_ent = client:PostTitle(nil)
    local post_title_ref01_match = {
      ["post_title"] = setup.idmap["post_title01"],
    }

    local post_title_ref01_list_result, err = post_title_ref01_ent:list(post_title_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(post_title_ref01_list_result)

  end)
end)

function post_title_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/post_title/PostTitleTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read post_title test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "post_title01", "post_title02", "post_title03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("HEALTHCARE_GOV_CONTENT_TEST_POST_TITLE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["HEALTHCARE_GOV_CONTENT_TEST_POST_TITLE_ENTID"] = idmap,
    ["HEALTHCARE_GOV_CONTENT_TEST_LIVE"] = "FALSE",
    ["HEALTHCARE_GOV_CONTENT_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["HEALTHCARE_GOV_CONTENT_TEST_POST_TITLE_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["HEALTHCARE_GOV_CONTENT_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["HEALTHCARE_GOV_CONTENT_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["HEALTHCARE_GOV_CONTENT_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
