/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import {DateField, addDateField} from '../main/util';
import {Box, Hlayout, Vlayout} from '../main/layout';
import {Calendar} from '../main/calendar';

export interface State {
    date1?: Date
    date2?: Date
    msg?: string
}
export class App extends React.Component<any, State>{
    constructor(props: any) {
        super(props);
        this.state = {
            msg:'Select a date',
            // date: addDateField(addDateField(addDateField(new Date(), DateField.year, -1), DateField.month, -2), DateField.date, 2)
            date1: new Date()
        }
    }
    doSelect(date: Date) {
        this.setState({
            msg: 'Selected:' + (date ? date.toLocaleDateString() : null),
            date1: date,
            date2: date
        });
    }
    render() {
        return (
            <Vlayout space={10} style={{ padding: 10 }}>
                {this.state.msg}
                <Hlayout space={10} >
                    <Calendar selected={this.state.date1} doSelect={this.doSelect.bind(this) }/>
                    <Calendar selected={this.state.date2} doSelect={this.doSelect.bind(this) } firstDayOfWeek={1}/>
                </Hlayout>
                <Calendar doSelect={this.doSelect.bind(this) } style={{width: 400, height:400}}/>
            </Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>, dom);
}