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
        define(["require", "exports", 'react', 'react-dom', '../main/widget', '../main/layout', '../main/popup', '../main/list'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var widget_1 = require('../main/widget');
    var layout_1 = require('../main/layout');
    var p = require('../main/popup');
    var ls = require('../main/list');
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
        }
        App.prototype.doShowMenu = function () {
            var pop = this.refs['popup'];
            var target = this.refs['popupBtn'].getDOM();
            if (pop.state.invisible) {
                pop.show(target);
            }
            else {
                pop.hide();
            }
        };
        App.prototype.doSelectMenu = function (select, idx, item) {
            if (select) {
                console.log("Selected " + idx);
                this.refs['popup'].hide();
            }
        };
        App.prototype.render = function () {
            return (React.createElement(layout_1.Vlayout, {vflex: 1, hflex: 1, style: { padding: '10px' }, space: 10}, React.createElement(layout_1.Hlayout, {hflex: 1, style: { padding: '10px' }, space: 6}, React.createElement(widget_1.Button, {label: "click me"})), React.createElement(layout_1.Hlayout, {hflex: 1, style: { padding: '10px' }, space: 6}, React.createElement(widget_1.Button, null, "Button 1 ", React.createElement(widget_1.Fonticon, {className: 'fa fa-bars'})), React.createElement(widget_1.Button, {disabled: true}, React.createElement(widget_1.Fonticon, {className: 'fa fa-bars'}), " Button 2 Disabled")), React.createElement(layout_1.Hlayout, {hflex: 1, style: { padding: '10px', height: 100 }, space: 6}, React.createElement(widget_1.Button, {hflex: 1, vflex: 1}, "Button 3 ", React.createElement(widget_1.Fonticon, {className: 'fa fa-bars'})), React.createElement(widget_1.Button, {label: "Button 4"}), React.createElement(widget_1.Button, {hflex: 1}, React.createElement(widget_1.Fonticon, {className: 'fa fa-bars'}), " Button 5")), "Buttongroup :", React.createElement(layout_1.Hgroup, {style: { padding: '10px' }}, React.createElement(widget_1.Button, null, "Button 6 ", React.createElement(widget_1.Fonticon, {className: 'fa fa-bars'})), React.createElement(widget_1.Button, {label: "Button 7 Disabled", disabled: true}), React.createElement(widget_1.Button, null, React.createElement(widget_1.Fonticon, {className: 'fa fa-bars'}), " Button 8")), React.createElement(layout_1.Hgroup, {hflex: 1, style: { padding: '10px' }}, React.createElement(widget_1.Button, {hflex: 1}, "Button 9 ", React.createElement(widget_1.Fonticon, {className: 'fa fa-bars'})), React.createElement(widget_1.Button, {label: "Button 10"}), React.createElement(widget_1.Button, {hflex: 1}, React.createElement(widget_1.Fonticon, {className: 'fa fa-bars'}), " Button 11")), React.createElement(layout_1.Hgroup, {style: { padding: '10px' }}, React.createElement(widget_1.Button, {ref: "popupBtn"}, "Menu"), React.createElement(widget_1.Button, {id: 'toggleBtn', style: { paddingLeft: 6, paddingRight: 6 }, onClick: this.doShowMenu.bind(this)}, React.createElement(widget_1.Fonticon, {className: 'fa fa-caret-down'}))), React.createElement(p.Popup, {ref: "popup", style: { padding: '2px 0px', fontSize: '0.9rem' }, showOption: { autoDismiss: true, autoDismissHolders: ['#toggleBtn'], targetVPos: 'bottom', targetHPos: 'left' }, animation: { effect: 'fade' }}, React.createElement(ls.List, {doSelect: this.doSelectMenu.bind(this)}, React.createElement(widget_1.Anchor, null, "Open File"), React.createElement(widget_1.Anchor, null, "Save File"), React.createElement(widget_1.Anchor, null, "Close File"), React.createElement(widget_1.Anchor, {href: 'http://dennischen.github.io'}, "dennischen.github.io")))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/button.js.map
