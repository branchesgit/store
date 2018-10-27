import {IRegion} from "../../../model/interface";
import {Select} from "antd";
import * as React from "react";
import Region from "../../../model/login/Region";

const Option = Select.Option;

export default class LoginHandle {
    private static instance: LoginHandle = null;

    static getInstance(): LoginHandle {
        if (!LoginHandle.instance) {
            LoginHandle.instance = new LoginHandle();
        }

        return LoginHandle.instance;
    }

    renderRegions(view): JSX.Element {
        const {selectedIds} = view.state;

        if (!selectedIds || !selectedIds.length) {
            return;
        }
        let {regions} = view.props;
        let idx = 0;
        let id;
        let regionIdx;
        const selects = [];
        let select;

        if (regions && regions.length) {
            while (idx < selectedIds.length) {
                id = selectedIds[idx++];
                regionIdx = regions.findIndex((region: IRegion) => {
                    return region.RegionID === id;
                });

                select = (
                    <Select
                        style={{width: "120px"}}
                        value={id} key={idx}
                        onChange={this.changeRegion.bind(this, view, idx - 1)}
                    >
                        {
                            regions.map((it: IRegion, _) => {
                                const {RegionID, RegionName} = it;
                                return <Option value={RegionID} key={_}>{RegionName}</Option>
                            })
                        }
                    </Select>
                );
                selects.push(select);
                if (regionIdx !== -1) {
                    regions = regions[regionIdx].Children;
                }
            }
        }

        return (
            <div className="region">
                <span>地区:</span>
                {selects}
            </div>
        )
    }

    //
    changeRegion(view, idx, regionID) {
        const {regions} = view.props;
        let {selectedIds} = view.state;
        const tarRegion = Region.getInstance().getRegion(regions, regionID);
        selectedIds.splice(idx, (selectedIds.length - idx));
        selectedIds = selectedIds.concat(Region.getInstance().initRegionIDs(tarRegion));
        view.setState({selectedIds});

        const len = selectedIds.length;
        const regionID = selectedIds[len - 1];
        view.props.dispatch({
            type: "store/fetch",
            playload: {regionID}
        })
    }

    renderStores(view) {
        const {stores} = view.props;
        const {storeId} = view.state;

        return (
            <div className="stores">
                <span>店名:</span>
                {
                    stores && stores.length ?
                        <Select value={storeId} style={{width: "180px"}}>
                            {
                                stores.map((store: IStore, _) => {
                                    return <Option value={store.Id} key={_}>{store.Name}</Option>
                                })
                            }
                        </Select>
                        : ""
                }
            </div>
        )
    }
}
