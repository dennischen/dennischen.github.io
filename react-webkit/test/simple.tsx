/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import {} from '../main/widget';
import {Box, Hlayout,Vlayout} from '../main/layout';


class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    render() {
        return (

            <Hlayout vflex={1} style={{ padding: 20 }} >
                <Box hflex={1} >A</Box>
                <Box hflex={2} >B</Box>
            </Hlayout>


        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}