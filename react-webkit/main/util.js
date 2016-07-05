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
    function addSalt(alphabet, salt) {
        var integer, j, i, v, p;
        var temp;
        if (!salt.length) {
            return alphabet;
        }
        for (i = alphabet.length - 1, v = 0, p = 0; i > 0; i--, v++) {
            v %= salt.length;
            p += integer = salt.charAt(v).charCodeAt(0);
            j = (integer + v + p) % i;
            temp = alphabet.charAt(j);
            alphabet = alphabet.substr(0, j) + alphabet.charAt(i) + alphabet.substr(j + 1);
            alphabet = alphabet.substr(0, i) + temp + alphabet.substr(i + 1);
        }
        return alphabet;
    }
    var ShortId = (function () {
        function ShortId(prefix, salt, alphabet) {
            if (prefix === void 0) { prefix = ''; }
            if (salt === void 0) { salt = 'betterthannever'; }
            if (alphabet === void 0) { alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'; }
            this.count = 0;
            this.reused = [];
            this.prefix = prefix;
            this.alphabet = addSalt(alphabet, salt);
        }
        ShortId.prototype.reuse = function (id) {
            this.reused.push(id);
        };
        ShortId.prototype.next = function () {
            if (this.reused.length > 0) {
                return this.reused.shift();
            }
            return this.hash(this.count++);
        };
        ShortId.prototype.hash = function (input) {
            var hash = [], length = this.alphabet.length;
            do {
                hash.unshift(this.alphabet[input % length]);
                input = Math.floor(input / length) - 1;
            } while (input >= 0);
            hash.unshift(this.prefix);
            return hash.join('');
        };
        return ShortId;
    }());
    exports.ShortId = ShortId;
    function formatString(str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!args || args.length == 0) {
            return str;
        }
        var l = str.length, argidx = 0;
        var sb = [];
        for (var i = 0; i < l; i++) {
            var c = str.charAt(i);
            if (c == '{') {
                if (i < l - 1 && str.charAt(i + 1) == '}' && argidx < args.length) {
                    sb.push(args[argidx]);
                    i++;
                    argidx++;
                    continue;
                }
            }
            sb.push(c);
        }
        return sb.join('');
    }
    exports.formatString = formatString;
    function isArray(obj) {
        return obj instanceof Array || Object.prototype.toString.call(obj) === '[object Array]';
    }
    exports.isArray = isArray;
    (function (DateField) {
        DateField[DateField["year"] = 1] = "year";
        DateField[DateField["month"] = 2] = "month";
        DateField[DateField["week"] = 3] = "week";
        DateField[DateField["date"] = 4] = "date";
        DateField[DateField["hour"] = 5] = "hour";
        DateField[DateField["minute"] = 6] = "minute";
        DateField[DateField["second"] = 7] = "second";
    })(exports.DateField || (exports.DateField = {}));
    var DateField = exports.DateField;
    var secondms = 1000;
    var minutems = secondms * 60;
    var hourms = minutems * 60;
    var datems = hourms * 24;
    var weekms = datems * 7;
    function addDateField(date, field, value) {
        var time = date.getTime();
        switch (field) {
            case DateField.year:
                date.setFullYear(date.getFullYear() + value);
                break;
            case DateField.month:
                var month = date.getMonth();
                date.setMonth(month + value);
                break;
            case DateField.week:
                date.setTime(time + (value * weekms));
                break;
            case DateField.date:
                date.setTime(time + (value * datems));
                break;
            case DateField.hour:
                date.setTime(time + (value * hourms));
                break;
            case DateField.minute:
                date.setTime(time + (value * minutems));
                break;
            case DateField.second:
                date.setTime(time + (value * secondms));
                break;
        }
        return date;
    }
    exports.addDateField = addDateField;
});

//# sourceMappingURL=srcmap/util.js.map
