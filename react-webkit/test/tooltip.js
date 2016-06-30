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
        define(["require", "exports", 'react', 'react-dom', 'jquery', '../main/widget', '../main/layout', '../main/input'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var Jq = require('jquery');
    var widget_1 = require('../main/widget');
    var layout_1 = require('../main/layout');
    var input_1 = require('../main/input');
    var tipOpt = {
        position: {
            target: false,
        }
    };
    var ltOpt = Jq.extend(true, {
        position: {
            my: 'right bottom',
            at: 'left top',
        }
    }, tipOpt);
    var ctOpt = Jq.extend(true, {
        position: {
            my: 'bottom center',
            at: 'top center',
        }
    }, tipOpt);
    var rtOpt = Jq.extend(true, {
        position: {
            my: 'left bottom',
            at: 'right top',
        }
    }, tipOpt);
    var lcOpt = Jq.extend(true, {
        position: {
            my: 'right center',
            at: 'left center',
        }
    }, tipOpt);
    var ccOpt = Jq.extend(true, {
        position: {
            my: 'center center',
            at: 'center center',
        }
    }, tipOpt);
    var rcOpt = Jq.extend(true, {
        position: {
            my: 'left center',
            at: 'right center',
        }
    }, tipOpt);
    var lbOpt = Jq.extend(true, {
        position: {
            my: 'right top',
            at: 'left bottom',
        }
    }, tipOpt);
    var cbOpt = Jq.extend(true, {
        position: {
            my: 'top center',
            at: 'bottom center',
        }
    }, tipOpt);
    var rbOpt = Jq.extend(true, {
        position: {
            my: 'left top',
            at: 'right bottom',
        }
    }, tipOpt);
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.state = { tooltip: 'The tip text' };
        }
        App.prototype.doTooltipChange = function (value) {
            this.setState({ tooltip: value });
        };
        App.prototype.doToggleSuccess = function () {
            this.setState({ success: !this.state.success });
        };
        App.prototype.doToggleInfo = function () {
            this.setState({ info: !this.state.info });
        };
        App.prototype.doToggleWarning = function () {
            this.setState({ warning: !this.state.warning });
        };
        App.prototype.doToggleError = function () {
            this.setState({ error: !this.state.error });
        };
        App.prototype.render = function () {
            return (React.createElement(layout_1.Box, {hflex: 1, vflex: 1, align: 'center middle'}, React.createElement(layout_1.Vlayout, {style: { width: 400, height: 600 }, space: 10}, React.createElement(layout_1.Hlayout, {align: 'middle'}, "Tip : ", React.createElement(input_1.Textbox, {value: this.state.tooltip, doChange: this.doTooltipChange.bind(this)})), React.createElement(layout_1.Box, {hflex: 1, style: { border: '1px solid', padding: 10 }, tooltip: this.state.tooltip}, "Mouse over here for tooltip"), React.createElement(layout_1.Hlayout, {vflex: 1, hflex: 1, style: { padding: '2px' }}, React.createElement(layout_1.Box, {align: 'left top', hflex: 1, vflex: 1, style: { border: '1px solid' }, tooltip: 'Left Top', tooltipOption: ltOpt}, "Left Top"), React.createElement(layout_1.Box, {align: 'center top', hflex: 1, vflex: 1, style: { border: '1px solid' }, tooltip: 'Center Top', tooltipOption: ctOpt}, "Center Top"), React.createElement(layout_1.Box, {align: 'right top', hflex: 1, vflex: 1, style: { border: '1px solid' }, tooltip: 'Right Top', tooltipOption: rtOpt}, "Right Top")), React.createElement(layout_1.Hlayout, {vflex: 1, hflex: 1, style: { padding: '2px' }}, React.createElement(layout_1.Box, {align: 'left middle', hflex: 1, vflex: 1, style: { border: '1px solid' }, tooltip: 'Left Middle', tooltipOption: lcOpt}, "Left Middle"), React.createElement(layout_1.Box, {align: 'center middle', hflex: 1, vflex: 1, style: { border: '1px solid' }, tooltip: 'Center Middle', tooltipOption: ccOpt}, "Center Middle"), React.createElement(layout_1.Box, {align: 'right middle', hflex: 1, vflex: 1, style: { border: '1px solid' }, tooltip: 'Right Middle', tooltipOption: rcOpt}, "Right Middle")), React.createElement(layout_1.Hlayout, {vflex: 1, hflex: 1, style: { padding: '2px' }}, React.createElement(layout_1.Box, {align: 'left bottom', hflex: 1, vflex: 1, style: { border: '1px solid' }, tooltip: 'Left Bottom', tooltipOption: lbOpt}, "Left Bottom"), React.createElement(layout_1.Box, {align: 'center bottom', hflex: 1, vflex: 1, style: { border: '1px solid' }, tooltip: 'Center Bottom', tooltipOption: cbOpt}, "Center Bottom"), React.createElement(layout_1.Box, {align: 'right bottom', hflex: 1, vflex: 1, style: { border: '1px solid' }, tooltip: 'Right Bottom', tooltipOption: rbOpt}, "Right Bottom")), React.createElement(layout_1.Hlayout, {align: 'middle', space: 10}, React.createElement(widget_1.Button, {label: "Click to toggle Success", onClick: this.doToggleSuccess.bind(this), alert: this.state.success ? this.state.tooltip : undefined, alertType: 'success', alertOption: lcOpt}), React.createElement(widget_1.Button, {label: "Click to toggle Info", onClick: this.doToggleInfo.bind(this), alert: this.state.info ? this.state.tooltip : undefined, alertType: 'info', alertOption: cbOpt}), React.createElement(widget_1.Button, {label: "Click to toggle Warning", onClick: this.doToggleWarning.bind(this), alert: this.state.warning ? this.state.tooltip : undefined, alertType: 'warning', alertOption: ctOpt}), React.createElement(widget_1.Button, {label: "Click to toggle Error", onClick: this.doToggleError.bind(this), alert: this.state.error ? this.state.tooltip : undefined})))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/tooltip.js.map
