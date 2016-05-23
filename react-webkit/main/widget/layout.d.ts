/// <reference path="../../3rd-definition/react.d.ts" />
/// <reference path="../../3rd-definition/react-dom.d.ts" />
/// <reference path="widget-alias.d.ts" />
import React = require('react');
import Widget = require('react-webkit/widget');
export interface BoxWidgetProps extends Widget.WidgetProps {
    valign?: Widget.VPos;
    halign?: Widget.HPos;
    align?: string;
}
export declare class Box extends Widget.Widget<BoxWidgetProps, any> {
    static defaultProps: BoxWidgetProps;
    protected getWidgetSclass(): string;
    protected getRenderSclass(): string;
}
export interface LayoutWidgetProps extends Widget.WidgetProps {
}
export declare abstract class LayoutWidget<P extends LayoutWidgetProps, S> extends Widget.Widget<P, S> {
    static defaultProps: LayoutWidgetProps;
    protected getContentDOM(idx: number): any;
    protected getRenderContentSclass(child: React.ReactChild, total: number, idx: number): string;
    protected getRenderContentStyle(child: React.ReactChild, total: number, idx: number): React.CSSProperties;
    protected getRenderChildren(): React.ReactNode;
}
export interface HlayoutProps extends LayoutWidgetProps {
    valign?: Widget.VPos;
    halign?: Widget.HPos;
    align?: string;
    space?: number;
}
export declare class Hlayout extends LayoutWidget<HlayoutProps, any> {
    static defaultProps: HlayoutProps;
    protected getWidgetSclass(): string;
    componentDidMount(): void;
    componentWillMount(): void;
    componentWillUnmount(): void;
    onQueueEvent(evt: Widget.WidgetQueueEvent): void;
    calculateContentSize(): void;
    protected getRenderContentStyle(child: React.ReactChild, total: number, idx: number): React.CSSProperties;
    protected getRenderSclass(): string;
}
export interface HsiderProps extends Widget.WidgetProps {
    width?: number;
    minWidth?: number;
    maxWidth?: number;
}
export interface HsiderState {
    width?: number;
    resizing?: boolean;
}
export declare class Hsider extends Widget.Widget<HsiderProps, HsiderState> {
    static defaultProps: HsiderProps;
    private sizing;
    constructor(props: HsiderProps);
    protected onBarMousedown(evt: Event): void;
    protected getWidgetSclass(): string;
    protected getRenderStyle(): React.CSSProperties;
    protected getRenderChildren(): React.ReactNode;
}
export interface VlayoutProps extends LayoutWidgetProps {
    valign?: Widget.VPos;
    halign?: Widget.HPos;
    align?: string;
    space?: number;
}
export declare class Vlayout extends LayoutWidget<VlayoutProps, any> {
    static defaultProps: VlayoutProps;
    protected getWidgetSclass(): string;
    protected getRenderContentStyle(child: React.ReactChild, total: number, idx: number): React.CSSProperties;
    protected getRenderSclass(): string;
}
export interface VsiderProps extends Widget.WidgetProps {
    height?: number;
    minHeight?: number;
    maxHeight?: number;
}
export interface VsiderState {
    height?: number;
    resizing?: boolean;
}
export declare class Vsider extends Widget.Widget<VsiderProps, VsiderState> {
    static defaultProps: VsiderState;
    private sizing;
    constructor(props: VsiderState);
    protected onBarMousedown(evt: Event): void;
    protected getWidgetSclass(): string;
    protected getRenderStyle(): React.CSSProperties;
    protected getRenderChildren(): React.ReactNode;
}
