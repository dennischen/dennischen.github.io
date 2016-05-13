var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', 'react-dom', '../widget/layout'], function (require, exports, React, ReactDOM, l) {
    "use strict";
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.visible = false;
            this.state = { clickCount: 0 };
        }
        App.prototype.componentDidMount = function () {
        };
        App.prototype.handleClick = function () {
            var c = this.state.clickCount + 1;
            this.setState({ clickCount: c });
            this.visible = !this.visible;
        };
        App.prototype.render = function () {
            return (React.createElement(l.Hlayout, {vflex: 1, style: { background: 'lightgreen', width: 600.65, marginLeft: 60.6, paddingLeft: 40.2, borderLeft: 'blue solid 20px', borderLeftWidth: 20 }}));
        };
        return App;
    }(React.Component));
    ReactDOM.render(React.createElement(App, null), document.getElementById('content'));
});

//# sourceMappingURL=../../srcmap/test/test-simple.js.map
