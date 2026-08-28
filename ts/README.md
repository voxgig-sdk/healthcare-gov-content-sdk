# HealthcareGovContent TypeScript SDK



The TypeScript SDK for the HealthcareGovContent API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.ContentCollection()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/healthcare-gov-content-sdk/releases](https://github.com/voxgig-sdk/healthcare-gov-content-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { HealthcareGovContentSDK } from '@voxgig-sdk/healthcare-gov-content'

const client = new HealthcareGovContentSDK()
```

### 3. Load a contentcollection

ContentCollection is nested under content_type, so provide the `content_type`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const contentcollection = await client.ContentCollection().load({
    content_type: 'example_content_type',
  })
  console.log(contentcollection)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const posttitles = await client.PostTitle().list()
  console.log(posttitles)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = HealthcareGovContentSDK.test()

const posttitle = await client.PostTitle().list()
// posttitle is the entity, populated with mock response data
// — call posttitle.data() for the record itself
console.log(posttitle)
```

You can also use the instance method:

```ts
const client = new HealthcareGovContentSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.PostTitle()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new HealthcareGovContentSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
HEALTHCARE_GOV_CONTENT_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### HealthcareGovContentSDK

#### Constructor

```ts
new HealthcareGovContentSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `ContentCollection(data?)` | `ContentCollectionEntity` | Create a ContentCollection entity instance. |
| `Index(data?)` | `IndexEntity` | Create an Index entity instance. |
| `PostTitle(data?)` | `PostTitleEntity` | Create a PostTitle entity instance. |
| `tester(testopts?, sdkopts?)` | `HealthcareGovContentSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `HealthcareGovContentSDK.test(testopts?, sdkopts?)` | `HealthcareGovContentSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): HealthcareGovContentSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### ContentCollection

| Field | Description |
| --- | --- |
| `glossary` |  |

Operations: load.

API path: `/api/{content-type}.json`

#### Index

| Field | Description |
| --- | --- |
| `bite` | A short summary of the post |
| `categories` | Content types and language code |
| `esbite` | The post summary in Spanish |
| `estitle` | Spanish translation of the post's title |
| `state` | Associated states for the post |
| `tags` | An array of content tags, such as 'promote' |
| `title` | The post's title |
| `topics` | Associated topics (for articles) |
| `url` | URL to the HTML version of the post (add .json for post object) |

Operations: list.

API path: `/api/index.json`

#### PostTitle

| Field | Description |
| --- | --- |
| `author` | The author of the content post |
| `categories` | Content types and language code |
| `content` | The HTML body content of the post |
| `date` | The publication or last modified date |
| `lang` | Language code: 'en' for English, 'es' for Spanish |
| `layout` | The layout used to display the content |
| `order` | Contextual position of the content |
| `tags` | An array of content tags, such as 'promote' |
| `title` | The title of the content post |
| `topics` | Associated topics (for articles) |
| `url` | The URL path to the content post |

Operations: list.

API path: `/{post-title}.json`



## Entities


### ContentCollection

Create an instance: `const content_collection = client.ContentCollection()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `glossary` | `any[]` |  |

#### Example: Load

```ts
const content_collection = await client.ContentCollection().load({ content_type: 'content_type' })
```


### Index

Create an instance: `const index = client.Index()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bite` | `string` | A short summary of the post |
| `categories` | `any[]` | Content types and language code |
| `esbite` | `string` | The post summary in Spanish |
| `estitle` | `string` | Spanish translation of the post's title |
| `state` | `any[]` | Associated states for the post |
| `tags` | `any[]` | An array of content tags, such as 'promote' |
| `title` | `string` | The post's title |
| `topics` | `any[]` | Associated topics (for articles) |
| `url` | `string` | URL to the HTML version of the post (add .json for post object) |

#### Example: List

```ts
const indexs = await client.Index().list()
```


### PostTitle

Create an instance: `const post_title = client.PostTitle()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `string` | The author of the content post |
| `categories` | `any[]` | Content types and language code |
| `content` | `string` | The HTML body content of the post |
| `date` | `string` | The publication or last modified date |
| `lang` | `string` | Language code: 'en' for English, 'es' for Spanish |
| `layout` | `string` | The layout used to display the content |
| `order` | `number` | Contextual position of the content |
| `tags` | `any[]` | An array of content tags, such as 'promote' |
| `title` | `string` | The title of the content post |
| `topics` | `any[]` | Associated topics (for articles) |
| `url` | `string` | The URL path to the content post |

#### Example: List

```ts
const post_titles = await client.PostTitle().list({ post_title: "example" })
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
healthcare-gov-content/
├── src/
│   ├── HealthcareGovContentSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { HealthcareGovContentSDK } from '@voxgig-sdk/healthcare-gov-content'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const posttitle = client.PostTitle()
await posttitle.list()

// posttitle.data() now returns the posttitle data from the last `list`
// posttitle.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
