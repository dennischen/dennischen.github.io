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
    var w = require('../main/widget');
    var l = require('../main/layout');
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.state = { clickCount: 0, longContent: React.createElement("span", {key: 0}, "Long Content, Long Content") };
        }
        App.prototype.componentDidMount = function () {
        };
        App.prototype.handleClick = function () {
            var c = this.state.clickCount + 1;
            var longContent = [this.state.longContent, React.createElement("br", {key: 'br' + c}), React.createElement("span", {key: c}, "Content for ", c)];
            this.setState({ clickCount: c, longContent: longContent });
        };
        App.prototype.render = function () {
            return (React.createElement(l.Hlayout, {vflex: 1, hflex: 1, style: { background: 'lightgreen', padding: 10 }}, React.createElement(l.Sider, {vflex: 1, size: 200, minSize: 100, maxSize: 400, style: { background: 'lightpink' }}, "The sider 1"), React.createElement(l.Sider, {vflex: 1, size: 200, style: { background: 'lightgray' }}, React.createElement(w.List, {vflex: 1, hflex: 1}, React.createElement("span", null, "ABC"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ"), React.createElement("span", null, "ABC"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ"), React.createElement("span", null, "ABC"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ"))), React.createElement(l.Vlayout, {hflex: 1, vflex: 1, style: { background: 'lightblue', padding: 10 }}, React.createElement(l.Sider, {hflex: 1, orient: w.Orient.vertical, size: 150, minSize: 100, maxSize: 200, style: { background: 'lightpink' }}, "The sider 2"), React.createElement(l.Sider, {hflex: 1, orient: w.Orient.vertical, size: 200, style: { background: 'lightgray' }}, "The sider 3"), React.createElement(w.List, {vflex: 1, hflex: 1}, React.createElement("span", null, "ABC"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ"), React.createElement("span", null, "ABC"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ"), React.createElement("span", null, "ABC"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ")))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/sider.js.map
