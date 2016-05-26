/**
 * React WebKit - v0.0.2
 * The react widget kit base on typescript
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
