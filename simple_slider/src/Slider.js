import React, { Component } from 'react';
import { StyledWrapper, StyledSlider, getSlides, Slide, Dots, Arrow } from './utils';

const slides = getSlides();

class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      translate: this.getWidth(),
      transition: 0.5,
      slides: [slides[slides.length - 1], slides[0], slides[1]]
    };

    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.gotoSlide = this.gotoSlide.bind(this);
    this.createSlides = this.createSlides.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => { this.nextSlide() }, 3000);
    this.transitionEnd = window.addEventListener('transitionend', this.createSlides);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    window.removeEventListener('transitionend', this.transitionEnd);
  }

  componentDidUpdate(prevProps, prevState) {
  }

  getWidth = () => window.innerWidth

  prevSlide() {
    const { activeIndex } = this.state;

    this.setState({
      ...this.state,
      activeIndex: activeIndex === 0 ? slides.length - 1 : activeIndex - 1,
      transition: 0.5,
      translate: 0
    });
  }

  nextSlide() {
    const { activeIndex, translate } = this.state;

    this.setState({
      ...this.state,
      activeIndex: activeIndex === slides.length - 1 ? 0 : activeIndex + 1,
      transition: 0.5,
      translate: translate + this.getWidth()
    });
  }

  gotoSlide(number) {
    this.setState({
      ...this.state,
      activeIndex: number,
      transition: 0.5,
      translate: number * this.getWidth()
    });
  }

  createSlides() {
    const { activeIndex } = this.state;
    let images = [];

    if (activeIndex === slides.length - 1) {
      images = [slides[slides.length - 2], slides[slides.length - 1], slides[0]];
    } else if (activeIndex === 0) {
      images = [slides[slides.length - 1], slides[0], slides[1]];
    } else {
      images = slides.slice(activeIndex - 1, activeIndex + 2)
    }

    this.setState({
      ...this.state,
      translate: this.getWidth(),
      transition: 0,
      slides: images
    }, () => { console.log("hello there") });
  }

  render() {
    const { activeIndex, translate, transition, slides } = this.state;

    return (
      <StyledWrapper>
        <StyledSlider width={this.getWidth()} translate={translate} transition={transition}>
          {slides.map((slide, i) => {
            console.log("slides -> slide", slide, slide.length);
            return (
            <Slide key={slide + i} content={slide} width={this.getWidth()} />
          )})}
        </StyledSlider>
        <Arrow direction="left" handleClick={() => { clearInterval(this.timer); this.prevSlide(); }} />
        <Arrow direction="right" handleClick={() => { clearInterval(this.timer); this.nextSlide(); }} />
        <Dots activeIndex={activeIndex} handleClick={this.gotoSlide} />
      </StyledWrapper>
    );
  }
}

export default Slider;
