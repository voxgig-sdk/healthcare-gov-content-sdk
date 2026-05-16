# PostTitle entity test

require "minitest/autorun"
require "json"
require_relative "../HealthcareGovContent_sdk"
require_relative "runner"

class PostTitleEntityTest < Minitest::Test
  def test_create_instance
    testsdk = HealthcareGovContentSDK.test(nil, nil)
    ent = testsdk.PostTitle(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = post_title_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "post_title." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set HEALTHCAREGOVCONTENT_TEST_POST_TITLE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    post_title_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.post_title")))
    post_title_ref01_data = nil
    if post_title_ref01_data_raw.length > 0
      post_title_ref01_data = Helpers.to_map(post_title_ref01_data_raw[0][1])
    end

    # LIST
    post_title_ref01_ent = client.PostTitle(nil)
    post_title_ref01_match = {
      "post_title" => setup[:idmap]["post_title01"],
    }

    post_title_ref01_list_result, err = post_title_ref01_ent.list(post_title_ref01_match, nil)
    assert_nil err
    assert post_title_ref01_list_result.is_a?(Array)

  end
end

def post_title_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "post_title", "PostTitleTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = HealthcareGovContentSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["post_title01", "post_title02", "post_title03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["HEALTHCAREGOVCONTENT_TEST_POST_TITLE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "HEALTHCAREGOVCONTENT_TEST_POST_TITLE_ENTID" => idmap,
    "HEALTHCAREGOVCONTENT_TEST_LIVE" => "FALSE",
    "HEALTHCAREGOVCONTENT_TEST_EXPLAIN" => "FALSE",
    "HEALTHCAREGOVCONTENT_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["HEALTHCAREGOVCONTENT_TEST_POST_TITLE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["HEALTHCAREGOVCONTENT_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["HEALTHCAREGOVCONTENT_APIKEY"],
      },
      extra || {},
    ])
    client = HealthcareGovContentSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["HEALTHCAREGOVCONTENT_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["HEALTHCAREGOVCONTENT_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
