var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', 'react-dom', 'react-webkit/widget', 'react-webkit/layout'], function (require, exports, React, ReactDOM, w, l) {
    "use strict";
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.state = { clickCount: 0, hidden: false };
        }
        App.prototype.componentDidMount = function () {
        };
        App.prototype.handleClick = function () {
            console.log(this.refs);
            var c = this.state.clickCount + 1;
            this.setState({ clickCount: c, hidden: !this.state.hidden });
        };
        App.prototype.render = function () {
            var _this = this;
            return (React.createElement(l.Vlayout, {vflex: 1, hflex: 1, style: { background: 'yellow', padding: '2px' }}, React.createElement("button", {onClick: function () { _this.handleClick(); }}, "Toggle visibility ", this.state.clickCount), React.createElement("div", {ref: 'xyz'}, "in Div AA"), React.createElement(l.Hlayout, {hidden: this.state.hidden, style: { background: 'lightblue', padding: '2px' }, hflex: 1, animation: { effect: w.AniEffect.fade }}, React.createElement(l.Box, {ref: 'abc', hflex: 1}, React.createElement("span", null, "abc ", this.state.clickCount), " "), React.createElement(l.Box, {ref: 'def', hflex: 1}, React.createElement("span", null, "def ", this.state.clickCount), " "), React.createElement("span", null, React.createElement("span", null, "this is long long long", React.createElement("br", null), " long long long long text"))), React.createElement(l.Hlayout, {style: { background: 'gray', padding: '2px' }, vflex: 1, space: 10}, React.createElement("span", null, "123  ", this.state.clickCount, " "), React.createElement(l.Vlayout, {style: { background: 'lightpink', padding: '2px', overflowY: 'auto' }, hflex: 1, vflex: 1}, React.createElement("span", null, "xyz1 ", this.state.clickCount, " "), React.createElement("span", null, "ijk1 ", this.state.clickCount, " lkasdl falsjdfl asjdlfa jsdlfjal sdfjlasj dflasjdf lajsdlfjas ldfkjald falsdjl asdjfls djf")), React.createElement(l.Vlayout, {hidden: this.state.hidden, style: { background: 'lightseagreen', padding: '2px' }, hflex: 2, animation: { effect: w.AniEffect.slide }}, React.createElement("span", null, "xyz2 ", this.state.clickCount, " "), React.createElement("span", null, "ijk2 ", this.state.clickCount, " ")), React.createElement(l.Vlayout, {style: { background: 'lightskyblue', padding: '2px' }, hflex: 1}, React.createElement("span", null, "xyz3 ", this.state.clickCount, " "), React.createElement("span", null, "ijk3 ", this.state.clickCount, " ")), React.createElement("span", null, "456  ", this.state.clickCount, " ")), React.createElement(l.Vlayout, {style: { background: 'gray', padding: '2px' }, vflex: 1}, React.createElement(l.Box, {vflex: 1}, React.createElement(l.Vlayout, {hflex: 1, vflex: 1, space: 10}, React.createElement(l.Box, {vflex: 1, style: { background: 'lightgreen' }}, "callback div 1"), React.createElement(l.Box, {vflex: 1, style: { background: 'lightpink' }}, "callback div 2")))), React.createElement("div", null, "in Div BB")));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/layout.js.map
