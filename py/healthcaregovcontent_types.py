# Typed models for the HealthcareGovContent SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class ContentCollection:
    glossary: Optional[list] = None


@dataclass
class ContentCollectionLoadMatch:
    content_type: str


@dataclass
class Index:
    bite: Optional[str] = None
    category: Optional[list] = None
    es_bite: Optional[str] = None
    es_title: Optional[str] = None
    state: Optional[list] = None
    tag: Optional[list] = None
    title: Optional[str] = None
    topic: Optional[list] = None
    url: Optional[str] = None


@dataclass
class IndexListMatch:
    bite: Optional[str] = None
    category: Optional[list] = None
    es_bite: Optional[str] = None
    es_title: Optional[str] = None
    state: Optional[list] = None
    tag: Optional[list] = None
    title: Optional[str] = None
    topic: Optional[list] = None
    url: Optional[str] = None


@dataclass
class PostTitle:
    author: Optional[str] = None
    category: Optional[list] = None
    content: Optional[str] = None
    date: Optional[str] = None
    lang: Optional[str] = None
    layout: Optional[str] = None
    order: Optional[int] = None
    tag: Optional[list] = None
    title: Optional[str] = None
    topic: Optional[list] = None
    url: Optional[str] = None


@dataclass
class PostTitleListMatch:
    post_title: str

