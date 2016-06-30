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
        define(["require", "exports", 'react', 'react-dom', 'jquery', './util', './qtip'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var Jq = require('jquery');
    var Util = require('./util');
    var Qtip = require('./qtip');
    exports.QUEUE_EVENTS = {
        ON_RESIZE: 'onResize'
    };
    var queueName = 'wkWidgetQueue';
    var queue;
    function sendWidgetResize() {
        queue.send({ name: exports.QUEUE_EVENTS.ON_RESIZE, data: {} });
    }
    exports.sendWidgetResize = sendWidgetResize;
    if ('undefined' !== typeof window) {
        if (!window[queueName]) {
            window[queueName] = queue = new Util.SimpleQueue();
            Jq(window).bind('resize', sendWidgetResize);
        }
        else {
            queue = window[queueName];
        }
    }
    (function (VPos) {
        VPos[VPos["top"] = 1] = "top";
        VPos[VPos["middle"] = 2] = "middle";
        VPos[VPos["bottom"] = 3] = "bottom";
    })(exports.VPos || (exports.VPos = {}));
    var VPos = exports.VPos;
    (function (HPos) {
        HPos[HPos["left"] = 1] = "left";
        HPos[HPos["center"] = 2] = "center";
        HPos[HPos["right"] = 3] = "right";
    })(exports.HPos || (exports.HPos = {}));
    var HPos = exports.HPos;
    (function (Orient) {
        Orient[Orient["vertical"] = 1] = "vertical";
        Orient[Orient["horizontal"] = 2] = "horizontal";
    })(exports.Orient || (exports.Orient = {}));
    var Orient = exports.Orient;
    (function (AniEffect) {
        AniEffect[AniEffect["fade"] = 1] = "fade";
        AniEffect[AniEffect["slide"] = 2] = "slide";
        AniEffect[AniEffect["slideWidth"] = 3] = "slideWidth";
    })(exports.AniEffect || (exports.AniEffect = {}));
    var AniEffect = exports.AniEffect;
    (function (AlertType) {
        AlertType[AlertType["success"] = 1] = "success";
        AlertType[AlertType["info"] = 2] = "info";
        AlertType[AlertType["warning"] = 3] = "warning";
        AlertType[AlertType["error"] = 4] = "error";
    })(exports.AlertType || (exports.AlertType = {}));
    var AlertType = exports.AlertType;
    exports.DEFAULT_ANIMATION_DURATION = 300;
    var IndexSelection = (function () {
        function IndexSelection() {
            var _this = this;
            var selection = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selection[_i - 0] = arguments[_i];
            }
            this.selection = [];
            this.selectedSet = {};
            selection.forEach(function (each) {
                _this.add(each);
            });
        }
        IndexSelection.prototype.add = function (idx) {
            if (this.selectedSet[idx]) {
                return;
            }
            this.selection.push(idx);
            this.selectedSet[idx] = true;
        };
        IndexSelection.prototype.isSelected = function (idx, item) {
            return true == this.selectedSet[idx];
        };
        IndexSelection.prototype.select = function () {
            var selection = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selection[_i - 0] = arguments[_i];
            }
            return new (IndexSelection.bind.apply(IndexSelection, [void 0].concat(this.selection, selection)))();
        };
        IndexSelection.prototype.unselect = function () {
            var selection = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selection[_i - 0] = arguments[_i];
            }
            var newsel = [];
            var toremoves = {};
            selection.forEach(function (each) {
                toremoves[each] = true;
            });
            this.selection.forEach(function (each) {
                if (!toremoves[each]) {
                    newsel.push(each);
                }
            });
            return new (IndexSelection.bind.apply(IndexSelection, [void 0].concat(newsel)))();
        };
        IndexSelection.prototype.getSelection = function () {
            return this.selection.length == 0 ? undefined : this.selection.slice();
        };
        return IndexSelection;
    }());
    exports.IndexSelection = IndexSelection;
    var InstanceSelection = (function () {
        function InstanceSelection() {
            var _this = this;
            var selection = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selection[_i - 0] = arguments[_i];
            }
            this.selection = [];
            selection.forEach(function (each, idx) {
                _this.add(each);
            });
        }
        InstanceSelection.prototype.add = function (item) {
            var exist = false;
            if (this.selection.some(function (each) {
                return item === each;
            })) {
                return;
            }
            this.selection.push(item);
        };
        InstanceSelection.prototype.isSelected = function (idx, item) {
            return this.selection.some(function (each) {
                return item === each;
            });
        };
        InstanceSelection.prototype.select = function () {
            var selection = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selection[_i - 0] = arguments[_i];
            }
            return new (InstanceSelection.bind.apply(InstanceSelection, [void 0].concat(this.selection, selection)))();
        };
        InstanceSelection.prototype.unselect = function () {
            var selection = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selection[_i - 0] = arguments[_i];
            }
            var newsel = [];
            this.selection.forEach(function (each) {
                if (selection.some(function (remove) {
                    return remove === each;
                })) {
                    return;
                }
                newsel.push(each);
            });
            return new (InstanceSelection.bind.apply(InstanceSelection, [void 0].concat(newsel)))();
        };
        InstanceSelection.prototype.getSelection = function () {
            return this.selection.length == 0 ? undefined : this.selection.slice();
        };
        return InstanceSelection;
    }());
    exports.InstanceSelection = InstanceSelection;
    var KeySelection = (function () {
        function KeySelection(key) {
            var _this = this;
            var selection = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                selection[_i - 1] = arguments[_i];
            }
            this.selection = [];
            this.selectedSet = {};
            this.key = key;
            selection.forEach(function (each, idx) {
                _this.add(each);
            });
        }
        KeySelection.prototype.add = function (item) {
            var key = this.key(item);
            if (this.selectedSet[key]) {
                return;
            }
            this.selectedSet[key] = true;
            this.selection.push(item);
        };
        KeySelection.prototype.isSelected = function (idx, item) {
            var key = this.key(item);
            return true == this.selectedSet[key];
        };
        KeySelection.prototype.select = function () {
            var selection = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selection[_i - 0] = arguments[_i];
            }
            return new (KeySelection.bind.apply(KeySelection, [void 0].concat([this.key], this.selection, selection)))();
        };
        KeySelection.prototype.unselect = function () {
            var _this = this;
            var selection = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selection[_i - 0] = arguments[_i];
            }
            var newsel = [];
            var toremoves = selection.slice();
            this.selection.forEach(function (each) {
                var eachKey = _this.key(each);
                if (selection.some(function (remove) {
                    return eachKey == _this.key(remove);
                })) {
                    return;
                }
                newsel.push(each);
            });
            return new (KeySelection.bind.apply(KeySelection, [void 0].concat([this.key], newsel)))();
        };
        KeySelection.prototype.getSelection = function () {
            return this.selection.length == 0 ? undefined : this.selection.slice();
        };
        return KeySelection;
    }());
    exports.KeySelection = KeySelection;
    var pseudoIdGenerator = new Util.ShortId('wk_', 'webkit');
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component() {
            _super.apply(this, arguments);
        }
        Component.prototype.getPseudoId = function () {
            if (!this.pseudoId) {
                this.pseudoId = pseudoIdGenerator.next();
            }
            return this.pseudoId;
        };
        Component.prototype.clearPseudoId = function () {
            if (this.pseudoId) {
                pseudoIdGenerator.reuse(this.pseudoId);
                delete this.pseudoId;
            }
        };
        Component.prototype.safeTimeout = function (fn, timeout) {
            var _this = this;
            if (!this.safeTimeoutKeeper) {
                this.safeTimeoutKeeper = {};
            }
            var ticket;
            ticket = setTimeout(function () {
                delete _this.safeTimeoutKeeper[ticket];
                fn();
            }, timeout);
            this.safeTimeoutKeeper[ticket] = '';
            return ticket;
        };
        Component.prototype.clearSafeTimeout = function () {
            if (this.safeTimeoutKeeper) {
                for (var prop in this.safeTimeoutKeeper) {
                    clearTimeout(prop);
                }
                delete this.safeTimeoutKeeper;
            }
        };
        Component.prototype.componentWillUnmount = function () {
            this.clearSafeTimeout();
            this.clearPseudoId();
        };
        return Component;
    }(React.Component));
    exports.Component = Component;
    var defaultTooltipOption = {
        show: {
            delay: 500
        },
        hide: {
            delay: 100
        },
        position: {
            target: 'mouse',
            my: 'left bottom'
        },
        style: {
            classes: 'qtip-bootstrap wk-tooltip'
        }
    };
    var defaultAlertOption = {
        content: {
            button: true
        },
        show: {
            when: false,
            ready: true
        },
        hide: false,
        position: {
            my: 'left center',
            at: 'right center'
        },
        style: {
            classes: 'qtip-bootstrap wk-alert'
        }
    };
    function getAlertTypeClasses(type) {
        var clz = 'wk-error';
        if (type) {
            switch (type) {
                case 'success':
                case AlertType.success:
                    clz = 'wk-success';
                    break;
                case 'info':
                case AlertType.info:
                    clz = 'wk-info';
                    break;
                case 'warning':
                case AlertType.warning:
                    clz = 'wk-warning';
                    break;
            }
        }
        return clz;
    }
    var Widget = (function (_super) {
        __extends(Widget, _super);
        function Widget(props) {
            _super.call(this, props);
            this.state = {
                hidden: props.hidden
            };
        }
        Widget.prototype.getId = function () {
            return this.props.id;
        };
        Widget.prototype.registerQueue = function () {
            if (!this._registedQueue) {
                queue.add(this);
                this._registedQueue = true;
            }
        };
        Widget.prototype.unregisterQueue = function () {
            if (this._registedQueue) {
                queue.remove(this);
                delete this._registedQueue;
            }
        };
        Widget.prototype.componentWillMount = function () {
        };
        Widget.prototype.componentDidMount = function () {
            var props = this.props;
            if (props.tooltip) {
                var tipOpt = props.tooltipOption ? Jq.extend(true, {}, defaultTooltipOption, props.tooltipOption)
                    : defaultTooltipOption;
                Qtip.setTip(Jq(this.getDOM()), props.tooltip, tipOpt);
            }
            if (props.alert) {
                var tipOpt = Jq.extend(true, {}, defaultAlertOption, props.alertOption);
                tipOpt.style.classes += ' ' + getAlertTypeClasses(props.alertType);
                Qtip.setTip(Jq(this.getDOM()), props.alert, tipOpt);
            }
        };
        Widget.prototype.componentWillUnmount = function () {
            _super.prototype.componentWillUnmount.call(this);
            if (this.props.tooltip) {
                Qtip.removeTip(Jq(this.getDOM()));
            }
            if (this.props.alert) {
                Qtip.removeTip(Jq(this.getDOM()));
            }
        };
        Widget.prototype.componentWillReceiveProps = function (nextProps) {
            if (this.props.hidden !== nextProps.hidden) {
                this.setState({ hidden: nextProps.hidden });
            }
        };
        Widget.prototype.componentWillUpdate = function (nextProps, nextState) {
            if (nextProps.animation && this.state.hidden !== nextState.hidden) {
                this._willAnimate = true;
            }
        };
        Widget.prototype.componentDidUpdate = function (prevProps, prevState) {
            var _this = this;
            var fireResize = false;
            var dom = this.getDOM();
            var props = this.props;
            if (this._willAnimate) {
                var ani = props.animation;
                var jqd = Jq(dom);
                var dur = ani.duration ? ani.duration : exports.DEFAULT_ANIMATION_DURATION;
                var hidden_1 = this.state.hidden;
                var done = function () {
                    delete _this._willAnimate;
                    _this.afterAnimation(hidden_1);
                    sendWidgetResize();
                };
                var step = function () {
                    sendWidgetResize();
                };
                switch (ani.effect) {
                    case 'slide':
                    case AniEffect.slide:
                        jqd.animate({ height: hidden_1 ? 'hide' : 'show' }, { duration: dur, step: step, done: done });
                        break;
                    case 'slideWidth':
                    case AniEffect.slideWidth:
                        jqd.animate({ width: hidden_1 ? 'hide' : 'show' }, { duration: dur, step: step, done: done });
                        break;
                    default:
                    case 'fade':
                    case AniEffect.fade:
                        jqd.animate({ opacity: hidden_1 ? 'hide' : 'show' }, { duration: dur, done: done });
                        break;
                }
                if (!hidden_1) {
                    fireResize = true;
                }
            }
            if (fireResize || props.hflex !== prevProps.hflex
                || props.vflex !== prevProps.vflex) {
                sendWidgetResize();
            }
            if (props.tooltip !== prevProps.tooltip) {
                if (prevProps.tooltip) {
                    Qtip.removeTip(Jq(dom));
                }
                if (props.tooltip) {
                    var tipOpt = props.tooltipOption ? Jq.extend(true, {}, defaultTooltipOption, props.tooltipOption)
                        : defaultTooltipOption;
                    Qtip.setTip(Jq(dom), props.tooltip, tipOpt);
                }
            }
            if (props.alert !== prevProps.alert) {
                if (prevProps.alert) {
                    Qtip.removeTip(Jq(dom));
                }
                if (props.alert) {
                    var tipOpt = Jq.extend(true, {}, defaultAlertOption, props.alertOption);
                    tipOpt.style.classes += ' ' + getAlertTypeClasses(props.alertType);
                    Qtip.setTip(Jq(dom), props.alert, tipOpt);
                }
            }
        };
        Widget.prototype.afterAnimation = function (hidden) { };
        Widget.prototype.onQueueEvent = function (evt) { };
        Widget.prototype.sendQueueEvent = function (name, data) {
            if (data === void 0) { data = {}; }
            queue.send({
                name: name,
                data: data
            });
        };
        Widget.prototype.postQueueEvent = function (name, data) {
            if (data === void 0) { data = {}; }
            queue.post({
                name: name,
                data: data
            }, 5);
        };
        Widget.prototype.getWidgetSubSclass = function (sub) {
            return [this.getWidgetSclass(), '-', sub].join('');
        };
        Widget.prototype.getDOM = function () {
            return ReactDOM.findDOMNode(this);
        };
        Widget.prototype.getRenderTag = function () {
            return 'div';
        };
        Widget.prototype.getRenderSclass = function () {
            var str = [];
            str.push(this.getWidgetSclass());
            if (this.props.hflex) {
                str.push('wk-hflex');
            }
            if (this.props.vflex) {
                str.push('wk-vflex');
            }
            if (this.props.className) {
                str.push(this.props.className);
            }
            return str.join(" ");
        };
        Widget.prototype.getRenderStyle = function () {
            var css = {};
            if (this.props.style) {
                Util.supplyProps(css, this.props.style);
            }
            if (this._willAnimate) {
                if (!this.state.hidden) {
                    css.display = 'none';
                }
            }
            else if (this.state.hidden) {
                css.display = 'none';
            }
            return css;
        };
        Widget.prototype.getRenderChildren = function () {
            return this.props.children;
        };
        Widget.prototype.show = function () {
            if (!this.state.hidden) {
                return;
            }
            this.setState({ hidden: false });
        };
        Widget.prototype.hide = function () {
            if (this.state.hidden) {
                return;
            }
            this.setState({ hidden: true });
        };
        Widget.prototype.renderElementProps = function () {
            var props = this.props;
            return {
                id: this.getId(),
                ref: 'DOM',
                className: this.getRenderSclass(),
                style: this.getRenderStyle(),
                onClick: props.onClick,
                onDoubleClick: props.onDoubleClick,
                onContextMenu: props.onContextMenu
            };
        };
        Widget.prototype.render = function () {
            var t = this.getRenderTag();
            var p = this.renderElementProps();
            return React.createElement(t, p, this.getRenderChildren());
        };
        Widget.defaultProps = {};
        Widget.__wgtmgc = true;
        return Widget;
    }(Component));
    exports.Widget = Widget;
    var Fonticon = (function (_super) {
        __extends(Fonticon, _super);
        function Fonticon() {
            _super.apply(this, arguments);
        }
        Fonticon.prototype.getWidgetSclass = function () {
            return 'wkw-fonticon';
        };
        Fonticon.prototype.getRenderChildren = function () {
            return null;
        };
        Fonticon.prototype.getRenderTag = function () {
            return 'i';
        };
        Fonticon.defaultProps = Util.supplyProps({}, Widget.defaultProps);
        return Fonticon;
    }(Widget));
    exports.Fonticon = Fonticon;
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            _super.apply(this, arguments);
        }
        Button.prototype.getWidgetSclass = function () {
            return 'wkw-button';
        };
        Button.prototype.getRenderChildren = function () {
            var children = [];
            var props = this.props;
            if (props.label) {
                children.push(props.label);
            }
            if (props.children) {
                React.Children.forEach(props.children, function (child, idx) {
                    children.push(child);
                });
            }
            return children;
        };
        Button.prototype.renderElementProps = function () {
            var props = this.props;
            var p = _super.prototype.renderElementProps.call(this);
            Util.supplyProps(p, {
                disabled: props.disabled,
                type: props.type,
                form: props.form
            });
            return p;
        };
        Button.prototype.getRenderTag = function () {
            return 'button';
        };
        Button.defaultProps = Util.supplyProps({}, Widget.defaultProps);
        return Button;
    }(Widget));
    exports.Button = Button;
    var Anchor = (function (_super) {
        __extends(Anchor, _super);
        function Anchor() {
            _super.apply(this, arguments);
        }
        Anchor.prototype.getWidgetSclass = function () {
            return 'wkw-anchor';
        };
        Anchor.prototype.getRenderChildren = function () {
            var children = [];
            var props = this.props;
            if (props.label) {
                children.push(props.label);
            }
            if (props.children) {
                React.Children.forEach(props.children, function (child, idx) {
                    children.push(child);
                });
            }
            return children;
        };
        Anchor.prototype.renderElementProps = function () {
            var props = this.props;
            var p = _super.prototype.renderElementProps.call(this);
            Util.supplyProps(p, {
                href: props.href ? props.href : '#',
                target: props.target
            });
            return p;
        };
        Anchor.prototype.getRenderTag = function () {
            return 'a';
        };
        Anchor.defaultProps = Util.supplyProps({}, Widget.defaultProps);
        return Anchor;
    }(Widget));
    exports.Anchor = Anchor;
    var Alert = (function (_super) {
        __extends(Alert, _super);
        function Alert() {
            _super.apply(this, arguments);
        }
        Alert.prototype.getWidgetSclass = function () {
            return 'wkw-alert';
        };
        Alert.prototype.getRenderChildren = function () {
            var children = [];
            var props = this.props;
            if (props.fonticon) {
                children.push(React.createElement(Fonticon, {key: 'f', className: props.fonticon}));
            }
            if (props.title) {
                children.push(React.createElement("strong", {key: 't'}, props.title));
            }
            if (props.label) {
                children.push(props.label);
            }
            if (props.children) {
                React.Children.forEach(props.children, function (child, idx) {
                    children.push(child);
                });
            }
            return children;
        };
        Alert.prototype.getRenderSclass = function () {
            var str = [];
            str.push(_super.prototype.getRenderSclass.call(this));
            str.push(getAlertTypeClasses(this.props.alertType));
            return str.join(' ');
        };
        Alert.defaultProps = Util.supplyProps({}, Widget.defaultProps);
        return Alert;
    }(Widget));
    exports.Alert = Alert;
    function isWidgetElemnt(child) {
        var casting = child;
        return casting ? (casting.type && casting.type.__wgtmgc) : false;
    }
    exports.isWidgetElemnt = isWidgetElemnt;
    function getWidgetProps(child) {
        var casting = child;
        return casting ? casting.props : undefined;
    }
    exports.getWidgetProps = getWidgetProps;
    function hasHScrollbar(dom) {
        var bar = dom.scrollWidth - dom.offsetWidth;
        return bar <= 0 ? 0 : bar;
    }
    exports.hasHScrollbar = hasHScrollbar;
    function hasVScrollbar(dom) {
        var bar = dom.scrollHeight - dom.offsetHeight;
        return bar <= 0 ? 0 : bar;
    }
    exports.hasVScrollbar = hasVScrollbar;
    function getInnerWidth(dom) {
        var cs = window.getComputedStyle(dom);
        var cr = dom.getBoundingClientRect();
        var r = cr.width - toPxNumber(cs.paddingLeft) - toPxNumber(cs.paddingRight) - toPxNumber(cs.borderLeftWidth) - toPxNumber(cs.borderRightWidth);
        return r;
    }
    exports.getInnerWidth = getInnerWidth;
    function getInnerHeight(dom) {
        var cs = window.getComputedStyle(dom);
        var cr = dom.getBoundingClientRect();
        var r = cr.height - toPxNumber(cs.paddingTop) - toPxNumber(cs.paddingBottom) - toPxNumber(cs.borderTopWidth) - toPxNumber(cs.borderBottomWidth);
        return r;
    }
    exports.getInnerHeight = getInnerHeight;
    function getOutterWidth(dom) {
        var cs = window.getComputedStyle(dom);
        var cr = dom.getBoundingClientRect();
        return cr.width + toPxNumber(cs.marginLeft) + toPxNumber(cs.marginRight);
    }
    exports.getOutterWidth = getOutterWidth;
    function getOutterHeight(dom) {
        var cs = window.getComputedStyle(dom);
        var cr = dom.getBoundingClientRect();
        return cr.height + toPxNumber(cs.marginTop) + toPxNumber(cs.marginBottom);
    }
    exports.getOutterHeight = getOutterHeight;
    function toPxNumber(pxvar) {
        if ('string' == typeof pxvar) {
            return Number(pxvar.replace('px', ''));
        }
        else if ('number' == typeof pxvar) {
            return pxvar;
        }
        return 0;
    }
    exports.toPxNumber = toPxNumber;
});

//# sourceMappingURL=srcmap/widget.js.map
