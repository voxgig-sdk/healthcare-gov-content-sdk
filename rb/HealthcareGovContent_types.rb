# frozen_string_literal: true

# Typed models for the HealthcareGovContent SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# ContentCollection entity data model.
#
# @!attribute [rw] glossary
#   @return [Array, nil]
ContentCollection = Struct.new(
  :glossary,
  keyword_init: true
)

# Request payload for ContentCollection#load.
#
# @!attribute [rw] content_type
#   @return [String]
ContentCollectionLoadMatch = Struct.new(
  :content_type,
  keyword_init: true
)

# Index entity data model.
#
# @!attribute [rw] bite
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [Array, nil]
#
# @!attribute [rw] es_bite
#   @return [String, nil]
#
# @!attribute [rw] es_title
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [Array, nil]
#
# @!attribute [rw] tag
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] topic
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Index = Struct.new(
  :bite,
  :category,
  :es_bite,
  :es_title,
  :state,
  :tag,
  :title,
  :topic,
  :url,
  keyword_init: true
)

# Match filter for Index#list (any subset of Index fields).
#
# @!attribute [rw] bite
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [Array, nil]
#
# @!attribute [rw] es_bite
#   @return [String, nil]
#
# @!attribute [rw] es_title
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [Array, nil]
#
# @!attribute [rw] tag
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] topic
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
IndexListMatch = Struct.new(
  :bite,
  :category,
  :es_bite,
  :es_title,
  :state,
  :tag,
  :title,
  :topic,
  :url,
  keyword_init: true
)

# PostTitle entity data model.
#
# @!attribute [rw] author
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [Array, nil]
#
# @!attribute [rw] content
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] layout
#   @return [String, nil]
#
# @!attribute [rw] order
#   @return [Integer, nil]
#
# @!attribute [rw] tag
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] topic
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
PostTitle = Struct.new(
  :author,
  :category,
  :content,
  :date,
  :lang,
  :layout,
  :order,
  :tag,
  :title,
  :topic,
  :url,
  keyword_init: true
)

# Request payload for PostTitle#list.
#
# @!attribute [rw] post_title
#   @return [String]
PostTitleListMatch = Struct.new(
  :post_title,
  keyword_init: true
)

