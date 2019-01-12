import * as React from "react";
import Menu from "./menu/Menus";

export default class _layout extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="main-content">
                <div className="menu-wrapper">
                    <Menu/>
                </div>
                <div className="main">
                    <div className="top-wrapper">
                        <div className="top">
                            top info
                        </div>
                    </div>
                    <div className="context">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
