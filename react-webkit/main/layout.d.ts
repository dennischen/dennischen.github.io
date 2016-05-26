/**
 * React WebKit - v0.0.2
 * The react widget kit base on typescript
 * 
 * Copyright 2016 - present, Dennis Chen, All rights reserved.
 * 
 * Released under MIT license
 */
/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import Widget = require('./widget');
export interface BoxProps extends Widget.WidgetProps {
    valign?: Widget.VPos;
    halign?: Widget.HPos;
    align?: string;
}
export declare class Box extends Widget.Widget<BoxProps, any> {
    static defaultProps: BoxProps;
    protected getWidgetSclass(): string;
    protected getRenderSclass(): string;
}
export interface LayoutRenderContext {
    total?: number;
    anyVisible?: boolean;
}
export interface LayoutProps extends Widget.WidgetProps {
}
export declare abstract class Layout<P extends LayoutProps, S> extends Widget.Widget<P, S> {
    static defaultProps: LayoutProps;
    protected getContentDOM(idx: number): any;
    protected getRenderContentSclass(child: React.ReactChild, idx: number, ctx: LayoutRenderContext): string;
    protected getRenderContentStyle(child: React.ReactChild, idx: number, ctx: LayoutRenderContext): React.CSSProperties;
    protected getRenderChildren(): React.ReactNode;
}
export interface HlayoutProps extends LayoutProps {
    valign?: Widget.VPos;
    halign?: Widget.HPos;
    align?: string;
    space?: number | string;
}
export declare class Hlayout extends Layout<HlayoutProps, any> {
    static defaultProps: HlayoutProps;
    protected getWidgetSclass(): string;
    componentDidMount(): void;
    componentWillMount(): void;
    componentWillUnmount(): void;
    onQueueEvent(evt: Widget.WidgetQueueEvent): void;
    calculateContentSize(): void;
    protected getRenderContentStyle(child: React.ReactChild, idx: number, ctx: LayoutRenderContext): React.CSSProperties;
    protected getRenderSclass(): string;
}
export interface VlayoutProps extends LayoutProps {
    valign?: Widget.VPos;
    halign?: Widget.HPos;
    align?: string;
    space?: number | string;
}
export declare class Vlayout extends Layout<VlayoutProps, any> {
    static defaultProps: VlayoutProps;
    protected getWidgetSclass(): string;
    protected getRenderContentStyle(child: React.ReactChild, idx: number, ctx: LayoutRenderContext): React.CSSProperties;
    protected getRenderSclass(): string;
}
export interface SiderProps extends Widget.WidgetProps {
    orient?: Widget.Orient;
    size?: number;
    minSize?: number;
    maxSize?: number;
}
export interface SiderState {
    size?: number;
    resizing?: boolean;
}
export declare class Sider extends Widget.Widget<SiderProps, SiderState> {
    static defaultProps: SiderProps;
    constructor(props: SiderProps);
    protected onBarMousedown(evt: MouseEvent): void;
    protected getWidgetSclass(): string;
    protected getRenderSclass(): string;
    protected getRenderStyle(): React.CSSProperties;
    protected getRenderChildren(): React.ReactNode;
}
