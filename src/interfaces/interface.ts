export interface IRegion {
    regionID: number;
    regionName: string;
    children: IRegion[];
}

export interface IStore {
    storeID: number;
    storeName: string;
    regionID: number;
    desc: string;
}

