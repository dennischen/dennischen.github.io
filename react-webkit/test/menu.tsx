/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
import Jq = require('jquery');

import {Box, Vlayout, Hlayout} from '../main/layout';
import {MenuItem, MenuSeparator, hideMenu} from '../main/menu';

export class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    doClick(value: any) {
        console.log('click', value);
    }
    render() {
        return (
            <Vlayout hflex={1} vflex={1}>            
                <Hlayout hflex={1} style={{ background: '#eee' }}>
                    <Hlayout  align='middle'>
                        <MenuItem label='Home' href="http://dennischen.github.io/react-webkit/test/" target='_blank'/>
                        <MenuItem label='Edit' popupSide='bottom'>
                            <Vlayout>
                                <MenuItem label='Copy'  value='copy' doClick={this.doClick.bind(this) } />
                                <MenuItem label='Paste' />
                                <MenuSeparator/>
                                <MenuItem label='Preferences'  popupSide='right'>
                                    <Vlayout>
                                        <MenuItem label='Font' />
                                        <MenuItem label='Color' />
                                        <MenuItem label='Format' />
                                    </Vlayout>
                                </MenuItem>
                                <MenuItem label='About'  popupSide='right'>
                                    <Vlayout>
                                        <MenuItem label='Version' />
                                        <MenuItem label='Update' />
                                        <MenuItem label='Site' />
                                    </Vlayout>
                                </MenuItem>
                                <MenuItem label='Disabled' disabled={true}  />
                            </Vlayout>
                        </MenuItem>
                        <MenuItem label='Disabled' disabled={true}/>
                        <MenuItem label='Horizontal' popupSide='bottom'>
                            <Hlayout>
                                <MenuItem label='Category 1'/>
                                <MenuItem label='Category 2'/>
                                <MenuSeparator vflex={1} orient='vertical'/>
                                <MenuItem label='Category 3' >
                                    <Hlayout>
                                        <MenuItem label='Red'/>
                                        <MenuItem label='Green'/>
                                        <MenuItem label='Blue'/>
                                        <MenuItem label='Black'/>
                                        <MenuItem label='White'/>
                                        <MenuItem label='More'>
                                            <Hlayout>
                                                <MenuItem label='White 1'/>
                                                <MenuItem label='White 2'/>
                                                <MenuItem label='White 3'/>
                                                <MenuItem label='White 4'/>
                                                <MenuItem label='White 6'/>
                                                <MenuItem label='White 7'/>
                                                <MenuItem label='White 8'/>
                                                <MenuItem label='White 9'/>
                                            </Hlayout>
                                        </MenuItem>
                                    </Hlayout>
                                </MenuItem>
                            </Hlayout>
                        </MenuItem>
                    </Hlayout>
                    <Box hflex={1}/>
                    <Hlayout align='right'>
                        <MenuItem fonticon='fa fa-envelope wkw-fonticon' label='(0)' onClick={() => { alert('No mail for you') } }/>
                        <MenuItem fonticon='fa fa-sign-out wkw-fonticon' onClick={() => { alert('you clicked logout') } }/>
                    </Hlayout>
                </Hlayout>
                <Box hflex={1} vflex={1} align='center middle'>
                    <Vlayout style={{ background: '#eee', width: 200 }}>
                        <MenuItem label='Top' popupSide='top' fonticon='fa fa-coffee fa-fw' >
                            <Vlayout>
                                <MenuItem label='Copy'/>
                                <MenuItem label='Paste'/>
                            </Vlayout>
                        </MenuItem>
                        <MenuItem label='Right' popupSide='right' fonticon='fa fa-eye fa-fw'>
                            <Vlayout>
                                <MenuItem label='Copy'/>
                                <MenuItem label='Paste'/>
                            </Vlayout>
                        </MenuItem>
                        <MenuItem label='Disabled' disabled={true} fonticon='fa-fw'/>
                        <MenuSeparator />
                        <MenuItem label='Left' popupSide='left' >
                            <Vlayout>
                                <MenuItem label='Copy'/>
                                <MenuItem label='Paste'/>
                            </Vlayout>
                        </MenuItem>
                        	
                        <MenuItem label='Bottom' popupSide='bottom' fonticon='fa-fw'>
                            <Vlayout>
                                <MenuItem label='Copy'/>
                                <MenuItem label='Paste'/>
                            </Vlayout>
                        </MenuItem>
                    </Vlayout>
                </Box>
            </Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>, dom);
}