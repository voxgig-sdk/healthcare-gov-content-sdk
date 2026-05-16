<?php
declare(strict_types=1);

// HealthcareGovContent SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class HealthcareGovContentFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new HealthcareGovContentBaseFeature();
            case "test":
                return new HealthcareGovContentTestFeature();
            default:
                return new HealthcareGovContentBaseFeature();
        }
    }
}
