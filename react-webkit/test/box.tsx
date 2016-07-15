/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import {} from '../main/widget';
import {Box, Hlayout,Vlayout} from '../main/layout';


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
            <Vlayout vflex={1} hflex={1} style={{ padding: '2px' }} space={10}>
                <div>in Div AA</div>
                <Hlayout vflex={1} hflex={1} style={{padding: '2px' }} >
                    <Box align='left top' hflex={1} vflex={1} style={{border:'1px solid'}}>Left <br/> Top</Box>
                    <Box align='center top' hflex={1} vflex={1} style={{border:'1px solid'}}>Center <br/> Top</Box>
                    <Box align='right top' hflex={1} vflex={1} style={{border:'1px solid'}}>Right <br/> Top</Box>
                </Hlayout>
                <Hlayout vflex={1} hflex={1} style={{ padding: '2px' }} >
                    <Box align='left middle' hflex={1} vflex={1} style={{border:'1px solid'}}>Left <br/> Middle</Box>
                    <Box align='center middle' hflex={1} vflex={1} style={{border:'1px solid', overflowY:'auto'}}>
                        Center<br/>Middle<br/> Long Content<br/>Long Content<br/>Long Content<br/>Long Content<br/>Long Content<br/>Long Content<br/>
                        </Box>
                    <Box align='right middle' hflex={1} vflex={1} style={{border:'1px solid'}}>Right <br/> Middle</Box>
                </Hlayout>
                <Hlayout vflex={1} hflex={1} style={{ padding: '2px' }} >
                    <Box align='left bottom' hflex={1} vflex={1} style={{border:'1px solid'}}>Left <br/> Bottom</Box>
                    <Box align='center bottom' hflex={1} vflex={1} style={{border:'1px solid'}}>Center <br/> Bottom</Box>
                    <Box align='right bottom' hflex={1} vflex={1} style={{border:'1px solid'}}>Right <br/> Bottom</Box>
                </Hlayout>
                <div>in Div BB</div>
            </Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}