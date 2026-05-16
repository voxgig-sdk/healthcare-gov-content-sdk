-- ProjectName SDK exists test

local sdk = require("healthcare-gov-content_sdk")

describe("HealthcareGovContentSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
