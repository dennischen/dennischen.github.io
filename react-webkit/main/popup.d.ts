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
import { VPos, HPos } from './widget';
export declare var zIndexStart: number;
export declare enum AdjustMethod {
    shift = 1,
    flip = 2,
}
export interface ShowOption {
    autoDismiss?: boolean;
    autoDismissHolders?: any[];
    dismissTimeout?: number;
    targetHPos?: HPos | string;
    targetVPos?: VPos | string;
    selfHPos?: HPos | string;
    selfVPos?: VPos | string;
    adjustX?: number;
    adjustY?: number;
    adjust?: AdjustMethod | string;
    adjustViewport?: string | Element | JQuery;
}
export interface PopupProps extends Widget.WidgetProps {
    showOption?: ShowOption;
}
export interface PopupState extends Widget.WidgetState {
    left?: number;
    top?: number;
    zIndex?: number;
}
export declare class Popup extends Widget.Widget<PopupProps, PopupState> {
    static defaultProps: PopupProps;
    private dismissCount;
    constructor(props: PopupProps);
    protected getId(): string;
    componentWillUnmount(): void;
    private onBodyClick;
    private onBodyKeyUp;
    private removeBodyListener();
    show(target?: string | Element | MouseEvent, showOpt?: ShowOption): void;
    reposition(target: string | Element | MouseEvent, showOpt: ShowOption): void;
    hide(): void;
    protected afterAnimation(): void;
    getWidgetSclass(): string;
    protected getRenderStyle(): React.CSSProperties;
}
export declare function hideAutoDismiss(holder?: string | Element | JQuery): void;
