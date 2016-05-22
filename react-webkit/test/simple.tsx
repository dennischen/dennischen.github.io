/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
/// <reference path="../main/widget/widget-alias.d.ts" />
/// <reference path="../main/widget/layout-alias.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import w = require('react-webkit/widget');
import l = require('react-webkit/layout');


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

            <l.Hlayout vflex={1} style={{ background: 'lightgreen', width: 600.65, marginLeft: 60.6, paddingLeft: 40.2, borderLeft: 'blue solid 20px', borderLeftWidth: 20 }} >
                
            </l.Hlayout>


        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}