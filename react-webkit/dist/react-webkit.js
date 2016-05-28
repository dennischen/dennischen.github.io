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
	var Input = __webpack_require__(6);
	var Layout = __webpack_require__(7);
	var Popup = __webpack_require__(8);

	module.exports = {
	  Widget: Widget,
	  Input: Input,
	  Layout: Layout,
	  Popup: Popup
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
	        return this.selection.length == 0 ? undefined : this.selection.slice();
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
	        return this.selection.length == 0 ? undefined : this.selection.slice();
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
	        return this.selection.length == 0 ? undefined : this.selection.slice();
	    };
	    return KeySelection;
	}();
	exports.KeySelection = KeySelection;
	var pseudoIdGenerator = new Util.ShortId('wk_', 'webkit');
	var Widget = function (_super) {
	    __extends(Widget, _super);
	    function Widget(props) {
	        _super.call(this, props);
	        this.state = {
	            hidden: props.hidden
	        };
	    }
	    Widget.prototype.getPseudoId = function () {
	        if (!this.pseudoId) {
	            this.pseudoId = pseudoIdGenerator.next();
	        }
	        return this.pseudoId;
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
	    Widget.prototype.componentWillMount = function () {};
	    Widget.prototype.componentDidMount = function () {};
	    Widget.prototype.componentWillUnmount = function () {
	        if (this.pseudoId) {
	            pseudoIdGenerator.reuse(this.pseudoId);
	            delete this.pseudoId;
	        }
	    };
	    Widget.prototype.componentWillReceiveProps = function (nextProps) {
	        if (this.props.hidden !== nextProps.hidden) {
	            this.setState({ hidden: nextProps.hidden });
	        }
	    };
	    Widget.prototype.componentWillUpdate = function (nextProps, nextState) {
	        if (nextProps.animation && this.state.hidden !== nextState.hidden) {
	            this._willAnimateHidden = true;
	        }
	    };
	    Widget.prototype.componentDidUpdate = function (prevProps, prevState) {
	        var _this = this;
	        var fireResize = false;
	        if (this._willAnimateHidden) {
	            var ani = this.props.animation;
	            var jqd = Jq(this.getDOM());
	            var dur = ani.duration ? ani.duration : exports.DEFAULT_ANIMATION_DURATION;
	            var hidden = this.state.hidden;
	            var done = hidden ? function () {
	                _this._willAnimateHidden = false;
	                sendWidgetResize();
	            } : function () {
	                _this._willAnimateHidden = false;
	            };
	            switch (ani.effect) {
	                case AniEffect.fade:
	                    jqd.animate({ opacity: hidden ? 'hide' : 'show' }, { duration: dur, done: done });
	                    break;
	                case AniEffect.slide:
	                    jqd.animate({ height: hidden ? 'hide' : 'show' }, { duration: dur, done: done });
	                    break;
	                case AniEffect.slideWidth:
	                    jqd.animate({ width: hidden ? 'hide' : 'show' }, { duration: dur, done: done });
	                    break;
	            }
	            if (!hidden) {
	                fireResize = true;
	            }
	        }
	        if (fireResize || this.props.hflex !== prevProps.hflex || this.props.vflex !== prevProps.vflex) {
	            sendWidgetResize();
	        }
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
	    Widget.prototype.getRenderType = function () {
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
	        if (this._willAnimateHidden) {
	            if (!this.state.hidden) {
	                css.display = 'none';
	            }
	        } else if (this.state.hidden) {
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
	    Widget.prototype.render = function () {
	        var props = this.props;
	        var t = this.getRenderType();
	        var p = {
	            id: props.id,
	            ref: 'DOM',
	            className: this.getRenderSclass(),
	            style: this.getRenderStyle(),
	            onClick: props.onClick,
	            onDoubleClick: props.onDoubleClick,
	            onContextMenu: props.onContextMenu
	        };
	        return React.createElement(t, p, this.getRenderChildren());
	    };
	    Widget.defaultProps = {};
	    Widget.__wgtmgc = true;
	    return Widget;
	}(React.Component);
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
	    Fonticon.prototype.getRenderType = function () {
	        return 'i';
	    };
	    Fonticon.defaultProps = Util.supplyProps({}, Widget.defaultProps);
	    return Fonticon;
	}(Widget);
	exports.Fonticon = Fonticon;
	var List = function (_super) {
	    __extends(List, _super);
	    function List() {
	        _super.apply(this, arguments);
	    }
	    List.prototype.getWidgetSclass = function () {
	        return 'wkw-list';
	    };
	    List.prototype.getRenderSclass = function () {
	        var str = [];
	        str.push(_super.prototype.getRenderSclass.call(this));
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
	                if (key == undefined) {
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
	                var selected = selection ? selection.isSelected(idx, undefined) : false;
	                var onItemClick = props.onItemClick || props.doSelect ? function (evt) {
	                    if (props.onItemClick) {
	                        props.onItemClick(evt, idx, undefined);
	                    }
	                    if (props.doSelect) {
	                        props.doSelect(!selected, idx, undefined);
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
	    List.defaultProps = Util.supplyProps({}, Widget.defaultProps);
	    return List;
	}(Widget);
	exports.List = List;
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
	        var str = [];
	        str.push(_super.prototype.getRenderSclass.call(this));
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
	            label = React.createElement("label", { key: 'l', htmlFor: inpid }, props.label);
	        }
	        var inputType = this.getInputType();
	        var onChange = props.onChange || props.doCheck ? this.onChange.bind(this) : undefined;
	        var value = 'string' == typeof props.value ? props.value : undefined;
	        return [React.createElement("input", { key: 'i', id: inpid, type: inputType, ref: 'input', onChange: onChange, checked: props.checked, disabled: props.disabled, readOnly: props.readOnly, name: props.name, value: value }), label];
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
/* 7 */
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
	                if (!props.hidden && props.vflex) {
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
	            if (!props.hidden) {
	                if (this.props.space && ctx.anyVisible) {
	                    css.marginLeft = this.props.space;
	                }
	                if (props.hflex) {
	                    css.flex = props.hflex;
	                    css.overflow = 'hidden';
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
	            if (!props.hidden) {
	                if (this.props.space && ctx.anyVisible) {
	                    css.marginTop = this.props.space;
	                }
	                if (props.vflex) {
	                    css.flex = props.vflex;
	                    css.overflow = 'hidden';
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
	            }
	        };
	        var docMouseUp = function docMouseUp(evt) {
	            jqdoc.unbind('mousemove', docMouseMove);
	            jqdoc.unbind('mouseup', docMouseUp);
	            _this.setState({ resizing: false });
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
	        return [React.createElement(Box, { key: 'b', hflex: 1, vflex: 1 }, this.props.children), React.createElement("div", { key: 's', className: barcls.join(' '), onMouseDown: this.onBarMousedown.bind(this) })];
	    };
	    Sider.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
	    return Sider;
	}(Widget.Widget);
	exports.Sider = Sider;

	//# sourceMappingURL=srcmap/layout.js.map

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
	var Jq = __webpack_require__(4);
	var Widget = __webpack_require__(1);
	var Util = __webpack_require__(5);
	(function (AdjustMethod) {
	    AdjustMethod[AdjustMethod["shift"] = 1] = "shift";
	    AdjustMethod[AdjustMethod["flip"] = 2] = "flip";
	    AdjustMethod[AdjustMethod["flipinvert"] = 3] = "flipinvert";
	})(exports.AdjustMethod || (exports.AdjustMethod = {}));
	var AdjustMethod = exports.AdjustMethod;
	var Popup = function (_super) {
	    __extends(Popup, _super);
	    function Popup(props) {
	        _super.call(this, props);
	        this._adc = 0;
	        this.state.hidden = undefined === props.hidden ? true : props.hidden;
	    }
	    Popup.prototype.show = function (target, opt) {
	        var _this = this;
	        if (target === void 0) {
	            target = undefined;
	        }
	        if (opt === void 0) {
	            opt = {};
	        }
	        var props = this.props;
	        this.reposition(target, opt);
	        _super.prototype.show.call(this);
	        if (opt.autoDismiss > 0) {
	            this._adc++;
	            var dismiss = opt.autoDismiss;
	            if (props.animation) {
	                dismiss += props.animation.duration || Widget.DEFAULT_ANIMATION_DURATION;
	            }
	            setTimeout(function () {
	                _this._adc--;
	                if (_this._adc == 0) {
	                    _this.hide();
	                }
	            }, dismiss);
	        }
	    };
	    Popup.prototype.reposition = function (target, opt) {
	        if (target === void 0) {
	            target = undefined;
	        }
	        if (opt === void 0) {
	            opt = {};
	        }
	        var props = this.props;
	        var jqdom = Jq(this.getDOM());
	        var jqp = jqdom.parent();
	        var top = 0,
	            left = 0;
	        if (target) {
	            var jqt = Jq(target);
	            var ost = jqt.offset();
	            var osp = jqp.offset();
	            top = ost.top - osp.top + jqp.scrollTop();
	            left = ost.left - osp.left + jqp.scrollLeft();
	            var tgtw = Widget.getOutterWidth(jqt[0]);
	            var tgth = Widget.getOutterHeight(jqt[0]);
	            switch (opt.targetHPos) {
	                case Widget.HPos.right:
	                    left += tgtw;
	                    break;
	                case Widget.HPos.center:
	                    left += tgtw / 2;
	                    break;
	            }
	            switch (opt.targetVPos) {
	                case Widget.VPos.bottom:
	                    top += tgth;
	                    break;
	                case Widget.VPos.middle:
	                    top += tgth / 2;
	                    break;
	            }
	        }
	        var visible = jqdom.is(":visible");
	        if (!visible) {
	            jqdom.show();
	        }
	        var slfw = Widget.getOutterWidth(jqdom[0]);
	        var slfh = Widget.getOutterHeight(jqdom[0]);
	        if (!visible) {
	            jqdom.hide();
	        }
	        switch (opt.selfHPos) {
	            case Widget.HPos.right:
	                left -= slfw;
	                break;
	            case Widget.HPos.center:
	                left -= slfw / 2;
	                break;
	        }
	        switch (opt.selfVPos) {
	            case Widget.VPos.bottom:
	                top -= slfh;
	                break;
	            case Widget.VPos.middle:
	                top -= slfh / 2;
	                break;
	        }
	        left += opt.adjustX | 0;
	        top += opt.adjustY | 0;
	        switch (opt.adjust) {
	            case AdjustMethod.shift:
	                break;
	            case AdjustMethod.flip:
	                break;
	            case AdjustMethod.flipinvert:
	                break;
	        }
	        this.setState({ left: left, top: top });
	    };
	    Popup.prototype.hide = function () {
	        _super.prototype.hide.call(this);
	    };
	    Popup.prototype.getWidgetSclass = function () {
	        return 'wkw-popup';
	    };
	    Popup.prototype.getRenderStyle = function () {
	        var css = _super.prototype.getRenderStyle.call(this);
	        var state = this.state;
	        css.top = state.top;
	        css.left = state.left;
	        return css;
	    };
	    Popup.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
	    return Popup;
	}(Widget.Widget);
	exports.Popup = Popup;

	//# sourceMappingURL=srcmap/popup.js.map

/***/ }
/******/ ])
});
;