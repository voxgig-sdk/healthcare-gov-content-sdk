# HealthcareGovContent SDK utility: make_context
require_relative '../core/context'
module HealthcareGovContentUtilities
  MakeContext = ->(ctxmap, basectx) {
    HealthcareGovContentContext.new(ctxmap, basectx)
  }
end
