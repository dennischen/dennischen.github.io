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
        define(["require", "exports", 'react', 'react-dom', '@atticcat/react-webkit'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var wk = require('@atticcat/react-webkit');
    var w = wk.Widget;
    var i = wk.Input;
    var l = wk.Layout;
    var ls = wk.List;
    var c = wk.Calendar;
    var m = wk.Menu;
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.state = { clickCount: 0, invisible: false, selection: new w.IndexSelection() };
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
            return (React.createElement(l.Vlayout, {vflex: 1, hflex: 1, style: { padding: '2px' }}, React.createElement("button", {onClick: function () { _this.handleClick(); }}, "Toggle visibility ", this.state.clickCount), React.createElement(l.Hlayout, {invisible: this.state.invisible, style: { background: 'lightblue', padding: '2px' }, hflex: 1, animation: { effect: w.AniEffect.fade }}, React.createElement(l.Box, {hflex: 1}, React.createElement("span", null, "abc ", this.state.clickCount), " "), React.createElement(l.Box, {hflex: 1}, React.createElement("span", null, "def ", this.state.clickCount), " "), React.createElement("span", null, React.createElement("span", null, "this is long long long", React.createElement("br", null), " long long long long text"))), React.createElement(l.Hlayout, {style: { background: 'gray', padding: '2px' }, vflex: 1, space: 10}, React.createElement("span", null, "123  ", this.state.clickCount, " "), React.createElement(l.Vlayout, {style: { background: 'lightpink', padding: '2px' }, hflex: 1, vflex: 1}, React.createElement("span", null, "xyz1 ", this.state.clickCount, " "), React.createElement(c.Datebox, null), React.createElement(c.Calendar, {hflex: 1, vflex: 1})), React.createElement(l.Vlayout, {invisible: this.state.invisible, style: { background: 'lightseagreen', padding: '2px' }, hflex: 2, animation: { effect: w.AniEffect.slide }}, React.createElement("span", null, "xyz2 ", this.state.clickCount, " "), React.createElement(m.MenuItem, {label: 'Copy', value: 'copy'}), React.createElement(m.MenuItem, {label: 'Paste'}), React.createElement(m.MenuItem, {label: 'Preferences', popupSide: 'right'}, React.createElement(l.Vlayout, null, React.createElement(m.MenuItem, {label: 'Font'}), React.createElement(m.MenuItem, {label: 'Color'}), React.createElement(m.MenuItem, {label: 'Format'}))), React.createElement(m.MenuItem, {label: 'Disabled', disabled: true})), React.createElement(l.Vlayout, {style: { background: 'lightskyblue', padding: '2px' }, hflex: 1}, React.createElement("span", null, "xyz3 ", this.state.clickCount, " "), React.createElement("span", null, "ijk3 ", this.state.clickCount, " ")), React.createElement("span", null, "456  ", this.state.clickCount, " ")), React.createElement(ls.List, {style: { background: 'lightblue', padding: '2px' }, vflex: 1, hflex: 1, selection: this.state.selection, doSelect: doSelect}, React.createElement("span", null, "MULTIPLE Selection List"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ")), React.createElement(l.Hlayout, {tooltip: "A tool tip"}, React.createElement(i.Checkbox, {label: 'A Checkbox'}), React.createElement(i.Radiobox, {label: 'A Radio', tooltip: 'Another tool tip'}))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    ReactDOM.render(React.createElement(App, null), document.getElementById('content'));
});

//# sourceMappingURL=srcmap/index-bundle.js.map
