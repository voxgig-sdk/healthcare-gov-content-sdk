# HealthcareGovContent TypeScript SDK Reference

Complete API reference for the HealthcareGovContent TypeScript SDK.


## HealthcareGovContentSDK

### Constructor

```ts
new HealthcareGovContentSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HealthcareGovContentSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = HealthcareGovContentSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `HealthcareGovContentSDK` instance in test mode.


### Instance Methods

#### `ContentCollection(data?: object)`

Create a new `ContentCollection` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContentCollectionEntity` instance.

#### `Index(data?: object)`

Create a new `Index` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IndexEntity` instance.

#### `PostTitle(data?: object)`

Create a new `PostTitle` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PostTitleEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `HealthcareGovContentSDK.test()`.

**Returns:** `HealthcareGovContentSDK` instance in test mode.


---

## ContentCollectionEntity

```ts
const content_collection = client.ContentCollection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `glossary` | `any[]` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ContentCollection().load({ content_type: 'content_type' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContentCollectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `HealthcareGovContentSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IndexEntity

```ts
const index = client.Index()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bite` | `string` | No | A short summary of the post |
| `categories` | `any[]` | No | Content types and language code |
| `esbite` | `string` | No | The post summary in Spanish |
| `estitle` | `string` | No | Spanish translation of the post's title |
| `state` | `any[]` | No | Associated states for the post |
| `tags` | `any[]` | No | An array of content tags, such as 'promote' |
| `title` | `string` | No | The post's title |
| `topics` | `any[]` | No | Associated topics (for articles) |
| `url` | `string` | No | URL to the HTML version of the post (add .json for post object) |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Index().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IndexEntity` instance with the same client and
options.

#### `client()`

Return the parent `HealthcareGovContentSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PostTitleEntity

```ts
const post_title = client.PostTitle()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `string` | No | The author of the content post |
| `categories` | `any[]` | No | Content types and language code |
| `content` | `string` | No | The HTML body content of the post |
| `date` | `string` | No | The publication or last modified date |
| `lang` | `string` | No | Language code: 'en' for English, 'es' for Spanish |
| `layout` | `string` | No | The layout used to display the content |
| `order` | `number` | No | Contextual position of the content |
| `tags` | `any[]` | No | An array of content tags, such as 'promote' |
| `title` | `string` | No | The title of the content post |
| `topics` | `any[]` | No | Associated topics (for articles) |
| `url` | `string` | No | The URL path to the content post |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PostTitle().list({ post_title: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PostTitleEntity` instance with the same client and
options.

#### `client()`

Return the parent `HealthcareGovContentSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new HealthcareGovContentSDK({
  feature: {
    test: { active: true },
  }
})
```

