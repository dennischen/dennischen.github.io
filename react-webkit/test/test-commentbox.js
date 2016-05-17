var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', 'react-dom', './commentbox'], function (require, exports, React, ReactDOM, commentbox) {
    "use strict";
    var App = (function (_super) {
        __extends(App, _super);
        function App() {
            _super.apply(this, arguments);
        }
        App.prototype.render = function () {
            return (React.createElement("div", null, React.createElement(commentbox.CommentBox, {url: "/comments", pollInterval: 2000})));
        };
        return App;
    }(React.Component));
    ReactDOM.render(React.createElement(App, null), document.getElementById('content'));
});

//# sourceMappingURL=srcmap/test-commentbox.js.map
