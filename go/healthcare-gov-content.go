package voxgighealthcaregovcontentsdk

import (
	"github.com/voxgig-sdk/healthcare-gov-content-sdk/core"
	"github.com/voxgig-sdk/healthcare-gov-content-sdk/entity"
	"github.com/voxgig-sdk/healthcare-gov-content-sdk/feature"
	_ "github.com/voxgig-sdk/healthcare-gov-content-sdk/utility"
)

// Type aliases preserve external API.
type HealthcareGovContentSDK = core.HealthcareGovContentSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type HealthcareGovContentEntity = core.HealthcareGovContentEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type HealthcareGovContentError = core.HealthcareGovContentError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewContentCollectionEntityFunc = func(client *core.HealthcareGovContentSDK, entopts map[string]any) core.HealthcareGovContentEntity {
		return entity.NewContentCollectionEntity(client, entopts)
	}
	core.NewIndexEntityFunc = func(client *core.HealthcareGovContentSDK, entopts map[string]any) core.HealthcareGovContentEntity {
		return entity.NewIndexEntity(client, entopts)
	}
	core.NewPostTitleEntityFunc = func(client *core.HealthcareGovContentSDK, entopts map[string]any) core.HealthcareGovContentEntity {
		return entity.NewPostTitleEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewHealthcareGovContentSDK = core.NewHealthcareGovContentSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
