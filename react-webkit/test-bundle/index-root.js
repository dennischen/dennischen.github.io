'use strict';

var wk = ReactWebKit;
var w = wk.Widget;
var i = wk.Input;
var l = wk.Layout;
var ls = wk.List;
var cal = wk.Calendar;
var m = wk.Menu;

var RootApp = React.createClass({
    getInitialState: function getInitialState() {
        return { clickCount: 0, invisible: false, selection: new w.IndexSelection() };
    },
    handleClick: function handleClick() {
        var c = this.state.clickCount + 1;
        this.setState({ clickCount: c, invisible: !this.state.invisible });
    },
    render: function render() {
        var _this = this;

        var doSelect = function doSelect(select, idx, item) {
            if (select) {
                _this.setState({ selection: _this.state.selection.select(idx) });
            } else {
                _this.setState({ selection: _this.state.selection.unselect(idx) });
            }
        };

        return React.createElement(
            l.Vlayout,
            { vflex: 1, hflex: 1, style: { padding: '2px' } },
            React.createElement(
                'button',
                { onClick: function onClick() {
                        _this.handleClick();
                    } },
                'Toggle visibility ',
                this.state.clickCount
            ),
            React.createElement(
                l.Hlayout,
                { invisible: this.state.invisible, style: { background: 'lightblue', padding: '2px' }, hflex: 1, animation: { effect: w.AniEffect.fade } },
                React.createElement(
                    l.Box,
                    { hflex: 1 },
                    React.createElement(
                        'span',
                        null,
                        'abc ',
                        this.state.clickCount
                    ),
                    ' '
                ),
                React.createElement(
                    l.Box,
                    { hflex: 1 },
                    React.createElement(
                        'span',
                        null,
                        'def ',
                        this.state.clickCount
                    ),
                    ' '
                ),
                React.createElement(
                    'span',
                    null,
                    React.createElement(
                        'span',
                        null,
                        'this is long long long',
                        React.createElement('br', null),
                        ' long long long long text'
                    )
                )
            ),
            React.createElement(
                l.Hlayout,
                { style: { background: 'gray', padding: '2px' }, vflex: 1, space: 10 },
                React.createElement(
                    'span',
                    null,
                    '123  ',
                    this.state.clickCount,
                    ' '
                ),
                React.createElement(
                    l.Vlayout,
                    { style: { background: 'lightpink', padding: '2px' }, hflex: 1, vflex: 1 },
                    React.createElement(
                        'span',
                        null,
                        'xyz1 ',
                        this.state.clickCount,
                        ' '
                    ),
                    React.createElement(cal.Datebox, null),
                    React.createElement(cal.Calendar, { hflex: 1, vflex: 1 })
                ),
                React.createElement(
                    l.Vlayout,
                    { invisible: this.state.invisible, style: { background: 'lightseagreen', padding: '2px' }, hflex: 2, animation: { effect: w.AniEffect.slide } },
                    React.createElement(
                        'span',
                        null,
                        'xyz2 ',
                        this.state.clickCount,
                        ' '
                    ),
                    React.createElement(m.MenuItem, { label: 'Copy', value: 'copy' }),
                    React.createElement(m.MenuItem, { label: 'Paste' }),
                    React.createElement(
                        m.MenuItem,
                        { label: 'Preferences', popupSide: 'right' },
                        React.createElement(
                            l.Vlayout,
                            null,
                            React.createElement(m.MenuItem, { label: 'Font' }),
                            React.createElement(m.MenuItem, { label: 'Color' }),
                            React.createElement(m.MenuItem, { label: 'Format' })
                        )
                    ),
                    React.createElement(m.MenuItem, { label: 'Disabled', disabled: true })
                ),
                React.createElement(
                    l.Vlayout,
                    { style: { background: 'lightskyblue', padding: '2px' }, hflex: 1 },
                    React.createElement(
                        'span',
                        null,
                        'xyz3 ',
                        this.state.clickCount,
                        ' '
                    ),
                    React.createElement(
                        'span',
                        null,
                        'ijk3 ',
                        this.state.clickCount,
                        ' '
                    )
                ),
                React.createElement(
                    'span',
                    null,
                    '456  ',
                    this.state.clickCount,
                    ' '
                )
            ),
            React.createElement(
                ls.List,
                { style: { background: 'lightblue', padding: '2px' },
                    vflex: 1, hflex: 1, selection: this.state.selection,
                    doSelect: doSelect },
                React.createElement(
                    'span',
                    null,
                    'MULTIPLE Selection List'
                ),
                React.createElement(
                    'span',
                    null,
                    'DEF'
                ),
                React.createElement(
                    'span',
                    null,
                    'IJK'
                ),
                React.createElement(
                    'span',
                    null,
                    'LMN'
                ),
                React.createElement(
                    'span',
                    null,
                    'AAA'
                )
            ),
            React.createElement(
                l.Hlayout,
                { align: 'middle', space: 4, tooltip: 'A tool tip' },
                React.createElement(i.Checkbox, { label: 'A Checkbox' }),
                React.createElement(i.Radiobox, { label: 'A Radio' }),
                React.createElement(i.Textbox, { tooltip: 'Another tool tip' }),
                React.createElement(cal.Datebox, null)
            )
        );
    }
});

RootApp.render = function (dom) {
    ReactDOM.render(React.createElement(RootApp, null), dom);
};
//# sourceMappingURL=srcmap/index-root.js.map
