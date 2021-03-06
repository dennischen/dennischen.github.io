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
        define(["require", "exports", 'react', 'react-dom', '../main/layout'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var layout_1 = require('../main/layout');
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.state = { clickCount: 0, hidden: false };
        }
        App.prototype.componentDidMount = function () {
        };
        App.prototype.handleClick = function () {
            console.log(this.refs);
            var c = this.state.clickCount + 1;
            this.setState({ clickCount: c, hidden: !this.state.hidden });
        };
        App.prototype.render = function () {
            return (React.createElement(layout_1.Vlayout, {vflex: 1, hflex: 1, style: { padding: '2px' }, space: 10}, React.createElement("div", null, "in Div AA"), React.createElement(layout_1.Hlayout, {vflex: 1, hflex: 1, style: { padding: '2px' }}, React.createElement(layout_1.Vlayout, {align: 'left top', hflex: 1, vflex: 1, style: { border: '1px solid' }}, "Left ", React.createElement("br", null), " Top"), React.createElement(layout_1.Vlayout, {align: 'center top', hflex: 1, vflex: 1, style: { border: '1px solid' }}, "Center ", React.createElement("br", null), " Top"), React.createElement(layout_1.Vlayout, {align: 'right top', hflex: 1, vflex: 1, style: { border: '1px solid' }}, "Right ", React.createElement("br", null), " Top")), React.createElement(layout_1.Hlayout, {vflex: 1, hflex: 1, style: { padding: '2px' }}, React.createElement(layout_1.Vlayout, {align: 'left middle', hflex: 1, vflex: 1, style: { border: '1px solid' }}, "Left ", React.createElement("br", null), " Middle"), React.createElement(layout_1.Vlayout, {align: 'center middle', hflex: 1, vflex: 1, style: { border: '1px solid', overflowY: 'auto' }}, "Center ", React.createElement("br", null), " Middle ", React.createElement("br", null), "Long Content ", React.createElement("br", null), " Long Content ", React.createElement("br", null), "Long Content", React.createElement("br", null), "Long Content ", React.createElement("br", null), " Long Content ", React.createElement("br", null), "Long Content", React.createElement("br", null)), React.createElement(layout_1.Vlayout, {align: 'right middle', hflex: 1, vflex: 1, style: { border: '1px solid' }}, "Right ", React.createElement("br", null), " Middle")), React.createElement(layout_1.Hlayout, {vflex: 1, hflex: 1, style: { padding: '2px' }}, React.createElement(layout_1.Vlayout, {align: 'left bottom', hflex: 1, vflex: 1, style: { border: '1px solid' }}, "Left ", React.createElement("br", null), " Bottom"), React.createElement(layout_1.Vlayout, {align: 'center bottom', hflex: 1, vflex: 1, style: { border: '1px solid' }}, "Center ", React.createElement("br", null), " Bottom"), React.createElement(layout_1.Vlayout, {align: 'right bottom', hflex: 1, vflex: 1, style: { border: '1px solid' }}, "Right ", React.createElement("br", null), " Bottom")), React.createElement("div", null, "in Div BB")));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/vlayout.js.map
