/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
/// <reference path="../3rd-definition/require.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
//for requirejs load callback
import requirejs = require('module');

import w = require('../main/widget');
import p = require('../main/popup');
import l = require('../main/layout');

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
    { name: 'Sider', module: 'sider', html: 'sider.html' },
    { name: 'Popup', module: 'popup', html: 'popup.html' },
    { name: 'Radiobox', module: 'radiobox', html: 'radiobox.html' },
]

testCases = testCases.sort((a: TestCase, b: TestCase) => {
    return a.name.localeCompare(b.name);
});

interface State {
    showSidebar?: boolean;
    showSrcCode?: boolean;
    selectedCase?: TestCase;
    content?: React.ReactNode
}
class App extends React.Component<any, State>{
    constructor(props: any) {
        super(props);
        this.state = {
            showSidebar: true,
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
            require([item.module, 'jquery', 'syntaxhighlighter'], function (m: any, jq: any, highlighter: any) {
                this.setState({ content: <m.App /> });//update
                let srcName = item.module + '.tsx';
                jq.ajax({
                    url: srcName, dataType: 'text', success: (data: any, status: string, xhr: any) => {
                        jq('#src').html('<pre id=\'srcPre\' class=\'brush: ts;\' />');
                        let jqsrc = jq('#srcPre');
                        jqsrc.text(data);
                        highlighter.highlight({}, jqsrc[0]);
                    }
                });
            }.bind(this));
        }
    }
    onCaseDoubleClick(evt: Event, idx: number, item: TestCase) {
        window.open(item.html, '_blank');
    }
    toggleMenu() {
        let menu = this.refs['menu'] as p.Popup;
        if (menu.state.hidden) {
            menu.show('#banner', {
                autoDismiss: true,
                targetHPos: w.HPos.left, targetVPos: w.VPos.bottom,
                selfHPos: w.HPos.left, selfVPos: w.VPos.top, adjustX: 1, adjustY: 1
            });
        } else {
            menu.hide();
        }
    }
    toggleSidebar() {
        this.setState({ showSidebar: !this.state.showSidebar });
    }
    toggleSrcCode() {
        this.setState({ showSrcCode: !this.state.showSrcCode });
    }
    render() {
        return (
            <l.Vlayout hflex={1} vflex={1}>
                <l.Hlayout id='banner' align={'middle'} space={4} hflex={1}>
                    <l.Box className='menubtn' vflex={1} align={'middle center'} onClick={this.toggleMenu.bind(this) }>
                        <w.Fonticon className='fa fa-bars' />
                    </l.Box>
                    <span className='title'>WebKit - Tests</span>
                    <l.Hlayout vflex={1} hflex={1} align='bottom right' >
                        <l.Box className={'fnbtn ' + (this.state.showSrcCode ? 'fnbtn-active' : '') } align={'middle center'} 
                            onClick={this.toggleSrcCode.bind(this) } hidden={this.state.selectedCase ? false : true}>
                            <w.Fonticon className='fa fa-code '/>
                        </l.Box>
                    </l.Hlayout>
                </l.Hlayout>
                <l.Hlayout vflex={1} hflex={1}>
                    <l.Sider id='siderbar' vflex={1} minSize={100} maxSize={300}
                        hidden={!this.state.showSidebar} animation={{ effect: w.AniEffect.slideWidth }}>
                        <w.List id='function' vflex={1} hflex={1} style={{ paddingTop: 4 }}
                            onItemDoubleClick={this.onCaseDoubleClick.bind(this) }
                            model={testCases} itemRenderer={this.caseRenderer}
                            selection={{ isSelected: this.isCaseSelected.bind(this) }}
                            doSelect={this.doCaseSelect.bind(this) }
                            >
                        </w.List>
                    </l.Sider>
                    <l.Box id='testBody' hflex={1} vflex={1}>
                        {this.state.content}
                    </l.Box>
                </l.Hlayout>
                <l.Hlayout id='footer' align={'middle'}>
                    <l.Box className={'fnbtn ' + (this.state.showSidebar ? 'fnbtn-active' : '') } vflex={1} align={'middle center'} onClick={this.toggleSidebar.bind(this) }>
                        <w.Fonticon className={'fa fa-angle-double-' + (this.state.showSidebar ? 'left' : 'right') } />
                    </l.Box>
                    <l.Box id='srcName' align={'middle center'} hidden={this.state.showSrcCode ? false : true}>
                        {this.state.selectedCase?this.state.selectedCase.module+'.tsx':''}
                    </l.Box>
                    <l.Box className='copyright' vflex={1} hflex={1} align={'middle right'}>
                        React WebKit © 2016
                    </l.Box>
                </l.Hlayout>
                <l.Box id='src' hflex={1}
                    hidden={!this.state.showSrcCode} animation={{ effect: w.AniEffect.slide }}>
                </l.Box>
                <p.Popup id='menu' ref='menu' animation={{ effect: w.AniEffect.fade }}>
                    <l.Vlayout hflex={1} vflex={1} space={10}>
                        <span>Welcome, User</span>
                        <w.List hflex={1} doSelect={this.toggleMenu.bind(this)}>
                           <div style={{ padding: 4 }}>Menu 1</div>
                           <div style={{ padding: 4 }}>Menu 2</div>
                           <div style={{ padding: 4 }}>Menu 3</div>
                           <div style={{ padding: 4 }}>Menu 4</div>
                           <div style={{ padding: 4 }}>Menu 5</div>
                           <div style={{ padding: 4 }}>Menu 6</div> 
                        </w.List>    
                    </l.Vlayout>
                </p.Popup>
            </l.Vlayout >
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>, dom);
}