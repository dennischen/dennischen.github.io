/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import {} from '../main/widget';
import {Box, Hlayout,Vlayout} from '../main/layout';
import {Textbox,TextboxType} from '../main/input';


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
            <Vlayout vflex={1} hflex={1} space={10} style={{padding:10, overflow:'auto'}}>
                <Hlayout >
                    {this.state.msg}
                </Hlayout>
                <label><Textbox onChange={this.onChange.bind(this)} value={this.state.value} placeholder='Simple text' /> onChange</label>
                <label><Textbox doChange={this.doChange.bind(this)}  value={this.state.value} placeholder='Password' type={TextboxType.password} /> doChange (password) </label>
                <label><Textbox value={this.state.value} /> text follow last edit(can't chage this)</label>
                <Textbox defaultValue={this.state.value} hflex={1} />
                <Textbox defaultValue={this.state.value} style={{width:250, height:100}} 
                    doChange={this.doChange.bind(this)} type={TextboxType.textarea} />
                <Box style={{width:300, height:120}}>
                    <Textbox defaultValue={this.state.value} hflex={1} vflex={1}  placeholder='Text area'
                        doChange={this.doChange.bind(this)} type='textarea'/>
                </Box>
                
                ---------
                <label>Free Textbox : <Textbox /></label>
                <label>Disabled Textbox : <Textbox value={this.state.value} disabled /></label>
            </Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}