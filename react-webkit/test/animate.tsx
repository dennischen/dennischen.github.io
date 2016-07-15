/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import {AniEffect} from '../main/widget';
import {Box, Hlayout,Vlayout} from '../main/layout';


export class App extends React.Component<any, any>{
    
    constructor(props: any) {
        super(props);
        this.state = { clickCount: 0 ,invisible: true};
    }

    handleClick() {
        let c = this.state.clickCount + 1;
        this.setState({ clickCount: c ,invisible:!this.state.invisible});
    }
    render() {
        return (
            <Vlayout hflex={1} vflex={1}>
                <button onClick={() => { this.handleClick() } }>Toggle visibility {this.state.clickCount}</button>
                <Hlayout hflex={1} vflex={1}>
                    <Vlayout hflex={1} style={{ background: 'yellow', padding: '2px' }}>
                        <Box>Top</Box>
                        <Box invisible={this.state.invisible} style={{ background: 'blue', padding: '2px' }}
                            animation={{ effect: AniEffect.fade, duration: 500 }}>AAAA</Box>
                        <Box>Bottom</Box>
                    </Vlayout>
                    <Vlayout hflex={1} style={{ background: 'yellow', padding: '2px' }}>
                        <Box>Top</Box>
                        <Box invisible={!this.state.invisible} style={{ background: 'blue', padding: '2px' }}
                            animation={{ effect: AniEffect.fade, duration: 500, eager:true }}>AAAA</Box>
                        <Box>Bottom</Box>
                    </Vlayout>
                    <Vlayout hflex={1} style={{ background: 'yellow', padding: '2px' }}>
                        <Box>Top</Box>
                        <Box invisible={this.state.invisible} style={{ background: 'green', padding: '2px' }}
                            animation={{ effect: AniEffect.slide, duration: 500 }}>BBB</Box>
                        <Box>Bottom</Box>
                    </Vlayout>
                    <Vlayout hflex={1} style={{ background: 'yellow', padding: '2px' }}>
                        <Box>Top</Box>
                        <Box invisible={!this.state.invisible} style={{ background: 'green', padding: '2px' }}
                            animation={{ effect: AniEffect.slide, duration: 500 , eager:true}}>BBB</Box>
                        <Box>Bottom</Box>
                    </Vlayout>
                    <Vlayout hflex={1} style={{ background: 'yellow', padding: '2px' }}>
                        <Box>Top</Box>
                        <Box invisible={this.state.invisible} style={{ background: 'blue', padding: '2px' }}
                            animation={{ effect: AniEffect.fade, duration: 500 }}>AAAA</Box>
                        <Box invisible={this.state.invisible} style={{ background: 'green', padding: '2px' }}
                            animation={{ effect: AniEffect.slide, duration: 500 }}>BBB</Box>
                        <Box>Bottom</Box>
                    </Vlayout>
                    <Vlayout hflex={1} style={{ background: 'yellow', padding: '2px' }}>
                        <Box>Top</Box>
                        <Box invisible={!this.state.invisible} style={{ background: 'blue', padding: '2px' }}
                            animation={{ effect: AniEffect.fade, duration: 500 , eager:true}}>AAAA</Box>
                        <Box invisible={!this.state.invisible} style={{ background: 'green', padding: '2px' }}
                            animation={{ effect: AniEffect.slide, duration: 500 , eager:true}}>BBB</Box>
                        <Box>Bottom</Box>
                    </Vlayout>
                </Hlayout >
                <Vlayout hflex={1} vflex={1}>
                    <Hlayout hflex={1}>
                        <Box>Left</Box>
                        <Box invisible={!this.state.invisible} style={{ background: 'orange', padding: '2px' }}
                                animation={{ effect: AniEffect.slideWidth, duration: 500, eager:true }}>AAAA</Box>
                        <Box hflex={1} style={{ width:'300px', background: 'yellow', padding: '2px' }}>Right 1</Box>
                        <Box style={{ background: 'yellow', padding: '2px' , textAlign:'right'}}>Right 2</Box>
                    </Hlayout>
                    <Hlayout hflex={1}>
                        <Box>Left</Box>
                        <Box invisible={this.state.invisible} style={{ background: 'orange', padding: '2px' }}
                                animation={{ effect: AniEffect.slideWidth, duration: 500, eager:true }}>AAAA</Box>
                        <Box hflex={1} style={{ width:'300px', background: 'yellow', padding: '2px' }}>Right 1</Box>
                        <Box style={{ background: 'yellow', padding: '2px' , textAlign:'right'}}>Right 2</Box>
                    </Hlayout>
                </Vlayout>
            </Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}