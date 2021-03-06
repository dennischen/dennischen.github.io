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
        define(["require", "exports", 'react', 'react-dom'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var Base = (function (_super) {
        __extends(Base, _super);
        function Base() {
            _super.apply(this, arguments);
        }
        Base.prototype.componentWillMount = function () {
            console.log('componentWillMount', this.props.name);
        };
        Base.prototype.componentDidMount = function () {
            console.log('componentDidMount', this.props.name);
        };
        Base.prototype.componentWillUnmount = function () {
            console.log('componentWillUnmount', this.props.name);
        };
        Base.prototype.componentWillReceiveProps = function (nextProps) {
            console.log('componentWillReceiveProps', this.props.name);
        };
        Base.prototype.componentWillUpdate = function (nextProps, nextState) {
            console.log('componentWillUpdate', this.props.name);
        };
        Base.prototype.componentDidUpdate = function (prevProps, prevState) {
            console.log('componentDidUpdate', this.props.name);
        };
        Base.prototype.render = function () {
            console.log('render', this.props.name);
            return (React.createElement("div", null, this.props.name, this.props.children));
        };
        return Base;
    }(React.Component));
    var A = (function (_super) {
        __extends(A, _super);
        function A() {
            _super.apply(this, arguments);
        }
        A.defaultProps = {
            name: 'A'
        };
        return A;
    }(Base));
    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        B.defaultProps = {
            name: 'B'
        };
        return B;
    }(Base));
    var C = (function (_super) {
        __extends(C, _super);
        function C() {
            _super.apply(this, arguments);
        }
        C.defaultProps = {
            name: 'C'
        };
        return C;
    }(Base));
    var D = (function (_super) {
        __extends(D, _super);
        function D() {
            _super.apply(this, arguments);
        }
        D.defaultProps = {
            name: 'D'
        };
        return D;
    }(Base));
    var E = (function (_super) {
        __extends(E, _super);
        function E() {
            _super.apply(this, arguments);
        }
        E.defaultProps = {
            name: 'E'
        };
        return E;
    }(Base));
    var F = (function (_super) {
        __extends(F, _super);
        function F() {
            _super.apply(this, arguments);
        }
        F.defaultProps = {
            name: 'F'
        };
        return F;
    }(Base));
    var G = (function (_super) {
        __extends(G, _super);
        function G() {
            _super.apply(this, arguments);
        }
        G.defaultProps = {
            name: 'G'
        };
        return G;
    }(Base));
    var H = (function (_super) {
        __extends(H, _super);
        function H() {
            _super.apply(this, arguments);
        }
        H.defaultProps = {
            name: 'H'
        };
        return H;
    }(Base));
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
        }
        App.prototype.render = function () {
            return (React.createElement(A, null, React.createElement(B, null, React.createElement(E, null), React.createElement(F, null, React.createElement(H, null))), React.createElement(C, null, React.createElement(G, null)), React.createElement(D, null)));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/lifecycle.js.map
