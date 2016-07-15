/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import {VPos} from '../main/widget';
import {Box, Hlayout,Vlayout} from '../main/layout';


export class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        //although this test doen't need to care the long content key, 
        //how ever to avoid warning 
        //react.js:19287 Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of `App`
        //we add a clickCount as key here
        this.state = { clickCount: 0, longContent: <span key={0}>Long Content, Long Content</span> };
    }
    handleClick() {
        let c = this.state.clickCount + 1;
        let brk = 'br'+c;
        let longContent = [this.state.longContent, <br key={brk}/>, <span key={c}>Content for {c}</span>];
        this.setState({ clickCount: c, longContent: longContent });
    }
    render() {
        return (
            <Vlayout vflex={1} hflex={1} style={{ background: 'green', padding: '2px' }} space={5}>
                <button onClick={() => { this.handleClick() } } >Click to enlarge Content {this.state.clickCount}</button>
                <Hlayout style={{ background: 'lightpink', padding: '2px' }} >
                    <Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='top left'>
                        <button style={{ height: 40 }}>btn1</button>
                        <Box style={{ border: '1px solid' }} >A</Box >
                    </Hlayout>
                    <Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='top center'>
                        <Box style={{ border: '1px solid' }}>B</Box>
                        <button style={{ height: 40 }}>btn2</button>
                    </Hlayout>
                    <Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='top right'>
                        <Box style={{ border: '1px solid' }}>C</Box>
                        <button style={{ height: 40 }}>btn3</button>
                    </Hlayout>
                </Hlayout>
                <Hlayout style={{ background: 'lightpink', padding: '2px' }} >
                    <Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='middle left'>
                        <button style={{ height: 40 }}>btn1</button>
                        <Box style={{ border: '1px solid' }} >A</Box >
                    </Hlayout>
                    <Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='middle center'>
                        <Box style={{ border: '1px solid' }}>B</Box>
                        <button style={{ height: 40 }}>btn2</button>
                    </Hlayout>
                    <Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='middle right'>
                        <Box style={{ border: '1px solid' }}>C</Box>
                        <button style={{ height: 40 }}>btn3</button>
                    </Hlayout>
                </Hlayout>
                <Hlayout style={{ background: 'lightpink', padding: '2px' }} >
                    <Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='bottom left'>
                        <button style={{ height: 40 }}>btn1</button>
                        <Box style={{ border: '1px solid' }} >A</Box >
                    </Hlayout>
                    <Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='bottom center'>
                        <Box style={{ border: '1px solid' }}>B</Box>
                        <button style={{ height: 40 }}>btn2</button>
                    </Hlayout>
                    <Hlayout hflex={1} style={{ border: '1px solid', height: 80 }} align='bottom right'>
                        <Box style={{ border: '1px solid' }}>C</Box>
                        <button style={{ height: 40 }}>btn3</button>
                    </Hlayout>
                </Hlayout>
                <Hlayout hflex={1} vflex={1}>
                    <Vlayout vflex={1} hflex={1}>
                        <Hlayout vflex={1} style={{ background: 'lightgreen', overflowY: 'auto' }} valign={VPos.top}>
                            <Box hflex={1} style={{ border: '1px solid' }} >A</Box>
                            <Box style={{ border: '1px solid' }} ><div><div><span>B1</span></div><div><span>B2</span></div></div></Box>
                            <Box hflex={1} style={{ border: '1px solid' }} >C</Box>
                        </Hlayout>
                        <Hlayout vflex={1} style={{ background: 'lightblue', overflowY: 'auto' }} valign={VPos.middle}>
                            <Box hflex={1} style={{ border: '1px solid' }}>A</Box>
                            <Box hflex={1} style={{ border: '1px solid' }} ><div><div>B1</div><div>B2</div></div></Box>
                            <span>C</span>
                        </Hlayout>
                        <Hlayout vflex={1} style={{ background: 'lightyellow', overflowY: 'auto' }} valign={VPos.bottom}>
                            A
                            <Box hflex={1} style={{ border: '1px solid' }} ><div><div>B1</div><div>B2</div></div></Box>
                            <Box hflex={1} style={{ border: '1px solid' }}>C</Box>
                        </Hlayout>
                        <button >Do nothing button {this.state.clickCount}</button>
                    </Vlayout>
                    <Hlayout vflex={1} hflex={1} align='middle center'  style={{ background: 'lightsalmon', overflowY: 'auto' }} >
                        <div  style={{ background: 'lightgreen', padding: 10 }} >
                            {this.state.longContent}
                        </div>
                    </Hlayout>
                </Hlayout>

            </Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}
