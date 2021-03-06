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
        define(["require", "exports", 'react', 'react-dom', '../main/widget', '../main/layout', '../main/list'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var widget_1 = require('../main/widget');
    var layout_1 = require('../main/layout');
    var list_1 = require('../main/list');
    var tipOpt = {
        position: {
            target: false,
            my: 'left center',
            at: 'right center',
            adjust: {
                method: 'shift shift'
            }
        }
    };
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
        }
        App.prototype.onClick = function (evt) {
            console.log('onClick');
        };
        App.prototype.doSelect = function (select, idx, item) {
            if (select) {
                console.log('doSelect', idx, item);
            }
        };
        App.prototype.render = function () {
            var onClick = this.onClick.bind(this);
            return (React.createElement(layout_1.Vlayout, {vflex: 1, hflex: 1, style: { padding: '10px' }, space: 10}, React.createElement(layout_1.Vlayout, {space: 6}, React.createElement(widget_1.Anchor, {href: "#A", onClick: onClick, tooltip: 'Open the file'}, "Open File"), React.createElement(widget_1.Anchor, {href: "#B", onClick: onClick, tooltip: 'Save the file', tooltipOption: tipOpt}, "Save File"), React.createElement(widget_1.Anchor, {href: "#C", onClick: onClick, tooltip: 'Close the file', tooltipOption: tipOpt}, "Close File"), React.createElement(widget_1.Anchor, {href: 'http://dennischen.github.io', onClick: onClick}, "dennischen.github.io")), React.createElement(list_1.List, {doSelect: this.doSelect.bind(this)}, React.createElement(widget_1.Anchor, null, "Open File"), React.createElement(widget_1.Anchor, null, "Save File"), React.createElement(widget_1.Anchor, null, "Close File"), React.createElement(widget_1.Anchor, {href: 'http://dennischen.github.io'}, "dennischen.github.io"))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/anchor.js.map
