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
        AdjustMethod[AdjustMethod["flipinvert"] = 3] = "flipinvert";
    })(exports.AdjustMethod || (exports.AdjustMethod = {}));
    var AdjustMethod = exports.AdjustMethod;
    var Popup = (function (_super) {
        __extends(Popup, _super);
        function Popup(props) {
            _super.call(this, props);
            this._adc = 0;
            this.state.hidden = undefined === props.hidden ? true : props.hidden;
        }
        Popup.prototype.show = function (target, opt) {
            var _this = this;
            if (target === void 0) { target = undefined; }
            if (opt === void 0) { opt = {}; }
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
            if (target === void 0) { target = undefined; }
            if (opt === void 0) { opt = {}; }
            var props = this.props;
            var jqdom = Jq(this.getDOM());
            var jqp = jqdom.parent();
            var top = 0, left = 0;
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
    }(Widget.Widget));
    exports.Popup = Popup;
});

//# sourceMappingURL=srcmap/popup.js.map
