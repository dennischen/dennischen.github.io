var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', 'jquery', "./widget"], function (require, exports, React, jq, Widget) {
    "use strict";
    var Box = (function (_super) {
        __extends(Box, _super);
        function Box() {
            _super.apply(this, arguments);
        }
        Box.prototype.getWidgetSclass = function () {
            return 'bww-box';
        };
        Box.prototype.getRenderSclass = function () {
            var sclass = [_super.prototype.getRenderSclass.call(this)];
            var valign = this.props.valign;
            var halign = this.props.halign;
            var align = this.props.align;
            if (align) {
                align.split(' ').forEach(function (each) {
                    if (each = each.trim()) {
                        sclass.push('bw-' + each);
                    }
                });
            }
            if (valign) {
                sclass.push('bw-' + Widget.VPos[valign]);
            }
            if (halign) {
                sclass.push('bw-' + Widget.VPos[halign]);
            }
            return sclass.join(' ');
        };
        Box.prototype.getRenderChildren = function () {
            var c = React.Children.count(this.props.children);
            return this.props.children;
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
            return this.getWidgetSclass() + '-content';
        };
        LayoutWidget.prototype.getRenderContentStyle = function (child, total, idx) {
            return {};
        };
        LayoutWidget.prototype.getRenderChildren = function () {
            var _this = this;
            var wcls = this.getWidgetSclass();
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
            return 'bww-hlayout';
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
                        sclass.push('bw-' + each);
                    }
                });
            }
            if (valign) {
                sclass.push('bw-' + Widget.VPos[valign]);
            }
            if (halign) {
                sclass.push('bw-' + Widget.VPos[halign]);
            }
            return sclass.join(' ');
        };
        Hlayout.defaultProps = Widget.mergeProps({}, LayoutWidget.defaultProps);
        return Hlayout;
    }(LayoutWidget));
    exports.Hlayout = Hlayout;
    var Vlayout = (function (_super) {
        __extends(Vlayout, _super);
        function Vlayout() {
            _super.apply(this, arguments);
        }
        Vlayout.prototype.getWidgetSclass = function () {
            return 'bww-vlayout';
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
        Vlayout.defaultProps = Widget.mergeProps({}, LayoutWidget.defaultProps);
        return Vlayout;
    }(LayoutWidget));
    exports.Vlayout = Vlayout;
});

//# sourceMappingURL=../../srcmap/widget/layout.js.map
