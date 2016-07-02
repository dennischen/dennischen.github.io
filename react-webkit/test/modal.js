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
        define(["require", "exports", 'react', 'react-dom', '../main/widget', '../main/input', '../main/layout', '../main/modal'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var widget_1 = require('../main/widget');
    var input_1 = require('../main/input');
    var layout_1 = require('../main/layout');
    var modal_1 = require('../main/modal');
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.state = { modal1: true, modal2: false };
        }
        App.prototype.setModal1 = function (show) {
            this.setState({ modal1: show });
        };
        App.prototype.setModal2 = function (show) {
            this.setState({ modal2: show });
        };
        App.prototype.render = function () {
            var _this = this;
            return (React.createElement(layout_1.Box, {hflex: 1, vflex: 1}, React.createElement(layout_1.Vlayout, {space: 10}, React.createElement(layout_1.Hlayout, {align: 'middle', space: 10}, React.createElement(widget_1.Button, {label: 'Modal 1', onClick: function () { _this.setModal1(true); }}), React.createElement(widget_1.Button, {label: 'Modal 2', onClick: function () { _this.setModal2(true); }}))), React.createElement(modal_1.Modal, {show: this.state.modal1, doAfterShow: function () { console.log('Show modal 1'); }, doEsc: function () { _this.setModal1(false); }}, React.createElement("h2", null, "Provide your information"), React.createElement(layout_1.Vlayout, {space: 10}, React.createElement(layout_1.Hlayout, {align: 'middle', space: 10}, "A : ", React.createElement(input_1.Textbox, {disabled: true})), React.createElement(layout_1.Hlayout, {align: 'middle', space: 10}, "B : ", React.createElement(input_1.Textbox, null)), React.createElement(layout_1.Hlayout, {align: 'middle', space: 10}, "C : ", React.createElement(input_1.Textbox, null)), React.createElement(widget_1.Alert, {alertType: 'info', label: 'It should focus on 2nd textbox, can be closed with ESC'}), React.createElement(layout_1.Hlayout, {align: 'center', space: 10}, React.createElement(widget_1.Button, {label: 'Cancel', onClick: function () { _this.setModal1(false); }}), React.createElement(widget_1.Button, {label: 'Ok', onClick: function () { _this.setModal1(false); }}), React.createElement(widget_1.Button, {label: 'Show nested Modal 2', onClick: function () { _this.setModal2(true); }})))), React.createElement(modal_1.Modal, {show: this.state.modal2, doAfterShow: function () { console.log('Show modal 2'); }}, React.createElement("h2", null, "The 2nd modal"), React.createElement(layout_1.Vlayout, {space: 10}, React.createElement(layout_1.Hlayout, {align: 'middle', space: 10}, "D : ", React.createElement(input_1.Textbox, {disabled: true})), React.createElement(layout_1.Hlayout, {align: 'middle', space: 10}, "E : ", React.createElement(input_1.Textbox, null)), React.createElement(widget_1.Alert, {alertType: 'info', label: 'It should focus on 2nd textbox'}), React.createElement(layout_1.Hlayout, {align: 'center', space: 10}, React.createElement(widget_1.Button, {label: 'Ok', onClick: function () { _this.setModal1(true); _this.setModal2(false); }}))))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/modal.js.map
