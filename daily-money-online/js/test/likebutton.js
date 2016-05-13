var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', "../widget/widget"], function (require, exports, React, Widget) {
    "use strict";
    var LikeButton = (function (_super) {
        __extends(LikeButton, _super);
        function LikeButton(props) {
            _super.call(this, props);
            this.state = { liked: this.props.liked, clickCount: 0 };
        }
        LikeButton.prototype.handleClick = function (event) {
            this.setState({ liked: !this.state.liked, clickCount: this.state.clickCount + 1 });
        };
        LikeButton.prototype.getWidgetSclass = function () {
            return 'likebutton';
        };
        LikeButton.prototype.getRenderChildren = function () {
            var _this = this;
            var text = this.state.liked ? 'like' : 'haven\'t liked';
            return (React.createElement("div", null, React.createElement("span", {onClick: function (e) { return _this.handleClick(e); }, style: { color: 'blue' }}, "Click (", this.state.clickCount, ") to toggle."), "You ", text, " this."));
        };
        LikeButton.defaultProps = Widget.mergeProps({
            liked: false
        }, Widget.Widget.defaultProps);
        return LikeButton;
    }(Widget.Widget));
    exports.LikeButton = LikeButton;
});

//# sourceMappingURL=../../srcmap/test/likebutton.js.map
