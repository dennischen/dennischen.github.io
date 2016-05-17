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
            this.state = { clickCount: 0, hidden: true };
        }
        App.prototype.handleClick = function () {
            var c = this.state.clickCount + 1;
            this.setState({ clickCount: c, hidden: !this.state.hidden });
        };
        App.prototype.render = function () {
            var _this = this;
            return (React.createElement(l.Vlayout, {hflex: 1, vflex: 1}, React.createElement("button", {onClick: function () { _this.handleClick(); }}, "Toggle visibility ", this.state.clickCount), React.createElement(l.Hlayout, {hflex: 1, vflex: 1}, React.createElement(l.Vlayout, {hflex: 1, style: { background: 'yellow', padding: '2px' }}, React.createElement(l.Box, null, "Top"), React.createElement(l.Box, {hidden: this.state.hidden, style: { background: 'blue', padding: '2px' }, animation: { effect: w.AniEffect.fade, duration: 500 }}, "AAAA"), React.createElement(l.Box, null, "Bottom")), React.createElement(l.Vlayout, {hflex: 1, style: { background: 'yellow', padding: '2px' }}, React.createElement(l.Box, null, "Top"), React.createElement(l.Box, {hidden: !this.state.hidden, style: { background: 'blue', padding: '2px' }, animation: { effect: w.AniEffect.fade, duration: 500 }}, "AAAA"), React.createElement(l.Box, null, "Bottom")), React.createElement(l.Vlayout, {hflex: 1, style: { background: 'yellow', padding: '2px' }}, React.createElement(l.Box, null, "Top"), React.createElement(l.Box, {hidden: this.state.hidden, style: { background: 'green', padding: '2px' }, animation: { effect: w.AniEffect.slide, duration: 500 }}, "BBB"), React.createElement(l.Box, null, "Bottom")), React.createElement(l.Vlayout, {hflex: 1, style: { background: 'yellow', padding: '2px' }}, React.createElement(l.Box, null, "Top"), React.createElement(l.Box, {hidden: !this.state.hidden, style: { background: 'green', padding: '2px' }, animation: { effect: w.AniEffect.slide, duration: 500 }}, "BBB"), React.createElement(l.Box, null, "Bottom")), React.createElement(l.Vlayout, {hflex: 1, style: { background: 'yellow', padding: '2px' }}, React.createElement(l.Box, null, "Top"), React.createElement(l.Box, {hidden: this.state.hidden, style: { background: 'blue', padding: '2px' }, animation: { effect: w.AniEffect.fade, duration: 500 }}, "AAAA"), React.createElement(l.Box, {hidden: this.state.hidden, style: { background: 'green', padding: '2px' }, animation: { effect: w.AniEffect.slide, duration: 500 }}, "BBB"), React.createElement(l.Box, null, "Bottom")), React.createElement(l.Vlayout, {hflex: 1, style: { background: 'yellow', padding: '2px' }}, React.createElement(l.Box, null, "Top"), React.createElement(l.Box, {hidden: !this.state.hidden, style: { background: 'blue', padding: '2px' }, animation: { effect: w.AniEffect.fade, duration: 500 }}, "AAAA"), React.createElement(l.Box, {hidden: !this.state.hidden, style: { background: 'green', padding: '2px' }, animation: { effect: w.AniEffect.slide, duration: 500 }}, "BBB"), React.createElement(l.Box, null, "Bottom"))), React.createElement(l.Vlayout, {hflex: 1, vflex: 1}, React.createElement(l.Hlayout, {hflex: 1}, React.createElement(l.Box, null, "Left"), React.createElement(l.Box, {hidden: !this.state.hidden, style: { background: 'orange', padding: '2px' }, animation: { effect: w.AniEffect.slideLeft, duration: 500 }}, "AAAA"), React.createElement(l.Box, {hflex: 1, style: { width: '300px', background: 'yellow', padding: '2px' }}, "Right 1"), React.createElement(l.Box, {style: { background: 'yellow', padding: '2px', textAlign: 'right' }}, "Right 2")), React.createElement(l.Hlayout, {hflex: 1}, React.createElement(l.Box, null, "Left"), React.createElement(l.Box, {hidden: this.state.hidden, style: { background: 'orange', padding: '2px' }, animation: { effect: w.AniEffect.slideLeft, duration: 500 }}, "AAAA"), React.createElement(l.Box, {hflex: 1, style: { width: '300px', background: 'yellow', padding: '2px' }}, "Right 1"), React.createElement(l.Box, {style: { background: 'yellow', padding: '2px', textAlign: 'right' }}, "Right 2")))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    var content = document.getElementById('content');
    if (content) {
        ReactDOM.render(React.createElement(App, null), document.getElementById('content'));
    }
});

//# sourceMappingURL=srcmap/animate.js.map
