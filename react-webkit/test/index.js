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
        define(["require", "exports", 'react', 'react-dom', '../main/widget', '../main/popup', '../main/layout', '../main/list'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var w = require('../main/widget');
    var p = require('../main/popup');
    var l = require('../main/layout');
    var ls = require('../main/list');
    var testcaseurl = function (testcase) {
        return 'cases.html?testcase=' + testcase;
    };
    var testCases = [
        { name: 'Align', module: 'align' },
        { name: 'Alert', module: 'alert' },
        { name: 'Animate', module: 'animate' },
        { name: 'Tooltip', module: 'tooltip' },
        { name: 'Box', module: 'box' },
        { name: 'Checkbox', module: 'checkbox' },
        { name: 'Layout', module: 'layout' },
        { name: 'List', module: 'list' },
        { name: 'Margin', module: 'margin' },
        { name: 'Vlayout', module: 'vlayout' },
        { name: 'Sider', module: 'sider' },
        { name: 'Popup', module: 'popup' },
        { name: 'Modal', module: 'modal' },
        { name: 'Radiobox', module: 'radiobox' },
        { name: 'Textbox', module: 'textbox' },
        { name: 'Button', module: 'button' },
        { name: 'Anchor', module: 'anchor' },
        { name: 'Lifecycle', module: 'lifecycle' },
        { name: '*Commentbox', module: 'test-commentbox', html: 'test-commentbox.html' }
    ];
    testCases = testCases.sort(function (a, b) {
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
                content: React.createElement(l.Box, {hflex: 1, vflex: 1, align: 'middle center'}, React.createElement("h4", null, "Select left list item to load specific test case, ", React.createElement("br", null), " Double click to open test in new tab"))
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
                }.bind(this));
            }
        };
        App.prototype.onCaseDoubleClick = function (evt, idx, item) {
            window.open(item.html ? item.html : testcaseurl(item.module), '_blank');
        };
        App.prototype.toggleMenu = function () {
            var menu = this.refs['menu'];
            if (menu.state.hidden) {
                menu.show('#banner', {
                    autoDismiss: true, autoDismissHolders: ['.menubtn'],
                    targetHPos: w.HPos.left, targetVPos: w.VPos.bottom,
                    selfHPos: w.HPos.left, selfVPos: w.VPos.top, adjustX: 1, adjustY: 1
                });
            }
            else {
                menu.hide();
            }
        };
        App.prototype.doMenuSelect = function (select, idx, item) {
            this.toggleMenu();
        };
        App.prototype.toggleSidebar = function () {
            this.setState({ showSidebar: !this.state.showSidebar });
        };
        App.prototype.toggleSrcCode = function () {
            this.setState({ showSrcCode: !this.state.showSrcCode });
        };
        App.prototype.render = function () {
            return (React.createElement(l.Vlayout, {hflex: 1, vflex: 1}, React.createElement(l.Hlayout, {id: 'banner', align: 'middle', space: 4, hflex: 1}, React.createElement(l.Box, {className: 'menubtn', vflex: 1, align: 'middle center', onClick: this.toggleMenu.bind(this), tooltip: 'Toggle menu'}, React.createElement(w.Fonticon, {className: 'fa fa-bars'})), React.createElement("span", {className: 'title'}, "WebKit - Tests"), React.createElement(l.Hlayout, {vflex: 1, hflex: 1, align: 'bottom right'}, React.createElement(l.Box, {className: 'fnbtn ' + (this.state.showSrcCode ? 'fnbtn-active' : ''), align: 'middle center', onClick: this.toggleSrcCode.bind(this), hidden: this.state.selectedCase ? false : true, tooltip: "Toggle source"}, React.createElement(w.Fonticon, {className: 'fa fa-code '})))), React.createElement(p.Popup, {id: 'menu', ref: 'menu', animation: { effect: w.AniEffect.fade }}, React.createElement("div", {className: 'title'}, React.createElement(l.Hlayout, {align: 'left middle', space: 10}, React.createElement("div", {className: 'avatar'}, React.createElement("img", {src: 'https://s.gravatar.com/avatar/d41e19c6709fe2ef85bb163b6654bd26?size=50&default=retro'})), "User XYZ")), React.createElement(l.Vlayout, {hflex: 1, vflex: 1, space: 10}, React.createElement(ls.List, {hflex: 1, doSelect: this.doMenuSelect.bind(this)}, React.createElement(w.Anchor, {className: 'menuItem'}, "Menu 1"), React.createElement(w.Anchor, {className: 'menuItem'}, "Menu 2"), React.createElement(w.Anchor, {className: 'menuItem'}, "Menu 3"), React.createElement(w.Anchor, {className: 'menuItem'}, "Menu 4"), React.createElement(w.Anchor, {className: 'menuItem'}, "Menu 5"), React.createElement(w.Anchor, {className: 'menuItem'}, "Menu 6"), React.createElement(w.Anchor, {className: 'menuItem'}, "Menu 7")))), React.createElement(l.Hlayout, {vflex: 1, hflex: 1}, React.createElement(l.Sider, {id: 'siderbar', vflex: 1, minSize: 100, maxSize: 300, hidden: !this.state.showSidebar, animation: { effect: w.AniEffect.slideWidth }}, React.createElement(ls.List, {id: 'function', vflex: 1, hflex: 1, style: { paddingTop: 4 }, onItemDoubleClick: this.onCaseDoubleClick.bind(this), model: testCases, itemRenderer: this.caseRenderer, selection: { isSelected: this.isCaseSelected.bind(this) }, doSelect: this.doCaseSelect.bind(this)})), React.createElement(l.Box, {id: 'testBody', hflex: 1, vflex: 1}, this.state.content)), React.createElement(l.Hlayout, {id: 'footer', align: 'middle'}, React.createElement(l.Box, {className: 'fnbtn ' + (this.state.showSidebar ? 'fnbtn-active' : ''), vflex: 1, align: 'middle center', onClick: this.toggleSidebar.bind(this), tooltip: 'Toggle sidebar'}, React.createElement(w.Fonticon, {className: 'fa fa-angle-double-' + (this.state.showSidebar ? 'left' : 'right')})), React.createElement(l.Box, {id: 'srcName', align: 'middle center', hidden: this.state.showSrcCode ? false : true, onClick: this.toggleSrcCode.bind(this)}, this.state.selectedCase ? this.state.selectedCase.module + '.tsx' : ''), React.createElement(l.Box, {className: 'copyright', vflex: 1, hflex: 1, align: 'middle right'}, "React WebKit © 2016")), React.createElement(l.Box, {id: 'src', hflex: 1, hidden: !this.state.showSrcCode, animation: { effect: w.AniEffect.slide }})));
        };
        return App;
    }(React.Component));
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/index.js.map
