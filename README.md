# HealthcareGovContent SDK

Read educational content, articles, and glossary entries from the US Health Insurance Marketplace as JSON

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About HealthCare.gov Content API

The [HealthCare.gov](https://www.healthcare.gov) Content API exposes the educational articles, blog posts, glossary entries, and topic indexes that drive the public-facing Health Insurance Marketplace site. It is published by the US Centers for Medicare & Medicaid Services and is the same content store that powers the consumer pages at healthcare.gov.

This SDK is generated from that API and lets you fetch structured content rather than scrape rendered HTML.

What you typically get from the API:

- Collections of content items (articles, blog posts, glossary terms) as JSON
- Index documents listing posts by section, topic, or category
- Individual content records keyed by title or slug, with body text and metadata

The service is read-only and does not require authentication for the public content endpoints. Endpoints, paths, and any usage caps are defined by HealthCare.gov; consult the developer page for current details.

## Try it

**TypeScript**
```bash
npm install healthcare-gov-content
```

**Python**
```bash
pip install healthcare-gov-content-sdk
```

**PHP**
```bash
composer require voxgig/healthcare-gov-content-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/healthcare-gov-content-sdk/go
```

**Ruby**
```bash
gem install healthcare-gov-content-sdk
```

**Lua**
```bash
luarocks install healthcare-gov-content-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { HealthcareGovContentSDK } from 'healthcare-gov-content'

const client = new HealthcareGovContentSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o healthcare-gov-content-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "healthcare-gov-content": {
      "command": "/abs/path/to/healthcare-gov-content-mcp"
    }
  }
}
```

## Entities

The API exposes 3 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **ContentCollection** | A grouping of related content items (for example articles or blog posts) served as a JSON collection from the HealthCare.gov content store. | `/api/{content-type}.json` |
| **Index** | An index document that lists content items by section, topic, or category, used for navigation and discovery. | `/api/index.json` |
| **PostTitle** | An individual content entry (article, blog post, or glossary item) identified by its title or slug and returned with body text and metadata. | `/{post-title}.json` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from healthcaregovcontent_sdk import HealthcareGovContentSDK

client = HealthcareGovContentSDK({})


# Load a specific contentcollection
contentcollection, err = client.ContentCollection(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'healthcaregovcontent_sdk.php';

$client = new HealthcareGovContentSDK([]);


// Load a specific contentcollection
[$contentcollection, $err] = $client->ContentCollection(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/healthcare-gov-content-sdk/go"

client := sdk.NewHealthcareGovContentSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "HealthcareGovContent_sdk"

client = HealthcareGovContentSDK.new({})


# Load a specific contentcollection
contentcollection, err = client.ContentCollection(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("healthcare-gov-content_sdk")

local client = sdk.new({})


-- Load a specific contentcollection
local contentcollection, err = client:ContentCollection(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = HealthcareGovContentSDK.test()
const result = await client.ContentCollection().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = HealthcareGovContentSDK.test(None, None)
result, err = client.ContentCollection(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = HealthcareGovContentSDK::test(null, null);
[$result, $err] = $client->ContentCollection(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.ContentCollection(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = HealthcareGovContentSDK.test(nil, nil)
result, err = client.ContentCollection(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:ContentCollection(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the HealthCare.gov Content API

- Upstream: [https://www.healthcare.gov](https://www.healthcare.gov)
- API docs: [https://www.healthcare.gov/developers/](https://www.healthcare.gov/developers/)

- HealthCare.gov is operated by the US Centers for Medicare & Medicaid Services (CMS); most content produced by the federal government is in the public domain in the United States.
- Third-party material, logos, and brand marks on HealthCare.gov may be subject to separate rights; check the site's policies before reuse.
- No formal SDK licence is published with the OpenAPI definition; consult the HealthCare.gov terms of use and the CMS developer pages for authoritative guidance.

---

Generated from the HealthCare.gov Content API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
