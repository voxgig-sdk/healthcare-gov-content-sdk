-- Typed models for the HealthcareGovContent SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class ContentCollection
---@field glossary? table

---@class ContentCollectionLoadMatch
---@field content_type string
---@field callback? string

---@class Index
---@field bite? string
---@field categories? table
---@field esbite? string
---@field estitle? string
---@field state? table
---@field tags? table
---@field title? string
---@field topics? table
---@field url? string

---@class IndexListMatch
---@field callback? string

---@class PostTitle
---@field author? string
---@field categories? table
---@field content? string
---@field date? string
---@field lang? string
---@field layout? string
---@field order? number
---@field tags? table
---@field title? string
---@field topics? table
---@field url? string

---@class PostTitleListMatch
---@field post_title string
---@field callback? string

local M = {}

return M
