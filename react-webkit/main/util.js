/**
 * React WebKit - v0.0.2
 * The react widget kit base on typescript
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
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
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
    var SimpleQueue = (function () {
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
            setTimeout(function () { _this.send(evt); }, timeout);
        };
        return SimpleQueue;
    }());
    exports.SimpleQueue = SimpleQueue;
});

//# sourceMappingURL=srcmap/util.js.map
