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
            this.state = { invisible: false };
        }
        App.prototype.doToggle = function () {
            this.setState({ invisible: !this.state.invisible });
        };
        App.prototype.render = function () {
            return (React.createElement(layout_1.Box, {hflex: 1, vflex: 1, align: 'center middle'}, React.createElement(layout_1.Vlayout, {style: { width: 400, height: 600 }}, React.createElement(layout_1.Hlayout, {align: 'middle', space: 10}, React.createElement(widget_1.Button, {label: "Toggle", onClick: this.doToggle.bind(this)})), React.createElement(widget_1.Alert, {title: 'Error!', label: "This is an error", alertType: 'error'}), React.createElement(widget_1.Alert, {fonticon: 'fa fa-exclamation-triangle', title: 'Warning!', label: "This is a warning", alertType: 'warning', invisible: this.state.invisible}), React.createElement(widget_1.Alert, {alertType: 'info'}, React.createElement("strong", null, "Information"), React.createElement(widget_1.Fonticon, {className: 'fa fa-info-circle fa-lg'}), "This is information"), React.createElement(widget_1.Alert, {label: "This is success", alertType: 'success', animation: { effect: 'fade', eager: true }, invisible: this.state.invisible}))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/alert.js.map
