-- Typed models for the HealthcareGovContent SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class ContentCollection
---@field glossary? table

---@class ContentCollectionLoadMatch
---@field content_type string

---@class Index
---@field bite? string
---@field category? table
---@field es_bite? string
---@field es_title? string
---@field state? table
---@field tag? table
---@field title? string
---@field topic? table
---@field url? string

---@class IndexListMatch
---@field bite? string
---@field category? table
---@field es_bite? string
---@field es_title? string
---@field state? table
---@field tag? table
---@field title? string
---@field topic? table
---@field url? string

---@class PostTitle
---@field author? string
---@field category? table
---@field content? string
---@field date? string
---@field lang? string
---@field layout? string
---@field order? number
---@field tag? table
---@field title? string
---@field topic? table
---@field url? string

---@class PostTitleListMatch
---@field post_title string

local M = {}

return M
