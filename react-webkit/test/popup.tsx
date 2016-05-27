/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import w = require('../main/widget');
import l = require('../main/layout');
import p = require('../main/popup');

let autoDismiss = 1500;
let animation =  {effect: w.AniEffect.fade };

export interface State {
    targetHPos?: w.HPos
    targetVPos?: w.VPos
    selfHPos?: w.HPos
    selfVPos?: w.VPos
    autoDismiss?: number
    animation?: w.Animation
    adjustXY?:boolean
}
export class App extends React.Component<any, State>{
    constructor(props: any) {
        super(props);
        this.state = {
            targetHPos: w.HPos.right, targetVPos: w.VPos.bottom,
            selfHPos: w.HPos.left, selfVPos: w.VPos.top,
            autoDismiss: 0, animation: animation
        };
    }
    componentDidMount(): void {
    }
    
    getShowOpt():p.ShowOption{
        let opt:p.ShowOption = {
            targetHPos: this.state.targetHPos,
            targetVPos: this.state.targetVPos,
            selfHPos: this.state.selfHPos,
            selfVPos: this.state.selfVPos,
            autoDismiss: this.state.autoDismiss
        }
        if(this.state.adjustXY){
            opt.adjustX=5;
            opt.adjustY=30;
        }
        return opt;
    }
    
    handleShow(event: Event) {
        let pop = this.refs['popup'] as p.Popup;
        
        pop.show(event.target as any, this.getShowOpt());
    }
    handleHide() {
        let pop = this.refs['popup'] as p.Popup;
        pop.hide();
    }
    handleTargetHPos(pos: w.HPos) {
        this.setState({ targetHPos: pos });
    }
    handleTargetVPos(pos: w.VPos) {
        this.setState({ targetVPos: pos });
    }
    handleSelfHPos(pos: w.HPos) {
        this.setState({ selfHPos: pos });
    }
    handleSelfVPos(pos: w.VPos) {
        this.setState({ selfVPos: pos });
    }
    handleAutoDismiss(checked: boolean) {
        this.setState({ autoDismiss: checked ? autoDismiss : undefined });
    }
    handleAnimation(checked: boolean) {
        this.setState({ animation: checked ? animation : undefined });
    }
    handleAdjustXY(checked: boolean) {
        this.setState({ adjustXY: checked ? true : undefined });
    }
    componentDidUpdate(prevProps: any, prevState: any) {
        let pop = this.refs['popup'] as p.Popup;
        if(!pop.state.hidden){
            pop.reposition('#btn1',this.getShowOpt());
        }
    }
    render() {
        return (
            <l.Box hflex={1}  vflex={1} style={{ background: 'lightgreen', padding: 30 }} >
                <l.Vlayout  space={10}>
                    <l.Hlayout align='middle' space={10}>
                        Target HPos:
                        <w.Radiobox name='targetHPos' checked={this.state.targetHPos == w.HPos.left}
                            onChange={this.handleTargetHPos.bind(this, w.HPos.left) } label='Left'/>
                        <w.Radiobox name='targetHPos' checked={this.state.targetHPos == w.HPos.center}
                            onChange={this.handleTargetHPos.bind(this, w.HPos.center) } label='Center'/>
                        <w.Radiobox name='targetHPos' checked={this.state.targetHPos == w.HPos.right}
                            onChange={this.handleTargetHPos.bind(this, w.HPos.right) } label='Right'/>
                    </l.Hlayout>
                    <l.Hlayout align='middle' space={10}>
                        Target VPos:
                        <w.Radiobox name='targetVPos' checked={this.state.targetVPos == w.VPos.top}
                            onChange={this.handleTargetVPos.bind(this, w.VPos.top) } label='Top'/>
                        <w.Radiobox name='targetVPos' checked={this.state.targetVPos == w.VPos.middle}
                            onChange={this.handleTargetVPos.bind(this, w.VPos.middle) } label='Middle'/>
                        <w.Radiobox name='targetVPos' checked={this.state.targetVPos == w.VPos.bottom}
                            onChange={this.handleTargetVPos.bind(this, w.VPos.bottom) } label='Bottom'/>
                    </l.Hlayout>
                    <l.Hlayout align='middle' space={10}>
                        Self HPos:
                        <w.Radiobox name='selfHPos' checked={this.state.selfHPos == w.HPos.left}
                            onChange={this.handleSelfHPos.bind(this, w.HPos.left) } label='Left'/>
                        <w.Radiobox name='selfHPos' checked={this.state.selfHPos == w.HPos.center}
                            onChange={this.handleSelfHPos.bind(this, w.HPos.center) } label='Center'/>
                        <w.Radiobox name='selfHPos' checked={this.state.selfHPos == w.HPos.right}
                            onChange={this.handleSelfHPos.bind(this, w.HPos.right) } label='Right'/>
                    </l.Hlayout>
                    <l.Hlayout align='middle' space={10}>
                        Self VPos:
                        <w.Radiobox name='selfVPos' checked={this.state.selfVPos == w.VPos.top}
                            onChange={this.handleSelfVPos.bind(this, w.VPos.top) } label='Top'/>
                        <w.Radiobox name='selfVPos' checked={this.state.selfVPos == w.VPos.middle}
                            onChange={this.handleSelfVPos.bind(this, w.VPos.middle) } label='Middle'/>
                        <w.Radiobox name='selfVPos' checked={this.state.selfVPos == w.VPos.bottom}
                            onChange={this.handleSelfVPos.bind(this, w.VPos.bottom) } label='Bottom'/>
                    </l.Hlayout>
                    <l.Hlayout align='middle' space={10}>
                        <w.Checkbox checked={this.state.autoDismiss > 0}
                            doCheck={this.handleAutoDismiss.bind(this) } label='Auto dismiss'/>
                        <w.Checkbox checked={this.state.animation ? true : false}
                            doCheck={this.handleAnimation.bind(this) } label='Animation'/>
                        <w.Checkbox checked={this.state.adjustXY?true:false}
                            doCheck={this.handleAdjustXY.bind(this) } label='AdjustXY'/>
                    </l.Hlayout>
                </l.Vlayout>
                <l.Box hflex={1}  vflex={1} align='middle center'>
                    <l.Box style={{ height: 400, width: 600, background: 'lightblue', overflow: 'auto' }}>
                        <l.Vlayout align='center'>
                            <div style={{ height: 200, width: 800, background: 'lightpink' }}/>
                            <l.Hlayout space={30}>
                                <button id='btn1' onClick={this.handleShow.bind(this) }>Show Popup</button>
                                <button onClick={this.handleShow.bind(this) }>Show By Click Position</button>
                                <button onClick={this.handleHide.bind(this) }>Hide Popup</button>
                            </l.Hlayout>
                            <div style={{ height: 200, width: 800, background: 'lightpink' }}/>
                        </l.Vlayout>
                        <p.Popup ref='popup' style={{ border: '1px solid', width: 300, background: '#eee', padding: 4 }}
                            animation={this.state.animation}>
                            Pop-up ads or pop-ups are often forms of online advertising on the World Wide Web
                            intended to attract web traffic or capture email addresses.
                        </p.Popup>
                    </l.Box>
                </l.Box>
            </l.Box>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>, dom);
}