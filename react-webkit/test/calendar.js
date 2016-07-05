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
        define(["require", "exports", 'react', 'react-dom', '../main/layout', '../main/datetime'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var layout_1 = require('../main/layout');
    var datetime_1 = require('../main/datetime');
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.state = {
                msg: 'Select a date',
                date1: new Date()
            };
        }
        App.prototype.doSelect = function (date) {
            this.setState({
                msg: 'Selected:' + (date ? date.toLocaleDateString() : undefined),
                date1: date,
                date2: date
            });
        };
        App.prototype.render = function () {
            return (React.createElement(layout_1.Vlayout, {space: 10, style: { padding: 10 }}, this.state.msg, React.createElement(layout_1.Hlayout, {space: 10}, React.createElement(datetime_1.Calendar, {date: this.state.date1, doSelect: this.doSelect.bind(this)}), React.createElement(datetime_1.Calendar, {date: this.state.date2, doSelect: this.doSelect.bind(this), firstDayOfWeek: 1})), React.createElement(datetime_1.Calendar, {doSelect: this.doSelect.bind(this), style: { width: 400, height: 400 }})));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/calendar.js.map
