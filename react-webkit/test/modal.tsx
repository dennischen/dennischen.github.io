/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
import Jq = require('jquery');

import {Button, Alert} from '../main/widget';
import {Textbox} from '../main/input';
import {Box, Vlayout, Hlayout} from '../main/layout';
import {Modal} from '../main/modal';

export class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {modal1:true,modal2:false};
    }
    setModal1(show:boolean){
        this.setState({modal1:show});
    }
    setModal2(show:boolean){
        this.setState({modal2:show});
    }
    render() {
        return (
            <Box hflex={1} vflex={1}>
                <Vlayout space={10}>
                    <Hlayout align='middle' space={10}>
                        <Button label='Modal 1' onClick={()=>{this.setModal1(true)}} />
                        <Button label='Modal 2' onClick={()=>{this.setModal2(true)}} />
                    </Hlayout>
                </Vlayout>
                <Modal show={this.state.modal1} doAfterShow={()=>{console.log('Show modal 1')}} doEsc={()=>{this.setModal1(false)}}>
                    <h2>Provide your information</h2>
                    <Vlayout space={10}>
                        <Hlayout align='middle' space={10}>
                            A : <Textbox disabled />
                        </Hlayout>
                        <Hlayout align='middle' space={10}>
                            B : <Textbox />
                        </Hlayout>
                        <Hlayout align='middle' space={10}>
                            C : <Textbox />
                        </Hlayout>
                        <Alert alertType='info' label='It should focus on 2nd textbox, can be closed with ESC' />
                        <Hlayout align='center' space={10}>
                            <Button label='Cancel' onClick={()=>{this.setModal1(false)}}/>
                            <Button label='Ok' onClick={()=>{this.setModal1(false)}}/>
                            <Button label='Show nested Modal 2' onClick={()=>{this.setModal2(true)}}/>
                        </Hlayout>
                    </Vlayout>
                </Modal>
                <Modal show={this.state.modal2} doAfterShow={()=>{console.log('Show modal 2')}} >
                    <h2>The 2nd modal</h2>
                    <Vlayout space={10}>
                        <Hlayout align='middle' space={10}>
                            D : <Textbox disabled />
                        </Hlayout>
                        <Hlayout align='middle' space={10}>
                            E : <Textbox />
                        </Hlayout>
                        <Alert alertType='info' label='It should focus on 2nd textbox' />
                        <Hlayout align='center' space={10}>
                            <Button label='Ok' onClick={()=>{this.setModal1(true);this.setModal2(false);}}/>
                        </Hlayout>
                    </Vlayout>
                </Modal>
            </Box>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>, dom);
}