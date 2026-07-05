// Typed models for the HealthcareGovContent SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface ContentCollection {
  glossary?: any[]
}

export interface ContentCollectionLoadMatch {
  content_type: string
}

export interface Index {
  bite?: string
  category?: any[]
  es_bite?: string
  es_title?: string
  state?: any[]
  tag?: any[]
  title?: string
  topic?: any[]
  url?: string
}

export interface IndexListMatch {
  bite?: string
  category?: any[]
  es_bite?: string
  es_title?: string
  state?: any[]
  tag?: any[]
  title?: string
  topic?: any[]
  url?: string
}

export interface PostTitle {
  author?: string
  category?: any[]
  content?: string
  date?: string
  lang?: string
  layout?: string
  order?: number
  tag?: any[]
  title?: string
  topic?: any[]
  url?: string
}

export interface PostTitleListMatch {
  post_title: string
}

