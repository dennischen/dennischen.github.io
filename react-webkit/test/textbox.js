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
        define(["require", "exports", 'react', 'react-dom', '../main/input', '../main/layout'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var i = require('../main/input');
    var l = require('../main/layout');
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.state = { msg: 'start to operation', value: '' };
        }
        App.prototype.componentDidMount = function () {
        };
        App.prototype.doChange = function (value) {
            this.setState({ msg: 'doChange to ' + value, value: value });
        };
        App.prototype.onChange = function (evt) {
            var value = evt.target.value;
            this.setState({ msg: 'onChange to ' + value, value: value });
        };
        App.prototype.render = function () {
            return (React.createElement(l.Vlayout, {vflex: 1, hflex: 1, space: 10, style: { padding: 10, overflow: 'auto' }}, React.createElement(l.Hlayout, null, this.state.msg), React.createElement("label", null, React.createElement(i.Textbox, {onChange: this.onChange.bind(this), value: this.state.value, placeholder: 'Simple text'}), " onChange"), React.createElement("label", null, React.createElement(i.Textbox, {doChange: this.doChange.bind(this), value: this.state.value, placeholder: 'Password', type: i.TextboxType.password}), " doChange (password) "), React.createElement("label", null, React.createElement(i.Textbox, {value: this.state.value}), " text follow last edit(can't chage this)"), React.createElement(i.Textbox, {defaultValue: this.state.value, hflex: 1}), React.createElement(i.Textbox, {defaultValue: this.state.value, style: { width: 250, height: 100 }, doChange: this.doChange.bind(this), type: i.TextboxType.textarea}), React.createElement(l.Box, {style: { width: 300, height: 120 }}, React.createElement(i.Textbox, {defaultValue: this.state.value, hflex: 1, vflex: 1, placeholder: 'Text area', doChange: this.doChange.bind(this), type: 'textarea'})), "---------", React.createElement("label", null, "Free Textbox : ", React.createElement(i.Textbox, null)), React.createElement("label", null, "Disabled Textbox : ", React.createElement(i.Textbox, {value: this.state.value, disabled: true}))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/textbox.js.map
