import React, { useState, useEffect } from 'react';

function Welcome({ name }) {
    const [count, setCount] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    const [obj, setObj] = useState({ a: 1, b: 2});

    useEffect(() => {
        console.log("eff");
        setObj({ ...obj, ...{ c: 3 }});
    }, []);

    useEffect(() => {
        console.log(count);
        document.title = `You clicked ${count} times`;
        countUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    });

    const countUp = () => {
        setCount(count + 1);
    };

    const countDown = () => {
        setCount(count + - 1);
    }

    const handleResize = () => {
        setWidth(window.innerWidth)
    }

    return (
        <div>
            <h2>Hello, {name}</h2>
            <p>You clicked {count} times</p>
            <button onClick={countUp}>
                Click me
            </button>
            <button onClick={countDown}>
                Click me
        </button>
            <p>{width}</p>
        </div>
    )
}

export default Welcome;