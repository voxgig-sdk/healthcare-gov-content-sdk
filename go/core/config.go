package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "HealthcareGovContent",
			"slug": "healthcare-gov-content",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://www.healthcare.gov",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"content_collection": map[string]any{},
				"index": map[string]any{},
				"post_title": map[string]any{},
			},
		},
		"entity": map[string]any{
			"content_collection": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "glossary",
						"type": "`$ARRAY`",
					},
				},
				"name": "content_collection",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "glossary",
											"kind": "param",
											"name": "content_type",
											"orig": "content_type",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/{content-type}.json",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "{content-type}.json",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"callback",
										"content_type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"{content-type}.json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"index": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bite",
						"short": "A short summary of the post",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "categories",
						"short": "Content types and language code",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "esbite",
						"short": "The post summary in Spanish",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "estitle",
						"short": "Spanish translation of the post's title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"short": "Associated states for the post",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "tags",
						"short": "An array of content tags, such as 'promote'",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "title",
						"short": "The post's title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "topics",
						"short": "Associated topics (for articles)",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "url",
						"short": "URL to the HTML version of the post (add .json for post object)",
						"type": "`$STRING`",
					},
				},
				"name": "index",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/index.json",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "index.json",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"callback",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"index.json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"post_title": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "author",
						"short": "The author of the content post",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "categories",
						"short": "Content types and language code",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "content",
						"short": "The HTML body content of the post",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date",
						"short": "The publication or last modified date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lang",
						"short": "Language code: 'en' for English, 'es' for Spanish",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "layout",
						"short": "The layout used to display the content",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "order",
						"short": "Contextual position of the content",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "tags",
						"short": "An array of content tags, such as 'promote'",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "title",
						"short": "The title of the content post",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "topics",
						"short": "Associated topics (for articles)",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "url",
						"short": "The URL path to the content post",
						"type": "`$STRING`",
					},
				},
				"name": "post_title",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "accessibility",
											"kind": "param",
											"name": "post_title",
											"orig": "post_title",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{post-title}.json",
								"segments": []any{
									map[string]any{
										"lit": "{post-title}.json",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"callback",
										"post_title",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{post-title}.json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
