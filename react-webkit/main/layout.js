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
        define(["require", "exports", 'react', 'jquery', './widget', './util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var Jq = require('jquery');
    var Widget = require('./widget');
    var Util = require('./util');
    var Box = (function (_super) {
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
    }(Widget.Widget));
    exports.Box = Box;
    var Layout = (function (_super) {
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
                }
                else {
                    node = child;
                }
                return (React.createElement("div", {className: sclass, style: css, ref: 'contentDOM' + idx}, node));
            });
        };
        Layout.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
        return Layout;
    }(Widget.Widget));
    exports.Layout = Layout;
    var Hlayout = (function (_super) {
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
                if (!props.hidden) {
                    if (this.props.space && ctx.anyVisible) {
                        css.marginLeft = this.props.space;
                    }
                    if (props.hflex) {
                        css.flex = props.hflex;
                    }
                    ctx.anyVisible = true;
                }
            }
            else {
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
    }(Layout));
    exports.Hlayout = Hlayout;
    var Vlayout = (function (_super) {
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
                        css.display = 'flex';
                        css.flexDirection = 'column';
                    }
                    ctx.anyVisible = true;
                }
            }
            else {
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
    }(Layout));
    exports.Vlayout = Vlayout;
    var Buttongroup = (function (_super) {
        __extends(Buttongroup, _super);
        function Buttongroup() {
            _super.apply(this, arguments);
        }
        Buttongroup.prototype.getRenderSclass = function () {
            var sclass = [_super.prototype.getRenderSclass.call(this), 'wkw-buttongroup'];
            return sclass.join(' ');
        };
        return Buttongroup;
    }(Hlayout));
    exports.Buttongroup = Buttongroup;
    var Sider = (function (_super) {
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
            }
            else {
                offset0 = evt.pageX - jqbar.offset().left;
            }
            var docMouseMove = function (evt) {
                evt.preventDefault();
                var state = _this.state;
                var props = _this.props;
                var size;
                if (props.orient == Widget.Orient.vertical) {
                    var offset = evt.pageY - offset0 - jqbar.offset().top;
                    size = (state.size ? state.size : jqdom.height()) + offset;
                }
                else {
                    var offset = evt.pageX - offset0 - jqbar.offset().left;
                    size = (state.size ? state.size : jqdom.width()) + offset;
                }
                if (size > 0 && (!props.minSize || size >= props.minSize)
                    && (!props.maxSize || size <= props.maxSize)) {
                    _this.setState({ size: size });
                    Widget.sendWidgetResize();
                }
            };
            var docMouseUp = function (evt) {
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
            }
            else {
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
                }
                else {
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
            return [React.createElement(Box, {hflex: 1, vflex: 1}, this.props.children),
                React.createElement("div", {className: barcls.join(' '), onMouseDown: this.onBarMousedown.bind(this)})];
        };
        Sider.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
        return Sider;
    }(Widget.Widget));
    exports.Sider = Sider;
});

//# sourceMappingURL=srcmap/layout.js.map
