/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
/// <reference path="../3rd-definition/require.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');
//for requirejs load callback
import requirejs = require('module');

import {Anchor,Button,Fonticon,AniEffect,ItemRenderer,VPos,HPos} from '../main/widget';
import {Box, Hlayout,Vlayout, Sider} from '../main/layout';
import {Popup} from '../main/popup';
import {List} from '../main/list';
import {MenuItem,MenuSeparator} from '../main/menu';
let ga = (window as any).ga;

interface TestCase {
    name: string
    module: string
    html?: string
    priority?:number
}

let testcaseurl = function(testcase:string) {
    return 'cases.html?testcase='+testcase;
}

let testCases: TestCase[] = [
    //Higlighted
    { name: 'Menu', module: 'menu',priority:10},
    { name: 'Datebox', module: 'datebox',priority:9},
    { name: 'Calender', module: 'calendar',priority:9},
    { name: 'Modal', module: 'modal', priority:9},
    { name: 'Align', module: 'align'},
    { name: 'Alert', module: 'alert'},
    { name: 'Animate', module: 'animate'},
    { name: 'Tooltip', module: 'tooltip'},
    { name: 'Box', module: 'box'},
    { name: 'Checkbox', module: 'checkbox'},
    { name: 'Layout', module: 'layout'},
    { name: 'List', module: 'list'},
    { name: 'Vlayout', module: 'vlayout'},
    { name: 'Sider', module: 'sider'},
    { name: 'Popup', module: 'popup'},
    { name: 'Radiobox', module: 'radiobox'},
    { name: 'Textbox', module: 'textbox'},
    { name: 'Button', module: 'button'},
    { name: 'Anchor', module: 'anchor'},
    //TODO
    /*
    { name: '*Time', module: 'time'},
    { name: '*Combobox', module: 'combobox'},
    { name: '*Markdown', module: 'markdown'},
    { name: '*Switchbox', module: 'switchbox'},
    { name: '*Avatar', module: 'avatar'},
    */
    //Misc
    { name: 'Margin', module: 'margin',priority:-99},
    { name: 'Lifecycle', module: 'lifecycle', priority:-99},
    { name: 'Commentbox', module: 'test-commentbox', html: 'test-commentbox.html', priority:-99 }
]

