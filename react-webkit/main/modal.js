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
        define(["require", "exports", 'react', 'react-dom', 'jquery', './widget', './util', './layout'], factory);
    }
})(function (require, exports) {
    "use strict";
    var React = require('react');
    var ReactDOM = require('react-dom');
    var Jq = require('jquery');
    var Widget = require('./widget');
    var Util = require('./util');
    var layout_1 = require('./layout');
    var globalModalCaveId = 'wkModalCave';
    var globalContainer;
    function getGlobalContainerCave() {
        var dom = document.getElementById(globalModalCaveId);
        if (!dom) {
            Jq(document.body).append('<div id="' + globalModalCaveId + '" />');
            dom = document.getElementById(globalModalCaveId);
        }
        return dom;
    }
    var ModalContainer = (function (_super) {
        __extends(ModalContainer, _super);
        function ModalContainer(props) {
            _super.call(this, props);
            this._modalStack = [];
            this.state.modalStack = this._modalStack;
        }
        ModalContainer.prototype.getWidgetSclass = function () {
            return 'wkw-modal-container';
        };
        ModalContainer.prototype.putModal = function (modal) {
            var modalStack = this._modalStack;
            var idx = modalStack.indexOf(modal);
            if (idx < 0) {
                modalStack.push(modal);
            }
            else if (idx == modalStack.length - 1) {
                return;
            }
            else {
                modalStack.splice(idx, 1);
                modalStack.push(modal);
            }
            this.setState({ modalStack: this._modalStack });
        };
        ModalContainer.prototype.getModal = function () {
            var modalStack = this._modalStack;
            return modalStack.length > 0 ? modalStack[modalStack.length - 1] : undefined;
        };
        ModalContainer.prototype.clearModal = function (modal) {
            var modalStack = this._modalStack;
            var hit;
            for (var i = modalStack.length - 1; i >= 0; i--) {
                if (modalStack[i] == modal) {
                    modalStack.splice(i, 1);
                    hit = true;
                }
            }
            if (hit) {
                this.setState({ modalStack: this._modalStack });
            }
        };
        ModalContainer.prototype.componentDidMount = function () {
            var _this = this;
            _super.prototype.componentDidMount.call(this);
            var state = this.state;
            var jqdom = Jq(this.getDOM());
            var modal = this.getModal();
            if (modal) {
                Widget.gainFocus(jqdom);
                if (modal.props.doAfterShow) {
                    modal.props.doAfterShow();
                }
            }
            jqdom.click(function (evt) {
                if (Jq(':focus').length == 0) {
                    Jq(_this.refs['keyAnchor']).focus();
                }
            });
            Jq(document.body).on('focusin', this.onBodyFocusin = function (evt) {
                var modal = _this.getModal();
                if (modal) {
                    var dom = _this.getDOM();
                    if (!Jq.contains(dom, evt.target)) {
                        Widget.gainFocus(dom);
                    }
                }
            }).on('keyup', this.onBodyKeyup = function (evt) {
                var modal = _this.getModal();
                if (modal) {
                    var dom = _this.getDOM();
                    if (Jq.contains(dom, evt.target)) {
                        if (evt.keyCode == 27 && modal.props.doEsc) {
                            modal.props.doEsc();
                        }
                    }
                }
            });
        };
        ModalContainer.prototype.componentWillUnmount = function () {
            _super.prototype.componentWillUnmount.call(this);
            if (this.onBodyFocusin) {
                Jq(document.body).off('focusin', this.onBodyFocusin);
                delete this.onBodyFocusin;
            }
            if (this.onBodyKeyup) {
                Jq(document.body).off('keyup', this.onBodyKeyup);
                delete this.onBodyKeyup;
            }
        };
        ModalContainer.prototype.componentDidUpdate = function (prevProps, prevState) {
            _super.prototype.componentDidUpdate.call(this, prevProps, prevState);
            var modal = this.getModal();
            if (modal) {
                Widget.gainFocus(this.getDOM());
                if (modal.props.doAfterShow) {
                    modal.props.doAfterShow();
                }
            }
        };
        ModalContainer.prototype.getRenderChildren = function () {
            var modal = this.getModal();
            if (modal) {
                var key = modal.getPseudoId();
                var clz = [this.getWidgetSubSclass('content'), modal.getWidgetSubSclass('content')].join(' ');
                var content = Widget.createReactElement('div', { key: key, className: clz }, modal.getModalRenderChildren());
                return React.createElement(layout_1.Box, {hflex: 1, vflex: 1, align: 'center middle'}, content, React.createElement("a", {ref: 'keyAnchor', href: 'javascript: void(0)'}));
            }
            return undefined;
        };
        ModalContainer.prototype.getRenderStyle = function () {
            var css = _super.prototype.getRenderStyle.call(this);
            var modal = this.getModal();
            if (!modal) {
                css.display = 'none';
            }
            return css;
        };
        ModalContainer.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
        return ModalContainer;
    }(Widget.Widget));
    exports.ModalContainer = ModalContainer;
    var Modal = (function (_super) {
        __extends(Modal, _super);
        function Modal(props) {
            _super.call(this, props);
        }
        Modal.prototype.componentDidMount = function () {
            _super.prototype.componentDidMount.call(this);
            var props = this.props;
            if (props.show) {
                this.getContainer().putModal(this);
            }
        };
        Modal.prototype.componentDidUpdate = function (prevProps, prevState) {
            _super.prototype.componentDidUpdate.call(this, prevProps, prevState);
            var props = this.props;
            var container = this.getContainer();
            if (props.show != prevProps.show) {
                if (props.show) {
                    container.putModal(this);
                }
                else {
                    container.clearModal(this);
                }
            }
            else if (props.show && container.getModal() != this) {
                container.putModal(this);
            }
        };
        Modal.prototype.componentWillUnmount = function () {
            _super.prototype.componentWillUnmount.call(this);
            if (this.props.show) {
                this.getContainer().clearModal(this);
            }
        };
        Modal.prototype.getContainer = function () {
            if (!globalContainer) {
                globalContainer = ReactDOM.render(React.createElement(ModalContainer, null), getGlobalContainerCave());
            }
            return globalContainer;
        };
        Modal.prototype.getWidgetSclass = function () {
            return 'wkw-modal';
        };
        Modal.prototype.getModalRenderChildren = function () {
            return this.props.children;
        };
        Modal.prototype.getRenderChildren = function () {
            return undefined;
        };
        Modal.defaultProps = Util.supplyProps({}, Widget.Widget.defaultProps);
        return Modal;
    }(Widget.Widget));
    exports.Modal = Modal;
    var Window = (function (_super) {
        __extends(Window, _super);
        function Window() {
            _super.apply(this, arguments);
        }
        Window.prototype.getWidgetSclass = function () {
            return 'wkw-window';
        };
        Window.prototype.getModalRenderChildren = function () {
            var props = this.props;
            var bodyclz = this.getWidgetSubSclass('body');
            var tbarclz = this.getWidgetSubSclass('title-bar');
            var tbarnodes = [React.createElement(layout_1.Box, {hflex: 1}, props.title)];
            if (props.doClose) {
                var closeclz = [this.getWidgetSubSclass('close'), 'wk-aux'].join(' ');
                tbarnodes.push(React.createElement("button", {type: 'button', className: closeclz, onClick: this.props.doClose}, "×"));
            }
            var tbar = Widget.createReactElement(layout_1.Hlayout, { className: tbarclz, hflex: 1, align: 'middle' }, tbarnodes);
            return React.createElement(layout_1.Vlayout, null, tbar, React.createElement("div", {className: bodyclz}, this.props.children));
        };
        Window.defaultProps = Util.supplyProps({}, Modal.defaultProps);
        return Window;
    }(Modal));
    exports.Window = Window;
});

//# sourceMappingURL=srcmap/modal.js.map
