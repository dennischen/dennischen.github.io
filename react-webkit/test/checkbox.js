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
            this.state = { msg: 'start to operation', checked: true };
        }
        App.prototype.componentDidMount = function () {
        };
        App.prototype.doCheck = function (checked) {
            this.setState({ msg: 'Checked ' + checked, checked: checked });
        };
        App.prototype.onChange = function (evt) {
            var checked = evt.target.checked;
            this.setState({ msg: 'Checked ' + checked, checked: checked });
        };
        App.prototype.render = function () {
            return (React.createElement(l.Vlayout, {vflex: 1, style: { padding: 10, background: 'lightblue' }, space: 10}, React.createElement(l.Hlayout, null, this.state.msg), React.createElement(w.Checkbox, {id: 'cb1', label: 'Label checkable', style: { fontSize: 40, background: 'lightpink' }, doCheck: this.doCheck.bind(this)}), React.createElement(w.Checkbox, {doCheck: this.doCheck.bind(this)}), "---------", React.createElement(w.Checkbox, {checked: this.state.checked, label: 'You can\' check this, the status follow the last checking'}), "---------", React.createElement(w.Checkbox, {label: 'Free checkbox'}), React.createElement(w.Checkbox, {label: 'Disabled checkbox', disabled: true})));
        };
        return App;
    }(React.Component));
    exports.App = App;
    var content = document.getElementById('content');
    if (content) {
        ReactDOM.render(React.createElement(App, null), document.getElementById('content'));
    }
});

//# sourceMappingURL=srcmap/checkbox.js.map
