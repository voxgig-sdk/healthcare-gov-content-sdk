<?php
declare(strict_types=1);

// HealthcareGovContent SDK base feature

class HealthcareGovContentBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(HealthcareGovContentContext $ctx, array $options): void {}
    public function PostConstruct(HealthcareGovContentContext $ctx): void {}
    public function PostConstructEntity(HealthcareGovContentContext $ctx): void {}
    public function SetData(HealthcareGovContentContext $ctx): void {}
    public function GetData(HealthcareGovContentContext $ctx): void {}
    public function GetMatch(HealthcareGovContentContext $ctx): void {}
    public function SetMatch(HealthcareGovContentContext $ctx): void {}
    public function PrePoint(HealthcareGovContentContext $ctx): void {}
    public function PreSpec(HealthcareGovContentContext $ctx): void {}
    public function PreRequest(HealthcareGovContentContext $ctx): void {}
    public function PreResponse(HealthcareGovContentContext $ctx): void {}
    public function PreResult(HealthcareGovContentContext $ctx): void {}
    public function PreDone(HealthcareGovContentContext $ctx): void {}
    public function PreUnexpected(HealthcareGovContentContext $ctx): void {}
}
