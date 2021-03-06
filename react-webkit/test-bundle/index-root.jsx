'use strict'

var wk = ReactWebKit;
var w = wk.Widget;
var i = wk.Input;
var l = wk.Layout;
var ls = wk.List;
var cal = wk.Calendar;
var m = wk.Menu;

var RootApp = React.createClass({
    getInitialState: function() {
        return {clickCount: 0, invisible: false, selection: new w.IndexSelection() };
    },
    handleClick:function() {
        let c = this.state.clickCount + 1;
        this.setState({ clickCount: c, invisible: !this.state.invisible });
    },
    render:function() {
        let doSelect = (select, idx, item) => {
            if (select) {
                this.setState({ selection: this.state.selection.select(idx) });
            } else {
                this.setState({ selection: this.state.selection.unselect(idx) });
            }
        }

        return (
            <l.Vlayout vflex={1} hflex={1} style={{ padding: '2px' }}>
                <button onClick={() => { this.handleClick() } }>Toggle visibility {this.state.clickCount}</button>
                <l.Hlayout invisible={this.state.invisible} style={{ background: 'lightblue', padding: '2px' }} hflex={1} animation={{ effect: w.AniEffect.fade }}>
                    <l.Box hflex={1}><span>abc {this.state.clickCount}</span> </l.Box>
                    <l.Box hflex={1}><span>def {this.state.clickCount}</span> </l.Box>
                    <span><span>this is long long long<br/> long long long long text</span></span>
                </l.Hlayout>
                <l.Hlayout style={{ background: 'gray', padding: '2px' }} vflex={1} space={10}>
                    <span>123  {this.state.clickCount} </span>
                    <l.Vlayout style={{ background: 'lightpink', padding: '2px' }} hflex={1} vflex={1}>
                        <span>xyz1 {this.state.clickCount} </span>
                        <cal.Datebox/>
                        <cal.Calendar hflex={1} vflex={1}/>
                    </l.Vlayout>
                    <l.Vlayout invisible={this.state.invisible} style={{ background: 'lightseagreen', padding: '2px' }} hflex={2} animation={{ effect: w.AniEffect.slide }}>
                        <span>xyz2 {this.state.clickCount} </span>
                        <m.MenuItem label='Copy'  value='copy' />
                        <m.MenuItem label='Paste' />
                        <m.MenuItem label='Preferences'  popupSide='right'>
                            <l.Vlayout>
                                <m.MenuItem label='Font' />
                                <m.MenuItem label='Color' />
                                <m.MenuItem label='Format' />
                            </l.Vlayout>
                        </m.MenuItem>
                        <m.MenuItem label='Disabled' disabled={true}  />
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
                    <span>AAA</span>
                </ls.List>
                <l.Hlayout align='middle' space={4} tooltip='A tool tip'>
                    <i.Checkbox label='A Checkbox'/>
                    <i.Radiobox label='A Radio'/>
                    <i.Textbox tooltip='Another tool tip'/>
                    <cal.Datebox/>
                </l.Hlayout>
            </l.Vlayout>
        )
    }
});

RootApp.render = function(dom){
    ReactDOM.render( <RootApp/> , dom);
}