# HealthcareGovContent SDK exists test

require "minitest/autorun"
require_relative "../HealthcareGovContent_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = HealthcareGovContentSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
