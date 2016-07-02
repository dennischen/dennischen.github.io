/**
 * React WebKit - v0.0.5
 * The react web widget kit base on typescript
 * 
 * Copyright 2016 - present, Dennis Chen, All rights reserved.
 * 
 * Released under MIT license
 */
declare module "@atticcat/react-webkit" {
    /**
     * To avoid my IDE (i.e. VS Code) be conflicted by sub-module name,
     * the exported sub-module name has to different from the original name.
     * I simply uppercase sub-module.
     */
    import Widget = require('widget');
    import Input = require('input');
    import Layout = require('layout');
    import Popup = require('popup');
    import Modal = require('modal');
    import List = require('list');
    export{
        Widget,
        Input,
        Layout,
        Popup,
        List
    };
}