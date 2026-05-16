<?php
declare(strict_types=1);

// HealthcareGovContent SDK utility: feature_hook

class HealthcareGovContentFeatureHook
{
    public static function call(HealthcareGovContentContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
