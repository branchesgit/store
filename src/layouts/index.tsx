import * as React from "react";
import {ContainerQuery} from "react-container-query";
import classNames from "classnames";
import * as enquirejs from "enquire-js";
import {Layout, message, LocaleProvider} from "antd";
import zhCn from "antd/lib/locale-provider/zh_CN";
const query = {
    "screen-xs": {
        maxWidth: 575,
    },
    "screen-sm": {
        minWidth: 576,
        maxWidth: 767,
    },
    "screen-md": {
        minWidth: 768,
        maxWidth: 991,
    },
    "screen-lg": {
        minWidth: 992,
        maxWidth: 1199,
    },
    "screen-xl": {
        minWidth: 1200,
        maxWidth: 1599,
    },
    "screen-xxl": {
        minWidth: 1600,
    },
};

export default class Index extends React.Component<any, any> {

    render() {
        const layout = (
            <LocaleProvider locale={zhCn}>
                <Layout className="store-wrapper" style={{height: document.body.clientHeight}}>
                    <div className="store">
                        {this.props.children}
                    </div>
                </Layout>
            </LocaleProvider>
        );

        return (
            <ContainerQuery query={query}>
                {params => <div className={classNames(params)}>{layout}</div>}
            </ContainerQuery>
        );
    }
}
