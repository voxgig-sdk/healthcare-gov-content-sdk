<?php
declare(strict_types=1);

// HealthcareGovContent SDK configuration

class HealthcareGovContentConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "HealthcareGovContent",
                "slug" => "healthcare-gov-content",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://www.healthcare.gov",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "content_collection" => [],
                    "index" => [],
                    "post_title" => [],
                ],
            ],
            "entity" => [
        'content_collection' => [
          'fields' => [
            [
              'name' => 'glossary',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'content_collection',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'glossary',
                        'kind' => 'param',
                        'name' => 'content_type',
                        'orig' => 'content_type',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/{content-type}.json',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => '{content-type}.json',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'callback',
                      'content_type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    '{content-type}.json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'index' => [
          'fields' => [
            [
              'name' => 'bite',
              'short' => 'A short summary of the post',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'categories',
              'short' => 'Content types and language code',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'esbite',
              'short' => 'The post summary in Spanish',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'estitle',
              'short' => 'Spanish translation of the post\'s title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'state',
              'short' => 'Associated states for the post',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'tags',
              'short' => 'An array of content tags, such as \'promote\'',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'title',
              'short' => 'The post\'s title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'topics',
              'short' => 'Associated topics (for articles)',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'url',
              'short' => 'URL to the HTML version of the post (add .json for post object)',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'index',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/index.json',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'index.json',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'callback',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'index.json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'post_title' => [
          'fields' => [
            [
              'name' => 'author',
              'short' => 'The author of the content post',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'categories',
              'short' => 'Content types and language code',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'content',
              'short' => 'The HTML body content of the post',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'date',
              'short' => 'The publication or last modified date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lang',
              'short' => 'Language code: \'en\' for English, \'es\' for Spanish',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'layout',
              'short' => 'The layout used to display the content',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'order',
              'short' => 'Contextual position of the content',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'tags',
              'short' => 'An array of content tags, such as \'promote\'',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'title',
              'short' => 'The title of the content post',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'topics',
              'short' => 'Associated topics (for articles)',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'url',
              'short' => 'The URL path to the content post',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'post_title',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'accessibility',
                        'kind' => 'param',
                        'name' => 'post_title',
                        'orig' => 'post_title',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{post-title}.json',
                  'segments' => [
                    [
                      'lit' => '{post-title}.json',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'callback',
                      'post_title',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    '{post-title}.json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return HealthcareGovContentFeatures::make_feature($name);
    }
}
