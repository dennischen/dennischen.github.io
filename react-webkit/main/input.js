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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
    var Input = (function (_super) {
        __extends(Input, _super);
        function Input() {
            _super.apply(this, arguments);
        }
        Input.prototype.onChange = function (evt) {
            if (this.props.onChange) {
                this.props.onChange(evt);
            }
        };
        Input.prototype.getRenderSclass = function () {
            var str = [];
            str.push(_super.prototype.getRenderSclass.call(this));
            if (this.props.disabled) {
                str.push('wk-disabled');
            }
            return str.join(' ');
        };
        Input.prototype.getInputDOM = function () {
            return this.refs['input'];
        };
        Input.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
        return Input;
    }(Widget.Widget));
    exports.Input = Input;
    (function (TextboxType) {
        TextboxType[TextboxType["text"] = 1] = "text";
        TextboxType[TextboxType["textarea"] = 2] = "textarea";
        TextboxType[TextboxType["password"] = 3] = "password";
    })(exports.TextboxType || (exports.TextboxType = {}));
    var TextboxType = exports.TextboxType;
    var Textbox = (function (_super) {
        __extends(Textbox, _super);
        function Textbox() {
            _super.apply(this, arguments);
        }
        Textbox.prototype.getWidgetSclass = function () {
            return 'wkw-textbox';
        };
        Textbox.prototype.onChange = function (evt) {
            _super.prototype.onChange.call(this, evt);
            if (this.props.doChange) {
                this.props.doChange(evt.target.value);
            }
        };
        Textbox.prototype.getRenderChildren = function () {
            var props = this.props;
            var onChange = (props.onChange || props.doChange) ? this.onChange.bind(this) : undefined;
            var css = {};
            if (props.hflex || (props.style && props.style.width)) {
                css.width = '100%';
            }
            if (props.vflex || (props.style && props.style.height)) {
                css.height = '100%';
            }
            var inpProps = {
                ref: 'input',
                onChange: onChange,
                disabled: props.disabled,
                readOnly: props.readOnly,
                style: css,
                placeholder: props.placeholder,
                defaultValue: props.defaultValue,
                name: props.name,
                value: props.value,
                maxLength: props.maxLength
            };
            var inpType = 'text';
            switch (props.type) {
                case 'textarea':
                case TextboxType.textarea:
                    if (props.hflex && props.vflex) {
                        css.resize = 'none';
                    }
                    else if (props.hflex) {
                        css.resize = 'vertical';
                    }
                    else if (props.vflex) {
                        css.resize = 'horizontal';
                    }
                    return React.createElement("textarea", __assign({}, inpProps));
                case 'password':
                case TextboxType.password:
                    inpType = 'password';
                default:
                    return React.createElement("input", __assign({type: inpType}, inpProps));
            }
        };
        Textbox.defaultProps = Util.supplyProps({}, Input.defaultProps);
        return Textbox;
    }(Input));
    exports.Textbox = Textbox;
    var Checkbox = (function (_super) {
        __extends(Checkbox, _super);
        function Checkbox() {
            _super.apply(this, arguments);
        }
        Checkbox.prototype.getWidgetSclass = function () {
            return 'wkw-checkbox';
        };
        Checkbox.prototype.onChange = function (evt) {
            _super.prototype.onChange.call(this, evt);
            if (this.props.doCheck) {
                this.props.doCheck(evt.target.checked, this.props.value);
            }
        };
        Checkbox.prototype.getInputType = function () {
            return 'checkbox';
        };
        Checkbox.prototype.getRenderChildren = function () {
            var props = this.props;
            var inpid;
            if (props.id) {
                inpid = [props.id, '_inp'].join('');
            }
            else {
                inpid = [this.getPseudoId(), '_inp'].join('');
            }
            var label;
            if (props.label) {
                label = React.createElement("label", {key: 'l', htmlFor: inpid}, props.label);
            }
            var inputType = this.getInputType();
            var onChange = (props.onChange || props.doCheck) ? this.onChange.bind(this) : undefined;
            var value = 'string' == typeof props.value ? props.value : undefined;
            return [React.createElement("input", {key: 'i', id: inpid, type: inputType, ref: 'input', onChange: onChange, checked: props.checked, disabled: props.disabled, readOnly: props.readOnly, defaultChecked: props.defaultChecked, name: props.name, value: value}), label];
        };
        Checkbox.defaultProps = Util.supplyProps({}, Input.defaultProps);
        return Checkbox;
    }(Input));
    exports.Checkbox = Checkbox;
    var Radiobox = (function (_super) {
        __extends(Radiobox, _super);
        function Radiobox() {
            _super.apply(this, arguments);
        }
        Radiobox.prototype.getWidgetSclass = function () {
            return 'wkw-radiobox';
        };
        Radiobox.prototype.getInputType = function () {
            return 'radio';
        };
        return Radiobox;
    }(Checkbox));
    exports.Radiobox = Radiobox;
});

//# sourceMappingURL=srcmap/input.js.map
