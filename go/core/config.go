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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"title": "Glossary",
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
								"parts": []any{
									"api",
									"{content-type}.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "content_type",
											"orig": "content_type",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "glossary",
										},
									},
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"callback",
										"content_type",
									},
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
						"title": "Bite",
						"type": "`$STRING`",
						"short": "A short summary of the post",
					},
					map[string]any{
						"name": "categories",
						"title": "Categories",
						"type": "`$ARRAY`",
						"short": "Content types and language code",
					},
					map[string]any{
						"name": "esbite",
						"title": "Esbite",
						"type": "`$STRING`",
						"short": "The post summary in Spanish",
					},
					map[string]any{
						"name": "estitle",
						"title": "Estitle",
						"type": "`$STRING`",
						"short": "Spanish translation of the post's title",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$ARRAY`",
						"short": "Associated states for the post",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
						"short": "An array of content tags, such as 'promote'",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"short": "The post's title",
					},
					map[string]any{
						"name": "topics",
						"title": "Topics",
						"type": "`$ARRAY`",
						"short": "Associated topics (for articles)",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "URL to the HTML version of the post (add .json for post object)",
					},
				},
				"name": "index",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"api",
									"index.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"callback",
									},
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
						"title": "Author",
						"type": "`$STRING`",
						"short": "The author of the content post",
					},
					map[string]any{
						"name": "categories",
						"title": "Categories",
						"type": "`$ARRAY`",
						"short": "Content types and language code",
					},
					map[string]any{
						"name": "content",
						"title": "Content",
						"type": "`$STRING`",
						"short": "The HTML body content of the post",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
						"short": "The publication or last modified date",
					},
					map[string]any{
						"name": "lang",
						"title": "Lang",
						"type": "`$STRING`",
						"short": "Language code: 'en' for English, 'es' for Spanish",
					},
					map[string]any{
						"name": "layout",
						"title": "Layout",
						"type": "`$STRING`",
						"short": "The layout used to display the content",
					},
					map[string]any{
						"name": "order",
						"title": "Order",
						"type": "`$INTEGER`",
						"short": "Contextual position of the content",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
						"short": "An array of content tags, such as 'promote'",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"short": "The title of the content post",
					},
					map[string]any{
						"name": "topics",
						"title": "Topics",
						"type": "`$ARRAY`",
						"short": "Associated topics (for articles)",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "The URL path to the content post",
					},
				},
				"name": "post_title",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/{post-title}.json",
								"segments": []any{
									map[string]any{
										"lit": "{post-title}.json",
									},
								},
								"parts": []any{
									"{post-title}.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "post_title",
											"orig": "post_title",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "accessibility",
										},
									},
									"query": []any{
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"callback",
										"post_title",
									},
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
