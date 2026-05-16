# HealthcareGovContent SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module HealthcareGovContentFeatures
  def self.make_feature(name)
    case name
    when "base"
      HealthcareGovContentBaseFeature.new
    when "test"
      HealthcareGovContentTestFeature.new
    else
      HealthcareGovContentBaseFeature.new
    end
  end
end
