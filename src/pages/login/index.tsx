import * as React from "react";
import {connect} from 'dva';
import {IStore} from "../../interfaces/interface";
import {Form, Select, Input, Button, Icon} from "antd";
import LoginService from "../../services/login";
import md5 from "js-md5";
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

        this.props.form.validateFields(async (err, values) => {
            if (err) return;
            const loginService = LoginService.getInstance();
            values = {
                storeID: values.storeID,
                systemID: values.userName,
                password: md5(values.password),
            };

            const res = await loginService.login(values);

            if (res && res.status == "success") {
                const result = res.result;
                sessionStorage.setItem("storeID", result.storeID);
                sessionStorage.setItem("systemID", result.systemID);
                sessionStorage.setItem("token", result.token);
                sessionStorage.setItem("userName", result.userName);

                router.push("/management/");
            } else {
                Modal.error({
                    title: "系统提示：",
                    content: "登录错误～"
                });
            }
        });

    }

    changeStore(storeID) {
        this.setState({storeID});
    }

    render() {
        const {regions, stores, storeID} = this.props;
        const {getFieldDecorator} = this.props.form;

        return (
            <div className="login">
                <Regions {...{regions}}/>

                <Form onSubmit={this.handleSubmit} className="login-form" method="post">
                    <div>
                        <span style={{lineHeight: "56px", heihgt: "56px"}}>店名：</span>

                        <FormItem style={{display: "inline-block"}}>
                            {getFieldDecorator('storeID', {
                                initialValue: storeID,
                                rules: [{required: true, message: 'Please select store!'}],
                            })(
                                <Select onChange={this.changeStore.bind(this)}>
                                    {
                                        (stores || []).map((s: IStore, _) => {
                                            return <Option value={s.storeID + ""}>{s.storeName}</Option>
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </div>
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

