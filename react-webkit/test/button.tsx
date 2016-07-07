/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import w = require('../main/widget');
import l = require('../main/layout');
import p = require('../main/popup');
import ls = require('../main/list');

export class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    doShowMenu(){
        let pop = this.refs['popup'] as p.Popup;
        let target = (this.refs['popupBtn'] as w.Widget<any,any>).getDOM(); 
        if(pop.state.visible){
            pop.hide();
        }else{
            pop.show(target);
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
            <l.Vlayout vflex={1} hflex={1} style={{ padding: '10px' }} space={10}>
                <l.Hlayout hflex={1} style={{padding: '10px' }} space={6} >
                    <w.Button label="click me"/>
                </l.Hlayout>
                <l.Hlayout hflex={1} style={{padding: '10px' }} space={6}>
                    <w.Button> 
                        Button 1 <w.Fonticon className='fa fa-bars' /> 
                    </w.Button>
                    <w.Button disabled> 
                        <w.Fonticon className='fa fa-bars' /> Button 2 Disabled
                    </w.Button>
                </l.Hlayout>
                <l.Hlayout hflex={1} style={{padding: '10px', height:100 }}  space={6}>
                    <w.Button hflex={1} vflex={1}> 
                        Button 3 <w.Fonticon className='fa fa-bars' /> 
                    </w.Button>
                    <w.Button label="Button 4"> 
                    </w.Button>
                    <w.Button hflex={1}> 
                        <w.Fonticon className='fa fa-bars' /> Button 5 
                    </w.Button>
                </l.Hlayout>
                Buttongroup : 
                <l.Buttongroup style={{padding: '10px'}} >
                    <w.Button > 
                        Button 6 <w.Fonticon className='fa fa-bars' /> 
                    </w.Button>
                    <w.Button label="Button 7 Disabled" disabled> 
                    </w.Button>
                    <w.Button > 
                        <w.Fonticon className='fa fa-bars' /> Button 8 
                    </w.Button>
                </l.Buttongroup>
                <l.Buttongroup hflex={1} style={{padding: '10px'}} >
                    <w.Button hflex={1} > 
                        Button 9 <w.Fonticon className='fa fa-bars' /> 
                    </w.Button>
                    <w.Button label="Button 10"> 
                    </w.Button>
                    <w.Button hflex={1}> 
                        <w.Fonticon className='fa fa-bars' /> Button 11 
                    </w.Button>
                </l.Buttongroup>
                <l.Buttongroup style={{padding: '10px'}} >
                    <w.Button  ref="popupBtn"> 
                        Menu 
                    </w.Button>
                    <w.Button id='toggleBtn' style={{paddingLeft:6,paddingRight:6}} onClick={this.doShowMenu.bind(this)}> 
                        <w.Fonticon className='fa fa-caret-down' /> 
                    </w.Button>
                </l.Buttongroup>
                <p.Popup ref="popup" style={{padding:'2px 0px',fontSize:'0.9rem'}} showOption={{autoDismiss:true,autoDismissHolders:['#toggleBtn'],targetVPos:'bottom',targetHPos:'left'}} animation={{effect:'fade'}}>
                    <ls.List doSelect={this.doSelectMenu.bind(this)}>
                        <w.Anchor >Open File</w.Anchor>
                        <w.Anchor >Save File</w.Anchor>
                        <w.Anchor >Close File</w.Anchor>
                        <w.Anchor href='http://dennischen.github.io'>dennischen.github.io</w.Anchor>
                    </ls.List>
                </p.Popup>
            </l.Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}