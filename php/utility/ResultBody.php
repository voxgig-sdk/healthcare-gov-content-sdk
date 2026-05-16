<?php
declare(strict_types=1);

// HealthcareGovContent SDK utility: result_body

class HealthcareGovContentResultBody
{
    public static function call(HealthcareGovContentContext $ctx): ?HealthcareGovContentResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
