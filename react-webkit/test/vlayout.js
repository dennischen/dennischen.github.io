var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', 'react-dom', 'react-webkit/layout'], function (require, exports, React, ReactDOM, l) {
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
            return (React.createElement(l.Vlayout, {vflex: 1, hflex: 1, style: { padding: '2px' }, space: 10}, React.createElement("div", null, "in Div AA"), React.createElement(l.Hlayout, {vflex: 1, hflex: 1, style: { padding: '2px' }}, React.createElement(l.Vlayout, {align: 'left top', hflex: 1, vflex: 1, style: { border: '1px solid' }}, "Left ", React.createElement("br", null), " Top"), React.createElement(l.Vlayout, {align: 'center top', hflex: 1, vflex: 1, style: { border: '1px solid' }}, "Center ", React.createElement("br", null), " Top"), React.createElement(l.Vlayout, {align: 'right top', hflex: 1, vflex: 1, style: { border: '1px solid' }}, "Right ", React.createElement("br", null), " Top")), React.createElement(l.Hlayout, {vflex: 1, hflex: 1, style: { padding: '2px' }}, React.createElement(l.Vlayout, {align: 'left middle', hflex: 1, vflex: 1, style: { border: '1px solid' }}, "Left ", React.createElement("br", null), " Middle"), React.createElement(l.Vlayout, {align: 'center middle', hflex: 1, vflex: 1, style: { border: '1px solid', overflowY: 'auto' }}, "Center ", React.createElement("br", null), " Middle ", React.createElement("br", null), "Long Content ", React.createElement("br", null), " Long Content ", React.createElement("br", null), "Long Content", React.createElement("br", null), "Long Content ", React.createElement("br", null), " Long Content ", React.createElement("br", null), "Long Content", React.createElement("br", null)), React.createElement(l.Vlayout, {align: 'right middle', hflex: 1, vflex: 1, style: { border: '1px solid' }}, "Right ", React.createElement("br", null), " Middle")), React.createElement(l.Hlayout, {vflex: 1, hflex: 1, style: { padding: '2px' }}, React.createElement(l.Vlayout, {align: 'left bottom', hflex: 1, vflex: 1, style: { border: '1px solid' }}, "Left ", React.createElement("br", null), " Bottom"), React.createElement(l.Vlayout, {align: 'center bottom', hflex: 1, vflex: 1, style: { border: '1px solid' }}, "Center ", React.createElement("br", null), " Bottom"), React.createElement(l.Vlayout, {align: 'right bottom', hflex: 1, vflex: 1, style: { border: '1px solid' }}, "Right ", React.createElement("br", null), " Bottom")), React.createElement("div", null, "in Div BB")));
        };
        return App;
    }(React.Component));
    exports.App = App;
    var content = document.getElementById('content');
    if (content) {
        ReactDOM.render(React.createElement(App, null), document.getElementById('content'));
    }
});

//# sourceMappingURL=srcmap/vlayout.js.map
