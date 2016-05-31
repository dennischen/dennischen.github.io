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
export declare enum AdjustMethod {
    shift = 1,
    flip = 2,
}
export interface ShowOption {
    autoDismiss?: boolean;
    dismissTimeout?: number;
    targetHPos?: Widget.HPos;
    targetVPos?: Widget.VPos;
    targetMouseEvent?: MouseEvent;
    selfHPos?: Widget.HPos;
    selfVPos?: Widget.VPos;
    adjustX?: number;
    adjustY?: number;
    adjust?: AdjustMethod;
}
export interface PopupProps extends Widget.WidgetProps {
}
export interface PopupState extends Widget.WidgetState {
    left?: number;
    top?: number;
}
export declare class Popup extends Widget.Widget<PopupProps, PopupState> {
    static defaultProps: PopupProps;
    private dismissCount;
    constructor(props: PopupProps);
    protected getId(): string;
    componentWillUnmount(): void;
    private onBodyClick;
    private removeBodyListener();
    show(target?: string | Element, opt?: ShowOption): void;
    reposition(target: string | Element, opt?: ShowOption): void;
    hide(): void;
    protected getWidgetSclass(): string;
    protected getRenderStyle(): React.CSSProperties;
}
