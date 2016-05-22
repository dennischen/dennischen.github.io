/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
/// <reference path="../3rd-definition/require.d.ts" />
/// <reference path="../main/widget/widget-alias.d.ts" />
/// <reference path="../main/widget/layout-alias.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
//for requirejs load callback
import requirejs = require('module');

import w = require('react-webkit/widget');
import l = require('react-webkit/layout');

interface TestCase {
    name: string
    module: string
    html: string
}

let testCases: TestCase[] = [
    { name: 'Align', module: 'align', html: 'align.html' },
    { name: 'Animate', module: 'animate', html: 'animate.html' },
    { name: 'Box', module: 'box', html: 'box.html' },
    { name: 'Checkbox', module: 'checkbox', html: 'checkbox.html' },
    { name: 'Layout', module: 'layout', html: 'layout.html' },
    { name: 'List', module: 'list', html: 'list.html' },
    { name: 'Margin', module: 'margin', html: 'margin.html' },
    { name: 'Vlayout', module: 'vlayout', html: 'vlayout.html' },
    { name: 'Lifecycle', module: 'lifecycle', html: 'lifecycle.html' },
    { name: 'Commentbox', module: 'test-commentbox', html: 'test-commentbox.html' },
]

testCases = testCases.sort((a:TestCase,b:TestCase)=>{
    return a.name.localeCompare(b.name);
});

interface State {
    sidebar?: boolean;
    selectedCase?: TestCase;
    content?: React.ReactNode
}
class App extends React.Component<any, State>{
    constructor(props: any) {
        super(props);
        this.state = {
            sidebar: true,
            content:
            <l.Box hflex={1} vflex={1} align='middle center'>
                <h4>Select left list item to load specific test case, <br/> Double click to open test in new tab</h4>
            </l.Box>
        };
    }
    caseRenderer: w.ItemRenderer<TestCase> = {
        key(idx: number, each: TestCase) {
            return idx;
        },
        render(index: number, each: TestCase) {
            return <div style={{ padding: 4 }}>{each.name}</div>
        }
    }
    isCaseSelected(index: number, item: TestCase) {
        return this.state.selectedCase == item;
    }
    doCaseSelect(select: boolean, idx: number, item: TestCase) {
        if (select) {
            this.setState({ selectedCase: item });
            require([item.module], function (m: any) {
                this.setState({ content: <m.App /> });//update
            }.bind(this));
        }
    }
    onCaseDoubleClick(evt: Event, idx: number, item: TestCase) {
        window.open(item.html, '_blank');
    }
    toggleMenu() {
        alert('Todo');
    }
    toggleSidebar() {
        this.setState({ sidebar: !this.state.sidebar });
    }
    render() {
        return (
            <l.Vlayout hflex={1} vflex={1}>
                <l.Hlayout id='banner' align={'middle'} space={4}>
                    <l.Box className='menubtn' vflex={1} align={'middle center'} onClick={this.toggleMenu.bind(this) }>
                        <w.Fonticon className='fa fa-bars' />
                    </l.Box>
                    <span className='title'>WebKit - Tests</span>
                </l.Hlayout>
                <l.Hlayout vflex={1} hflex={1}>
                    <l.Vlayout id='function' vflex={1}
                        hidden={!this.state.sidebar} animation={{ effect: w.AniEffect.slideLeft }}>
                        <w.List vflex={1} hflex={1} style={{ paddingTop: 4 }}
                            onItemDoubleClick={this.onCaseDoubleClick.bind(this) }
                            model={testCases} itemRenderer={this.caseRenderer}
                            selection={{ isSelected: this.isCaseSelected.bind(this) }}
                            doSelect={this.doCaseSelect.bind(this) }
                            >
                        </w.List>
                    </l.Vlayout>
                    <l.Box id='testContent' hflex={1} vflex={1}>
                        {this.state.content}
                    </l.Box>
                </l.Hlayout>
                <l.Hlayout id='footer'>
                     <l.Box className='fnbtn' vflex={1} align={'middle center'} onClick={this.toggleSidebar.bind(this)}>
                        <w.Fonticon className={'fa fa-angle-double-'+(this.state.sidebar?'left':'right')} />
                    </l.Box>
                    <l.Box className='copyright' vflex={1} hflex={1} align={'middle right'}>
                        React WebKit © 2016
                    </l.Box>
                </l.Hlayout>
            </l.Vlayout >
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}