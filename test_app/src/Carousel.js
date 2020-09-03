import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const items = [
    {
        image: "https://via.placeholder.com/300x200.png",
        text: "Image 1"
    },
    {
        image: "https://via.placeholder.com/300x200.png",
        text: "Image 2"
    },
    {
        image: "https://via.placeholder.com/300x200.png",
        text: "Image 3"
    },
];

export const StyledCarousel = styled.div`
@media (max-width: 768px) {
    align-items: center;
    display: flex;
    overflow: hidden;
    position: relative;
    width: 300px;
}
`;

export const StyledList = styled.ul`
display: flex;
justify-content: space-between;
margin: 40px 0 0;
padding: 0;
width: 1000px;

@media (max-width: 768px) {
    max-width: 900px;
    transform: translateX(0px);
    transition: transform 300ms ease;
}
`;

export const StyledItem = styled.li`
display: flex;
flex-direction: column;
max-width: 300px;
`;

const Arrow = styled.div`
cursor: pointer;
font-size: 3em;
${props => props.right ? `left: 90%;` : `left: 0%;`}
position: absolute;
text-align: center;
user-select: none;
width: 10%;
z-index: 100;
`;

function CarouselItem({ item }) {
    return (
        <StyledItem >
            <img src={item.image} alt={item.text} />
            <p>{item.text}</p>
        </StyledItem>
    );
}

function Carousel() {
    const [current, setCurrent] = useState(0);
    const [next, setNext] = useState(0);
    const [style, setStyle] = useState({
        transform: 'translateX(0)'
    });
    const desktop = useDesktop();

    const handleClick = (e) => {
        const length = items.length;
        if (e.target.innerHTML === '&gt') {
            setNext((current + 1) % length);
        } else {
            setNext((current - 1 + length) % length);
        }
    }

    useEffect( () => {
        setStyle({ transform: `translateX(${current * -300}px)`});
        setCurrent(next);
    }, [next, current]);

    return (
        <>
            <StyledCarousel className="carousel">
                { !desktop && <Arrow onClick={handleClick}>{'<'}</Arrow>}
                <StyledList style={style}>
                    {items.map((item, key) =>
                        <CarouselItem item={item} key={key} />
                    )}
                </StyledList>
                { !desktop && <Arrow onClick={handleClick} right>{'>'}</Arrow>}
            </StyledCarousel>
        </>
    );
}

export default Carousel;

function useDesktop() {
    const [width, setWidth] = useState(window.innerWidth);
    const handleResize = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    });

    return width > 768;
}
