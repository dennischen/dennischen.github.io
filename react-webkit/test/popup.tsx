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
                <l.Vlayout>
                    <l.Hlayout align='middle'>
                        Target HPos:
                        <input id="tl" type='radio' name='targetHPos' checked={this.state.targetHPos == w.HPos.left}
                            onChange={this.handleTargetHPos.bind(this, w.HPos.left) } /><label htmlFor='tl'>Left</label>
                        <input id="tc" type='radio' name='targetHPos' checked={this.state.targetHPos == w.HPos.center}
                            onChange={this.handleTargetHPos.bind(this, w.HPos.center) } /><label htmlFor='tc'>Center</label>
                        <input id="tr" type='radio' name='targetHPos' checked={this.state.targetHPos == w.HPos.right}
                            onChange={this.handleTargetHPos.bind(this, w.HPos.right) } /><label htmlFor='tr'>Right</label>
                    </l.Hlayout>
                    <l.Hlayout align='middle'>
                        Target VPos:
                        <input id="tt" type='radio' name='targetVPos' checked={this.state.targetVPos == w.VPos.top}
                            onChange={this.handleTargetVPos.bind(this, w.VPos.top) } /><label htmlFor='tt'>Top</label>
                        <input id="tm" type='radio' name='targetVPos' checked={this.state.targetVPos == w.VPos.middle}
                            onChange={this.handleTargetVPos.bind(this, w.VPos.middle) } /><label htmlFor='tm'>Middle</label>
                        <input id="tb" type='radio' name='targetVPos' checked={this.state.targetVPos == w.VPos.bottom}
                            onChange={this.handleTargetVPos.bind(this, w.VPos.bottom) } /><label htmlFor='tb'>Bottom</label>
                    </l.Hlayout>
                    <l.Hlayout align='middle'>
                        Self HPos:
                        <input id="sl" type='radio' name='selfHPos' checked={this.state.selfHPos == w.HPos.left}
                            onChange={this.handleSelfHPos.bind(this, w.HPos.left) } /><label htmlFor='sl'>Left</label>
                        <input id="sc" type='radio' name='selfHPos' checked={this.state.selfHPos == w.HPos.center}
                            onChange={this.handleSelfHPos.bind(this, w.HPos.center) } /><label htmlFor='sc'>Center</label>
                        <input id="sr" type='radio' name='selfHPos' checked={this.state.selfHPos == w.HPos.right}
                            onChange={this.handleSelfHPos.bind(this, w.HPos.right) } /><label htmlFor='sr'>Right</label>
                    </l.Hlayout>
                    <l.Hlayout align='middle'>
                        Self VPos:
                        <input id="st" type='radio' name='selfVPos' checked={this.state.selfVPos == w.VPos.top}
                            onChange={this.handleSelfVPos.bind(this, w.VPos.top) } /><label htmlFor='st'>Top</label>
                        <input id="sm" type='radio' name='selfVPos' checked={this.state.selfVPos == w.VPos.middle}
                            onChange={this.handleSelfVPos.bind(this, w.VPos.middle) } /><label htmlFor='sm'>Middle</label>
                        <input id="sb" type='radio' name='selfVPos' checked={this.state.selfVPos == w.VPos.bottom}
                            onChange={this.handleSelfVPos.bind(this, w.VPos.bottom) } /><label htmlFor='sb'>Bottom</label>
                    </l.Hlayout>
                    <l.Hlayout align='middle' space={10}>
                        <w.Checkbox id='autoDismiss' checked={this.state.autoDismiss > 0}
                            doCheck={this.handleAutoDismiss.bind(this) } label='Auto dismiss'/>
                        <w.Checkbox id='animation' checked={this.state.animation ? true : false}
                            doCheck={this.handleAnimation.bind(this) } label='Animation'/>
                        <w.Checkbox id='adjustXY' checked={this.state.adjustXY?true:false}
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