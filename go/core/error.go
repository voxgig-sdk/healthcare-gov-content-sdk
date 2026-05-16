package core

type HealthcareGovContentError struct {
	IsHealthcareGovContentError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewHealthcareGovContentError(code string, msg string, ctx *Context) *HealthcareGovContentError {
	return &HealthcareGovContentError{
		IsHealthcareGovContentError: true,
		Sdk:              "HealthcareGovContent",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *HealthcareGovContentError) Error() string {
	return e.Msg
}
