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
    var widget_1 = require('../main/widget');
    var layout_1 = require('../main/layout');
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.state = { clickCount: 0, invisible: true };
        }
        App.prototype.handleClick = function () {
            var c = this.state.clickCount + 1;
            this.setState({ clickCount: c, invisible: !this.state.invisible });
        };
        App.prototype.render = function () {
            var _this = this;
            return (React.createElement(layout_1.Vlayout, {hflex: 1, vflex: 1}, React.createElement("button", {onClick: function () { _this.handleClick(); }}, "Toggle visibility ", this.state.clickCount), React.createElement(layout_1.Hlayout, {hflex: 1, vflex: 1}, React.createElement(layout_1.Vlayout, {hflex: 1, style: { background: 'yellow', padding: '2px' }}, React.createElement(layout_1.Box, null, "Top"), React.createElement(layout_1.Box, {invisible: this.state.invisible, style: { background: 'blue', padding: '2px' }, animation: { effect: widget_1.AniEffect.fade, duration: 500 }}, "AAAA"), React.createElement(layout_1.Box, null, "Bottom")), React.createElement(layout_1.Vlayout, {hflex: 1, style: { background: 'yellow', padding: '2px' }}, React.createElement(layout_1.Box, null, "Top"), React.createElement(layout_1.Box, {invisible: !this.state.invisible, style: { background: 'blue', padding: '2px' }, animation: { effect: widget_1.AniEffect.fade, duration: 500, eager: true }}, "AAAA"), React.createElement(layout_1.Box, null, "Bottom")), React.createElement(layout_1.Vlayout, {hflex: 1, style: { background: 'yellow', padding: '2px' }}, React.createElement(layout_1.Box, null, "Top"), React.createElement(layout_1.Box, {invisible: this.state.invisible, style: { background: 'green', padding: '2px' }, animation: { effect: widget_1.AniEffect.slide, duration: 500 }}, "BBB"), React.createElement(layout_1.Box, null, "Bottom")), React.createElement(layout_1.Vlayout, {hflex: 1, style: { background: 'yellow', padding: '2px' }}, React.createElement(layout_1.Box, null, "Top"), React.createElement(layout_1.Box, {invisible: !this.state.invisible, style: { background: 'green', padding: '2px' }, animation: { effect: widget_1.AniEffect.slide, duration: 500, eager: true }}, "BBB"), React.createElement(layout_1.Box, null, "Bottom")), React.createElement(layout_1.Vlayout, {hflex: 1, style: { background: 'yellow', padding: '2px' }}, React.createElement(layout_1.Box, null, "Top"), React.createElement(layout_1.Box, {invisible: this.state.invisible, style: { background: 'blue', padding: '2px' }, animation: { effect: widget_1.AniEffect.fade, duration: 500 }}, "AAAA"), React.createElement(layout_1.Box, {invisible: this.state.invisible, style: { background: 'green', padding: '2px' }, animation: { effect: widget_1.AniEffect.slide, duration: 500 }}, "BBB"), React.createElement(layout_1.Box, null, "Bottom")), React.createElement(layout_1.Vlayout, {hflex: 1, style: { background: 'yellow', padding: '2px' }}, React.createElement(layout_1.Box, null, "Top"), React.createElement(layout_1.Box, {invisible: !this.state.invisible, style: { background: 'blue', padding: '2px' }, animation: { effect: widget_1.AniEffect.fade, duration: 500, eager: true }}, "AAAA"), React.createElement(layout_1.Box, {invisible: !this.state.invisible, style: { background: 'green', padding: '2px' }, animation: { effect: widget_1.AniEffect.slide, duration: 500, eager: true }}, "BBB"), React.createElement(layout_1.Box, null, "Bottom"))), React.createElement(layout_1.Vlayout, {hflex: 1, vflex: 1}, React.createElement(layout_1.Hlayout, {hflex: 1}, React.createElement(layout_1.Box, null, "Left"), React.createElement(layout_1.Box, {invisible: !this.state.invisible, style: { background: 'orange', padding: '2px' }, animation: { effect: widget_1.AniEffect.slideWidth, duration: 500, eager: true }}, "AAAA"), React.createElement(layout_1.Box, {hflex: 1, style: { width: '300px', background: 'yellow', padding: '2px' }}, "Right 1"), React.createElement(layout_1.Box, {style: { background: 'yellow', padding: '2px', textAlign: 'right' }}, "Right 2")), React.createElement(layout_1.Hlayout, {hflex: 1}, React.createElement(layout_1.Box, null, "Left"), React.createElement(layout_1.Box, {invisible: this.state.invisible, style: { background: 'orange', padding: '2px' }, animation: { effect: widget_1.AniEffect.slideWidth, duration: 500, eager: true }}, "AAAA"), React.createElement(layout_1.Box, {hflex: 1, style: { width: '300px', background: 'yellow', padding: '2px' }}, "Right 1"), React.createElement(layout_1.Box, {style: { background: 'yellow', padding: '2px', textAlign: 'right' }}, "Right 2")))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/animate.js.map
