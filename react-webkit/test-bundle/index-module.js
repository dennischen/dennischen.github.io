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
        define(["require", "exports", 'react', 'react-dom', '../main/widget', '../main/layout', '../main/list', '../main/input', '../main/calendar', '../main/menu'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var widget_1 = require('../main/widget');
    var layout_1 = require('../main/layout');
    ;
    var list_1 = require('../main/list');
    var input_1 = require('../main/input');
    var calendar_1 = require('../main/calendar');
    var menu_1 = require('../main/menu');
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.state = { clickCount: 0, invisible: false, selection: new widget_1.IndexSelection() };
        }
        App.prototype.handleClick = function () {
            var c = this.state.clickCount + 1;
            this.setState({ clickCount: c, invisible: !this.state.invisible });
        };
        App.prototype.render = function () {
            var _this = this;
            var doSelect = function (select, idx, item) {
                if (select) {
                    _this.setState({ selection: _this.state.selection.select(idx) });
                }
                else {
                    _this.setState({ selection: _this.state.selection.unselect(idx) });
                }
            };
            return (React.createElement(layout_1.Vlayout, {vflex: 1, hflex: 1, style: { padding: '2px' }}, React.createElement("button", {onClick: function () { _this.handleClick(); }}, "Toggle visibility ", this.state.clickCount), React.createElement(layout_1.Hlayout, {invisible: this.state.invisible, style: { background: 'lightblue', padding: '2px' }, hflex: 1, animation: { effect: widget_1.AniEffect.fade }}, React.createElement(layout_1.Box, {hflex: 1}, React.createElement("span", null, "abc ", this.state.clickCount), " "), React.createElement(layout_1.Box, {hflex: 1}, React.createElement("span", null, "def ", this.state.clickCount), " "), React.createElement("span", null, React.createElement("span", null, "this is long long long", React.createElement("br", null), " long long long long text"))), React.createElement(layout_1.Hlayout, {style: { background: 'gray', padding: '2px' }, vflex: 1, space: 10}, React.createElement("span", null, "123  ", this.state.clickCount, " "), React.createElement(layout_1.Vlayout, {style: { background: 'lightpink', padding: '2px' }, hflex: 1, vflex: 1}, React.createElement("span", null, "xyz1 ", this.state.clickCount, " "), React.createElement(calendar_1.Datebox, null), React.createElement(calendar_1.Calendar, {hflex: 1, vflex: 1})), React.createElement(layout_1.Vlayout, {invisible: this.state.invisible, style: { background: 'lightseagreen', padding: '2px' }, hflex: 2, animation: { effect: widget_1.AniEffect.slide }}, React.createElement("span", null, "xyz2 ", this.state.clickCount, " "), React.createElement(menu_1.MenuItem, {label: 'Copy', value: 'copy'}), React.createElement(menu_1.MenuItem, {label: 'Paste'}), React.createElement(menu_1.MenuItem, {label: 'Preferences', popupSide: 'right'}, React.createElement(layout_1.Vlayout, null, React.createElement(menu_1.MenuItem, {label: 'Font'}), React.createElement(menu_1.MenuItem, {label: 'Color'}), React.createElement(menu_1.MenuItem, {label: 'Format'}))), React.createElement(menu_1.MenuItem, {label: 'Disabled', disabled: true})), React.createElement(layout_1.Vlayout, {style: { background: 'lightskyblue', padding: '2px' }, hflex: 1}, React.createElement("span", null, "xyz3 ", this.state.clickCount, " "), React.createElement("span", null, "ijk3 ", this.state.clickCount, " ")), React.createElement("span", null, "456  ", this.state.clickCount, " ")), React.createElement(list_1.List, {style: { background: 'lightblue', padding: '2px' }, vflex: 1, hflex: 1, selection: this.state.selection, doSelect: doSelect}, React.createElement("span", null, "MULTIPLE Selection List"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ")), React.createElement(layout_1.Hlayout, {tooltip: "A tool tip"}, React.createElement(input_1.Checkbox, {label: 'A Checkbox'}), React.createElement(input_1.Radiobox, {label: 'A Radio', tooltip: 'Another tool tip'}))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    ReactDOM.render(React.createElement(App, null), document.getElementById('content'));
});

//# sourceMappingURL=srcmap/index-module.js.map
