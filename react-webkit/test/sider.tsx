/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
/// <reference path="../main/widget/widget-alias.d.ts" />
/// <reference path="../main/widget/layout-alias.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import w = require('react-webkit/widget');
import l = require('react-webkit/layout');


export class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        //although this test doen't need to care the long content key, 
        //how ever to avoid warning 
        //react.js:19287 Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of `App`
        //we add a clickCount as key here
        this.state = { clickCount: 0, longContent: <span key={0}>Long Content, Long Content</span> };
    }
    componentDidMount(): void {
    }
    handleClick() {
        let c = this.state.clickCount + 1;
        let longContent = [this.state.longContent, <br key={'br' + c}/>, <span key={c}>Content for {c}</span>];
        this.setState({ clickCount: c, longContent: longContent });
    }
    render() {
        return (
            <l.Hlayout vflex={1} hflex={1} style={{ background: 'lightgreen', padding: 10 }}>
                <l.Hsider vflex={1} width={200} minWidth={100} maxWidth={400} style={{ background: 'lightpink' }}>
                    The sider 1
                </l.Hsider>
                <l.Hsider vflex={1} width={200} style={{ background: 'lightgray' }}>
                    <w.List vflex={1} hflex={1}>
                        <span>ABC</span>
                        <span>DEF</span>
                        <span>IJK</span>
                        <span>LMN</span>
                        <span>XYZ</span>
                        <span>ABC</span>
                        <span>DEF</span>
                        <span>IJK</span>
                        <span>LMN</span>
                        <span>XYZ</span>
                        <span>ABC</span>
                        <span>DEF</span>
                        <span>IJK</span>
                        <span>LMN</span>
                        <span>XYZ</span>
                    </w.List>
                </l.Hsider>
                <l.Vlayout hflex={1} vflex={1} style={{ background: 'lightblue', padding:10 }}>
                    <l.Vsider hflex={1} height={150} minHeight={100} maxHeight={200} style={{ background: 'lightpink' }}>
                        The sider 2
                    </l.Vsider>
                    <l.Vsider hflex={1} height={200} style={{ background: 'lightgray' }}>
                        The sider 3
                    </l.Vsider>
                    <w.List vflex={1} hflex={1}>
                        <span>ABC</span>
                        <span>DEF</span>
                        <span>IJK</span>
                        <span>LMN</span>
                        <span>XYZ</span>
                        <span>ABC</span>
                        <span>DEF</span>
                        <span>IJK</span>
                        <span>LMN</span>
                        <span>XYZ</span>
                        <span>ABC</span>
                        <span>DEF</span>
                        <span>IJK</span>
                        <span>LMN</span>
                        <span>XYZ</span>
                    </w.List>
                </l.Vlayout>
            </l.Hlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>, dom);
}
