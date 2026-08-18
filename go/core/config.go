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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
								"parts": []any{
									"api",
									"{content-type}.json",
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
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"api",
						},
					},
				},
			},
			"index": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bite",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "categories",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "esbite",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "estitle",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "tags",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "topics",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "url",
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
								"parts": []any{
									"api",
									"index.json",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "categories",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "content",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lang",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "layout",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "order",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "tags",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "topics",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "url",
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
								"parts": []any{
									"{post-title}.json",
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
