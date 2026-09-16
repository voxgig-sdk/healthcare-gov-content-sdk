# HealthcareGovContent SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module HealthcareGovContentFeatures
  def self.make_feature(name)
    case name
    when "base"
      HealthcareGovContentBaseFeature.new
    when "ratelimit"
      HealthcareGovContentRatelimitFeature.new
    when "retry"
      HealthcareGovContentRetryFeature.new
    when "test"
      HealthcareGovContentTestFeature.new
    when "timeout"
      HealthcareGovContentTimeoutFeature.new
    else
      HealthcareGovContentBaseFeature.new
    end
  end
end
