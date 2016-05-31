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
        define(["require", "exports", 'react', 'react-dom', '../main/widget', '../main/popup', '../main/layout'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var w = require('../main/widget');
    var p = require('../main/popup');
    var l = require('../main/layout');
    var testCases = [
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
                    return React.createElement("div", {style: { padding: 4 }}, each.name);
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
            window.open(item.html, '_blank');
        };
        App.prototype.toggleMenu = function () {
            var menu = this.refs['menu'];
            if (menu.state.hidden) {
                menu.show('#banner', {
                    autoDismiss: true,
                    targetHPos: w.HPos.left, targetVPos: w.VPos.bottom,
                    selfHPos: w.HPos.left, selfVPos: w.VPos.top, adjustX: 1, adjustY: 1
                });
            }
            else {
                menu.hide();
            }
        };
        App.prototype.toggleSidebar = function () {
            this.setState({ showSidebar: !this.state.showSidebar });
        };
        App.prototype.toggleSrcCode = function () {
            this.setState({ showSrcCode: !this.state.showSrcCode });
        };
        App.prototype.render = function () {
            return (React.createElement(l.Vlayout, {hflex: 1, vflex: 1}, React.createElement(l.Hlayout, {id: 'banner', align: 'middle', space: 4, hflex: 1}, React.createElement(l.Box, {className: 'menubtn', vflex: 1, align: 'middle center', onClick: this.toggleMenu.bind(this)}, React.createElement(w.Fonticon, {className: 'fa fa-bars'})), React.createElement("span", {className: 'title'}, "WebKit - Tests"), React.createElement(l.Hlayout, {vflex: 1, hflex: 1, align: 'bottom right'}, React.createElement(l.Box, {className: 'fnbtn ' + (this.state.showSrcCode ? 'fnbtn-active' : ''), align: 'middle center', onClick: this.toggleSrcCode.bind(this), hidden: this.state.selectedCase ? false : true}, React.createElement(w.Fonticon, {className: 'fa fa-code '})))), React.createElement(l.Hlayout, {vflex: 1, hflex: 1}, React.createElement(l.Sider, {id: 'siderbar', vflex: 1, minSize: 100, maxSize: 300, hidden: !this.state.showSidebar, animation: { effect: w.AniEffect.slideWidth }}, React.createElement(w.List, {id: 'function', vflex: 1, hflex: 1, style: { paddingTop: 4 }, onItemDoubleClick: this.onCaseDoubleClick.bind(this), model: testCases, itemRenderer: this.caseRenderer, selection: { isSelected: this.isCaseSelected.bind(this) }, doSelect: this.doCaseSelect.bind(this)})), React.createElement(l.Box, {id: 'testBody', hflex: 1, vflex: 1}, this.state.content)), React.createElement(l.Hlayout, {id: 'footer', align: 'middle'}, React.createElement(l.Box, {className: 'fnbtn ' + (this.state.showSidebar ? 'fnbtn-active' : ''), vflex: 1, align: 'middle center', onClick: this.toggleSidebar.bind(this)}, React.createElement(w.Fonticon, {className: 'fa fa-angle-double-' + (this.state.showSidebar ? 'left' : 'right')})), React.createElement(l.Box, {id: 'srcName', align: 'middle center', hidden: this.state.showSrcCode ? false : true}, this.state.selectedCase ? this.state.selectedCase.module + '.tsx' : ''), React.createElement(l.Box, {className: 'copyright', vflex: 1, hflex: 1, align: 'middle right'}, "React WebKit © 2016")), React.createElement(l.Box, {id: 'src', hflex: 1, hidden: !this.state.showSrcCode, animation: { effect: w.AniEffect.slide }}), React.createElement(p.Popup, {id: 'menu', ref: 'menu', animation: { effect: w.AniEffect.fade }}, React.createElement(l.Vlayout, {hflex: 1, vflex: 1, space: 10}, React.createElement("span", null, "Welcome, User"), React.createElement(w.List, {hflex: 1, doSelect: this.toggleMenu.bind(this)}, React.createElement("div", {style: { padding: 4 }}, "Menu 1"), React.createElement("div", {style: { padding: 4 }}, "Menu 2"), React.createElement("div", {style: { padding: 4 }}, "Menu 3"), React.createElement("div", {style: { padding: 4 }}, "Menu 4"), React.createElement("div", {style: { padding: 4 }}, "Menu 5"), React.createElement("div", {style: { padding: 4 }}, "Menu 6"))))));
        };
        return App;
    }(React.Component));
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/index.js.map
