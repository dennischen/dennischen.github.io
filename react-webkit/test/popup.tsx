/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import {AniEffect,HPos,VPos,Animation} from '../main/widget';
import {Box, Hlayout,Vlayout} from '../main/layout';
import {Popup,AdjustMethod,ShowOption} from '../main/popup';
import {Radiobox,Checkbox} from '../main/input';

//override zIndexStart of popup
// zIndexStart = 3000;

let dismissTimeout = 1500;
let animation =  {effect: AniEffect.fade };

export interface State {
    autoDismiss?: boolean
    targetHPos?: HPos
    targetVPos?: VPos
    selfHPos?: HPos
    selfVPos?: VPos
    dismissTimeout?: number
    animation?: Animation
    adjustXY?:boolean
    adjust?:AdjustMethod
}
export class App extends React.Component<any, State>{
    constructor(props: any) {
        super(props);
        this.state = {
            autoDismiss:false, dismissTimeout: dismissTimeout,
            targetHPos: HPos.right, targetVPos: VPos.bottom,
            selfHPos: HPos.left, selfVPos: VPos.top,
            animation: animation,adjust:AdjustMethod.shift
        };
    }
    componentDidMount(): void {
    }
    
    getShowOpt():ShowOption{
        let opt:ShowOption = {
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
        opt.adjustViewport = '#viewport';
        return opt;
    }
    
    handleShow(event: Event) {
        event.stopPropagation();
        let pop = this.refs['popup'] as Popup;
        pop.show(event.target as any, this.getShowOpt());
    }
    handleShowMousePos(event: MouseEvent) {
        let pop = this.refs['popup'] as Popup;
        pop.show(event as any, this.getShowOpt());
    }
    handleShowNested(event: MouseEvent) {
        let pop = this.refs['popupNested'] as Popup;
        pop.show(event as any, this.getShowOpt());
    }
    handleHide(event: MouseEvent) {
        event.stopPropagation();
        let pop = this.refs['popup'] as Popup;
        pop.hide();
        pop = this.refs['popupNested'] as Popup;
        pop.hide();
    }
    handleTargetHPos(pos: HPos) {
        this.setState({ targetHPos: pos });
    }
    handleTargetVPos(pos: VPos) {
        this.setState({ targetVPos: pos });
    }
    handleSelfHPos(pos: HPos) {
        this.setState({ selfHPos: pos });
    }
    handleSelfVPos(pos: VPos) {
        this.setState({ selfVPos: pos });
    }
    handleAdjust(adjust: AdjustMethod) {
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
        let pop = this.refs['popup'] as Popup;
        if(!pop.state.invisible){
            pop.reposition('#btn1',this.getShowOpt());
        }
    }
    render() {
        return (
            <Box hflex={1}  vflex={1} style={{ background: 'lightgreen', padding: 30 }} >
                <Vlayout  space={10}>
                    <Hlayout align='middle' space={10}>
                        Target HPos:
                        <Radiobox name='targetHPos' checked={this.state.targetHPos == HPos.left}
                            onChange={this.handleTargetHPos.bind(this, HPos.left) } label='Left'/>
                        <Radiobox name='targetHPos' checked={this.state.targetHPos == HPos.center}
                            onChange={this.handleTargetHPos.bind(this, HPos.center) } label='Center'/>
                        <Radiobox name='targetHPos' checked={this.state.targetHPos == HPos.right}
                            onChange={this.handleTargetHPos.bind(this, HPos.right) } label='Right'/>
                    </Hlayout>
                    <Hlayout align='middle' space={10}>
                        Target VPos:
                        <Radiobox name='targetVPos' checked={this.state.targetVPos == VPos.top}
                            onChange={this.handleTargetVPos.bind(this, VPos.top) } label='Top'/>
                        <Radiobox name='targetVPos' checked={this.state.targetVPos == VPos.middle}
                            onChange={this.handleTargetVPos.bind(this, VPos.middle) } label='Middle'/>
                        <Radiobox name='targetVPos' checked={this.state.targetVPos == VPos.bottom}
                            onChange={this.handleTargetVPos.bind(this, VPos.bottom) } label='Bottom'/>
                    </Hlayout>
                    <Hlayout align='middle' space={10}>
                        Self HPos:
                        <Radiobox name='selfHPos' checked={this.state.selfHPos == HPos.left}
                            onChange={this.handleSelfHPos.bind(this, HPos.left) } label='Left'/>
                        <Radiobox name='selfHPos' checked={this.state.selfHPos == HPos.center}
                            onChange={this.handleSelfHPos.bind(this, HPos.center) } label='Center'/>
                        <Radiobox name='selfHPos' checked={this.state.selfHPos == HPos.right}
                            onChange={this.handleSelfHPos.bind(this, HPos.right) } label='Right'/>
                    </Hlayout>
                    <Hlayout align='middle' space={10}>
                        Self VPos:
                        <Radiobox name='selfVPos' checked={this.state.selfVPos == VPos.top}
                            onChange={this.handleSelfVPos.bind(this, VPos.top) } label='Top'/>
                        <Radiobox name='selfVPos' checked={this.state.selfVPos == VPos.middle}
                            onChange={this.handleSelfVPos.bind(this, VPos.middle) } label='Middle'/>
                        <Radiobox name='selfVPos' checked={this.state.selfVPos == VPos.bottom}
                            onChange={this.handleSelfVPos.bind(this, VPos.bottom) } label='Bottom'/>
                    </Hlayout>
                    <Hlayout align='middle' space={10}>
                        Adjust:
                        <Radiobox name='adjust' checked={!this.state.adjust}
                            onChange={this.handleAdjust.bind(this, undefined) } label='None'/>
                        <Radiobox name='adjust' checked={this.state.adjust==AdjustMethod.shift}
                            onChange={this.handleAdjust.bind(this, AdjustMethod.shift) } label='Shift'/>
                        <Radiobox name='adjust' checked={this.state.adjust==AdjustMethod.flip}
                            onChange={this.handleAdjust.bind(this, AdjustMethod.flip) } label='Flip'/>
                    </Hlayout>
                    <Hlayout align='middle' space={10}>
                        <Checkbox checked={this.state.autoDismiss}
                            doCheck={this.handleAutoDismiss.bind(this) } label='Auto Dismiss'/>
                        <Checkbox checked={this.state.dismissTimeout > 0}
                            doCheck={this.handleDismissTimeout.bind(this) } label='Dismiss Timeout'/>
                        <Checkbox checked={this.state.animation ? true : false}
                            doCheck={this.handleAnimation.bind(this) } label='Animation'/>
                        <Checkbox checked={this.state.adjustXY?true:false}
                            doCheck={this.handleAdjustXY.bind(this) } label='AdjustXY'/>
                    </Hlayout>
                </Vlayout>
                
                <Box hflex={1}  vflex={1} align='middle center'>
                    <Box id='viewport' style={{ height: 400, width: 600, background: 'lightblue', overflow: 'auto' }}>
                        <Vlayout align='center' onClick={this.handleShowMousePos.bind(this) }>
                            Click other place to show popup follow the click position
                            <div style={{ height: 200, width: 800, background: 'lightpink' }} />
                            <Hlayout space={30}>
                                <button id='btn1' onClick={this.handleShow.bind(this) }>Show Popup by my corner</button>
                                <button onClick={this.handleHide.bind(this) }>Hide Popup</button>
                            </Hlayout>
                            <div style={{ height: 200, width: 800, background: 'lightpink' }}/>
                        </Vlayout>                        
                        <Popup ref='popupNested' style={{ width: 300, padding: 4 }}>
                            This is nested popup <br/>
                        </Popup>
                        <Popup ref='popup' style={{ width: 300, padding: 4 }} onClick={this.handleShowNested.bind(this) }
                            animation={this.state.animation}>
                            Pop-up ads or pop-ups are often forms of online advertising on the World Wide Web
                            intended to attract web traffic or capture email addresses.
                        </Popup>
                    </Box>
                </Box>
            </Box>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>, dom);
}