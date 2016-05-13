var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', 'react-dom', '../widget/widget', '../widget/layout'], function (require, exports, React, ReactDOM, w, l) {
    "use strict";
    var TestCase = (function () {
        function TestCase() {
        }
        return TestCase;
    }());
    var testCases = [
        { name: 'Align', module: 'test-align', html: 'align.html' },
        { name: 'Animate', module: 'test-animate', html: 'animate.html' },
        { name: 'Box', module: 'test-box', html: 'box.html' },
        { name: 'Checkbox', module: 'test-checkbox', html: 'checkbox.html' },
        { name: 'Layout', module: 'test-layout', html: 'layout.html' },
        { name: 'List', module: 'test-list', html: 'list.html' },
        { name: 'Size', module: 'test-size', html: 'size.html' },
    ];
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.caseRenderer = {
                key: function (idx, each) {
                    return idx;
                },
                render: function (index, each) {
                    return React.createElement("div", {style: { padding: 4 }}, each.name);
                }
            };
            this.state = {
                sidebar: true,
                content: React.createElement(l.Box, {hflex: 1, vflex: 1, align: 'middle center'}, React.createElement("h4", null, "Select left list item to load specific test case, ", React.createElement("br", null), " Double click to open test in new tab"))
            };
        }
        App.prototype.isCaseSelected = function (index, item) {
            return this.state.selectedCase == item;
        };
        App.prototype.doCaseSelect = function (select, idx, item) {
            if (select) {
                this.setState({ selectedCase: item });
                require([item.module], function (m) {
                    this.setState({ content: React.createElement(m.App, null) });
                }.bind(this));
            }
        };
        App.prototype.onCaseDoubleClick = function (evt, idx, item) {
            window.open(item.html, '_blank');
        };
        App.prototype.toggleMenu = function () {
            alert('Todo');
        };
        App.prototype.toggleSidebar = function () {
            this.setState({ sidebar: !this.state.sidebar });
        };
        App.prototype.render = function () {
            return (React.createElement(l.Vlayout, {hflex: 1, vflex: 1}, React.createElement(l.Hlayout, {id: 'banner', align: 'middle', space: 4}, React.createElement(l.Box, {className: 'menubtn', vflex: 1, align: 'middle center', onClick: this.toggleMenu.bind(this)}, React.createElement(w.Fonticon, {className: 'fa fa-bars'})), React.createElement("span", {className: 'title'}, "Toolkit - Tests")), React.createElement(l.Hlayout, {vflex: 1, hflex: 1}, React.createElement(l.Vlayout, {id: 'function', vflex: 1, hidden: !this.state.sidebar, animation: { effect: w.AniEffect.slideLeft }}, React.createElement(w.List, {vflex: 1, hflex: 1, style: { paddingTop: 4 }, onItemDoubleClick: this.onCaseDoubleClick.bind(this), model: testCases, itemRenderer: this.caseRenderer, selection: { isSelected: this.isCaseSelected.bind(this) }, doSelect: this.doCaseSelect.bind(this)})), React.createElement(l.Box, {id: 'testContent', hflex: 1, vflex: 1}, this.state.content)), React.createElement(l.Hlayout, {id: 'footer'}, React.createElement(l.Box, {className: 'fnbtn', vflex: 1, align: 'middle center', onClick: this.toggleSidebar.bind(this)}, React.createElement(w.Fonticon, {className: 'fa fa-angle-double-' + (this.state.sidebar ? 'left' : 'right')})), React.createElement(l.Box, {className: 'copyright', vflex: 1, hflex: 1, align: 'middle right'}, "Bottleworks Tookit © 2016"))));
        };
        return App;
    }(React.Component));
    ReactDOM.render(React.createElement(App, null), document.getElementById('content-all'));
});

//# sourceMappingURL=../../srcmap/test/test-all.js.map
