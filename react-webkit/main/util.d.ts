/**
 * React WebKit - v0.0.5
 * The react web widget kit base on typescript
 * 
 * Copyright 2016 - present, Dennis Chen, All rights reserved.
 * 
 * Released under MIT license
 */
export declare function supplyProps(props: any, ...supplies: any[]): any;
export declare function overrideProps(props: any, ...supplies: any[]): any;
export interface QueueListener<E extends QueueEvent> {
    onQueueEvent(evt: E): void;
}
export interface QueueEvent {
    name: string;
    data: any;
}
export interface Queue<E extends QueueEvent> {
    add(l: QueueListener<E>): void;
    remove(l: QueueListener<E>): void;
    send(evt: E): void;
    post(evt: E, timeout: number): void;
}
export declare class SimpleQueue<E extends QueueEvent> implements Queue<E> {
    private listeners;
    add(l: QueueListener<E>): void;
    remove(l: QueueListener<E>): void;
    send(evt: E): void;
    post(evt: E, timeout: number): void;
}
export declare class ShortId {
    private prefix;
    private alphabet;
    private count;
    private reused;
    constructor(prefix?: string, salt?: string, alphabet?: string);
    reuse(id: string): void;
    next(): string;
    private hash(input);
}
export interface Point {
    x: number;
    y: number;
}
export interface Size {
    width: number;
    height: number;
}
export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare function formatString(str: string, ...args: any[]): string;
export declare function isArray(obj: any): boolean;
export declare enum DateField {
    year = 1,
    month = 2,
    date = 3,
    hour = 4,
    minute = 5,
    second = 6,
    millisecond = 7,
}
export declare function isDateEquals(date1: Date, date2: Date, level: DateField): boolean;
export declare function addDateField(date: Date, field: DateField, value: number): Date;
