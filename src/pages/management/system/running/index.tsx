import * as React from "react";
import {Tabs, Input, Checkbox, Button, Select} from "antd";
import {connect} from "dva";
import {RULES} from "@/pages/management/system/running/models/rules";
import {IRule, IStoreRule} from "@/bean/interface/ISystem";
import StoreRule from "@/bean/util/StoreRule";

const Option = Select.Option;
const TabPane = Tabs.TabPane;

@connect(({rules}) => {
    return {...rules};
})

export default class Index extends React.Component<any, any> {

    constructor(props) {
        super(props);

        window.g_app._store.dispatch({type: `${RULES}/fetch`});
    }

    handleChange(key, code, e) {
        this.props.dispatch({
            type: `${RULES}/changeStoreRule`,
            key,
            code,
            value: e,
        });
    }

    saveStoreRules() {
        this.props.dispatch({
            type: `${RULES}/saveStoreRules`,
            storeRules: this.props.storeRules,
        })
    }

    handlePNChange(values) {
        if (!values || !values.length) {
            return;
        }

        this.handleChange("codeable", StoreRule.PRODUCTION_NAME_CODE, values.join(","))
    }


    render() {
        const storeRules: IStoreRule = this.props.storeRules || [];
        const money: IStoreRule = storeRules.find(sr => sr.code === StoreRule.MONEY_CODE) || {};
        const production: IStoreRule = storeRules.find(sr => sr.code === StoreRule.PRODUCTION_CODE) || {};
        const productionName: IStoreRule = storeRules.find(sr => sr.code === StoreRule.PRODUCTION_NAME_CODE) || {};

        return (
            <div className="running">
                <h3>设置</h3>
                <ul>
                    <li>
                        <em>1</em>
                        金额保留
                        <span>
                            <Input value={money.value}
                                   onChange={this.handleChange.bind(this, 'value', StoreRule.MONEY_CODE)}/>
                        </span>
                        位小数， 多余小数
                        <Select value={money.codeable + ""}
                                onChange={this.handleChange.bind(this, 'codeable', StoreRule.MONEY_CODE)}>
                            {
                                (money.rules || []).map((rule: IRule, _) =>
                                    <Option key={_} value={rule.code + ""}>{rule.name}</Option>)
                            }
                        </Select>
                    </li>
                    <li>
                        <em>2</em>
                        成品编码规则
                        <Select value={production.codeable + ""}
                                onChange={this.handleChange.bind(this, 'codeable', StoreRule.PRODUCTION_CODE)}>
                            {
                                (production.rules || []).map((rule: IRule, _) =>
                                    <Option key={_} value={rule.code + ""}>{rule.name}</Option>)
                            }
                        </Select>
                        加上
                        <Input value={production.value}
                               onChange={this.handleChange.bind(this, "value", StoreRule.PRODUCTION_CODE)}/>
                        位流水码
                    </li>
                    <li>
                        <em>3</em>品名生成规则
                        <Checkbox.Group value={(productionName.codeable || "").split(",")}
                                        onChange={this.handlePNChange.bind(this, )}>
                            {
                                (productionName.rules || []).map((rule: IRule, _) => {
                                    return <Checkbox value={rule.code + ""}>{rule.name}</Checkbox>
                                })
                            }
                        </Checkbox.Group>
                    </li>
                </ul>

                <Button type="primary" onClick={this.saveStoreRules.bind(this)}>保存</Button>
            </div>
        );
    }
}
