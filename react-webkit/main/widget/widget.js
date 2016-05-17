var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', 'react-dom', 'jquery', 'react-webkit/util'], function (require, exports, React, ReactDOM, jq, Util) {
    "use strict";
    exports.QUEUE_EVENTS = {
        ON_RESIZE: 'onResize'
    };
    var queueName = 'wbkWidgetQueue';
    var queue;
    function sendResize() {
        queue.send({ name: exports.QUEUE_EVENTS.ON_RESIZE, data: {} });
    }
    exports.sendResize = sendResize;
    if (window) {
        if (!window[queueName]) {
            window[queueName] = queue = new Util.SimpleQueue();
            jq(window).bind('resize', sendResize);
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
    (function (AniEffect) {
        AniEffect[AniEffect["fade"] = 1] = "fade";
        AniEffect[AniEffect["slide"] = 2] = "slide";
        AniEffect[AniEffect["slideLeft"] = 3] = "slideLeft";
    })(exports.AniEffect || (exports.AniEffect = {}));
    var AniEffect = exports.AniEffect;
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
    var Widget = (function (_super) {
        __extends(Widget, _super);
        function Widget(props) {
            _super.call(this, props);
        }
        Widget.prototype.registerQueue = function () {
            if (!this._registedQueue) {
                queue.add(this);
                this._registedQueue = true;
            }
        };
        Widget.prototype.unregisterQueue = function () {
            if (this._registedQueue) {
                queue.remove(this);
                this._registedQueue = false;
            }
        };
        Widget.prototype.componentWillMount = function () {
        };
        Widget.prototype.componentDidMount = function () {
        };
        Widget.prototype.componentWillUnmount = function () {
        };
        Widget.prototype.componentWillReceiveProps = function (nextProps) {
        };
        Widget.prototype.componentWillUpdate = function (nextProps, prevState) {
            if (nextProps.animation) {
                this._willAnimate = true;
                this._willAnimateHidden = this.props.hidden;
            }
        };
        Widget.prototype.componentDidUpdate = function (prevProps, prevState) {
            var _this = this;
            var willAni = this._willAnimate;
            delete this._willAnimate;
            if (this.props.hidden != prevProps.hidden
                || this.props.hflex != prevProps.hflex
                || this.props.vflex != prevProps.vflex) {
                if (!willAni) {
                    return;
                }
                var ani = this.props.animation;
                var jqd = jq(this.getDOM());
                var dur = ani.duration ? ani.duration : 300;
                var hidden = this.props.hidden;
                var done = hidden ? function () {
                    _this.sendQueueEvent(exports.QUEUE_EVENTS.ON_RESIZE);
                } : undefined;
                switch (ani.effect) {
                    case AniEffect.fade:
                        jqd.animate({ opacity: 'toggle' }, { duration: dur, done: done });
                        break;
                    case AniEffect.slide:
                        jqd.animate({ height: 'toggle' }, { duration: dur, done: done });
                        break;
                    case AniEffect.slideLeft:
                        jqd.animate({ width: 'toggle' }, { duration: dur, done: done });
                        break;
                }
                if (!hidden) {
                    this.sendQueueEvent(exports.QUEUE_EVENTS.ON_RESIZE);
                }
            }
        };
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
                str.push('wbk-hflex');
            }
            if (this.props.vflex) {
                str.push('wbk-vflex');
            }
            if (this.props.className) {
                str.push(this.props.className);
            }
            return str.join(" ");
        };
        Widget.prototype.getRenderStyle = function () {
            var css = {};
            if (this.props.style) {
                mergeProps(css, this.props.style);
            }
            if (this._willAnimate) {
                if (this._willAnimateHidden) {
                    css.display = 'none';
                }
            }
            else if (this.props.hidden) {
                css.display = 'none';
            }
            return css;
        };
        Widget.prototype.getRenderChildren = function () {
            return this.props.children;
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
        Widget._widgetMagic = true;
        return Widget;
    }(React.Component));
    exports.Widget = Widget;
    var Fonticon = (function (_super) {
        __extends(Fonticon, _super);
        function Fonticon() {
            _super.apply(this, arguments);
        }
        Fonticon.prototype.getWidgetSclass = function () {
            return 'wbkw-fonticon';
        };
        Fonticon.prototype.getRenderChildren = function () {
            return null;
        };
        Fonticon.prototype.getRenderType = function () {
            return 'i';
        };
        Fonticon.defaultProps = mergeProps({}, Widget.defaultProps);
        return Fonticon;
    }(Widget));
    exports.Fonticon = Fonticon;
    var Checkbox = (function (_super) {
        __extends(Checkbox, _super);
        function Checkbox() {
            _super.apply(this, arguments);
        }
        Checkbox.prototype.getWidgetSclass = function () {
            return 'wbkw-checkbox';
        };
        Checkbox.prototype.onChange = function (evt) {
            if (this.props.doCheck) {
                this.props.doCheck(evt.target.checked);
            }
            if (this.props.onChange) {
                this.props.onChange(evt);
            }
        };
        Checkbox.prototype.getRenderSclass = function () {
            var str = [];
            str.push(_super.prototype.getRenderSclass.call(this));
            if (this.props.disabled) {
                str.push('wbk-disabled');
            }
            return str.join(' ');
        };
        Checkbox.prototype.getRenderChildren = function () {
            var label;
            if (this.props.label) {
                label = React.createElement("span", {key: 'l'}, this.props.label);
            }
            else if (this.props.children) {
                label = React.createElement("span", {key: 'l'}, this.props.children);
            }
            var onChange = (this.props.onChange || this.props.doCheck) ? this.onChange.bind(this) : undefined;
            var readonly = this.props.checked && !onChange ? true : undefined;
            return [React.createElement("input", {key: 'i', type: 'checkbox', ref: 'checkbox', onChange: onChange, checked: this.props.checked, readOnly: readonly, disabled: this.props.disabled}), label];
        };
        Checkbox.defaultProps = mergeProps({}, Widget.defaultProps);
        return Checkbox;
    }(Widget));
    exports.Checkbox = Checkbox;
    var List = (function (_super) {
        __extends(List, _super);
        function List() {
            _super.apply(this, arguments);
        }
        List.prototype.getWidgetSclass = function () {
            return 'wbkw-list';
        };
        List.prototype.getRenderSclass = function () {
            var str = [];
            str.push(_super.prototype.getRenderSclass.call(this));
            if (this.props.disabled) {
                str.push('wbk-disabled');
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
                    return React.createElement("li", {key: key, className: selected ? 'wbk-selected' : undefined, onClick: onItemClick, onDoubleClick: onItemDoubleClick, onContentMenu: onItemContextMenu}, templateNode);
                });
                return React.createElement("ul", null, childrenNodes);
            }
            else if (props.children) {
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
                    return React.createElement("li", {className: selected ? 'wbk-selected' : undefined, onClick: onItemClick, onDoubleClick: onItemDoubleClick, onContextMenu: onItemContextMenu}, child);
                });
                return React.createElement("ul", null, childrenNodes);
            }
            else {
                return React.createElement("ul", null);
            }
        };
        List.defaultProps = mergeProps({}, Widget.defaultProps);
        return List;
    }(Widget));
    exports.List = List;
    function isWidgetElemnt(child) {
        var casting = child;
        return casting ? (casting.type && casting.type._widgetMagic) : false;
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
    function mergeProps(props) {
        var supports = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            supports[_i - 1] = arguments[_i];
        }
        supports.forEach(function (each) {
            for (var prop in each) {
                if (props[prop] == undefined) {
                    props[prop] = each[prop];
                }
            }
        });
        return props;
    }
    exports.mergeProps = mergeProps;
});

//# sourceMappingURL=../srcmap/widget/widget.js.map
