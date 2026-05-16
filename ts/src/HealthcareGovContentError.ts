
import { Context } from './Context'


class HealthcareGovContentError extends Error {

  isHealthcareGovContentError = true

  sdk = 'HealthcareGovContent'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  HealthcareGovContentError
}

