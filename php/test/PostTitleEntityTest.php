<?php
declare(strict_types=1);

// PostTitle entity test

require_once __DIR__ . '/../healthcaregovcontent_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PostTitleEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = HealthcareGovContentSDK::test(null, null);
        $ent = $testsdk->PostTitle(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = post_title_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "post_title." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set HEALTHCAREGOVCONTENT_TEST_POST_TITLE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $post_title_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.post_title")));
        $post_title_ref01_data = null;
        if (count($post_title_ref01_data_raw) > 0) {
            $post_title_ref01_data = Helpers::to_map($post_title_ref01_data_raw[0][1]);
        }

        // LIST
        $post_title_ref01_ent = $client->PostTitle(null);
        $post_title_ref01_match = [
            "post_title" => $setup["idmap"]["post_title01"],
        ];

        [$post_title_ref01_list_result, $err] = $post_title_ref01_ent->list($post_title_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($post_title_ref01_list_result);

    }
}

function post_title_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/post_title/PostTitleTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = HealthcareGovContentSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["post_title01", "post_title02", "post_title03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("HEALTHCAREGOVCONTENT_TEST_POST_TITLE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "HEALTHCAREGOVCONTENT_TEST_POST_TITLE_ENTID" => $idmap,
        "HEALTHCAREGOVCONTENT_TEST_LIVE" => "FALSE",
        "HEALTHCAREGOVCONTENT_TEST_EXPLAIN" => "FALSE",
        "HEALTHCAREGOVCONTENT_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["HEALTHCAREGOVCONTENT_TEST_POST_TITLE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["HEALTHCAREGOVCONTENT_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["HEALTHCAREGOVCONTENT_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new HealthcareGovContentSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["HEALTHCAREGOVCONTENT_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["HEALTHCAREGOVCONTENT_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
