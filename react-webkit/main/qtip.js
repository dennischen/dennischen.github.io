/**
 * React WebKit - v0.0.5
 * The react web widget kit base on typescript
 * 
 * Copyright 2016 - present, Dennis Chen, All rights reserved.
 * 
 * Released under MIT license
 */
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'jquery', './embedded/jquery.qtip'], factory);
    }
})(function (require, exports) {
    "use strict";
    var Jq = require('jquery');
    var Qtip = require('./embedded/jquery.qtip');
    var __QtipLoad = typeof Qtip;
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
        }
        else if (!(target instanceof Jq)) {
            target = Jq(target);
        }
        if ('string' == typeof tip || 'function' == typeof tip) {
            opt = Jq.extend(true, {
                content: {
                    text: tip
                }
            }, qtipDefaultOpt);
        }
        else {
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
        }
        else if (!(target instanceof Jq)) {
            target = Jq(target);
        }
        target.qtip('destroy', true);
    }
    exports.removeTip = removeTip;
});

//# sourceMappingURL=srcmap/qtip.js.map
