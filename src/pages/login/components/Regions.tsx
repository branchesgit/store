import * as React from "react";
import {IRegion} from "../../../interfaces/interface";
import Region, {ZERO} from "./models/Region";
import {Select} from "antd";
import {STORE_NAMESPACE} from "../models/store";

const Option = Select.Option;
export default class Regions extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {};
    }

    inited: boolean = false;

    componentWillMount() {
        this.initState(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.initState(newProps);
    }

    initState(props) {
        const regions: IRegion[] = props.regions;

        if (this.inited) {
            return;
        }

        if (regions && regions.length) {
            this.inited = true;
            const ids = Region.getInstance().initRegionIDs(regions[ZERO]);
            this.setState({ids, regions});
            window.g_app._store.dispatch({
                type: `${STORE_NAMESPACE}/fetch`,
                payload: {
                    regionID: ids[ids.length - 1]
                }
            });
        }

    }

    changeRegion(regions: IRegion[], idx, regionID) {
        const region: IRegion = regions.find(r => r.regionID + "" === regionID);
        const {ids} = this.state;
        ids.splice(idx);
        ids = ids.concat(Region.getInstance().initRegionIDs(region));
        this.setState({ids});
        window.g_app._store.dispatch({
            type: `${STORE_NAMESPACE}/fetch`,
            payload: {
                regionID: ids[ids.length - 1]
            }
        })
    }

    renderRegions() {
        const {ids, regions} = this.state;
        const rets: IRegion[][] = Region.getInstance().getRegions(regions, ids);
        rets.unshift(regions);

        return (
            <ul>
                {
                    rets && rets.length && rets.map((ary: IRegion[], _) => {
                        return (
                            <li key={_}>
                                <Select value={ids[_] + ""} onChange={this.changeRegion.bind(this, ary, _)}>
                                    {
                                        ary.map((r, j) => {
                                            return <Option value={r.regionID + ""}>{r.regionName}</Option>;
                                        })
                                    }
                                </Select>
                            </li>
                        )
                    })
                }
            </ul>

        )
    }

    render() {
        const {regions, ids} = this.state;

        if (!regions) {
            return <div/>;
        }

        const region: IRegion = Region.getInstance().getRegion(regions, ids[0]);

        return (
            <div className="regions">
                {
                    this.renderRegions()
                }
            </div>
        )
    }
}
