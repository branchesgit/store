import * as React from "react";
import {Tabs, Input, Checkbox, Button, Select} from "antd";
import {connect} from "dva";
import {ICondition, IDict} from "../../../../interfaces/management/iManagement";
import RuningService from "../../../../services/running";

const Option = Select.Option;
const TabPane = Tabs.TabPane;

export const MONEY_CODE = "money";
export const PRODUCT_CODE = "product_code";


@connect(({run}) => {
    return {...run};
})

export default class Index extends React.Component<any, any> {

    constructor(props) {
        super(props);

        window.g_app._store.dispatch({type: "run/fetch"});
    }

    handleChange(code, dictID) {
        this.props.dispatch({
            type: "run/changeDict",
            payload: {
                code,
                dictID
            }
        });
    }

    changeBit(key, value) {
        value = value.target.value;
        this.props.dispatch({
            type: "run/changeBit",
            payload: {
                key,
                value,
            }
        })
    }

    saveSettings() {
        const {moneies, products, mb, pb} = this.props;
        const settings: ICondition[] = this.props.settings;
        let idx = moneies.findIndex((m: IDict) => m.selected);
        let index = settings.findIndex(s => s.Code === MONEY_CODE);
        settings[idx].DictPK = moneies[idx].Id;
        settings[index].AdditionBit = parseInt(mb + "", 10);

        idx = products.findIndex((m: IDict) => m.selected);
        index = settings.findIndex(s => s.Code === PRODUCT_CODE);
        settings[index].DictPK = products[idx].Id;
        settings[index].AdditionBit = parseInt(pb + "", 10);

        RuningService.getInstance().updateStoreSettings(settings);
    }

    render() {
        const {moneies, products, settings, mb, pb} = this.props;
        let idx = (moneies || []).findIndex(m => m.selected);
        const money = idx !== -1 ? moneies[idx].Id + "" : "";
        idx = (products || []).findIndex(p => p.selected);
        const pro = idx !== -1 ? products[idx].Id + "" : "";


        return (
            <div className="running">
                <h3>设置</h3>
                <div>
                    金额保留
                    <span><Input value={mb} onChange={this.changeBit.bind(this, "mb")}/></span>
                    位小数， 多余小数
                    <Select value={money} onChange={this.handleChange.bind(this, MONEY_CODE)}>
                        {
                            (moneies || []).map((dict: IDict, _) =>
                                <Option key={_} value={dict.Id + ""}>{dict.Desc}</Option>)
                        }
                    </Select>
                </div>
                <h4>成品编码品名生成规则</h4>
                <ul>
                    <li>
                        成品编码规则
                        <Select value={pro} onChange={this.handleChange.bind(this, PRODUCT_CODE)}>
                            {
                                (products || []).map((dict: IDict, _) =>
                                    <Option key={_} value={dict.Id + ""}>{dict.Desc}</Option>)
                            }
                        </Select>
                        加上<Input value={pb} onChange={this.changeBit.bind(this, "pb")}/>位流水码，流水码是否前置<Checkbox/></li>
                    <li>品名生成规则</li>
                </ul>

                <Button type="primary" onClick={this.saveSettings.bind(this)}>保存</Button>
            </div>
        );
    }
}
