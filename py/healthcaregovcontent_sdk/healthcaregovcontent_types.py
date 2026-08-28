# Typed models for the HealthcareGovContent SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class ContentCollection(TypedDict, total=False):
    glossary: list


class ContentCollectionLoadMatchRequired(TypedDict):
    content_type: str


class ContentCollectionLoadMatch(ContentCollectionLoadMatchRequired, total=False):
    callback: str


class Index(TypedDict, total=False):
    bite: str
    categories: list
    esbite: str
    estitle: str
    state: list
    tags: list
    title: str
    topics: list
    url: str


class IndexListMatch(TypedDict, total=False):
    callback: str


class PostTitle(TypedDict, total=False):
    author: str
    categories: list
    content: str
    date: str
    lang: str
    layout: str
    order: int
    tags: list
    title: str
    topics: list
    url: str


class PostTitleListMatchRequired(TypedDict):
    post_title: str


class PostTitleListMatch(PostTitleListMatchRequired, total=False):
    callback: str
