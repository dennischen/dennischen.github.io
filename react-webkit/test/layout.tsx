/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import w = require('../main/widget');
import l = require('../main/layout');


export class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = { clickCount: 0, visible: true, flex: 1 };
    }
    componentDidMount(): void {
    }
    handleClick() {
        let c = this.state.clickCount + 1;
        this.setState({ clickCount: c, visible: !this.state.visible });
    }
    handleFlex() {
        let c = this.state.clickCount + 1;
        let f = this.state.flex + 1;
        if (f > 3) {
            f = 0;
        }
        this.setState({ clickCount: c, flex: f });
    }
    toggleDiv2() {
        let ws: any[] = [this.refs['w1'], this.refs['w2'], this.refs['w3']];
        ws.forEach((each) => {
            if (each.state.visible) {
                each.hide();
            } else {
                each.show();
            }
        });
    }
    render() {
        return (
            <l.Vlayout vflex={1} hflex={1} style={{ background: 'yellow', padding: '2px' }}>
                <l.Hlayout>
                    <button onClick={this.handleClick.bind(this) }>Toggle visibility {this.state.clickCount}</button>
                    <button onClick={this.handleFlex.bind(this) }>Change flex {this.state.clickCount}</button>
                    <button onClick={this.toggleDiv2.bind(this) }>Toggle Visibility by method</button>
                </l.Hlayout>
                <div >in Div AA</div>
                <l.Hlayout ref='w1' visible={this.state.visible} style={{ background: 'lightblue', padding: '2px' }} hflex={1} animation={{ effect: w.AniEffect.fade }}>
                    <l.Box hflex={1}><span>abc {this.state.clickCount}</span> </l.Box>
                    <l.Box hflex={1}><span>def {this.state.clickCount}</span> </l.Box>
                    <span><span>this is long long long<br/> long long long long text</span></span>
                </l.Hlayout>
                <l.Hlayout style={{ background: 'gray', padding: '2px' }} vflex={1} space={10}>
                    <span>123  {this.state.clickCount} </span>
                    <l.Vlayout style={{ background: 'lightpink', padding: '2px', overflowY: 'auto' }} hflex={this.state.flex} vflex={1}>
                        <span>xyz1 {this.state.clickCount} </span>
                        <span>ijk1 {this.state.clickCount} lkasdl falsjdfl asjdlfa jsdlfjal sdfjlasj dflasjdf lajsdlfjas ldfkjald falsdjl asdjfls djf</span>
                    </l.Vlayout>
                    <l.Vlayout ref='w2' visible={this.state.visible} style={{ background: 'lightseagreen', padding: '2px' }} hflex={2} animation={{ effect: w.AniEffect.slide }}>
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
                            <l.Box vflex={1} style={{ background: 'lightgreen' }} visible={this.state.visible}>callback div 1
                            </l.Box>
                            <l.Box vflex={this.state.flex} style={{ background: 'lightpink' }} ref='w3'>callback div 2
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
    ReactDOM.render(<App/>, dom);
}