// Typed models for the HealthcareGovContent SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface ContentCollection {
  glossary?: any[]
}

export interface ContentCollectionLoadMatch {
  content_type: string
  callback?: string
}

export interface Index {
  bite?: string
  categories?: any[]
  esbite?: string
  estitle?: string
  state?: any[]
  tags?: any[]
  title?: string
  topics?: any[]
  url?: string
}

export interface IndexListMatch {
  callback?: string
}

export interface PostTitle {
  author?: string
  categories?: any[]
  content?: string
  date?: string
  lang?: string
  layout?: string
  order?: number
  tags?: any[]
  title?: string
  topics?: any[]
  url?: string
}

export interface PostTitleListMatch {
  post_title: string
  callback?: string
}

