import * as React from "react";
import {Form, Input, Button, Select} from "antd";
import {IHandle} from "./IHandle";
import {MATERIALS} from "@/pages/management/system/material/models/material";
import Store from "@/utils/store";
import {IMaterial} from "@/bean/interface/ISystem";

class Index extends React.Component<any, any> {
    constructor(...args) {
        super(...args);

        this.saveMaterial = this.saveMaterial.bind(this);
        this.closeMaterial = this.closeMaterial.bind(this);
        this.validatorCode = this.validatorCode.bind(this);
        this.updateMaterial = this.updateMaterial.bind(this);
        this.removeMaterial = this.removeMaterial.bind(this);
    }

    saveMaterial(e) {
        const iHandle: IHandle = this.props.iHandle;
        iHandle.saveMaterial(this, e);
    }

    closeMaterial() {
        Store.getInstance().dispatch({
            type: `${MATERIALS}/innerState`,
            visible: false,
        });
    }

    validatorCode(rule, value, callback) {
        var rnumerial = /^\s*[0-9]+\s*$/g;
        rnumerial.lastIndex = 0;

        if (rnumerial.test(value)) {
            callback();
        } else {
            callback("编码必须是数字～");
        }
    }

    updateMaterial(e) {
        const iHandle: IHandle = this.props.iHandle;
        iHandle.updateMaterial(this, e);
    }

    removeMaterial(e) {
        const iHandle: IHandle = this.props.iHandle;
        iHandle.removeMaterial(this, e);
    }

    render() {

        const {getFieldDecorator,} = this.props.form;
        const iHandle: IHandle = this.props.iHandle;
        const features: IMaterial[] = this.props.features || [];
        const record: IMaterial = this.props.record;
        const action = this.props.action;
        console.log(action);

        return (
            <Form
                onSubmit={!action ? this.saveMaterial : action === "modify" ? this.updateMaterial : this.removeMaterial}
                className="material-form">
                {
                    !iHandle.isHideFeatureItem() && <Form.Item className="rel" label={<span>特性</span>}>
                        {
                            getFieldDecorator('parent', {
                                initialValue: record ? record.parent : features.length ? features[0].code : "-1",
                            })(<Select style={{width: "280px"}} disabled={action === "remove"}>
                                {features.map((f, _) => {
                                    return <Select.Option value={f.code}>{f.name}</Select.Option>
                                })}
                            </Select>)
                        }
                    </Form.Item>
                }

                <Form.Item label={<span>编码</span>}>
                    {getFieldDecorator('code', {
                        initialValue: record ? record.code : "",
                        rules: [
                            {required: true},
                            {validator: this.validatorCode}
                        ]
                    })(<Input disabled={action === "remove"}/>)}
                </Form.Item>

                <Form.Item label={<span>名称</span>}>
                    {getFieldDecorator('name', {
                        initialValue: record ? record.name : "",
                        rules: [{required: true}]
                    })(<Input disabled={action === "remove"}/>)}
                </Form.Item>

                <Form.Item label={<span style={{paddingLeft: "10px"}}>备注</span>}>
                    {getFieldDecorator('remark', {initialValue: record ? record.remark : "",})(<Input.TextArea row={12}
                                                                                                               disabled={action === "remove"}/>)}
                </Form.Item>
                <Form.Item wrapperCol={{span: 15, offset: 6}}>
                    <Button onClick={this.closeMaterial}>
                        取消
                    </Button>
                    <div style={{display: "inline-block", width: "60px"}}/>
                    <Button type="primary" htmlType="submit">
                        {action === "remove" ? "确认" : "提交"}
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(Index);
