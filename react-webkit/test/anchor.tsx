/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
import Jq = require('jquery');

import {Anchor} from '../main/widget';
import {Box, Hlayout,Vlayout} from '../main/layout';
import {List} from '../main/list';

let tipOpt = {
    position:{
        target:false,
        my:'left center',
        at:'right center',
        adjust:{
            method: 'shift shift'
        }
    }
} 

export class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    onClick(evt:Event){
        console.log('onClick');
    }
    doSelect(select: boolean, idx: number, item: any){
        if(select){
            console.log('doSelect', idx,item);
        }
    }
    render() {
        let onClick = this.onClick.bind(this);
        return (
            <Vlayout vflex={1} hflex={1} style={{ padding: '10px' }} space={10}>
                <Vlayout space={6} >
                    <Anchor href="#A" onClick={onClick} tooltip='Open the file' >Open File</Anchor>
                    <Anchor href="#B" onClick={onClick} tooltip='Save the file' tooltipOption={tipOpt}>Save File</Anchor>
                    <Anchor href="#C" onClick={onClick} tooltip='Close the file' tooltipOption={tipOpt}>Close File</Anchor>
                    <Anchor href='http://dennischen.github.io'  onClick={onClick}>dennischen.github.io</Anchor>
                </Vlayout>
                <List doSelect={this.doSelect.bind(this)}>
                    <Anchor >Open File</Anchor>
                    <Anchor >Save File</Anchor>
                    <Anchor >Close File</Anchor>
                    <Anchor href='http://dennischen.github.io'>dennischen.github.io</Anchor>
                </List>
            </Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>, dom);
}