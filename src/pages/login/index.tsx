import * as React from "react";
import {connect} from 'dva';
import {IStore} from "../../interfaces/interface";
import {Form, Select, Input, Button, Icon} from "antd";
import LoginService from "../../services/login";
import md5 from "js-md5";
import {IEmployee} from "../../model/interface/ILogin";
import {Modal} from "antd";
import router from "umi/router";
import Regions from "./components/Regions";
import {LOGIN_NAMESPACE} from "./models/login";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({login, store, loading}) => {
    return {
        loading: loading,
        ...login,
        ...store,
    }
})

class Index extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        this.props.dispatch({
            type: `${LOGIN_NAMESPACE}/fetch`
        });
    }


    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (err) return;
            const state = this.state;
            const loginService = LoginService.getInstance();
            values = {
                ...values,
                password: md5(values.password),
                storeID: state.storeId,
            };

            const fail = res => {
                Modal.error({
                    title: "系统提示：",
                    content: "登录错误～"
                })
            };

            loginService.login(values).then(res => {
                const ret: IEmployee = res.data.Result;

                if (ret) {
                    for (let name in ret) {
                        debugger;
                        let n = name.replace(/^([A-Z])/g, (all, letter) => {
                            return letter.toLowerCase();
                        });

                        sessionStorage.setItem(n, ret[name])
                    }
                    router.push("/management")
                }
            });

        });

    }

    changeStore(storeID) {
        this.setState({stroeID});
    }

    render() {
        const {regions, stores, storeID} = this.props;
        const {getFieldDecorator} = this.props.form;

        console.log(stores);

        return (
            <div className="login">
                <Regions {...{regions}}/>
                <div><span>店名：</span>
                    <Select value={storeID} onChange={this.changeStore.bind(this)}>
                        {
                            (stores || []).map((s: IStore, _) => {
                                return <Option value={s.storeID + ""}>{s.storeName}</Option>
                            })
                        }
                    </Select>
                </div>
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

export default Form.create()(Index);

