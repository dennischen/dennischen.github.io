/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import {Datebox} from '../main/calendar';
import {Box, Vlayout, Hlayout} from '../main/layout';

export interface State {
    msg?: string
    value?:Date;
}
export class App extends React.Component<any, State>{
    constructor(props: any) {
        super(props);
        this.state = { msg: 'Click on datebox and select a date', value:new Date()};
    }
    doChange(date:Date){
        this.setState({
            msg : 'Select '+date,
            value: date
        })
        return true;
    }
    render() {
        return (
            <Vlayout vflex={1} hflex={1} space={10} style={{padding:10, overflow:'auto'}}>
                <Hlayout >
                    {this.state.msg}
                </Hlayout>
                <Datebox doChange={this.doChange.bind(this)} value={this.state.value} format='YYYY/MM/DD' placeholder='Select a date 1' />
                <label><Datebox value={this.state.value} placeholder='Select a date 2' firstDayOfWeek={1}/> follow last edit(can't chage this)</label>
                <Datebox hflex={1} placeholder='A free datebox'/>
                ---------
                <label>Disabled Datebox : <Datebox value={this.state.value} disabled /></label>
                <Box vflex={1} align='bottom right'>
                    <Datebox placeholder='Test popup at edge'/>
                </Box>
            </Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}