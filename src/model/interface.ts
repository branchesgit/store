export interface IRegion {
    RegionID: number;
    RegionName: string;
    Children: IRegion[];
}

export interface IStore {
    Id: number;
    Name: string;
    Regionid: number;
    Desc: string;
}

