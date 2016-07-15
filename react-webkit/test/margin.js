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
            this.state = { clickCount: 0 };
        }
        App.prototype.componentDidMount = function () {
        };
        App.prototype.handleClick = function () {
            var c = this.state.clickCount + 1;
            this.setState({ clickCount: c });
        };
        App.prototype.render = function () {
            return (React.createElement(layout_1.Box, {hflex: 1, vflex: 1}, "There should not has any scrollbar even you resize the windows", React.createElement(layout_1.Hlayout, {hflex: 1, vflex: 1, style: { background: 'lightgreen', width: 600.65, marginLeft: 60.6, paddingLeft: 40.2, borderLeft: 'blue solid 20px', borderLeftWidth: 20 }}, React.createElement(layout_1.Box, {hflex: 1, style: { border: '1px solid' }}, "A"), React.createElement(layout_1.Box, {style: { border: '1px solid' }}, React.createElement("div", null, React.createElement("span", null, "B1")), React.createElement("div", null, React.createElement("span", null, "B2"))), React.createElement(layout_1.Box, {hflex: 1, style: { border: '1px solid' }}, "C"))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/margin.js.map
