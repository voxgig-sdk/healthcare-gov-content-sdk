import { HealthcareGovContentEntityBase } from '../HealthcareGovContentEntityBase';
import type { HealthcareGovContentSDK } from '../HealthcareGovContentSDK';
import type { Control } from '../types';
import type { PostTitle, PostTitleListMatch } from '../HealthcareGovContentTypes';
declare class PostTitleEntity extends HealthcareGovContentEntityBase<PostTitle> {
    constructor(client: HealthcareGovContentSDK, entopts: any);
    make(this: PostTitleEntity): PostTitleEntity;
    list(this: any, reqmatch?: PostTitleListMatch, ctrl?: Control): Promise<PostTitleEntity[]>;
}
export { PostTitleEntity };
