/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import {} from '../main/widget';
import {Box, Hlayout,Vlayout} from '../main/layout';


export class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = { clickCount: 0 };
    }
    componentDidMount(): void {
    }
    handleClick() {
        let c = this.state.clickCount + 1;
        this.setState({ clickCount: c });
    }
    render() {
        return (
            <Box hflex={1} vflex={1}>
                There should not has any scrollbar even you resize the windows
                <Hlayout hflex={1}  vflex={1}
                    style={{ background: 'lightgreen', width: 600.65, marginLeft: 60.6, paddingLeft: 40.2, borderLeft: 'blue solid 20px', borderLeftWidth: 20 }} >
                    <Box hflex={1} style={{ border: '1px solid' }} >A</Box>
                    <Box style={{ border: '1px solid' }} ><div><span>B1</span></div><div><span>B2</span></div></Box>
                    <Box hflex={1} style={{ border: '1px solid' }} >C</Box>
                </Hlayout>
            </Box>

        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}