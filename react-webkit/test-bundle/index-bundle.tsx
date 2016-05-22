/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
/// <reference path="../main/react-webkit.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import wbk = require('react-webkit');
let w = wbk.Widget;
let l = wbk.Layout;

export class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = { clickCount: 0, hidden: false, selection: new w.IndexSelection() };
    }
    handleClick() {
        let c = this.state.clickCount + 1;
        this.setState({ clickCount: c, hidden: !this.state.hidden });
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
                <l.Hlayout hidden={this.state.hidden} style={{ background: 'lightblue', padding: '2px' }} hflex={1} animation={{ effect: w.AniEffect.fade }}>
                    <l.Box hflex={1}><span>abc {this.state.clickCount}</span> </l.Box>
                    <l.Box hflex={1}><span>def {this.state.clickCount}</span> </l.Box>
                    <span><span>this is long long long<br/> long long long long text</span></span>
                </l.Hlayout>
                <l.Hlayout style={{ background: 'gray', padding: '2px' }} vflex={1} space={10}>
                    <span>123  {this.state.clickCount} </span>
                    <l.Vlayout style={{ background: 'lightpink', padding: '2px', overflowY: 'auto' }} hflex={1} vflex={1}>
                        <span>xyz1 {this.state.clickCount} </span>
                        <span>ijk1 {this.state.clickCount} lkasdl falsjdfl asjdlfa jsdlfjal sdfjlasj dflasjdf lajsdlfjas ldfkjald falsdjl asdjfls djf</span>
                    </l.Vlayout>
                    <l.Vlayout hidden={this.state.hidden} style={{ background: 'lightseagreen', padding: '2px' }} hflex={2} animation={{ effect: w.AniEffect.slide }}>
                        <span>xyz2 {this.state.clickCount} </span>
                        <span>ijk2 {this.state.clickCount} </span>
                    </l.Vlayout>
                    <l.Vlayout style={{ background: 'lightskyblue', padding: '2px' }} hflex={1}>
                        <span>xyz3 {this.state.clickCount} </span>
                        <span>ijk3 {this.state.clickCount} </span>
                    </l.Vlayout>
                    <span>456  {this.state.clickCount} </span>
                </l.Hlayout>
                <w.List style={{ background: 'lightblue', padding: '2px' }} 
                    vflex={1} hflex={1} selection={this.state.selection}
                    doSelect={doSelect}>
                    <span>MULTIPLE Selection List</span>
                    <span>DEF</span>
                    <span>IJK</span>
                    <span>LMN</span>
                    <span>XYZ</span>
                </w.List>
                <w.Checkbox label='A Checkbox'></w.Checkbox>
            </l.Vlayout>
        )
    }
}

ReactDOM.render(
    <App />
    ,
    document.getElementById('content-index')
);