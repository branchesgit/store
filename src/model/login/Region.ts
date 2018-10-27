import {IRegion} from "../interface";

const FIRST = 0;
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
        let regioID = region.RegionID;
        let children = region.Children;
        const ids = [regioID];

        while (children && children.length) {
            region = children[FIRST];
            ids.push(region.RegionID);
            children = region.Children;
        }

        return ids;
    }

    getRegion(regions: IRegion[], regionID) {
        let i = 0;
        const len = regions && regions.length || 0;
        let region;
        for (; i < len; i++ ) {
            region = this.recursiveRegion(regions[i], regionID);

            if (region) {
                break;
            }
        }

        return region;
    }

    recursiveRegion(region: IRegion, targetRegionID) {
        if (region.RegionID === targetRegionID) {
            return region;
        }

        const children = region.Children;
        let i = 0;
        const len = children && children.length || 0;
        let targetRegion;
        while( i < len) {
            targetRegion = this.recursiveRegion(children[i], targetRegionID);
            if (targetRegion) {
                break;
            }
            i++;
        }

        return targetRegion;
    }

}
