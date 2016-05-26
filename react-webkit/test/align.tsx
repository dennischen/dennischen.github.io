/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import w = require('../main/widget');
import l = require('../main/layout');


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
            <l.Vlayout vflex={1} hflex={1} style={{ background: 'green', padding: '2px' }} space={5}>
                <button onClick={() => { this.handleClick() } } >Click to enlarge Content {this.state.clickCount}</button>
                <l.Hlayout style={{ background: 'lightpink', padding: '2px' }} >
                    <l.Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='top left'>
                        <button style={{ height: 40 }}>btn1</button>
                        <l.Box style={{ border: '1px solid' }} >A</l.Box >
                    </l.Hlayout>
                    <l.Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='top center'>
                        <l.Box style={{ border: '1px solid' }}>B</l.Box>
                        <button style={{ height: 40 }}>btn2</button>
                    </l.Hlayout>
                    <l.Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='top right'>
                        <l.Box style={{ border: '1px solid' }}>C</l.Box>
                        <button style={{ height: 40 }}>btn3</button>
                    </l.Hlayout>
                </l.Hlayout>
                <l.Hlayout style={{ background: 'lightpink', padding: '2px' }} >
                    <l.Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='middle left'>
                        <button style={{ height: 40 }}>btn1</button>
                        <l.Box style={{ border: '1px solid' }} >A</l.Box >
                    </l.Hlayout>
                    <l.Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='middle center'>
                        <l.Box style={{ border: '1px solid' }}>B</l.Box>
                        <button style={{ height: 40 }}>btn2</button>
                    </l.Hlayout>
                    <l.Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='middle right'>
                        <l.Box style={{ border: '1px solid' }}>C</l.Box>
                        <button style={{ height: 40 }}>btn3</button>
                    </l.Hlayout>
                </l.Hlayout>
                <l.Hlayout style={{ background: 'lightpink', padding: '2px' }} >
                    <l.Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='bottom left'>
                        <button style={{ height: 40 }}>btn1</button>
                        <l.Box style={{ border: '1px solid' }} >A</l.Box >
                    </l.Hlayout>
                    <l.Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='bottom center'>
                        <l.Box style={{ border: '1px solid' }}>B</l.Box>
                        <button style={{ height: 40 }}>btn2</button>
                    </l.Hlayout>
                    <l.Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='bottom right'>
                        <l.Box style={{ border: '1px solid' }}>C</l.Box>
                        <button style={{ height: 40 }}>btn3</button>
                    </l.Hlayout>
                </l.Hlayout>
                <l.Hlayout hflex={1} vflex={1}>
                    <l.Vlayout vflex={1} hflex={1}>
                        <l.Hlayout vflex={1} style={{ background: 'lightgreen', overflowY: 'auto' }} valign={w.VPos.top}>
                            <l.Box hflex={1} style={{ border: '1px solid' }} >A</l.Box>
                            <l.Box style={{ border: '1px solid' }} ><div><div><span>B1</span></div><div><span>B2</span></div></div></l.Box>
                            <l.Box hflex={1} style={{ border: '1px solid' }} >C</l.Box>
                        </l.Hlayout>
                        <l.Hlayout vflex={1} style={{ background: 'lightblue', overflowY: 'auto' }} valign={w.VPos.middle}>
                            <l.Box hflex={1} style={{ border: '1px solid' }}>A</l.Box>
                            <l.Box hflex={1} style={{ border: '1px solid' }} ><div><div>B1</div><div>B2</div></div></l.Box>
                            <span>C</span>
                        </l.Hlayout>
                        <l.Hlayout vflex={1} style={{ background: 'lightyellow', overflowY: 'auto' }} valign={w.VPos.bottom}>
                            A
                            <l.Box hflex={1} style={{ border: '1px solid' }} ><div><div>B1</div><div>B2</div></div></l.Box>
                            <l.Box hflex={1} style={{ border: '1px solid' }}>C</l.Box>
                        </l.Hlayout>
                        <button >Do nothing button {this.state.clickCount}</button>
                    </l.Vlayout>
                    <l.Hlayout vflex={1} hflex={1} align='middle center'  style={{ background: 'lightsalmon', overflowY: 'auto' }} >
                        <div  style={{ background: 'lightgreen', padding: 10 }} >
                            {this.state.longContent}
                        </div>
                    </l.Hlayout>
                </l.Hlayout>

            </l.Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}
