/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />
import React = require('react');
import ReactDOM = require('react-dom');

import {CommentBox} from './commentbox';


export class App extends React.Component<any, any>{
    render() {
        return (
            <div>
                <CommentBox url="/comments" pollInterval={2000}/>
            </div>
        )
    }
}
export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}