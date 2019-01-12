import {IRegion} from "../../../../interfaces/interface";

export const ZERO = 0;
export default class Region {
    private static instance: Region = null;

    static getInstance(): Region {
        if (!Region.instance) {
            Region.instance = new Region();
        }

        return Region.instance;
    }

    //  初始化,
    initRegionIDs(region: IRegion) {
        let regioID = region.regionID;
        let children = region.children;
        const ids = [regioID];

        while (children && children.length) {
            region = children[ZERO];
            ids.push(region.regionID);
            children = region.children;
        }

        return ids;
    }

    // 获取线性地区数组；
    getRegions(regions: IRegion[], ids: number[]) {
        const rets: IRegion[][] = [];

        ids.map(v => {
            const region: IRegion = this.getRegion(regions, v);
            regions = region.children;
            if (regions && regions.length) {
                rets.push([].concat(regions));
            }
        });

        return rets;
    }

    getRegion(regions: IRegion[], regionID) {
        let i = 0;
        const len = regions && regions.length || 0;
        let region;
        for (; i < len; i++) {
            region = this.recursiveRegion(regions[i], regionID);

            if (region) {
                break;
            }
        }

        return region;
    }


    recursiveRegion(region: IRegion, targetRegionID) {
        if (region.regionID === targetRegionID) {
            return region;
        }

        const children = region.children;
        let i = 0;
        const len = children && children.length || 0;
        let targetRegion;
        while (i < len) {
            targetRegion = this.recursiveRegion(children[i], targetRegionID);
            if (targetRegion) {
                break;
            }
            i++;
        }

        return targetRegion;
    }

}
