/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import w = require('../main/widget');
import i = require('../main/input');
import l = require('../main/layout');
import ls = require('../main/list');
import dt = require('../main/datetime');

export class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = { clickCount: 0, visible: true, selection: new w.IndexSelection() };
    }
    handleClick() {
        let c = this.state.clickCount + 1;
        this.setState({ clickCount: c, visible: !this.state.visible });
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
            <l.Vlayout vflex={1} hflex={1} style={{ padding: '2px' }}>
                <button onClick={() => { this.handleClick() } }>Toggle visibility {this.state.clickCount}</button>
                <l.Hlayout visible={this.state.visible} style={{ background: 'lightblue', padding: '2px' }} hflex={1} animation={{ effect: w.AniEffect.fade }}>
                    <l.Box hflex={1}><span>abc {this.state.clickCount}</span> </l.Box>
                    <l.Box hflex={1}><span>def {this.state.clickCount}</span> </l.Box>
                    <span><span>this is long long long<br/> long long long long text</span></span>
                </l.Hlayout>
                <l.Hlayout style={{ background: 'gray', padding: '2px' }} vflex={1} space={10}>
                    <span>123  {this.state.clickCount} </span>
                    <l.Vlayout style={{ background: 'lightpink', padding: '2px', overflowY: 'auto' }} hflex={1} vflex={1}>
                        <span>xyz1 {this.state.clickCount} </span>
                        <dt.Calendar hflex={1} vflex={1}/>
                    </l.Vlayout>
                    <l.Vlayout visible={this.state.visible} style={{ background: 'lightseagreen', padding: '2px' }} hflex={2} animation={{ effect: w.AniEffect.slide }}>
                        <span>xyz2 {this.state.clickCount} </span>
                        <span>ijk2 {this.state.clickCount} </span>
                    </l.Vlayout>
                    <l.Vlayout style={{ background: 'lightskyblue', padding: '2px' }} hflex={1}>
                        <span>xyz3 {this.state.clickCount} </span>
                        <span>ijk3 {this.state.clickCount} </span>
                    </l.Vlayout>
                    <span>456  {this.state.clickCount} </span>
                </l.Hlayout>
                <ls.List style={{ background: 'lightblue', padding: '2px' }} 
                    vflex={1} hflex={1} selection={this.state.selection}
                    doSelect={doSelect}>
                    <span>MULTIPLE Selection List</span>
                    <span>DEF</span>
                    <span>IJK</span>
                    <span>LMN</span>
                    <span>XYZ</span>
                </ls.List>
               <l.Hlayout tooltip="A tool tip">
                    <i.Checkbox label='A Checkbox'/>
                    <i.Radiobox label='A Radio' tooltip='Another tool tip'/>
                </l.Hlayout>
            </l.Vlayout>
        )
    }
}

ReactDOM.render(
    <App />
    ,
    document.getElementById('content')
);