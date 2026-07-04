# ContentCollection entity test

require "minitest/autorun"
require "json"
require_relative "../HealthcareGovContent_sdk"
require_relative "runner"

class ContentCollectionEntityTest < Minitest::Test
  def test_create_instance
    testsdk = HealthcareGovContentSDK.test(nil, nil)
    ent = testsdk.ContentCollection(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = content_collection_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "content_collection." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set HEALTHCAREGOVCONTENT_TEST_CONTENT_COLLECTION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    content_collection_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.content_collection")))
    content_collection_ref01_data = nil
    if content_collection_ref01_data_raw.length > 0
      content_collection_ref01_data = Helpers.to_map(content_collection_ref01_data_raw[0][1])
    end

    # LOAD
    content_collection_ref01_ent = client.ContentCollection(nil)
    content_collection_ref01_match_dt0 = {}
    content_collection_ref01_data_dt0_loaded = content_collection_ref01_ent.load(content_collection_ref01_match_dt0, nil)
    assert !content_collection_ref01_data_dt0_loaded.nil?

  end
end

def content_collection_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "content_collection", "ContentCollectionTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = HealthcareGovContentSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["content_collection01", "content_collection02", "content_collection03", "api01", "api02", "api03", "content_type01"],
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
  entid_env_raw = ENV["HEALTHCAREGOVCONTENT_TEST_CONTENT_COLLECTION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "HEALTHCAREGOVCONTENT_TEST_CONTENT_COLLECTION_ENTID" => idmap,
    "HEALTHCAREGOVCONTENT_TEST_LIVE" => "FALSE",
    "HEALTHCAREGOVCONTENT_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["HEALTHCAREGOVCONTENT_TEST_CONTENT_COLLECTION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["HEALTHCAREGOVCONTENT_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
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