testCases = testCases.sort((a: TestCase, b: TestCase) => {
    let pra = a.priority || 0;
    let prb = b.priority || 0;
    if(pra!=prb){
        return pra>prb?-11:1;
    }
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
            showSrcCode: false,
            content:
            <Box hflex={1} vflex={1} align='middle center'>
                <h4>Select left list item to load specific test case, <br/> Double click to open test in new tab</h4>
            </Box>
        };
    }
    caseRenderer: ItemRenderer<TestCase> = {
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
                if(ga){
                    ga('set', 'page', 'test/index/'+item.module);
                    ga('send', 'pageview');
                }
            }.bind(this));

            if(ga){
                ga('send', 'event', 'TestPage', 'selectCase');
            }
        }
    }
    onCaseDoubleClick(evt: Event, idx: number, item: TestCase) {
        window.open(item.html?item.html:testcaseurl(item.module), '_blank');
        if(ga){
            ga('send', 'event', 'TestPage', 'openCase');
        }
    }
    toggleMenu() {
        let menu = this.refs['menu'] as Popup;
        if (menu.state.invisible) {
            menu.show('#banner', {
                autoDismiss: true, autoDismissHolders:['.menubtn'],
                targetHPos: HPos.left, targetVPos: VPos.bottom,
                selfHPos: HPos.left, selfVPos: VPos.top, adjustX: 1, adjustY: 1
            });
        } else {
            menu.hide();
        }
        if(ga){
            ga('send', 'event', 'TestPage', 'toggleMenu');
        }
    }
    toggleSidebar() {
        this.setState({ showSidebar: !this.state.showSidebar });
        if(ga){
            ga('send', 'event', 'TestPage', 'toggleSidebar');
        }
    }
    toggleSrcCode() {
        this.setState({ showSrcCode: !this.state.showSrcCode });
        if(ga){
            ga('send', 'event', 'TestPage', 'toggleSrc');
        }
    }
    render() {
        return (
            <Vlayout hflex={1} vflex={1}>
                <Hlayout id='banner' align={'middle'} space={4} hflex={1}>
                    <Box className='menubtn' vflex={1} align={'middle center'} onClick={this.toggleMenu.bind(this) } tooltip='Toggle menu'>
                        <Fonticon className='fa fa-bars' />
                    </Box>
                    <span className='title'>WebKit - Tests</span>
                    <Hlayout vflex={1} hflex={1} align='bottom right' >
                        <Box className={'fnbtn ' + (this.state.showSrcCode ? 'fnbtn-active' : '') } align={'middle center'} 
                            onClick={this.toggleSrcCode.bind(this) } invisible={this.state.selectedCase ? false : true}
                            tooltip="Toggle source">
                            <Fonticon className='fa fa-code '/>
                        </Box>
                    </Hlayout>
                </Hlayout>
                <Popup id='menu' ref='menu' animation={{ effect: AniEffect.fade }}>
                    <div className='title'>
                        <Hlayout align={'left middle'} space={10}>
                            <div className='avatar' >
                                <img src='https://s.gravatar.com/avatar/d41e19c6709fe2ef85bb163b6654bd26?size=50&default=retro'/>
                            </div>
                            User XYZ
                        </Hlayout>
                    </div>
                    <Vlayout hflex={1}>
                        <MenuItem className='menuItem' fonticon='fa fa-fw fa-home' label='Home'/>
                        <MenuItem className='menuItem' fonticon='fa fa-fw' label='Function 1'/>
                        <MenuItem className='menuItem' fonticon='fa fa-fw' label='Function 2'/>
                        <MenuItem className='menuItem' fonticon='fa fa-fw fa-cog' label='Preferences'/>
                        <MenuSeparator/>
                        <MenuItem className='menuItem' fonticon='fa fa-fw fa-sign-out' label='Logout'/>
                    </Vlayout>
                </Popup>                
                <Hlayout vflex={1} hflex={1}>
                    <Sider id='siderbar' vflex={1} minSize={100} maxSize={300}
                        invisible={!this.state.showSidebar} animation={{ effect: AniEffect.slideWidth }}>
                        <List id='function' vflex={1} hflex={1} style={{ paddingTop: 4 }}
                            onItemDoubleClick={this.onCaseDoubleClick.bind(this) }
                            model={testCases} itemRenderer={this.caseRenderer}
                            selection={{ isSelected: this.isCaseSelected.bind(this) }}
                            doSelect={this.doCaseSelect.bind(this) }
                            >
                        </List>
                    </Sider>
                    <Box id='testBody' hflex={1} vflex={1}>
                        {this.state.content}
                    </Box>
                </Hlayout>
                <Hlayout id='footer' align={'middle'}>
                    <Box className={'fnbtn ' + (this.state.showSidebar ? 'fnbtn-active' : '') } vflex={1} align={'middle center'} onClick={this.toggleSidebar.bind(this) }
                        tooltip='Toggle sidebar'>
                        <Fonticon className={'fa fa-angle-double-' + (this.state.showSidebar ? 'left' : 'right') } />
                    </Box>
                    <Box id='srcName' align={'middle center'} invisible={!this.state.showSrcCode} onClick={this.toggleSrcCode.bind(this) } > 
                        {this.state.selectedCase?this.state.selectedCase.module+'.tsx':''}
                    </Box>
                    <Box className='copyright' vflex={1} hflex={1} align={'middle right'}>
                        React WebKit © 2016
                    </Box>
                </Hlayout>
                <Box id='src' hflex={1}
                    invisible={!this.state.showSrcCode} animation={{ effect: AniEffect.slide }}>
                </Box>
            </Vlayout >
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>, dom);
}