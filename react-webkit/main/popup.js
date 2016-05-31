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
        define(["require", "exports", 'jquery', './widget', './util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var Jq = require('jquery');
    var Widget = require('./widget');
    var Util = require('./util');
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
            this.state.hidden = undefined === props.hidden ? true : props.hidden;
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
        Popup.prototype.show = function (target, opt) {
            var _this = this;
            if (target === void 0) { target = undefined; }
            if (opt === void 0) { opt = {}; }
            var props = this.props;
            this.reposition(target, opt);
            _super.prototype.show.call(this);
            if (opt.dismissTimeout > 0) {
                this.dismissCount++;
                var timeout = opt.dismissTimeout;
                if (props.animation) {
                    timeout += props.animation.duration || Widget.DEFAULT_ANIMATION_DURATION;
                }
                setTimeout(function () {
                    _this.dismissCount--;
                    if (_this.dismissCount == 0) {
                        _this.hide();
                    }
                }, timeout);
            }
            if (opt.autoDismiss) {
                if (!this.onBodyClick) {
                    Jq('body').bind('click', this.onBodyClick = function (evt) {
                        if (Jq(evt.target).closest('#' + _this.getId()).length == 0) {
                            _this.hide();
                        }
                    });
                }
            }
            else {
                this.removeBodyListener();
            }
        };
        Popup.prototype.reposition = function (target, opt) {
            if (opt === void 0) { opt = {}; }
            var props = this.props;
            var jqdom = Jq(this.getDOM());
            var jqp = jqdom.parent();
            var targetPos = { x: 0, y: 0 };
            if (target) {
                var jqt = Jq(target);
                targetPos = calculatPopupTargetPos(jqt, jqp, opt);
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
            this.removeBodyListener();
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
    }(Widget.Widget));
    exports.Popup = Popup;
    function calculatPopupTargetPos(jqTarget, jqParent, opt) {
        if (opt === void 0) { opt = {}; }
        var targetPos = { x: 0, y: 0 };
        var targetOffset = jqTarget.offset();
        var parentOffset = jqParent.offset();
        if (opt.targetMouseEvent) {
            var evt = opt.targetMouseEvent;
            targetPos.x = evt.pageX - parentOffset.left + jqParent.scrollLeft();
            targetPos.y = evt.pageY - parentOffset.top + jqParent.scrollTop();
        }
        else {
            targetPos.x = targetOffset.left - parentOffset.left + jqParent.scrollLeft();
            targetPos.y = targetOffset.top - parentOffset.top + jqParent.scrollTop();
            var targetWidth = Widget.getOutterWidth(jqTarget[0]);
            var targetHeight = Widget.getOutterHeight(jqTarget[0]);
            switch (opt.targetHPos) {
                case Widget.HPos.right:
                    targetPos.x += targetWidth;
                    break;
                case Widget.HPos.center:
                    targetPos.x += targetWidth / 2;
                    break;
            }
            switch (opt.targetVPos) {
                case Widget.VPos.bottom:
                    targetPos.y += targetHeight;
                    break;
                case Widget.VPos.middle:
                    targetPos.y += targetHeight / 2;
                    break;
            }
        }
        return targetPos;
    }
    function calculatePopupSelfPos(targetPos, selfSize, opt) {
        if (opt === void 0) { opt = {}; }
        var left = targetPos.x;
        var top = targetPos.y;
        switch (opt.selfHPos) {
            case Widget.HPos.right:
                left -= selfSize.width;
                break;
            case Widget.HPos.center:
                left -= selfSize.width / 2;
                break;
        }
        switch (opt.selfVPos) {
            case Widget.VPos.bottom:
                top -= selfSize.height;
                break;
            case Widget.VPos.middle:
                top -= selfSize.height / 2;
                break;
        }
        return { x: left, y: top };
    }
    function calculatePopupAdjustPos(targetPos, selfPos, selfSize, parentScrollSize, opt) {
        if (opt === void 0) { opt = {}; }
        var psw = parentScrollSize.width;
        var psh = parentScrollSize.height;
        var adjPos = Util.overrideProps({}, selfPos);
        switch (opt.adjust) {
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
});

//# sourceMappingURL=srcmap/popup.js.map
