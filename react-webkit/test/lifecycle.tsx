/// <reference path="../3rd-definition/react.d.ts" />
/// <reference path="../3rd-definition/react-dom.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');

class Base extends React.Component<any, any>{
    componentWillMount(): void {
        console.log('componentWillMount', this.props.name);
    }
    componentDidMount(): void {
        console.log('componentDidMount', this.props.name);
    }
    componentWillUnmount(): void {
        console.log('componentWillUnmount', this.props.name);
    }
    componentWillReceiveProps(nextProps:any) {
        console.log('componentWillReceiveProps', this.props.name);
    }
    componentWillUpdate(nextProps:any, nextState:any) {
        console.log('componentWillUpdate', this.props.name);
    }
    componentDidUpdate(prevProps:any, prevState:any) {
        console.log('componentDidUpdate', this.props.name);
    }
    render() {
        console.log('render', this.props.name);
        return (
            <div>{this.props.name}
                {this.props.children}
            </div>
        )
    }
}

class A extends Base {
    static defaultProps:any = {
        name:'A'
    }
}
class B extends Base { 
    static defaultProps:any = {
        name:'B'
    }
}
class C extends Base { 
    static defaultProps:any = {
        name:'C'
    }
}
class D extends Base { 
    static defaultProps:any = {
        name:'D'
    }
}
class E extends Base { 
    static defaultProps:any = {
        name:'E'
    }
}
class F extends Base { 
    static defaultProps:any = {
        name:'F'
    }
}
class G extends Base { 
    static defaultProps:any = {
        name:'G'
    }
}
class H extends Base { 
    static defaultProps:any = {
        name:'H'
    }
}

export class App extends React.Component<any, any>{
    visible = false
    constructor(props: any) {
        super(props);
        this.state = { clickCount: 0 };
    }
    componentDidMount(): void {
    }
    handleClick() {
        let c = this.state.clickCount + 1;
        this.setState({ clickCount: c });
        this.visible = !this.visible
    }
    render() {
        return (
            <A>
                <B> 
                    <E/>
                    <F>
                        <H/>
                    </F>
                </B>
                <C>
                    <G/>
                </C>
                <D>
                </D>
            </A>
        )
    }
}

export function render(dom: Element) {
    ReactDOM.render(<App/>,dom);
}