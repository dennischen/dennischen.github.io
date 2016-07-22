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
import React = require('react');
import Widget = require('./widget');
import { Orient, Position } from './widget';
export interface MenuItemProps extends Widget.WidgetProps {
    fonticon?: string;
    label?: string;
    href?: string;
    target?: string;
    popupSide?: Position | string;
    popupFonticon?: string;
    disabled?: boolean;
    value?: any;
    doClick?: (value: any) => boolean;
}
export declare class MenuItem extends Widget.Widget<MenuItemProps, any> {
    static defaultProps: MenuItemProps;
    protected getId(): string;
    getWidgetSclass(): string;
    protected togglePopup(): void;
    protected getRenderSclass(): string;
    protected getRenderChildren(): React.ReactNode;
}
export interface MenuSeparatorProps extends Widget.WidgetProps {
    orient?: Orient | string;
}
export declare class MenuSeparator extends Widget.Widget<MenuSeparatorProps, any> {
    static defaultProps: MenuSeparatorProps;
    getWidgetSclass(): string;
    protected getRenderSclass(): string;
}
export declare function hideMenu(holder?: string | Element | JQuery): void;
