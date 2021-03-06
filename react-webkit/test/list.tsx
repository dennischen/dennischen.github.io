/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import {InstanceSelection,KeySelection,IndexSelection,ItemRenderer} from '../main/widget';
import {Box, Hlayout,Vlayout} from '../main/layout';
import {List} from '../main/list';


export class Color {
    code: string
    name: string
}

export interface State {
    msg?: string
    count?: number
    instanceSelection?: InstanceSelection<Color>
    keySelection?: KeySelection<Color>
    indexSelection?: IndexSelection
    enabledDisselect?: boolean
}

export class App extends React.Component<any, State>{

    private data: Color[] = [{ code: 'yw', name: 'Yellow' }, { code: 'bl', name: 'Blue' }, { code: 'rd', name: 'Red' },
        { code: 'gr1', name: 'Green1' }, { code: 'gr2', name: 'Green2' }, { code: 'gr3', name: 'Green3' }, { code: 'gr4', name: 'Green4' }]

    constructor(props: any) {
        super(props);
        this.state = {
            msg: 'start to operation',
            instanceSelection: new InstanceSelection(this.data[1]),
            keySelection: new KeySelection((item) => { return item.code }, this.data[3]),
            indexSelection: new IndexSelection(),
            count: 0,
            enabledDisselect: true
        };
    }
    componentDidMount(): void {
    }
    onMoveUp(evt: any) {

        let count = this.state.count + 1;
        this.setState({});

        if (count == 3) {
            //change id to verify key, -> check unmount
            let c = this.data[3];
            c.code = 'newCode' + count;
        }
        let c = this.data.shift();
        this.data.push(c);

        this.setState({ msg: 'Moved List up', count: count });
    }
    onCheck(evt: any) {
        let checked = evt.target.checked;
        this.setState({ msg: 'Enabled disselect ' + evt.target.checked, enabledDisselect: checked });
    }
    onItemClick(evt: any, item: Color) {
        console.log('Click on item ' + item.code + "," + item.name);
    }
    onItemDoubleClick(evt: React.MouseEvent, item: Color) {
        console.log('Item DbClick', item);
        evt.stopPropagation();
    }
    onListDoubleClick(evt: React.MouseEvent) {
        console.log('List DbClick', evt.target);
    }
    render() {
        let instanceDoSelect = (select: boolean, idx: number, item: Color) => {
            if (select) {
                //new instane for single select
                this.setState({ msg: 'Instance Select ' + item.name, instanceSelection: new InstanceSelection(item) });
            } else if (this.state.enabledDisselect) {
                this.setState({ msg: 'Instance Unselect ' + item.name, instanceSelection: this.state.instanceSelection.unselect(item) });
            }
        }

        let instanceKeyDoSelect = (select: boolean, idx: number, item: Color) => {
            if (select) {
                //new instane for single select
                this.setState({ msg: 'Instance Key Select ' + item.name, keySelection: this.state.keySelection.select(item) });
            } else if (this.state.enabledDisselect) {
                this.setState({ msg: 'Instance Key Unselect ' + item.name, keySelection: this.state.keySelection.unselect(item) });
            }
        }

        let itemRenderer: ItemRenderer<Color> = {
            key: (idx: number, each: Color) => {
                return each.code;
            },
            render: (idx: number, each: Color) => {
                //NOTE the ref will store in List (which calls this render method)
                return (<Vlayout ref={'item' + idx} onClick={e => { this.onItemClick(e, each) } }
                    onDoubleClick={e => { this.onItemDoubleClick(e, each) } } >
                    <span >{each.name}</span>
                    <span style={{ paddingLeft: 20 }}>({each.code}) </span>
                </Vlayout>)
            }
        }
        let indexDoSelect = (select: boolean, idx: number, item: any) => {
            if (select) {
                this.setState({ msg: 'Index Select ' + idx, indexSelection: this.state.indexSelection.select(idx) });
            } else if (this.state.enabledDisselect) {
                this.setState({ msg: 'Index Disselect ' + idx, indexSelection: this.state.indexSelection.unselect(idx) });
            }
        }
        console.log('>> instance selection ', this.state.instanceSelection.getSelection());
        console.log('>> instance key selection ', this.state.keySelection.getSelection());
        console.log('>> index selection ', this.state.indexSelection.getSelection());
        return (
            <Vlayout vflex={1} hflex={1}>
                <Hlayout align='middle'>
                    <input onChange={this.onCheck.bind(this) } type='checkbox' checked={this.state.enabledDisselect}/>
                    <span>enable disselect</span>
                    , {this.state.count}
                </Hlayout>
                <Hlayout align='middle'>
                    {this.state.msg}
                </Hlayout>
                <h4>Model List</h4>
                <button onClick={this.onMoveUp.bind(this) }>Move up</button>
                <Hlayout vflex={1} hflex={1}>
                    <List vflex={1} hflex={1} model={this.data}
                        itemRenderer={itemRenderer}
                        selection={this.state.instanceSelection}
                        doSelect={instanceDoSelect}
                        onDoubleClick={this.onListDoubleClick.bind(this) }>
                    </List>
                    <List vflex={1}  hflex={1} model={this.data} style={{ background: 'lightblue' }}
                        itemRenderer={itemRenderer}
                        selection={this.state.keySelection}
                        doSelect={instanceKeyDoSelect}
                        onDoubleClick={this.onListDoubleClick.bind(this) }>
                    </List>
                </Hlayout>
                <h4>Static List</h4>
                <Hlayout vflex={1} hflex={1} >
                    <List vflex={1} hflex={1} style={{ background: 'gray' }}
                        selection={this.state.indexSelection} doSelect={indexDoSelect}>
                        <span>MULTIPLE Selection List</span>
                        <span>DEF</span>
                        <span>IJK</span>
                        <span>LMN</span>
                        <span>XYZ</span>
                    </List>
                    <List  vflex={1} hflex={1} style={{ background: 'lightpink' }}
                        onItemClick={(evt: React.MouseEvent, idx: number) => { this.setState({ msg: 'Item Clicked' + idx }) } }
                        onItemDoubleClick={(evt: React.MouseEvent, idx: number) => { this.setState({ msg: 'Item Dbclicked' + idx }) } }
                        onItemContextMenu={(evt: React.MouseEvent, idx: number) => { this.setState({ msg: 'Item Contextmenu' + idx }), evt.preventDefault() } }>
                        <span>NO Selection List</span>
                        <span>DEF</span>
                        <span>IJK</span>
                        <span>LMN</span>
                        <span>XYZ</span>
                    </List>
                </Hlayout>
                <h4>Disabled List</h4>
                <Hlayout vflex={1} hflex={1} >
                    <List vflex={1} hflex={1} disabled style={{ background: 'lightblue' }}
                        selection={this.state.indexSelection}>
                        <span>ABC</span>
                        <span>DEF</span>
                        <span>IJK</span>
                        <span>LMN</span>
                        <span>XYZ</span>
                    </List>
                </Hlayout>
            </Vlayout>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}