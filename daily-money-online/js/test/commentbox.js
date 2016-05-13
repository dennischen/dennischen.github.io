var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', 'jquery'], function (require, exports, React, jq) {
    "use strict";
    var CommentBox = (function (_super) {
        __extends(CommentBox, _super);
        function CommentBox(props) {
            _super.call(this, props);
            this.state = { data: new Array() };
        }
        CommentBox.prototype.loadCommentsFromServer = function () {
            jq.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    this.setState({ data: data });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        };
        CommentBox.prototype.componentDidMount = function () {
            var _this = this;
            this.loadCommentsFromServer();
            setInterval(function () { _this.loadCommentsFromServer(); }, this.props.pollInterval);
        };
        CommentBox.prototype.handleCommentSubmit = function (comment) {
            var comments = this.state.data;
            this.setState({ data: comments.concat([comment]) });
            jq.ajax({
                url: this.props.url,
                dataType: 'JSON',
                type: 'POST',
                data: comment,
                success: function (data) {
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        };
        CommentBox.prototype.handleCommentDelete = function (comment) {
            var comments = this.state.data;
            comments.forEach(function (each, idx) {
                if (comment.id == each.id) {
                    comments.splice(idx, 1);
                }
            });
            this.setState({ data: comments });
            jq.ajax({
                url: this.props.url + "/" + comment.id,
                dataType: 'json',
                type: 'DELETE',
                success: function (data) {
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        };
        CommentBox.prototype.handleCommentUpdate = function (comment) {
            var comments = this.state.data;
            comments.forEach(function (each, idx) {
                if (each.id == comment.id) {
                    each.text = comment.text;
                }
            });
            this.setState({ data: comments });
            $.ajax({
                url: this.props.url + "/" + comment.id,
                dataType: 'json',
                type: 'POST',
                data: comment,
                success: function (data) {
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        };
        CommentBox.prototype.render = function () {
            var _this = this;
            return (React.createElement("div", {className: "commentBox"}, React.createElement("h1", null, "Comments"), React.createElement(CommentForm, {onCommentSubmit: function (comment) { return _this.handleCommentSubmit(comment); }}), React.createElement(CommentList, {data: this.state.data, onCommentDelete: function (comment) { return _this.handleCommentDelete(comment); }, onCommentUpdate: function (comment) { return _this.handleCommentUpdate(comment); }})));
        };
        return CommentBox;
    }(React.Component));
    exports.CommentBox = CommentBox;
    var CommentList = (function (_super) {
        __extends(CommentList, _super);
        function CommentList() {
            _super.apply(this, arguments);
        }
        CommentList.prototype.render = function () {
            var commentNodes = this.props.data.map(function (comment) {
                return (React.createElement(CommentItem, {comment: comment, key: comment.id, onCommentDelete: this.props.onCommentDelete, onCommentUpdate: this.props.onCommentUpdate}));
            }, this);
            return (React.createElement("div", {className: "commentList"}, commentNodes));
        };
        return CommentList;
    }(React.Component));
    var CommentItem = (function (_super) {
        __extends(CommentItem, _super);
        function CommentItem(props) {
            _super.call(this, props);
            this.state = { text: '' };
        }
        CommentItem.prototype.rawMarkup = function () {
            var rawMarkup = this.props.comment.text;
            return { __html: rawMarkup };
        };
        CommentItem.prototype.handleDelete = function () {
            this.props.onCommentDelete({ id: this.props.comment.id });
        };
        CommentItem.prototype.handleUpdate = function () {
            var text = this.state.text.trim();
            if (!text) {
                return;
            }
            this.props.onCommentUpdate({ id: this.props.comment.id, text: text });
        };
        CommentItem.prototype.handleTextChange = function (e) {
            this.setState({ text: e.target.value });
        };
        CommentItem.prototype.render = function () {
            var _this = this;
            return (React.createElement("div", {className: "comment"}, React.createElement("h2", {className: "commentAuthor"}, this.props.comment.author), React.createElement("span", {dangerouslySetInnerHTML: this.rawMarkup()}), React.createElement("input", {type: "text", placeholder: this.props.comment.text, value: this.state.text, disabled: this.props.comment.fresh, onChange: function (e) { return _this.handleTextChange(e); }}), React.createElement("br", null), React.createElement("div", null, React.createElement("button", {onClick: function (e) { return _this.handleDelete(); }, disabled: this.props.comment.fresh}, "Delete"), React.createElement("button", {onClick: function (e) { return _this.handleUpdate(); }, disabled: this.props.comment.fresh}, "Update"))));
        };
        return CommentItem;
    }(React.Component));
    var CommentForm = (function (_super) {
        __extends(CommentForm, _super);
        function CommentForm(props) {
            _super.call(this, props);
            this.state = { author: '', text: '' };
        }
        CommentForm.prototype.handleAuthorChange = function (e) {
            this.setState({ author: e.target.value });
        };
        CommentForm.prototype.handleTextChange = function (e) {
            this.setState({ text: e.target.value });
        };
        CommentForm.prototype.handleSubmit = function (e) {
            e.preventDefault();
            var author = this.state.author.trim();
            var text = this.state.text.trim();
            if (!text || !author) {
                return;
            }
            this.props.onCommentSubmit({ id: Date.now(), author: author, text: text, fresh: true });
            this.setState({ author: '', text: '' });
        };
        CommentForm.prototype.render = function () {
            var _this = this;
            return (React.createElement("form", {className: "commentForm", onSubmit: function (e) { return _this.handleSubmit(e); }}, React.createElement("div", null, React.createElement("input", {type: "text", placeholder: "Your name", value: this.state.author, onChange: function (e) { return _this.handleAuthorChange(e); }}), React.createElement("input", {type: "text", placeholder: "Say something...", value: this.state.text, onChange: function (e) { return _this.handleTextChange(e); }}), React.createElement("input", {type: "submit", value: "Post"}))));
        };
        return CommentForm;
    }(React.Component));
});

//# sourceMappingURL=../../srcmap/test/commentbox.js.map
