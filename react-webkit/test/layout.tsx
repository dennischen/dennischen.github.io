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
            <l.Vlayout vflex={1} hflex={1} style={{ background: 'yellow', padding: '2px' }}>
                <button onClick={() => { this.handleClick() } }>Toggle visibility {this.state.clickCount}</button>
                <div ref='xyz'>in Div AA</div>
                <l.Hlayout hidden={this.state.hidden} style={{ background: 'lightblue', padding: '2px' }} hflex={1} animation={{ effect: w.AniEffect.fade }}>
                    <l.Box ref='abc' hflex={1}><span>abc {this.state.clickCount}</span> </l.Box>
                    <l.Box ref='def' hflex={1}><span>def {this.state.clickCount}</span> </l.Box>
                    <span><span>this is long long long<br/> long long long long text</span></span>
                </l.Hlayout>
                <l.Hlayout style={{ background: 'gray', padding: '2px' }} vflex={1} space={10}>
                    <span>123  {this.state.clickCount} </span>
                    <l.Vlayout style={{ background: 'lightpink', padding: '2px', overflowY: 'auto' }} hflex={1} vflex={1}>
                        <span>xyz1 {this.state.clickCount} </span>
                        <span>ijk1 {this.state.clickCount} lkasdl falsjdfl asjdlfa jsdlfjal sdfjlasj dflasjdf lajsdlfjas ldfkjald falsdjl asdjfls djf</span>
                    </l.Vlayout>
                    <l.Vlayout hidden={this.state.hidden} style={{ background: 'lightseagreen', padding: '2px' }} hflex={2} animation={{ effect: w.AniEffect.slide }}>
                        <span>xyz2 {this.state.clickCount} </span>
                        <span>ijk2 {this.state.clickCount} </span>
                    </l.Vlayout>
                    <l.Vlayout style={{ background: 'lightskyblue', padding: '2px' }} hflex={1}>
                        <span>xyz3 {this.state.clickCount} </span>
                        <span>ijk3 {this.state.clickCount} </span>
                    </l.Vlayout>
                    <span>456  {this.state.clickCount} </span>
                </l.Hlayout>
                <l.Vlayout style={{ background: 'gray', padding: '2px' }} vflex={1} >
                    <l.Box vflex={1} >
                        <l.Vlayout hflex={1} vflex={1} space={10}>
                            <l.Box vflex={1} style={{background:'lightgreen'}}>callback div 1
                            </l.Box>
                            <l.Box vflex={1} style={{background:'lightpink'}}>callback div 2
                            </l.Box>
                        </l.Vlayout>
                    </l.Box>
                </l.Vlayout>
                <div>in Div BB</div>
            </l.Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}