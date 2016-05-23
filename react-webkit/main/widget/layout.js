var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', 'jquery', 'react-webkit/widget'], function (require, exports, React, jq, Widget) {
    "use strict";
    var Box = (function (_super) {
        __extends(Box, _super);
        function Box() {
            _super.apply(this, arguments);
        }
        Box.prototype.getWidgetSclass = function () {
            return 'wbkw-box';
        };
        Box.prototype.getRenderSclass = function () {
            var sclass = [_super.prototype.getRenderSclass.call(this)];
            var valign = this.props.valign;
            var halign = this.props.halign;
            var align = this.props.align;
            if (align) {
                align.split(' ').forEach(function (each) {
                    if (each = each.trim()) {
                        sclass.push('wbk-' + each);
                    }
                });
            }
            if (valign) {
                sclass.push('wbk-' + Widget.VPos[valign]);
            }
            if (halign) {
                sclass.push('wbk-' + Widget.VPos[halign]);
            }
            return sclass.join(' ');
        };
        Box.defaultProps = Widget.mergeProps({}, Widget.Widget.defaultProps);
        return Box;
    }(Widget.Widget));
    exports.Box = Box;
    var LayoutWidget = (function (_super) {
        __extends(LayoutWidget, _super);
        function LayoutWidget() {
            _super.apply(this, arguments);
        }
        LayoutWidget.prototype.getContentDOM = function (idx) {
            return this.refs['contentDOM' + idx];
        };
        LayoutWidget.prototype.getRenderContentSclass = function (child, total, idx) {
            return this.getWidgetSubSclass('content');
        };
        LayoutWidget.prototype.getRenderContentStyle = function (child, total, idx) {
            return {};
        };
        LayoutWidget.prototype.getRenderChildren = function () {
            var _this = this;
            var total = React.Children.count(this.props.children);
            return React.Children.map(this.props.children, function (child, idx) {
                var node;
                var sclass = _this.getRenderContentSclass(child, total, idx);
                var css = _this.getRenderContentStyle(child, total, idx);
                if ('string' == typeof child) {
                    node = React.createElement("span", null, child);
                }
                else {
                    node = child;
                }
                return (React.createElement("div", {className: sclass, style: css, ref: 'contentDOM' + idx}, node));
            });
        };
        LayoutWidget.defaultProps = Widget.mergeProps({}, Widget.Widget.defaultProps);
        return LayoutWidget;
    }(Widget.Widget));
    exports.LayoutWidget = LayoutWidget;
    var Hlayout = (function (_super) {
        __extends(Hlayout, _super);
        function Hlayout() {
            _super.apply(this, arguments);
        }
        Hlayout.prototype.getWidgetSclass = function () {
            return 'wbkw-hlayout';
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
                        var jqcon = jq(_this.getContentDOM(idx));
                        jqcon.css({ height: height });
                    }
                }
            });
        };
        Hlayout.prototype.getRenderContentStyle = function (child, total, idx) {
            var css = _super.prototype.getRenderContentStyle.call(this, child, total, idx);
            if (Widget.isWidgetElemnt(child)) {
                var props = Widget.getWidgetProps(child);
                if (!props.hidden) {
                    if (idx > 0 && this.props.space > 0) {
                        css.marginLeft = this.props.space;
                    }
                    if (props.hflex) {
                        css.flex = props.hflex;
                        css.overflow = 'hidden';
                    }
                }
            }
            else {
                if (idx > 0 && this.props.space > 0) {
                    css.marginLeft = this.props.space;
                }
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
                        sclass.push('wbk-' + each);
                    }
                });
            }
            if (valign) {
                sclass.push('wbk-' + Widget.VPos[valign]);
            }
            if (halign) {
                sclass.push('wbk-' + Widget.VPos[halign]);
            }
            return sclass.join(' ');
        };
        Hlayout.defaultProps = Widget.mergeProps({}, LayoutWidget.defaultProps);
        return Hlayout;
    }(LayoutWidget));
    exports.Hlayout = Hlayout;
    var Hsider = (function (_super) {
        __extends(Hsider, _super);
        function Hsider(props) {
            _super.call(this, props);
            this.state = {
                width: this.props.width
            };
        }
        Hsider.prototype.onBarMousedown = function (evt) {
            var _this = this;
            evt.preventDefault();
            var jqdoc = jq(document);
            var jqbar = jq(this.getDOM()).find('.' + this.getWidgetSubSclass('bar'));
            var docMouseMove = function (evt) {
                evt.preventDefault();
                var state = _this.state;
                var props = _this.props;
                var offsetX = evt.pageX - jqbar.offset().left;
                var width = state.width + offsetX;
                if (width > 0 && (!props.minWidth || width >= props.minWidth) && (!props.maxWidth || width <= props.maxWidth)) {
                    _this.setState({ width: width });
                }
            };
            var docMouseUp = function (evt) {
                jqdoc.unbind('mousemove', docMouseMove);
                jqdoc.unbind('mouseup', docMouseUp);
                _this.setState({ resizing: false });
            };
            jqdoc.bind('mousemove', docMouseMove);
            jqdoc.bind('mouseup', docMouseUp);
            this.setState({ resizing: true });
        };
        Hsider.prototype.getWidgetSclass = function () {
            return 'wbkw-hsider';
        };
        Hsider.prototype.getRenderStyle = function () {
            var props = this.props;
            var css = _super.prototype.getRenderStyle.call(this);
            if (this.state.width > 0) {
                css.width = this.state.width;
            }
            return css;
        };
        Hsider.prototype.getRenderChildren = function () {
            var barcls = [this.getWidgetSubSclass('bar')];
            if (this.state.resizing) {
                barcls.push('wbk-active');
            }
            var total = React.Children.count(this.props.children);
            return [React.createElement(Box, {key: 'b', hflex: 1, vflex: 1}, this.props.children),
                React.createElement("div", {key: 's', className: barcls.join(' '), onMouseDown: this.onBarMousedown.bind(this)})];
        };
        Hsider.defaultProps = Widget.mergeProps({}, Widget.Widget.defaultProps);
        return Hsider;
    }(Widget.Widget));
    exports.Hsider = Hsider;
    var Vlayout = (function (_super) {
        __extends(Vlayout, _super);
        function Vlayout() {
            _super.apply(this, arguments);
        }
        Vlayout.prototype.getWidgetSclass = function () {
            return 'wbkw-vlayout';
        };
        Vlayout.prototype.getRenderContentStyle = function (child, total, idx) {
            var css = _super.prototype.getRenderContentStyle.call(this, child, total, idx);
            if (Widget.isWidgetElemnt(child)) {
                var props = Widget.getWidgetProps(child);
                if (!props.hidden) {
                    if (idx > 0 && this.props.space > 0) {
                        css.marginTop = this.props.space;
                    }
                    if (props.vflex) {
                        css.flex = props.vflex;
                        css.overflow = 'hidden';
                        css.display = 'flex';
                        css.flexDirection = 'column';
                    }
                }
            }
            else {
                if (idx > 0 && this.props.space > 0) {
                    css.marginTop = this.props.space;
                }
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
                        sclass.push('wbk-' + each);
                    }
                });
            }
            if (valign) {
                sclass.push('wbk-' + Widget.VPos[valign]);
            }
            if (halign) {
                sclass.push('wbk-' + Widget.VPos[halign]);
            }
            return sclass.join(' ');
        };
        Vlayout.defaultProps = Widget.mergeProps({}, LayoutWidget.defaultProps);
        return Vlayout;
    }(LayoutWidget));
    exports.Vlayout = Vlayout;
    var Vsider = (function (_super) {
        __extends(Vsider, _super);
        function Vsider(props) {
            _super.call(this, props);
            this.state = {
                height: this.props.height
            };
        }
        Vsider.prototype.onBarMousedown = function (evt) {
            var _this = this;
            evt.preventDefault();
            var jqdoc = jq(document);
            var jqbar = jq(this.getDOM()).find('.' + this.getWidgetSubSclass('bar'));
            var docMouseMove = function (evt) {
                evt.preventDefault();
                var state = _this.state;
                var props = _this.props;
                var offsetX = evt.pageY - jqbar.offset().top;
                var height = state.height + offsetX;
                if (height > 0 && (!props.minHeight || height >= props.minHeight) && (!props.maxHeight || height <= props.maxHeight)) {
                    _this.setState({ height: height });
                }
            };
            var docMouseUp = function (evt) {
                jqdoc.unbind('mousemove', docMouseMove);
                jqdoc.unbind('mouseup', docMouseUp);
                _this.setState({ resizing: false });
            };
            jqdoc.bind('mousemove', docMouseMove);
            jqdoc.bind('mouseup', docMouseUp);
            this.setState({ resizing: true });
        };
        Vsider.prototype.getWidgetSclass = function () {
            return 'wbkw-vsider';
        };
        Vsider.prototype.getRenderStyle = function () {
            var props = this.props;
            var css = _super.prototype.getRenderStyle.call(this);
            if (this.state.height > 0) {
                css.height = this.state.height;
            }
            return css;
        };
        Vsider.prototype.getRenderChildren = function () {
            var barcls = [this.getWidgetSubSclass('bar')];
            if (this.state.resizing) {
                barcls.push('wbk-active');
            }
            var total = React.Children.count(this.props.children);
            return [React.createElement(Box, {key: 'b', hflex: 1, vflex: 1}, this.props.children),
                React.createElement("div", {key: 's', className: barcls.join(' '), onMouseDown: this.onBarMousedown.bind(this)})];
        };
        Vsider.defaultProps = Widget.mergeProps({}, Widget.Widget.defaultProps);
        return Vsider;
    }(Widget.Widget));
    exports.Vsider = Vsider;
});

//# sourceMappingURL=../srcmap/widget/layout.js.map
