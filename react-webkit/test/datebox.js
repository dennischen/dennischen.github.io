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
        define(["require", "exports", 'react', 'react-dom', '../main/calendar', '../main/layout'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var calendar_1 = require('../main/calendar');
    var layout_1 = require('../main/layout');
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.state = { msg: 'Click on datebox and select a date', value: new Date() };
        }
        App.prototype.doChange = function (date) {
            this.setState({
                msg: 'Select ' + date,
                value: date
            });
            return true;
        };
        App.prototype.render = function () {
            return (React.createElement(layout_1.Vlayout, {vflex: 1, hflex: 1, space: 10, style: { padding: 10, overflow: 'auto' }}, React.createElement(layout_1.Hlayout, null, this.state.msg), React.createElement(calendar_1.Datebox, {doChange: this.doChange.bind(this), value: this.state.value, format: 'YYYY/MM/DD', placeholder: 'Select a date 1'}), React.createElement("label", null, React.createElement(calendar_1.Datebox, {value: this.state.value, placeholder: 'Select a date 2', firstDayOfWeek: 1}), " follow last edit(can't chage this)"), React.createElement(calendar_1.Datebox, {hflex: 1, placeholder: 'A free datebox'}), "---------", React.createElement("label", null, "Disabled Datebox : ", React.createElement(calendar_1.Datebox, {value: this.state.value, disabled: true})), React.createElement(layout_1.Box, {vflex: 1, align: 'bottom right'}, React.createElement(calendar_1.Datebox, {placeholder: 'Test popup at edge'}))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/datebox.js.map
