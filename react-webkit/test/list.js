/**
 * React WebKit - v0.0.2
 * The react widget kit base on typescript
 * 
 * Copyright 2016 - present, Dennis Chen, All rights reserved.
 * 
 * Released under MIT license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'react', 'react-dom', '../main/widget', '../main/layout'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var w = require('../main/widget');
    var l = require('../main/layout');
    var Color = (function () {
        function Color() {
        }
        return Color;
    }());
    exports.Color = Color;
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.data = [{ code: 'yw', name: 'Yellow' }, { code: 'bl', name: 'Blue' }, { code: 'rd', name: 'Red' },
                { code: 'gr1', name: 'Green1' }, { code: 'gr2', name: 'Green2' }, { code: 'gr3', name: 'Green3' }, { code: 'gr4', name: 'Green4' }];
            this.state = {
                msg: 'start to operation',
                instanceSelection: new w.InstanceSelection(this.data[1]),
                keySelection: new w.KeySelection(function (item) { return item.code; }, this.data[3]),
                indexSelection: new w.IndexSelection(),
                count: 0,
                enabledDisselect: true
            };
        }
        App.prototype.componentDidMount = function () {
        };
        App.prototype.onMoveUp = function (evt) {
            var count = this.state.count + 1;
            this.setState({});
            if (count == 3) {
                var c_1 = this.data[3];
                c_1.code = 'newCode' + count;
            }
            var c = this.data.shift();
            this.data.push(c);
            this.setState({ msg: 'Moved List up', count: count });
        };
        App.prototype.onCheck = function (evt) {
            var checked = evt.target.checked;
            this.setState({ msg: 'Enabled disselect ' + evt.target.checked, enabledDisselect: checked });
        };
        App.prototype.onItemClick = function (evt, item) {
            console.log('Click on item ' + item.code + "," + item.name);
        };
        App.prototype.onItemDoubleClick = function (evt, item) {
            console.log('Item DbClick', item);
            evt.stopPropagation();
        };
        App.prototype.onListDoubleClick = function (evt) {
            console.log('List DbClick', evt.target);
        };
        App.prototype.render = function () {
            var _this = this;
            var instanceDoSelect = function (select, idx, item) {
                if (select) {
                    _this.setState({ msg: 'Instance Select ' + item.name, instanceSelection: new w.InstanceSelection(item) });
                }
                else if (_this.state.enabledDisselect) {
                    _this.setState({ msg: 'Instance Unselect ' + item.name, instanceSelection: _this.state.instanceSelection.unselect(item) });
                }
            };
            var instanceKeyDoSelect = function (select, idx, item) {
                if (select) {
                    _this.setState({ msg: 'Instance Key Select ' + item.name, keySelection: _this.state.keySelection.select(item) });
                }
                else if (_this.state.enabledDisselect) {
                    _this.setState({ msg: 'Instance Key Unselect ' + item.name, keySelection: _this.state.keySelection.unselect(item) });
                }
            };
            var itemRenderer = {
                key: function (idx, each) {
                    return each.code;
                },
                render: function (idx, each) {
                    return (React.createElement(l.Vlayout, {ref: 'item' + idx, onClick: function (e) { _this.onItemClick(e, each); }, onDoubleClick: function (e) { _this.onItemDoubleClick(e, each); }}, React.createElement("span", null, each.name), React.createElement("span", {style: { paddingLeft: 20 }}, "(", each.code, ") ")));
                }
            };
            var indexDoSelect = function (select, idx, item) {
                if (select) {
                    _this.setState({ msg: 'Index Select ' + idx, indexSelection: _this.state.indexSelection.select(idx) });
                }
                else if (_this.state.enabledDisselect) {
                    _this.setState({ msg: 'Index Disselect ' + idx, indexSelection: _this.state.indexSelection.unselect(idx) });
                }
            };
            console.log('>> instance selection ', this.state.instanceSelection.getSelection());
            console.log('>> instance key selection ', this.state.keySelection.getSelection());
            console.log('>> index selection ', this.state.indexSelection.getSelection());
            return (React.createElement(l.Vlayout, {vflex: 1, hflex: 1}, React.createElement(l.Hlayout, {align: 'middle'}, React.createElement("input", {onChange: this.onCheck.bind(this), type: 'checkbox', checked: this.state.enabledDisselect}), React.createElement("span", null, "enable disselect"), ", ", this.state.count), React.createElement(l.Hlayout, {align: 'middle'}, this.state.msg), React.createElement("h4", null, "Model List"), React.createElement("button", {onClick: this.onMoveUp.bind(this)}, "Move up"), React.createElement(l.Hlayout, {vflex: 1, hflex: 1}, React.createElement(w.List, {vflex: 1, hflex: 1, model: this.data, itemRenderer: itemRenderer, selection: this.state.instanceSelection, doSelect: instanceDoSelect, onDoubleClick: this.onListDoubleClick.bind(this)}), React.createElement(w.List, {vflex: 1, hflex: 1, model: this.data, style: { background: 'lightblue' }, itemRenderer: itemRenderer, selection: this.state.keySelection, doSelect: instanceKeyDoSelect, onDoubleClick: this.onListDoubleClick.bind(this)})), React.createElement("h4", null, "Static List"), React.createElement(l.Hlayout, {vflex: 1, hflex: 1}, React.createElement(w.List, {vflex: 1, hflex: 1, style: { background: 'gray' }, className: 'dark-bg', selection: this.state.indexSelection, doSelect: indexDoSelect}, React.createElement("span", null, "MULTIPLE Selection List"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ")), React.createElement(w.List, {vflex: 1, hflex: 1, style: { background: 'lightpink' }, onItemClick: function (evt, idx) { _this.setState({ msg: 'Item Clicked' + idx }); }, onItemDoubleClick: function (evt, idx) { _this.setState({ msg: 'Item Dbclicked' + idx }); }, onItemContextMenu: function (evt, idx) { _this.setState({ msg: 'Item Contextmenu' + idx }), evt.preventDefault(); }}, React.createElement("span", null, "NO Selection List"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ"))), React.createElement("h4", null, "Disabled List"), React.createElement(l.Hlayout, {vflex: 1, hflex: 1}, React.createElement(w.List, {vflex: 1, hflex: 1, disabled: true, style: { background: 'lightblue' }, selection: this.state.indexSelection}, React.createElement("span", null, "ABC"), React.createElement("span", null, "DEF"), React.createElement("span", null, "IJK"), React.createElement("span", null, "LMN"), React.createElement("span", null, "XYZ")))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/list.js.map
