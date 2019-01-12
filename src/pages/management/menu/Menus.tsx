import * as React from "react";
import CMenu from "../../../interfaces/models/CMenu";

export default class Menus extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="menus">
                {CMenu.getInstance().renderMenu(this)}
            </div>
        );
    }
}
