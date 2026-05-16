-- HealthcareGovContent SDK error

local HealthcareGovContentError = {}
HealthcareGovContentError.__index = HealthcareGovContentError


function HealthcareGovContentError.new(code, msg, ctx)
  local self = setmetatable({}, HealthcareGovContentError)
  self.is_sdk_error = true
  self.sdk = "HealthcareGovContent"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function HealthcareGovContentError:error()
  return self.msg
end


function HealthcareGovContentError:__tostring()
  return self.msg
end


return HealthcareGovContentError
