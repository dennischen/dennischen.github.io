require(["commentbox"], function(commentbox) {
	ReactDOM.render(
	  React.createElement("div", null, 
	  React.createElement(commentbox.CommentBox, {url: "/comments", pollInterval: 2000})
	  )
	  ,
	  document.getElementById('content')
	);
});
//# sourceMappingURL=../../../srcmap/study/reactjs/commentbox-main.js.map
