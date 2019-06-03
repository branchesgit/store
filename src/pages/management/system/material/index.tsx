import * as React from "react";
import {Button, Modal, Tabs} from "antd";
import MaterialsForm from "./component/materialform/index";
import {connect} from "dva";
import {MATERIALS} from "./models/material";
import ComTable from "@/pages/component/comtable/index";
import FeatureHandle from "@/pages/management/system/material/component/materialform/handle/FeatureHandle";
import MaterailHandle from "@/pages/management/system/material/component/materialform/handle/MaterailHandle";


export const FEATURES = [
    {
        name: "特性",
        value: "0",
        iHandle: FeatureHandle.getInstance(),
        feature: "添加特性",
    },
    {
        name: "类型",
        value: "1",
        iHandle: MaterailHandle.getInstance(),
        feature: "添加类型"
    }
]
// 基础资料；
@connect(({materials}) => {
    return {
        materials
    }
})

export default class Materials extends React.Component<any, any> {
    inited = true;

    constructor(...args) {
        super(args);

        this.inited = false;
        this.state = {key: FEATURES[0].value};
        this.handleChange = this.handleChange.bind(this);

    }

    featureColumns = [
        {
            title: "编码",
            dataIndex: "code",
        },
        {
            title: "名称",
            dataIndex: "name",
        },
        {
            title: "备注",
            dataIndex: "remark",
        },
        {
            title: "操作",
            dataIndex: "id",
            render: (text, record) => {
                return (
                    <div>
                        <a className="normal" onClick={this.action.bind(this, record, "modify")}>修改</a>
                        <a className="danger" onClick={this.action.bind(this, record, "remove")}>删除</a>
                    </div>
                );
            }
        }
    ];

    materialColumns = [{
        title: "资料分类",
        dataIndex: "featureName",
    }].concat(this.featureColumns)

    static getDerivedStateFromProps(props, state) {

        !Materials.inited && props.dispatch({
            type: `${MATERIALS}/fetch`
        });

        Materials.inited = true;
        return {};
    }

    showMaterial(iHandle) {
        this.props.dispatch({
            type: `${MATERIALS}/innerState`,
            visible: true,
            iHandle,
        });
    }

    closeMaterial() {
        this.props.dispatch({
            type: `${MATERIALS}/innerState`,
            visible: false
        });
    }

    handleChange(value) {
        this.setState({key: value});
    }

    // 操作form, 编辑记录；
    action(record, action) {
        const {key} = this.state;

        this.props.dispatch({
            type: `${MATERIALS}/innerState`,
            visible: true,
            record,
            action,
            iHandle: key === FEATURES[0].value ? FeatureHandle.getInstance() : MaterailHandle.getInstance(),
        })
    }

    render() {
        const {visible, iHandle, materials, loading, ms, features, record, action} = this.props.materials;
        const {key} = this.state;

        return (
            <div className="material">
                <Tabs {...{activeKey: key, onChange: this.handleChange}}>
                    {FEATURES.map((f, _) => {
                        const sources = f.value === FEATURES[0].value ? features : ms;
                        const columns = f.value === FEATURES[0].value ? this.featureColumns : this.materialColumns;
                        return (
                            <Tabs.TabPane {...{tab: f.name, key: f.value}}>
                                <Button type="primary " style={{float: "right"}}
                                        onClick={this.showMaterial.bind(this, f.iHandle)}>{f.feature}</Button>
                                <div style={{margin: "50px 0"}}>
                                    <ComTable  {...{columns, sources, loading}}/>
                                </div>
                            </Tabs.TabPane>
                        )
                    })}
                </Tabs>
                {visible ?
                    <Modal {...{
                        visible,
                        title: iHandle.getTitle(action),
                        onCancel: this.closeMaterial.bind(this),
                        width: "480px",
                        footer: null
                    }}><MaterialsForm {...{iHandle, features, record, action}}/></Modal> : ""}

            </div>
        )
    }
}
