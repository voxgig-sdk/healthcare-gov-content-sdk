<?php
declare(strict_types=1);

// HealthcareGovContent SDK utility: prepare_body

class HealthcareGovContentPrepareBody
{
    public static function call(HealthcareGovContentContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
