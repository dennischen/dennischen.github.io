/**
 * React WebKit - v0.0.5
 * The react web widget kit base on typescript
 * 
 * Copyright 2016 - present, Dennis Chen, All rights reserved.
 * 
 * Released under MIT license
 */
'use strict';

/**
 * To avoid my IDE (i.e. VS Code) be conflicted by sub-module name,
 * the exported sub-module name has to different from the original name.
 * I simply uppercase sub-module.
 */
var Widget = require('./widget')
var Layout = require('./layout')

var Popup = require('./popup')
var Modal = require('./modal')

var Menu = require('./menu')
var List = require('./list')
var Input = require('./input')

var Calendar = require('./calendar')

module.exports = {
    Widget,
    Layout,
    Popup,
    Modal,
    Menu,
    List,
    Input,
    Calendar
}