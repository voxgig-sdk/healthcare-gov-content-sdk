// Typed models for the HealthcareGovContent SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// ContentCollection is the typed data model for the content_collection entity.
type ContentCollection struct {
	Glossary *[]any `json:"glossary,omitempty"`
}

// ContentCollectionLoadMatch is the typed request payload for ContentCollection.LoadTyped.
type ContentCollectionLoadMatch struct {
	ContentType string `json:"content_type"`
}

// Index is the typed data model for the index entity.
type Index struct {
	Bite *string `json:"bite,omitempty"`
	Category *[]any `json:"category,omitempty"`
	EsBite *string `json:"es_bite,omitempty"`
	EsTitle *string `json:"es_title,omitempty"`
	State *[]any `json:"state,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
	Title *string `json:"title,omitempty"`
	Topic *[]any `json:"topic,omitempty"`
	Url *string `json:"url,omitempty"`
}

// IndexListMatch is the typed request payload for Index.ListTyped.
type IndexListMatch struct {
	Bite *string `json:"bite,omitempty"`
	Category *[]any `json:"category,omitempty"`
	EsBite *string `json:"es_bite,omitempty"`
	EsTitle *string `json:"es_title,omitempty"`
	State *[]any `json:"state,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
	Title *string `json:"title,omitempty"`
	Topic *[]any `json:"topic,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PostTitle is the typed data model for the post_title entity.
type PostTitle struct {
	Author *string `json:"author,omitempty"`
	Category *[]any `json:"category,omitempty"`
	Content *string `json:"content,omitempty"`
	Date *string `json:"date,omitempty"`
	Lang *string `json:"lang,omitempty"`
	Layout *string `json:"layout,omitempty"`
	Order *int `json:"order,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
	Title *string `json:"title,omitempty"`
	Topic *[]any `json:"topic,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PostTitleListMatch is the typed request payload for PostTitle.ListTyped.
type PostTitleListMatch struct {
	PostTitle string `json:"post_title"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
