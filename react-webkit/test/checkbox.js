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
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.state = { msg: 'start to operation', checked: true };
        }
        App.prototype.componentDidMount = function () {
        };
        App.prototype.doCheck = function (checked) {
            this.setState({ msg: 'Checked ' + checked, checked: checked });
        };
        App.prototype.onChange = function (evt) {
            var checked = evt.target.checked;
            this.setState({ msg: 'Checked ' + checked, checked: checked });
        };
        App.prototype.render = function () {
            return (React.createElement(l.Vlayout, {vflex: 1, style: { padding: 10, background: 'lightblue' }, space: 10}, React.createElement(l.Hlayout, null, this.state.msg), React.createElement(w.Checkbox, {id: 'cb1', label: 'Label checkable', style: { fontSize: 40, background: 'lightpink' }, doCheck: this.doCheck.bind(this)}), React.createElement(w.Checkbox, {doCheck: this.doCheck.bind(this)}), "---------", React.createElement(w.Checkbox, {checked: this.state.checked, label: 'You can\' check this, the status follow the last checking'}), "---------", React.createElement(w.Checkbox, {label: 'Free checkbox'}), React.createElement(w.Checkbox, {label: 'Disabled checkbox', disabled: true})));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/checkbox.js.map
