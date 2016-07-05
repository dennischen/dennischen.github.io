/**
 * React WebKit - v0.0.5
 * The react web widget kit base on typescript
 * 
 * Copyright 2016 - present, Dennis Chen, All rights reserved.
 * 
 * Released under MIT license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'react', './widget', './util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var Widget = require('./widget');
    var Util = require('./util');
    var List = (function (_super) {
        __extends(List, _super);
        function List() {
            _super.apply(this, arguments);
        }
        List.prototype.getWidgetSclass = function () {
            return 'wkw-list';
        };
        List.prototype.getRenderSclass = function () {
            var str = [_super.prototype.getRenderSclass.call(this)];
            if (this.props.disabled) {
                str.push('wk-disabled');
            }
            return str.join(' ');
        };
        List.prototype.getRenderChildren = function () {
            var props = this.props;
            var selection = props.selection;
            if (props.model) {
                var renderer_1 = props.itemRenderer;
                if (!renderer_1) {
                    var msg = 'Need itemRenderer to render model of List';
                    throw msg;
                }
                var childrenNodes = props.model.map(function (each, idx) {
                    var key = renderer_1.key(idx, each);
                    if (key == undefined || key == null) {
                        key = idx;
                    }
                    var templateNode = renderer_1.render(idx, each);
                    var selected = selection ? selection.isSelected(idx, each) : false;
                    var onItemClick = props.onItemClick || props.doSelect ? function (evt) {
                        if (props.onItemClick) {
                            props.onItemClick(evt, idx, each);
                        }
                        if (props.doSelect) {
                            props.doSelect(!selected, idx, each);
                        }
                    } : undefined;
                    var onItemDoubleClick = props.onItemDoubleClick ? function (evt) {
                        props.onItemDoubleClick(evt, idx, each);
                    } : undefined;
                    var onItemContextMenu = props.onItemContextMenu ? function (evt) {
                        props.onItemContextMenu(evt, idx, each);
                    } : undefined;
                    return React.createElement("li", {key: key, className: selected ? 'wk-selected' : undefined, onClick: onItemClick, onDoubleClick: onItemDoubleClick, onContentMenu: onItemContextMenu}, templateNode);
                });
                return React.createElement("ul", null, childrenNodes);
            }
            else if (props.children) {
                var childrenNodes = React.Children.map(props.children, function (child, idx) {
                    var selected = selection ? selection.isSelected(idx, null) : false;
                    var onItemClick = props.onItemClick || props.doSelect ? function (evt) {
                        if (props.onItemClick) {
                            props.onItemClick(evt, idx, null);
                        }
                        if (props.doSelect) {
                            props.doSelect(!selected, idx, null);
                        }
                    } : undefined;
                    var onItemDoubleClick = props.onItemDoubleClick ? function (evt) {
                        props.onItemDoubleClick(evt, idx, null);
                    } : undefined;
                    var onItemContextMenu = props.onItemContextMenu ? function (evt) {
                        props.onItemContextMenu(evt, idx, null);
                    } : undefined;
                    return React.createElement("li", {className: selected ? 'wk-selected' : undefined, onClick: onItemClick, onDoubleClick: onItemDoubleClick, onContextMenu: onItemContextMenu}, child);
                });
                return React.createElement("ul", null, childrenNodes);
            }
            else {
                return React.createElement("ul", null);
            }
        };
        List.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
        return List;
    }(Widget.Widget));
    exports.List = List;
});

//# sourceMappingURL=srcmap/list.js.map
