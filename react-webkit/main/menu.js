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
        define(["require", "exports", 'react', './widget', './widget', './util', './popup'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var Widget = require('./widget');
    var widget_1 = require('./widget');
    var Util = require('./util');
    var popup_1 = require('./popup');
    var MenuItem = (function (_super) {
        __extends(MenuItem, _super);
        function MenuItem() {
            _super.apply(this, arguments);
        }
        MenuItem.prototype.getId = function () {
            var id = _super.prototype.getId.call(this);
            return undefined != id ? id : this.getPseudoId();
        };
        MenuItem.prototype.getWidgetSclass = function () {
            return 'wkw-menuitem';
        };
        MenuItem.prototype.togglePopup = function () {
            var props = this.props;
            var popup = this.refs['popup'];
            if (!popup.state.invisible) {
                popup.hide();
                return;
            }
            var opt = {
                autoDismiss: true,
                autoDismissHolders: ['#' + this.getId()],
                adjust: popup_1.AdjustMethod.flip
            };
            switch (props.popupSide) {
                case 'top':
                case widget_1.Position.top:
                    opt.targetHPos = widget_1.HPos.left;
                    opt.targetVPos = widget_1.VPos.top;
                    opt.selfHPos = widget_1.HPos.left;
                    opt.selfVPos = widget_1.VPos.bottom;
                    break;
                case 'right':
                case widget_1.Position.right:
                    opt.targetHPos = widget_1.HPos.right;
                    opt.targetVPos = widget_1.VPos.top;
                    opt.selfHPos = widget_1.HPos.left;
                    opt.selfVPos = widget_1.VPos.top;
                    break;
                case 'left':
                case widget_1.Position.left:
                    opt.targetHPos = widget_1.HPos.left;
                    opt.targetVPos = widget_1.VPos.top;
                    opt.selfHPos = widget_1.HPos.right;
                    opt.selfVPos = widget_1.VPos.top;
                    break;
                default:
                    opt.targetHPos = widget_1.HPos.left;
                    opt.targetVPos = widget_1.VPos.bottom;
                    opt.selfHPos = widget_1.HPos.left;
                    opt.selfVPos = widget_1.VPos.top;
                    break;
            }
            var target = props.target;
            if (!target) {
                target = this.getDOM();
            }
            popup.show(target, opt);
        };
        MenuItem.prototype.getRenderSclass = function () {
            var str = [_super.prototype.getRenderSclass.call(this)];
            var props = this.props;
            if (props.disabled) {
                str.push('wk-disabled');
            }
            return str.join(' ');
        };
        MenuItem.prototype.getRenderChildren = function () {
            var _this = this;
            var children = [];
            var props = this.props;
            var onAClick = props.disabled ? undefined : function (evt) {
                var props = _this.props;
                if (!props.href) {
                    evt.preventDefault();
                }
                if (props.children) {
                    _this.togglePopup();
                }
                if (props.doClick) {
                    if (!props.doClick(props.value)) {
                        hideMenu();
                    }
                }
                else if (!props.children) {
                    hideMenu();
                }
            };
            var aChildren = [];
            if (props.fonticon) {
                aChildren.push(React.createElement(widget_1.Fonticon, {className: props.fonticon + ' wk-icon'}));
            }
            if (props.label) {
                aChildren.push(React.createElement("span", null, props.label));
            }
            if (props.children) {
                var fonticon = props.popupFonticon;
                var ext = void 0;
                var reverse = void 0;
                switch (props.popupSide) {
                    case 'top':
                    case widget_1.Position.top:
                        fonticon = fonticon ? fonticon : 'fa fa-caret-up fa-fw';
                        ext = 'wk-popup-top';
                        break;
                    case 'right':
                    case widget_1.Position.right:
                        fonticon = fonticon ? fonticon : 'fa fa-caret-right fa-fw';
                        ext = 'wk-popup-right';
                        break;
                    case 'left':
                    case widget_1.Position.left:
                        fonticon = fonticon ? fonticon : 'fa fa-caret-left fa-fw';
                        ext = 'wk-popup-left';
                        reverse = true;
                        break;
                    default:
                        fonticon = fonticon ? fonticon : 'fa fa-caret-down fa-fw';
                        ext = 'wk-popup-bottom';
                        break;
                }
                var popupicon = React.createElement(widget_1.Fonticon, {className: fonticon + ' ' + ext});
                if (reverse) {
                    aChildren.unshift(popupicon);
                }
                else {
                    aChildren.push(popupicon);
                }
            }
            var aProps = {
                href: props.disabled ? undefined : props.href ? props.href : '',
                target: props.target,
                onClick: onAClick,
                onFocus: function () { _this.addSclass('wk-focus'); },
                onBlur: function () { _this.removeSclass('wk-focus'); },
                onMouseDown: function () { _this.addSclass('wk-active'); },
                onMouseUp: function () { _this.removeSclass('wk-active'); },
                onMouseOut: function () { _this.removeSclass('wk-active'); },
            };
            children.push(Widget.createReactElement('a', aProps, aChildren));
            if (props.children) {
                children.push(React.createElement(popup_1.Popup, {ref: 'popup'}, props.children));
            }
            return children;
        };
        MenuItem.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
        return MenuItem;
    }(Widget.Widget));
    exports.MenuItem = MenuItem;
    var MenuSeparator = (function (_super) {
        __extends(MenuSeparator, _super);
        function MenuSeparator() {
            _super.apply(this, arguments);
        }
        MenuSeparator.prototype.getWidgetSclass = function () {
            return 'wkw-menuseparator';
        };
        MenuSeparator.prototype.getRenderSclass = function () {
            var str = [];
            str.push(_super.prototype.getRenderSclass.call(this));
            switch (this.props.orient) {
                case 'vertical':
                case widget_1.Orient.vertical:
                    str.push('wk-vertical');
                    break;
                default:
                    str.push('wk-horizontal');
                    break;
            }
            return str.join(' ');
        };
        MenuSeparator.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
        return MenuSeparator;
    }(Widget.Widget));
    exports.MenuSeparator = MenuSeparator;
    function hideMenu(holder) {
        if (holder === void 0) { holder = undefined; }
        popup_1.hideAutoDismiss(holder);
    }
    exports.hideMenu = hideMenu;
});

//# sourceMappingURL=srcmap/menu.js.map
