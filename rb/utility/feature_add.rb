# HealthcareGovContent SDK utility: feature_add
module HealthcareGovContentUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
