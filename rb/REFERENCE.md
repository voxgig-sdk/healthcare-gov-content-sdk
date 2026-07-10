# HealthcareGovContent Ruby SDK Reference

Complete API reference for the HealthcareGovContent Ruby SDK.


## HealthcareGovContentSDK

### Constructor

```ruby
require_relative 'HealthcareGovContent_sdk'

client = HealthcareGovContentSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HealthcareGovContentSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = HealthcareGovContentSDK.test
```


### Instance Methods

#### `ContentCollection(data = nil)`

Create a new `ContentCollection` entity instance. Pass `nil` for no initial data.

#### `Index(data = nil)`

Create a new `Index` entity instance. Pass `nil` for no initial data.

#### `PostTitle(data = nil)`

Create a new `PostTitle` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## ContentCollectionEntity

```ruby
content_collection = client.ContentCollection
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `glossary` | `Array` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ContentCollection.load({ "content_type" => "content_type" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ContentCollectionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IndexEntity

```ruby
index = client.Index
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bite` | `String` | No |  |
| `category` | `Array` | No |  |
| `es_bite` | `String` | No |  |
| `es_title` | `String` | No |  |
| `state` | `Array` | No |  |
| `tag` | `Array` | No |  |
| `title` | `String` | No |  |
| `topic` | `Array` | No |  |
| `url` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Index.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IndexEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PostTitleEntity

```ruby
post_title = client.PostTitle
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `String` | No |  |
| `category` | `Array` | No |  |
| `content` | `String` | No |  |
| `date` | `String` | No |  |
| `lang` | `String` | No |  |
| `layout` | `String` | No |  |
| `order` | `Integer` | No |  |
| `tag` | `Array` | No |  |
| `title` | `String` | No |  |
| `topic` | `Array` | No |  |
| `url` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.PostTitle.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PostTitleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = HealthcareGovContentSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

