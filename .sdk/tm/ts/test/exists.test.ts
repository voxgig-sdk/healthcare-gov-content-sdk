
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HealthcareGovContentSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await HealthcareGovContentSDK.test()
    equal(null !== testsdk, true)
  })

})
