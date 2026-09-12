import { HealthcareGovContentEntityBase } from '../HealthcareGovContentEntityBase';
import type { HealthcareGovContentSDK } from '../HealthcareGovContentSDK';
import type { Control } from '../types';
import type { Index, IndexListMatch } from '../HealthcareGovContentTypes';
declare class IndexEntity extends HealthcareGovContentEntityBase<Index> {
    constructor(client: HealthcareGovContentSDK, entopts: any);
    make(this: IndexEntity): IndexEntity;
    list(this: any, reqmatch?: IndexListMatch, ctrl?: Control): Promise<IndexEntity[]>;
}
export { IndexEntity };
