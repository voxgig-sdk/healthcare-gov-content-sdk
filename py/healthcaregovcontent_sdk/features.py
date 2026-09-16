# HealthcareGovContent SDK feature factory

from healthcaregovcontent_sdk.feature.base_feature import HealthcareGovContentBaseFeature
from healthcaregovcontent_sdk.feature.ratelimit_feature import HealthcareGovContentRatelimitFeature
from healthcaregovcontent_sdk.feature.retry_feature import HealthcareGovContentRetryFeature
from healthcaregovcontent_sdk.feature.test_feature import HealthcareGovContentTestFeature
from healthcaregovcontent_sdk.feature.timeout_feature import HealthcareGovContentTimeoutFeature


_FEATURES = {
    "base": lambda: HealthcareGovContentBaseFeature(),
    "ratelimit": lambda: HealthcareGovContentRatelimitFeature(),
    "retry": lambda: HealthcareGovContentRetryFeature(),
    "test": lambda: HealthcareGovContentTestFeature(),
    "timeout": lambda: HealthcareGovContentTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
