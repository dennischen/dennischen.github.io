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
        this.state = { clickCount: 0 , hidden:false};
    }
    componentDidMount(): void {
    }
    handleClick() {
        console.log(this.refs);
        let c = this.state.clickCount + 1;
        this.setState({ clickCount: c , hidden:!this.state.hidden});
    }
    render() {
        return (
            <l.Vlayout vflex={1} hflex={1} style={{ padding: '2px' }} space={10}>
                <div>in Div AA</div>
                <l.Hlayout vflex={1} hflex={1} style={{padding: '2px' }} >
                    <l.Vlayout  align='left top' hflex={1} vflex={1} style={{border:'1px solid'}}>Left <br/> Top</l.Vlayout >
                    <l.Vlayout  align='center top' hflex={1} vflex={1} style={{border:'1px solid'}}>Center <br/> Top</l.Vlayout >
                    <l.Vlayout  align='right top' hflex={1} vflex={1} style={{border:'1px solid'}}>Right <br/> Top</l.Vlayout >
                </l.Hlayout>
                <l.Hlayout vflex={1} hflex={1} style={{ padding: '2px' }} >
                    <l.Vlayout  align='left middle' hflex={1} vflex={1} style={{border:'1px solid'}}>Left <br/> Middle</l.Vlayout >
                    <l.Vlayout  align='center middle' hflex={1} vflex={1} style={{border:'1px solid', overflowY:'auto'}}>
                        Center <br/> Middle <br/> 
                        Long Content <br/> Long Content <br/>Long Content<br/>
                        Long Content <br/> Long Content <br/>Long Content<br/>
                        </l.Vlayout >
                    <l.Vlayout  align='right middle' hflex={1} vflex={1} style={{border:'1px solid'}}>Right <br/> Middle</l.Vlayout >
                </l.Hlayout>
                <l.Hlayout vflex={1} hflex={1} style={{ padding: '2px' }} >
                    <l.Vlayout  align='left bottom' hflex={1} vflex={1} style={{border:'1px solid'}}>Left <br/> Bottom</l.Vlayout >
                    <l.Vlayout  align='center bottom' hflex={1} vflex={1} style={{border:'1px solid'}}>Center <br/> Bottom</l.Vlayout >
                    <l.Vlayout  align='right bottom' hflex={1} vflex={1} style={{border:'1px solid'}}>Right <br/> Bottom</l.Vlayout >
                </l.Hlayout>
                <div>in Div BB</div>
            </l.Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}