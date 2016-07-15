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
        define(["require", "exports", 'jquery', './widget', './widget', './util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var Jq = require('jquery');
    var Widget = require('./widget');
    var widget_1 = require('./widget');
    var Util = require('./util');
    exports.zIndexStart = 2000;
    (function (AdjustMethod) {
        AdjustMethod[AdjustMethod["shift"] = 1] = "shift";
        AdjustMethod[AdjustMethod["flip"] = 2] = "flip";
    })(exports.AdjustMethod || (exports.AdjustMethod = {}));
    var AdjustMethod = exports.AdjustMethod;
    var Popup = (function (_super) {
        __extends(Popup, _super);
        function Popup(props) {
            _super.call(this, props);
            this.dismissCount = 0;
            if (undefined == this.state.invisible) {
                this.state.invisible = true;
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
                Jq('body').off('click', this.onBodyClick);
                delete this.onBodyClick;
            }
            if (this.onBodyKeyUp) {
                Jq('body').off('keyup', this.onBodyKeyUp);
                delete this.onBodyKeyUp;
            }
        };
        Popup.prototype.show = function (target, showOpt) {
            var _this = this;
            if (target === void 0) { target = undefined; }
            if (showOpt === void 0) { showOpt = undefined; }
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
                }
                else {
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
                    var fnDismiss = function (evt) {
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
                    Jq('body').on('click', this.onBodyClick = fnDismiss);
                }
                if (!this.onBodyKeyUp) {
                    var fnDismiss = function (evt) {
                        if (evt.keyCode == 27) {
                            _this.hide();
                        }
                    };
                    Jq('body').on('keyup', this.onBodyKeyUp = fnDismiss);
                }
            }
            else {
                this.removeBodyListener();
            }
        };
        Popup.prototype.reposition = function (target, showOpt) {
            var props = this.props;
            var opt = showOpt ? showOpt : props.showOption ? props.showOption : {};
            var jqdom = Jq(this.getDOM());
            var jqp = jqdom.parent();
            var parentOffset = jqp.offset();
            var jqvp;
            if (undefined == opt.adjustViewport) {
                jqvp = Jq(document.body);
            }
            else if (opt.adjustViewport instanceof Jq) {
                jqvp = opt.adjustViewport;
            }
            else if ('boolean' == typeof opt.adjustViewport && opt.adjustViewport) {
                jqvp = jqp;
            }
            else {
                jqvp = Jq(opt.adjustViewport);
            }
            if (jqvp.length == 0) {
                throw 'can\'t find viewport dom for adjustment by ' + opt.adjustViewport;
            }
            var viewportScroll = {
                top: jqvp.scrollTop(),
                left: jqvp.scrollLeft()
            };
            var viewportOffset = jqvp.offset();
            var viewportSize = {
                height: jqvp[0].scrollHeight,
                width: jqvp[0].scrollWidth
            };
            var targetOffset;
            var targetSize;
            if (target) {
                var evt = target;
                if (evt.target && "pageX" in evt && "pageY" in evt) {
                    targetOffset = { top: evt.pageY, left: evt.pageX };
                    targetSize = { height: 0, width: 0 };
                }
                else {
                    var jqt = Jq(target);
                    targetOffset = jqt.offset();
                    targetSize = { height: Widget.getOutterHeight(jqt[0]), width: Widget.getOutterWidth(jqt[0]) };
                }
            }
            else {
                targetOffset = jqdom.offset();
                targetSize = { height: 0, width: 0 };
            }
            var visible = jqdom.is(":visible");
            if (!visible) {
                jqdom.show();
            }
            var selfSize = { height: Widget.getOutterHeight(jqdom[0]), width: Widget.getOutterWidth(jqdom[0]) };
            if (!visible) {
                jqdom.hide();
            }
            var selfOffset = calculatePopupOffset(targetOffset, targetSize, selfSize, opt);
            selfOffset.left += opt.adjustX | 0;
            selfOffset.top += opt.adjustY | 0;
            if (opt.adjust) {
                selfOffset = calculatePopupAdjustment(viewportScroll, viewportOffset, viewportSize, targetOffset, targetSize, selfOffset, selfSize, opt);
            }
            this.setState({ top: selfOffset.top - parentOffset.top + jqp.scrollTop(), left: selfOffset.left - parentOffset.left + jqp.scrollLeft() });
        };
        Popup.prototype.hide = function () {
            _super.prototype.hide.call(this);
            if (!this.props.animation) {
                this.setState({ zIndex: undefined });
            }
            this.removeBodyListener();
        };
        Popup.prototype.afterAnimation = function () {
            _super.prototype.afterAnimation.call(this);
            if (this.state.invisible) {
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
    }(Widget.Widget));
    exports.Popup = Popup;
    function calculatePopupOffset(targetOffset, targetSize, selfSize, opt) {
        if (opt === void 0) { opt = {}; }
        var left = targetOffset.left;
        var top = targetOffset.top;
        var pos = opt.targetHPos ? opt.targetHPos : 'right';
        switch (pos) {
            case 'right':
            case widget_1.HPos.right:
                left += targetSize.width;
                break;
            case 'center':
            case widget_1.HPos.center:
                left += targetSize.width / 2;
                break;
        }
        pos = opt.targetVPos ? opt.targetVPos : 'top';
        switch (pos) {
            case 'bottom':
            case widget_1.VPos.bottom:
                top += targetSize.height;
                break;
            case 'middle':
            case widget_1.VPos.middle:
                top += targetSize.height / 2;
                break;
        }
        pos = opt.selfHPos ? opt.selfHPos : 'left';
        switch (pos) {
            case 'right':
            case widget_1.HPos.right:
                left -= selfSize.width;
                break;
            case 'center':
            case widget_1.HPos.center:
                left -= selfSize.width / 2;
                break;
        }
        pos = opt.selfVPos ? opt.selfVPos : 'top';
        switch (pos) {
            case 'bottom':
            case widget_1.VPos.bottom:
                top -= selfSize.height;
                break;
            case 'middle':
            case widget_1.VPos.middle:
                top -= selfSize.height / 2;
                break;
        }
        return { top: top, left: left };
    }
    function calculatePopupAdjustment(viewportScroll, viewportOffset, viewportSize, targetOffset, targetSize, selfOffset, selfSize, opt) {
        if (opt === void 0) { opt = {}; }
        var adjOffset = {
            top: selfOffset.top,
            left: selfOffset.left
        };
        switch (opt.adjust) {
            case 'shift':
            case AdjustMethod.shift:
                var v1 = adjOffset.left + selfSize.width;
                var v2 = viewportOffset.left + viewportSize.width - viewportScroll.left;
                if (v1 > v2) {
                    adjOffset.left -= v1 - v2;
                }
                v1 = adjOffset.top + selfSize.height;
                v2 = viewportOffset.top + viewportSize.height - viewportScroll.top;
                if (v1 > v2) {
                    adjOffset.top -= v1 - v2;
                }
                if (adjOffset.left + viewportScroll.left < viewportOffset.left) {
                    adjOffset.left = viewportOffset.left - viewportScroll.left;
                }
                if (adjOffset.top + viewportScroll.top < viewportOffset.top) {
                    adjOffset.top = viewportOffset.top - viewportScroll.top;
                }
                break;
            case 'flip':
            case AdjustMethod.flip:
                var adjOpt = Util.supplyProps({ adjust: 'shift' }, opt);
                var flipped = false;
                v1 = adjOffset.left + selfSize.width;
                v2 = viewportOffset.left + viewportSize.width - viewportScroll.left;
                if (adjOffset.left + viewportScroll.left < viewportOffset.left || v1 > v2) {
                    adjOpt.selfHPos = flipHPos(adjOpt.selfHPos);
                    adjOpt.targetHPos = flipHPos(adjOpt.targetHPos);
                    flipped = true;
                }
                v1 = adjOffset.top + selfSize.height;
                v2 = viewportOffset.top + viewportSize.height - viewportScroll.top;
                if (adjOffset.top + viewportScroll.top < viewportOffset.top || v1 > v2) {
                    adjOpt.selfVPos = flipVPos(adjOpt.selfVPos);
                    adjOpt.targetVPos = flipVPos(adjOpt.targetVPos);
                    flipped = true;
                }
                if (flipped) {
                    adjOffset = calculatePopupOffset(targetOffset, targetSize, selfSize, adjOpt);
                    adjOffset = calculatePopupAdjustment(viewportScroll, viewportOffset, viewportSize, targetOffset, targetSize, adjOffset, selfSize, adjOpt);
                }
                break;
        }
        return adjOffset;
    }
    function flipVPos(pos) {
        switch (pos) {
            case 'top':
            case widget_1.VPos.top:
                return widget_1.VPos.bottom;
            case 'bottom':
            case widget_1.VPos.bottom:
                return widget_1.VPos.top;
        }
        return pos;
    }
    function flipHPos(pos) {
        switch (pos) {
            case 'left':
            case widget_1.HPos.left:
                return widget_1.HPos.right;
            case 'right':
            case widget_1.HPos.right:
                return widget_1.HPos.left;
        }
        return pos;
    }
});

//# sourceMappingURL=srcmap/popup.js.map
