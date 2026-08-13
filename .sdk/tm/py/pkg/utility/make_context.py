# HealthcareGovContent SDK utility: make_context

from projectname_sdk.core.context import HealthcareGovContentContext


def make_context_util(ctxmap, basectx):
    return HealthcareGovContentContext(ctxmap, basectx)
