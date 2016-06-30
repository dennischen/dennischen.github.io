/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
import Jq = require('jquery');

import w = require('../main/widget');
import l = require('../main/layout');
import p = require('../main/popup');
import ls = require('../main/list');

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
            <l.Vlayout vflex={1} hflex={1} style={{ padding: '10px' }} space={10}>
                <l.Vlayout space={6} >
                    <w.Anchor href="#A" onClick={onClick} tooltip='Open the file' >Open File</w.Anchor>
                    <w.Anchor href="#B" onClick={onClick} tooltip='Save the file' tooltipOption={tipOpt}>Save File</w.Anchor>
                    <w.Anchor href="#C" onClick={onClick} tooltip='Close the file' tooltipOption={tipOpt}>Close File</w.Anchor>
                    <w.Anchor href='http://dennischen.github.io'  onClick={onClick}>dennischen.github.io</w.Anchor>
                </l.Vlayout>
                <ls.List doSelect={this.doSelect.bind(this)}>
                    <w.Anchor >Open File</w.Anchor>
                    <w.Anchor >Save File</w.Anchor>
                    <w.Anchor >Close File</w.Anchor>
                    <w.Anchor href='http://dennischen.github.io'>dennischen.github.io</w.Anchor>
                </ls.List>
            </l.Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>, dom);
}