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
export interface InputProps extends Widget.WidgetProps {
    onChange?: (evt: Event) => void;
    disabled?: boolean;
    readOnly?: boolean;
    name?: string;
}
export declare abstract class Input<P extends InputProps, S> extends Widget.Widget<P, S> {
    static defaultProps: InputProps;
    protected onChange(evt: Event): void;
    protected getRenderSclass(): string;
    getInputDOM(): Element;
}
export interface CheckboxProps extends InputProps {
    doCheck?: (checked: boolean, value: any) => void;
    checked?: boolean;
    label?: string;
    value?: any;
}
export declare class Checkbox extends Input<CheckboxProps, any> {
    static defaultProps: CheckboxProps;
    protected getWidgetSclass(): string;
    protected onChange(evt: Event): void;
    protected getInputType(): string;
    protected getRenderChildren(): React.ReactNode;
}
export declare class Radiobox extends Checkbox {
    protected getWidgetSclass(): string;
    protected getInputType(): string;
}
