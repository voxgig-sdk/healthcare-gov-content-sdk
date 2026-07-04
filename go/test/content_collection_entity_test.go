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

func TestContentCollectionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ContentCollection(nil)
		if ent == nil {
			t.Fatal("expected non-nil ContentCollectionEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := content_collectionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "content_collection." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set HEALTHCAREGOVCONTENT_TEST_CONTENT_COLLECTION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		contentCollectionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.content_collection", setup.data)))
		var contentCollectionRef01Data map[string]any
		if len(contentCollectionRef01DataRaw) > 0 {
			contentCollectionRef01Data = core.ToMapAny(contentCollectionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = contentCollectionRef01Data

		// LOAD
		contentCollectionRef01Ent := client.ContentCollection(nil)
		contentCollectionRef01MatchDt0 := map[string]any{}
		contentCollectionRef01DataDt0Loaded, err := contentCollectionRef01Ent.Load(contentCollectionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if contentCollectionRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func content_collectionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "content_collection", "ContentCollectionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read content_collection test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse content_collection test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"content_collection01", "content_collection02", "content_collection03", "api01", "api02", "api03", "content_type01"},
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
	entidEnvRaw := os.Getenv("HEALTHCAREGOVCONTENT_TEST_CONTENT_COLLECTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HEALTHCAREGOVCONTENT_TEST_CONTENT_COLLECTION_ENTID": idmap,
		"HEALTHCAREGOVCONTENT_TEST_LIVE":      "FALSE",
		"HEALTHCAREGOVCONTENT_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["HEALTHCAREGOVCONTENT_TEST_CONTENT_COLLECTION_ENTID"])
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
