var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', 'react-dom', '../widget/widget', '../widget/layout'], function (require, exports, React, ReactDOM, w, l) {
    "use strict";
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.state = { clickCount: 0, longContent: React.createElement("span", {key: 0}, "Long Content, Long Content") };
        }
        App.prototype.componentDidMount = function () {
        };
        App.prototype.handleClick = function () {
            var c = this.state.clickCount + 1;
            var longContent = [this.state.longContent, React.createElement("br", {key: 'br' + c}), React.createElement("span", {key: c}, "Content for ", c)];
            this.setState({ clickCount: c, longContent: longContent });
        };
        App.prototype.render = function () {
            var _this = this;
            return (React.createElement(l.Vlayout, {vflex: 1, hflex: 1, style: { background: 'green', padding: '2px' }, space: 5}, React.createElement("button", {onClick: function (e) { _this.handleClick(); }}, "Click to enlarge Content ", this.state.clickCount), React.createElement(l.Hlayout, {style: { background: 'lightpink', padding: '2px' }}, React.createElement(l.Hlayout, {hflex: 1, style: { border: '1px solid', height: 80 }, align: 'top left'}, React.createElement("button", {style: { height: 40 }}, "btn1"), React.createElement(l.Box, {style: { border: '1px solid' }}, "A")), React.createElement(l.Hlayout, {hflex: 1, style: { border: '1px solid', height: 80 }, align: 'top center'}, React.createElement(l.Box, {style: { border: '1px solid' }}, "B"), React.createElement("button", {style: { height: 40 }}, "btn2")), React.createElement(l.Hlayout, {hflex: 1, style: { border: '1px solid', height: 80 }, align: 'top right'}, React.createElement(l.Box, {style: { border: '1px solid' }}, "C"), React.createElement("button", {style: { height: 40 }}, "btn3"))), React.createElement(l.Hlayout, {style: { background: 'lightpink', padding: '2px' }}, React.createElement(l.Hlayout, {hflex: 1, style: { border: '1px solid', height: 80 }, align: 'middle left'}, React.createElement("button", {style: { height: 40 }}, "btn1"), React.createElement(l.Box, {style: { border: '1px solid' }}, "A")), React.createElement(l.Hlayout, {hflex: 1, style: { border: '1px solid', height: 80 }, align: 'middle center'}, React.createElement(l.Box, {style: { border: '1px solid' }}, "B"), React.createElement("button", {style: { height: 40 }}, "btn2")), React.createElement(l.Hlayout, {hflex: 1, style: { border: '1px solid', height: 80 }, align: 'middle right'}, React.createElement(l.Box, {style: { border: '1px solid' }}, "C"), React.createElement("button", {style: { height: 40 }}, "btn3"))), React.createElement(l.Hlayout, {style: { background: 'lightpink', padding: '2px' }}, React.createElement(l.Hlayout, {hflex: 1, style: { border: '1px solid', height: 80 }, align: 'bottom left'}, React.createElement("button", {style: { height: 40 }}, "btn1"), React.createElement(l.Box, {style: { border: '1px solid' }}, "A")), React.createElement(l.Hlayout, {hflex: 1, style: { border: '1px solid', height: 80 }, align: 'bottom center'}, React.createElement(l.Box, {style: { border: '1px solid' }}, "B"), React.createElement("button", {style: { height: 40 }}, "btn2")), React.createElement(l.Hlayout, {hflex: 1, style: { border: '1px solid', height: 80 }, align: 'bottom right'}, React.createElement(l.Box, {style: { border: '1px solid' }}, "C"), React.createElement("button", {style: { height: 40 }}, "btn3"))), React.createElement(l.Hlayout, {hflex: 1, vflex: 1}, React.createElement(l.Vlayout, {vflex: 1, hflex: 1}, React.createElement(l.Hlayout, {vflex: 1, style: { background: 'lightgreen', overflowY: 'auto' }, valign: w.VPos.top}, React.createElement(l.Box, {hflex: 1, style: { border: '1px solid' }}, "A"), React.createElement(l.Box, {style: { border: '1px solid' }}, React.createElement("div", null, React.createElement("div", null, React.createElement("span", null, "B1")), React.createElement("div", null, React.createElement("span", null, "B2")))), React.createElement(l.Box, {hflex: 1, style: { border: '1px solid' }}, "C")), React.createElement(l.Hlayout, {vflex: 1, style: { background: 'lightblue', overflowY: 'auto' }, valign: w.VPos.middle}, React.createElement(l.Box, {hflex: 1, style: { border: '1px solid' }}, "A"), React.createElement(l.Box, {hflex: 1, style: { border: '1px solid' }}, React.createElement("div", null, React.createElement("div", null, "B1"), React.createElement("div", null, "B2"))), React.createElement("span", null, "C")), React.createElement(l.Hlayout, {vflex: 1, style: { background: 'lightyellow', overflowY: 'auto' }, valign: w.VPos.bottom}, "A", React.createElement(l.Box, {hflex: 1, style: { border: '1px solid' }}, React.createElement("div", null, React.createElement("div", null, "B1"), React.createElement("div", null, "B2"))), React.createElement(l.Box, {hflex: 1, style: { border: '1px solid' }}, "C")), React.createElement("button", null, "Do nothing button ", this.state.clickCount)), React.createElement(l.Hlayout, {vflex: 1, hflex: 1, align: 'middle center', style: { background: 'lightsalmon', overflowY: 'auto' }}, React.createElement("div", {style: { background: 'lightgreen', padding: 10 }}, this.state.longContent)))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    var content = document.getElementById('content');
    if (content) {
        ReactDOM.render(React.createElement(App, null), document.getElementById('content'));
    }
});

//# sourceMappingURL=../../srcmap/test/test-align.js.map
