import { HealthcareGovContentEntityBase } from '../HealthcareGovContentEntityBase';
import type { HealthcareGovContentSDK } from '../HealthcareGovContentSDK';
import type { Control } from '../types';
import type { ContentCollection, ContentCollectionLoadMatch } from '../HealthcareGovContentTypes';
declare class ContentCollectionEntity extends HealthcareGovContentEntityBase<ContentCollection> {
    constructor(client: HealthcareGovContentSDK, entopts: any);
    make(this: ContentCollectionEntity): ContentCollectionEntity;
    load(this: any, reqmatch?: ContentCollectionLoadMatch, ctrl?: Control): Promise<ContentCollectionEntity>;
}
export { ContentCollectionEntity };
