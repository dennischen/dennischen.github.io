/**
 * React WebKit - v0.0.5
 * The react web widget kit base on typescript
 * 
 * Copyright 2016 - present, Dennis Chen, All rights reserved.
 * 
 * Released under MIT license
 */
/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
/// <reference path="../3rd-definition/jquery.d.ts" />
/// <reference path="embedded/moment.d.ts" />
import React = require('react');
import Widget = require('./widget');
export declare enum View {
    year = 1,
    month = 2,
    date = 3,
    time = 4,
}
export interface CalendarProps extends Widget.WidgetProps {
    selected?: Date;
    firstDayOfWeek?: number;
    doSelect?: (date: Date) => void;
}
export interface CalendarState {
    viewingDate?: Date;
    view?: View;
    uncontrolled?: Date;
}
export declare class Calendar extends Widget.Widget<CalendarProps, CalendarState> {
    static defaultProps: CalendarProps;
    constructor(props: CalendarProps);
    private isUncontrolled();
    private getSelectedDate();
    componentWillReceiveProps(nextProps: CalendarProps): void;
    private doReset();
    private doToday();
    private doClean();
    private doYearView();
    private doMonthView();
    private doDateView();
    private doTimeView();
    private doYearSelect(year);
    private doYearShift(increase);
    private doMonthSelect(month);
    private doMonthShift(increase);
    private doDateSelect(date);
    private doDateShift(increase);
    getWidgetSclass(): string;
    protected getRenderChildren(): React.ReactNode;
    protected getRenderStyle(): React.CSSProperties;
}
export interface YearViewProps extends Widget.ComponentProps {
    selectedDate?: Date;
    viewingDate: Date;
    doSelect: (year: number) => void;
    doTitleShift: (increase: boolean) => void;
}
export interface YearViewState {
}
export interface MonthViewProps extends Widget.ComponentProps {
    selectedDate?: Date;
    viewingDate: Date;
    doSelect: (month: number) => void;
    doTitleClick: () => void;
    doTitleShift: (increase: boolean) => void;
}
export interface MonthViewState {
}
export interface DateViewProps extends Widget.ComponentProps {
    selectedDate?: Date;
    firstDayOfWeek?: number;
    viewingDate: Date;
    doSelect: (date: number) => void;
    doTitleClick: () => void;
    doTitleShift: (increase: boolean) => void;
}
export interface DateViewState {
}
export interface TimeViewProps extends Widget.ComponentProps {
    viewDate: Date;
    doSelect: (hour: number, minute: number) => void;
}
export interface TimeViewState {
    currentHour: number;
    currentMinute: number;
}
export interface TitlebarProps extends Widget.ComponentProps {
    title: string;
    doTitleShift?: (increase: boolean) => void;
    doTitleClick?: () => void;
}
