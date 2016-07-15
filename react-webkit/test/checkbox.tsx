/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import {} from '../main/widget';
import {Box, Hlayout,Vlayout} from '../main/layout';
import {Checkbox} from '../main/input';

export interface State {
    msg?: string
    checked?:boolean;
}
export class App extends React.Component<any, State>{
    constructor(props: any) {
        super(props);
        this.state = { msg: 'start to operation' , checked:false};
    }
    componentDidMount(): void {
    }
    doCheck(checked: boolean,value:any) {
        console.log(value);
        this.setState({msg:'Checked '+checked+', value: '+value, checked:checked});
    }
    onChange(evt:Event) {
        let checked = (evt.target as any).checked;
        this.setState({msg:'Checked '+checked, checked:checked});
    }
    render() {
        return (
            <Vlayout vflex={1} style={{ padding: 10, background: 'lightblue' }} space={10}>
                <Hlayout >
                    {this.state.msg}
                </Hlayout>
                <Checkbox id='cb1' label='Label checkable' style={{fontSize:40,background:'lightpink'}} 
                    doCheck={this.doCheck.bind(this)} value={{text:'one'}}></Checkbox>
                <Checkbox doCheck={this.doCheck.bind(this)}/>
                <Checkbox doCheck={this.doCheck.bind(this)} value='two'/>
                ---------
                <Checkbox checked={this.state.checked} label='You can\' check this, the status follow the last checking' />
                ---------
                <Checkbox label='Free checkbox' />
                <Checkbox label='Disabled checkbox' disabled />
            </Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}