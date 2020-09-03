import React, { Component } from 'react';

class WelcomeComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            width: window.innerWidth
        };
        this.countUp = this.countUp.bind(this);
        this.countDown = this.countDown.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    countUp() {
        this.setState({ count: this.state.count + 1 })
    }

    countDown() {
        this.setState({ count: this.state.count - 1 })
    }

    handleResize() {
        this.setState({ width: window.innerWidth })
    }

    componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
        window.addEventListener("resize", this.handleResize);
    }

    componentDidUpdate(prevProps, prevState) {
        document.title = `You clicked ${this.state.count} times`;
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    render() {
        return (
            <div>
                <h2>Hello, {this.props.name}</h2>
                <p>You clicked {this.state.count} times</p>
                <button onClick={this.countUp}>
                    Click me
                </button>
                <button onClick={this.countDown}>
                    Click me
                </button>
                <p>{this.state.width}</p>
            </div>
        );
    }
}

export default WelcomeComp;
