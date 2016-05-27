/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import w = require('../main/widget');
import l = require('../main/layout');

export interface State {
    msg?: string
    checked?: boolean;
}
export class App extends React.Component<any, State>{
    constructor(props: any) {
        super(props);
        this.state = { msg: 'start to operation', checked: false };
    }
    componentDidMount(): void {
    }
    doCheck(checked: boolean, value: any) {
        console.log(value);
        this.setState({ msg: 'Checked ' + checked + ', value: ' + value, checked: checked });
    }
    onChange(evt: Event) {
        let checked = (evt.target as any).checked;
        this.setState({ msg: 'Checked ' + checked, checked: checked });
    }
    render() {
        return (
            <l.Vlayout vflex={1} style={{ padding: 10, background: 'lightblue' }} space={10}>
                <l.Hlayout >
                    {this.state.msg}
                </l.Hlayout>

                <l.Hlayout align='top' space={20}>
                    <w.Radiobox id='cb1' label='Option 3' name='group1'
                        doCheck={this.doCheck.bind(this) } value='one'></w.Radiobox>
                    <w.Radiobox label='Option 2'  name='group1'
                        doCheck={this.doCheck.bind(this) } value='two'></w.Radiobox>
                    <w.Radiobox label='Option 3' name='group1'
                        doCheck={this.doCheck.bind(this) } value='tree'></w.Radiobox>
                </l.Hlayout>
                <w.Radiobox doCheck={this.doCheck.bind(this) }/>
                ---------
                <w.Radiobox checked={this.state.checked} label='You can\' check this, the status follow the last checking' />
                ---------
                <w.Radiobox label='Free radiobox' />
                <w.Radiobox label='Disabled radiobox' disabled />
            </l.Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>, dom);
}