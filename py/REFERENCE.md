# HealthcareGovContent Python SDK Reference

Complete API reference for the HealthcareGovContent Python SDK.


## HealthcareGovContentSDK

### Constructor

```python
from healthcare-gov-content_sdk import HealthcareGovContentSDK

client = HealthcareGovContentSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HealthcareGovContentSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = HealthcareGovContentSDK.test()
```


### Instance Methods

#### `ContentCollection(data=None)`

Create a new `ContentCollectionEntity` instance. Pass `None` for no initial data.

#### `Index(data=None)`

Create a new `IndexEntity` instance. Pass `None` for no initial data.

#### `PostTitle(data=None)`

Create a new `PostTitleEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ContentCollectionEntity

```python
content_collection = client.ContentCollection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `glossary` | ``$ARRAY`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ContentCollection().load({"id": "content_collection_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContentCollectionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IndexEntity

```python
index = client.Index()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bite` | ``$STRING`` | No |  |
| `category` | ``$ARRAY`` | No |  |
| `es_bite` | ``$STRING`` | No |  |
| `es_title` | ``$STRING`` | No |  |
| `state` | ``$ARRAY`` | No |  |
| `tag` | ``$ARRAY`` | No |  |
| `title` | ``$STRING`` | No |  |
| `topic` | ``$ARRAY`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Index().list({})
for index in results:
    print(index)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IndexEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PostTitleEntity

```python
post_title = client.PostTitle()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | ``$STRING`` | No |  |
| `category` | ``$ARRAY`` | No |  |
| `content` | ``$STRING`` | No |  |
| `date` | ``$STRING`` | No |  |
| `lang` | ``$STRING`` | No |  |
| `layout` | ``$STRING`` | No |  |
| `order` | ``$INTEGER`` | No |  |
| `tag` | ``$ARRAY`` | No |  |
| `title` | ``$STRING`` | No |  |
| `topic` | ``$ARRAY`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.PostTitle().list({})
for post_title in results:
    print(post_title)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PostTitleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = HealthcareGovContentSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

