<?php
declare(strict_types=1);

// HealthcareGovContent SDK utility: feature_add

class HealthcareGovContentFeatureAdd
{
    public static function call(HealthcareGovContentContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
