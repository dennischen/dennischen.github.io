/// <reference path="../../3rd-definition/react.d.ts" />
/// <reference path="../../3rd-definition/react-dom.d.ts" />
/// <reference path="../../3rd-definition/jquery.d.ts" />
/// <reference path="../util/util-alias.d.ts" />
import React = require('react');
import Util = require('react-webkit/util');
export declare const QUEUE_EVENTS: {
    ON_RESIZE: string;
};
export declare function sendResize(): void;
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
export declare enum AniEffect {
    fade = 1,
    slide = 2,
    slideLeft = 3,
}
export interface Animation {
    effect: AniEffect;
    duration?: number;
}
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
export interface WidgetProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    hidden?: boolean;
    hflex?: number;
    vflex?: number;
    animation?: Animation;
    onClick?: (evt: Event) => void;
    onDoubleClick?: (evt: Event) => void;
    onContextMenu?: (evt: Event) => void;
}
export declare abstract class Widget<P extends WidgetProps, S> extends React.Component<P, S> implements Util.QueueListener<WidgetQueueEvent> {
    static defaultProps: WidgetProps;
    static _widgetMagic: boolean;
    private _willAnimate;
    private _willAnimateHidden;
    private _registedQueue;
    constructor(props: P);
    protected registerQueue(): void;
    protected unregisterQueue(): void;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: P): void;
    componentWillUpdate(nextProps: P, prevState: any): void;
    componentDidUpdate(prevProps: P, prevState: any): void;
    onQueueEvent(evt: WidgetQueueEvent): void;
    protected sendQueueEvent(name: string, data?: any): void;
    protected postQueueEvent(name: string, data?: any): void;
    protected abstract getWidgetSclass(): string;
    protected getDOM(): any;
    protected getRenderType(): string;
    protected getRenderSclass(): string;
    protected getRenderStyle(): React.CSSProperties;
    protected getRenderChildren(): React.ReactNode;
    render(): JSX.Element;
}
export interface FonticonProps extends WidgetProps {
}
export declare class Fonticon extends Widget<FonticonProps, any> {
    static defaultProps: FonticonProps;
    protected getWidgetSclass(): string;
    protected getRenderChildren(): React.ReactNode;
    protected getRenderType(): string;
}
export interface CheckboxProps extends WidgetProps {
    doCheck?: (checked: boolean) => void;
    onChange?: (evt: Event) => void;
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    name?: string;
}
export declare class Checkbox extends Widget<CheckboxProps, any> {
    static defaultProps: CheckboxProps;
    protected getWidgetSclass(): string;
    private onChange(evt);
    protected getRenderSclass(): string;
    protected getRenderChildren(): React.ReactNode;
}
export interface ListProps extends WidgetProps {
    disabled?: boolean;
    model?: any[];
    selection?: Selection<any>;
    itemRenderer?: ItemRenderer<any>;
    doSelect?: (select: boolean, idx: number, item: any) => void;
    onItemClick?: (evt: Event, idx: number, item: any) => void;
    onItemDoubleClick?: (evt: Event, idx: number, item: any) => void;
    onItemContextMenu?: (evt: Event, idx: number, item: any) => void;
}
export declare class List extends Widget<ListProps, any> {
    static defaultProps: ListProps;
    protected getWidgetSclass(): string;
    protected getRenderSclass(): string;
    protected getRenderChildren(): React.ReactNode;
}
export declare function isWidgetElemnt(child: React.ReactChild): boolean;
export declare function getWidgetProps(child: React.ReactChild): WidgetProps;
export declare function hasHScrollbar(dom: HTMLElement): number;
export declare function hasVScrollbar(dom: HTMLElement): number;
export declare function getInnerWidth(dom: HTMLElement): number;
export declare function getInnerHeight(dom: HTMLElement): number;
export declare function getOutterWidth(dom: HTMLElement): number;
export declare function getOutterHeight(dom: HTMLElement): number;
export declare function toPxNumber(pxvar: any): number;
export declare function mergeProps(props: any, ...supports: any[]): any;
