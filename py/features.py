# HealthcareGovContent SDK feature factory

from feature.base_feature import HealthcareGovContentBaseFeature
from feature.test_feature import HealthcareGovContentTestFeature


def _make_feature(name):
    features = {
        "base": lambda: HealthcareGovContentBaseFeature(),
        "test": lambda: HealthcareGovContentTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
