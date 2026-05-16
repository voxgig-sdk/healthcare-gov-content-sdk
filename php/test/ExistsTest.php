<?php
declare(strict_types=1);

// HealthcareGovContent SDK exists test

require_once __DIR__ . '/../healthcaregovcontent_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = HealthcareGovContentSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
