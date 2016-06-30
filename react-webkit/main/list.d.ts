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
import React = require('react');
import Widget = require('./widget');
export interface ListProps extends Widget.WidgetProps {
    disabled?: boolean;
    model?: any[];
    selection?: Widget.Selection<any>;
    itemRenderer?: Widget.ItemRenderer<any>;
    doSelect?: (select: boolean, idx: number, item: any) => void;
    onItemClick?: (evt: Event, idx: number, item: any) => void;
    onItemDoubleClick?: (evt: Event, idx: number, item: any) => void;
    onItemContextMenu?: (evt: Event, idx: number, item: any) => void;
}
export declare class List extends Widget.Widget<ListProps, any> {
    static defaultProps: ListProps;
    protected getWidgetSclass(): string;
    protected getRenderSclass(): string;
    protected getRenderChildren(): React.ReactNode;
}
