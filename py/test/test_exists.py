# ProjectName SDK exists test

import pytest
from healthcaregovcontent_sdk import HealthcareGovContentSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = HealthcareGovContentSDK.test(None, None)
        assert testsdk is not None
