import * as React from "react";
import {Table, Card} from "antd";

export default class ComTable extends React.Component<any, any> {
    constructor(...args) {
        super(...args);

        this.state = {loading: true, sources: []}
    }

    static getDerivedStateFromProps(props, state) {

        return {
            loading: props.loading,
            sources: props.sources,
        };
    }

    render() {
        const {loading, sources} = this.state;

        return (
            <Card {...{loading}}>
                <Table {...{dataSource: sources, size: "middle", columns: this.props.columns}}></Table>
            </Card>
        )
    }
}
