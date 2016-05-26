/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import commentbox = require('./commentbox');
import w = require('../main/widget');
import l = require('../main/layout');


export class App extends React.Component<any, any>{
    render() {
        return (
            <div>
                <commentbox.CommentBox url="/comments" pollInterval={2000}/>
            </div>
        )
    }
}
export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}