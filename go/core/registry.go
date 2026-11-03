package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewContentCollectionEntityFunc func(client *HealthcareGovContentSDK, entopts map[string]any) HealthcareGovContentEntityBase

var NewIndexEntityFunc func(client *HealthcareGovContentSDK, entopts map[string]any) HealthcareGovContentEntityBase

var NewPostTitleEntityFunc func(client *HealthcareGovContentSDK, entopts map[string]any) HealthcareGovContentEntityBase

