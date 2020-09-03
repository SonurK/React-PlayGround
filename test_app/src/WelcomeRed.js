import React, { useState, useEffect, useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case '+':
            return { count: state.count + 1 };
        case '-':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}

function Welcome({ name }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        console.log("eff");
    }, []);

    useEffect(() => {
        document.title = `You clicked ${state.count} times`;
    }, [state.count]);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    });


    const handleResize = () => {
        setWidth(window.innerWidth)
    }

    return (
        <div>
            <h2>Hello, {name}</h2>
            <p>You clicked {state.count} times</p>
            <button onClick={() => dispatch({ type: '+' })}>
                Click me
            </button>
            <button onClick={() => dispatch({ type: '-' })}>
                Click me
        </button>
            <p>{width}</p>
        </div>
    )
}

export default Welcome;