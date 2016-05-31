/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import w = require('../main/widget');
import i = require('../main/input');
import l = require('../main/layout');
import p = require('../main/popup');
import Util = require('../main/util');

let dismissTimeout = 1500;
let animation =  {effect: w.AniEffect.fade };

export interface State {
    autoDismiss?: boolean
    targetHPos?: w.HPos
    targetVPos?: w.VPos
    selfHPos?: w.HPos
    selfVPos?: w.VPos
    dismissTimeout?: number
    animation?: w.Animation
    adjustXY?:boolean
    adjust?:p.AdjustMethod
}
export class App extends React.Component<any, State>{
    constructor(props: any) {
        super(props);
        this.state = {
            autoDismiss:false, dismissTimeout: dismissTimeout,
            targetHPos: w.HPos.right, targetVPos: w.VPos.bottom,
            selfHPos: w.HPos.left, selfVPos: w.VPos.top,
            animation: animation,adjust:p.AdjustMethod.shift
        };
    }
    componentDidMount(): void {
    }
    
    getShowOpt():p.ShowOption{
        let opt:p.ShowOption = {
            autoDismiss: this.state.autoDismiss,
            targetHPos: this.state.targetHPos,
            targetVPos: this.state.targetVPos,
            selfHPos: this.state.selfHPos,
            selfVPos: this.state.selfVPos,
            dismissTimeout: this.state.dismissTimeout,
            adjust:this.state.adjust
        }
        if(this.state.adjustXY){
            opt.adjustX=5;
            opt.adjustY=30;
        }
        return opt;
    }
    
    handleShow(event: Event) {
        event.stopPropagation();
        let pop = this.refs['popup'] as p.Popup;
        pop.show(event.target as any, this.getShowOpt());
    }
    handleShowPos(event: MouseEvent) {
        let pop = this.refs['popup'] as p.Popup;
        
        pop.show(event.target as any, Util.supplyProps(this.getShowOpt(),{targetMouseEvent:event}));
    }
    handleHide() {
        event.stopPropagation();
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
    handleAdjust(adjust: p.AdjustMethod) {
        this.setState({ adjust: adjust });
    }
    handleAutoDismiss(checked: boolean) {
        this.setState({ autoDismiss: checked});
    }
    handleDismissTimeout(checked: boolean) {
        this.setState({ dismissTimeout: checked ? dismissTimeout : undefined });
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
                        <i.Radiobox name='targetHPos' checked={this.state.targetHPos == w.HPos.left}
                            onChange={this.handleTargetHPos.bind(this, w.HPos.left) } label='Left'/>
                        <i.Radiobox name='targetHPos' checked={this.state.targetHPos == w.HPos.center}
                            onChange={this.handleTargetHPos.bind(this, w.HPos.center) } label='Center'/>
                        <i.Radiobox name='targetHPos' checked={this.state.targetHPos == w.HPos.right}
                            onChange={this.handleTargetHPos.bind(this, w.HPos.right) } label='Right'/>
                    </l.Hlayout>
                    <l.Hlayout align='middle' space={10}>
                        Target VPos:
                        <i.Radiobox name='targetVPos' checked={this.state.targetVPos == w.VPos.top}
                            onChange={this.handleTargetVPos.bind(this, w.VPos.top) } label='Top'/>
                        <i.Radiobox name='targetVPos' checked={this.state.targetVPos == w.VPos.middle}
                            onChange={this.handleTargetVPos.bind(this, w.VPos.middle) } label='Middle'/>
                        <i.Radiobox name='targetVPos' checked={this.state.targetVPos == w.VPos.bottom}
                            onChange={this.handleTargetVPos.bind(this, w.VPos.bottom) } label='Bottom'/>
                    </l.Hlayout>
                    <l.Hlayout align='middle' space={10}>
                        Self HPos:
                        <i.Radiobox name='selfHPos' checked={this.state.selfHPos == w.HPos.left}
                            onChange={this.handleSelfHPos.bind(this, w.HPos.left) } label='Left'/>
                        <i.Radiobox name='selfHPos' checked={this.state.selfHPos == w.HPos.center}
                            onChange={this.handleSelfHPos.bind(this, w.HPos.center) } label='Center'/>
                        <i.Radiobox name='selfHPos' checked={this.state.selfHPos == w.HPos.right}
                            onChange={this.handleSelfHPos.bind(this, w.HPos.right) } label='Right'/>
                    </l.Hlayout>
                    <l.Hlayout align='middle' space={10}>
                        Self VPos:
                        <i.Radiobox name='selfVPos' checked={this.state.selfVPos == w.VPos.top}
                            onChange={this.handleSelfVPos.bind(this, w.VPos.top) } label='Top'/>
                        <i.Radiobox name='selfVPos' checked={this.state.selfVPos == w.VPos.middle}
                            onChange={this.handleSelfVPos.bind(this, w.VPos.middle) } label='Middle'/>
                        <i.Radiobox name='selfVPos' checked={this.state.selfVPos == w.VPos.bottom}
                            onChange={this.handleSelfVPos.bind(this, w.VPos.bottom) } label='Bottom'/>
                    </l.Hlayout>
                    <l.Hlayout align='middle' space={10}>
                        Adjust:
                        <i.Radiobox name='adjust' checked={!this.state.adjust}
                            onChange={this.handleAdjust.bind(this, undefined) } label='None'/>
                        <i.Radiobox name='adjust' checked={this.state.adjust==p.AdjustMethod.shift}
                            onChange={this.handleAdjust.bind(this, p.AdjustMethod.shift) } label='Shift'/>
                        <i.Radiobox name='adjust' checked={this.state.adjust==p.AdjustMethod.flip}
                            onChange={this.handleAdjust.bind(this, p.AdjustMethod.flip) } label='Flip'/>
                    </l.Hlayout>
                    <l.Hlayout align='middle' space={10}>
                        <i.Checkbox checked={this.state.autoDismiss}
                            doCheck={this.handleAutoDismiss.bind(this) } label='Auto Dismiss'/>
                        <i.Checkbox checked={this.state.dismissTimeout > 0}
                            doCheck={this.handleDismissTimeout.bind(this) } label='Dismiss Timeout'/>
                        <i.Checkbox checked={this.state.animation ? true : false}
                            doCheck={this.handleAnimation.bind(this) } label='Animation'/>
                        <i.Checkbox checked={this.state.adjustXY?true:false}
                            doCheck={this.handleAdjustXY.bind(this) } label='AdjustXY'/>
                    </l.Hlayout>
                </l.Vlayout>
                
                <l.Box hflex={1}  vflex={1} align='middle center'>
                    <l.Box style={{ height: 400, width: 600, background: 'lightblue', overflow: 'auto' }}>
                        <l.Vlayout align='center' onClick={this.handleShowPos.bind(this) }>
                            Click other place to show popup follow the click position
                            <div style={{ height: 200, width: 800, background: 'lightpink' }} />
                            <l.Hlayout space={30}>
                                <button id='btn1' onClick={this.handleShow.bind(this) }>Show Popup by my corner</button>
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