import * as React from "react";
import {Button, Icon} from "antd";
// 基础资料；
export default class Material extends React.Component<any, any> {

    render() {
        return (
            <div className="material">
                <div className="features">
                    <Button type="primary"><Icon type="add"/>添加特性</Button>
                    <Button type="primary"><Icon type="add"/>添加</Button>
                </div>

            </div>
        )
    }
}
