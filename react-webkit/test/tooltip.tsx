/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
import Jq = require('jquery');

import {Button} from '../main/widget';
import {Box, Vlayout, Hlayout} from '../main/layout';
import {Textbox} from '../main/input';

let tipOpt = {
    position: {
        //target not on default which is mouse
        target: false,
    }
}
//http://qtip2.com/options#position
let ltOpt = Jq.extend(true, {
    position: {
        my: 'right bottom',
        at: 'left top',
    }
}, tipOpt);
let ctOpt = Jq.extend(true, {
    position: {
        my: 'bottom center',
        at: 'top center',
    }
}, tipOpt);
let rtOpt = Jq.extend(true, {
    position: {
        my: 'left bottom',
        at: 'right top',
    }
}, tipOpt);

let lcOpt = Jq.extend(true, {
    position: {
        my: 'right center',
        at: 'left center',
    }
}, tipOpt);
let ccOpt = Jq.extend(true, {
    position: {
        my: 'center center',
        at: 'center center',
    }
}, tipOpt);
let rcOpt = Jq.extend(true, {
    position: {
        my: 'left center',
        at: 'right center',
    }
}, tipOpt);

let lbOpt = Jq.extend(true, {
    position: {
        my: 'right top',
        at: 'left bottom',
    }
}, tipOpt);
let cbOpt = Jq.extend(true, {
    position: {
        my: 'top center',
        at: 'bottom center',
    }
}, tipOpt);
let rbOpt = Jq.extend(true, {
    position: {
        my: 'left top',
        at: 'right bottom',
    }
}, tipOpt);

export class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = { tooltip: 'The tip text'}
    }
    doTooltipChange(value: string) {
        this.setState({ tooltip: value });
    }
    doToggleSuccess(){
        this.setState({success:!this.state.success});
    }
    doToggleInfo(){
        this.setState({info:!this.state.info});
    }
    doToggleWarning(){
        this.setState({warning:!this.state.warning});
    }
    doToggleError(){
        this.setState({error:!this.state.error});
    }
    render() {
        return (
            <Box hflex={1} vflex={1} align='center middle'>
                <Vlayout style={{ width: 400, height: 600 }} space={10}>
                    <Hlayout align='middle'>
                        Tip : <Textbox value={this.state.tooltip} doChange={this.doTooltipChange.bind(this) } />
                    </Hlayout>
                    <Box hflex={1} style={{ border: '1px solid', padding: 10 }} tooltip={this.state.tooltip}>
                        Mouse over here for tooltip
                    </Box>
                    <Hlayout vflex={1} hflex={1} style={{ padding: '2px' }} >
                        <Box align='left top' hflex={1} vflex={1} style={{ border: '1px solid' }} tooltip='Left Top' tooltipOption={ltOpt}>Left Top</Box>
                        <Box align='center top' hflex={1} vflex={1} style={{ border: '1px solid' }} tooltip='Center Top' tooltipOption={ctOpt}>Center Top</Box>
                        <Box align='right top' hflex={1} vflex={1} style={{ border: '1px solid' }} tooltip='Right Top' tooltipOption={rtOpt}>Right Top</Box>
                    </Hlayout>
                    <Hlayout vflex={1} hflex={1} style={{ padding: '2px' }} >
                        <Box align='left middle' hflex={1} vflex={1} style={{ border: '1px solid' }} tooltip='Left Middle' tooltipOption={lcOpt}>Left Middle</Box>
                        <Box align='center middle' hflex={1} vflex={1} style={{ border: '1px solid' }} tooltip='Center Middle' tooltipOption={ccOpt}>Center Middle</Box>
                        <Box align='right middle' hflex={1} vflex={1} style={{ border: '1px solid' }} tooltip='Right Middle' tooltipOption={rcOpt}>Right Middle</Box>
                    </Hlayout>
                    <Hlayout vflex={1} hflex={1} style={{ padding: '2px' }} >
                        <Box align='left bottom' hflex={1} vflex={1} style={{ border: '1px solid' }} tooltip='Left Bottom' tooltipOption={lbOpt}>Left Bottom</Box>
                        <Box align='center bottom' hflex={1} vflex={1} style={{ border: '1px solid' }} tooltip='Center Bottom' tooltipOption={cbOpt}>Center Bottom</Box>
                        <Box align='right bottom' hflex={1} vflex={1} style={{ border: '1px solid' }} tooltip='Right Bottom' tooltipOption={rbOpt}>Right Bottom</Box>
                    </Hlayout>
                    <Hlayout align='middle' space={10}>
                        <Button label="Click to toggle Success" onClick={this.doToggleSuccess.bind(this)} 
                            alert={this.state.success?this.state.tooltip:undefined} alertType='success' alertOption={lcOpt}/>
                        <Button label="Click to toggle Info" onClick={this.doToggleInfo.bind(this)} 
                            alert={this.state.info?this.state.tooltip:undefined}  alertType='info' alertOption={cbOpt}/>
                        <Button label="Click to toggle Warning" onClick={this.doToggleWarning.bind(this)} 
                            alert={this.state.warning?this.state.tooltip:undefined}  alertType='warning' alertOption={ctOpt}/>
                        <Button label="Click to toggle Error" onClick={this.doToggleError.bind(this)} 
                            alert={this.state.error?this.state.tooltip:undefined}/>
                    </Hlayout>
                </Vlayout>
            </Box>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>, dom);
}