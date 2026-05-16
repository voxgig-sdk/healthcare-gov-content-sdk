# HealthcareGovContent SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

HealthcareGovContentUtility.registrar = ->(u) {
  u.clean = HealthcareGovContentUtilities::Clean
  u.done = HealthcareGovContentUtilities::Done
  u.make_error = HealthcareGovContentUtilities::MakeError
  u.feature_add = HealthcareGovContentUtilities::FeatureAdd
  u.feature_hook = HealthcareGovContentUtilities::FeatureHook
  u.feature_init = HealthcareGovContentUtilities::FeatureInit
  u.fetcher = HealthcareGovContentUtilities::Fetcher
  u.make_fetch_def = HealthcareGovContentUtilities::MakeFetchDef
  u.make_context = HealthcareGovContentUtilities::MakeContext
  u.make_options = HealthcareGovContentUtilities::MakeOptions
  u.make_request = HealthcareGovContentUtilities::MakeRequest
  u.make_response = HealthcareGovContentUtilities::MakeResponse
  u.make_result = HealthcareGovContentUtilities::MakeResult
  u.make_point = HealthcareGovContentUtilities::MakePoint
  u.make_spec = HealthcareGovContentUtilities::MakeSpec
  u.make_url = HealthcareGovContentUtilities::MakeUrl
  u.param = HealthcareGovContentUtilities::Param
  u.prepare_auth = HealthcareGovContentUtilities::PrepareAuth
  u.prepare_body = HealthcareGovContentUtilities::PrepareBody
  u.prepare_headers = HealthcareGovContentUtilities::PrepareHeaders
  u.prepare_method = HealthcareGovContentUtilities::PrepareMethod
  u.prepare_params = HealthcareGovContentUtilities::PrepareParams
  u.prepare_path = HealthcareGovContentUtilities::PreparePath
  u.prepare_query = HealthcareGovContentUtilities::PrepareQuery
  u.result_basic = HealthcareGovContentUtilities::ResultBasic
  u.result_body = HealthcareGovContentUtilities::ResultBody
  u.result_headers = HealthcareGovContentUtilities::ResultHeaders
  u.transform_request = HealthcareGovContentUtilities::TransformRequest
  u.transform_response = HealthcareGovContentUtilities::TransformResponse
}
