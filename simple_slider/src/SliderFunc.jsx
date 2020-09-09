import React, { useState, useEffect, useRef } from 'react';
import { StyledWrapper, getSlides, StyledSlider, Slide, Dots, Arrow } from './utils';

const slides = getSlides();

const getWidth = () => window.innerWidth;

function SliderFunc() {

  const [timer, setTimer] = useState(0);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [translate, setTranslate] = useState(getWidth());
  const [transition, setTransition] = useState(0.5);
  const [slidesForView, setSlides] = useState([slides[slides.length - 1], slides[0], slides[1]]);

  useEffect(() => {
    setTimer(setInterval(() => { nextSlide() }, 300000));
    const transitionEnd = window.addEventListener('transitionend', createSlides);
    setSlides(createSlides());
    console.log(getWidth());

    return () => {
      clearInterval(timer);
      window.removeEventListener('transitionend', transitionEnd);
    }

  }, []);

  const createSlides = () => {
    let images = [];
    if (activeIndexRef.current === slides.length - 1) {
      images = [slides[slides.length - 2], slides[slides.length - 1], slides[0]];
    } else if (activeIndexRef.current === 0) {
      images = [slides[slides.length - 1], slides[0], slides[1]];
    } else {
      images = slides.slice(activeIndexRef.current - 1, activeIndexRef.current + 2)
    }
    setTranslate(getWidth());
    setTransition(0);
    console.log("createSlides -> images", activeIndexRef.current);
    console.log("createSlides -> translate", translate);
    return images;
  }

  const nextSlide = () => {
    activeIndexRef.current++;
    setActiveIndex(1);
    setTransition(0.5);
    setTranslate(translate + getWidth())
  }

  return (
    <>
      <div>
        Hello there
      </div>
      {<StyledWrapper>
        <StyledSlider width={getWidth()} translate={translate} transition={transition}>
          {slidesForView.map((slide, i) => {
            console.log("slidesForView -> slide", slide, slidesForView.length);
            return (
              <Slide key={slide + i} content={slide} width={getWidth()} />
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