import { Context } from './Context';
declare class HealthcareGovContentError extends Error {
    isHealthcareGovContentError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { HealthcareGovContentError };
