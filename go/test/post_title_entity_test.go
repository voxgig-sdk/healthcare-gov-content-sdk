package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/healthcare-gov-content-sdk/go"
	"github.com/voxgig-sdk/healthcare-gov-content-sdk/go/core"

	vs "github.com/voxgig-sdk/healthcare-gov-content-sdk/go/utility/struct"
)

func TestPostTitleEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PostTitle(nil)
		if ent == nil {
			t.Fatal("expected non-nil PostTitleEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := post_titleBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "post_title." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set HEALTHCAREGOVCONTENT_TEST_POST_TITLE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		postTitleRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.post_title", setup.data)))
		var postTitleRef01Data map[string]any
		if len(postTitleRef01DataRaw) > 0 {
			postTitleRef01Data = core.ToMapAny(postTitleRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = postTitleRef01Data

		// LIST
		postTitleRef01Ent := client.PostTitle(nil)
		postTitleRef01Match := map[string]any{
			"post_title": setup.idmap["post_title01"],
		}

		postTitleRef01ListResult, err := postTitleRef01Ent.List(postTitleRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, postTitleRef01ListOk := postTitleRef01ListResult.([]any)
		if !postTitleRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", postTitleRef01ListResult)
		}

	})
}

func post_titleBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "post_title", "PostTitleTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read post_title test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse post_title test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"post_title01", "post_title02", "post_title03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("HEALTHCAREGOVCONTENT_TEST_POST_TITLE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HEALTHCAREGOVCONTENT_TEST_POST_TITLE_ENTID": idmap,
		"HEALTHCAREGOVCONTENT_TEST_LIVE":      "FALSE",
		"HEALTHCAREGOVCONTENT_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["HEALTHCAREGOVCONTENT_TEST_POST_TITLE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["HEALTHCAREGOVCONTENT_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewHealthcareGovContentSDK(core.ToMapAny(mergedOpts))
	}

	live := env["HEALTHCAREGOVCONTENT_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["HEALTHCAREGOVCONTENT_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
