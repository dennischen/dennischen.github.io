/**
 * React WebKit - v0.0.5
 * The react web widget kit base on typescript
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
        define(["require", "exports", 'react', 'react-dom', '../main/layout', '../main/menu'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var layout_1 = require('../main/layout');
    var menu_1 = require('../main/menu');
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
        }
        App.prototype.doClick = function (value) {
            console.log('click', value);
        };
        App.prototype.render = function () {
            return (React.createElement(layout_1.Vlayout, {hflex: 1, vflex: 1}, React.createElement(layout_1.Hlayout, {hflex: 1, style: { background: '#eee' }}, React.createElement(layout_1.Hlayout, {align: 'middle'}, React.createElement(menu_1.MenuItem, {label: 'Home', href: "http://dennischen.github.io/react-webkit/test/", target: '_blank'}), React.createElement(menu_1.MenuItem, {label: 'Edit', popupSide: 'bottom'}, React.createElement(layout_1.Vlayout, null, React.createElement(menu_1.MenuItem, {label: 'Copy', value: 'copy', doClick: this.doClick.bind(this)}), React.createElement(menu_1.MenuItem, {label: 'Paste'}), React.createElement(menu_1.MenuSeparator, null), React.createElement(menu_1.MenuItem, {label: 'Preferences', popupSide: 'right'}, React.createElement(layout_1.Vlayout, null, React.createElement(menu_1.MenuItem, {label: 'Font'}), React.createElement(menu_1.MenuItem, {label: 'Color'}), React.createElement(menu_1.MenuItem, {label: 'Format'}))), React.createElement(menu_1.MenuItem, {label: 'About', popupSide: 'right'}, React.createElement(layout_1.Vlayout, null, React.createElement(menu_1.MenuItem, {label: 'Version'}), React.createElement(menu_1.MenuItem, {label: 'Update'}), React.createElement(menu_1.MenuItem, {label: 'Site'}))), React.createElement(menu_1.MenuItem, {label: 'Disabled', disabled: true}))), React.createElement(menu_1.MenuItem, {label: 'Disabled', disabled: true}), React.createElement(menu_1.MenuItem, {label: 'Horizontal', popupSide: 'bottom'}, React.createElement(layout_1.Hlayout, null, React.createElement(menu_1.MenuItem, {label: 'Category 1'}), React.createElement(menu_1.MenuItem, {label: 'Category 2'}), React.createElement(menu_1.MenuSeparator, {vflex: 1, orient: 'vertical'}), React.createElement(menu_1.MenuItem, {label: 'Category 3'}, React.createElement(layout_1.Hlayout, null, React.createElement(menu_1.MenuItem, {label: 'Red'}), React.createElement(menu_1.MenuItem, {label: 'Green'}), React.createElement(menu_1.MenuItem, {label: 'Blue'}), React.createElement(menu_1.MenuItem, {label: 'Black'}), React.createElement(menu_1.MenuItem, {label: 'White'}), React.createElement(menu_1.MenuItem, {label: 'More'}, React.createElement(layout_1.Hlayout, null, React.createElement(menu_1.MenuItem, {label: 'White 1'}), React.createElement(menu_1.MenuItem, {label: 'White 2'}), React.createElement(menu_1.MenuItem, {label: 'White 3'}), React.createElement(menu_1.MenuItem, {label: 'White 4'}), React.createElement(menu_1.MenuItem, {label: 'White 6'}), React.createElement(menu_1.MenuItem, {label: 'White 7'}), React.createElement(menu_1.MenuItem, {label: 'White 8'}), React.createElement(menu_1.MenuItem, {label: 'White 9'})))))))), React.createElement(layout_1.Box, {hflex: 1}), React.createElement(layout_1.Hlayout, {align: 'right'}, React.createElement(menu_1.MenuItem, {fonticon: 'fa fa-envelope wkw-fonticon', label: '(0)', onClick: function () { alert('No mail for you'); }}), React.createElement(menu_1.MenuItem, {fonticon: 'fa fa-sign-out wkw-fonticon', onClick: function () { alert('you clicked logout'); }}))), React.createElement(layout_1.Box, {hflex: 1, vflex: 1, align: 'center middle'}, React.createElement(layout_1.Vlayout, {style: { background: '#eee', width: 200 }}, React.createElement(menu_1.MenuItem, {label: 'Top', popupSide: 'top', fonticon: 'fa fa-coffee fa-fw'}, React.createElement(layout_1.Vlayout, null, React.createElement(menu_1.MenuItem, {label: 'Copy'}), React.createElement(menu_1.MenuItem, {label: 'Paste'}))), React.createElement(menu_1.MenuItem, {label: 'Right', popupSide: 'right', fonticon: 'fa fa-eye fa-fw'}, React.createElement(layout_1.Vlayout, null, React.createElement(menu_1.MenuItem, {label: 'Copy'}), React.createElement(menu_1.MenuItem, {label: 'Paste'}))), React.createElement(menu_1.MenuItem, {label: 'Disabled', disabled: true, fonticon: 'fa-fw'}), React.createElement(menu_1.MenuSeparator, null), React.createElement(menu_1.MenuItem, {label: 'Left', popupSide: 'left'}, React.createElement(layout_1.Vlayout, null, React.createElement(menu_1.MenuItem, {label: 'Copy'}), React.createElement(menu_1.MenuItem, {label: 'Paste'}))), React.createElement(menu_1.MenuItem, {label: 'Bottom', popupSide: 'bottom', fonticon: 'fa-fw'}, React.createElement(layout_1.Vlayout, null, React.createElement(menu_1.MenuItem, {label: 'Copy'}), React.createElement(menu_1.MenuItem, {label: 'Paste'})))))));
        };
        return App;
    }(React.Component));
    exports.App = App;
    function render(dom) {
        ReactDOM.render(React.createElement(App, null), dom);
    }
    exports.render = render;
});

//# sourceMappingURL=srcmap/menu.js.map
