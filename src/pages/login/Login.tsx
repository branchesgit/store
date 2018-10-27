import * as React from "react";
import {connect} from 'dva';
import LoginHandle from "./handles/LoginHandle";
import Region from "../../model/login/Region";
import {IStore} from "../../model/interface";
import {Form, Input, Button, Icon} from "antd";
import LoginService from "./services/login";
import md5 from "js-md5";

const FormItem = Form.Item;

@connect(({login, store, loading}) => {
    return {
        loading: loading,
        ...login,
        ...store,
    }
})

class Login extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        this.props.dispatch({
            type: "login/fetch"
        });
    }

    inited: boolean;

    componentWillReceiveProps(newProps) {
        const regions = newProps.regions;

        if (regions && regions.length && !this.inited) {
            this.inited = true;
            const selectedIds = Region.getInstance().initRegionIDs(regions[0]);
            this.setState({selectedIds});
            // 向后台发送请求, 获取店铺信息；
            const len = selectedIds.length;
            const regionID = selectedIds[len - 1];
            this.props.dispatch({
                type: "store/fetch",
                playload: {regionID}
            });
        }

        const stores: IStore[] = newProps.stores;
        if (stores && stores.length) {
            const storeId = stores[0].Id;
            this.setState({storeId});
        } else {
            this.setState({storeId: ""});
        }
    }

    handleSubmit = e => {

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            const state = this.state;
            const loginService = LoginService.getInstance();
            values = {
                ...values,
                password: md5(values.password),
                storeID: state.storeId,
            };
            debugger;

            loginService.login(values);
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                {LoginHandle.getInstance().renderRegions(this)}
                {LoginHandle.getInstance().renderStores(this)}
                <Form onSubmit={this.handleSubmit} className="login-form" action="login/post" method="post">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="Username"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="Password"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Login);

