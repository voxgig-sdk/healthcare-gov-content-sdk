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
#
# @!attribute [rw] callback
#   @return [String, nil]
ContentCollectionLoadMatch = Struct.new(
  :content_type,
  :callback,
  keyword_init: true
)

# Index entity data model.
#
# @!attribute [rw] bite
#   @return [String, nil]
#
# @!attribute [rw] categories
#   @return [Array, nil]
#
# @!attribute [rw] esbite
#   @return [String, nil]
#
# @!attribute [rw] estitle
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [Array, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] topics
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Index = Struct.new(
  :bite,
  :categories,
  :esbite,
  :estitle,
  :state,
  :tags,
  :title,
  :topics,
  :url,
  keyword_init: true
)

# Request payload for Index#list.
#
# @!attribute [rw] callback
#   @return [String, nil]
IndexListMatch = Struct.new(
  :callback,
  keyword_init: true
)

# PostTitle entity data model.
#
# @!attribute [rw] author
#   @return [String, nil]
#
# @!attribute [rw] categories
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
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] topics
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
PostTitle = Struct.new(
  :author,
  :categories,
  :content,
  :date,
  :lang,
  :layout,
  :order,
  :tags,
  :title,
  :topics,
  :url,
  keyword_init: true
)

# Request payload for PostTitle#list.
#
# @!attribute [rw] post_title
#   @return [String]
#
# @!attribute [rw] callback
#   @return [String, nil]
PostTitleListMatch = Struct.new(
  :post_title,
  :callback,
  keyword_init: true
)

