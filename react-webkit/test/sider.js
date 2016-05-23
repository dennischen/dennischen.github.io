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
            return (React.createElement(l.Hlayout, {vflex: 1, hflex: 1, style: { background: 'lightgreen', padding: 10 }}, React.createElement(l.Hsider, {vflex: 1, width: 200, minWidth: 100, maxWidth: 400, style: { background: 'lightpink' }}, "The sider 1"), React.createElement(l.Hsider, {vflex: 1, width: 200, style: { background: 'lightgray' }}, React.createElement(w.List, {vflex: 1, hflex: 1}, React.createElement("span", null, "ABC"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ"), React.createElement("span", null, "ABC"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ"), React.createElement("span", null, "ABC"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ"))), React.createElement(l.Vlayout, {hflex: 1, vflex: 1, style: { background: 'lightblue', padding: 10 }}, React.createElement(l.Vsider, {hflex: 1, height: 150, minHeight: 100, maxHeight: 200, style: { background: 'lightpink' }}, "The sider 2"), React.createElement(l.Vsider, {hflex: 1, height: 200, style: { background: 'lightgray' }}, "The sider 3"), React.createElement(w.List, {vflex: 1, hflex: 1}, React.createElement("span", null, "ABC"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ"), React.createElement("span", null, "ABC"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ"), React.createElement("span", null, "ABC"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ")))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/sider.js.map
