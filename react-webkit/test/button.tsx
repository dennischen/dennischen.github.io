/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import {Button,Fonticon,Widget,Anchor} from '../main/widget';
import {Vlayout,Hlayout,Hgroup} from '../main/layout';
import p = require('../main/popup');
import ls = require('../main/list');

export class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    doShowMenu(){
        let pop = this.refs['popup'] as p.Popup;
        let target = (this.refs['popupBtn'] as Widget<any,any>).getDOM(); 
        if(pop.state.invisible){
            pop.show(target);
        }else{
            pop.hide();
        }
        
    }
    doSelectMenu(select: boolean, idx: number, item: any) {
        if(select){
            console.log("Selected "+idx);
            (this.refs['popup'] as p.Popup).hide();
            
        }
    }
    render() {
        return (
            <Vlayout vflex={1} hflex={1} style={{ padding: '10px' }} space={10}>
                <Hlayout hflex={1} style={{padding: '10px' }} space={6} >
                    <Button label="click me"/>
                </Hlayout>
                <Hlayout hflex={1} style={{padding: '10px' }} space={6}>
                    <Button> 
                        Button 1 <Fonticon className='fa fa-bars' /> 
                    </Button>
                    <Button disabled> 
                        <Fonticon className='fa fa-bars' /> Button 2 Disabled
                    </Button>
                </Hlayout>
                <Hlayout hflex={1} style={{padding: '10px', height:100 }}  space={6}>
                    <Button hflex={1} vflex={1}> 
                        Button 3 <Fonticon className='fa fa-bars' /> 
                    </Button>
                    <Button label="Button 4"> 
                    </Button>
                    <Button hflex={1}> 
                        <Fonticon className='fa fa-bars' /> Button 5 
                    </Button>
                </Hlayout>
                Buttongroup : 
                <Hgroup style={{padding: '10px'}} >
                    <Button > 
                        Button 6 <Fonticon className='fa fa-bars' /> 
                    </Button>
                    <Button label="Button 7 Disabled" disabled> 
                    </Button>
                    <Button > 
                        <Fonticon className='fa fa-bars' /> Button 8 
                    </Button>
                </Hgroup>
                <Hgroup hflex={1} style={{padding: '10px'}} >
                    <Button hflex={1} > 
                        Button 9 <Fonticon className='fa fa-bars' /> 
                    </Button>
                    <Button label="Button 10"> 
                    </Button>
                    <Button hflex={1}> 
                        <Fonticon className='fa fa-bars' /> Button 11 
                    </Button>
                </Hgroup>
                <Hgroup style={{padding: '10px'}} >
                    <Button  ref="popupBtn"> 
                        Menu 
                    </Button>
                    <Button id='toggleBtn' style={{paddingLeft:6,paddingRight:6}} onClick={this.doShowMenu.bind(this)}> 
                        <Fonticon className='fa fa-caret-down' /> 
                    </Button>
                </Hgroup>
                <p.Popup ref="popup" style={{padding:'2px 0px',fontSize:'0.9rem'}} showOption={{autoDismiss:true,autoDismissHolders:['#toggleBtn'],targetVPos:'bottom',targetHPos:'left'}} animation={{effect:'fade'}}>
                    <ls.List doSelect={this.doSelectMenu.bind(this)}>
                        <Anchor >Open File</Anchor>
                        <Anchor >Save File</Anchor>
                        <Anchor >Close File</Anchor>
                        <Anchor href='http://dennischen.github.io'>dennischen.github.io</Anchor>
                    </ls.List>
                </p.Popup>
            </Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}