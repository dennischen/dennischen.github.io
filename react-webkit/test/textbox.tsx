/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import w = require('../main/widget');
import i = require('../main/input')
import l = require('../main/layout');

export interface State {
    msg?: string
    value?:string;
}
export class App extends React.Component<any, State>{
    constructor(props: any) {
        super(props);
        this.state = { msg: 'start to operation', value:''};
    }
    componentDidMount(): void {
    }
    doChange(value:any) {
        this.setState({msg:'doChange to '+ value, value:value});
    }
    onChange(evt:Event) {
        let value = (evt.target as any).value;
        this.setState({msg:'onChange to '+ value, value:value});
    }
    render() {
        return (
            <l.Vlayout vflex={1} hflex={1} space={10} style={{padding:10, overflow:'auto'}}>
                <l.Hlayout >
                    {this.state.msg}
                </l.Hlayout>
                <label><i.Textbox onChange={this.onChange.bind(this)} value={this.state.value} placeholder='Simple text' /> onChange</label>
                <label><i.Textbox doChange={this.doChange.bind(this)}  value={this.state.value} placeholder='Password' type={i.TextboxType.password} /> doChange (password) </label>
                <label><i.Textbox value={this.state.value} /> text follow last edit(can't chage this)</label>
                <i.Textbox defaultValue={this.state.value} hflex={1} />
                <i.Textbox defaultValue={this.state.value} style={{width:250, height:100}} 
                    doChange={this.doChange.bind(this)} type={i.TextboxType.textarea} />
                <l.Box style={{width:300, height:120}}>
                    <i.Textbox defaultValue={this.state.value} hflex={1} vflex={1}  placeholder='Text area'
                        doChange={this.doChange.bind(this)} type='textarea'/>
                </l.Box>
                
                ---------
                <label>Free Textbox : <i.Textbox /></label>
                <label>Disabled Textbox : <i.Textbox value={this.state.value} disabled /></label>
            </l.Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}