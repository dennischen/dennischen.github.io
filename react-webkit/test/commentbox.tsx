/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
/// <reference path="../3rd-definition/jquery.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');
import jq = require('jquery');
// import marked = require('marked');

export interface Comment {
	id: number|string
	author: string
	text: string
	fresh?: boolean
}
export interface CommentDelete {
	id: number|string
}
export interface CommentUpdate {
	id: number|string
	text?: string
}

export interface CommentBoxProps {
	url: string,
	pollInterval?: number
}
export interface CommentBoxStates {
	data: Comment[]
}

export class CommentBox extends React.Component<CommentBoxProps, CommentBoxStates>{

	constructor(props: CommentBoxProps) {
		super(props);
		this.state = { data: new Array() };
	}
	loadCommentsFromServer() {
		jq.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function (data: Comment[]) {
				this.setState({ data: data });
			}.bind(this),
			error: function (xhr: any, status: any, err: any) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}
	componentDidMount() {
		this.loadCommentsFromServer();
		//()=>{} for binding this
		setInterval(() => { this.loadCommentsFromServer() }, this.props.pollInterval);
	}
	handleCommentSubmit(comment: Comment) {
		let comments = this.state.data;
		this.setState({ data: comments.concat([comment]) });

		jq.ajax({
			url: this.props.url,
			dataType: 'JSON',
			type: 'POST',
			data: comment,
			success: function (data: Comment) {
				//this.setState({data: data});
			}.bind(this),
			error: function (xhr: any, status: any, err: any) {
				//this.setState({data: comments});
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}
	handleCommentDelete(comment: CommentDelete) {
		let comments = this.state.data;
		comments.forEach((each: Comment, idx: number) => {
			if (comment.id == each.id) {
				comments.splice(idx, 1);
			}
		});
		this.setState({ data: comments });
		jq.ajax({
			url: this.props.url + "/" + comment.id,
			dataType: 'json',
			type: 'DELETE',
			success: function (data: CommentDelete) {
				//this.setState({data: data});
			}.bind(this),
			error: function (xhr: any, status: any, err: any) {
				//this.setState({data: comments});
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}
	handleCommentUpdate(comment: CommentUpdate) {
		let comments = this.state.data;
		comments.forEach((each: Comment, idx: number) => {
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
			success: function (data: Comment) {
				//this.setState({data: data});
			}.bind(this),
			error: function (xhr: any, status: any, err: any) {
				//this.setState({data: comments});
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}
	render() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentForm onCommentSubmit={comment => this.handleCommentSubmit(comment) } />
				<CommentList data={this.state.data}
					onCommentDelete={comment => this.handleCommentDelete(comment) }
					onCommentUpdate={comment => this.handleCommentUpdate(comment) }/>
			</div>
		);
	}
}

interface CommentListProps {
	data: Comment[]
	onCommentUpdate: (comment: CommentUpdate) => void
	onCommentDelete: (comment: CommentDelete) => void
}

class CommentList extends React.Component<CommentListProps, any>{
	render() {
		let commentNodes = this.props.data.map(function (comment: Comment) {
			return (
				<CommentItem comment={comment} key={comment.id}
					onCommentDelete={this.props.onCommentDelete}
					onCommentUpdate={this.props.onCommentUpdate}>
				</CommentItem>
			);
		}, this);

		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
}

interface CommentItemProps {
	comment: Comment
	onCommentUpdate: (comment: CommentUpdate) => void
	onCommentDelete: (comment: CommentDelete) => void
}
class CommentItem extends React.Component<CommentItemProps, any>{
	constructor(props: CommentItemProps) {
		super(props);
		this.state = { text: '' };
	}
	rawMarkup() {
		let rawMarkup = this.props.comment.text;//marked(this.props.text, { sanitize: true });
		return { __html: rawMarkup };
	}
	handleDelete() {
		this.props.onCommentDelete({ id: this.props.comment.id });
	}
	handleUpdate() {
		let text = this.state.text.trim();
		if (!text) {
			return;
		}
		this.props.onCommentUpdate({ id: this.props.comment.id, text: text });
	}
	handleTextChange(e: any) {
		this.setState({ text: e.target.value });
	}
	render() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.comment.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup() } />
				<input
					type="text"
					placeholder={this.props.comment.text}
					value={this.state.text}
					disabled={this.props.comment.fresh}
					onChange={(e:any) => this.handleTextChange(e) }
					/><br/>
				<div>
					<button onClick={(e:any) => this.handleDelete() } disabled={this.props.comment.fresh}>Delete</button>
					<button onClick={(e:any) => this.handleUpdate() } disabled={this.props.comment.fresh}>Update</button>
				</div>
			</div>
		);
	}
}


interface CommentFormProps {
	onCommentSubmit: (comment: Comment) => void
}
class CommentForm extends React.Component<CommentFormProps, any>{
	constructor(props: CommentFormProps) {
		super(props);
		this.state = { author: '', text: '' };
	}
	handleAuthorChange(e: any) {
		this.setState({ author: e.target.value });
	}
	handleTextChange(e: any) {
		this.setState({ text: e.target.value });
	}
	handleSubmit(e: any) {
		e.preventDefault();
		let author = this.state.author.trim();
		let text = this.state.text.trim();
		if (!text || !author) {
			return;
		}
		this.props.onCommentSubmit({ id: Date.now(), author: author, text: text, fresh: true });
		this.setState({ author: '', text: '' });
	}
	render() {
		return (
			<form className="commentForm" onSubmit={(e:any) => this.handleSubmit(e) }>
				<div>
					<input
						type="text"
						placeholder="Your name"
						value={this.state.author}
						onChange={(e:any) => this.handleAuthorChange(e) }
						/>
					<input
						type="text"
						placeholder="Say something..."
						value={this.state.text}
						onChange={(e:any) => this.handleTextChange(e) }
						/>
					<input type="submit" value="Post" />
				</div>
			</form>
		);
	}
}