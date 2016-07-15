/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import {AniEffect,IndexSelection} from '../main/widget';
import {Box, Hlayout,Vlayout} from '../main/layout';;
import {List} from'../main/list';
import {Checkbox,Radiobox} from'../main/input';
import {Calendar} from'../main/calendar';

export class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = { clickCount: 0, invisible: false, selection: new IndexSelection() };
    }
    handleClick() {
        let c = this.state.clickCount + 1;
        this.setState({ clickCount: c, invisible: !this.state.invisible });
    }
    render() {
        let doSelect = (select: boolean, idx: number, item: any) => {
            if (select) {
                this.setState({ selection: this.state.selection.select(idx) });
            } else {
                this.setState({ selection: this.state.selection.unselect(idx) });
            }
        }

        return (
            <Vlayout vflex={1} hflex={1} style={{ padding: '2px' }}>
                <button onClick={() => { this.handleClick() } }>Toggle visibility {this.state.clickCount}</button>
                <Hlayout invisible={this.state.invisible} style={{ background: 'lightblue', padding: '2px' }} hflex={1} animation={{ effect: AniEffect.fade }}>
                    <Box hflex={1}><span>abc {this.state.clickCount}</span> </Box>
                    <Box hflex={1}><span>def {this.state.clickCount}</span> </Box>
                    <span><span>this is long long long<br/> long long long long text</span></span>
                </Hlayout>
                <Hlayout style={{ background: 'gray', padding: '2px' }} vflex={1} space={10}>
                    <span>123  {this.state.clickCount} </span>
                    <Vlayout style={{ background: 'lightpink', padding: '2px', overflowY: 'auto' }} hflex={1} vflex={1}>
                        <span>xyz1 {this.state.clickCount} </span>
                        <Calendar hflex={1} vflex={1}/>
                    </Vlayout>
                    <Vlayout invisible={this.state.invisible} style={{ background: 'lightseagreen', padding: '2px' }} hflex={2} animation={{ effect: AniEffect.slide }}>
                        <span>xyz2 {this.state.clickCount} </span>
                        <span>ijk2 {this.state.clickCount} </span>
                    </Vlayout>
                    <Vlayout style={{ background: 'lightskyblue', padding: '2px' }} hflex={1}>
                        <span>xyz3 {this.state.clickCount} </span>
                        <span>ijk3 {this.state.clickCount} </span>
                    </Vlayout>
                    <span>456  {this.state.clickCount} </span>
                </Hlayout>
                <List style={{ background: 'lightblue', padding: '2px' }} 
                    vflex={1} hflex={1} selection={this.state.selection}
                    doSelect={doSelect}>
                    <span>MULTIPLE Selection List</span>
                    <span>DEF</span>
                    <span>IJK</span>
                    <span>LMN</span>
                    <span>XYZ</span>
                </List>
               <Hlayout tooltip="A tool tip">
                    <Checkbox label='A Checkbox'/>
                    <Radiobox label='A Radio' tooltip='Another tool tip'/>
                </Hlayout>
            </Vlayout>
        )
    }
}

ReactDOM.render(
    <App />
    ,
    document.getElementById('content')
);