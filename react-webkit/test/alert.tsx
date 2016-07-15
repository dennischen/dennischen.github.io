/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
import Jq = require('jquery');

import {Button,Alert,Fonticon} from '../main/widget';
import {Box, Vlayout, Hlayout} from '../main/layout';



export class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = { invisible: false}
    }
    doToggle(){
        this.setState({invisible:!this.state.invisible});
    }
    render() {
        return (
            <Box hflex={1} vflex={1} align='center middle'>
                <Vlayout style={{ width: 400, height: 600 }}>
                    <Hlayout align='middle' space={10}>
                        <Button label="Toggle" onClick={this.doToggle.bind(this)}/>
                    </Hlayout>
                    <Alert title='Error!' label="This is an error" alertType='error' />
                    <Alert fonticon='fa fa-exclamation-triangle' title='Warning!' label="This is a warning" alertType='warning' invisible={this.state.invisible}/>
                    <Alert alertType='info'><strong>Information</strong><Fonticon className='fa fa-info-circle fa-lg'/>This is information</Alert>
                    <Alert label="This is success" alertType='success' animation={{effect:'fade', eager:true}} invisible={this.state.invisible}/>
                </Vlayout>
            </Box>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>, dom);
}