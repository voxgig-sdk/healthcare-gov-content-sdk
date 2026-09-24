
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HealthcareGovContentSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = HealthcareGovContentSDK.test()
    equal(testsdk instanceof HealthcareGovContentSDK, true,
      'HealthcareGovContentSDK.test() must return a client synchronously')
  })

})
