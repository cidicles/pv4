import React, { Component } from 'react';
import './Home.sass';
import { Link } from "react-router-dom";
import posed from 'react-pose';
import content from '../../Data/content';

/**
 * Home
 * @constructor
 */

const Headline = posed.h1({
  enter: {
    y: 0,
    opacity: 1,
    delay: 500,
  },
  exit: {
    y: 100,
    opacity: 0,
  },
});

const Headline2 = posed.h2({
  enter: {
    y: 0,
    opacity: 0.2,
    delay: 0,
  },
  exit: {
    y: -100,
    opacity: 0,
  },
});

const CtaBottom = posed.div({
  enter: {
    opacity: 1,
    delay: 500,
  },
  exit: {
    opacity: 0,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='panel panel--center-all'>
        <Headline>
            {content.home.heading}
        </Headline>
        <Headline2>
            {content.home.subHeading}
        </Headline2>
        <CtaBottom className='cta-tri-bottom'>
          <Link to={`/about`}>
            {content.home.cta}
          </Link>
        </CtaBottom>
      </div>
    );
  }
}

export default Home;