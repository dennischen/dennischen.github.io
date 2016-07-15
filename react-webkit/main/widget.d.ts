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
import Util = require('./util');
export declare const QUEUE_EVENTS: {
    ON_RESIZE: string;
};
export declare function sendWidgetResize(): void;
export interface WidgetQueueEvent extends Util.QueueEvent {
}
export declare enum VPos {
    top = 1,
    middle = 2,
    bottom = 3,
}
export declare enum HPos {
    left = 1,
    center = 2,
    right = 3,
}
export declare enum Orient {
    vertical = 1,
    horizontal = 2,
}
export declare enum AniEffect {
    fade = 1,
    slide = 2,
    slideWidth = 3,
}
export declare enum AlertType {
    success = 1,
    info = 2,
    warning = 3,
    error = 4,
}
export interface Animation {
    effect: AniEffect | string;
    duration?: number;
    eager?: boolean;
}
export declare var DEFAULT_ANIMATION_DURATION: number;
export interface ItemRenderer<D> {
    key(idx: number, each: D): string | number;
    render(idx: number, each: D): React.ReactNode;
}
export interface Selection<D> {
    isSelected: (idx: number, item: D) => boolean;
}
export declare class IndexSelection implements Selection<any> {
    private selection;
    private selectedSet;
    constructor(...selection: number[]);
    private add(idx);
    isSelected(idx: number, item: any): boolean;
    select(...selection: number[]): IndexSelection;
    unselect(...selection: number[]): IndexSelection;
    getSelection(): number[];
}
export declare class InstanceSelection<D> implements Selection<D> {
    private selection;
    constructor(...selection: D[]);
    private add(item);
    isSelected(idx: number, item: D): boolean;
    select(...selection: D[]): InstanceSelection<D>;
    unselect(...selection: D[]): InstanceSelection<D>;
    getSelection(): D[];
}
export declare class KeySelection<D> implements Selection<D> {
    private selection;
    private selectedSet;
    private key;
    constructor(key: (element: D) => string, ...selection: D[]);
    private add(item);
    isSelected(idx: number, item: D): boolean;
    select(...selection: D[]): KeySelection<D>;
    unselect(...selection: D[]): KeySelection<D>;
    getSelection(): D[];
}
export interface ComponentProps {
    id?: string;
}
export declare abstract class Component<P extends ComponentProps, S> extends React.Component<P, S> {
    private pseudoId;
    private safeTimeoutKeeper;
    private unmounted;
    getPseudoId(): string;
    private clearPseudoId();
    safeTimeout(fn: () => void, timeout: number): number;
    clearSafeTimeout(): void;
    componentWillUnmount(): void;
    isUnmounted(): boolean;
}
export interface WidgetProps extends ComponentProps {
    className?: string;
    style?: React.CSSProperties;
    invisible?: boolean;
    hflex?: number;
    vflex?: number;
    animation?: Animation;
    tooltip?: string | Function;
    tooltipOption?: any;
    alert?: string | Function;
    alertType?: string | AlertType;
    alertOption?: any;
    onClick?: (evt: Event) => void;
    onDoubleClick?: (evt: Event) => void;
    onContextMenu?: (evt: Event) => void;
}
export interface WidgetState {
    invisible?: boolean;
}
export declare abstract class Widget<P extends WidgetProps, S extends WidgetState> extends Component<P, S> implements Util.QueueListener<WidgetQueueEvent> {
    static defaultProps: WidgetProps;
    static __wgtmgc: boolean;
    private _registedQueue;
    private _willAnimate;
    private _willAnimateInvisible;
    constructor(props: P);
    protected getId(): string;
    protected registerQueue(): void;
    protected unregisterQueue(): void;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: P): void;
    componentWillUpdate(nextProps: P, nextState: any): void;
    componentDidUpdate(prevProps: P, prevState: any): void;
    protected doAnimate(): boolean;
    protected afterAnimation(): void;
    protected show(): void;
    protected hide(): void;
    onQueueEvent(evt: WidgetQueueEvent): void;
    protected sendQueueEvent(name: string, data?: any): void;
    protected postQueueEvent(name: string, data?: any): void;
    abstract getWidgetSclass(): string;
    getWidgetSubSclass(sub: string): string;
    getDOM(): any;
    protected getRenderType(): string | React.ComponentClass<any> | React.SFC<any>;
    protected getRenderSclass(): string;
    protected getRenderInvisible(): boolean;
    protected getRenderStyle(): React.CSSProperties;
    protected getRenderChildren(): React.ReactNode;
    protected getRenderProps(): any;
    render(): JSX.Element;
    stating(): void;
}
export interface FonticonProps extends WidgetProps {
}
export declare class Fonticon extends Widget<FonticonProps, any> {
    static defaultProps: FonticonProps;
    getWidgetSclass(): string;
    protected getRenderChildren(): React.ReactNode;
    protected getRenderType(): string | React.ComponentClass<any> | React.SFC<any>;
}
export interface ButtonProps extends WidgetProps {
    label?: string;
    disabled?: boolean;
    type?: string;
    form?: string;
}
export declare class Button extends Widget<ButtonProps, any> {
    static defaultProps: ButtonProps;
    getWidgetSclass(): string;
    protected getRenderChildren(): React.ReactNode;
    protected getRenderProps(): any;
    protected getRenderType(): string | React.ComponentClass<any> | React.SFC<any>;
}
export interface AnchorProps extends WidgetProps {
    label?: string;
    href?: string;
    target?: string;
}
export declare class Anchor extends Widget<AnchorProps, any> {
    static defaultProps: AnchorProps;
    getWidgetSclass(): string;
    protected getRenderChildren(): React.ReactNode;
    protected getRenderProps(): any;
    protected getRenderType(): string | React.ComponentClass<any> | React.SFC<any>;
}
export interface AlertProps extends WidgetProps {
    fonticon?: string;
    title?: string;
    label?: string;
}
export declare class Alert extends Widget<AlertProps, any> {
    static defaultProps: AlertProps;
    getWidgetSclass(): string;
    protected getRenderChildren(): React.ReactNode;
    protected getRenderSclass(): string;
}
export declare function createReactElement(type: string | React.ComponentClass<any> | React.SFC<any>, props: any, children: React.ReactNode): React.ReactElement<any>;
export declare function isWidgetElemnt(child: React.ReactChild): boolean;
export declare function getWidgetProps(child: React.ReactChild): WidgetProps;
export declare function hasHScrollbar(dom: HTMLElement): number;
export declare function hasVScrollbar(dom: HTMLElement): number;
export declare function getInnerWidth(dom: HTMLElement): number;
export declare function getInnerHeight(dom: HTMLElement): number;
export declare function getOutterWidth(dom: HTMLElement): number;
export declare function getOutterHeight(dom: HTMLElement): number;
export declare function toPxNumber(pxvar: any): number;
export declare function gainFocus(under: string | Element | JQuery): void;
