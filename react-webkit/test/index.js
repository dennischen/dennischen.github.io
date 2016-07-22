/**
 * React WebKit - v0.0.5
 * The react web widget kit base on typescript
 * 
 * Copyright 2016 - present, Dennis Chen, All rights reserved.
 * 
 * Released under MIT license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'react', 'react-dom', '../main/widget', '../main/layout', '../main/popup', '../main/list', '../main/menu'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var widget_1 = require('../main/widget');
    var layout_1 = require('../main/layout');
    var popup_1 = require('../main/popup');
    var list_1 = require('../main/list');
    var menu_1 = require('../main/menu');
    var ga = window.ga;
    var testcaseurl = function (testcase) {
        return 'cases.html?testcase=' + testcase;
    };
    var testCases = [
        { name: 'Menu', module: 'menu', priority: 10 },
        { name: 'Datebox', module: 'datebox', priority: 9 },
        { name: 'Calender', module: 'calendar', priority: 9 },
        { name: 'Modal', module: 'modal', priority: 9 },
        { name: 'Align', module: 'align' },
        { name: 'Alert', module: 'alert' },
        { name: 'Animate', module: 'animate' },
        { name: 'Tooltip', module: 'tooltip' },
        { name: 'Box', module: 'box' },
        { name: 'Checkbox', module: 'checkbox' },
        { name: 'Layout', module: 'layout' },
        { name: 'List', module: 'list' },
        { name: 'Vlayout', module: 'vlayout' },
        { name: 'Sider', module: 'sider' },
        { name: 'Popup', module: 'popup' },
        { name: 'Radiobox', module: 'radiobox' },
        { name: 'Textbox', module: 'textbox' },
        { name: 'Button', module: 'button' },
        { name: 'Anchor', module: 'anchor' },
        { name: 'Margin', module: 'margin', priority: -99 },
        { name: 'Lifecycle', module: 'lifecycle', priority: -99 },
        { name: 'Commentbox', module: 'test-commentbox', html: 'test-commentbox.html', priority: -99 }
    ];
    testCases = testCases.sort(function (a, b) {
        var pra = a.priority || 0;
        var prb = b.priority || 0;
        if (pra != prb) {
            return pra > prb ? -11 : 1;
        }
        return a.name.localeCompare(b.name);
    });
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.caseRenderer = {
                key: function (idx, each) {
                    return idx;
                },
                render: function (index, each) {
                    return React.createElement("div", {style: { padding: '6px 4px' }}, each.name);
                }
            };
            this.state = {
                showSidebar: true,
                showSrcCode: false,
                content: React.createElement(layout_1.Box, {hflex: 1, vflex: 1, align: 'middle center'}, React.createElement("h4", null, "Select left list item to load specific test case, ", React.createElement("br", null), " Double click to open test in new tab"))
            };
        }
        App.prototype.isCaseSelected = function (index, item) {
            return this.state.selectedCase == item;
        };
        App.prototype.doCaseSelect = function (select, idx, item) {
            if (select) {
                this.setState({ selectedCase: item });
                require([item.module, 'jquery', 'syntaxhighlighter'], function (m, jq, highlighter) {
                    this.setState({ content: React.createElement(m.App, null) });
                    var srcName = item.module + '.tsx';
                    jq.ajax({
                        url: srcName, dataType: 'text', success: function (data, status, xhr) {
                            jq('#src').html('<pre id=\'srcPre\' class=\'brush: ts;\' />');
                            var jqsrc = jq('#srcPre');
                            jqsrc.text(data);
                            highlighter.highlight({}, jqsrc[0]);
                        }
                    });
                    if (ga) {
                        ga('set', 'page', 'test/index/' + item.module);
                        ga('send', 'pageview');
                    }
                }.bind(this));
                if (ga) {
                    ga('send', 'event', 'TestPage', 'selectCase');
                }
            }
        };
        App.prototype.onCaseDoubleClick = function (evt, idx, item) {
            window.open(item.html ? item.html : testcaseurl(item.module), '_blank');
            if (ga) {
                ga('send', 'event', 'TestPage', 'openCase');
            }
        };
        App.prototype.toggleMenu = function () {
            var menu = this.refs['menu'];
            if (menu.state.invisible) {
                menu.show('#banner', {
                    autoDismiss: true, autoDismissHolders: ['.menubtn'],
                    targetHPos: widget_1.HPos.left, targetVPos: widget_1.VPos.bottom,
                    selfHPos: widget_1.HPos.left, selfVPos: widget_1.VPos.top, adjustX: 1, adjustY: 1
                });
            }
            else {
                menu.hide();
            }
            if (ga) {
                ga('send', 'event', 'TestPage', 'toggleMenu');
            }
        };
        App.prototype.toggleSidebar = function () {
            this.setState({ showSidebar: !this.state.showSidebar });
            if (ga) {
                ga('send', 'event', 'TestPage', 'toggleSidebar');
            }
        };
        App.prototype.toggleSrcCode = function () {
            this.setState({ showSrcCode: !this.state.showSrcCode });
            if (ga) {
                ga('send', 'event', 'TestPage', 'toggleSrc');
            }
        };
        App.prototype.render = function () {
            return (React.createElement(layout_1.Vlayout, {hflex: 1, vflex: 1}, React.createElement(layout_1.Hlayout, {id: 'banner', align: 'middle', space: 4, hflex: 1}, React.createElement(layout_1.Box, {className: 'menubtn', vflex: 1, align: 'middle center', onClick: this.toggleMenu.bind(this), tooltip: 'Toggle menu'}, React.createElement(widget_1.Fonticon, {className: 'fa fa-bars'})), React.createElement("span", {className: 'title'}, "WebKit - Tests"), React.createElement(layout_1.Hlayout, {vflex: 1, hflex: 1, align: 'bottom right'}, React.createElement(layout_1.Box, {className: 'fnbtn ' + (this.state.showSrcCode ? 'fnbtn-active' : ''), align: 'middle center', onClick: this.toggleSrcCode.bind(this), invisible: this.state.selectedCase ? false : true, tooltip: "Toggle source"}, React.createElement(widget_1.Fonticon, {className: 'fa fa-code '})))), React.createElement(popup_1.Popup, {id: 'menu', ref: 'menu', animation: { effect: widget_1.AniEffect.fade }}, React.createElement("div", {className: 'title'}, React.createElement(layout_1.Hlayout, {align: 'left middle', space: 10}, React.createElement("div", {className: 'avatar'}, React.createElement("img", {src: 'https://s.gravatar.com/avatar/d41e19c6709fe2ef85bb163b6654bd26?size=50&default=retro'})), "User XYZ")), React.createElement(layout_1.Vlayout, {hflex: 1}, React.createElement(menu_1.MenuItem, {className: 'menuItem', fonticon: 'fa fa-fw fa-home', label: 'Home'}), React.createElement(menu_1.MenuItem, {className: 'menuItem', fonticon: 'fa fa-fw', label: 'Function 1'}), React.createElement(menu_1.MenuItem, {className: 'menuItem', fonticon: 'fa fa-fw', label: 'Function 2'}), React.createElement(menu_1.MenuItem, {className: 'menuItem', fonticon: 'fa fa-fw fa-cog', label: 'Preferences'}), React.createElement(menu_1.MenuSeparator, null), React.createElement(menu_1.MenuItem, {className: 'menuItem', fonticon: 'fa fa-fw fa-sign-out', label: 'Logout'}))), React.createElement(layout_1.Hlayout, {vflex: 1, hflex: 1}, React.createElement(layout_1.Sider, {id: 'siderbar', vflex: 1, minSize: 100, maxSize: 300, invisible: !this.state.showSidebar, animation: { effect: widget_1.AniEffect.slideWidth }}, React.createElement(list_1.List, {id: 'function', vflex: 1, hflex: 1, style: { paddingTop: 4 }, onItemDoubleClick: this.onCaseDoubleClick.bind(this), model: testCases, itemRenderer: this.caseRenderer, selection: { isSelected: this.isCaseSelected.bind(this) }, doSelect: this.doCaseSelect.bind(this)})), React.createElement(layout_1.Box, {id: 'testBody', hflex: 1, vflex: 1}, this.state.content)), React.createElement(layout_1.Hlayout, {id: 'footer', align: 'middle'}, React.createElement(layout_1.Box, {className: 'fnbtn ' + (this.state.showSidebar ? 'fnbtn-active' : ''), vflex: 1, align: 'middle center', onClick: this.toggleSidebar.bind(this), tooltip: 'Toggle sidebar'}, React.createElement(widget_1.Fonticon, {className: 'fa fa-angle-double-' + (this.state.showSidebar ? 'left' : 'right')})), React.createElement(layout_1.Box, {id: 'srcName', align: 'middle center', invisible: !this.state.showSrcCode, onClick: this.toggleSrcCode.bind(this)}, this.state.selectedCase ? this.state.selectedCase.module + '.tsx' : ''), React.createElement(layout_1.Box, {className: 'copyright', vflex: 1, hflex: 1, align: 'middle right'}, "React WebKit © 2016")), React.createElement(layout_1.Box, {id: 'src', hflex: 1, invisible: !this.state.showSrcCode, animation: { effect: widget_1.AniEffect.slide }})));
        };
        return App;
    }(React.Component));
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/index.js.map
