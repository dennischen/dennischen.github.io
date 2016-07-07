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
        define(["require", "exports", 'react', 'react-dom', '../main/widget', '../main/input', '../main/layout', '../main/popup'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var w = require('../main/widget');
    var i = require('../main/input');
    var l = require('../main/layout');
    var p = require('../main/popup');
    p.zIndexStart = 3000;
    var dismissTimeout = 1500;
    var animation = { effect: w.AniEffect.fade };
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.state = {
                autoDismiss: false, dismissTimeout: dismissTimeout,
                targetHPos: w.HPos.right, targetVPos: w.VPos.bottom,
                selfHPos: w.HPos.left, selfVPos: w.VPos.top,
                animation: animation, adjust: p.AdjustMethod.shift
            };
        }
        App.prototype.componentDidMount = function () {
        };
        App.prototype.getShowOpt = function () {
            var opt = {
                autoDismiss: this.state.autoDismiss,
                targetHPos: this.state.targetHPos,
                targetVPos: this.state.targetVPos,
                selfHPos: this.state.selfHPos,
                selfVPos: this.state.selfVPos,
                dismissTimeout: this.state.dismissTimeout,
                adjust: this.state.adjust
            };
            if (this.state.adjustXY) {
                opt.adjustX = 5;
                opt.adjustY = 30;
            }
            return opt;
        };
        App.prototype.handleShow = function (event) {
            event.stopPropagation();
            var pop = this.refs['popup'];
            pop.show(event.target, this.getShowOpt());
        };
        App.prototype.handleShowMousePos = function (event) {
            var pop = this.refs['popup'];
            pop.show(event, this.getShowOpt());
        };
        App.prototype.handleShowNested = function (event) {
            var pop = this.refs['popupNested'];
            pop.show(event, this.getShowOpt());
        };
        App.prototype.handleHide = function (event) {
            event.stopPropagation();
            var pop = this.refs['popup'];
            pop.hide();
            pop = this.refs['popupNested'];
            pop.hide();
        };
        App.prototype.handleTargetHPos = function (pos) {
            this.setState({ targetHPos: pos });
        };
        App.prototype.handleTargetVPos = function (pos) {
            this.setState({ targetVPos: pos });
        };
        App.prototype.handleSelfHPos = function (pos) {
            this.setState({ selfHPos: pos });
        };
        App.prototype.handleSelfVPos = function (pos) {
            this.setState({ selfVPos: pos });
        };
        App.prototype.handleAdjust = function (adjust) {
            this.setState({ adjust: adjust });
        };
        App.prototype.handleAutoDismiss = function (checked) {
            this.setState({ autoDismiss: checked });
        };
        App.prototype.handleDismissTimeout = function (checked) {
            this.setState({ dismissTimeout: checked ? dismissTimeout : undefined });
        };
        App.prototype.handleAnimation = function (checked) {
            this.setState({ animation: checked ? animation : undefined });
        };
        App.prototype.handleAdjustXY = function (checked) {
            this.setState({ adjustXY: checked ? true : undefined });
        };
        App.prototype.componentDidUpdate = function (prevProps, prevState) {
            var pop = this.refs['popup'];
            if (pop.state.visible) {
                pop.reposition('#btn1', this.getShowOpt());
            }
        };
        App.prototype.render = function () {
            return (React.createElement(l.Box, {hflex: 1, vflex: 1, style: { background: 'lightgreen', padding: 30 }}, React.createElement(l.Vlayout, {space: 10}, React.createElement(l.Hlayout, {align: 'middle', space: 10}, "Target HPos:", React.createElement(i.Radiobox, {name: 'targetHPos', checked: this.state.targetHPos == w.HPos.left, onChange: this.handleTargetHPos.bind(this, w.HPos.left), label: 'Left'}), React.createElement(i.Radiobox, {name: 'targetHPos', checked: this.state.targetHPos == w.HPos.center, onChange: this.handleTargetHPos.bind(this, w.HPos.center), label: 'Center'}), React.createElement(i.Radiobox, {name: 'targetHPos', checked: this.state.targetHPos == w.HPos.right, onChange: this.handleTargetHPos.bind(this, w.HPos.right), label: 'Right'})), React.createElement(l.Hlayout, {align: 'middle', space: 10}, "Target VPos:", React.createElement(i.Radiobox, {name: 'targetVPos', checked: this.state.targetVPos == w.VPos.top, onChange: this.handleTargetVPos.bind(this, w.VPos.top), label: 'Top'}), React.createElement(i.Radiobox, {name: 'targetVPos', checked: this.state.targetVPos == w.VPos.middle, onChange: this.handleTargetVPos.bind(this, w.VPos.middle), label: 'Middle'}), React.createElement(i.Radiobox, {name: 'targetVPos', checked: this.state.targetVPos == w.VPos.bottom, onChange: this.handleTargetVPos.bind(this, w.VPos.bottom), label: 'Bottom'})), React.createElement(l.Hlayout, {align: 'middle', space: 10}, "Self HPos:", React.createElement(i.Radiobox, {name: 'selfHPos', checked: this.state.selfHPos == w.HPos.left, onChange: this.handleSelfHPos.bind(this, w.HPos.left), label: 'Left'}), React.createElement(i.Radiobox, {name: 'selfHPos', checked: this.state.selfHPos == w.HPos.center, onChange: this.handleSelfHPos.bind(this, w.HPos.center), label: 'Center'}), React.createElement(i.Radiobox, {name: 'selfHPos', checked: this.state.selfHPos == w.HPos.right, onChange: this.handleSelfHPos.bind(this, w.HPos.right), label: 'Right'})), React.createElement(l.Hlayout, {align: 'middle', space: 10}, "Self VPos:", React.createElement(i.Radiobox, {name: 'selfVPos', checked: this.state.selfVPos == w.VPos.top, onChange: this.handleSelfVPos.bind(this, w.VPos.top), label: 'Top'}), React.createElement(i.Radiobox, {name: 'selfVPos', checked: this.state.selfVPos == w.VPos.middle, onChange: this.handleSelfVPos.bind(this, w.VPos.middle), label: 'Middle'}), React.createElement(i.Radiobox, {name: 'selfVPos', checked: this.state.selfVPos == w.VPos.bottom, onChange: this.handleSelfVPos.bind(this, w.VPos.bottom), label: 'Bottom'})), React.createElement(l.Hlayout, {align: 'middle', space: 10}, "Adjust:", React.createElement(i.Radiobox, {name: 'adjust', checked: !this.state.adjust, onChange: this.handleAdjust.bind(this, undefined), label: 'None'}), React.createElement(i.Radiobox, {name: 'adjust', checked: this.state.adjust == p.AdjustMethod.shift, onChange: this.handleAdjust.bind(this, p.AdjustMethod.shift), label: 'Shift'}), React.createElement(i.Radiobox, {name: 'adjust', checked: this.state.adjust == p.AdjustMethod.flip, onChange: this.handleAdjust.bind(this, p.AdjustMethod.flip), label: 'Flip'})), React.createElement(l.Hlayout, {align: 'middle', space: 10}, React.createElement(i.Checkbox, {checked: this.state.autoDismiss, doCheck: this.handleAutoDismiss.bind(this), label: 'Auto Dismiss'}), React.createElement(i.Checkbox, {checked: this.state.dismissTimeout > 0, doCheck: this.handleDismissTimeout.bind(this), label: 'Dismiss Timeout'}), React.createElement(i.Checkbox, {checked: this.state.animation ? true : false, doCheck: this.handleAnimation.bind(this), label: 'Animation'}), React.createElement(i.Checkbox, {checked: this.state.adjustXY ? true : false, doCheck: this.handleAdjustXY.bind(this), label: 'AdjustXY'}))), React.createElement(l.Box, {hflex: 1, vflex: 1, align: 'middle center'}, React.createElement(l.Box, {style: { height: 400, width: 600, background: 'lightblue', overflow: 'auto' }}, React.createElement(l.Vlayout, {align: 'center', onClick: this.handleShowMousePos.bind(this)}, "Click other place to show popup follow the click position", React.createElement("div", {style: { height: 200, width: 800, background: 'lightpink' }}), React.createElement(l.Hlayout, {space: 30}, React.createElement("button", {id: 'btn1', onClick: this.handleShow.bind(this)}, "Show Popup by my corner"), React.createElement("button", {onClick: this.handleHide.bind(this)}, "Hide Popup")), React.createElement("div", {style: { height: 200, width: 800, background: 'lightpink' }})), React.createElement(p.Popup, {ref: 'popupNested', style: { width: 300, padding: 4 }}, "This is nested popup ", React.createElement("br", null)), React.createElement(p.Popup, {ref: 'popup', style: { width: 300, padding: 4 }, onClick: this.handleShowNested.bind(this), animation: this.state.animation}, "Pop-up ads or pop-ups are often forms of online advertising on the World Wide Web" + ' ' + "intended to attract web traffic or capture email addresses.")))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/popup.js.map
