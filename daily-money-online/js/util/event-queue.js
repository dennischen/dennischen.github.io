define(["require", "exports"], function (require, exports) {
    "use strict";
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

//# sourceMappingURL=../../srcmap/util/event-queue.js.map
