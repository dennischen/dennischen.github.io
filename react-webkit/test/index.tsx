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
import ls = require('../main/list');

interface TestCase {
    name: string
    module: string
    html?: string
}

let testcaseurl = function(testcase:string) {
    return 'cases.html?testcase='+testcase;
}

let testCases: TestCase[] = [
    { name: 'Align', module: 'align'},
    { name: 'Alert', module: 'alert'},
    { name: 'Animate', module: 'animate'},
    { name: 'Tooltip', module: 'tooltip'},
    { name: 'Box', module: 'box'},
    { name: 'Checkbox', module: 'checkbox'},
    { name: 'Layout', module: 'layout'},
    { name: 'List', module: 'list'},
    { name: 'Margin', module: 'margin'},
    { name: 'Vlayout', module: 'vlayout'},
    { name: 'Sider', module: 'sider'},
    { name: 'Popup', module: 'popup'},
    { name: 'Radiobox', module: 'radiobox'},
    { name: 'Textbox', module: 'textbox'},
    { name: 'Button', module: 'button'},
    { name: 'Anchor', module: 'anchor'},
    { name: 'Lifecycle', module: 'lifecycle'},
    { name: 'Combine-Commentbox', module: 'test-commentbox', html: 'test-commentbox.html' }
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
            return <div style={{ padding: '6px 4px' }}>{each.name}</div>
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
        window.open(item.html?item.html:testcaseurl(item.module), '_blank');
    }
    toggleMenu() {
        let menu = this.refs['menu'] as p.Popup;
        if (menu.state.hidden) {
            menu.show('#banner', {
                autoDismiss: true, autoDismissHolders:['.menubtn'],
                targetHPos: w.HPos.left, targetVPos: w.VPos.bottom,
                selfHPos: w.HPos.left, selfVPos: w.VPos.top, adjustX: 1, adjustY: 1
            });
        } else {
            menu.hide();
        }
    }
    doMenuSelect(select: boolean, idx: number, item: any){
        this.toggleMenu();
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
                    <l.Box className='menubtn' vflex={1} align={'middle center'} onClick={this.toggleMenu.bind(this) } tooltip='Toggle menu'>
                        <w.Fonticon className='fa fa-bars' />
                    </l.Box>
                    <span className='title'>WebKit - Tests</span>
                    <l.Hlayout vflex={1} hflex={1} align='bottom right' >
                        <l.Box className={'fnbtn ' + (this.state.showSrcCode ? 'fnbtn-active' : '') } align={'middle center'} 
                            onClick={this.toggleSrcCode.bind(this) } hidden={this.state.selectedCase ? false : true}
                            tooltip="Toggle source">
                            <w.Fonticon className='fa fa-code '/>
                        </l.Box>
                    </l.Hlayout>
                </l.Hlayout>
                <p.Popup id='menu' ref='menu' animation={{ effect: w.AniEffect.fade }}>
                    <div className='title'>
                        <l.Hlayout align={'left middle'} space={10}>
                            <div className='avatar' >
                                <img src='https://s.gravatar.com/avatar/d41e19c6709fe2ef85bb163b6654bd26?size=50&default=retro'/>
                            </div>
                            User XYZ
                        </l.Hlayout>
                    </div>
                    <l.Vlayout hflex={1} vflex={1} space={10}>
                        <ls.List hflex={1} doSelect={this.doMenuSelect.bind(this)}>
                            <w.Anchor className='menuItem'>Menu 1</w.Anchor>
                            <w.Anchor className='menuItem'>Menu 2</w.Anchor>
                            <w.Anchor className='menuItem'>Menu 3</w.Anchor>
                            <w.Anchor className='menuItem'>Menu 4</w.Anchor>
                            <w.Anchor className='menuItem'>Menu 5</w.Anchor>
                            <w.Anchor className='menuItem'>Menu 6</w.Anchor>
                            <w.Anchor className='menuItem'>Menu 7</w.Anchor> 
                        </ls.List>    
                    </l.Vlayout>
                </p.Popup>                
                <l.Hlayout vflex={1} hflex={1}>
                    <l.Sider id='siderbar' vflex={1} minSize={100} maxSize={300}
                        hidden={!this.state.showSidebar} animation={{ effect: w.AniEffect.slideWidth }}>
                        <ls.List id='function' vflex={1} hflex={1} style={{ paddingTop: 4 }}
                            onItemDoubleClick={this.onCaseDoubleClick.bind(this) }
                            model={testCases} itemRenderer={this.caseRenderer}
                            selection={{ isSelected: this.isCaseSelected.bind(this) }}
                            doSelect={this.doCaseSelect.bind(this) }
                            >
                        </ls.List>
                    </l.Sider>
                    <l.Box id='testBody' hflex={1} vflex={1}>
                        {this.state.content}
                    </l.Box>
                </l.Hlayout>
                <l.Hlayout id='footer' align={'middle'}>
                    <l.Box className={'fnbtn ' + (this.state.showSidebar ? 'fnbtn-active' : '') } vflex={1} align={'middle center'} onClick={this.toggleSidebar.bind(this) }
                        tooltip='Toggle sidebar'>
                        <w.Fonticon className={'fa fa-angle-double-' + (this.state.showSidebar ? 'left' : 'right') } />
                    </l.Box>
                    <l.Box id='srcName' align={'middle center'} hidden={this.state.showSrcCode ? false : true} onClick={this.toggleSrcCode.bind(this) } > 
                        {this.state.selectedCase?this.state.selectedCase.module+'.tsx':''}
                    </l.Box>
                    <l.Box className='copyright' vflex={1} hflex={1} align={'middle right'}>
                        React WebKit © 2016
                    </l.Box>
                </l.Hlayout>
                <l.Box id='src' hflex={1}
                    hidden={!this.state.showSrcCode} animation={{ effect: w.AniEffect.slide }}>
                </l.Box>
            </l.Vlayout >
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>, dom);
}