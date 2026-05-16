<?php
declare(strict_types=1);

// HealthcareGovContent SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class HealthcareGovContentMakeContext
{
    public static function call(array $ctxmap, ?HealthcareGovContentContext $basectx): HealthcareGovContentContext
    {
        return new HealthcareGovContentContext($ctxmap, $basectx);
    }
}
