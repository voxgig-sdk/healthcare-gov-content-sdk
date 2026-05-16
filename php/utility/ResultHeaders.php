<?php
declare(strict_types=1);

// HealthcareGovContent SDK utility: result_headers

class HealthcareGovContentResultHeaders
{
    public static function call(HealthcareGovContentContext $ctx): ?HealthcareGovContentResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
