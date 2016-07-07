/**
 * React WebKit - v0.0.5
 * The react web widget kit base on typescript
 * 
 * Copyright 2016 - present, Dennis Chen, All rights reserved.
 * 
 * Released under MIT license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "jquery"], factory);
	else if(typeof exports === 'object')
		exports["ReactWebKit"] = factory(require("react"), require("react-dom"), require("jquery"));
	else
		root["ReactWebKit"] = factory(root["React"], root["ReactDOM"], root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * To avoid my IDE (i.e. VS Code) be conflicted by sub-module name,
	 * the exported sub-module name has to different from the original name.
	 * I simply uppercase sub-module.
	 */

	var Widget = __webpack_require__(1);
	var Layout = __webpack_require__(8);
	var Datetime = __webpack_require__(9);
	var Input = __webpack_require__(10);
	var Popup = __webpack_require__(11);
	var Modal = __webpack_require__(12);
	var List = __webpack_require__(13);

	module.exports = {
	    Widget: Widget,
	    Layout: Layout,
	    Datetime: Datetime,
	    Input: Input,
	    Popup: Popup,
	    List: List
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * React WebKit - v0.0.5
	 * The react web widget kit base on typescript
	 * 
	 * Copyright 2016 - present, Dennis Chen, All rights reserved.
	 * 
	 * Released under MIT license
	 */
	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var Jq = __webpack_require__(4);
	var Util = __webpack_require__(5);
	var Qtip = __webpack_require__(6);
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
	    } else {
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
	var IndexSelection = function () {
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
	        return this.selection.length == 0 ? null : this.selection.slice();
	    };
	    return IndexSelection;
	}();
	exports.IndexSelection = IndexSelection;
	var InstanceSelection = function () {
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
	        return this.selection.length == 0 ? null : this.selection.slice();
	    };
	    return InstanceSelection;
	}();
	exports.InstanceSelection = InstanceSelection;
	var KeySelection = function () {
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
	        return this.selection.length == 0 ? null : this.selection.slice();
	    };
	    return KeySelection;
	}();
	exports.KeySelection = KeySelection;
	var pseudoIdGenerator = new Util.ShortId('wk_', 'webkit');
	var Component = function (_super) {
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
	}(React.Component);
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
	var Widget = function (_super) {
	    __extends(Widget, _super);
	    function Widget(props) {
	        _super.call(this, props);
	        this.state = {
	            visible: props.visible
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
	        var props = this.props;
	        if (props.animation && props.animation.eager && (undefined == props.visible || props.visible)) {
	            this._willAnimate = true;
	            this._willAnimateVisible = false;
	        }
	    };
	    Widget.prototype.componentDidMount = function () {
	        var props = this.props;
	        if (this._willAnimate) {
	            this.doAnimate();
	        }
	        if (props.tooltip) {
	            var tipOpt = props.tooltipOption ? Jq.extend(true, {}, defaultTooltipOption, props.tooltipOption) : defaultTooltipOption;
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
	        if (this.props.visible !== nextProps.visible) {
	            this.setState({ visible: nextProps.visible });
	        }
	    };
	    Widget.prototype.componentWillUpdate = function (nextProps, nextState) {
	        if (nextProps.animation && this.state.visible != nextState.visible) {
	            this._willAnimate = true;
	            this._willAnimateVisible = this.state.visible;
	        }
	    };
	    Widget.prototype.componentDidUpdate = function (prevProps, prevState) {
	        var fireResize = false;
	        var dom = this.getDOM();
	        var props = this.props;
	        if (this._willAnimate) {
	            fireResize = this.doAnimate();
	        }
	        if (fireResize || props.hflex !== prevProps.hflex || props.vflex !== prevProps.vflex) {
	            sendWidgetResize();
	        }
	        if (props.tooltip !== prevProps.tooltip) {
	            if (prevProps.tooltip) {
	                Qtip.removeTip(Jq(dom));
	            }
	            if (props.tooltip) {
	                var tipOpt = props.tooltipOption ? Jq.extend(true, {}, defaultTooltipOption, props.tooltipOption) : defaultTooltipOption;
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
	    Widget.prototype.doAnimate = function () {
	        var _this = this;
	        var props = this.props;
	        var dom = this.getDOM();
	        var visible = this.state.visible;
	        if (undefined == visible) {
	            visible = true;
	        }
	        delete this._willAnimate;
	        delete this._willAnimateVisible;
	        var ani = props.animation;
	        var jqd = Jq(dom);
	        var dur = ani.duration ? ani.duration : exports.DEFAULT_ANIMATION_DURATION;
	        var done = function done() {
	            _this.afterAnimation(visible);
	            sendWidgetResize();
	        };
	        var step = function step() {
	            sendWidgetResize();
	        };
	        switch (ani.effect) {
	            case 'slide':
	            case AniEffect.slide:
	                jqd.animate({ height: visible ? 'show' : 'hide' }, { duration: dur, step: step, done: done });
	                break;
	            case 'slideWidth':
	            case AniEffect.slideWidth:
	                jqd.animate({ width: visible ? 'show' : 'hide' }, { duration: dur, step: step, done: done });
	                break;
	            default:
	            case 'fade':
	            case AniEffect.fade:
	                jqd.animate({ opacity: visible ? 'show' : 'hide' }, { duration: dur, done: done });
	                break;
	        }
	        return visible;
	    };
	    Widget.prototype.afterAnimation = function (finalVisible) {};
	    Widget.prototype.show = function () {
	        this.setState({ visible: true });
	    };
	    Widget.prototype.hide = function () {
	        this.setState({ visible: false });
	    };
	    Widget.prototype.onQueueEvent = function (evt) {};
	    Widget.prototype.sendQueueEvent = function (name, data) {
	        if (data === void 0) {
	            data = {};
	        }
	        queue.send({
	            name: name,
	            data: data
	        });
	    };
	    Widget.prototype.postQueueEvent = function (name, data) {
	        if (data === void 0) {
	            data = {};
	        }
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
	    Widget.prototype.getRenderVisible = function () {
	        if (this._willAnimate) {
	            return this._willAnimateVisible;
	        }
	        return undefined == this.state.visible ? true : this.state.visible;
	    };
	    Widget.prototype.getRenderStyle = function () {
	        var css = {};
	        if (this.props.style) {
	            Util.supplyProps(css, this.props.style);
	        }
	        if (!this.getRenderVisible()) {
	            css.display = 'none';
	        }
	        return css;
	    };
	    Widget.prototype.getRenderChildren = function () {
	        return this.props.children;
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
	        var c = this.getRenderChildren();
	        return createReactElement(t, p, c);
	    };
	    Widget.prototype.stating = function () {
	        this.setState({});
	    };
	    Widget.defaultProps = {};
	    Widget.__wgtmgc = true;
	    return Widget;
	}(Component);
	exports.Widget = Widget;
	var Fonticon = function (_super) {
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
	}(Widget);
	exports.Fonticon = Fonticon;
	var Button = function (_super) {
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
	}(Widget);
	exports.Button = Button;
	var Anchor = function (_super) {
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
	}(Widget);
	exports.Anchor = Anchor;
	var Alert = function (_super) {
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
	            children.push(React.createElement(Fonticon, { className: props.fonticon }));
	        }
	        if (props.title) {
	            children.push(React.createElement("strong", null, props.title));
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
	}(Widget);
	exports.Alert = Alert;
	function createReactElement(type, props, children) {
	    if (Util.isArray(children)) {
	        return React.createElement.apply(React, [type, props].concat(children));
	    } else {
	        return React.createElement(type, props, children);
	    }
	}
	exports.createReactElement = createReactElement;
	function isWidgetElemnt(child) {
	    var casting = child;
	    return casting ? casting.type && casting.type.__wgtmgc : false;
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
	    } else if ('number' == typeof pxvar) {
	        return pxvar;
	    }
	    return 0;
	}
	exports.toPxNumber = toPxNumber;
	function gainFocus(under) {
	    var jq;
	    if (!(under instanceof Jq)) {
	        jq = Jq(under);
	    } else {
	        jq = under;
	    }
	    jq.find('a, button:not(:disabled):not(.wk-aux), input:not(:disabled):not(.wk-aux)').first().focus();
	}
	exports.gainFocus = gainFocus;

	//# sourceMappingURL=srcmap/widget.js.map

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * React WebKit - v0.0.5
	 * The react web widget kit base on typescript
	 * 
	 * Copyright 2016 - present, Dennis Chen, All rights reserved.
	 * 
	 * Released under MIT license
	 */
	"use strict";

	function supplyProps(props) {
	    var supplies = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        supplies[_i - 1] = arguments[_i];
	    }
	    supplies.forEach(function (each) {
	        for (var prop in each) {
	            if (props[prop] == undefined) {
	                props[prop] = each[prop];
	            }
	        }
	    });
	    return props;
	}
	exports.supplyProps = supplyProps;
	function overrideProps(props) {
	    var supplies = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        supplies[_i - 1] = arguments[_i];
	    }
	    supplies.forEach(function (each) {
	        for (var prop in each) {
	            props[prop] = each[prop];
	        }
	    });
	    return props;
	}
	exports.overrideProps = overrideProps;
	var SimpleQueue = function () {
	    function SimpleQueue() {
	        this.listeners = [];
	    }
	    SimpleQueue.prototype.add = function (l) {
	        this.listeners.push(l);
	    };
	    SimpleQueue.prototype.remove = function (l) {
	        var index = this.listeners.indexOf(l);
	        if (index > -1) {
	            this.listeners.splice(index, 1);
	        }
	    };
	    SimpleQueue.prototype.send = function (evt) {
	        this.listeners.forEach(function (each) {
	            each.onQueueEvent(evt);
	        });
	    };
	    SimpleQueue.prototype.post = function (evt, timeout) {
	        var _this = this;
	        setTimeout(function () {
	            _this.send(evt);
	        }, timeout);
	    };
	    return SimpleQueue;
	}();
	exports.SimpleQueue = SimpleQueue;
	function addSalt(alphabet, salt) {
	    var integer, j, i, v, p;
	    var temp;
	    if (!salt.length) {
	        return alphabet;
	    }
	    for (i = alphabet.length - 1, v = 0, p = 0; i > 0; i--, v++) {
	        v %= salt.length;
	        p += integer = salt.charAt(v).charCodeAt(0);
	        j = (integer + v + p) % i;
	        temp = alphabet.charAt(j);
	        alphabet = alphabet.substr(0, j) + alphabet.charAt(i) + alphabet.substr(j + 1);
	        alphabet = alphabet.substr(0, i) + temp + alphabet.substr(i + 1);
	    }
	    return alphabet;
	}
	var ShortId = function () {
	    function ShortId(prefix, salt, alphabet) {
	        if (prefix === void 0) {
	            prefix = '';
	        }
	        if (salt === void 0) {
	            salt = 'betterthannever';
	        }
	        if (alphabet === void 0) {
	            alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
	        }
	        this.count = 0;
	        this.reused = [];
	        this.prefix = prefix;
	        this.alphabet = addSalt(alphabet, salt);
	    }
	    ShortId.prototype.reuse = function (id) {
	        this.reused.push(id);
	    };
	    ShortId.prototype.next = function () {
	        if (this.reused.length > 0) {
	            return this.reused.shift();
	        }
	        return this.hash(this.count++);
	    };
	    ShortId.prototype.hash = function (input) {
	        var hash = [],
	            length = this.alphabet.length;
	        do {
	            hash.unshift(this.alphabet[input % length]);
	            input = Math.floor(input / length) - 1;
	        } while (input >= 0);
	        hash.unshift(this.prefix);
	        return hash.join('');
	    };
	    return ShortId;
	}();
	exports.ShortId = ShortId;
	function formatString(str) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    if (!args || args.length == 0) {
	        return str;
	    }
	    var l = str.length,
	        argidx = 0;
	    var sb = [];
	    for (var i = 0; i < l; i++) {
	        var c = str.charAt(i);
	        if (c == '{') {
	            if (i < l - 1 && str.charAt(i + 1) == '}' && argidx < args.length) {
	                sb.push(args[argidx]);
	                i++;
	                argidx++;
	                continue;
	            }
	        }
	        sb.push(c);
	    }
	    return sb.join('');
	}
	exports.formatString = formatString;
	function isArray(obj) {
	    return obj instanceof Array || Object.prototype.toString.call(obj) === '[object Array]';
	}
	exports.isArray = isArray;
	(function (DateField) {
	    DateField[DateField["year"] = 1] = "year";
	    DateField[DateField["month"] = 2] = "month";
	    DateField[DateField["date"] = 3] = "date";
	    DateField[DateField["hour"] = 4] = "hour";
	    DateField[DateField["minute"] = 5] = "minute";
	    DateField[DateField["second"] = 6] = "second";
	    DateField[DateField["millisecond"] = 7] = "millisecond";
	})(exports.DateField || (exports.DateField = {}));
	var DateField = exports.DateField;
	var secondms = 1000;
	var minutems = secondms * 60;
	var hourms = minutems * 60;
	var datems = hourms * 24;
	function isDateEquals(date1, date2, level) {
	    if (date1 == date2) {
	        return true;
	    }
	    if (!date1 || !date2) {
	        return false;
	    }
	    switch (level) {
	        case DateField.millisecond:
	            if (date1.getMilliseconds() != date2.getMilliseconds()) {
	                return false;
	            }
	        case DateField.second:
	            if (date1.getSeconds() != date2.getSeconds()) {
	                return false;
	            }
	        case DateField.minute:
	            if (date1.getMinutes() != date2.getMinutes()) {
	                return false;
	            }
	        case DateField.hour:
	            if (date1.getHours() != date2.getHours()) {
	                return false;
	            }
	        case DateField.month:
	            if (date1.getMonth() != date2.getMonth()) {
	                return false;
	            }
	        case DateField.year:
	            if (date1.getFullYear() != date2.getFullYear()) {
	                return false;
	            }
	            return true;
	    }
	    return date1.getTime() == date2.getTime();
	}
	exports.isDateEquals = isDateEquals;
	function addDateField(date, field, value) {
	    var time = date.getTime();
	    switch (field) {
	        case DateField.year:
	            date.setFullYear(date.getFullYear() + value);
	            break;
	        case DateField.month:
	            var month = date.getMonth();
	            date.setMonth(month + value);
	            break;
	        case DateField.date:
	            date.setTime(time + value * datems);
	            break;
	        case DateField.hour:
	            date.setTime(time + value * hourms);
	            break;
	        case DateField.minute:
	            date.setTime(time + value * minutems);
	            break;
	        case DateField.second:
	            date.setTime(time + value * secondms);
	            break;
	        case DateField.millisecond:
	            date.setTime(time + value);
	            break;
	    }
	    return date;
	}
	exports.addDateField = addDateField;

	//# sourceMappingURL=srcmap/util.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * React WebKit - v0.0.5
	 * The react web widget kit base on typescript
	 * 
	 * Copyright 2016 - present, Dennis Chen, All rights reserved.
	 * 
	 * Released under MIT license
	 */
	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var Jq = __webpack_require__(4);
	var Qtip = __webpack_require__(7);
	var __QtipLoad = typeof Qtip === 'undefined' ? 'undefined' : _typeof(Qtip);
	var qtipDefaultOpt = {
	    position: {
	        viewport: true,
	        adjust: {
	            method: 'flipinvert flipinvert'
	        }
	    },
	    style: {
	        tip: {
	            corner: true
	        }
	    }
	};
	function setTip(target, tip, tipOption) {
	    var opt;
	    if ('string' == typeof target) {
	        target = Jq(target);
	    } else if (!(target instanceof Jq)) {
	        target = Jq(target);
	    }
	    if ('string' == typeof tip || 'function' == typeof tip) {
	        opt = Jq.extend(true, {
	            content: {
	                text: tip
	            }
	        }, qtipDefaultOpt);
	    } else {
	        opt = Jq.extend(true, {}, qtipDefaultOpt);
	    }
	    if (tipOption) {
	        opt = Jq.extend(true, opt, tipOption);
	    }
	    target.qtip(opt);
	}
	exports.setTip = setTip;
	function removeTip(target) {
	    if ('string' == typeof target) {
	        target = Jq(target);
	    } else if (!(target instanceof Jq)) {
	        target = Jq(target);
	    }
	    target.qtip('destroy', true);
	}
	exports.removeTip = removeTip;

	//# sourceMappingURL=srcmap/qtip.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*!
	 * qTip2 - Pretty powerful tooltips - v3.0.3
	 * http://qtip2.com
	 *
	 * Copyright (c) 2016 
	 * Released under the MIT licenses
	 * http://jquery.org/license
	 *
	 * Date: Mon May 16 2016 08:42 EDT-0400
	 * Plugins: tips viewport imagemap svg
	 * Styles: core basic css3
	 */
	/*global window: false, jQuery: false, console: false, define: false */

	/* Cache window, document, undefined */
	(function (window, document, undefined) {

		// Uses AMD or browser globals to create a jQuery plugin.
		(function (factory) {
			"use strict";

			if (true) {
				!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			} else if (jQuery && !jQuery.fn.qtip) {
				factory(jQuery);
			}
		})(function ($) {
			"use strict"; // Enable ECMAScript "strict" operation for this function. See more: http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/

			; // Munge the primitives - Paul Irish tip
			var TRUE = true,
			    FALSE = false,
			    NULL = null,


			// Common variables
			X = 'x',
			    Y = 'y',
			    WIDTH = 'width',
			    HEIGHT = 'height',


			// Positioning sides
			TOP = 'top',
			    LEFT = 'left',
			    BOTTOM = 'bottom',
			    RIGHT = 'right',
			    CENTER = 'center',


			// Position adjustment types
			FLIP = 'flip',
			    FLIPINVERT = 'flipinvert',
			    SHIFT = 'shift',


			// Shortcut vars
			QTIP,
			    PROTOTYPE,
			    CORNER,
			    CHECKS,
			    PLUGINS = {},
			    NAMESPACE = 'qtip',
			    ATTR_HAS = 'data-hasqtip',
			    ATTR_ID = 'data-qtip-id',
			    WIDGET = ['ui-widget', 'ui-tooltip'],
			    SELECTOR = '.' + NAMESPACE,
			    INACTIVE_EVENTS = 'click dblclick mousedown mouseup mousemove mouseleave mouseenter'.split(' '),
			    CLASS_FIXED = NAMESPACE + '-fixed',
			    CLASS_DEFAULT = NAMESPACE + '-default',
			    CLASS_FOCUS = NAMESPACE + '-focus',
			    CLASS_HOVER = NAMESPACE + '-hover',
			    CLASS_DISABLED = NAMESPACE + '-disabled',
			    replaceSuffix = '_replacedByqTip',
			    oldtitle = 'oldtitle',
			    trackingBound,


			// Browser detection
			BROWSER = {
				/*
	    * IE version detection
	    *
	    * Adapted from: http://ajaxian.com/archives/attack-of-the-ie-conditional-comment
	    * Credit to James Padolsey for the original implemntation!
	    */
				ie: function () {
					/* eslint-disable no-empty */
					var v, i;
					for (v = 4, i = document.createElement('div'); (i.innerHTML = '<!--[if gt IE ' + v + ']><i></i><![endif]-->') && i.getElementsByTagName('i')[0]; v += 1) {}
					return v > 4 ? v : NaN;
					/* eslint-enable no-empty */
				}(),

				/*
	    * iOS version detection
	    */
				iOS: parseFloat(('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', '')) || FALSE
			};
			;function QTip(target, options, id, attr) {
				// Elements and ID
				this.id = id;
				this.target = target;
				this.tooltip = NULL;
				this.elements = { target: target };

				// Internal constructs
				this._id = NAMESPACE + '-' + id;
				this.timers = { img: {} };
				this.options = options;
				this.plugins = {};

				// Cache object
				this.cache = {
					event: {},
					target: $(),
					disabled: FALSE,
					attr: attr,
					onTooltip: FALSE,
					lastClass: ''
				};

				// Set the initial flags
				this.rendered = this.destroyed = this.disabled = this.waiting = this.hiddenDuringWait = this.positioning = this.triggering = FALSE;
			}
			PROTOTYPE = QTip.prototype;

			PROTOTYPE._when = function (deferreds) {
				return $.when.apply($, deferreds);
			};

			PROTOTYPE.render = function (show) {
				if (this.rendered || this.destroyed) {
					return this;
				} // If tooltip has already been rendered, exit

				var self = this,
				    options = this.options,
				    cache = this.cache,
				    elements = this.elements,
				    text = options.content.text,
				    title = options.content.title,
				    button = options.content.button,
				    posOptions = options.position,
				    deferreds = [];

				// Add ARIA attributes to target
				$.attr(this.target[0], 'aria-describedby', this._id);

				// Create public position object that tracks current position corners
				cache.posClass = this._createPosClass((this.position = { my: posOptions.my, at: posOptions.at }).my);

				// Create tooltip element
				this.tooltip = elements.tooltip = $('<div/>', {
					'id': this._id,
					'class': [NAMESPACE, CLASS_DEFAULT, options.style.classes, cache.posClass].join(' '),
					'width': options.style.width || '',
					'height': options.style.height || '',
					'tracking': posOptions.target === 'mouse' && posOptions.adjust.mouse,

					/* ARIA specific attributes */
					'role': 'alert',
					'aria-live': 'polite',
					'aria-atomic': FALSE,
					'aria-describedby': this._id + '-content',
					'aria-hidden': TRUE
				}).toggleClass(CLASS_DISABLED, this.disabled).attr(ATTR_ID, this.id).data(NAMESPACE, this).appendTo(posOptions.container).append(
				// Create content element
				elements.content = $('<div />', {
					'class': NAMESPACE + '-content',
					'id': this._id + '-content',
					'aria-atomic': TRUE
				}));

				// Set rendered flag and prevent redundant reposition calls for now
				this.rendered = -1;
				this.positioning = TRUE;

				// Create title...
				if (title) {
					this._createTitle();

					// Update title only if its not a callback (called in toggle if so)
					if (!$.isFunction(title)) {
						deferreds.push(this._updateTitle(title, FALSE));
					}
				}

				// Create button
				if (button) {
					this._createButton();
				}

				// Set proper rendered flag and update content if not a callback function (called in toggle)
				if (!$.isFunction(text)) {
					deferreds.push(this._updateContent(text, FALSE));
				}
				this.rendered = TRUE;

				// Setup widget classes
				this._setWidget();

				// Initialize 'render' plugins
				$.each(PLUGINS, function (name) {
					var instance;
					if (this.initialize === 'render' && (instance = this(self))) {
						self.plugins[name] = instance;
					}
				});

				// Unassign initial events and assign proper events
				this._unassignEvents();
				this._assignEvents();

				// When deferreds have completed
				this._when(deferreds).then(function () {
					// tooltiprender event
					self._trigger('render');

					// Reset flags
					self.positioning = FALSE;

					// Show tooltip if not hidden during wait period
					if (!self.hiddenDuringWait && (options.show.ready || show)) {
						self.toggle(TRUE, cache.event, FALSE);
					}
					self.hiddenDuringWait = FALSE;
				});

				// Expose API
				QTIP.api[this.id] = this;

				return this;
			};

			PROTOTYPE.destroy = function (immediate) {
				// Set flag the signify destroy is taking place to plugins
				// and ensure it only gets destroyed once!
				if (this.destroyed) {
					return this.target;
				}

				function process() {
					if (this.destroyed) {
						return;
					}
					this.destroyed = TRUE;

					var target = this.target,
					    title = target.attr(oldtitle),
					    timer;

					// Destroy tooltip if rendered
					if (this.rendered) {
						this.tooltip.stop(1, 0).find('*').remove().end().remove();
					}

					// Destroy all plugins
					$.each(this.plugins, function () {
						this.destroy && this.destroy();
					});

					// Clear timers
					for (timer in this.timers) {
						if (this.timers.hasOwnProperty(timer)) {
							clearTimeout(this.timers[timer]);
						}
					}

					// Remove api object and ARIA attributes
					target.removeData(NAMESPACE).removeAttr(ATTR_ID).removeAttr(ATTR_HAS).removeAttr('aria-describedby');

					// Reset old title attribute if removed
					if (this.options.suppress && title) {
						target.attr('title', title).removeAttr(oldtitle);
					}

					// Remove qTip events associated with this API
					this._unassignEvents();

					// Remove ID from used id objects, and delete object references
					// for better garbage collection and leak protection
					this.options = this.elements = this.cache = this.timers = this.plugins = this.mouse = NULL;

					// Delete epoxsed API object
					delete QTIP.api[this.id];
				}

				// If an immediate destroy is needed
				if ((immediate !== TRUE || this.triggering === 'hide') && this.rendered) {
					this.tooltip.one('tooltiphidden', $.proxy(process, this));
					!this.triggering && this.hide();
				}

				// If we're not in the process of hiding... process
				else {
						process.call(this);
					}

				return this.target;
			};
			;function invalidOpt(a) {
				return a === NULL || $.type(a) !== 'object';
			}

			function invalidContent(c) {
				return !($.isFunction(c) || c && c.attr || c.length || $.type(c) === 'object' && (c.jquery || c.then));
			}

			// Option object sanitizer
			function sanitizeOptions(opts) {
				var content, text, ajax, once;

				if (invalidOpt(opts)) {
					return FALSE;
				}

				if (invalidOpt(opts.metadata)) {
					opts.metadata = { type: opts.metadata };
				}

				if ('content' in opts) {
					content = opts.content;

					if (invalidOpt(content) || content.jquery || content.done) {
						text = invalidContent(content) ? FALSE : content;
						content = opts.content = {
							text: text
						};
					} else {
						text = content.text;
					}

					// DEPRECATED - Old content.ajax plugin functionality
					// Converts it into the proper Deferred syntax
					if ('ajax' in content) {
						ajax = content.ajax;
						once = ajax && ajax.once !== FALSE;
						delete content.ajax;

						content.text = function (event, api) {
							var loading = text || $(this).attr(api.options.content.attr) || 'Loading...',
							    deferred = $.ajax($.extend({}, ajax, { context: api })).then(ajax.success, NULL, ajax.error).then(function (newContent) {
								if (newContent && once) {
									api.set('content.text', newContent);
								}
								return newContent;
							}, function (xhr, status, error) {
								if (api.destroyed || xhr.status === 0) {
									return;
								}
								api.set('content.text', status + ': ' + error);
							});

							return !once ? (api.set('content.text', loading), deferred) : loading;
						};
					}

					if ('title' in content) {
						if ($.isPlainObject(content.title)) {
							content.button = content.title.button;
							content.title = content.title.text;
						}

						if (invalidContent(content.title || FALSE)) {
							content.title = FALSE;
						}
					}
				}

				if ('position' in opts && invalidOpt(opts.position)) {
					opts.position = { my: opts.position, at: opts.position };
				}

				if ('show' in opts && invalidOpt(opts.show)) {
					opts.show = opts.show.jquery ? { target: opts.show } : opts.show === TRUE ? { ready: TRUE } : { event: opts.show };
				}

				if ('hide' in opts && invalidOpt(opts.hide)) {
					opts.hide = opts.hide.jquery ? { target: opts.hide } : { event: opts.hide };
				}

				if ('style' in opts && invalidOpt(opts.style)) {
					opts.style = { classes: opts.style };
				}

				// Sanitize plugin options
				$.each(PLUGINS, function () {
					this.sanitize && this.sanitize(opts);
				});

				return opts;
			}

			// Setup builtin .set() option checks
			CHECKS = PROTOTYPE.checks = {
				builtin: {
					// Core checks
					'^id$': function id$(obj, o, v, prev) {
						var id = v === TRUE ? QTIP.nextid : v,
						    newId = NAMESPACE + '-' + id;

						if (id !== FALSE && id.length > 0 && !$('#' + newId).length) {
							this._id = newId;

							if (this.rendered) {
								this.tooltip[0].id = this._id;
								this.elements.content[0].id = this._id + '-content';
								this.elements.title[0].id = this._id + '-title';
							}
						} else {
							obj[o] = prev;
						}
					},
					'^prerender': function prerender(obj, o, v) {
						v && !this.rendered && this.render(this.options.show.ready);
					},

					// Content checks
					'^content.text$': function contentText$(obj, o, v) {
						this._updateContent(v);
					},
					'^content.attr$': function contentAttr$(obj, o, v, prev) {
						if (this.options.content.text === this.target.attr(prev)) {
							this._updateContent(this.target.attr(v));
						}
					},
					'^content.title$': function contentTitle$(obj, o, v) {
						// Remove title if content is null
						if (!v) {
							return this._removeTitle();
						}

						// If title isn't already created, create it now and update
						v && !this.elements.title && this._createTitle();
						this._updateTitle(v);
					},
					'^content.button$': function contentButton$(obj, o, v) {
						this._updateButton(v);
					},
					'^content.title.(text|button)$': function contentTitleTextButton$(obj, o, v) {
						this.set('content.' + o, v); // Backwards title.text/button compat
					},

					// Position checks
					'^position.(my|at)$': function positionMyAt$(obj, o, v) {
						if ('string' === typeof v) {
							this.position[o] = obj[o] = new CORNER(v, o === 'at');
						}
					},
					'^position.container$': function positionContainer$(obj, o, v) {
						this.rendered && this.tooltip.appendTo(v);
					},

					// Show checks
					'^show.ready$': function showReady$(obj, o, v) {
						v && (!this.rendered && this.render(TRUE) || this.toggle(TRUE));
					},

					// Style checks
					'^style.classes$': function styleClasses$(obj, o, v, p) {
						this.rendered && this.tooltip.removeClass(p).addClass(v);
					},
					'^style.(width|height)': function styleWidthHeight(obj, o, v) {
						this.rendered && this.tooltip.css(o, v);
					},
					'^style.widget|content.title': function styleWidgetContentTitle() {
						this.rendered && this._setWidget();
					},
					'^style.def': function styleDef(obj, o, v) {
						this.rendered && this.tooltip.toggleClass(CLASS_DEFAULT, !!v);
					},

					// Events check
					'^events.(render|show|move|hide|focus|blur)$': function eventsRenderShowMoveHideFocusBlur$(obj, o, v) {
						this.rendered && this.tooltip[($.isFunction(v) ? '' : 'un') + 'bind']('tooltip' + o, v);
					},

					// Properties which require event reassignment
					'^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)': function showHidePositionEventTargetFixedInactiveLeaveDistanceViewportAdjust() {
						if (!this.rendered) {
							return;
						}

						// Set tracking flag
						var posOptions = this.options.position;
						this.tooltip.attr('tracking', posOptions.target === 'mouse' && posOptions.adjust.mouse);

						// Reassign events
						this._unassignEvents();
						this._assignEvents();
					}
				}
			};

			// Dot notation converter
			function convertNotation(options, notation) {
				var i = 0,
				    obj,
				    option = options,


				// Split notation into array
				levels = notation.split('.');

				// Loop through
				while (option = option[levels[i++]]) {
					if (i < levels.length) {
						obj = option;
					}
				}

				return [obj || options, levels.pop()];
			}

			PROTOTYPE.get = function (notation) {
				if (this.destroyed) {
					return this;
				}

				var o = convertNotation(this.options, notation.toLowerCase()),
				    result = o[0][o[1]];

				return result.precedance ? result.string() : result;
			};

			function setCallback(notation, args) {
				var category, rule, match;

				for (category in this.checks) {
					if (!this.checks.hasOwnProperty(category)) {
						continue;
					}

					for (rule in this.checks[category]) {
						if (!this.checks[category].hasOwnProperty(rule)) {
							continue;
						}

						if (match = new RegExp(rule, 'i').exec(notation)) {
							args.push(match);

							if (category === 'builtin' || this.plugins[category]) {
								this.checks[category][rule].apply(this.plugins[category] || this, args);
							}
						}
					}
				}
			}

			var rmove = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
			    rrender = /^prerender|show\.ready/i;

			PROTOTYPE.set = function (option, value) {
				if (this.destroyed) {
					return this;
				}

				var rendered = this.rendered,
				    reposition = FALSE,
				    options = this.options,
				    name;

				// Convert singular option/value pair into object form
				if ('string' === typeof option) {
					name = option;option = {};option[name] = value;
				} else {
					option = $.extend({}, option);
				}

				// Set all of the defined options to their new values
				$.each(option, function (notation, val) {
					if (rendered && rrender.test(notation)) {
						delete option[notation];return;
					}

					// Set new obj value
					var obj = convertNotation(options, notation.toLowerCase()),
					    previous;
					previous = obj[0][obj[1]];
					obj[0][obj[1]] = val && val.nodeType ? $(val) : val;

					// Also check if we need to reposition
					reposition = rmove.test(notation) || reposition;

					// Set the new params for the callback
					option[notation] = [obj[0], obj[1], val, previous];
				});

				// Re-sanitize options
				sanitizeOptions(options);

				/*
	    * Execute any valid callbacks for the set options
	    * Also set positioning flag so we don't get loads of redundant repositioning calls.
	    */
				this.positioning = TRUE;
				$.each(option, $.proxy(setCallback, this));
				this.positioning = FALSE;

				// Update position if needed
				if (this.rendered && this.tooltip[0].offsetWidth > 0 && reposition) {
					this.reposition(options.position.target === 'mouse' ? NULL : this.cache.event);
				}

				return this;
			};
			;PROTOTYPE._update = function (content, element) {
				var self = this,
				    cache = this.cache;

				// Make sure tooltip is rendered and content is defined. If not return
				if (!this.rendered || !content) {
					return FALSE;
				}

				// Use function to parse content
				if ($.isFunction(content)) {
					content = content.call(this.elements.target, cache.event, this) || '';
				}

				// Handle deferred content
				if ($.isFunction(content.then)) {
					cache.waiting = TRUE;
					return content.then(function (c) {
						cache.waiting = FALSE;
						return self._update(c, element);
					}, NULL, function (e) {
						return self._update(e, element);
					});
				}

				// If content is null... return false
				if (content === FALSE || !content && content !== '') {
					return FALSE;
				}

				// Append new content if its a DOM array and show it if hidden
				if (content.jquery && content.length > 0) {
					element.empty().append(content.css({ display: 'block', visibility: 'visible' }));
				}

				// Content is a regular string, insert the new content
				else {
						element.html(content);
					}

				// Wait for content to be loaded, and reposition
				return this._waitForContent(element).then(function (images) {
					if (self.rendered && self.tooltip[0].offsetWidth > 0) {
						self.reposition(cache.event, !images.length);
					}
				});
			};

			PROTOTYPE._waitForContent = function (element) {
				var cache = this.cache;

				// Set flag
				cache.waiting = TRUE;

				// If imagesLoaded is included, ensure images have loaded and return promise
				return ($.fn.imagesLoaded ? element.imagesLoaded() : new $.Deferred().resolve([])).done(function () {
					cache.waiting = FALSE;
				}).promise();
			};

			PROTOTYPE._updateContent = function (content, reposition) {
				this._update(content, this.elements.content, reposition);
			};

			PROTOTYPE._updateTitle = function (content, reposition) {
				if (this._update(content, this.elements.title, reposition) === FALSE) {
					this._removeTitle(FALSE);
				}
			};

			PROTOTYPE._createTitle = function () {
				var elements = this.elements,
				    id = this._id + '-title';

				// Destroy previous title element, if present
				if (elements.titlebar) {
					this._removeTitle();
				}

				// Create title bar and title elements
				elements.titlebar = $('<div />', {
					'class': NAMESPACE + '-titlebar ' + (this.options.style.widget ? createWidgetClass('header') : '')
				}).append(elements.title = $('<div />', {
					'id': id,
					'class': NAMESPACE + '-title',
					'aria-atomic': TRUE
				})).insertBefore(elements.content)

				// Button-specific events
				.delegate('.qtip-close', 'mousedown keydown mouseup keyup mouseout', function (event) {
					$(this).toggleClass('ui-state-active ui-state-focus', event.type.substr(-4) === 'down');
				}).delegate('.qtip-close', 'mouseover mouseout', function (event) {
					$(this).toggleClass('ui-state-hover', event.type === 'mouseover');
				});

				// Create button if enabled
				if (this.options.content.button) {
					this._createButton();
				}
			};

			PROTOTYPE._removeTitle = function (reposition) {
				var elements = this.elements;

				if (elements.title) {
					elements.titlebar.remove();
					elements.titlebar = elements.title = elements.button = NULL;

					// Reposition if enabled
					if (reposition !== FALSE) {
						this.reposition();
					}
				}
			};
			;PROTOTYPE._createPosClass = function (my) {
				return NAMESPACE + '-pos-' + (my || this.options.position.my).abbrev();
			};

			PROTOTYPE.reposition = function (event, effect) {
				if (!this.rendered || this.positioning || this.destroyed) {
					return this;
				}

				// Set positioning flag
				this.positioning = TRUE;

				var cache = this.cache,
				    tooltip = this.tooltip,
				    posOptions = this.options.position,
				    target = posOptions.target,
				    my = posOptions.my,
				    at = posOptions.at,
				    viewport = posOptions.viewport,
				    container = posOptions.container,
				    adjust = posOptions.adjust,
				    method = adjust.method.split(' '),
				    tooltipWidth = tooltip.outerWidth(FALSE),
				    tooltipHeight = tooltip.outerHeight(FALSE),
				    targetWidth = 0,
				    targetHeight = 0,
				    type = tooltip.css('position'),
				    position = { left: 0, top: 0 },
				    visible = tooltip[0].offsetWidth > 0,
				    isScroll = event && event.type === 'scroll',
				    win = $(window),
				    doc = container[0].ownerDocument,
				    mouse = this.mouse,
				    pluginCalculations,
				    offset,
				    adjusted,
				    newClass;

				// Check if absolute position was passed
				if ($.isArray(target) && target.length === 2) {
					// Force left top and set position
					at = { x: LEFT, y: TOP };
					position = { left: target[0], top: target[1] };
				}

				// Check if mouse was the target
				else if (target === 'mouse') {
						// Force left top to allow flipping
						at = { x: LEFT, y: TOP };

						// Use the mouse origin that caused the show event, if distance hiding is enabled
						if ((!adjust.mouse || this.options.hide.distance) && cache.origin && cache.origin.pageX) {
							event = cache.origin;
						}

						// Use cached event for resize/scroll events
						else if (!event || event && (event.type === 'resize' || event.type === 'scroll')) {
								event = cache.event;
							}

							// Otherwise, use the cached mouse coordinates if available
							else if (mouse && mouse.pageX) {
									event = mouse;
								}

						// Calculate body and container offset and take them into account below
						if (type !== 'static') {
							position = container.offset();
						}
						if (doc.body.offsetWidth !== (window.innerWidth || doc.documentElement.clientWidth)) {
							offset = $(document.body).offset();
						}

						// Use event coordinates for position
						position = {
							left: event.pageX - position.left + (offset && offset.left || 0),
							top: event.pageY - position.top + (offset && offset.top || 0)
						};

						// Scroll events are a pain, some browsers
						if (adjust.mouse && isScroll && mouse) {
							position.left -= (mouse.scrollX || 0) - win.scrollLeft();
							position.top -= (mouse.scrollY || 0) - win.scrollTop();
						}
					}

					// Target wasn't mouse or absolute...
					else {
							// Check if event targetting is being used
							if (target === 'event') {
								if (event && event.target && event.type !== 'scroll' && event.type !== 'resize') {
									cache.target = $(event.target);
								} else if (!event.target) {
									cache.target = this.elements.target;
								}
							} else if (target !== 'event') {
								cache.target = $(target.jquery ? target : this.elements.target);
							}
							target = cache.target;

							// Parse the target into a jQuery object and make sure there's an element present
							target = $(target).eq(0);
							if (target.length === 0) {
								return this;
							}

							// Check if window or document is the target
							else if (target[0] === document || target[0] === window) {
									targetWidth = BROWSER.iOS ? window.innerWidth : target.width();
									targetHeight = BROWSER.iOS ? window.innerHeight : target.height();

									if (target[0] === window) {
										position = {
											top: (viewport || target).scrollTop(),
											left: (viewport || target).scrollLeft()
										};
									}
								}

								// Check if the target is an <AREA> element
								else if (PLUGINS.imagemap && target.is('area')) {
										pluginCalculations = PLUGINS.imagemap(this, target, at, PLUGINS.viewport ? method : FALSE);
									}

									// Check if the target is an SVG element
									else if (PLUGINS.svg && target && target[0].ownerSVGElement) {
											pluginCalculations = PLUGINS.svg(this, target, at, PLUGINS.viewport ? method : FALSE);
										}

										// Otherwise use regular jQuery methods
										else {
												targetWidth = target.outerWidth(FALSE);
												targetHeight = target.outerHeight(FALSE);
												position = target.offset();
											}

							// Parse returned plugin values into proper variables
							if (pluginCalculations) {
								targetWidth = pluginCalculations.width;
								targetHeight = pluginCalculations.height;
								offset = pluginCalculations.offset;
								position = pluginCalculations.position;
							}

							// Adjust position to take into account offset parents
							position = this.reposition.offset(target, position, container);

							// Adjust for position.fixed tooltips (and also iOS scroll bug in v3.2-4.0 & v4.3-4.3.2)
							if (BROWSER.iOS > 3.1 && BROWSER.iOS < 4.1 || BROWSER.iOS >= 4.3 && BROWSER.iOS < 4.33 || !BROWSER.iOS && type === 'fixed') {
								position.left -= win.scrollLeft();
								position.top -= win.scrollTop();
							}

							// Adjust position relative to target
							if (!pluginCalculations || pluginCalculations && pluginCalculations.adjustable !== FALSE) {
								position.left += at.x === RIGHT ? targetWidth : at.x === CENTER ? targetWidth / 2 : 0;
								position.top += at.y === BOTTOM ? targetHeight : at.y === CENTER ? targetHeight / 2 : 0;
							}
						}

				// Adjust position relative to tooltip
				position.left += adjust.x + (my.x === RIGHT ? -tooltipWidth : my.x === CENTER ? -tooltipWidth / 2 : 0);
				position.top += adjust.y + (my.y === BOTTOM ? -tooltipHeight : my.y === CENTER ? -tooltipHeight / 2 : 0);

				// Use viewport adjustment plugin if enabled
				if (PLUGINS.viewport) {
					adjusted = position.adjusted = PLUGINS.viewport(this, position, posOptions, targetWidth, targetHeight, tooltipWidth, tooltipHeight);

					// Apply offsets supplied by positioning plugin (if used)
					if (offset && adjusted.left) {
						position.left += offset.left;
					}
					if (offset && adjusted.top) {
						position.top += offset.top;
					}

					// Apply any new 'my' position
					if (adjusted.my) {
						this.position.my = adjusted.my;
					}
				}

				// Viewport adjustment is disabled, set values to zero
				else {
						position.adjusted = { left: 0, top: 0 };
					}

				// Set tooltip position class if it's changed
				if (cache.posClass !== (newClass = this._createPosClass(this.position.my))) {
					cache.posClass = newClass;
					tooltip.removeClass(cache.posClass).addClass(newClass);
				}

				// tooltipmove event
				if (!this._trigger('move', [position, viewport.elem || viewport], event)) {
					return this;
				}
				delete position.adjusted;

				// If effect is disabled, target it mouse, no animation is defined or positioning gives NaN out, set CSS directly
				if (effect === FALSE || !visible || isNaN(position.left) || isNaN(position.top) || target === 'mouse' || !$.isFunction(posOptions.effect)) {
					tooltip.css(position);
				}

				// Use custom function if provided
				else if ($.isFunction(posOptions.effect)) {
						posOptions.effect.call(tooltip, this, $.extend({}, position));
						tooltip.queue(function (next) {
							// Reset attributes to avoid cross-browser rendering bugs
							$(this).css({ opacity: '', height: '' });
							if (BROWSER.ie) {
								this.style.removeAttribute('filter');
							}

							next();
						});
					}

				// Set positioning flag
				this.positioning = FALSE;

				return this;
			};

			// Custom (more correct for qTip!) offset calculator
			PROTOTYPE.reposition.offset = function (elem, pos, container) {
				if (!container[0]) {
					return pos;
				}

				var ownerDocument = $(elem[0].ownerDocument),
				    quirks = !!BROWSER.ie && document.compatMode !== 'CSS1Compat',
				    parent = container[0],
				    scrolled,
				    position,
				    parentOffset,
				    overflow;

				function scroll(e, i) {
					pos.left += i * e.scrollLeft();
					pos.top += i * e.scrollTop();
				}

				// Compensate for non-static containers offset
				do {
					if ((position = $.css(parent, 'position')) !== 'static') {
						if (position === 'fixed') {
							parentOffset = parent.getBoundingClientRect();
							scroll(ownerDocument, -1);
						} else {
							parentOffset = $(parent).position();
							parentOffset.left += parseFloat($.css(parent, 'borderLeftWidth')) || 0;
							parentOffset.top += parseFloat($.css(parent, 'borderTopWidth')) || 0;
						}

						pos.left -= parentOffset.left + (parseFloat($.css(parent, 'marginLeft')) || 0);
						pos.top -= parentOffset.top + (parseFloat($.css(parent, 'marginTop')) || 0);

						// If this is the first parent element with an overflow of "scroll" or "auto", store it
						if (!scrolled && (overflow = $.css(parent, 'overflow')) !== 'hidden' && overflow !== 'visible') {
							scrolled = $(parent);
						}
					}
				} while (parent = parent.offsetParent);

				// Compensate for containers scroll if it also has an offsetParent (or in IE quirks mode)
				if (scrolled && (scrolled[0] !== ownerDocument[0] || quirks)) {
					scroll(scrolled, 1);
				}

				return pos;
			};

			// Corner class
			var C = (CORNER = PROTOTYPE.reposition.Corner = function (corner, forceY) {
				corner = ('' + corner).replace(/([A-Z])/, ' $1').replace(/middle/gi, CENTER).toLowerCase();
				this.x = (corner.match(/left|right/i) || corner.match(/center/) || ['inherit'])[0].toLowerCase();
				this.y = (corner.match(/top|bottom|center/i) || ['inherit'])[0].toLowerCase();
				this.forceY = !!forceY;

				var f = corner.charAt(0);
				this.precedance = f === 't' || f === 'b' ? Y : X;
			}).prototype;

			C.invert = function (z, center) {
				this[z] = this[z] === LEFT ? RIGHT : this[z] === RIGHT ? LEFT : center || this[z];
			};

			C.string = function (join) {
				var x = this.x,
				    y = this.y;

				var result = x !== y ? x === 'center' || y !== 'center' && (this.precedance === Y || this.forceY) ? [y, x] : [x, y] : [x];

				return join !== false ? result.join(' ') : result;
			};

			C.abbrev = function () {
				var result = this.string(false);
				return result[0].charAt(0) + (result[1] && result[1].charAt(0) || '');
			};

			C.clone = function () {
				return new CORNER(this.string(), this.forceY);
			};

			;
			PROTOTYPE.toggle = function (state, event) {
				var cache = this.cache,
				    options = this.options,
				    tooltip = this.tooltip;

				// Try to prevent flickering when tooltip overlaps show element
				if (event) {
					if (/over|enter/.test(event.type) && cache.event && /out|leave/.test(cache.event.type) && options.show.target.add(event.target).length === options.show.target.length && tooltip.has(event.relatedTarget).length) {
						return this;
					}

					// Cache event
					cache.event = $.event.fix(event);
				}

				// If we're currently waiting and we've just hidden... stop it
				this.waiting && !state && (this.hiddenDuringWait = TRUE);

				// Render the tooltip if showing and it isn't already
				if (!this.rendered) {
					return state ? this.render(1) : this;
				} else if (this.destroyed || this.disabled) {
					return this;
				}

				var type = state ? 'show' : 'hide',
				    opts = this.options[type],
				    posOptions = this.options.position,
				    contentOptions = this.options.content,
				    width = this.tooltip.css('width'),
				    visible = this.tooltip.is(':visible'),
				    animate = state || opts.target.length === 1,
				    sameTarget = !event || opts.target.length < 2 || cache.target[0] === event.target,
				    identicalState,
				    allow,
				    after;

				// Detect state if valid one isn't provided
				if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)).search('boolean|number')) {
					state = !visible;
				}

				// Check if the tooltip is in an identical state to the new would-be state
				identicalState = !tooltip.is(':animated') && visible === state && sameTarget;

				// Fire tooltip(show/hide) event and check if destroyed
				allow = !identicalState ? !!this._trigger(type, [90]) : NULL;

				// Check to make sure the tooltip wasn't destroyed in the callback
				if (this.destroyed) {
					return this;
				}

				// If the user didn't stop the method prematurely and we're showing the tooltip, focus it
				if (allow !== FALSE && state) {
					this.focus(event);
				}

				// If the state hasn't changed or the user stopped it, return early
				if (!allow || identicalState) {
					return this;
				}

				// Set ARIA hidden attribute
				$.attr(tooltip[0], 'aria-hidden', !!!state);

				// Execute state specific properties
				if (state) {
					// Store show origin coordinates
					this.mouse && (cache.origin = $.event.fix(this.mouse));

					// Update tooltip content & title if it's a dynamic function
					if ($.isFunction(contentOptions.text)) {
						this._updateContent(contentOptions.text, FALSE);
					}
					if ($.isFunction(contentOptions.title)) {
						this._updateTitle(contentOptions.title, FALSE);
					}

					// Cache mousemove events for positioning purposes (if not already tracking)
					if (!trackingBound && posOptions.target === 'mouse' && posOptions.adjust.mouse) {
						$(document).bind('mousemove.' + NAMESPACE, this._storeMouse);
						trackingBound = TRUE;
					}

					// Update the tooltip position (set width first to prevent viewport/max-width issues)
					if (!width) {
						tooltip.css('width', tooltip.outerWidth(FALSE));
					}
					this.reposition(event, arguments[2]);
					if (!width) {
						tooltip.css('width', '');
					}

					// Hide other tooltips if tooltip is solo
					if (!!opts.solo) {
						(typeof opts.solo === 'string' ? $(opts.solo) : $(SELECTOR, opts.solo)).not(tooltip).not(opts.target).qtip('hide', new $.Event('tooltipsolo'));
					}
				} else {
					// Clear show timer if we're hiding
					clearTimeout(this.timers.show);

					// Remove cached origin on hide
					delete cache.origin;

					// Remove mouse tracking event if not needed (all tracking qTips are hidden)
					if (trackingBound && !$(SELECTOR + '[tracking="true"]:visible', opts.solo).not(tooltip).length) {
						$(document).unbind('mousemove.' + NAMESPACE);
						trackingBound = FALSE;
					}

					// Blur the tooltip
					this.blur(event);
				}

				// Define post-animation, state specific properties
				after = $.proxy(function () {
					if (state) {
						// Prevent antialias from disappearing in IE by removing filter
						if (BROWSER.ie) {
							tooltip[0].style.removeAttribute('filter');
						}

						// Remove overflow setting to prevent tip bugs
						tooltip.css('overflow', '');

						// Autofocus elements if enabled
						if ('string' === typeof opts.autofocus) {
							$(this.options.show.autofocus, tooltip).focus();
						}

						// If set, hide tooltip when inactive for delay period
						this.options.show.target.trigger('qtip-' + this.id + '-inactive');
					} else {
						// Reset CSS states
						tooltip.css({
							display: '',
							visibility: '',
							opacity: '',
							left: '',
							top: ''
						});
					}

					// tooltipvisible/tooltiphidden events
					this._trigger(state ? 'visible' : 'hidden');
				}, this);

				// If no effect type is supplied, use a simple toggle
				if (opts.effect === FALSE || animate === FALSE) {
					tooltip[type]();
					after();
				}

				// Use custom function if provided
				else if ($.isFunction(opts.effect)) {
						tooltip.stop(1, 1);
						opts.effect.call(tooltip, this);
						tooltip.queue('fx', function (n) {
							after();n();
						});
					}

					// Use basic fade function by default
					else {
							tooltip.fadeTo(90, state ? 1 : 0, after);
						}

				// If inactive hide method is set, active it
				if (state) {
					opts.target.trigger('qtip-' + this.id + '-inactive');
				}

				return this;
			};

			PROTOTYPE.show = function (event) {
				return this.toggle(TRUE, event);
			};

			PROTOTYPE.hide = function (event) {
				return this.toggle(FALSE, event);
			};
			;PROTOTYPE.focus = function (event) {
				if (!this.rendered || this.destroyed) {
					return this;
				}

				var qtips = $(SELECTOR),
				    tooltip = this.tooltip,
				    curIndex = parseInt(tooltip[0].style.zIndex, 10),
				    newIndex = QTIP.zindex + qtips.length;

				// Only update the z-index if it has changed and tooltip is not already focused
				if (!tooltip.hasClass(CLASS_FOCUS)) {
					// tooltipfocus event
					if (this._trigger('focus', [newIndex], event)) {
						// Only update z-index's if they've changed
						if (curIndex !== newIndex) {
							// Reduce our z-index's and keep them properly ordered
							qtips.each(function () {
								if (this.style.zIndex > curIndex) {
									this.style.zIndex = this.style.zIndex - 1;
								}
							});

							// Fire blur event for focused tooltip
							qtips.filter('.' + CLASS_FOCUS).qtip('blur', event);
						}

						// Set the new z-index
						tooltip.addClass(CLASS_FOCUS)[0].style.zIndex = newIndex;
					}
				}

				return this;
			};

			PROTOTYPE.blur = function (event) {
				if (!this.rendered || this.destroyed) {
					return this;
				}

				// Set focused status to FALSE
				this.tooltip.removeClass(CLASS_FOCUS);

				// tooltipblur event
				this._trigger('blur', [this.tooltip.css('zIndex')], event);

				return this;
			};
			;PROTOTYPE.disable = function (state) {
				if (this.destroyed) {
					return this;
				}

				// If 'toggle' is passed, toggle the current state
				if (state === 'toggle') {
					state = !(this.rendered ? this.tooltip.hasClass(CLASS_DISABLED) : this.disabled);
				}

				// Disable if no state passed
				else if ('boolean' !== typeof state) {
						state = TRUE;
					}

				if (this.rendered) {
					this.tooltip.toggleClass(CLASS_DISABLED, state).attr('aria-disabled', state);
				}

				this.disabled = !!state;

				return this;
			};

			PROTOTYPE.enable = function () {
				return this.disable(FALSE);
			};
			;PROTOTYPE._createButton = function () {
				var self = this,
				    elements = this.elements,
				    tooltip = elements.tooltip,
				    button = this.options.content.button,
				    isString = typeof button === 'string',
				    close = isString ? button : 'Close tooltip';

				if (elements.button) {
					elements.button.remove();
				}

				// Use custom button if one was supplied by user, else use default
				if (button.jquery) {
					elements.button = button;
				} else {
					elements.button = $('<a />', {
						'class': 'qtip-close ' + (this.options.style.widget ? '' : NAMESPACE + '-icon'),
						'title': close,
						'aria-label': close
					}).prepend($('<span />', {
						'class': 'ui-icon ui-icon-close',
						'html': '&times;'
					}));
				}

				// Create button and setup attributes
				elements.button.appendTo(elements.titlebar || tooltip).attr('role', 'button').click(function (event) {
					if (!tooltip.hasClass(CLASS_DISABLED)) {
						self.hide(event);
					}
					return FALSE;
				});
			};

			PROTOTYPE._updateButton = function (button) {
				// Make sure tooltip is rendered and if not, return
				if (!this.rendered) {
					return FALSE;
				}

				var elem = this.elements.button;
				if (button) {
					this._createButton();
				} else {
					elem.remove();
				}
			};
			; // Widget class creator
			function createWidgetClass(cls) {
				return WIDGET.concat('').join(cls ? '-' + cls + ' ' : ' ');
			}

			// Widget class setter method
			PROTOTYPE._setWidget = function () {
				var on = this.options.style.widget,
				    elements = this.elements,
				    tooltip = elements.tooltip,
				    disabled = tooltip.hasClass(CLASS_DISABLED);

				tooltip.removeClass(CLASS_DISABLED);
				CLASS_DISABLED = on ? 'ui-state-disabled' : 'qtip-disabled';
				tooltip.toggleClass(CLASS_DISABLED, disabled);

				tooltip.toggleClass('ui-helper-reset ' + createWidgetClass(), on).toggleClass(CLASS_DEFAULT, this.options.style.def && !on);

				if (elements.content) {
					elements.content.toggleClass(createWidgetClass('content'), on);
				}
				if (elements.titlebar) {
					elements.titlebar.toggleClass(createWidgetClass('header'), on);
				}
				if (elements.button) {
					elements.button.toggleClass(NAMESPACE + '-icon', !on);
				}
			};
			;function delay(callback, duration) {
				// If tooltip has displayed, start hide timer
				if (duration > 0) {
					return setTimeout($.proxy(callback, this), duration);
				} else {
					callback.call(this);
				}
			}

			function showMethod(event) {
				if (this.tooltip.hasClass(CLASS_DISABLED)) {
					return;
				}

				// Clear hide timers
				clearTimeout(this.timers.show);
				clearTimeout(this.timers.hide);

				// Start show timer
				this.timers.show = delay.call(this, function () {
					this.toggle(TRUE, event);
				}, this.options.show.delay);
			}

			function hideMethod(event) {
				if (this.tooltip.hasClass(CLASS_DISABLED) || this.destroyed) {
					return;
				}

				// Check if new target was actually the tooltip element
				var relatedTarget = $(event.relatedTarget),
				    ontoTooltip = relatedTarget.closest(SELECTOR)[0] === this.tooltip[0],
				    ontoTarget = relatedTarget[0] === this.options.show.target[0];

				// Clear timers and stop animation queue
				clearTimeout(this.timers.show);
				clearTimeout(this.timers.hide);

				// Prevent hiding if tooltip is fixed and event target is the tooltip.
				// Or if mouse positioning is enabled and cursor momentarily overlaps
				if (this !== relatedTarget[0] && this.options.position.target === 'mouse' && ontoTooltip || this.options.hide.fixed && /mouse(out|leave|move)/.test(event.type) && (ontoTooltip || ontoTarget)) {
					/* eslint-disable no-empty */
					try {
						event.preventDefault();
						event.stopImmediatePropagation();
					} catch (e) {}
					/* eslint-enable no-empty */

					return;
				}

				// If tooltip has displayed, start hide timer
				this.timers.hide = delay.call(this, function () {
					this.toggle(FALSE, event);
				}, this.options.hide.delay, this);
			}

			function inactiveMethod(event) {
				if (this.tooltip.hasClass(CLASS_DISABLED) || !this.options.hide.inactive) {
					return;
				}

				// Clear timer
				clearTimeout(this.timers.inactive);

				this.timers.inactive = delay.call(this, function () {
					this.hide(event);
				}, this.options.hide.inactive);
			}

			function repositionMethod(event) {
				if (this.rendered && this.tooltip[0].offsetWidth > 0) {
					this.reposition(event);
				}
			}

			// Store mouse coordinates
			PROTOTYPE._storeMouse = function (event) {
				(this.mouse = $.event.fix(event)).type = 'mousemove';
				return this;
			};

			// Bind events
			PROTOTYPE._bind = function (targets, events, method, suffix, context) {
				if (!targets || !method || !events.length) {
					return;
				}
				var ns = '.' + this._id + (suffix ? '-' + suffix : '');
				$(targets).bind((events.split ? events : events.join(ns + ' ')) + ns, $.proxy(method, context || this));
				return this;
			};
			PROTOTYPE._unbind = function (targets, suffix) {
				targets && $(targets).unbind('.' + this._id + (suffix ? '-' + suffix : ''));
				return this;
			};

			// Global delegation helper
			function delegate(selector, events, method) {
				$(document.body).delegate(selector, (events.split ? events : events.join('.' + NAMESPACE + ' ')) + '.' + NAMESPACE, function () {
					var api = QTIP.api[$.attr(this, ATTR_ID)];
					api && !api.disabled && method.apply(api, arguments);
				});
			}
			// Event trigger
			PROTOTYPE._trigger = function (type, args, event) {
				var callback = new $.Event('tooltip' + type);
				callback.originalEvent = event && $.extend({}, event) || this.cache.event || NULL;

				this.triggering = type;
				this.tooltip.trigger(callback, [this].concat(args || []));
				this.triggering = FALSE;

				return !callback.isDefaultPrevented();
			};

			PROTOTYPE._bindEvents = function (showEvents, hideEvents, showTargets, hideTargets, showCallback, hideCallback) {
				// Get tasrgets that lye within both
				var similarTargets = showTargets.filter(hideTargets).add(hideTargets.filter(showTargets)),
				    toggleEvents = [];

				// If hide and show targets are the same...
				if (similarTargets.length) {

					// Filter identical show/hide events
					$.each(hideEvents, function (i, type) {
						var showIndex = $.inArray(type, showEvents);

						// Both events are identical, remove from both hide and show events
						// and append to toggleEvents
						showIndex > -1 && toggleEvents.push(showEvents.splice(showIndex, 1)[0]);
					});

					// Toggle events are special case of identical show/hide events, which happen in sequence
					if (toggleEvents.length) {
						// Bind toggle events to the similar targets
						this._bind(similarTargets, toggleEvents, function (event) {
							var state = this.rendered ? this.tooltip[0].offsetWidth > 0 : false;
							(state ? hideCallback : showCallback).call(this, event);
						});

						// Remove the similar targets from the regular show/hide bindings
						showTargets = showTargets.not(similarTargets);
						hideTargets = hideTargets.not(similarTargets);
					}
				}

				// Apply show/hide/toggle events
				this._bind(showTargets, showEvents, showCallback);
				this._bind(hideTargets, hideEvents, hideCallback);
			};

			PROTOTYPE._assignInitialEvents = function (event) {
				var options = this.options,
				    showTarget = options.show.target,
				    hideTarget = options.hide.target,
				    showEvents = options.show.event ? $.trim('' + options.show.event).split(' ') : [],
				    hideEvents = options.hide.event ? $.trim('' + options.hide.event).split(' ') : [];

				// Catch remove/removeqtip events on target element to destroy redundant tooltips
				this._bind(this.elements.target, ['remove', 'removeqtip'], function () {
					this.destroy(true);
				}, 'destroy');

				/*
	    * Make sure hoverIntent functions properly by using mouseleave as a hide event if
	    * mouseenter/mouseout is used for show.event, even if it isn't in the users options.
	    */
				if (/mouse(over|enter)/i.test(options.show.event) && !/mouse(out|leave)/i.test(options.hide.event)) {
					hideEvents.push('mouseleave');
				}

				/*
	    * Also make sure initial mouse targetting works correctly by caching mousemove coords
	    * on show targets before the tooltip has rendered. Also set onTarget when triggered to
	    * keep mouse tracking working.
	    */
				this._bind(showTarget, 'mousemove', function (moveEvent) {
					this._storeMouse(moveEvent);
					this.cache.onTarget = TRUE;
				});

				// Define hoverIntent function
				function hoverIntent(hoverEvent) {
					// Only continue if tooltip isn't disabled
					if (this.disabled || this.destroyed) {
						return FALSE;
					}

					// Cache the event data
					this.cache.event = hoverEvent && $.event.fix(hoverEvent);
					this.cache.target = hoverEvent && $(hoverEvent.target);

					// Start the event sequence
					clearTimeout(this.timers.show);
					this.timers.show = delay.call(this, function () {
						this.render((typeof hoverEvent === 'undefined' ? 'undefined' : _typeof(hoverEvent)) === 'object' || options.show.ready);
					}, options.prerender ? 0 : options.show.delay);
				}

				// Filter and bind events
				this._bindEvents(showEvents, hideEvents, showTarget, hideTarget, hoverIntent, function () {
					if (!this.timers) {
						return FALSE;
					}
					clearTimeout(this.timers.show);
				});

				// Prerendering is enabled, create tooltip now
				if (options.show.ready || options.prerender) {
					hoverIntent.call(this, event);
				}
			};

			// Event assignment method
			PROTOTYPE._assignEvents = function () {
				var self = this,
				    options = this.options,
				    posOptions = options.position,
				    tooltip = this.tooltip,
				    showTarget = options.show.target,
				    hideTarget = options.hide.target,
				    containerTarget = posOptions.container,
				    viewportTarget = posOptions.viewport,
				    documentTarget = $(document),
				    windowTarget = $(window),
				    showEvents = options.show.event ? $.trim('' + options.show.event).split(' ') : [],
				    hideEvents = options.hide.event ? $.trim('' + options.hide.event).split(' ') : [];

				// Assign passed event callbacks
				$.each(options.events, function (name, callback) {
					self._bind(tooltip, name === 'toggle' ? ['tooltipshow', 'tooltiphide'] : ['tooltip' + name], callback, null, tooltip);
				});

				// Hide tooltips when leaving current window/frame (but not select/option elements)
				if (/mouse(out|leave)/i.test(options.hide.event) && options.hide.leave === 'window') {
					this._bind(documentTarget, ['mouseout', 'blur'], function (event) {
						if (!/select|option/.test(event.target.nodeName) && !event.relatedTarget) {
							this.hide(event);
						}
					});
				}

				// Enable hide.fixed by adding appropriate class
				if (options.hide.fixed) {
					hideTarget = hideTarget.add(tooltip.addClass(CLASS_FIXED));
				}

				/*
	    * Make sure hoverIntent functions properly by using mouseleave to clear show timer if
	    * mouseenter/mouseout is used for show.event, even if it isn't in the users options.
	    */
				else if (/mouse(over|enter)/i.test(options.show.event)) {
						this._bind(hideTarget, 'mouseleave', function () {
							clearTimeout(this.timers.show);
						});
					}

				// Hide tooltip on document mousedown if unfocus events are enabled
				if (('' + options.hide.event).indexOf('unfocus') > -1) {
					this._bind(containerTarget.closest('html'), ['mousedown', 'touchstart'], function (event) {
						var elem = $(event.target),
						    enabled = this.rendered && !this.tooltip.hasClass(CLASS_DISABLED) && this.tooltip[0].offsetWidth > 0,
						    isAncestor = elem.parents(SELECTOR).filter(this.tooltip[0]).length > 0;

						if (elem[0] !== this.target[0] && elem[0] !== this.tooltip[0] && !isAncestor && !this.target.has(elem[0]).length && enabled) {
							this.hide(event);
						}
					});
				}

				// Check if the tooltip hides when inactive
				if ('number' === typeof options.hide.inactive) {
					// Bind inactive method to show target(s) as a custom event
					this._bind(showTarget, 'qtip-' + this.id + '-inactive', inactiveMethod, 'inactive');

					// Define events which reset the 'inactive' event handler
					this._bind(hideTarget.add(tooltip), QTIP.inactiveEvents, inactiveMethod);
				}

				// Filter and bind events
				this._bindEvents(showEvents, hideEvents, showTarget, hideTarget, showMethod, hideMethod);

				// Mouse movement bindings
				this._bind(showTarget.add(tooltip), 'mousemove', function (event) {
					// Check if the tooltip hides when mouse is moved a certain distance
					if ('number' === typeof options.hide.distance) {
						var origin = this.cache.origin || {},
						    limit = this.options.hide.distance,
						    abs = Math.abs;

						// Check if the movement has gone beyond the limit, and hide it if so
						if (abs(event.pageX - origin.pageX) >= limit || abs(event.pageY - origin.pageY) >= limit) {
							this.hide(event);
						}
					}

					// Cache mousemove coords on show targets
					this._storeMouse(event);
				});

				// Mouse positioning events
				if (posOptions.target === 'mouse') {
					// If mouse adjustment is on...
					if (posOptions.adjust.mouse) {
						// Apply a mouseleave event so we don't get problems with overlapping
						if (options.hide.event) {
							// Track if we're on the target or not
							this._bind(showTarget, ['mouseenter', 'mouseleave'], function (event) {
								if (!this.cache) {
									return FALSE;
								}
								this.cache.onTarget = event.type === 'mouseenter';
							});
						}

						// Update tooltip position on mousemove
						this._bind(documentTarget, 'mousemove', function (event) {
							// Update the tooltip position only if the tooltip is visible and adjustment is enabled
							if (this.rendered && this.cache.onTarget && !this.tooltip.hasClass(CLASS_DISABLED) && this.tooltip[0].offsetWidth > 0) {
								this.reposition(event);
							}
						});
					}
				}

				// Adjust positions of the tooltip on window resize if enabled
				if (posOptions.adjust.resize || viewportTarget.length) {
					this._bind($.event.special.resize ? viewportTarget : windowTarget, 'resize', repositionMethod);
				}

				// Adjust tooltip position on scroll of the window or viewport element if present
				if (posOptions.adjust.scroll) {
					this._bind(windowTarget.add(posOptions.container), 'scroll', repositionMethod);
				}
			};

			// Un-assignment method
			PROTOTYPE._unassignEvents = function () {
				var options = this.options,
				    showTargets = options.show.target,
				    hideTargets = options.hide.target,
				    targets = $.grep([this.elements.target[0], this.rendered && this.tooltip[0], options.position.container[0], options.position.viewport[0], options.position.container.closest('html')[0], // unfocus
				window, document], function (i) {
					return (typeof i === 'undefined' ? 'undefined' : _typeof(i)) === 'object';
				});

				// Add show and hide targets if they're valid
				if (showTargets && showTargets.toArray) {
					targets = targets.concat(showTargets.toArray());
				}
				if (hideTargets && hideTargets.toArray) {
					targets = targets.concat(hideTargets.toArray());
				}

				// Unbind the events
				this._unbind(targets)._unbind(targets, 'destroy')._unbind(targets, 'inactive');
			};

			// Apply common event handlers using delegate (avoids excessive .bind calls!)
			$(function () {
				delegate(SELECTOR, ['mouseenter', 'mouseleave'], function (event) {
					var state = event.type === 'mouseenter',
					    tooltip = $(event.currentTarget),
					    target = $(event.relatedTarget || event.target),
					    options = this.options;

					// On mouseenter...
					if (state) {
						// Focus the tooltip on mouseenter (z-index stacking)
						this.focus(event);

						// Clear hide timer on tooltip hover to prevent it from closing
						tooltip.hasClass(CLASS_FIXED) && !tooltip.hasClass(CLASS_DISABLED) && clearTimeout(this.timers.hide);
					}

					// On mouseleave...
					else {
							// When mouse tracking is enabled, hide when we leave the tooltip and not onto the show target (if a hide event is set)
							if (options.position.target === 'mouse' && options.position.adjust.mouse && options.hide.event && options.show.target && !target.closest(options.show.target[0]).length) {
								this.hide(event);
							}
						}

					// Add hover class
					tooltip.toggleClass(CLASS_HOVER, state);
				});

				// Define events which reset the 'inactive' event handler
				delegate('[' + ATTR_ID + ']', INACTIVE_EVENTS, inactiveMethod);
			});
			; // Initialization method
			function init(elem, id, opts) {
				var obj,
				    posOptions,
				    attr,
				    config,
				    title,


				// Setup element references
				docBody = $(document.body),


				// Use document body instead of document element if needed
				newTarget = elem[0] === document ? docBody : elem,


				// Grab metadata from element if plugin is present
				metadata = elem.metadata ? elem.metadata(opts.metadata) : NULL,


				// If metadata type if HTML5, grab 'name' from the object instead, or use the regular data object otherwise
				metadata5 = opts.metadata.type === 'html5' && metadata ? metadata[opts.metadata.name] : NULL,


				// Grab data from metadata.name (or data-qtipopts as fallback) using .data() method,
				html5 = elem.data(opts.metadata.name || 'qtipopts');

				// If we don't get an object returned attempt to parse it manualyl without parseJSON
				/* eslint-disable no-empty */
				try {
					html5 = typeof html5 === 'string' ? $.parseJSON(html5) : html5;
				} catch (e) {}
				/* eslint-enable no-empty */

				// Merge in and sanitize metadata
				config = $.extend(TRUE, {}, QTIP.defaults, opts, (typeof html5 === 'undefined' ? 'undefined' : _typeof(html5)) === 'object' ? sanitizeOptions(html5) : NULL, sanitizeOptions(metadata5 || metadata));

				// Re-grab our positioning options now we've merged our metadata and set id to passed value
				posOptions = config.position;
				config.id = id;

				// Setup missing content if none is detected
				if ('boolean' === typeof config.content.text) {
					attr = elem.attr(config.content.attr);

					// Grab from supplied attribute if available
					if (config.content.attr !== FALSE && attr) {
						config.content.text = attr;
					}

					// No valid content was found, abort render
					else {
							return FALSE;
						}
				}

				// Setup target options
				if (!posOptions.container.length) {
					posOptions.container = docBody;
				}
				if (posOptions.target === FALSE) {
					posOptions.target = newTarget;
				}
				if (config.show.target === FALSE) {
					config.show.target = newTarget;
				}
				if (config.show.solo === TRUE) {
					config.show.solo = posOptions.container.closest('body');
				}
				if (config.hide.target === FALSE) {
					config.hide.target = newTarget;
				}
				if (config.position.viewport === TRUE) {
					config.position.viewport = posOptions.container;
				}

				// Ensure we only use a single container
				posOptions.container = posOptions.container.eq(0);

				// Convert position corner values into x and y strings
				posOptions.at = new CORNER(posOptions.at, TRUE);
				posOptions.my = new CORNER(posOptions.my);

				// Destroy previous tooltip if overwrite is enabled, or skip element if not
				if (elem.data(NAMESPACE)) {
					if (config.overwrite) {
						elem.qtip('destroy', true);
					} else if (config.overwrite === FALSE) {
						return FALSE;
					}
				}

				// Add has-qtip attribute
				elem.attr(ATTR_HAS, id);

				// Remove title attribute and store it if present
				if (config.suppress && (title = elem.attr('title'))) {
					// Final attr call fixes event delegatiom and IE default tooltip showing problem
					elem.removeAttr('title').attr(oldtitle, title).attr('title', '');
				}

				// Initialize the tooltip and add API reference
				obj = new QTip(elem, config, id, !!attr);
				elem.data(NAMESPACE, obj);

				return obj;
			}

			// jQuery $.fn extension method
			QTIP = $.fn.qtip = function (options, notation, newValue) {
				var command = ('' + options).toLowerCase(),
				    // Parse command
				returned = NULL,
				    args = $.makeArray(arguments).slice(1),
				    event = args[args.length - 1],
				    opts = this[0] ? $.data(this[0], NAMESPACE) : NULL;

				// Check for API request
				if (!arguments.length && opts || command === 'api') {
					return opts;
				}

				// Execute API command if present
				else if ('string' === typeof options) {
						this.each(function () {
							var api = $.data(this, NAMESPACE);
							if (!api) {
								return TRUE;
							}

							// Cache the event if possible
							if (event && event.timeStamp) {
								api.cache.event = event;
							}

							// Check for specific API commands
							if (notation && (command === 'option' || command === 'options')) {
								if (newValue !== undefined || $.isPlainObject(notation)) {
									api.set(notation, newValue);
								} else {
									returned = api.get(notation);
									return FALSE;
								}
							}

							// Execute API command
							else if (api[command]) {
									api[command].apply(api, args);
								}
						});

						return returned !== NULL ? returned : this;
					}

					// No API commands. validate provided options and setup qTips
					else if ('object' === (typeof options === 'undefined' ? 'undefined' : _typeof(options)) || !arguments.length) {
							// Sanitize options first
							opts = sanitizeOptions($.extend(TRUE, {}, options));

							return this.each(function (i) {
								var api, id;

								// Find next available ID, or use custom ID if provided
								id = $.isArray(opts.id) ? opts.id[i] : opts.id;
								id = !id || id === FALSE || id.length < 1 || QTIP.api[id] ? QTIP.nextid++ : id;

								// Initialize the qTip and re-grab newly sanitized options
								api = init($(this), id, opts);
								if (api === FALSE) {
									return TRUE;
								} else {
									QTIP.api[id] = api;
								}

								// Initialize plugins
								$.each(PLUGINS, function () {
									if (this.initialize === 'initialize') {
										this(api);
									}
								});

								// Assign initial pre-render events
								api._assignInitialEvents(event);
							});
						}
			};

			// Expose class
			$.qtip = QTip;

			// Populated in render method
			QTIP.api = {};
			;$.each({
				/* Allow other plugins to successfully retrieve the title of an element with a qTip applied */
				attr: function attr(_attr, val) {
					if (this.length) {
						var self = this[0],
						    title = 'title',
						    api = $.data(self, 'qtip');

						if (_attr === title && api && api.options && 'object' === (typeof api === 'undefined' ? 'undefined' : _typeof(api)) && 'object' === _typeof(api.options) && api.options.suppress) {
							if (arguments.length < 2) {
								return $.attr(self, oldtitle);
							}

							// If qTip is rendered and title was originally used as content, update it
							if (api && api.options.content.attr === title && api.cache.attr) {
								api.set('content.text', val);
							}

							// Use the regular attr method to set, then cache the result
							return this.attr(oldtitle, val);
						}
					}

					return $.fn['attr' + replaceSuffix].apply(this, arguments);
				},

				/* Allow clone to correctly retrieve cached title attributes */
				clone: function clone(keepData) {
					// Clone our element using the real clone method
					var elems = $.fn['clone' + replaceSuffix].apply(this, arguments);

					// Grab all elements with an oldtitle set, and change it to regular title attribute, if keepData is false
					if (!keepData) {
						elems.filter('[' + oldtitle + ']').attr('title', function () {
							return $.attr(this, oldtitle);
						}).removeAttr(oldtitle);
					}

					return elems;
				}
			}, function (name, func) {
				if (!func || $.fn[name + replaceSuffix]) {
					return TRUE;
				}

				var old = $.fn[name + replaceSuffix] = $.fn[name];
				$.fn[name] = function () {
					return func.apply(this, arguments) || old.apply(this, arguments);
				};
			});

			/* Fire off 'removeqtip' handler in $.cleanData if jQuery UI not present (it already does similar).
	   * This snippet is taken directly from jQuery UI source code found here:
	   *     http://code.jquery.com/ui/jquery-ui-git.js
	   */
			if (!$.ui) {
				$['cleanData' + replaceSuffix] = $.cleanData;
				$.cleanData = function (elems) {
					for (var i = 0, elem; (elem = $(elems[i])).length; i++) {
						if (elem.attr(ATTR_HAS)) {
							/* eslint-disable no-empty */
							try {
								elem.triggerHandler('removeqtip');
							} catch (e) {}
							/* eslint-enable no-empty */
						}
					}
					$['cleanData' + replaceSuffix].apply(this, arguments);
				};
			}
			; // qTip version
			QTIP.version = '3.0.3';

			// Base ID for all qTips
			QTIP.nextid = 0;

			// Inactive events array
			QTIP.inactiveEvents = INACTIVE_EVENTS;

			// Base z-index for all qTips
			QTIP.zindex = 15000;

			// Define configuration defaults
			QTIP.defaults = {
				prerender: FALSE,
				id: FALSE,
				overwrite: TRUE,
				suppress: TRUE,
				content: {
					text: TRUE,
					attr: 'title',
					title: FALSE,
					button: FALSE
				},
				position: {
					my: 'top left',
					at: 'bottom right',
					target: FALSE,
					container: FALSE,
					viewport: FALSE,
					adjust: {
						x: 0, y: 0,
						mouse: TRUE,
						scroll: TRUE,
						resize: TRUE,
						method: 'flipinvert flipinvert'
					},
					effect: function effect(api, pos) {
						$(this).animate(pos, {
							duration: 200,
							queue: FALSE
						});
					}
				},
				show: {
					target: FALSE,
					event: 'mouseenter',
					effect: TRUE,
					delay: 90,
					solo: FALSE,
					ready: FALSE,
					autofocus: FALSE
				},
				hide: {
					target: FALSE,
					event: 'mouseleave',
					effect: TRUE,
					delay: 0,
					fixed: FALSE,
					inactive: FALSE,
					leave: 'window',
					distance: FALSE
				},
				style: {
					classes: '',
					widget: FALSE,
					width: FALSE,
					height: FALSE,
					def: TRUE
				},
				events: {
					render: NULL,
					move: NULL,
					show: NULL,
					hide: NULL,
					toggle: NULL,
					visible: NULL,
					hidden: NULL,
					focus: NULL,
					blur: NULL
				}
			};
			;var TIP,
			    createVML,
			    SCALE,
			    PIXEL_RATIO,
			    BACKING_STORE_RATIO,


			// Common CSS strings
			MARGIN = 'margin',
			    BORDER = 'border',
			    COLOR = 'color',
			    BG_COLOR = 'background-color',
			    TRANSPARENT = 'transparent',
			    IMPORTANT = ' !important',


			// Check if the browser supports <canvas/> elements
			HASCANVAS = !!document.createElement('canvas').getContext,


			// Invalid colour values used in parseColours()
			INVALID = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i;

			// Camel-case method, taken from jQuery source
			// http://code.jquery.com/jquery-1.8.0.js
			function camel(s) {
				return s.charAt(0).toUpperCase() + s.slice(1);
			}

			/*
	   * Modified from Modernizr's testPropsAll()
	   * http://modernizr.com/downloads/modernizr-latest.js
	   */
			var cssProps = {},
			    cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'];
			function vendorCss(elem, prop) {
				var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
				    props = (prop + ' ' + cssPrefixes.join(ucProp + ' ') + ucProp).split(' '),
				    cur,
				    val,
				    i = 0;

				// If the property has already been mapped...
				if (cssProps[prop]) {
					return elem.css(cssProps[prop]);
				}

				while (cur = props[i++]) {
					if ((val = elem.css(cur)) !== undefined) {
						cssProps[prop] = cur;
						return val;
					}
				}
			}

			// Parse a given elements CSS property into an int
			function intCss(elem, prop) {
				return Math.ceil(parseFloat(vendorCss(elem, prop)));
			}

			// VML creation (for IE only)
			if (!HASCANVAS) {
				createVML = function createVML(tag, props, style) {
					return '<qtipvml:' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (props || '') + ' style="behavior: url(#default#VML); ' + (style || '') + '" />';
				};
			}

			// Canvas only definitions
			else {
					PIXEL_RATIO = window.devicePixelRatio || 1;
					BACKING_STORE_RATIO = function () {
						var context = document.createElement('canvas').getContext('2d');
						return context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || 1;
					}();
					SCALE = PIXEL_RATIO / BACKING_STORE_RATIO;
				}

			function Tip(qtip, options) {
				this._ns = 'tip';
				this.options = options;
				this.offset = options.offset;
				this.size = [options.width, options.height];

				// Initialize
				this.qtip = qtip;
				this.init(qtip);
			}

			$.extend(Tip.prototype, {
				init: function init(qtip) {
					var context, tip;

					// Create tip element and prepend to the tooltip
					tip = this.element = qtip.elements.tip = $('<div />', { 'class': NAMESPACE + '-tip' }).prependTo(qtip.tooltip);

					// Create tip drawing element(s)
					if (HASCANVAS) {
						// save() as soon as we create the canvas element so FF2 doesn't bork on our first restore()!
						context = $('<canvas />').appendTo(this.element)[0].getContext('2d');

						// Setup constant parameters
						context.lineJoin = 'miter';
						context.miterLimit = 100000;
						context.save();
					} else {
						context = createVML('shape', 'coordorigin="0,0"', 'position:absolute;');
						this.element.html(context + context);

						// Prevent mousing down on the tip since it causes problems with .live() handling in IE due to VML
						qtip._bind($('*', tip).add(tip), ['click', 'mousedown'], function (event) {
							event.stopPropagation();
						}, this._ns);
					}

					// Bind update events
					qtip._bind(qtip.tooltip, 'tooltipmove', this.reposition, this._ns, this);

					// Create it
					this.create();
				},

				_swapDimensions: function _swapDimensions() {
					this.size[0] = this.options.height;
					this.size[1] = this.options.width;
				},
				_resetDimensions: function _resetDimensions() {
					this.size[0] = this.options.width;
					this.size[1] = this.options.height;
				},

				_useTitle: function _useTitle(corner) {
					var titlebar = this.qtip.elements.titlebar;
					return titlebar && (corner.y === TOP || corner.y === CENTER && this.element.position().top + this.size[1] / 2 + this.options.offset < titlebar.outerHeight(TRUE));
				},

				_parseCorner: function _parseCorner(corner) {
					var my = this.qtip.options.position.my;

					// Detect corner and mimic properties
					if (corner === FALSE || my === FALSE) {
						corner = FALSE;
					} else if (corner === TRUE) {
						corner = new CORNER(my.string());
					} else if (!corner.string) {
						corner = new CORNER(corner);
						corner.fixed = TRUE;
					}

					return corner;
				},

				_parseWidth: function _parseWidth(corner, side, use) {
					var elements = this.qtip.elements,
					    prop = BORDER + camel(side) + 'Width';

					return (use ? intCss(use, prop) : intCss(elements.content, prop) || intCss(this._useTitle(corner) && elements.titlebar || elements.content, prop) || intCss(elements.tooltip, prop)) || 0;
				},

				_parseRadius: function _parseRadius(corner) {
					var elements = this.qtip.elements,
					    prop = BORDER + camel(corner.y) + camel(corner.x) + 'Radius';

					return BROWSER.ie < 9 ? 0 : intCss(this._useTitle(corner) && elements.titlebar || elements.content, prop) || intCss(elements.tooltip, prop) || 0;
				},

				_invalidColour: function _invalidColour(elem, prop, compare) {
					var val = elem.css(prop);
					return !val || compare && val === elem.css(compare) || INVALID.test(val) ? FALSE : val;
				},

				_parseColours: function _parseColours(corner) {
					var elements = this.qtip.elements,
					    tip = this.element.css('cssText', ''),
					    borderSide = BORDER + camel(corner[corner.precedance]) + camel(COLOR),
					    colorElem = this._useTitle(corner) && elements.titlebar || elements.content,
					    css = this._invalidColour,
					    color = [];

					// Attempt to detect the background colour from various elements, left-to-right precedance
					color[0] = css(tip, BG_COLOR) || css(colorElem, BG_COLOR) || css(elements.content, BG_COLOR) || css(elements.tooltip, BG_COLOR) || tip.css(BG_COLOR);

					// Attempt to detect the correct border side colour from various elements, left-to-right precedance
					color[1] = css(tip, borderSide, COLOR) || css(colorElem, borderSide, COLOR) || css(elements.content, borderSide, COLOR) || css(elements.tooltip, borderSide, COLOR) || elements.tooltip.css(borderSide);

					// Reset background and border colours
					$('*', tip).add(tip).css('cssText', BG_COLOR + ':' + TRANSPARENT + IMPORTANT + ';' + BORDER + ':0' + IMPORTANT + ';');

					return color;
				},

				_calculateSize: function _calculateSize(corner) {
					var y = corner.precedance === Y,
					    width = this.options.width,
					    height = this.options.height,
					    isCenter = corner.abbrev() === 'c',
					    base = (y ? width : height) * (isCenter ? 0.5 : 1),
					    pow = Math.pow,
					    round = Math.round,
					    bigHyp,
					    ratio,
					    result,
					    smallHyp = Math.sqrt(pow(base, 2) + pow(height, 2)),
					    hyp = [this.border / base * smallHyp, this.border / height * smallHyp];

					hyp[2] = Math.sqrt(pow(hyp[0], 2) - pow(this.border, 2));
					hyp[3] = Math.sqrt(pow(hyp[1], 2) - pow(this.border, 2));

					bigHyp = smallHyp + hyp[2] + hyp[3] + (isCenter ? 0 : hyp[0]);
					ratio = bigHyp / smallHyp;

					result = [round(ratio * width), round(ratio * height)];
					return y ? result : result.reverse();
				},

				// Tip coordinates calculator
				_calculateTip: function _calculateTip(corner, size, scale) {
					scale = scale || 1;
					size = size || this.size;

					var width = size[0] * scale,
					    height = size[1] * scale,
					    width2 = Math.ceil(width / 2),
					    height2 = Math.ceil(height / 2),


					// Define tip coordinates in terms of height and width values
					tips = {
						br: [0, 0, width, height, width, 0],
						bl: [0, 0, width, 0, 0, height],
						tr: [0, height, width, 0, width, height],
						tl: [0, 0, 0, height, width, height],
						tc: [0, height, width2, 0, width, height],
						bc: [0, 0, width, 0, width2, height],
						rc: [0, 0, width, height2, 0, height],
						lc: [width, 0, width, height, 0, height2]
					};

					// Set common side shapes
					tips.lt = tips.br;tips.rt = tips.bl;
					tips.lb = tips.tr;tips.rb = tips.tl;

					return tips[corner.abbrev()];
				},

				// Tip coordinates drawer (canvas)
				_drawCoords: function _drawCoords(context, coords) {
					context.beginPath();
					context.moveTo(coords[0], coords[1]);
					context.lineTo(coords[2], coords[3]);
					context.lineTo(coords[4], coords[5]);
					context.closePath();
				},

				create: function create() {
					// Determine tip corner
					var c = this.corner = (HASCANVAS || BROWSER.ie) && this._parseCorner(this.options.corner);

					// If we have a tip corner...
					this.enabled = !!this.corner && this.corner.abbrev() !== 'c';
					if (this.enabled) {
						// Cache it
						this.qtip.cache.corner = c.clone();

						// Create it
						this.update();
					}

					// Toggle tip element
					this.element.toggle(this.enabled);

					return this.corner;
				},

				update: function update(corner, position) {
					if (!this.enabled) {
						return this;
					}

					var elements = this.qtip.elements,
					    tip = this.element,
					    inner = tip.children(),
					    options = this.options,
					    curSize = this.size,
					    mimic = options.mimic,
					    round = Math.round,
					    color,
					    precedance,
					    context,
					    coords,
					    bigCoords,
					    translate,
					    newSize,
					    border;

					// Re-determine tip if not already set
					if (!corner) {
						corner = this.qtip.cache.corner || this.corner;
					}

					// Use corner property if we detect an invalid mimic value
					if (mimic === FALSE) {
						mimic = corner;
					}

					// Otherwise inherit mimic properties from the corner object as necessary
					else {
							mimic = new CORNER(mimic);
							mimic.precedance = corner.precedance;

							if (mimic.x === 'inherit') {
								mimic.x = corner.x;
							} else if (mimic.y === 'inherit') {
								mimic.y = corner.y;
							} else if (mimic.x === mimic.y) {
								mimic[corner.precedance] = corner[corner.precedance];
							}
						}
					precedance = mimic.precedance;

					// Ensure the tip width.height are relative to the tip position
					if (corner.precedance === X) {
						this._swapDimensions();
					} else {
						this._resetDimensions();
					}

					// Update our colours
					color = this.color = this._parseColours(corner);

					// Detect border width, taking into account colours
					if (color[1] !== TRANSPARENT) {
						// Grab border width
						border = this.border = this._parseWidth(corner, corner[corner.precedance]);

						// If border width isn't zero, use border color as fill if it's not invalid (1.0 style tips)
						if (options.border && border < 1 && !INVALID.test(color[1])) {
							color[0] = color[1];
						}

						// Set border width (use detected border width if options.border is true)
						this.border = border = options.border !== TRUE ? options.border : border;
					}

					// Border colour was invalid, set border to zero
					else {
							this.border = border = 0;
						}

					// Determine tip size
					newSize = this.size = this._calculateSize(corner);
					tip.css({
						width: newSize[0],
						height: newSize[1],
						lineHeight: newSize[1] + 'px'
					});

					// Calculate tip translation
					if (corner.precedance === Y) {
						translate = [round(mimic.x === LEFT ? border : mimic.x === RIGHT ? newSize[0] - curSize[0] - border : (newSize[0] - curSize[0]) / 2), round(mimic.y === TOP ? newSize[1] - curSize[1] : 0)];
					} else {
						translate = [round(mimic.x === LEFT ? newSize[0] - curSize[0] : 0), round(mimic.y === TOP ? border : mimic.y === BOTTOM ? newSize[1] - curSize[1] - border : (newSize[1] - curSize[1]) / 2)];
					}

					// Canvas drawing implementation
					if (HASCANVAS) {
						// Grab canvas context and clear/save it
						context = inner[0].getContext('2d');
						context.restore();context.save();
						context.clearRect(0, 0, 6000, 6000);

						// Calculate coordinates
						coords = this._calculateTip(mimic, curSize, SCALE);
						bigCoords = this._calculateTip(mimic, this.size, SCALE);

						// Set the canvas size using calculated size
						inner.attr(WIDTH, newSize[0] * SCALE).attr(HEIGHT, newSize[1] * SCALE);
						inner.css(WIDTH, newSize[0]).css(HEIGHT, newSize[1]);

						// Draw the outer-stroke tip
						this._drawCoords(context, bigCoords);
						context.fillStyle = color[1];
						context.fill();

						// Draw the actual tip
						context.translate(translate[0] * SCALE, translate[1] * SCALE);
						this._drawCoords(context, coords);
						context.fillStyle = color[0];
						context.fill();
					}

					// VML (IE Proprietary implementation)
					else {
							// Calculate coordinates
							coords = this._calculateTip(mimic);

							// Setup coordinates string
							coords = 'm' + coords[0] + ',' + coords[1] + ' l' + coords[2] + ',' + coords[3] + ' ' + coords[4] + ',' + coords[5] + ' xe';

							// Setup VML-specific offset for pixel-perfection
							translate[2] = border && /^(r|b)/i.test(corner.string()) ? BROWSER.ie === 8 ? 2 : 1 : 0;

							// Set initial CSS
							inner.css({
								coordsize: newSize[0] + border + ' ' + newSize[1] + border,
								antialias: '' + (mimic.string().indexOf(CENTER) > -1),
								left: translate[0] - translate[2] * Number(precedance === X),
								top: translate[1] - translate[2] * Number(precedance === Y),
								width: newSize[0] + border,
								height: newSize[1] + border
							}).each(function (i) {
								var $this = $(this);

								// Set shape specific attributes
								$this[$this.prop ? 'prop' : 'attr']({
									coordsize: newSize[0] + border + ' ' + newSize[1] + border,
									path: coords,
									fillcolor: color[0],
									filled: !!i,
									stroked: !i
								}).toggle(!!(border || i));

								// Check if border is enabled and add stroke element
								!i && $this.html(createVML('stroke', 'weight="' + border * 2 + 'px" color="' + color[1] + '" miterlimit="1000" joinstyle="miter"'));
							});
						}

					// Opera bug #357 - Incorrect tip position
					// https://github.com/Craga89/qTip2/issues/367
					window.opera && setTimeout(function () {
						elements.tip.css({
							display: 'inline-block',
							visibility: 'visible'
						});
					}, 1);

					// Position if needed
					if (position !== FALSE) {
						this.calculate(corner, newSize);
					}
				},

				calculate: function calculate(corner, size) {
					if (!this.enabled) {
						return FALSE;
					}

					var self = this,
					    elements = this.qtip.elements,
					    tip = this.element,
					    userOffset = this.options.offset,
					    position = {},
					    precedance,
					    corners;

					// Inherit corner if not provided
					corner = corner || this.corner;
					precedance = corner.precedance;

					// Determine which tip dimension to use for adjustment
					size = size || this._calculateSize(corner);

					// Setup corners and offset array
					corners = [corner.x, corner.y];
					if (precedance === X) {
						corners.reverse();
					}

					// Calculate tip position
					$.each(corners, function (i, side) {
						var b, bc, br;

						if (side === CENTER) {
							b = precedance === Y ? LEFT : TOP;
							position[b] = '50%';
							position[MARGIN + '-' + b] = -Math.round(size[precedance === Y ? 0 : 1] / 2) + userOffset;
						} else {
							b = self._parseWidth(corner, side, elements.tooltip);
							bc = self._parseWidth(corner, side, elements.content);
							br = self._parseRadius(corner);

							position[side] = Math.max(-self.border, i ? bc : userOffset + (br > b ? br : -b));
						}
					});

					// Adjust for tip size
					position[corner[precedance]] -= size[precedance === X ? 0 : 1];

					// Set and return new position
					tip.css({ margin: '', top: '', bottom: '', left: '', right: '' }).css(position);
					return position;
				},

				reposition: function reposition(event, api, pos) {
					if (!this.enabled) {
						return;
					}

					var cache = api.cache,
					    newCorner = this.corner.clone(),
					    adjust = pos.adjusted,
					    method = api.options.position.adjust.method.split(' '),
					    horizontal = method[0],
					    vertical = method[1] || method[0],
					    shift = { left: FALSE, top: FALSE, x: 0, y: 0 },
					    offset,
					    css = {},
					    props;

					function shiftflip(direction, precedance, popposite, side, opposite) {
						// Horizontal - Shift or flip method
						if (direction === SHIFT && newCorner.precedance === precedance && adjust[side] && newCorner[popposite] !== CENTER) {
							newCorner.precedance = newCorner.precedance === X ? Y : X;
						} else if (direction !== SHIFT && adjust[side]) {
							newCorner[precedance] = newCorner[precedance] === CENTER ? adjust[side] > 0 ? side : opposite : newCorner[precedance] === side ? opposite : side;
						}
					}

					function shiftonly(xy, side, opposite) {
						if (newCorner[xy] === CENTER) {
							css[MARGIN + '-' + side] = shift[xy] = offset[MARGIN + '-' + side] - adjust[side];
						} else {
							props = offset[opposite] !== undefined ? [adjust[side], -offset[side]] : [-adjust[side], offset[side]];

							if ((shift[xy] = Math.max(props[0], props[1])) > props[0]) {
								pos[side] -= adjust[side];
								shift[side] = FALSE;
							}

							css[offset[opposite] !== undefined ? opposite : side] = shift[xy];
						}
					}

					// If our tip position isn't fixed e.g. doesn't adjust with viewport...
					if (this.corner.fixed !== TRUE) {
						// Perform shift/flip adjustments
						shiftflip(horizontal, X, Y, LEFT, RIGHT);
						shiftflip(vertical, Y, X, TOP, BOTTOM);

						// Update and redraw the tip if needed (check cached details of last drawn tip)
						if (newCorner.string() !== cache.corner.string() || cache.cornerTop !== adjust.top || cache.cornerLeft !== adjust.left) {
							this.update(newCorner, FALSE);
						}
					}

					// Setup tip offset properties
					offset = this.calculate(newCorner);

					// Readjust offset object to make it left/top
					if (offset.right !== undefined) {
						offset.left = -offset.right;
					}
					if (offset.bottom !== undefined) {
						offset.top = -offset.bottom;
					}
					offset.user = this.offset;

					// Perform shift adjustments
					shift.left = horizontal === SHIFT && !!adjust.left;
					if (shift.left) {
						shiftonly(X, LEFT, RIGHT);
					}
					shift.top = vertical === SHIFT && !!adjust.top;
					if (shift.top) {
						shiftonly(Y, TOP, BOTTOM);
					}

					/*
	    * If the tip is adjusted in both dimensions, or in a
	    * direction that would cause it to be anywhere but the
	    * outer border, hide it!
	    */
					this.element.css(css).toggle(!(shift.x && shift.y || newCorner.x === CENTER && shift.y || newCorner.y === CENTER && shift.x));

					// Adjust position to accomodate tip dimensions
					pos.left -= offset.left.charAt ? offset.user : horizontal !== SHIFT || shift.top || !shift.left && !shift.top ? offset.left + this.border : 0;
					pos.top -= offset.top.charAt ? offset.user : vertical !== SHIFT || shift.left || !shift.left && !shift.top ? offset.top + this.border : 0;

					// Cache details
					cache.cornerLeft = adjust.left;cache.cornerTop = adjust.top;
					cache.corner = newCorner.clone();
				},

				destroy: function destroy() {
					// Unbind events
					this.qtip._unbind(this.qtip.tooltip, this._ns);

					// Remove the tip element(s)
					if (this.qtip.elements.tip) {
						this.qtip.elements.tip.find('*').remove().end().remove();
					}
				}
			});

			TIP = PLUGINS.tip = function (api) {
				return new Tip(api, api.options.style.tip);
			};

			// Initialize tip on render
			TIP.initialize = 'render';

			// Setup plugin sanitization options
			TIP.sanitize = function (options) {
				if (options.style && 'tip' in options.style) {
					var opts = options.style.tip;
					if ((typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object') {
						opts = options.style.tip = { corner: opts };
					}
					if (!/string|boolean/i.test(_typeof(opts.corner))) {
						opts.corner = TRUE;
					}
				}
			};

			// Add new option checks for the plugin
			CHECKS.tip = {
				'^position.my|style.tip.(corner|mimic|border)$': function positionMyStyleTipCornerMimicBorder$() {
					// Make sure a tip can be drawn
					this.create();

					// Reposition the tooltip
					this.qtip.reposition();
				},
				'^style.tip.(height|width)$': function styleTipHeightWidth$(obj) {
					// Re-set dimensions and redraw the tip
					this.size = [obj.width, obj.height];
					this.update();

					// Reposition the tooltip
					this.qtip.reposition();
				},
				'^content.title|style.(classes|widget)$': function contentTitleStyleClassesWidget$() {
					this.update();
				}
			};

			// Extend original qTip defaults
			$.extend(TRUE, QTIP.defaults, {
				style: {
					tip: {
						corner: TRUE,
						mimic: FALSE,
						width: 6,
						height: 6,
						border: TRUE,
						offset: 0
					}
				}
			});
			;PLUGINS.viewport = function (api, position, posOptions, targetWidth, targetHeight, elemWidth, elemHeight) {
				var target = posOptions.target,
				    tooltip = api.elements.tooltip,
				    my = posOptions.my,
				    at = posOptions.at,
				    adjust = posOptions.adjust,
				    method = adjust.method.split(' '),
				    methodX = method[0],
				    methodY = method[1] || method[0],
				    viewport = posOptions.viewport,
				    container = posOptions.container,
				    adjusted = { left: 0, top: 0 },
				    fixed,
				    newMy,
				    containerOffset,
				    containerStatic,
				    viewportWidth,
				    viewportHeight,
				    viewportScroll,
				    viewportOffset;

				// If viewport is not a jQuery element, or it's the window/document, or no adjustment method is used... return
				if (!viewport.jquery || target[0] === window || target[0] === document.body || adjust.method === 'none') {
					return adjusted;
				}

				// Cach container details
				containerOffset = container.offset() || adjusted;
				containerStatic = container.css('position') === 'static';

				// Cache our viewport details
				fixed = tooltip.css('position') === 'fixed';
				viewportWidth = viewport[0] === window ? viewport.width() : viewport.outerWidth(FALSE);
				viewportHeight = viewport[0] === window ? viewport.height() : viewport.outerHeight(FALSE);
				viewportScroll = { left: fixed ? 0 : viewport.scrollLeft(), top: fixed ? 0 : viewport.scrollTop() };
				viewportOffset = viewport.offset() || adjusted;

				// Generic calculation method
				function calculate(side, otherSide, type, adjustment, side1, side2, lengthName, targetLength, elemLength) {
					var initialPos = position[side1],
					    mySide = my[side],
					    atSide = at[side],
					    isShift = type === SHIFT,
					    myLength = mySide === side1 ? elemLength : mySide === side2 ? -elemLength : -elemLength / 2,
					    atLength = atSide === side1 ? targetLength : atSide === side2 ? -targetLength : -targetLength / 2,
					    sideOffset = viewportScroll[side1] + viewportOffset[side1] - (containerStatic ? 0 : containerOffset[side1]),
					    overflow1 = sideOffset - initialPos,
					    overflow2 = initialPos + elemLength - (lengthName === WIDTH ? viewportWidth : viewportHeight) - sideOffset,
					    offset = myLength - (my.precedance === side || mySide === my[otherSide] ? atLength : 0) - (atSide === CENTER ? targetLength / 2 : 0);

					// shift
					if (isShift) {
						offset = (mySide === side1 ? 1 : -1) * myLength;

						// Adjust position but keep it within viewport dimensions
						position[side1] += overflow1 > 0 ? overflow1 : overflow2 > 0 ? -overflow2 : 0;
						position[side1] = Math.max(-containerOffset[side1] + viewportOffset[side1], initialPos - offset, Math.min(Math.max(-containerOffset[side1] + viewportOffset[side1] + (lengthName === WIDTH ? viewportWidth : viewportHeight), initialPos + offset), position[side1],

						// Make sure we don't adjust complete off the element when using 'center'
						mySide === 'center' ? initialPos - myLength : 1E9));
					}

					// flip/flipinvert
					else {
							// Update adjustment amount depending on if using flipinvert or flip
							adjustment *= type === FLIPINVERT ? 2 : 0;

							// Check for overflow on the left/top
							if (overflow1 > 0 && (mySide !== side1 || overflow2 > 0)) {
								position[side1] -= offset + adjustment;
								newMy.invert(side, side1);
							}

							// Check for overflow on the bottom/right
							else if (overflow2 > 0 && (mySide !== side2 || overflow1 > 0)) {
									position[side1] -= (mySide === CENTER ? -offset : offset) + adjustment;
									newMy.invert(side, side2);
								}

							// Make sure we haven't made things worse with the adjustment and reset if so
							if (position[side1] < viewportScroll[side1] && -position[side1] > overflow2) {
								position[side1] = initialPos;newMy = my.clone();
							}
						}

					return position[side1] - initialPos;
				}

				// Set newMy if using flip or flipinvert methods
				if (methodX !== 'shift' || methodY !== 'shift') {
					newMy = my.clone();
				}

				// Adjust position based onviewport and adjustment options
				adjusted = {
					left: methodX !== 'none' ? calculate(X, Y, methodX, adjust.x, LEFT, RIGHT, WIDTH, targetWidth, elemWidth) : 0,
					top: methodY !== 'none' ? calculate(Y, X, methodY, adjust.y, TOP, BOTTOM, HEIGHT, targetHeight, elemHeight) : 0,
					my: newMy
				};

				return adjusted;
			};
			;PLUGINS.polys = {
				// POLY area coordinate calculator
				//	Special thanks to Ed Cradock for helping out with this.
				//	Uses a binary search algorithm to find suitable coordinates.
				polygon: function polygon(baseCoords, corner) {
					var result = {
						width: 0, height: 0,
						position: {
							top: 1e10, right: 0,
							bottom: 0, left: 1e10
						},
						adjustable: FALSE
					},
					    i = 0,
					    next,
					    coords = [],
					    compareX = 1,
					    compareY = 1,
					    realX = 0,
					    realY = 0,
					    newWidth,
					    newHeight;

					// First pass, sanitize coords and determine outer edges
					i = baseCoords.length;
					while (i--) {
						next = [parseInt(baseCoords[--i], 10), parseInt(baseCoords[i + 1], 10)];

						if (next[0] > result.position.right) {
							result.position.right = next[0];
						}
						if (next[0] < result.position.left) {
							result.position.left = next[0];
						}
						if (next[1] > result.position.bottom) {
							result.position.bottom = next[1];
						}
						if (next[1] < result.position.top) {
							result.position.top = next[1];
						}

						coords.push(next);
					}

					// Calculate height and width from outer edges
					newWidth = result.width = Math.abs(result.position.right - result.position.left);
					newHeight = result.height = Math.abs(result.position.bottom - result.position.top);

					// If it's the center corner...
					if (corner.abbrev() === 'c') {
						result.position = {
							left: result.position.left + result.width / 2,
							top: result.position.top + result.height / 2
						};
					} else {
						// Second pass, use a binary search algorithm to locate most suitable coordinate
						while (newWidth > 0 && newHeight > 0 && compareX > 0 && compareY > 0) {
							newWidth = Math.floor(newWidth / 2);
							newHeight = Math.floor(newHeight / 2);

							if (corner.x === LEFT) {
								compareX = newWidth;
							} else if (corner.x === RIGHT) {
								compareX = result.width - newWidth;
							} else {
								compareX += Math.floor(newWidth / 2);
							}

							if (corner.y === TOP) {
								compareY = newHeight;
							} else if (corner.y === BOTTOM) {
								compareY = result.height - newHeight;
							} else {
								compareY += Math.floor(newHeight / 2);
							}

							i = coords.length;
							while (i--) {
								if (coords.length < 2) {
									break;
								}

								realX = coords[i][0] - result.position.left;
								realY = coords[i][1] - result.position.top;

								if (corner.x === LEFT && realX >= compareX || corner.x === RIGHT && realX <= compareX || corner.x === CENTER && (realX < compareX || realX > result.width - compareX) || corner.y === TOP && realY >= compareY || corner.y === BOTTOM && realY <= compareY || corner.y === CENTER && (realY < compareY || realY > result.height - compareY)) {
									coords.splice(i, 1);
								}
							}
						}
						result.position = { left: coords[0][0], top: coords[0][1] };
					}

					return result;
				},

				rect: function rect(ax, ay, bx, by) {
					return {
						width: Math.abs(bx - ax),
						height: Math.abs(by - ay),
						position: {
							left: Math.min(ax, bx),
							top: Math.min(ay, by)
						}
					};
				},

				_angles: {
					tc: 3 / 2, tr: 7 / 4, tl: 5 / 4,
					bc: 1 / 2, br: 1 / 4, bl: 3 / 4,
					rc: 2, lc: 1, c: 0
				},
				ellipse: function ellipse(cx, cy, rx, ry, corner) {
					var c = PLUGINS.polys._angles[corner.abbrev()],
					    rxc = c === 0 ? 0 : rx * Math.cos(c * Math.PI),
					    rys = ry * Math.sin(c * Math.PI);

					return {
						width: rx * 2 - Math.abs(rxc),
						height: ry * 2 - Math.abs(rys),
						position: {
							left: cx + rxc,
							top: cy + rys
						},
						adjustable: FALSE
					};
				},
				circle: function circle(cx, cy, r, corner) {
					return PLUGINS.polys.ellipse(cx, cy, r, r, corner);
				}
			};
			;PLUGINS.imagemap = function (api, area, corner) {
				if (!area.jquery) {
					area = $(area);
				}

				var shape = (area.attr('shape') || 'rect').toLowerCase().replace('poly', 'polygon'),
				    image = $('img[usemap="#' + area.parent('map').attr('name') + '"]'),
				    coordsString = $.trim(area.attr('coords')),
				    coordsArray = coordsString.replace(/,$/, '').split(','),
				    imageOffset,
				    coords,
				    i,
				    result,
				    len;

				// If we can't find the image using the map...
				if (!image.length) {
					return FALSE;
				}

				// Pass coordinates string if polygon
				if (shape === 'polygon') {
					result = PLUGINS.polys.polygon(coordsArray, corner);
				}

				// Otherwise parse the coordinates and pass them as arguments
				else if (PLUGINS.polys[shape]) {
						for (i = -1, len = coordsArray.length, coords = []; ++i < len;) {
							coords.push(parseInt(coordsArray[i], 10));
						}

						result = PLUGINS.polys[shape].apply(this, coords.concat(corner));
					}

					// If no shapre calculation method was found, return false
					else {
							return FALSE;
						}

				// Make sure we account for padding and borders on the image
				imageOffset = image.offset();
				imageOffset.left += Math.ceil((image.outerWidth(FALSE) - image.width()) / 2);
				imageOffset.top += Math.ceil((image.outerHeight(FALSE) - image.height()) / 2);

				// Add image position to offset coordinates
				result.position.left += imageOffset.left;
				result.position.top += imageOffset.top;

				return result;
			};
			;PLUGINS.svg = function (api, svg, corner) {
				var elem = svg[0],
				    root = $(elem.ownerSVGElement),
				    ownerDocument = elem.ownerDocument,
				    strokeWidth2 = (parseInt(svg.css('stroke-width'), 10) || 0) / 2,
				    frameOffset,
				    mtx,
				    transformed,
				    len,
				    next,
				    i,
				    points,
				    result,
				    position;

				// Ascend the parentNode chain until we find an element with getBBox()
				while (!elem.getBBox) {
					elem = elem.parentNode;
				}
				if (!elem.getBBox || !elem.parentNode) {
					return FALSE;
				}

				// Determine which shape calculation to use
				switch (elem.nodeName) {
					case 'ellipse':
					case 'circle':
						result = PLUGINS.polys.ellipse(elem.cx.baseVal.value, elem.cy.baseVal.value, (elem.rx || elem.r).baseVal.value + strokeWidth2, (elem.ry || elem.r).baseVal.value + strokeWidth2, corner);
						break;

					case 'line':
					case 'polygon':
					case 'polyline':
						// Determine points object (line has none, so mimic using array)
						points = elem.points || [{ x: elem.x1.baseVal.value, y: elem.y1.baseVal.value }, { x: elem.x2.baseVal.value, y: elem.y2.baseVal.value }];

						for (result = [], i = -1, len = points.numberOfItems || points.length; ++i < len;) {
							next = points.getItem ? points.getItem(i) : points[i];
							result.push.apply(result, [next.x, next.y]);
						}

						result = PLUGINS.polys.polygon(result, corner);
						break;

					// Unknown shape or rectangle? Use bounding box
					default:
						result = elem.getBBox();
						result = {
							width: result.width,
							height: result.height,
							position: {
								left: result.x,
								top: result.y
							}
						};
						break;
				}

				// Shortcut assignments
				position = result.position;
				root = root[0];

				// Convert position into a pixel value
				if (root.createSVGPoint) {
					mtx = elem.getScreenCTM();
					points = root.createSVGPoint();

					points.x = position.left;
					points.y = position.top;
					transformed = points.matrixTransform(mtx);
					position.left = transformed.x;
					position.top = transformed.y;
				}

				// Check the element is not in a child document, and if so, adjust for frame elements offset
				if (ownerDocument !== document && api.position.target !== 'mouse') {
					frameOffset = $((ownerDocument.defaultView || ownerDocument.parentWindow).frameElement).offset();
					if (frameOffset) {
						position.left += frameOffset.left;
						position.top += frameOffset.top;
					}
				}

				// Adjust by scroll offset of owner document
				ownerDocument = $(ownerDocument);
				position.left += ownerDocument.scrollLeft();
				position.top += ownerDocument.scrollTop();

				return result;
			};
			;
		});
	})(window, document);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * React WebKit - v0.0.5
	 * The react web widget kit base on typescript
	 * 
	 * Copyright 2016 - present, Dennis Chen, All rights reserved.
	 * 
	 * Released under MIT license
	 */
	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var Jq = __webpack_require__(4);
	var Widget = __webpack_require__(1);
	var Util = __webpack_require__(5);
	var Box = function (_super) {
	    __extends(Box, _super);
	    function Box() {
	        _super.apply(this, arguments);
	    }
	    Box.prototype.getWidgetSclass = function () {
	        return 'wkw-box';
	    };
	    Box.prototype.getRenderSclass = function () {
	        var sclass = [_super.prototype.getRenderSclass.call(this)];
	        var valign = this.props.valign;
	        var halign = this.props.halign;
	        var align = this.props.align;
	        if (align) {
	            align.split(' ').forEach(function (each) {
	                if (each = each.trim()) {
	                    sclass.push('wk-' + each);
	                }
	            });
	        }
	        if (valign) {
	            sclass.push('wk-' + Widget.VPos[valign]);
	        }
	        if (halign) {
	            sclass.push('wk-' + Widget.VPos[halign]);
	        }
	        return sclass.join(' ');
	    };
	    Box.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
	    return Box;
	}(Widget.Widget);
	exports.Box = Box;
	var Layout = function (_super) {
	    __extends(Layout, _super);
	    function Layout() {
	        _super.apply(this, arguments);
	    }
	    Layout.prototype.getContentDOM = function (idx) {
	        return this.refs['contentDOM' + idx];
	    };
	    Layout.prototype.getRenderContentSclass = function (child, idx, ctx) {
	        return this.getWidgetSubSclass('content');
	    };
	    Layout.prototype.getRenderContentStyle = function (child, idx, ctx) {
	        return {};
	    };
	    Layout.prototype.getRenderChildren = function () {
	        var _this = this;
	        var ctx = { total: React.Children.count(this.props.children) };
	        return React.Children.map(this.props.children, function (child, idx) {
	            var node;
	            var sclass = _this.getRenderContentSclass(child, idx, ctx);
	            var css = _this.getRenderContentStyle(child, idx, ctx);
	            if ('string' == typeof child) {
	                node = React.createElement("span", null, child);
	            } else {
	                node = child;
	            }
	            return React.createElement("div", { className: sclass, style: css, ref: 'contentDOM' + idx }, node);
	        });
	    };
	    Layout.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
	    return Layout;
	}(Widget.Widget);
	exports.Layout = Layout;
	var Hlayout = function (_super) {
	    __extends(Hlayout, _super);
	    function Hlayout() {
	        _super.apply(this, arguments);
	    }
	    Hlayout.prototype.getWidgetSclass = function () {
	        return 'wkw-hlayout';
	    };
	    Hlayout.prototype.componentDidMount = function () {
	        _super.prototype.componentDidMount.call(this);
	        this.calculateContentSize();
	    };
	    Hlayout.prototype.componentWillMount = function () {
	        _super.prototype.componentWillUnmount.call(this);
	        this.registerQueue();
	    };
	    Hlayout.prototype.componentWillUnmount = function () {
	        this.unregisterQueue();
	        _super.prototype.componentWillUnmount.call(this);
	    };
	    Hlayout.prototype.onQueueEvent = function (evt) {
	        if (Widget.QUEUE_EVENTS.ON_RESIZE == evt.name) {
	            this.calculateContentSize();
	        }
	    };
	    Hlayout.prototype.calculateContentSize = function () {
	        var _this = this;
	        var height = Widget.getInnerHeight(this.getDOM());
	        React.Children.forEach(this.props.children, function (each, idx) {
	            if (Widget.isWidgetElemnt(each)) {
	                var props = Widget.getWidgetProps(each);
	                if (props.vflex) {
	                    var jqcon = Jq(_this.getContentDOM(idx));
	                    jqcon.css({ height: height });
	                }
	            }
	        });
	    };
	    Hlayout.prototype.getRenderContentStyle = function (child, idx, ctx) {
	        var css = _super.prototype.getRenderContentStyle.call(this, child, idx, ctx);
	        if (Widget.isWidgetElemnt(child)) {
	            var props = Widget.getWidgetProps(child);
	            if (undefined == props.visible || props.visible) {
	                if (this.props.space && ctx.anyVisible) {
	                    css.marginLeft = this.props.space;
	                }
	                if (props.hflex) {
	                    css.flex = props.hflex;
	                }
	                ctx.anyVisible = true;
	            }
	        } else {
	            if (this.props.space && ctx.anyVisible) {
	                css.marginLeft = this.props.space;
	            }
	            ctx.anyVisible = true;
	        }
	        return css;
	    };
	    Hlayout.prototype.getRenderSclass = function () {
	        var sclass = [_super.prototype.getRenderSclass.call(this)];
	        var valign = this.props.valign;
	        var halign = this.props.halign;
	        var align = this.props.align;
	        if (align) {
	            align.split(' ').forEach(function (each) {
	                if (each = each.trim()) {
	                    sclass.push('wk-' + each);
	                }
	            });
	        }
	        if (valign) {
	            sclass.push('wk-' + Widget.VPos[valign]);
	        }
	        if (halign) {
	            sclass.push('wk-' + Widget.VPos[halign]);
	        }
	        return sclass.join(' ');
	    };
	    Hlayout.defaultProps = Util.supplyProps({}, Layout.defaultProps);
	    return Hlayout;
	}(Layout);
	exports.Hlayout = Hlayout;
	var Vlayout = function (_super) {
	    __extends(Vlayout, _super);
	    function Vlayout() {
	        _super.apply(this, arguments);
	    }
	    Vlayout.prototype.getWidgetSclass = function () {
	        return 'wkw-vlayout';
	    };
	    Vlayout.prototype.getRenderContentStyle = function (child, idx, ctx) {
	        var css = _super.prototype.getRenderContentStyle.call(this, child, idx, ctx);
	        if (Widget.isWidgetElemnt(child)) {
	            var props = Widget.getWidgetProps(child);
	            if (undefined == props.visible || props.visible) {
	                if (this.props.space && ctx.anyVisible) {
	                    css.marginTop = this.props.space;
	                }
	                if (props.vflex) {
	                    css.flex = props.vflex;
	                    css.display = 'flex';
	                    css.flexDirection = 'column';
	                }
	                ctx.anyVisible = true;
	            }
	        } else {
	            if (this.props.space && ctx.anyVisible) {
	                css.marginTop = this.props.space;
	            }
	            ctx.anyVisible = true;
	        }
	        return css;
	    };
	    Vlayout.prototype.getRenderSclass = function () {
	        var sclass = [_super.prototype.getRenderSclass.call(this)];
	        var valign = this.props.valign;
	        var halign = this.props.halign;
	        var align = this.props.align;
	        if (align) {
	            align.split(' ').forEach(function (each) {
	                if (each = each.trim()) {
	                    sclass.push('wk-' + each);
	                }
	            });
	        }
	        if (valign) {
	            sclass.push('wk-' + Widget.VPos[valign]);
	        }
	        if (halign) {
	            sclass.push('wk-' + Widget.VPos[halign]);
	        }
	        return sclass.join(' ');
	    };
	    Vlayout.defaultProps = Util.supplyProps({}, Layout.defaultProps);
	    return Vlayout;
	}(Layout);
	exports.Vlayout = Vlayout;
	var Buttongroup = function (_super) {
	    __extends(Buttongroup, _super);
	    function Buttongroup() {
	        _super.apply(this, arguments);
	    }
	    Buttongroup.prototype.getRenderSclass = function () {
	        var sclass = [_super.prototype.getRenderSclass.call(this), 'wkw-buttongroup'];
	        return sclass.join(' ');
	    };
	    return Buttongroup;
	}(Hlayout);
	exports.Buttongroup = Buttongroup;
	var Sider = function (_super) {
	    __extends(Sider, _super);
	    function Sider(props) {
	        _super.call(this, props);
	        this.state = {
	            size: this.props.size
	        };
	    }
	    Sider.prototype.onBarMousedown = function (evt) {
	        var _this = this;
	        evt.preventDefault();
	        var props = this.props;
	        var jqdoc = Jq(document);
	        var jqdom = Jq(this.getDOM());
	        var jqbar = jqdom.find('.' + this.getWidgetSubSclass('bar'));
	        var offset0;
	        if (props.orient == Widget.Orient.vertical) {
	            offset0 = evt.pageY - jqbar.offset().top;
	        } else {
	            offset0 = evt.pageX - jqbar.offset().left;
	        }
	        var docMouseMove = function docMouseMove(evt) {
	            evt.preventDefault();
	            var state = _this.state;
	            var props = _this.props;
	            var size;
	            if (props.orient == Widget.Orient.vertical) {
	                var offset = evt.pageY - offset0 - jqbar.offset().top;
	                size = (state.size ? state.size : jqdom.height()) + offset;
	            } else {
	                var offset = evt.pageX - offset0 - jqbar.offset().left;
	                size = (state.size ? state.size : jqdom.width()) + offset;
	            }
	            if (size > 0 && (!props.minSize || size >= props.minSize) && (!props.maxSize || size <= props.maxSize)) {
	                _this.setState({ size: size });
	                Widget.sendWidgetResize();
	            }
	        };
	        var docMouseUp = function docMouseUp(evt) {
	            jqdoc.unbind('mousemove', docMouseMove);
	            jqdoc.unbind('mouseup', docMouseUp);
	            _this.setState({ resizing: false });
	            Widget.sendWidgetResize();
	        };
	        jqdoc.bind('mousemove', docMouseMove);
	        jqdoc.bind('mouseup', docMouseUp);
	        this.setState({ resizing: true });
	    };
	    Sider.prototype.getWidgetSclass = function () {
	        return 'wkw-sider';
	    };
	    Sider.prototype.getRenderSclass = function () {
	        var sclass = [_super.prototype.getRenderSclass.call(this)];
	        if (this.props.orient == Widget.Orient.vertical) {
	            sclass.push('wk-vertical');
	        } else {
	            sclass.push('wk-horizontal');
	        }
	        return sclass.join(' ');
	    };
	    Sider.prototype.getRenderStyle = function () {
	        var props = this.props;
	        var css = _super.prototype.getRenderStyle.call(this);
	        if (this.state.size > 0) {
	            if (props.orient == Widget.Orient.vertical) {
	                css.height = this.state.size;
	            } else {
	                css.width = this.state.size;
	            }
	        }
	        return css;
	    };
	    Sider.prototype.getRenderChildren = function () {
	        var barcls = [this.getWidgetSubSclass('bar')];
	        if (this.state.resizing) {
	            barcls.push('wk-active');
	        }
	        return [React.createElement(Box, { hflex: 1, vflex: 1 }, this.props.children), React.createElement("div", { className: barcls.join(' '), onMouseDown: this.onBarMousedown.bind(this) })];
	    };
	    Sider.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
	    return Sider;
	}(Widget.Widget);
	exports.Sider = Sider;

	//# sourceMappingURL=srcmap/layout.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * React WebKit - v0.0.5
	 * The react web widget kit base on typescript
	 * 
	 * Copyright 2016 - present, Dennis Chen, All rights reserved.
	 * 
	 * Released under MIT license
	 */
	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var Jq = __webpack_require__(4);
	var Widget = __webpack_require__(1);
	var widget_1 = __webpack_require__(1);
	var Util = __webpack_require__(5);
	var layout_1 = __webpack_require__(8);
	var i18n = {
	    dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	    longDayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	    longMonthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	    today: 'Today',
	    reset: 'Reset',
	    clean: 'Clean'
	};
	var minComputerYear = 1971;
	var yearGridBase = 3;
	var yearGridNumber = yearGridBase * 4;
	var monthGridBase = 3;
	(function (View) {
	    View[View["year"] = 1] = "year";
	    View[View["month"] = 2] = "month";
	    View[View["date"] = 3] = "date";
	    View[View["time"] = 4] = "time";
	})(exports.View || (exports.View = {}));
	var View = exports.View;
	var Calendar = function (_super) {
	    __extends(Calendar, _super);
	    function Calendar(props) {
	        _super.call(this, props);
	        this.state.viewingDate = props.selected ? new Date(props.selected.getTime()) : new Date();
	        this.state.view = View.date;
	    }
	    Calendar.prototype.isUncontrolled = function () {
	        return undefined == this.props.selected;
	    };
	    Calendar.prototype.getSelectedDate = function () {
	        if (this.isUncontrolled()) {
	            return this.state.uncontrolled;
	        }
	        return this.props.selected;
	    };
	    Calendar.prototype.componentWillReceiveProps = function (nextProps) {
	        _super.prototype.componentWillReceiveProps.call(this, nextProps);
	        var props = this.props;
	        if (props.selected != nextProps.selected) {
	            if (nextProps.selected) {
	                this.setState({
	                    viewingDate: new Date(nextProps.selected.getTime())
	                });
	            }
	        }
	    };
	    Calendar.prototype.doReset = function () {
	        var selectedDate = this.getSelectedDate();
	        this.setState({
	            viewingDate: !selectedDate ? new Date() : new Date(selectedDate.getTime()),
	            view: View.date
	        });
	    };
	    Calendar.prototype.doToday = function () {
	        var _this = this;
	        var props = this.props;
	        var today = new Date();
	        if (props.doSelect) {
	            this.props.doSelect(today);
	        }
	        this.safeTimeout(function () {
	            _this.setState({
	                viewingDate: today,
	                uncontrolled: _this.isUncontrolled() ? today : undefined,
	                view: View.date
	            });
	        }, 0);
	    };
	    Calendar.prototype.doClean = function () {
	        var _this = this;
	        var props = this.props;
	        if (props.doSelect) {
	            this.props.doSelect(null);
	        }
	        this.safeTimeout(function () {
	            _this.setState({
	                uncontrolled: undefined,
	                view: View.date
	            });
	        }, 0);
	    };
	    Calendar.prototype.doYearView = function () {
	        this.setState({ view: View.year });
	    };
	    Calendar.prototype.doMonthView = function () {
	        this.setState({ view: View.month });
	    };
	    Calendar.prototype.doDateView = function () {
	        this.setState({ view: View.date });
	    };
	    Calendar.prototype.doTimeView = function () {
	        this.setState({ view: View.time });
	    };
	    Calendar.prototype.doYearSelect = function (year) {
	        var viewingDate = this.state.viewingDate;
	        if (viewingDate.getFullYear() != year) {
	            viewingDate = new Date(this.state.viewingDate.getTime());
	            viewingDate.setFullYear(year);
	        }
	        this.setState({
	            view: View.month,
	            viewingDate: viewingDate
	        });
	    };
	    Calendar.prototype.doYearShift = function (increase) {
	        var viewingYear = this.state.viewingDate.getFullYear();
	        var yearStart = viewingYear - (viewingYear - minComputerYear) % yearGridNumber;
	        if (!increase && yearStart <= minComputerYear) {
	            return;
	        }
	        var viewingDate = new Date(this.state.viewingDate.getTime());
	        this.setState({
	            viewingDate: Util.addDateField(viewingDate, Util.DateField.year, increase ? yearGridNumber : -yearGridNumber)
	        });
	    };
	    Calendar.prototype.doMonthSelect = function (month) {
	        var viewingDate = this.state.viewingDate;
	        if (viewingDate.getMonth() != month) {
	            viewingDate = new Date(this.state.viewingDate.getTime());
	            viewingDate.setMonth(month);
	        }
	        this.setState({
	            view: View.date,
	            viewingDate: viewingDate
	        });
	    };
	    Calendar.prototype.doMonthShift = function (increase) {
	        var viewingYear = this.state.viewingDate.getFullYear();
	        if (!increase && viewingYear <= minComputerYear) {
	            return;
	        }
	        var viewingDate = new Date(this.state.viewingDate.getTime());
	        this.setState({
	            viewingDate: Util.addDateField(viewingDate, Util.DateField.year, increase ? 1 : -1)
	        });
	    };
	    Calendar.prototype.doDateSelect = function (date) {
	        var props = this.props;
	        var selectedDate = new Date(this.state.viewingDate.getTime());
	        selectedDate.setDate(date);
	        if (props.doSelect) {
	            this.props.doSelect(selectedDate);
	        }
	        if (this.isUncontrolled()) {
	            this.setState({
	                viewingDate: selectedDate,
	                uncontrolled: selectedDate
	            });
	        }
	    };
	    Calendar.prototype.doDateShift = function (increase) {
	        var viewingYear = this.state.viewingDate.getFullYear();
	        var viewingMonth = this.state.viewingDate.getMonth();
	        if (!increase && (viewingYear < minComputerYear || viewingYear == minComputerYear && viewingMonth == 0)) {
	            return;
	        }
	        var viewingDate = new Date(this.state.viewingDate.getTime());
	        this.setState({
	            viewingDate: Util.addDateField(viewingDate, Util.DateField.month, increase ? 1 : -1)
	        });
	    };
	    Calendar.prototype.getWidgetSclass = function () {
	        return 'wkw-calendar';
	    };
	    Calendar.prototype.getRenderChildren = function () {
	        var props = this.props;
	        var state = this.state;
	        var selectedDate = this.getSelectedDate();
	        var childrenNodes = [];
	        switch (state.view) {
	            case View.year:
	                childrenNodes.push(React.createElement(YearView, { key: 'year', selectedDate: selectedDate, viewingDate: state.viewingDate, doTitleShift: this.doYearShift.bind(this), doSelect: this.doYearSelect.bind(this) }));
	                break;
	            case View.month:
	                childrenNodes.push(React.createElement(MonthView, { key: 'month', selectedDate: selectedDate, viewingDate: state.viewingDate, doTitleShift: this.doMonthShift.bind(this), doTitleClick: this.doYearView.bind(this), doSelect: this.doMonthSelect.bind(this) }));
	                break;
	            case View.date:
	                childrenNodes.push(React.createElement(DateView, { key: 'date', selectedDate: selectedDate, viewingDate: state.viewingDate, firstDayOfWeek: props.firstDayOfWeek, doTitleShift: this.doDateShift.bind(this), doTitleClick: this.doMonthView.bind(this), doSelect: this.doDateSelect.bind(this) }));
	                break;
	            case View.time:
	        }
	        childrenNodes.push(React.createElement(layout_1.Buttongroup, { className: this.getWidgetSubSclass('bottombar'), hflex: 1, align: 'center' }, React.createElement(widget_1.Button, { className: 'wk-aux', onClick: this.doToday.bind(this) }, i18n.today), React.createElement(widget_1.Button, { className: 'wk-aux', onClick: this.doClean.bind(this) }, i18n.clean), React.createElement(widget_1.Button, { className: 'wk-aux', onClick: this.doReset.bind(this) }, i18n.reset)));
	        return Widget.createReactElement(layout_1.Box, { hflex: 1, vflex: 1 }, childrenNodes);
	    };
	    Calendar.prototype.getRenderStyle = function () {
	        var props = this.props;
	        var css = _super.prototype.getRenderStyle.call(this);
	        if (!props.hflex && !css.width) {
	            css.width = 260;
	        }
	        if (!props.vflex && !css.height) {
	            css.height = 302;
	        }
	        return css;
	    };
	    Calendar.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
	    return Calendar;
	}(Widget.Widget);
	exports.Calendar = Calendar;
	var YearView = function (_super) {
	    __extends(YearView, _super);
	    function YearView(props) {
	        _super.call(this, props);
	    }
	    YearView.prototype.doSelect = function (year) {
	        this.props.doSelect(year);
	    };
	    YearView.prototype.render = function () {
	        var props = this.props;
	        var now = new Date();
	        var todayYear = now.getFullYear();
	        var viewingYear = props.viewingDate.getFullYear();
	        var yearStart = viewingYear - (viewingYear - minComputerYear) % yearGridNumber;
	        var selectedYear = props.selectedDate ? props.selectedDate.getFullYear() : undefined;
	        var title = Util.formatString("{} - {}", yearStart, yearStart + yearGridNumber - 1);
	        var tableChildren = [];
	        var count = 0;
	        var onActive = function onActive(evt) {
	            Jq(evt.currentTarget).addClass('wk-active');
	        };
	        var onUnactive = function onUnactive(evt) {
	            Jq(evt.currentTarget).removeClass('wk-active');
	        };
	        for (var r = 0;; r++) {
	            var rowChildren = [];
	            for (var c = 0; c < yearGridBase; c++) {
	                var year = yearStart + r * yearGridBase + c;
	                var clz = [];
	                if (year == selectedYear) {
	                    clz.push('wk-selected');
	                }
	                if (year == todayYear) {
	                    clz.push('wk-today');
	                }
	                rowChildren.push(React.createElement("td", { className: clz.join(' '), onMouseDown: onActive, onMouseUp: onUnactive, onMouseLeave: onUnactive, onClick: this.doSelect.bind(this, year) }, year));
	                count++;
	                if (count >= yearGridNumber) {
	                    break;
	                }
	            }
	            if (rowChildren.length > 0) {
	                tableChildren.push(Widget.createReactElement('tr', {}, rowChildren));
	            }
	            if (count >= yearGridNumber) {
	                break;
	            }
	        }
	        var tbody = Widget.createReactElement('tbody', {}, tableChildren);
	        return React.createElement(layout_1.Box, { className: 'wkw-calendar-yearview', hflex: 1, vflex: 1 }, React.createElement(Titlebar, { title: title, doTitleShift: props.doTitleShift }), React.createElement(layout_1.Box, { hflex: 1, vflex: 1 }, React.createElement("table", { className: 'wkw-calendar-table' }, tbody)));
	    };
	    return YearView;
	}(Widget.Component);
	var MonthView = function (_super) {
	    __extends(MonthView, _super);
	    function MonthView(props) {
	        _super.call(this, props);
	    }
	    MonthView.prototype.doSelect = function (month) {
	        this.props.doSelect(month);
	    };
	    MonthView.prototype.render = function () {
	        var props = this.props;
	        var now = new Date();
	        var todayMonth = now.getMonth();
	        var todayYear = now.getFullYear();
	        var viewingMonth = props.viewingDate.getMonth();
	        var viewingYear = props.viewingDate.getFullYear();
	        var selectedMonth = props.selectedDate ? props.selectedDate.getMonth() : undefined;
	        var selectedYear = props.selectedDate ? props.selectedDate.getFullYear() : undefined;
	        var title = Util.formatString("{}", viewingYear);
	        var tableChildren = [];
	        var count = 0;
	        var onActive = function onActive(evt) {
	            Jq(evt.currentTarget).addClass('wk-active');
	        };
	        var onUnactive = function onUnactive(evt) {
	            Jq(evt.currentTarget).removeClass('wk-active');
	        };
	        for (var r = 0;; r++) {
	            var rowChildren = [];
	            for (var c = 0; c < monthGridBase; c++) {
	                var month = r * monthGridBase + c;
	                var clz = [];
	                if (viewingYear == selectedYear && month == selectedMonth) {
	                    clz.push('wk-selected');
	                }
	                if (viewingYear == todayYear && month == todayMonth) {
	                    clz.push('wk-today');
	                }
	                rowChildren.push(React.createElement("td", { className: clz.join(' '), onMouseDown: onActive, onMouseUp: onUnactive, onMouseLeave: onUnactive, onClick: this.doSelect.bind(this, month) }, i18n.monthNames[month]));
	                count++;
	                if (count >= 12) {
	                    break;
	                }
	            }
	            if (rowChildren.length > 0) {
	                tableChildren.push(Widget.createReactElement('tr', {}, rowChildren));
	            }
	            if (count >= 12) {
	                break;
	            }
	        }
	        var tbody = Widget.createReactElement('tbody', {}, tableChildren);
	        return React.createElement(layout_1.Box, { className: 'wkw-calendar-monthview', hflex: 1, vflex: 1 }, React.createElement(Titlebar, { title: title, doTitleClick: props.doTitleClick, doTitleShift: props.doTitleShift }), React.createElement(layout_1.Box, { hflex: 1, vflex: 1 }, React.createElement("table", { className: 'wkw-calendar-table' }, tbody)));
	    };
	    return MonthView;
	}(Widget.Component);
	function getDaysOfMonth(date) {
	    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	}
	function getWeekDayOfMonth(date) {
	    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	}
	var DateView = function (_super) {
	    __extends(DateView, _super);
	    function DateView(props) {
	        _super.call(this, props);
	    }
	    DateView.prototype.doSelect = function (date) {
	        this.props.doSelect(date);
	    };
	    DateView.prototype.render = function () {
	        var props = this.props;
	        var now = new Date();
	        var todayDate = now.getDate();
	        var todayMonth = now.getMonth();
	        var todayYear = now.getFullYear();
	        var viewingDate = props.viewingDate.getDate();
	        var viewingMonth = props.viewingDate.getMonth();
	        var viewingYear = props.viewingDate.getFullYear();
	        var selectedDate = props.selectedDate ? props.selectedDate.getDate() : undefined;
	        var selectedYear = props.selectedDate ? props.selectedDate.getFullYear() : undefined;
	        var selectedMonth = props.selectedDate ? props.selectedDate.getMonth() : undefined;
	        var daysOfMonth = getDaysOfMonth(props.viewingDate);
	        var weekDayOfMonth = getWeekDayOfMonth(props.viewingDate);
	        var prevDaysOfMonth = getDaysOfMonth(Util.addDateField(new Date(props.viewingDate.getTime()), Util.DateField.month, -1));
	        var onActive = function onActive(evt) {
	            Jq(evt.currentTarget).addClass('wk-active');
	        };
	        var onUnactive = function onUnactive(evt) {
	            Jq(evt.currentTarget).removeClass('wk-active');
	        };
	        var title = Util.formatString("{} {}", i18n.longMonthNames[viewingMonth], viewingYear);
	        var tableRows = [];
	        var firstDayOfWeek = props.firstDayOfWeek ? props.firstDayOfWeek : 0;
	        var sundayIdx = firstDayOfWeek == 0 ? 0 : 7 - firstDayOfWeek;
	        var firstDayIdx = sundayIdx == 0 ? weekDayOfMonth : weekDayOfMonth - 1;
	        if (firstDayIdx <= 0) {
	            firstDayIdx += 7;
	        }
	        var headerChildren = [];
	        for (var c = 0; c < 7; c++) {
	            var idx = firstDayOfWeek + c;
	            while (idx >= 7) {
	                idx -= 7;
	            }
	            var clz = c == sundayIdx ? 'wk-sunday' : undefined;
	            headerChildren.push(React.createElement("th", { className: clz }, i18n.dayNames[idx]));
	        }
	        tableRows.push(Widget.createReactElement('tr', {}, headerChildren));
	        for (var r = 0; r < 6; r++) {
	            var rowChildren = [];
	            for (var c = 0; c < 7; c++) {
	                var date = r * 7 + c;
	                date = date - firstDayIdx + 1;
	                var clz = [];
	                if (viewingYear == selectedYear && viewingMonth == selectedMonth && date == selectedDate) {
	                    clz.push('wk-selected');
	                }
	                if (viewingYear == todayYear && viewingMonth == todayMonth && date == todayDate) {
	                    clz.push('wk-today');
	                }
	                if (c == sundayIdx) {
	                    clz.push('wk-sunday');
	                }
	                var label = void 0;
	                if (date <= 0) {
	                    label = prevDaysOfMonth + date;
	                    clz.push('wk-date-prv-m');
	                } else if (date > daysOfMonth) {
	                    label = date - daysOfMonth;
	                    clz.push('wk-date-next-m');
	                } else {
	                    clz.push('wk-date');
	                    label = date;
	                }
	                rowChildren.push(React.createElement("td", { className: clz.join(' '), onMouseDown: onActive, onMouseUp: onUnactive, onMouseLeave: onUnactive, onClick: this.doSelect.bind(this, date) }, label));
	            }
	            if (rowChildren.length > 0) {
	                tableRows.push(Widget.createReactElement('tr', {}, rowChildren));
	            }
	        }
	        var tbody = Widget.createReactElement('tbody', {}, tableRows);
	        return React.createElement(layout_1.Box, { className: 'wkw-calendar-dateview', hflex: 1, vflex: 1 }, React.createElement(Titlebar, { title: title, doTitleClick: props.doTitleClick, doTitleShift: props.doTitleShift }), React.createElement(layout_1.Box, { hflex: 1, vflex: 1 }, React.createElement("table", { className: 'wkw-calendar-table' }, tbody)));
	    };
	    return DateView;
	}(Widget.Component);
	var TimeView = function (_super) {
	    __extends(TimeView, _super);
	    function TimeView(props) {
	        _super.call(this, props);
	    }
	    TimeView.prototype.render = function () {
	        return React.createElement("div", { className: 'wkw-calendar-time' });
	    };
	    return TimeView;
	}(Widget.Component);
	var Titlebar = function (_super) {
	    __extends(Titlebar, _super);
	    function Titlebar(props) {
	        _super.call(this, props);
	    }
	    Titlebar.prototype.render = function () {
	        var props = this.props;
	        var childrenNodes = [];
	        if (props.doTitleShift) {
	            childrenNodes.push(React.createElement("button", { className: 'wk-aux', onClick: function onClick() {
	                    props.doTitleShift(false);
	                } }, " < "));
	        }
	        childrenNodes.push(React.createElement(layout_1.Box, { hflex: 1, align: 'center' }, React.createElement("div", { className: props.doTitleClick ? 'wk-clickable' : undefined, onClick: props.doTitleClick }, " ", this.props.title)));
	        if (props.doTitleShift) {
	            childrenNodes.push(React.createElement("button", { className: 'wk-aux', onClick: function onClick() {
	                    props.doTitleShift(true);
	                } }, " > "));
	        }
	        return Widget.createReactElement(layout_1.Hlayout, { className: 'wkw-calendar-titlebar', hflex: 1, align: 'middle' }, childrenNodes);
	    };
	    return Titlebar;
	}(Widget.Component);

	//# sourceMappingURL=srcmap/datetime.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * React WebKit - v0.0.5
	 * The react web widget kit base on typescript
	 * 
	 * Copyright 2016 - present, Dennis Chen, All rights reserved.
	 * 
	 * Released under MIT license
	 */
	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __assign = undefined && undefined.__assign || Object.assign || function (t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) {
	            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	    }
	    return t;
	};
	var React = __webpack_require__(2);
	var Widget = __webpack_require__(1);
	var Util = __webpack_require__(5);
	var Input = function (_super) {
	    __extends(Input, _super);
	    function Input() {
	        _super.apply(this, arguments);
	    }
	    Input.prototype.onChange = function (evt) {
	        if (this.props.onChange) {
	            this.props.onChange(evt);
	        }
	    };
	    Input.prototype.getRenderSclass = function () {
	        var str = [_super.prototype.getRenderSclass.call(this)];
	        if (this.props.disabled) {
	            str.push('wk-disabled');
	        }
	        return str.join(' ');
	    };
	    Input.prototype.getInputDOM = function () {
	        return this.refs['input'];
	    };
	    Input.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
	    return Input;
	}(Widget.Widget);
	exports.Input = Input;
	(function (TextboxType) {
	    TextboxType[TextboxType["text"] = 1] = "text";
	    TextboxType[TextboxType["textarea"] = 2] = "textarea";
	    TextboxType[TextboxType["password"] = 3] = "password";
	})(exports.TextboxType || (exports.TextboxType = {}));
	var TextboxType = exports.TextboxType;
	var Textbox = function (_super) {
	    __extends(Textbox, _super);
	    function Textbox() {
	        _super.apply(this, arguments);
	    }
	    Textbox.prototype.getWidgetSclass = function () {
	        return 'wkw-textbox';
	    };
	    Textbox.prototype.onChange = function (evt) {
	        _super.prototype.onChange.call(this, evt);
	        if (this.props.doChange) {
	            this.props.doChange(evt.target.value);
	        }
	    };
	    Textbox.prototype.getRenderChildren = function () {
	        var props = this.props;
	        var onChange = props.onChange || props.doChange ? this.onChange.bind(this) : undefined;
	        var css = {};
	        if (props.hflex || props.style && props.style.width) {
	            css.width = '100%';
	        }
	        if (props.vflex || props.style && props.style.height) {
	            css.height = '100%';
	        }
	        var inpProps = {
	            ref: 'input',
	            onChange: onChange,
	            disabled: props.disabled,
	            readOnly: props.readOnly,
	            style: css,
	            placeholder: props.placeholder,
	            defaultValue: props.defaultValue,
	            name: props.name,
	            value: props.value,
	            maxLength: props.maxLength
	        };
	        var inpType = 'text';
	        switch (props.type) {
	            case 'textarea':
	            case TextboxType.textarea:
	                if (props.hflex && props.vflex) {
	                    css.resize = 'none';
	                } else if (props.hflex) {
	                    css.resize = 'vertical';
	                } else if (props.vflex) {
	                    css.resize = 'horizontal';
	                }
	                return React.createElement("textarea", __assign({}, inpProps));
	            case 'password':
	            case TextboxType.password:
	                inpType = 'password';
	            default:
	                return React.createElement("input", __assign({ type: inpType }, inpProps));
	        }
	    };
	    Textbox.defaultProps = Util.supplyProps({}, Input.defaultProps);
	    return Textbox;
	}(Input);
	exports.Textbox = Textbox;
	var Checkbox = function (_super) {
	    __extends(Checkbox, _super);
	    function Checkbox() {
	        _super.apply(this, arguments);
	    }
	    Checkbox.prototype.getWidgetSclass = function () {
	        return 'wkw-checkbox';
	    };
	    Checkbox.prototype.onChange = function (evt) {
	        _super.prototype.onChange.call(this, evt);
	        if (this.props.doCheck) {
	            this.props.doCheck(evt.target.checked, this.props.value);
	        }
	    };
	    Checkbox.prototype.getInputType = function () {
	        return 'checkbox';
	    };
	    Checkbox.prototype.getRenderChildren = function () {
	        var props = this.props;
	        var inpid;
	        if (props.id) {
	            inpid = [props.id, '_inp'].join('');
	        } else {
	            inpid = [this.getPseudoId(), '_inp'].join('');
	        }
	        var label;
	        if (props.label) {
	            label = React.createElement("label", { htmlFor: inpid }, props.label);
	        }
	        var inputType = this.getInputType();
	        var onChange = props.onChange || props.doCheck ? this.onChange.bind(this) : undefined;
	        var value = 'string' == typeof props.value ? props.value : undefined;
	        return [React.createElement("input", { id: inpid, type: inputType, ref: 'input', onChange: onChange, checked: props.checked, disabled: props.disabled, readOnly: props.readOnly, defaultChecked: props.defaultChecked, name: props.name, value: value }), label];
	    };
	    Checkbox.defaultProps = Util.supplyProps({}, Input.defaultProps);
	    return Checkbox;
	}(Input);
	exports.Checkbox = Checkbox;
	var Radiobox = function (_super) {
	    __extends(Radiobox, _super);
	    function Radiobox() {
	        _super.apply(this, arguments);
	    }
	    Radiobox.prototype.getWidgetSclass = function () {
	        return 'wkw-radiobox';
	    };
	    Radiobox.prototype.getInputType = function () {
	        return 'radio';
	    };
	    return Radiobox;
	}(Checkbox);
	exports.Radiobox = Radiobox;

	//# sourceMappingURL=srcmap/input.js.map

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * React WebKit - v0.0.5
	 * The react web widget kit base on typescript
	 * 
	 * Copyright 2016 - present, Dennis Chen, All rights reserved.
	 * 
	 * Released under MIT license
	 */
	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Jq = __webpack_require__(4);
	var Widget = __webpack_require__(1);
	var Util = __webpack_require__(5);
	exports.zIndexStart = 2000;
	(function (AdjustMethod) {
	    AdjustMethod[AdjustMethod["shift"] = 1] = "shift";
	    AdjustMethod[AdjustMethod["flip"] = 2] = "flip";
	})(exports.AdjustMethod || (exports.AdjustMethod = {}));
	var AdjustMethod = exports.AdjustMethod;
	var Popup = function (_super) {
	    __extends(Popup, _super);
	    function Popup(props) {
	        _super.call(this, props);
	        this.dismissCount = 0;
	        if (undefined === this.state.visible) {
	            this.state.visible = false;
	        }
	    }
	    Popup.prototype.getId = function () {
	        var id = _super.prototype.getId.call(this);
	        return undefined != id ? id : this.getPseudoId();
	    };
	    Popup.prototype.componentWillUnmount = function () {
	        _super.prototype.componentWillUnmount.call(this);
	        this.removeBodyListener();
	    };
	    Popup.prototype.removeBodyListener = function () {
	        if (this.onBodyClick) {
	            Jq('body').unbind('click', this.onBodyClick);
	            delete this.onBodyClick;
	        }
	    };
	    Popup.prototype.show = function (target, showOpt) {
	        var _this = this;
	        if (target === void 0) {
	            target = undefined;
	        }
	        if (showOpt === void 0) {
	            showOpt = undefined;
	        }
	        var props = this.props;
	        var opt = showOpt ? showOpt : props.showOption ? props.showOption : {};
	        this.reposition(target, opt);
	        var dom = this.getDOM();
	        var jqdom = Jq(dom);
	        var jqp = jqdom.parent();
	        var zIndex = exports.zIndexStart;
	        jqp.children().each(function (idx, each) {
	            if (each === dom) {
	                return;
	            }
	            var zi = Jq(each).css("zIndex");
	            if (!isNaN(zi)) {
	                zIndex = Math.max(zIndex, Number(zi) + 1);
	            } else {
	                zIndex = Math.max(zIndex, exports.zIndexStart);
	            }
	        });
	        this.setState({ zIndex: zIndex });
	        _super.prototype.show.call(this);
	        if (opt.dismissTimeout > 0) {
	            this.dismissCount++;
	            var timeout = opt.dismissTimeout;
	            if (props.animation) {
	                timeout += props.animation.duration || Widget.DEFAULT_ANIMATION_DURATION;
	            }
	            this.safeTimeout(function () {
	                _this.dismissCount--;
	                if (_this.dismissCount == 0) {
	                    _this.hide();
	                }
	            }, timeout);
	        }
	        if (opt.autoDismiss) {
	            if (!this.onBodyClick) {
	                var fnDismiss = function fnDismiss(evt) {
	                    var holders = ['#' + _this.getId()];
	                    if (opt.autoDismissHolders) {
	                        holders.push.apply(holders, opt.autoDismissHolders);
	                    }
	                    var jqt = Jq(evt.target);
	                    if (!holders.some(function (each) {
	                        return jqt.closest(each).length > 0;
	                    })) {
	                        _this.hide();
	                    }
	                };
	                Jq('body').bind('click', this.onBodyClick = fnDismiss);
	            }
	        } else {
	            this.removeBodyListener();
	        }
	    };
	    Popup.prototype.reposition = function (target, showOpt) {
	        var props = this.props;
	        var opt = showOpt ? showOpt : props.showOption ? props.showOption : {};
	        var jqdom = Jq(this.getDOM());
	        var jqp = jqdom.parent();
	        var targetPos = { x: 0, y: 0 };
	        if (target) {
	            targetPos = calculatPopupTargetPos(target, jqp, opt);
	        }
	        var visible = jqdom.is(":visible");
	        if (!visible) {
	            jqdom.show();
	        }
	        var selfSize = { width: Widget.getOutterWidth(jqdom[0]), height: Widget.getOutterHeight(jqdom[0]) };
	        if (!visible) {
	            jqdom.hide();
	        }
	        var selfPos = calculatePopupSelfPos(targetPos, selfSize, opt);
	        selfPos.x += opt.adjustX | 0;
	        selfPos.y += opt.adjustY | 0;
	        if (opt.adjust) {
	            var parentScrollSize = { width: jqp[0].scrollWidth, height: jqp[0].scrollHeight };
	            selfPos = calculatePopupAdjustPos(targetPos, selfPos, selfSize, parentScrollSize, opt);
	        }
	        this.setState({ left: selfPos.x, top: selfPos.y });
	    };
	    Popup.prototype.hide = function () {
	        _super.prototype.hide.call(this);
	        if (!this.props.animation) {
	            this.setState({ zIndex: undefined });
	        }
	        this.removeBodyListener();
	    };
	    Popup.prototype.afterAnimation = function (finalVisible) {
	        _super.prototype.afterAnimation.call(this, finalVisible);
	        if (!finalVisible) {
	            this.setState({ zIndex: undefined });
	        }
	    };
	    Popup.prototype.getWidgetSclass = function () {
	        return 'wkw-popup';
	    };
	    Popup.prototype.getRenderStyle = function () {
	        var css = _super.prototype.getRenderStyle.call(this);
	        var state = this.state;
	        css.top = state.top;
	        css.left = state.left;
	        css.zIndex = state.zIndex;
	        return css;
	    };
	    Popup.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
	    return Popup;
	}(Widget.Widget);
	exports.Popup = Popup;
	function calculatPopupTargetPos(target, jqParent, opt) {
	    if (opt === void 0) {
	        opt = {};
	    }
	    var targetPos = { x: 0, y: 0 };
	    var parentOffset = jqParent.offset();
	    var evt = target;
	    if (evt.target && "pageX" in evt && "pageY" in evt) {
	        targetPos.x = evt.pageX - parentOffset.left + jqParent.scrollLeft();
	        targetPos.y = evt.pageY - parentOffset.top + jqParent.scrollTop();
	    } else {
	        var jqt = Jq(target);
	        var targetOffset = jqt.offset();
	        targetPos.x = targetOffset.left - parentOffset.left + jqParent.scrollLeft();
	        targetPos.y = targetOffset.top - parentOffset.top + jqParent.scrollTop();
	        var targetWidth = Widget.getOutterWidth(jqt[0]);
	        var targetHeight = Widget.getOutterHeight(jqt[0]);
	        var pos = opt.targetHPos ? opt.targetHPos : 'right';
	        switch (pos) {
	            case 'right':
	            case Widget.HPos.right:
	                targetPos.x += targetWidth;
	                break;
	            case 'center':
	            case Widget.HPos.center:
	                targetPos.x += targetWidth / 2;
	                break;
	        }
	        pos = opt.targetVPos ? opt.targetVPos : 'top';
	        switch (pos) {
	            case 'bottom':
	            case Widget.VPos.bottom:
	                targetPos.y += targetHeight;
	                break;
	            case 'middle':
	            case Widget.VPos.middle:
	                targetPos.y += targetHeight / 2;
	                break;
	        }
	    }
	    return targetPos;
	}
	function calculatePopupSelfPos(targetPos, selfSize, opt) {
	    if (opt === void 0) {
	        opt = {};
	    }
	    var left = targetPos.x;
	    var top = targetPos.y;
	    var pos = opt.selfHPos ? opt.selfHPos : 'left';
	    switch (pos) {
	        case 'right':
	        case Widget.HPos.right:
	            left -= selfSize.width;
	            break;
	        case 'center':
	        case Widget.HPos.center:
	            left -= selfSize.width / 2;
	            break;
	    }
	    pos = opt.selfVPos ? opt.selfVPos : 'top';
	    switch (opt.selfVPos) {
	        case 'bottom':
	        case Widget.VPos.bottom:
	            top -= selfSize.height;
	            break;
	        case 'middle':
	        case Widget.VPos.middle:
	            top -= selfSize.height / 2;
	            break;
	    }
	    return { x: left, y: top };
	}
	function calculatePopupAdjustPos(targetPos, selfPos, selfSize, parentScrollSize, opt) {
	    if (opt === void 0) {
	        opt = {};
	    }
	    var psw = parentScrollSize.width;
	    var psh = parentScrollSize.height;
	    var adjPos = Util.overrideProps({}, selfPos);
	    switch (opt.adjust) {
	        case 'shift':
	        case AdjustMethod.shift:
	            if (adjPos.x + selfSize.width > psw) {
	                adjPos.x = psw - selfSize.width;
	            }
	            if (adjPos.y + selfSize.height > psh) {
	                adjPos.y = psh - selfSize.height;
	            }
	            if (adjPos.x < 0) {
	                adjPos.x = 0;
	            }
	            if (adjPos.y < 0) {
	                adjPos.y = 0;
	            }
	            break;
	        case 'flip':
	        case AdjustMethod.flip:
	            var adjOpt = Util.overrideProps({}, opt);
	            var adj = 0;
	            if (adjPos.x + selfSize.width > psw) {
	                adjOpt.selfHPos = Widget.HPos.right;
	                adj++;
	            }
	            if (adjPos.y + selfSize.height > psh) {
	                adjOpt.selfVPos = Widget.VPos.bottom;
	                adj++;
	            }
	            if (adjPos.x < 0) {
	                adjOpt.selfHPos = Widget.HPos.left;
	                adj++;
	            }
	            if (adjPos.y < 0) {
	                adjOpt.selfVPos = Widget.VPos.top;
	                adj++;
	            }
	            if (adj > 0) {
	                adjPos = calculatePopupSelfPos(targetPos, selfSize, adjOpt);
	            }
	            break;
	    }
	    return adjPos;
	}

	//# sourceMappingURL=srcmap/popup.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * React WebKit - v0.0.5
	 * The react web widget kit base on typescript
	 * 
	 * Copyright 2016 - present, Dennis Chen, All rights reserved.
	 * 
	 * Released under MIT license
	 */
	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var Jq = __webpack_require__(4);
	var Widget = __webpack_require__(1);
	var Util = __webpack_require__(5);
	var layout_1 = __webpack_require__(8);
	var globalModalCaveId = 'wkModalCave';
	var globalContainer;
	function getGlobalContainerCave() {
	    var dom = document.getElementById(globalModalCaveId);
	    if (!dom) {
	        Jq(document.body).append('<div id="' + globalModalCaveId + '" />');
	        dom = document.getElementById(globalModalCaveId);
	    }
	    return dom;
	}
	var ModalContainer = function (_super) {
	    __extends(ModalContainer, _super);
	    function ModalContainer(props) {
	        _super.call(this, props);
	        this._modalStack = [];
	        this.state.modalStack = this._modalStack;
	    }
	    ModalContainer.prototype.getWidgetSclass = function () {
	        return 'wkw-modal-container';
	    };
	    ModalContainer.prototype.putModal = function (modal) {
	        var modalStack = this._modalStack;
	        var idx = modalStack.indexOf(modal);
	        if (idx < 0) {
	            modalStack.push(modal);
	        } else if (idx == modalStack.length - 1) {
	            return;
	        } else {
	            modalStack.splice(idx, 1);
	            modalStack.push(modal);
	        }
	        this.setState({ modalStack: this._modalStack });
	    };
	    ModalContainer.prototype.getModal = function () {
	        var modalStack = this._modalStack;
	        return modalStack.length > 0 ? modalStack[modalStack.length - 1] : undefined;
	    };
	    ModalContainer.prototype.clearModal = function (modal) {
	        var modalStack = this._modalStack;
	        var hit;
	        for (var i = modalStack.length - 1; i >= 0; i--) {
	            if (modalStack[i] == modal) {
	                modalStack.splice(i, 1);
	                hit = true;
	            }
	        }
	        if (hit) {
	            this.setState({ modalStack: this._modalStack });
	        }
	    };
	    ModalContainer.prototype.componentDidMount = function () {
	        var _this = this;
	        _super.prototype.componentDidMount.call(this);
	        var state = this.state;
	        var jqdom = Jq(this.getDOM());
	        var modal = this.getModal();
	        if (modal) {
	            Widget.gainFocus(jqdom);
	            if (modal.props.doAfterShow) {
	                modal.props.doAfterShow();
	            }
	        }
	        jqdom.click(function (evt) {
	            if (Jq(':focus').length == 0) {
	                Jq(_this.refs['keyAnchor']).focus();
	            }
	        });
	        Jq(document.body).on('focusin', this.onBodyFocusin = function (evt) {
	            var modal = _this.getModal();
	            if (modal) {
	                var dom = _this.getDOM();
	                if (!Jq.contains(dom, evt.target)) {
	                    Widget.gainFocus(dom);
	                }
	            }
	        }).on('keyup', this.onBodyKeyup = function (evt) {
	            var modal = _this.getModal();
	            if (modal) {
	                var dom = _this.getDOM();
	                if (Jq.contains(dom, evt.target)) {
	                    if (evt.keyCode == 27 && modal.props.doEsc) {
	                        modal.props.doEsc();
	                    }
	                }
	            }
	        });
	    };
	    ModalContainer.prototype.componentWillUnmount = function () {
	        _super.prototype.componentWillUnmount.call(this);
	        if (this.onBodyFocusin) {
	            Jq(document.body).off('focusin', this.onBodyFocusin);
	            delete this.onBodyFocusin;
	        }
	        if (this.onBodyKeyup) {
	            Jq(document.body).off('keyup', this.onBodyKeyup);
	            delete this.onBodyKeyup;
	        }
	    };
	    ModalContainer.prototype.componentDidUpdate = function (prevProps, prevState) {
	        _super.prototype.componentDidUpdate.call(this, prevProps, prevState);
	        var modal = this.getModal();
	        if (modal) {
	            Widget.gainFocus(this.getDOM());
	            if (modal.props.doAfterShow) {
	                modal.props.doAfterShow();
	            }
	        }
	    };
	    ModalContainer.prototype.getRenderChildren = function () {
	        var modal = this.getModal();
	        if (modal) {
	            var key = modal.getPseudoId();
	            var clz = [this.getWidgetSubSclass('content'), modal.getWidgetSubSclass('content')].join(' ');
	            var content = Widget.createReactElement('div', { className: clz }, modal.getModalRenderChildren());
	            return React.createElement(layout_1.Box, { key: key, hflex: 1, vflex: 1, align: 'center middle', animation: modal.props.animation }, content, React.createElement("a", { ref: 'keyAnchor', href: 'javascript: void(0)' }));
	        }
	        return undefined;
	    };
	    ModalContainer.prototype.getRenderStyle = function () {
	        var css = _super.prototype.getRenderStyle.call(this);
	        var modal = this.getModal();
	        if (!modal) {
	            css.display = 'none';
	        }
	        return css;
	    };
	    ModalContainer.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
	    return ModalContainer;
	}(Widget.Widget);
	exports.ModalContainer = ModalContainer;
	var Modal = function (_super) {
	    __extends(Modal, _super);
	    function Modal(props) {
	        _super.call(this, props);
	    }
	    Modal.prototype.componentDidMount = function () {
	        _super.prototype.componentDidMount.call(this);
	        var props = this.props;
	        if (props.show) {
	            this.getContainer().putModal(this);
	        }
	    };
	    Modal.prototype.componentDidUpdate = function (prevProps, prevState) {
	        _super.prototype.componentDidUpdate.call(this, prevProps, prevState);
	        var props = this.props;
	        var container = this.getContainer();
	        if (props.show != prevProps.show) {
	            if (props.show) {
	                container.putModal(this);
	            } else {
	                container.clearModal(this);
	            }
	        } else if (props.show && container.getModal() != this) {
	            container.putModal(this);
	        }
	    };
	    Modal.prototype.componentWillUnmount = function () {
	        _super.prototype.componentWillUnmount.call(this);
	        if (this.props.show) {
	            this.getContainer().clearModal(this);
	        }
	    };
	    Modal.prototype.getContainer = function () {
	        if (!globalContainer) {
	            globalContainer = ReactDOM.render(React.createElement(ModalContainer, null), getGlobalContainerCave());
	        }
	        return globalContainer;
	    };
	    Modal.prototype.getWidgetSclass = function () {
	        return 'wkw-modal';
	    };
	    Modal.prototype.getModalRenderChildren = function () {
	        return this.props.children;
	    };
	    Modal.prototype.getRenderChildren = function () {
	        return undefined;
	    };
	    Modal.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
	    return Modal;
	}(Widget.Widget);
	exports.Modal = Modal;
	var Window = function (_super) {
	    __extends(Window, _super);
	    function Window() {
	        _super.apply(this, arguments);
	    }
	    Window.prototype.getWidgetSclass = function () {
	        return 'wkw-window';
	    };
	    Window.prototype.getModalRenderChildren = function () {
	        var props = this.props;
	        var bodyclz = this.getWidgetSubSclass('body');
	        var tbarclz = this.getWidgetSubSclass('title-bar');
	        var tbarnodes = [React.createElement(layout_1.Box, { hflex: 1 }, props.title)];
	        if (props.doClose) {
	            var closeclz = [this.getWidgetSubSclass('close'), 'wk-aux'].join(' ');
	            tbarnodes.push(React.createElement("button", { type: 'button', className: closeclz, onClick: this.props.doClose }, "×"));
	        }
	        var tbar = Widget.createReactElement(layout_1.Hlayout, { className: tbarclz, hflex: 1, align: 'middle' }, tbarnodes);
	        return React.createElement(layout_1.Vlayout, null, tbar, React.createElement("div", { className: bodyclz }, this.props.children));
	    };
	    Window.defaultProps = Util.supplyProps({}, Modal.defaultProps);
	    return Window;
	}(Modal);
	exports.Window = Window;

	//# sourceMappingURL=srcmap/modal.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * React WebKit - v0.0.5
	 * The react web widget kit base on typescript
	 * 
	 * Copyright 2016 - present, Dennis Chen, All rights reserved.
	 * 
	 * Released under MIT license
	 */
	"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var Widget = __webpack_require__(1);
	var Util = __webpack_require__(5);
	var List = function (_super) {
	    __extends(List, _super);
	    function List() {
	        _super.apply(this, arguments);
	    }
	    List.prototype.getWidgetSclass = function () {
	        return 'wkw-list';
	    };
	    List.prototype.getRenderSclass = function () {
	        var str = [_super.prototype.getRenderSclass.call(this)];
	        if (this.props.disabled) {
	            str.push('wk-disabled');
	        }
	        return str.join(' ');
	    };
	    List.prototype.getRenderChildren = function () {
	        var props = this.props;
	        var selection = props.selection;
	        if (props.model) {
	            var renderer_1 = props.itemRenderer;
	            if (!renderer_1) {
	                var msg = 'Need itemRenderer to render model of List';
	                throw msg;
	            }
	            var childrenNodes = props.model.map(function (each, idx) {
	                var key = renderer_1.key(idx, each);
	                if (key == undefined || key == null) {
	                    key = idx;
	                }
	                var templateNode = renderer_1.render(idx, each);
	                var selected = selection ? selection.isSelected(idx, each) : false;
	                var onItemClick = props.onItemClick || props.doSelect ? function (evt) {
	                    if (props.onItemClick) {
	                        props.onItemClick(evt, idx, each);
	                    }
	                    if (props.doSelect) {
	                        props.doSelect(!selected, idx, each);
	                    }
	                } : undefined;
	                var onItemDoubleClick = props.onItemDoubleClick ? function (evt) {
	                    props.onItemDoubleClick(evt, idx, each);
	                } : undefined;
	                var onItemContextMenu = props.onItemContextMenu ? function (evt) {
	                    props.onItemContextMenu(evt, idx, each);
	                } : undefined;
	                return React.createElement("li", { key: key, className: selected ? 'wk-selected' : undefined, onClick: onItemClick, onDoubleClick: onItemDoubleClick, onContentMenu: onItemContextMenu }, templateNode);
	            });
	            return React.createElement("ul", null, childrenNodes);
	        } else if (props.children) {
	            var childrenNodes = React.Children.map(props.children, function (child, idx) {
	                var selected = selection ? selection.isSelected(idx, null) : false;
	                var onItemClick = props.onItemClick || props.doSelect ? function (evt) {
	                    if (props.onItemClick) {
	                        props.onItemClick(evt, idx, null);
	                    }
	                    if (props.doSelect) {
	                        props.doSelect(!selected, idx, null);
	                    }
	                } : undefined;
	                var onItemDoubleClick = props.onItemDoubleClick ? function (evt) {
	                    props.onItemDoubleClick(evt, idx, null);
	                } : undefined;
	                var onItemContextMenu = props.onItemContextMenu ? function (evt) {
	                    props.onItemContextMenu(evt, idx, null);
	                } : undefined;
	                return React.createElement("li", { className: selected ? 'wk-selected' : undefined, onClick: onItemClick, onDoubleClick: onItemDoubleClick, onContextMenu: onItemContextMenu }, child);
	            });
	            return React.createElement("ul", null, childrenNodes);
	        } else {
	            return React.createElement("ul", null);
	        }
	    };
	    List.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
	    return List;
	}(Widget.Widget);
	exports.List = List;

	//# sourceMappingURL=srcmap/list.js.map

/***/ }
/******/ ])
});
;