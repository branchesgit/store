export interface IMaterial {
    id?: number;
    code?: string;
    feature?: number;
    name?: string;
    parent?: string;
    featureName?: string;
    remark?: string;
}

export interface IRule {
    id?: number;
    code?: number;
    name?: string;
    codeable?: number;
}

export interface IStoreRule {
    id?: number;
    code?: number;
    codeable?: number;
    value?: number;
    storeID?: number;
    rules?: IRule[];
}
