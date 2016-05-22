var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', 'react-dom', 'react-webkit'], function (require, exports, React, ReactDOM, wbk) {
    "use strict";
    var w = wbk.Widget;
    var l = wbk.Layout;
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.state = { clickCount: 0, hidden: false, selection: new w.IndexSelection() };
        }
        App.prototype.handleClick = function () {
            var c = this.state.clickCount + 1;
            this.setState({ clickCount: c, hidden: !this.state.hidden });
        };
        App.prototype.render = function () {
            var _this = this;
            var doSelect = function (select, idx, item) {
                if (select) {
                    _this.setState({ selection: _this.state.selection.select(idx) });
                }
                else {
                    _this.setState({ selection: _this.state.selection.unselect(idx) });
                }
            };
            return (React.createElement(l.Vlayout, {vflex: 1, hflex: 1, style: { padding: '2px' }}, React.createElement("button", {onClick: function () { _this.handleClick(); }}, "Toggle visibility ", this.state.clickCount), React.createElement(l.Hlayout, {hidden: this.state.hidden, style: { background: 'lightblue', padding: '2px' }, hflex: 1, animation: { effect: w.AniEffect.fade }}, React.createElement(l.Box, {hflex: 1}, React.createElement("span", null, "abc ", this.state.clickCount), " "), React.createElement(l.Box, {hflex: 1}, React.createElement("span", null, "def ", this.state.clickCount), " "), React.createElement("span", null, React.createElement("span", null, "this is long long long", React.createElement("br", null), " long long long long text"))), React.createElement(l.Hlayout, {style: { background: 'gray', padding: '2px' }, vflex: 1, space: 10}, React.createElement("span", null, "123  ", this.state.clickCount, " "), React.createElement(l.Vlayout, {style: { background: 'lightpink', padding: '2px', overflowY: 'auto' }, hflex: 1, vflex: 1}, React.createElement("span", null, "xyz1 ", this.state.clickCount, " "), React.createElement("span", null, "ijk1 ", this.state.clickCount, " lkasdl falsjdfl asjdlfa jsdlfjal sdfjlasj dflasjdf lajsdlfjas ldfkjald falsdjl asdjfls djf")), React.createElement(l.Vlayout, {hidden: this.state.hidden, style: { background: 'lightseagreen', padding: '2px' }, hflex: 2, animation: { effect: w.AniEffect.slide }}, React.createElement("span", null, "xyz2 ", this.state.clickCount, " "), React.createElement("span", null, "ijk2 ", this.state.clickCount, " ")), React.createElement(l.Vlayout, {style: { background: 'lightskyblue', padding: '2px' }, hflex: 1}, React.createElement("span", null, "xyz3 ", this.state.clickCount, " "), React.createElement("span", null, "ijk3 ", this.state.clickCount, " ")), React.createElement("span", null, "456  ", this.state.clickCount, " ")), React.createElement(w.List, {style: { background: 'lightblue', padding: '2px' }, vflex: 1, hflex: 1, selection: this.state.selection, doSelect: doSelect}, React.createElement("span", null, "MULTIPLE Selection List"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ")), React.createElement(w.Checkbox, {label: 'A Checkbox'})));
        };
        return App;
    }(React.Component));
    exports.App = App;
    ReactDOM.render(React.createElement(App, null), document.getElementById('content-index'));
});

//# sourceMappingURL=srcmap/index-bundle.js.map