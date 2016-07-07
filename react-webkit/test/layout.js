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
        define(["require", "exports", 'react', 'react-dom', '../main/widget', '../main/layout'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var w = require('../main/widget');
    var l = require('../main/layout');
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.state = { clickCount: 0, visible: true, flex: 1 };
        }
        App.prototype.componentDidMount = function () {
        };
        App.prototype.handleClick = function () {
            var c = this.state.clickCount + 1;
            this.setState({ clickCount: c, visible: !this.state.visible });
        };
        App.prototype.handleFlex = function () {
            var c = this.state.clickCount + 1;
            var f = this.state.flex + 1;
            if (f > 3) {
                f = 0;
            }
            this.setState({ clickCount: c, flex: f });
        };
        App.prototype.toggleDiv2 = function () {
            var ws = [this.refs['w1'], this.refs['w2'], this.refs['w3']];
            ws.forEach(function (each) {
                if (each.state.visible) {
                    each.hide();
                }
                else {
                    each.show();
                }
            });
        };
        App.prototype.render = function () {
            return (React.createElement(l.Vlayout, {vflex: 1, hflex: 1, style: { background: 'yellow', padding: '2px' }}, React.createElement(l.Hlayout, null, React.createElement("button", {onClick: this.handleClick.bind(this)}, "Toggle visibility ", this.state.clickCount), React.createElement("button", {onClick: this.handleFlex.bind(this)}, "Change flex ", this.state.clickCount), React.createElement("button", {onClick: this.toggleDiv2.bind(this)}, "Toggle Visibility by method")), React.createElement("div", null, "in Div AA"), React.createElement(l.Hlayout, {ref: 'w1', visible: this.state.visible, style: { background: 'lightblue', padding: '2px' }, hflex: 1, animation: { effect: w.AniEffect.fade }}, React.createElement(l.Box, {hflex: 1}, React.createElement("span", null, "abc ", this.state.clickCount), " "), React.createElement(l.Box, {hflex: 1}, React.createElement("span", null, "def ", this.state.clickCount), " "), React.createElement("span", null, React.createElement("span", null, "this is long long long", React.createElement("br", null), " long long long long text"))), React.createElement(l.Hlayout, {style: { background: 'gray', padding: '2px' }, vflex: 1, space: 10}, React.createElement("span", null, "123  ", this.state.clickCount, " "), React.createElement(l.Vlayout, {style: { background: 'lightpink', padding: '2px', overflowY: 'auto' }, hflex: this.state.flex, vflex: 1}, React.createElement("span", null, "xyz1 ", this.state.clickCount, " "), React.createElement("span", null, "ijk1 ", this.state.clickCount, " lkasdl falsjdfl asjdlfa jsdlfjal sdfjlasj dflasjdf lajsdlfjas ldfkjald falsdjl asdjfls djf")), React.createElement(l.Vlayout, {ref: 'w2', visible: this.state.visible, style: { background: 'lightseagreen', padding: '2px' }, hflex: 2, animation: { effect: w.AniEffect.slide }}, React.createElement("span", null, "xyz2 ", this.state.clickCount, " "), React.createElement("span", null, "ijk2 ", this.state.clickCount, " ")), React.createElement(l.Vlayout, {style: { background: 'lightskyblue', padding: '2px' }, hflex: 1}, React.createElement("span", null, "xyz3 ", this.state.clickCount, " "), React.createElement("span", null, "ijk3 ", this.state.clickCount, " ")), React.createElement("span", null, "456  ", this.state.clickCount, " ")), React.createElement(l.Vlayout, {style: { background: 'gray', padding: '2px' }, vflex: 1}, React.createElement(l.Box, {vflex: 1}, React.createElement(l.Vlayout, {hflex: 1, vflex: 1, space: 10}, React.createElement(l.Box, {vflex: 1, style: { background: 'lightgreen' }, visible: this.state.visible}, "callback div 1"), React.createElement(l.Box, {vflex: this.state.flex, style: { background: 'lightpink' }, ref: 'w3'}, "callback div 2")))), React.createElement("div", null, "in Div BB")));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/layout.js.map
