(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "jquery"], factory);
	else if(typeof exports === 'object')
		exports["ReactWebKit"] = factory(require("react"), require("react-dom"), require("jquery"));
	else
		root["ReactWebKit"] = factory(root["React"], root["ReactDOM"], root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	//include css rules

	var css = __webpack_require__(1);

	var Widget = __webpack_require__(5);
	var Layout = __webpack_require__(10);

	module.exports = {
	    Widget: Widget,
	    Layout: Layout
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./react-webkit.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./react-webkit.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".box-sizing {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 0;\n  position: relative;\n}\n.wbk-hflex {\n  width: 100%;\n  overflow-x: hidden;\n}\n.wbk-vflex {\n  height: 100%;\n  overflow-y: hidden;\n}\n.wbkw-checkbox {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 0;\n  position: relative;\n  display: inline-block;\n}\n.wbkw-checkbox > input {\n  cursor: pointer;\n  vertical-align: middle;\n  width: 16px;\n  height: 16px;\n}\n.wbkw-checkbox > input[disabled] {\n  cursor: default;\n}\n.wbkw-checkbox > label {\n  padding-left: 4px;\n  vertical-align: middle;\n}\n.wbkw-checkbox > label[for] {\n  cursor: pointer;\n}\n.wbkw-checkbox.wbk-disabled > label {\n  color: #606060;\n}\n.wbkw-list {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 0;\n  position: relative;\n  overflow-y: auto;\n}\n.wbkw-list > ul {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  position: relative;\n  list-style: none;\n}\n.wbkw-list > ul > li {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 0;\n  position: relative;\n  padding: 3px;\n  cursor: pointer;\n}\n.wbkw-list > ul > li:hover {\n  background-color: rgba(0, 0, 0, 0.03);\n}\n.wbkw-list > ul > li.wbk-selected {\n  background-color: rgba(0, 0, 0, 0.15);\n}\n.wbkw-list > ul > li:active {\n  background-color: rgba(0, 0, 0, 0.2);\n}\n.wbkw-list.wbk-disabled > ul > li {\n  cursor: default;\n  color: #606060;\n}\n.wbkw-list.wbk-disabled > ul > li:hover,\n.wbkw-list.wbk-disabled > ul > li :active {\n  background-color: inherit;\n}\n.wbkw-list.wbk-disabled > ul > li.wbk-selected {\n  background-color: rgba(0, 0, 0, 0.15);\n}\n.wbkw-list.dark-bg > ul > li:hover {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.wbkw-list.dark-bg > ul > li.wbk-selected {\n  background-color: rgba(255, 255, 255, 0.2);\n}\n.wbkw-list.dark-bg > ul > li:active {\n  background-color: rgba(255, 255, 255, 0.3);\n}\n.wbkw-box {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 0;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n}\n.wbkw-box > .wbk-vflex {\n  flex: 1;\n}\n.wbkw-box.wbk-top {\n  justify-content: flex-start;\n}\n.wbkw-box.wbk-middle {\n  justify-content: center;\n}\n.wbkw-box.wbk-bottom {\n  justify-content: flex-end;\n}\n.wbkw-box.wbk-left {\n  align-items: flex-start;\n}\n.wbkw-box.wbk-center {\n  align-items: center;\n}\n.wbkw-box.wbk-right {\n  align-items: flex-end;\n}\n.wbkw-hlayout {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 0;\n  position: relative;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: flex-start;\n}\n.wbkw-hlayout > .wbkw-hlayout-content {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 0;\n  position: relative;\n}\n.wbkw-hlayout.wbk-top {\n  align-items: flex-start;\n}\n.wbkw-hlayout.wbk-middle {\n  align-items: center;\n}\n.wbkw-hlayout.wbk-bottom {\n  align-items: flex-end;\n}\n.wbkw-hlayout.wbk-left {\n  justify-content: flex-start;\n}\n.wbkw-hlayout.wbk-center {\n  justify-content: center;\n}\n.wbkw-hlayout.wbk-right {\n  justify-content: flex-end;\n}\n.wbkw-hsider {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 0;\n  position: relative;\n}\n.wbkw-hsider > .wbkw-box {\n  padding-right: 10px;\n}\n.wbkw-hsider > .wbkw-hsider-bar {\n  position: absolute;\n  width: 10px;\n  height: 100%;\n  top: 0px;\n  right: 0px;\n  cursor: col-resize;\n}\n.wbkw-hsider > .wbkw-hsider-bar:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.wbkw-hsider > .wbkw-hsider-bar.wbk-active {\n  background: rgba(0, 0, 0, 0.15);\n}\n.wbkw-vsider {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 0;\n  position: relative;\n}\n.wbkw-vsider > .wbkw-box {\n  padding-bottom: 10px;\n}\n.wbkw-vsider > .wbkw-vsider-bar {\n  position: absolute;\n  width: 100%;\n  height: 10px;\n  left: 0px;\n  bottom: 0px;\n  cursor: row-resize;\n}\n.wbkw-vsider > .wbkw-vsider-bar:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.wbkw-vsider > .wbkw-vsider-bar.wbk-active {\n  background: rgba(0, 0, 0, 0.15);\n}\n.wbkw-vlayout {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 0;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n.wbkw-vlayout > .wbkw-vlayout-content {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 0;\n  position: relative;\n}\n.wbkw-vlayout > .wbkw-vlayout-content > .wbk-vflex {\n  flex: 1;\n}\n.wbkw-vlayout.wbk-top {\n  justify-content: flex-start;\n}\n.wbkw-vlayout.wbk-middle {\n  justify-content: center;\n}\n.wbkw-vlayout.wbk-bottom {\n  justify-content: flex-end;\n}\n.wbkw-vlayout.wbk-left {\n  align-items: flex-start;\n}\n.wbkw-vlayout.wbk-center {\n  align-items: center;\n}\n.wbkw-vlayout.wbk-right {\n  align-items: flex-end;\n}\n\n/*# sourceMappingURL=srcmap/react-webkit.css.map */\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(6), __webpack_require__(7), __webpack_require__(8), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, React, ReactDOM, jq, Util) {
	    "use strict";

	    exports.QUEUE_EVENTS = {
	        ON_RESIZE: 'onResize'
	    };
	    var queueName = 'wbkWidgetQueue';
	    var queue;
	    function sendResize() {
	        queue.send({ name: exports.QUEUE_EVENTS.ON_RESIZE, data: {} });
	    }
	    exports.sendResize = sendResize;
	    if (window) {
	        if (!window[queueName]) {
	            window[queueName] = queue = new Util.SimpleQueue();
	            jq(window).bind('resize', sendResize);
	        } else {
	            queue = window[queueName];
	        }
	    }
	    (function (VPos) {
	        VPos[VPos["top"] = 1] = "top";
	        VPos[VPos["middle"] = 2] = "middle";
	        VPos[VPos["bottom"] = 3] = "bottom";
	    })(exports.VPos || (exports.VPos = {}));
	    var VPos = exports.VPos;
	    (function (HPos) {
	        HPos[HPos["left"] = 1] = "left";
	        HPos[HPos["center"] = 2] = "center";
	        HPos[HPos["right"] = 3] = "right";
	    })(exports.HPos || (exports.HPos = {}));
	    var HPos = exports.HPos;
	    (function (AniEffect) {
	        AniEffect[AniEffect["fade"] = 1] = "fade";
	        AniEffect[AniEffect["slide"] = 2] = "slide";
	        AniEffect[AniEffect["slideLeft"] = 3] = "slideLeft";
	    })(exports.AniEffect || (exports.AniEffect = {}));
	    var AniEffect = exports.AniEffect;
	    var IndexSelection = function () {
	        function IndexSelection() {
	            var _this = this;
	            var selection = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                selection[_i - 0] = arguments[_i];
	            }
	            this.selection = [];
	            this.selectedSet = {};
	            selection.forEach(function (each) {
	                _this.add(each);
	            });
	        }
	        IndexSelection.prototype.add = function (idx) {
	            if (this.selectedSet[idx]) {
	                return;
	            }
	            this.selection.push(idx);
	            this.selectedSet[idx] = true;
	        };
	        IndexSelection.prototype.isSelected = function (idx, item) {
	            return true == this.selectedSet[idx];
	        };
	        IndexSelection.prototype.select = function () {
	            var selection = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                selection[_i - 0] = arguments[_i];
	            }
	            return new (IndexSelection.bind.apply(IndexSelection, [void 0].concat(this.selection, selection)))();
	        };
	        IndexSelection.prototype.unselect = function () {
	            var selection = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                selection[_i - 0] = arguments[_i];
	            }
	            var newsel = [];
	            var toremoves = {};
	            selection.forEach(function (each) {
	                toremoves[each] = true;
	            });
	            this.selection.forEach(function (each) {
	                if (!toremoves[each]) {
	                    newsel.push(each);
	                }
	            });
	            return new (IndexSelection.bind.apply(IndexSelection, [void 0].concat(newsel)))();
	        };
	        IndexSelection.prototype.getSelection = function () {
	            return this.selection.length == 0 ? undefined : this.selection.slice();
	        };
	        return IndexSelection;
	    }();
	    exports.IndexSelection = IndexSelection;
	    var InstanceSelection = function () {
	        function InstanceSelection() {
	            var _this = this;
	            var selection = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                selection[_i - 0] = arguments[_i];
	            }
	            this.selection = [];
	            selection.forEach(function (each, idx) {
	                _this.add(each);
	            });
	        }
	        InstanceSelection.prototype.add = function (item) {
	            var exist = false;
	            if (this.selection.some(function (each) {
	                return item === each;
	            })) {
	                return;
	            }
	            this.selection.push(item);
	        };
	        InstanceSelection.prototype.isSelected = function (idx, item) {
	            return this.selection.some(function (each) {
	                return item === each;
	            });
	        };
	        InstanceSelection.prototype.select = function () {
	            var selection = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                selection[_i - 0] = arguments[_i];
	            }
	            return new (InstanceSelection.bind.apply(InstanceSelection, [void 0].concat(this.selection, selection)))();
	        };
	        InstanceSelection.prototype.unselect = function () {
	            var selection = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                selection[_i - 0] = arguments[_i];
	            }
	            var newsel = [];
	            this.selection.forEach(function (each) {
	                if (selection.some(function (remove) {
	                    return remove === each;
	                })) {
	                    return;
	                }
	                newsel.push(each);
	            });
	            return new (InstanceSelection.bind.apply(InstanceSelection, [void 0].concat(newsel)))();
	        };
	        InstanceSelection.prototype.getSelection = function () {
	            return this.selection.length == 0 ? undefined : this.selection.slice();
	        };
	        return InstanceSelection;
	    }();
	    exports.InstanceSelection = InstanceSelection;
	    var KeySelection = function () {
	        function KeySelection(key) {
	            var _this = this;
	            var selection = [];
	            for (var _i = 1; _i < arguments.length; _i++) {
	                selection[_i - 1] = arguments[_i];
	            }
	            this.selection = [];
	            this.selectedSet = {};
	            this.key = key;
	            selection.forEach(function (each, idx) {
	                _this.add(each);
	            });
	        }
	        KeySelection.prototype.add = function (item) {
	            var key = this.key(item);
	            if (this.selectedSet[key]) {
	                return;
	            }
	            this.selectedSet[key] = true;
	            this.selection.push(item);
	        };
	        KeySelection.prototype.isSelected = function (idx, item) {
	            var key = this.key(item);
	            return true == this.selectedSet[key];
	        };
	        KeySelection.prototype.select = function () {
	            var selection = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                selection[_i - 0] = arguments[_i];
	            }
	            return new (KeySelection.bind.apply(KeySelection, [void 0].concat([this.key], this.selection, selection)))();
	        };
	        KeySelection.prototype.unselect = function () {
	            var _this = this;
	            var selection = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                selection[_i - 0] = arguments[_i];
	            }
	            var newsel = [];
	            var toremoves = selection.slice();
	            this.selection.forEach(function (each) {
	                var eachKey = _this.key(each);
	                if (selection.some(function (remove) {
	                    return eachKey == _this.key(remove);
	                })) {
	                    return;
	                }
	                newsel.push(each);
	            });
	            return new (KeySelection.bind.apply(KeySelection, [void 0].concat([this.key], newsel)))();
	        };
	        KeySelection.prototype.getSelection = function () {
	            return this.selection.length == 0 ? undefined : this.selection.slice();
	        };
	        return KeySelection;
	    }();
	    exports.KeySelection = KeySelection;
	    var Widget = function (_super) {
	        __extends(Widget, _super);
	        function Widget(props) {
	            _super.call(this, props);
	        }
	        Widget.prototype.registerQueue = function () {
	            if (!this._registedQueue) {
	                queue.add(this);
	                this._registedQueue = true;
	            }
	        };
	        Widget.prototype.unregisterQueue = function () {
	            if (this._registedQueue) {
	                queue.remove(this);
	                this._registedQueue = false;
	            }
	        };
	        Widget.prototype.componentWillMount = function () {};
	        Widget.prototype.componentDidMount = function () {};
	        Widget.prototype.componentWillUnmount = function () {};
	        Widget.prototype.componentWillReceiveProps = function (nextProps) {};
	        Widget.prototype.componentWillUpdate = function (nextProps, prevState) {
	            if (nextProps.animation) {
	                this._willAnimate = true;
	                this._willAnimateHidden = this.props.hidden;
	            }
	        };
	        Widget.prototype.componentDidUpdate = function (prevProps, prevState) {
	            var _this = this;
	            var willAni = this._willAnimate;
	            delete this._willAnimate;
	            if (this.props.hidden != prevProps.hidden || this.props.hflex != prevProps.hflex || this.props.vflex != prevProps.vflex) {
	                if (!willAni) {
	                    return;
	                }
	                var ani = this.props.animation;
	                var jqd = jq(this.getDOM());
	                var dur = ani.duration ? ani.duration : 300;
	                var hidden = this.props.hidden;
	                var done = hidden ? function () {
	                    _this.sendQueueEvent(exports.QUEUE_EVENTS.ON_RESIZE);
	                } : undefined;
	                switch (ani.effect) {
	                    case AniEffect.fade:
	                        jqd.animate({ opacity: 'toggle' }, { duration: dur, done: done });
	                        break;
	                    case AniEffect.slide:
	                        jqd.animate({ height: 'toggle' }, { duration: dur, done: done });
	                        break;
	                    case AniEffect.slideLeft:
	                        jqd.animate({ width: 'toggle' }, { duration: dur, done: done });
	                        break;
	                }
	                if (!hidden) {
	                    this.sendQueueEvent(exports.QUEUE_EVENTS.ON_RESIZE);
	                }
	            }
	        };
	        Widget.prototype.onQueueEvent = function (evt) {};
	        Widget.prototype.sendQueueEvent = function (name, data) {
	            if (data === void 0) {
	                data = {};
	            }
	            queue.send({
	                name: name,
	                data: data
	            });
	        };
	        Widget.prototype.postQueueEvent = function (name, data) {
	            if (data === void 0) {
	                data = {};
	            }
	            queue.post({
	                name: name,
	                data: data
	            }, 5);
	        };
	        Widget.prototype.getWidgetSubSclass = function (sub) {
	            return [this.getWidgetSclass(), '-', sub].join('');
	        };
	        Widget.prototype.getDOM = function () {
	            return ReactDOM.findDOMNode(this);
	        };
	        Widget.prototype.getRenderType = function () {
	            return 'div';
	        };
	        Widget.prototype.getRenderSclass = function () {
	            var str = [];
	            str.push(this.getWidgetSclass());
	            if (this.props.hflex) {
	                str.push('wbk-hflex');
	            }
	            if (this.props.vflex) {
	                str.push('wbk-vflex');
	            }
	            if (this.props.className) {
	                str.push(this.props.className);
	            }
	            return str.join(" ");
	        };
	        Widget.prototype.getRenderStyle = function () {
	            var css = {};
	            if (this.props.style) {
	                mergeProps(css, this.props.style);
	            }
	            if (this._willAnimate) {
	                if (this._willAnimateHidden) {
	                    css.display = 'none';
	                }
	            } else if (this.props.hidden) {
	                css.display = 'none';
	            }
	            return css;
	        };
	        Widget.prototype.getRenderChildren = function () {
	            return this.props.children;
	        };
	        Widget.prototype.render = function () {
	            var props = this.props;
	            var t = this.getRenderType();
	            var p = {
	                id: props.id,
	                ref: 'DOM',
	                className: this.getRenderSclass(),
	                style: this.getRenderStyle(),
	                onClick: props.onClick,
	                onDoubleClick: props.onDoubleClick,
	                onContextMenu: props.onContextMenu
	            };
	            return React.createElement(t, p, this.getRenderChildren());
	        };
	        Widget.defaultProps = {};
	        Widget._widgetMagic = true;
	        return Widget;
	    }(React.Component);
	    exports.Widget = Widget;
	    var Fonticon = function (_super) {
	        __extends(Fonticon, _super);
	        function Fonticon() {
	            _super.apply(this, arguments);
	        }
	        Fonticon.prototype.getWidgetSclass = function () {
	            return 'wbkw-fonticon';
	        };
	        Fonticon.prototype.getRenderChildren = function () {
	            return null;
	        };
	        Fonticon.prototype.getRenderType = function () {
	            return 'i';
	        };
	        Fonticon.defaultProps = mergeProps({}, Widget.defaultProps);
	        return Fonticon;
	    }(Widget);
	    exports.Fonticon = Fonticon;
	    var Checkbox = function (_super) {
	        __extends(Checkbox, _super);
	        function Checkbox() {
	            _super.apply(this, arguments);
	        }
	        Checkbox.prototype.getWidgetSclass = function () {
	            return 'wbkw-checkbox';
	        };
	        Checkbox.prototype.onChange = function (evt) {
	            if (this.props.doCheck) {
	                this.props.doCheck(evt.target.checked);
	            }
	            if (this.props.onChange) {
	                this.props.onChange(evt);
	            }
	        };
	        Checkbox.prototype.getRenderSclass = function () {
	            var str = [];
	            str.push(_super.prototype.getRenderSclass.call(this));
	            if (this.props.disabled) {
	                str.push('wbk-disabled');
	            }
	            return str.join(' ');
	        };
	        Checkbox.prototype.getRenderChildren = function () {
	            var inpid;
	            if (this.props.id) {
	                inpid = this.props.id + '_inp';
	            }
	            var label;
	            if (this.props.label) {
	                label = React.createElement("label", { key: 'l', htmlFor: inpid }, this.props.label);
	            }
	            var onChange = this.props.onChange || this.props.doCheck ? this.onChange.bind(this) : undefined;
	            var readonly = this.props.checked && !onChange ? true : undefined;
	            return [React.createElement("input", { key: 'i', id: inpid, type: 'checkbox', ref: 'checkbox', onChange: onChange, checked: this.props.checked, readOnly: readonly, disabled: this.props.disabled, name: this.props.name }), label];
	        };
	        Checkbox.defaultProps = mergeProps({}, Widget.defaultProps);
	        return Checkbox;
	    }(Widget);
	    exports.Checkbox = Checkbox;
	    var List = function (_super) {
	        __extends(List, _super);
	        function List() {
	            _super.apply(this, arguments);
	        }
	        List.prototype.getWidgetSclass = function () {
	            return 'wbkw-list';
	        };
	        List.prototype.getRenderSclass = function () {
	            var str = [];
	            str.push(_super.prototype.getRenderSclass.call(this));
	            if (this.props.disabled) {
	                str.push('wbk-disabled');
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
	                    if (key == undefined) {
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
	                    return React.createElement("li", { key: key, className: selected ? 'wbk-selected' : undefined, onClick: onItemClick, onDoubleClick: onItemDoubleClick, onContentMenu: onItemContextMenu }, templateNode);
	                });
	                return React.createElement("ul", null, childrenNodes);
	            } else if (props.children) {
	                var childrenNodes = React.Children.map(props.children, function (child, idx) {
	                    var selected = selection ? selection.isSelected(idx, undefined) : false;
	                    var onItemClick = props.onItemClick || props.doSelect ? function (evt) {
	                        if (props.onItemClick) {
	                            props.onItemClick(evt, idx, undefined);
	                        }
	                        if (props.doSelect) {
	                            props.doSelect(!selected, idx, undefined);
	                        }
	                    } : undefined;
	                    var onItemDoubleClick = props.onItemDoubleClick ? function (evt) {
	                        props.onItemDoubleClick(evt, idx, null);
	                    } : undefined;
	                    var onItemContextMenu = props.onItemContextMenu ? function (evt) {
	                        props.onItemContextMenu(evt, idx, null);
	                    } : undefined;
	                    return React.createElement("li", { className: selected ? 'wbk-selected' : undefined, onClick: onItemClick, onDoubleClick: onItemDoubleClick, onContextMenu: onItemContextMenu }, child);
	                });
	                return React.createElement("ul", null, childrenNodes);
	            } else {
	                return React.createElement("ul", null);
	            }
	        };
	        List.defaultProps = mergeProps({}, Widget.defaultProps);
	        return List;
	    }(Widget);
	    exports.List = List;
	    function isWidgetElemnt(child) {
	        var casting = child;
	        return casting ? casting.type && casting.type._widgetMagic : false;
	    }
	    exports.isWidgetElemnt = isWidgetElemnt;
	    function getWidgetProps(child) {
	        var casting = child;
	        return casting ? casting.props : undefined;
	    }
	    exports.getWidgetProps = getWidgetProps;
	    function hasHScrollbar(dom) {
	        var bar = dom.scrollWidth - dom.offsetWidth;
	        return bar <= 0 ? 0 : bar;
	    }
	    exports.hasHScrollbar = hasHScrollbar;
	    function hasVScrollbar(dom) {
	        var bar = dom.scrollHeight - dom.offsetHeight;
	        return bar <= 0 ? 0 : bar;
	    }
	    exports.hasVScrollbar = hasVScrollbar;
	    function getInnerWidth(dom) {
	        var cs = window.getComputedStyle(dom);
	        var cr = dom.getBoundingClientRect();
	        var r = cr.width - toPxNumber(cs.paddingLeft) - toPxNumber(cs.paddingRight) - toPxNumber(cs.borderLeftWidth) - toPxNumber(cs.borderRightWidth);
	        return r;
	    }
	    exports.getInnerWidth = getInnerWidth;
	    function getInnerHeight(dom) {
	        var cs = window.getComputedStyle(dom);
	        var cr = dom.getBoundingClientRect();
	        var r = cr.height - toPxNumber(cs.paddingTop) - toPxNumber(cs.paddingBottom) - toPxNumber(cs.borderTopWidth) - toPxNumber(cs.borderBottomWidth);
	        return r;
	    }
	    exports.getInnerHeight = getInnerHeight;
	    function getOutterWidth(dom) {
	        var cs = window.getComputedStyle(dom);
	        var cr = dom.getBoundingClientRect();
	        return cr.width + toPxNumber(cs.marginLeft) + toPxNumber(cs.marginRight);
	    }
	    exports.getOutterWidth = getOutterWidth;
	    function getOutterHeight(dom) {
	        var cs = window.getComputedStyle(dom);
	        var cr = dom.getBoundingClientRect();
	        return cr.height + toPxNumber(cs.marginTop) + toPxNumber(cs.marginBottom);
	    }
	    exports.getOutterHeight = getOutterHeight;
	    function toPxNumber(pxvar) {
	        if ('string' == typeof pxvar) {
	            return Number(pxvar.replace('px', ''));
	        } else if ('number' == typeof pxvar) {
	            return pxvar;
	        }
	        return 0;
	    }
	    exports.toPxNumber = toPxNumber;
	    function mergeProps(props) {
	        var supports = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            supports[_i - 1] = arguments[_i];
	        }
	        supports.forEach(function (each) {
	            for (var prop in each) {
	                if (props[prop] == undefined) {
	                    props[prop] = each[prop];
	                }
	            }
	        });
	        return props;
	    }
	    exports.mergeProps = mergeProps;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	//# sourceMappingURL=../srcmap/widget/widget.js.map

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";

	    var SimpleQueue = function () {
	        function SimpleQueue() {
	            this.listeners = [];
	        }
	        SimpleQueue.prototype.add = function (l) {
	            this.listeners.push(l);
	        };
	        SimpleQueue.prototype.remove = function (l) {
	            var index = this.listeners.indexOf(l);
	            if (index > -1) {
	                this.listeners.splice(index, 1);
	            }
	        };
	        SimpleQueue.prototype.send = function (evt) {
	            this.listeners.forEach(function (each) {
	                each.onQueueEvent(evt);
	            });
	        };
	        SimpleQueue.prototype.post = function (evt, timeout) {
	            var _this = this;
	            setTimeout(function () {
	                _this.send(evt);
	            }, timeout);
	        };
	        return SimpleQueue;
	    }();
	    exports.SimpleQueue = SimpleQueue;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	//# sourceMappingURL=../srcmap/util/util.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(6), __webpack_require__(8), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, React, jq, Widget) {
	    "use strict";

	    var Box = function (_super) {
	        __extends(Box, _super);
	        function Box() {
	            _super.apply(this, arguments);
	        }
	        Box.prototype.getWidgetSclass = function () {
	            return 'wbkw-box';
	        };
	        Box.prototype.getRenderSclass = function () {
	            var sclass = [_super.prototype.getRenderSclass.call(this)];
	            var valign = this.props.valign;
	            var halign = this.props.halign;
	            var align = this.props.align;
	            if (align) {
	                align.split(' ').forEach(function (each) {
	                    if (each = each.trim()) {
	                        sclass.push('wbk-' + each);
	                    }
	                });
	            }
	            if (valign) {
	                sclass.push('wbk-' + Widget.VPos[valign]);
	            }
	            if (halign) {
	                sclass.push('wbk-' + Widget.VPos[halign]);
	            }
	            return sclass.join(' ');
	        };
	        Box.defaultProps = Widget.mergeProps({}, Widget.Widget.defaultProps);
	        return Box;
	    }(Widget.Widget);
	    exports.Box = Box;
	    var LayoutWidget = function (_super) {
	        __extends(LayoutWidget, _super);
	        function LayoutWidget() {
	            _super.apply(this, arguments);
	        }
	        LayoutWidget.prototype.getContentDOM = function (idx) {
	            return this.refs['contentDOM' + idx];
	        };
	        LayoutWidget.prototype.getRenderContentSclass = function (child, total, idx) {
	            return this.getWidgetSubSclass('content');
	        };
	        LayoutWidget.prototype.getRenderContentStyle = function (child, total, idx) {
	            return {};
	        };
	        LayoutWidget.prototype.getRenderChildren = function () {
	            var _this = this;
	            var total = React.Children.count(this.props.children);
	            return React.Children.map(this.props.children, function (child, idx) {
	                var node;
	                var sclass = _this.getRenderContentSclass(child, total, idx);
	                var css = _this.getRenderContentStyle(child, total, idx);
	                if ('string' == typeof child) {
	                    node = React.createElement("span", null, child);
	                } else {
	                    node = child;
	                }
	                return React.createElement("div", { className: sclass, style: css, ref: 'contentDOM' + idx }, node);
	            });
	        };
	        LayoutWidget.defaultProps = Widget.mergeProps({}, Widget.Widget.defaultProps);
	        return LayoutWidget;
	    }(Widget.Widget);
	    exports.LayoutWidget = LayoutWidget;
	    var Hlayout = function (_super) {
	        __extends(Hlayout, _super);
	        function Hlayout() {
	            _super.apply(this, arguments);
	        }
	        Hlayout.prototype.getWidgetSclass = function () {
	            return 'wbkw-hlayout';
	        };
	        Hlayout.prototype.componentDidMount = function () {
	            _super.prototype.componentDidMount.call(this);
	            this.calculateContentSize();
	        };
	        Hlayout.prototype.componentWillMount = function () {
	            _super.prototype.componentWillUnmount.call(this);
	            this.registerQueue();
	        };
	        Hlayout.prototype.componentWillUnmount = function () {
	            this.unregisterQueue();
	            _super.prototype.componentWillUnmount.call(this);
	        };
	        Hlayout.prototype.onQueueEvent = function (evt) {
	            if (Widget.QUEUE_EVENTS.ON_RESIZE == evt.name) {
	                this.calculateContentSize();
	            }
	        };
	        Hlayout.prototype.calculateContentSize = function () {
	            var _this = this;
	            var height = Widget.getInnerHeight(this.getDOM());
	            React.Children.forEach(this.props.children, function (each, idx) {
	                if (Widget.isWidgetElemnt(each)) {
	                    var props = Widget.getWidgetProps(each);
	                    if (!props.hidden && props.vflex) {
	                        var jqcon = jq(_this.getContentDOM(idx));
	                        jqcon.css({ height: height });
	                    }
	                }
	            });
	        };
	        Hlayout.prototype.getRenderContentStyle = function (child, total, idx) {
	            var css = _super.prototype.getRenderContentStyle.call(this, child, total, idx);
	            if (Widget.isWidgetElemnt(child)) {
	                var props = Widget.getWidgetProps(child);
	                if (!props.hidden) {
	                    if (idx > 0 && this.props.space) {
	                        css.marginLeft = this.props.space;
	                    }
	                    if (props.hflex) {
	                        css.flex = props.hflex;
	                        css.overflow = 'hidden';
	                    }
	                }
	            } else {
	                if (idx > 0 && this.props.space) {
	                    css.marginLeft = this.props.space;
	                }
	            }
	            return css;
	        };
	        Hlayout.prototype.getRenderSclass = function () {
	            var sclass = [_super.prototype.getRenderSclass.call(this)];
	            var valign = this.props.valign;
	            var halign = this.props.halign;
	            var align = this.props.align;
	            if (align) {
	                align.split(' ').forEach(function (each) {
	                    if (each = each.trim()) {
	                        sclass.push('wbk-' + each);
	                    }
	                });
	            }
	            if (valign) {
	                sclass.push('wbk-' + Widget.VPos[valign]);
	            }
	            if (halign) {
	                sclass.push('wbk-' + Widget.VPos[halign]);
	            }
	            return sclass.join(' ');
	        };
	        Hlayout.defaultProps = Widget.mergeProps({}, LayoutWidget.defaultProps);
	        return Hlayout;
	    }(LayoutWidget);
	    exports.Hlayout = Hlayout;
	    var Hsider = function (_super) {
	        __extends(Hsider, _super);
	        function Hsider(props) {
	            _super.call(this, props);
	            this.state = {
	                width: this.props.width
	            };
	        }
	        Hsider.prototype.onBarMousedown = function (evt) {
	            var _this = this;
	            evt.preventDefault();
	            var jqdoc = jq(document);
	            var jqdom = jq(this.getDOM());
	            var jqbar = jqdom.find('.' + this.getWidgetSubSclass('bar'));
	            var offset0 = evt.pageX - jqbar.offset().left;
	            var docMouseMove = function docMouseMove(evt) {
	                evt.preventDefault();
	                var state = _this.state;
	                var props = _this.props;
	                var offset = evt.pageX - offset0 - jqbar.offset().left;
	                var width = (state.width ? state.width : jqdom.width()) + offset;
	                if (width > 0 && (!props.minWidth || width >= props.minWidth) && (!props.maxWidth || width <= props.maxWidth)) {
	                    _this.setState({ width: width });
	                }
	            };
	            var docMouseUp = function docMouseUp(evt) {
	                jqdoc.unbind('mousemove', docMouseMove);
	                jqdoc.unbind('mouseup', docMouseUp);
	                _this.setState({ resizing: false });
	            };
	            jqdoc.bind('mousemove', docMouseMove);
	            jqdoc.bind('mouseup', docMouseUp);
	            this.setState({ resizing: true });
	        };
	        Hsider.prototype.getWidgetSclass = function () {
	            return 'wbkw-hsider';
	        };
	        Hsider.prototype.getRenderStyle = function () {
	            var props = this.props;
	            var css = _super.prototype.getRenderStyle.call(this);
	            if (this.state.width > 0) {
	                css.width = this.state.width;
	            }
	            return css;
	        };
	        Hsider.prototype.getRenderChildren = function () {
	            var barcls = [this.getWidgetSubSclass('bar')];
	            if (this.state.resizing) {
	                barcls.push('wbk-active');
	            }
	            var total = React.Children.count(this.props.children);
	            return [React.createElement(Box, { key: 'b', hflex: 1, vflex: 1 }, this.props.children), React.createElement("div", { key: 's', className: barcls.join(' '), onMouseDown: this.onBarMousedown.bind(this) })];
	        };
	        Hsider.defaultProps = Widget.mergeProps({}, Widget.Widget.defaultProps);
	        return Hsider;
	    }(Widget.Widget);
	    exports.Hsider = Hsider;
	    var Vlayout = function (_super) {
	        __extends(Vlayout, _super);
	        function Vlayout() {
	            _super.apply(this, arguments);
	        }
	        Vlayout.prototype.getWidgetSclass = function () {
	            return 'wbkw-vlayout';
	        };
	        Vlayout.prototype.getRenderContentStyle = function (child, total, idx) {
	            var css = _super.prototype.getRenderContentStyle.call(this, child, total, idx);
	            if (Widget.isWidgetElemnt(child)) {
	                var props = Widget.getWidgetProps(child);
	                if (!props.hidden) {
	                    if (idx > 0 && this.props.space) {
	                        css.marginTop = this.props.space;
	                    }
	                    if (props.vflex) {
	                        css.flex = props.vflex;
	                        css.overflow = 'hidden';
	                        css.display = 'flex';
	                        css.flexDirection = 'column';
	                    }
	                }
	            } else {
	                if (idx > 0 && this.props.space) {
	                    css.marginTop = this.props.space;
	                }
	            }
	            return css;
	        };
	        Vlayout.prototype.getRenderSclass = function () {
	            var sclass = [_super.prototype.getRenderSclass.call(this)];
	            var valign = this.props.valign;
	            var halign = this.props.halign;
	            var align = this.props.align;
	            if (align) {
	                align.split(' ').forEach(function (each) {
	                    if (each = each.trim()) {
	                        sclass.push('wbk-' + each);
	                    }
	                });
	            }
	            if (valign) {
	                sclass.push('wbk-' + Widget.VPos[valign]);
	            }
	            if (halign) {
	                sclass.push('wbk-' + Widget.VPos[halign]);
	            }
	            return sclass.join(' ');
	        };
	        Vlayout.defaultProps = Widget.mergeProps({}, LayoutWidget.defaultProps);
	        return Vlayout;
	    }(LayoutWidget);
	    exports.Vlayout = Vlayout;
	    var Vsider = function (_super) {
	        __extends(Vsider, _super);
	        function Vsider(props) {
	            _super.call(this, props);
	            this.state = {
	                height: this.props.height
	            };
	        }
	        Vsider.prototype.onBarMousedown = function (evt) {
	            var _this = this;
	            evt.preventDefault();
	            var jqdoc = jq(document);
	            var jqdom = jq(this.getDOM());
	            var jqbar = jqdom.find('.' + this.getWidgetSubSclass('bar'));
	            var offset0 = evt.pageY - jqbar.offset().top;
	            var docMouseMove = function docMouseMove(evt) {
	                evt.preventDefault();
	                var state = _this.state;
	                var props = _this.props;
	                var offset = evt.pageY - offset0 - jqbar.offset().top;
	                var height = (state.height ? state.height : jqdom.height()) + offset;
	                if (height > 0 && (!props.minHeight || height >= props.minHeight) && (!props.maxHeight || height <= props.maxHeight)) {
	                    _this.setState({ height: height });
	                }
	            };
	            var docMouseUp = function docMouseUp(evt) {
	                jqdoc.unbind('mousemove', docMouseMove);
	                jqdoc.unbind('mouseup', docMouseUp);
	                _this.setState({ resizing: false });
	            };
	            jqdoc.bind('mousemove', docMouseMove);
	            jqdoc.bind('mouseup', docMouseUp);
	            this.setState({ resizing: true });
	        };
	        Vsider.prototype.getWidgetSclass = function () {
	            return 'wbkw-vsider';
	        };
	        Vsider.prototype.getRenderStyle = function () {
	            var props = this.props;
	            var css = _super.prototype.getRenderStyle.call(this);
	            if (this.state.height > 0) {
	                css.height = this.state.height;
	            }
	            return css;
	        };
	        Vsider.prototype.getRenderChildren = function () {
	            var barcls = [this.getWidgetSubSclass('bar')];
	            if (this.state.resizing) {
	                barcls.push('wbk-active');
	            }
	            var total = React.Children.count(this.props.children);
	            return [React.createElement(Box, { key: 'b', hflex: 1, vflex: 1 }, this.props.children), React.createElement("div", { key: 's', className: barcls.join(' '), onMouseDown: this.onBarMousedown.bind(this) })];
	        };
	        Vsider.defaultProps = Widget.mergeProps({}, Widget.Widget.defaultProps);
	        return Vsider;
	    }(Widget.Widget);
	    exports.Vsider = Vsider;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	//# sourceMappingURL=../srcmap/widget/layout.js.map

/***/ }
/******/ ])
});
;