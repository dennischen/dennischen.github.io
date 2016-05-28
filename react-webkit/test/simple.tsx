/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import w = require('../main/widget');
import l = require('../main/layout');


class App extends React.Component<any, any>{
    visible = false
    constructor(props: any) {
        super(props);
        this.state = { clickCount: 0 };
    }
    componentDidMount(): void {
    }
    handleClick() {
        let c = this.state.clickCount + 1;
        this.setState({ clickCount: c });
        this.visible = !this.visible
    }
    render() {
        return (

            <l.Hlayout vflex={1} style={{ padding: 20 }} >
                <l.Box hflex={1} >A</l.Box>
                <l.Box hflex={2} >B</l.Box>
            </l.Hlayout>


        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}