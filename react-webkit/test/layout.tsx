/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import {AniEffect} from '../main/widget';
import {Box, Hlayout,Vlayout} from '../main/layout';


export class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = { clickCount: 0, visible: true, flex: 1 };
    }
    componentDidMount(): void {
    }
    handleClick() {
        let c = this.state.clickCount + 1;
        this.setState({ clickCount: c, invisible: !this.state.invisible });
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
            if (each.state.invisible) {
                each.show();
            } else {
                each.hide();
            }
        });
    }
    render() {
        return (
            <Vlayout vflex={1} hflex={1} style={{ background: 'yellow', padding: '2px' }}>
                <Hlayout>
                    <button onClick={this.handleClick.bind(this) }>Toggle visibility {this.state.clickCount}</button>
                    <button onClick={this.handleFlex.bind(this) }>Change flex {this.state.clickCount}</button>
                    <button onClick={this.toggleDiv2.bind(this) }>Toggle Visibility by method</button>
                </Hlayout>
                <div >in Div AA</div>
                <Hlayout ref='w1' invisible={this.state.invisible} style={{ background: 'lightblue', padding: '2px' }} hflex={1} animation={{ effect: AniEffect.fade }}>
                    <Box hflex={1}><span>abc {this.state.clickCount}</span> </Box>
                    <Box hflex={1}><span>def {this.state.clickCount}</span> </Box>
                    <span><span>this is long long long<br/> long long long long text</span></span>
                </Hlayout>
                <Hlayout style={{ background: 'gray', padding: '2px' }} vflex={1} space={10}>
                    <span>123  {this.state.clickCount} </span>
                    <Vlayout style={{ background: 'lightpink', padding: '2px', overflowY: 'auto' }} hflex={this.state.flex} vflex={1}>
                        <span>xyz1 {this.state.clickCount} </span>
                        <span>ijk1 {this.state.clickCount} lkasdl falsjdfl asjdlfa jsdlfjal sdfjlasj dflasjdf lajsdlfjas ldfkjald falsdjl asdjfls djf</span>
                    </Vlayout>
                    <Vlayout ref='w2' invisible={this.state.invisible} style={{ background: 'lightseagreen', padding: '2px' }} hflex={2} animation={{ effect: AniEffect.slide }}>
                        <span>xyz2 {this.state.clickCount} </span>
                        <span>ijk2 {this.state.clickCount} </span>
                    </Vlayout>
                    <Vlayout style={{ background: 'lightskyblue', padding: '2px' }} hflex={1}>
                        <span>xyz3 {this.state.clickCount} </span>
                        <span>ijk3 {this.state.clickCount} </span>
                    </Vlayout>
                    <span>456  {this.state.clickCount} </span>
                </Hlayout>
                <Vlayout style={{ background: 'gray', padding: '2px' }} vflex={1} >
                    <Box vflex={1} >
                        <Vlayout hflex={1} vflex={1} space={10}>
                            <Box vflex={1} style={{ background: 'lightgreen' }} invisible={this.state.invisible}>callback div 1
                            </Box>
                            <Box vflex={this.state.flex} style={{ background: 'lightpink' }} ref='w3'>callback div 2
                            </Box>
                        </Vlayout>
                    </Box>
                </Vlayout>
                <div>in Div BB</div>
            </Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>, dom);
}