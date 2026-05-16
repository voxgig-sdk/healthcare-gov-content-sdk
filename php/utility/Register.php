<?php
declare(strict_types=1);

// HealthcareGovContent SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

HealthcareGovContentUtility::setRegistrar(function (HealthcareGovContentUtility $u): void {
    $u->clean = [HealthcareGovContentClean::class, 'call'];
    $u->done = [HealthcareGovContentDone::class, 'call'];
    $u->make_error = [HealthcareGovContentMakeError::class, 'call'];
    $u->feature_add = [HealthcareGovContentFeatureAdd::class, 'call'];
    $u->feature_hook = [HealthcareGovContentFeatureHook::class, 'call'];
    $u->feature_init = [HealthcareGovContentFeatureInit::class, 'call'];
    $u->fetcher = [HealthcareGovContentFetcher::class, 'call'];
    $u->make_fetch_def = [HealthcareGovContentMakeFetchDef::class, 'call'];
    $u->make_context = [HealthcareGovContentMakeContext::class, 'call'];
    $u->make_options = [HealthcareGovContentMakeOptions::class, 'call'];
    $u->make_request = [HealthcareGovContentMakeRequest::class, 'call'];
    $u->make_response = [HealthcareGovContentMakeResponse::class, 'call'];
    $u->make_result = [HealthcareGovContentMakeResult::class, 'call'];
    $u->make_point = [HealthcareGovContentMakePoint::class, 'call'];
    $u->make_spec = [HealthcareGovContentMakeSpec::class, 'call'];
    $u->make_url = [HealthcareGovContentMakeUrl::class, 'call'];
    $u->param = [HealthcareGovContentParam::class, 'call'];
    $u->prepare_auth = [HealthcareGovContentPrepareAuth::class, 'call'];
    $u->prepare_body = [HealthcareGovContentPrepareBody::class, 'call'];
    $u->prepare_headers = [HealthcareGovContentPrepareHeaders::class, 'call'];
    $u->prepare_method = [HealthcareGovContentPrepareMethod::class, 'call'];
    $u->prepare_params = [HealthcareGovContentPrepareParams::class, 'call'];
    $u->prepare_path = [HealthcareGovContentPreparePath::class, 'call'];
    $u->prepare_query = [HealthcareGovContentPrepareQuery::class, 'call'];
    $u->result_basic = [HealthcareGovContentResultBasic::class, 'call'];
    $u->result_body = [HealthcareGovContentResultBody::class, 'call'];
    $u->result_headers = [HealthcareGovContentResultHeaders::class, 'call'];
    $u->transform_request = [HealthcareGovContentTransformRequest::class, 'call'];
    $u->transform_response = [HealthcareGovContentTransformResponse::class, 'call'];
});
