/**
 * React WebKit - v0.0.2
 * The react widget kit base on typescript
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
        define(["require", "exports", 'react', 'react-dom', '../main/widget', '../main/layout'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var w = require('../main/widget');
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
                sidebar: true,
                content: React.createElement(l.Box, {hflex: 1, vflex: 1, align: 'middle center'}, React.createElement("h4", null, "Select left list item to load specific test case, ", React.createElement("br", null), " Double click to open test in new tab"))
            };
        }
        App.prototype.isCaseSelected = function (index, item) {
            return this.state.selectedCase == item;
        };
        App.prototype.doCaseSelect = function (select, idx, item) {
            if (select) {
                this.setState({ selectedCase: item });
                require([item.module], function (m) {
                    this.setState({ content: React.createElement(m.App, null) });
                }.bind(this));
            }
        };
        App.prototype.onCaseDoubleClick = function (evt, idx, item) {
            window.open(item.html, '_blank');
        };
        App.prototype.toggleMenu = function () {
            alert('Todo');
        };
        App.prototype.toggleSidebar = function () {
            this.setState({ sidebar: !this.state.sidebar });
        };
        App.prototype.render = function () {
            return (React.createElement(l.Vlayout, {hflex: 1, vflex: 1}, React.createElement(l.Hlayout, {id: 'banner', align: 'middle', space: 4}, React.createElement(l.Box, {className: 'menubtn', vflex: 1, align: 'middle center', onClick: this.toggleMenu.bind(this)}, React.createElement(w.Fonticon, {className: 'fa fa-bars'})), React.createElement("span", {className: 'title'}, "WebKit - Tests")), React.createElement(l.Hlayout, {vflex: 1, hflex: 1}, React.createElement(l.Sider, {id: 'siderbar', vflex: 1, minSize: 100, maxSize: 300, hidden: !this.state.sidebar, animation: { effect: w.AniEffect.slideWidth }}, React.createElement(w.List, {id: 'function', vflex: 1, hflex: 1, style: { paddingTop: 4 }, onItemDoubleClick: this.onCaseDoubleClick.bind(this), model: testCases, itemRenderer: this.caseRenderer, selection: { isSelected: this.isCaseSelected.bind(this) }, doSelect: this.doCaseSelect.bind(this)})), React.createElement(l.Box, {id: 'testContent', hflex: 1, vflex: 1}, this.state.content)), React.createElement(l.Hlayout, {id: 'footer'}, React.createElement(l.Box, {className: 'fnbtn', vflex: 1, align: 'middle center', onClick: this.toggleSidebar.bind(this)}, React.createElement(w.Fonticon, {className: 'fa fa-angle-double-' + (this.state.sidebar ? 'left' : 'right')})), React.createElement(l.Box, {className: 'copyright', vflex: 1, hflex: 1, align: 'middle right'}, "React WebKit © 2016"))));
        };
        return App;
    }(React.Component));
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/index.js.map
