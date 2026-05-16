package = "voxgig-sdk-healthcare-gov-content"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/healthcare-gov-content-sdk.git"
}
description = {
  summary = "HealthcareGovContent SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["healthcare-gov-content_sdk"] = "healthcare-gov-content_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
