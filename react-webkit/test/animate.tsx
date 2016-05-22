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
        this.state = { clickCount: 0 ,hidden: true};
    }

    handleClick() {
        let c = this.state.clickCount + 1;
        this.setState({ clickCount: c ,hidden:!this.state.hidden});
    }
    render() {
        return (
            <l.Vlayout hflex={1} vflex={1}>
                <button onClick={() => { this.handleClick() } }>Toggle visibility {this.state.clickCount}</button>
                <l.Hlayout hflex={1} vflex={1}>
                    <l.Vlayout hflex={1} style={{ background: 'yellow', padding: '2px' }}>
                        <l.Box>Top</l.Box>
                        <l.Box hidden={this.state.hidden} style={{ background: 'blue', padding: '2px' }}
                            animation={{ effect: w.AniEffect.fade, duration: 500 }}>AAAA</l.Box>
                        <l.Box>Bottom</l.Box>
                    </l.Vlayout>
                    <l.Vlayout hflex={1} style={{ background: 'yellow', padding: '2px' }}>
                        <l.Box>Top</l.Box>
                        <l.Box hidden={!this.state.hidden} style={{ background: 'blue', padding: '2px' }}
                            animation={{ effect: w.AniEffect.fade, duration: 500 }}>AAAA</l.Box>
                        <l.Box>Bottom</l.Box>
                    </l.Vlayout>
                    <l.Vlayout hflex={1} style={{ background: 'yellow', padding: '2px' }}>
                        <l.Box>Top</l.Box>
                        <l.Box hidden={this.state.hidden} style={{ background: 'green', padding: '2px' }}
                            animation={{ effect: w.AniEffect.slide, duration: 500 }}>BBB</l.Box>
                        <l.Box>Bottom</l.Box>
                    </l.Vlayout>
                    <l.Vlayout hflex={1} style={{ background: 'yellow', padding: '2px' }}>
                        <l.Box>Top</l.Box>
                        <l.Box hidden={!this.state.hidden} style={{ background: 'green', padding: '2px' }}
                            animation={{ effect: w.AniEffect.slide, duration: 500 }}>BBB</l.Box>
                        <l.Box>Bottom</l.Box>
                    </l.Vlayout>
                    <l.Vlayout hflex={1} style={{ background: 'yellow', padding: '2px' }}>
                        <l.Box>Top</l.Box>
                        <l.Box hidden={this.state.hidden} style={{ background: 'blue', padding: '2px' }}
                            animation={{ effect: w.AniEffect.fade, duration: 500 }}>AAAA</l.Box>
                        <l.Box hidden={this.state.hidden} style={{ background: 'green', padding: '2px' }}
                            animation={{ effect: w.AniEffect.slide, duration: 500 }}>BBB</l.Box>
                        <l.Box>Bottom</l.Box>
                    </l.Vlayout>
                    <l.Vlayout hflex={1} style={{ background: 'yellow', padding: '2px' }}>
                        <l.Box>Top</l.Box>
                        <l.Box hidden={!this.state.hidden} style={{ background: 'blue', padding: '2px' }}
                            animation={{ effect: w.AniEffect.fade, duration: 500 }}>AAAA</l.Box>
                        <l.Box hidden={!this.state.hidden} style={{ background: 'green', padding: '2px' }}
                            animation={{ effect: w.AniEffect.slide, duration: 500 }}>BBB</l.Box>
                        <l.Box>Bottom</l.Box>
                    </l.Vlayout>
                </l.Hlayout >
                <l.Vlayout hflex={1} vflex={1}>
                    <l.Hlayout hflex={1}>
                        <l.Box>Left</l.Box>
                        <l.Box hidden={!this.state.hidden} style={{ background: 'orange', padding: '2px' }}
                                animation={{ effect: w.AniEffect.slideLeft, duration: 500 }}>AAAA</l.Box>
                        <l.Box hflex={1} style={{ width:'300px', background: 'yellow', padding: '2px' }}>Right 1</l.Box>
                        <l.Box style={{ background: 'yellow', padding: '2px' , textAlign:'right'}}>Right 2</l.Box>
                    </l.Hlayout>
                    <l.Hlayout hflex={1}>
                        <l.Box>Left</l.Box>
                        <l.Box hidden={this.state.hidden} style={{ background: 'orange', padding: '2px' }}
                                animation={{ effect: w.AniEffect.slideLeft, duration: 500 }}>AAAA</l.Box>
                        <l.Box hflex={1} style={{ width:'300px', background: 'yellow', padding: '2px' }}>Right 1</l.Box>
                        <l.Box style={{ background: 'yellow', padding: '2px' , textAlign:'right'}}>Right 2</l.Box>
                    </l.Hlayout>
                </l.Vlayout>
            </l.Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}