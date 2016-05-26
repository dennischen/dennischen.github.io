/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import w = require('../main/widget');
import l = require('../main/layout');

export interface State {
    msg?: string
    checked?:boolean;
}
export class App extends React.Component<any, State>{
    constructor(props: any) {
        super(props);
        this.state = { msg: 'start to operation' , checked:true};
    }
    componentDidMount(): void {
    }
    doCheck(checked: boolean) {
        this.setState({msg:'Checked '+checked, checked:checked});
    }
    onChange(evt:Event) {
        let checked = (evt.target as any).checked;
        this.setState({msg:'Checked '+checked, checked:checked});
    }
    render() {
        return (
            <l.Vlayout vflex={1} style={{ padding: 10, background: 'lightblue' }} space={10}>
                <l.Hlayout >
                    {this.state.msg}
                </l.Hlayout>
                <w.Checkbox id='cb1' label='Label checkable' style={{fontSize:40,background:'lightpink'}} 
                    doCheck={this.doCheck.bind(this)} ></w.Checkbox>
                <w.Checkbox doCheck={this.doCheck.bind(this)}/>
                ---------
                <w.Checkbox checked={this.state.checked} label='You can\' check this, the status follow the last checking' />
                ---------
                <w.Checkbox label='Free checkbox' />
                <w.Checkbox label='Disabled checkbox' disabled />
            </l.Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}