# HealthcareGovContent SDK utility: prepare_body
require_relative 'media'
module HealthcareGovContentUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return HealthcareGovContentUtilities.raw_body(ctx.reqdata) if HealthcareGovContentUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
