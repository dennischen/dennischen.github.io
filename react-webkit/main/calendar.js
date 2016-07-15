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
        define(["require", "exports", 'react', 'jquery', 'moment', './widget', './util', './widget', './layout', './input', './popup'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var Jq = require('jquery');
    var moment = require('moment');
    var Widget = require('./widget');
    var Util = require('./util');
    var widget_1 = require('./widget');
    var layout_1 = require('./layout');
    var input_1 = require('./input');
    var popup_1 = require('./popup');
    exports.defaultDateboxIcon = 'fa fa-calendar';
    exports.i18n = {
        dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
        ],
        longDayNames: [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        longMonthNames: [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        today: 'Today',
        reset: 'Reset',
        clean: 'Clean'
    };
    var minComputerYear = 1971;
    var yearGridBase = 3;
    var yearGridNumber = yearGridBase * 4;
    var monthGridBase = 3;
    (function (View) {
        View[View["year"] = 1] = "year";
        View[View["month"] = 2] = "month";
        View[View["date"] = 3] = "date";
        View[View["time"] = 4] = "time";
    })(exports.View || (exports.View = {}));
    var View = exports.View;
    var Calendar = (function (_super) {
        __extends(Calendar, _super);
        function Calendar(props) {
            _super.call(this, props);
            this.state.viewingDate = props.selected ? new Date(props.selected.getTime()) : new Date();
            this.state.view = View.date;
        }
        Calendar.prototype.isUncontrolled = function () {
            return undefined == this.props.selected;
        };
        Calendar.prototype.getSelectedDate = function () {
            if (this.isUncontrolled()) {
                return this.state.uncontrolled;
            }
            return this.props.selected;
        };
        Calendar.prototype.componentWillReceiveProps = function (nextProps) {
            _super.prototype.componentWillReceiveProps.call(this, nextProps);
            var props = this.props;
            if (props.selected != nextProps.selected) {
                if (nextProps.selected) {
                    this.setState({
                        viewingDate: new Date(nextProps.selected.getTime())
                    });
                }
            }
        };
        Calendar.prototype.doReset = function () {
            var selectedDate = this.getSelectedDate();
            this.setState({
                viewingDate: !selectedDate ? new Date() : new Date(selectedDate.getTime()),
                view: View.date
            });
        };
        Calendar.prototype.doToday = function () {
            var _this = this;
            var props = this.props;
            var today = new Date();
            if (props.doSelect) {
                this.props.doSelect(today);
            }
            this.safeTimeout(function () {
                _this.setState({
                    viewingDate: today,
                    uncontrolled: _this.isUncontrolled() ? today : undefined,
                    view: View.date
                });
            }, 0);
        };
        Calendar.prototype.doClean = function () {
            var _this = this;
            var props = this.props;
            if (props.doSelect) {
                this.props.doSelect(null);
            }
            this.safeTimeout(function () {
                _this.setState({
                    uncontrolled: undefined,
                    view: View.date
                });
            }, 0);
        };
        Calendar.prototype.doYearView = function () {
            this.setState({ view: View.year });
        };
        Calendar.prototype.doMonthView = function () {
            this.setState({ view: View.month });
        };
        Calendar.prototype.doDateView = function () {
            this.setState({ view: View.date });
        };
        Calendar.prototype.doTimeView = function () {
            this.setState({ view: View.time });
        };
        Calendar.prototype.doYearSelect = function (year) {
            var viewingDate = this.state.viewingDate;
            if (viewingDate.getFullYear() != year) {
                viewingDate = new Date(this.state.viewingDate.getTime());
                viewingDate.setFullYear(year);
            }
            this.setState({
                view: View.month,
                viewingDate: viewingDate
            });
        };
        Calendar.prototype.doYearShift = function (increase) {
            var viewingYear = this.state.viewingDate.getFullYear();
            var yearStart = viewingYear - (viewingYear - minComputerYear) % yearGridNumber;
            if (!increase && yearStart <= minComputerYear) {
                return;
            }
            var viewingDate = new Date(this.state.viewingDate.getTime());
            this.setState({
                viewingDate: Util.addDateField(viewingDate, Util.DateField.year, increase ? yearGridNumber : -yearGridNumber)
            });
        };
        Calendar.prototype.doMonthSelect = function (month) {
            var viewingDate = this.state.viewingDate;
            if (viewingDate.getMonth() != month) {
                viewingDate = new Date(this.state.viewingDate.getTime());
                viewingDate.setMonth(month);
            }
            this.setState({
                view: View.date,
                viewingDate: viewingDate
            });
        };
        Calendar.prototype.doMonthShift = function (increase) {
            var viewingYear = this.state.viewingDate.getFullYear();
            if (!increase && viewingYear <= minComputerYear) {
                return;
            }
            var viewingDate = new Date(this.state.viewingDate.getTime());
            this.setState({
                viewingDate: Util.addDateField(viewingDate, Util.DateField.year, increase ? 1 : -1)
            });
        };
        Calendar.prototype.doDateSelect = function (date) {
            var props = this.props;
            var selectedDate = new Date(this.state.viewingDate.getTime());
            selectedDate.setDate(date);
            if (props.doSelect) {
                this.props.doSelect(selectedDate);
            }
            if (this.isUncontrolled()) {
                this.setState({
                    viewingDate: selectedDate,
                    uncontrolled: selectedDate
                });
            }
        };
        Calendar.prototype.doDateShift = function (increase) {
            var viewingYear = this.state.viewingDate.getFullYear();
            var viewingMonth = this.state.viewingDate.getMonth();
            if (!increase && (viewingYear < minComputerYear || (viewingYear == minComputerYear && viewingMonth == 0))) {
                return;
            }
            var viewingDate = new Date(this.state.viewingDate.getTime());
            this.setState({
                viewingDate: Util.addDateField(viewingDate, Util.DateField.month, increase ? 1 : -1)
            });
        };
        Calendar.prototype.getWidgetSclass = function () {
            return 'wkw-calendar';
        };
        Calendar.prototype.getRenderChildren = function () {
            var props = this.props;
            var state = this.state;
            var selectedDate = this.getSelectedDate();
            var childrenNodes = [];
            switch (state.view) {
                case View.year:
                    childrenNodes.push(React.createElement(YearView, {key: 'year', selectedDate: selectedDate, viewingDate: state.viewingDate, doTitleShift: this.doYearShift.bind(this), doSelect: this.doYearSelect.bind(this)}));
                    break;
                case View.month:
                    childrenNodes.push(React.createElement(MonthView, {key: 'month', selectedDate: selectedDate, viewingDate: state.viewingDate, doTitleShift: this.doMonthShift.bind(this), doTitleClick: this.doYearView.bind(this), doSelect: this.doMonthSelect.bind(this)}));
                    break;
                case View.date:
                    childrenNodes.push(React.createElement(DateView, {key: 'date', selectedDate: selectedDate, viewingDate: state.viewingDate, firstDayOfWeek: props.firstDayOfWeek, doTitleShift: this.doDateShift.bind(this), doTitleClick: this.doMonthView.bind(this), doSelect: this.doDateSelect.bind(this)}));
                    break;
                case View.time:
            }
            childrenNodes.push(React.createElement(layout_1.Hgroup, {className: this.getWidgetSubSclass('bottombar'), hflex: 1, align: 'center'}, React.createElement(widget_1.Button, {className: 'wk-aux', onClick: this.doToday.bind(this)}, exports.i18n.today), React.createElement(widget_1.Button, {className: 'wk-aux', onClick: this.doClean.bind(this)}, exports.i18n.clean), React.createElement(widget_1.Button, {className: 'wk-aux', onClick: this.doReset.bind(this)}, exports.i18n.reset)));
            return Widget.createReactElement(layout_1.Box, { hflex: 1, vflex: 1 }, childrenNodes);
        };
        Calendar.prototype.getRenderStyle = function () {
            var props = this.props;
            var css = _super.prototype.getRenderStyle.call(this);
            if (!props.hflex && !css.width) {
                css.width = 260;
            }
            if (!props.vflex && !css.height) {
                css.height = 302;
            }
            return css;
        };
        Calendar.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
        return Calendar;
    }(Widget.Widget));
    exports.Calendar = Calendar;
    var YearView = (function (_super) {
        __extends(YearView, _super);
        function YearView(props) {
            _super.call(this, props);
        }
        YearView.prototype.doSelect = function (year) {
            this.props.doSelect(year);
        };
        YearView.prototype.render = function () {
            var props = this.props;
            var now = new Date();
            var todayYear = now.getFullYear();
            var viewingYear = props.viewingDate.getFullYear();
            var yearStart = viewingYear - (viewingYear - minComputerYear) % yearGridNumber;
            var selectedYear = props.selectedDate ? props.selectedDate.getFullYear() : undefined;
            var title = Util.formatString("{} - {}", yearStart, yearStart + yearGridNumber - 1);
            var tableChildren = [];
            var count = 0;
            var onActive = function (evt) {
                Jq(evt.currentTarget).addClass('wk-active');
            };
            var onUnactive = function (evt) {
                Jq(evt.currentTarget).removeClass('wk-active');
            };
            for (var r = 0;; r++) {
                var rowChildren = [];
                for (var c = 0; c < yearGridBase; c++) {
                    var year = yearStart + r * yearGridBase + c;
                    var clz = [];
                    if (year == selectedYear) {
                        clz.push('wk-selected');
                    }
                    if (year == todayYear) {
                        clz.push('wk-today');
                    }
                    rowChildren.push(React.createElement("td", {className: clz.join(' '), onMouseDown: onActive, onMouseUp: onUnactive, onMouseLeave: onUnactive, onClick: this.doSelect.bind(this, year)}, year));
                    count++;
                    if (count >= yearGridNumber) {
                        break;
                    }
                }
                if (rowChildren.length > 0) {
                    tableChildren.push(Widget.createReactElement('tr', {}, rowChildren));
                }
                if (count >= yearGridNumber) {
                    break;
                }
            }
            var tbody = Widget.createReactElement('tbody', {}, tableChildren);
            return React.createElement(layout_1.Box, {className: 'wkw-calendar-yearview', hflex: 1, vflex: 1}, React.createElement(Titlebar, {title: title, doTitleShift: props.doTitleShift}), React.createElement(layout_1.Box, {hflex: 1, vflex: 1}, React.createElement("table", {className: 'wkw-calendar-table'}, tbody)));
        };
        return YearView;
    }(Widget.Component));
    var MonthView = (function (_super) {
        __extends(MonthView, _super);
        function MonthView(props) {
            _super.call(this, props);
        }
        MonthView.prototype.doSelect = function (month) {
            this.props.doSelect(month);
        };
        MonthView.prototype.render = function () {
            var props = this.props;
            var now = new Date();
            var todayMonth = now.getMonth();
            var todayYear = now.getFullYear();
            var viewingMonth = props.viewingDate.getMonth();
            var viewingYear = props.viewingDate.getFullYear();
            var selectedMonth = props.selectedDate ? props.selectedDate.getMonth() : undefined;
            var selectedYear = props.selectedDate ? props.selectedDate.getFullYear() : undefined;
            var title = Util.formatString("{}", viewingYear);
            var tableChildren = [];
            var count = 0;
            var onActive = function (evt) {
                Jq(evt.currentTarget).addClass('wk-active');
            };
            var onUnactive = function (evt) {
                Jq(evt.currentTarget).removeClass('wk-active');
            };
            for (var r = 0;; r++) {
                var rowChildren = [];
                for (var c = 0; c < monthGridBase; c++) {
                    var month = r * monthGridBase + c;
                    var clz = [];
                    if (viewingYear == selectedYear && month == selectedMonth) {
                        clz.push('wk-selected');
                    }
                    if (viewingYear == todayYear && month == todayMonth) {
                        clz.push('wk-today');
                    }
                    rowChildren.push(React.createElement("td", {className: clz.join(' '), onMouseDown: onActive, onMouseUp: onUnactive, onMouseLeave: onUnactive, onClick: this.doSelect.bind(this, month)}, exports.i18n.monthNames[month]));
                    count++;
                    if (count >= 12) {
                        break;
                    }
                }
                if (rowChildren.length > 0) {
                    tableChildren.push(Widget.createReactElement('tr', {}, rowChildren));
                }
                if (count >= 12) {
                    break;
                }
            }
            var tbody = Widget.createReactElement('tbody', {}, tableChildren);
            return React.createElement(layout_1.Box, {className: 'wkw-calendar-monthview', hflex: 1, vflex: 1}, React.createElement(Titlebar, {title: title, doTitleClick: props.doTitleClick, doTitleShift: props.doTitleShift}), React.createElement(layout_1.Box, {hflex: 1, vflex: 1}, React.createElement("table", {className: 'wkw-calendar-table'}, tbody)));
        };
        return MonthView;
    }(Widget.Component));
    function getDaysOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }
    function getWeekDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }
    var DateView = (function (_super) {
        __extends(DateView, _super);
        function DateView(props) {
            _super.call(this, props);
        }
        DateView.prototype.doSelect = function (date) {
            this.props.doSelect(date);
        };
        DateView.prototype.render = function () {
            var props = this.props;
            var now = new Date();
            var todayDate = now.getDate();
            var todayMonth = now.getMonth();
            var todayYear = now.getFullYear();
            var viewingDate = props.viewingDate.getDate();
            var viewingMonth = props.viewingDate.getMonth();
            var viewingYear = props.viewingDate.getFullYear();
            var selectedDate = props.selectedDate ? props.selectedDate.getDate() : undefined;
            var selectedYear = props.selectedDate ? props.selectedDate.getFullYear() : undefined;
            var selectedMonth = props.selectedDate ? props.selectedDate.getMonth() : undefined;
            var daysOfMonth = getDaysOfMonth(props.viewingDate);
            var weekDayOfMonth = getWeekDayOfMonth(props.viewingDate);
            var prevDaysOfMonth = getDaysOfMonth(Util.addDateField(new Date(props.viewingDate.getTime()), Util.DateField.month, -1));
            var onActive = function (evt) {
                Jq(evt.currentTarget).addClass('wk-active');
            };
            var onUnactive = function (evt) {
                Jq(evt.currentTarget).removeClass('wk-active');
            };
            var title = Util.formatString("{} {}", exports.i18n.longMonthNames[viewingMonth], viewingYear);
            var tableRows = [];
            var firstDayOfWeek = props.firstDayOfWeek ? props.firstDayOfWeek : 0;
            var sundayIdx = firstDayOfWeek == 0 ? 0 : 7 - firstDayOfWeek;
            var firstDayIdx = sundayIdx == 0 ? weekDayOfMonth : weekDayOfMonth - 1;
            if (firstDayIdx <= 0) {
                firstDayIdx += 7;
            }
            var headerChildren = [];
            for (var c = 0; c < 7; c++) {
                var idx = firstDayOfWeek + c;
                while (idx >= 7) {
                    idx -= 7;
                }
                var clz = (c == sundayIdx) ? 'wk-sunday' : undefined;
                headerChildren.push(React.createElement("th", {className: clz}, exports.i18n.dayNames[idx]));
            }
            tableRows.push(Widget.createReactElement('tr', {}, headerChildren));
            for (var r = 0; r < 6; r++) {
                var rowChildren = [];
                for (var c = 0; c < 7; c++) {
                    var date = r * 7 + c;
                    date = date - firstDayIdx + 1;
                    var clz = [];
                    if (viewingYear == selectedYear && viewingMonth == selectedMonth
                        && date == selectedDate) {
                        clz.push('wk-selected');
                    }
                    if (viewingYear == todayYear && viewingMonth == todayMonth
                        && date == todayDate) {
                        clz.push('wk-today');
                    }
                    if (c == sundayIdx) {
                        clz.push('wk-sunday');
                    }
                    var label = void 0;
                    if (date <= 0) {
                        label = (prevDaysOfMonth + date);
                        clz.push('wk-date-prv-m');
                    }
                    else if (date > daysOfMonth) {
                        label = (date - daysOfMonth);
                        clz.push('wk-date-next-m');
                    }
                    else {
                        clz.push('wk-date');
                        label = date;
                    }
                    rowChildren.push(React.createElement("td", {className: clz.join(' '), onMouseDown: onActive, onMouseUp: onUnactive, onMouseLeave: onUnactive, onClick: this.doSelect.bind(this, date)}, label));
                }
                if (rowChildren.length > 0) {
                    tableRows.push(Widget.createReactElement('tr', {}, rowChildren));
                }
            }
            var tbody = Widget.createReactElement('tbody', {}, tableRows);
            return React.createElement(layout_1.Box, {className: 'wkw-calendar-dateview', hflex: 1, vflex: 1}, React.createElement(Titlebar, {title: title, doTitleClick: props.doTitleClick, doTitleShift: props.doTitleShift}), React.createElement(layout_1.Box, {hflex: 1, vflex: 1}, React.createElement("table", {className: 'wkw-calendar-table'}, tbody)));
        };
        return DateView;
    }(Widget.Component));
    var TimeView = (function (_super) {
        __extends(TimeView, _super);
        function TimeView(props) {
            _super.call(this, props);
        }
        TimeView.prototype.render = function () {
            return React.createElement("div", {className: 'wkw-calendar-time'});
        };
        return TimeView;
    }(Widget.Component));
    var Titlebar = (function (_super) {
        __extends(Titlebar, _super);
        function Titlebar(props) {
            _super.call(this, props);
        }
        Titlebar.prototype.render = function () {
            var props = this.props;
            var childrenNodes = [];
            if (props.doTitleShift) {
                childrenNodes.push(React.createElement("button", {className: 'wk-aux', onClick: function () { props.doTitleShift(false); }}, " < "));
            }
            childrenNodes.push(React.createElement(layout_1.Box, {hflex: 1, align: 'center'}, React.createElement("div", {className: props.doTitleClick ? 'wk-clickable' : undefined, onClick: props.doTitleClick}, " ", this.props.title)));
            if (props.doTitleShift) {
                childrenNodes.push(React.createElement("button", {className: 'wk-aux', onClick: function () { props.doTitleShift(true); }}, " > "));
            }
            return Widget.createReactElement(layout_1.Hlayout, { className: 'wkw-calendar-titlebar', hflex: 1, align: 'middle' }, childrenNodes);
        };
        return Titlebar;
    }(Widget.Component));
    var defaultDateboxPopupOption = {
        autoDismiss: true,
        targetHPos: widget_1.HPos.left,
        targetVPos: widget_1.VPos.bottom,
        selfHPos: widget_1.HPos.left,
        selfVPos: widget_1.VPos.top,
        adjust: popup_1.AdjustMethod.flip
    };
    function onNothing() { }
    var Datebox = (function (_super) {
        __extends(Datebox, _super);
        function Datebox() {
            _super.apply(this, arguments);
        }
        Datebox.prototype.getId = function () {
            var id = _super.prototype.getId.call(this);
            return undefined != id ? id : this.getPseudoId();
        };
        Datebox.prototype.getWidgetSclass = function () {
            return 'wkw-datebox';
        };
        Datebox.prototype.isUncontrolled = function () {
            return undefined == this.props.value;
        };
        Datebox.prototype.doCalendarToggle = function () {
            var props = this.props;
            var popup = this.refs['popup'];
            if (popup.state.invisible) {
                var opt = {
                    adjustViewport: props.calendarViewport,
                    autoDismissHolders: ['#' + this.getId()]
                };
                popup.show(this.getDOM(), Jq.extend(opt, defaultDateboxPopupOption));
            }
            else {
                popup.hide();
            }
        };
        Datebox.prototype.doCalendarSelect = function (date) {
            var props = this.props;
            if (props.doChange && !Util.isDateEquals(props.value, date, Util.DateField.date)
                && props.doChange(date)) {
                this.refs['popup'].hide();
            }
            if (this.isUncontrolled()) {
                this.setState({ uncontrolled: date });
                this.refs['popup'].hide();
            }
        };
        Datebox.prototype.onTextboxKeyUp = function (evt) {
            var popup = this.refs['popup'];
            var invisible = popup.state.invisible;
            if (invisible && evt.keyCode != 27) {
                var opt = {
                    autoDismissHolders: ['#' + this.getId()]
                };
                popup.show(this.getDOM(), Jq.extend(opt, defaultDateboxPopupOption));
            }
            else if (!invisible && evt.keyCode == 27) {
                popup.hide();
            }
        };
        Datebox.prototype.getRenderChildren = function () {
            var props = this.props;
            var id = this.getId();
            var icon = props.icon ? props.icon : exports.defaultDateboxIcon;
            var value = this.isUncontrolled() ? this.state.uncontrolled : props.value;
            var display = value ? moment(value).format(props.format ? props.format : 'LL') : '';
            var childrenNodes = [];
            childrenNodes.push(React.createElement(layout_1.Hgroup, {hflex: props.hflex, vflex: props.vflex, ref: 'inpgroup'}, React.createElement(input_1.Textbox, {hflex: props.hflex, vflex: props.vflex, value: display, disabled: props.disabled, placeholder: props.placeholder, name: props.name, onChange: onNothing, onKeyUp: this.onTextboxKeyUp.bind(this)}), React.createElement(widget_1.Button, {vflex: 1, disabled: props.disabled, onClick: this.doCalendarToggle.bind(this)}, React.createElement(widget_1.Fonticon, {className: icon}))));
            childrenNodes.push(React.createElement(popup_1.Popup, {ref: 'popup', animation: { effect: 'fade', eager: true, duration: 50 }}, React.createElement(Calendar, {className: 'wk-borderless', selected: value, firstDayOfWeek: props.firstDayOfWeek, doSelect: this.doCalendarSelect.bind(this)})));
            return childrenNodes;
        };
        Datebox.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
        return Datebox;
    }(Widget.Widget));
    exports.Datebox = Datebox;
});

//# sourceMappingURL=srcmap/calendar.js.map
