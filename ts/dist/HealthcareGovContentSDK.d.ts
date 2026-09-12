import { ContentCollectionEntity } from './entity/ContentCollectionEntity';
import { IndexEntity } from './entity/IndexEntity';
import { PostTitleEntity } from './entity/PostTitleEntity';
export type * from './HealthcareGovContentTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { HealthcareGovContentEntityBase } from './HealthcareGovContentEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class HealthcareGovContentSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    ContentCollection(entopts?: Record<string, any>): ContentCollectionEntity;
    Index(entopts?: Record<string, any>): IndexEntity;
    PostTitle(entopts?: Record<string, any>): PostTitleEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): HealthcareGovContentSDK;
    tester(testopts?: any, sdkopts?: any): HealthcareGovContentSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof HealthcareGovContentSDK;
export { stdutil, config, BaseFeature, HealthcareGovContentEntityBase, HealthcareGovContentSDK, SDK, };
