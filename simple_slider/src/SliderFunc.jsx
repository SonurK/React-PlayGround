import React, { useState, useEffect } from 'react';
import { getSlides, getStyles } from './utils';
import styled from "styled-components";

function SliderFunc() {

  const StyledSlide = styled.div`
  flex: 0 0 100%;
  height: 100%;
  width: 100%;
  background-image: url('${props => props.content}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  `;

  const Dot = styled.div`
  padding: 10px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 50%;
  background: ${props => props.active ? 'black' : 'white'};
  `;

  const StyledArrow = styled.div`
  color: black;
  display: flex;
  position: absolute;
  top: 50%;
  ${props => props.direction === 'right' ? `right: 25px` : `left: 25px`};
  height: 50px;
  width: 50px;
  justify-content: center;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  transition: transform ease-in 0.1s;
  &:hover {
    transform: scale(1.1);
  }
  img {
    transform: translateX(${props => props.direction === 'left' ? '-2' : '2'}px);
    &:focus {
      outline: 0;
    }
  }`;

  const StyledSlider = styled.div`
  transform: translateX(-${props => props.translate}px);
  transition: transform ease-out ${props => props.transition}s;
  height: 100%;
  width: ${props => props.width}px;
  display: flex;
  `;

  const slides = getSlides();
  const StyledWrapper = getStyles().StyledWrapper;
  const StyledDots = getStyles().StyledDots;

  const [timer, setTimer] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [activeIndex, setActiveIndex] = useState(0);
  const [translate, setTranslate] = useState(window.innerWidth);
  const [transition, setTransition] = useState(0.5);
  const [slidesForView, setSlides] = useState([slides[slides.length - 1], slides[0], slides[1]]);

  useEffect(() => {
    setTimer(setInterval(() => { nextSlide() }, 3000));
    const transitionEnd = window.addEventListener('transitionend', createSlides());
    setSlides(createSlides());
    console.log(width);
    return () => {
      clearInterval(timer);
      window.removeEventListener('transitionend', transitionEnd);
    }
  });

  const createSlides = () => {
    let images = [];
    if (activeIndex === slides.length - 1) {
      images = [slides[slides.length - 2], slides[slides.length - 1], slides[0]];
    } else if (activeIndex === 0) {
      images = [slides[slides.length - 1], slides[0], slides[1]];
    } else {
      images = slides.slice(activeIndex - 1, activeIndex + 2)
    }
    setTranslate(getWidth());
    setTransition(0);
    return images;
  }

  useEffect(() => {
    console.log(width);
  }, [width]);

  const getWidth = () => {
    setWidth(window.innerWidth);
  };

  const Slide = ({ content }) => (
    <StyledSlide content={content} />
  )

  const Dots = ({ activeIndex, handleClick }) => (
    <StyledDots>
      {slides.map((slide, i) => (
        <Dot key={slide} active={activeIndex === i} onClick={() => handleClick(i)} />
      ))}
    </StyledDots>
  )

  const Arrow = ({ direction, handleClick }) => (
    <StyledArrow direction={direction} onClick={handleClick}>{direction === "left" ? "<" : ">"}</StyledArrow>
  )

  const nextSlide = () => {
    setActiveIndex(activeIndex === slides.length - 1 ? 0 : activeIndex + 1);
    setTransition(0.5);
    setTranslate(translate + getWidth())
  }

  return (
    <>
      <div>
        Hello there
      </div>
      {<StyledWrapper>
        <StyledSlider width={width} translate={translate} transition={transition}>
          {slidesForView.map((slide, i) => {
            console.log("slidesForView -> slide", slide, slidesForView.length);
            return (
              <Slide key={slide + i} content={slide} width={getWidth} />
            )
          })}
        </StyledSlider>
        {/* <Arrow direction="left" handleClick={() => { clearInterval(timer); prevSlide(); }} /> */}
        <Arrow direction="right" handleClick={() => { clearInterval(timer); nextSlide(); }} />
        {/* <Dots activeIndex={activeIndex} handleClick={this.gotoSlide} /> */}
      </StyledWrapper>}
    </>
  );
}

export default SliderFunc;