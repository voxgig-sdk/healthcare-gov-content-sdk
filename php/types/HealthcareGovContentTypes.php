<?php
declare(strict_types=1);

// Typed models for the HealthcareGovContent SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** ContentCollection entity data model. */
class ContentCollection
{
    public ?array $glossary = null;
}

/** Request payload for ContentCollection#load. */
class ContentCollectionLoadMatch
{
    public string $content_type;
}

/** Index entity data model. */
class Index
{
    public ?string $bite = null;
    public ?array $category = null;
    public ?string $es_bite = null;
    public ?string $es_title = null;
    public ?array $state = null;
    public ?array $tag = null;
    public ?string $title = null;
    public ?array $topic = null;
    public ?string $url = null;
}

/** Match filter for Index#list (any subset of Index fields). */
class IndexListMatch
{
    public ?string $bite = null;
    public ?array $category = null;
    public ?string $es_bite = null;
    public ?string $es_title = null;
    public ?array $state = null;
    public ?array $tag = null;
    public ?string $title = null;
    public ?array $topic = null;
    public ?string $url = null;
}

/** PostTitle entity data model. */
class PostTitle
{
    public ?string $author = null;
    public ?array $category = null;
    public ?string $content = null;
    public ?string $date = null;
    public ?string $lang = null;
    public ?string $layout = null;
    public ?int $order = null;
    public ?array $tag = null;
    public ?string $title = null;
    public ?array $topic = null;
    public ?string $url = null;
}

/** Request payload for PostTitle#list. */
class PostTitleListMatch
{
    public string $post_title;
}

