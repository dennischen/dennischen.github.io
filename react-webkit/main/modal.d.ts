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
export interface ModalContainerProps extends Widget.WidgetProps {
}
export interface ModalContainerState {
    modalStack?: Modal[];
    nextModalKey?: String;
}
export declare class ModalContainer extends Widget.Widget<ModalContainerProps, ModalContainerState> {
    static defaultProps: ModalContainerProps;
    constructor(props: ModalProps);
    private onBodyFocusin;
    private onBodyKeyup;
    getWidgetSclass(): string;
    setModal(modal: Modal): void;
    getModal(): Modal;
    clearModal(modal: Modal): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: ModalContainerState, prevState: any): void;
    protected getRenderChildren(): React.ReactNode;
    protected getRenderStyle(): React.CSSProperties;
}
export interface ModalProps extends Widget.WidgetProps {
    show?: boolean;
    doAfterShow?: () => void;
    doEsc?: () => void;
}
export declare class Modal extends Widget.Widget<ModalProps, any> {
    static defaultProps: ModalProps;
    constructor(props: ModalProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: ModalProps, prevState: any): void;
    componentWillUnmount(): void;
    protected getContainer(): ModalContainer;
    getWidgetSclass(): string;
    getModalRenderChildren(): React.ReactNode;
    protected getRenderChildren(): React.ReactNode;
}
