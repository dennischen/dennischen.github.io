/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
/// <reference path="../main/widget/widget-alias.d.ts" />
/// <reference path="../main/widget/layout-alias.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import commentbox = require('./commentbox');
import w = require('react-webkit/widget');
import l = require('react-webkit/layout');


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