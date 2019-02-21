import React, { Component } from 'react';
import './About.sass';
import posed from 'react-pose';
import { Link } from "react-router-dom";
import { CidiMouseMove } from 'cidi-mouse-move';
import content from '../../Data/content';

/**
 * About
 * @constructor
 */

const P = posed.p({
  enter: {
    delay: 100, 
    x: 0, 
    opacity: 1 
  },
  exit: {
    delay: 100,
    x: 50, 
    opacity: 0 
  },
});

const Btn = posed.div({
  enter: {
    delay: 300,
    x: 0, 
    opacity: 1 
  },
  exit: {
    delay: 300,
    x: -500, 
    opacity: 0 
  }
});

const H1 = posed.h1({
  enter: {
    x: 0, 
    opacity: 1 
  },
  exit: { 
    x: -500, 
    opacity: 0 
  }
});

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='panel panel__offset'>
        <div className='panel__offset--column'>
          <CidiMouseMove 
            distX={0.01} 
            distY={0.01} 
            oMult={0.01} 
            time={0.25}>
            <H1 className='panel__offset--headline'>
              {content.about.heading}
            </H1>
          </CidiMouseMove>
          <P>
            {content.about.desc}
          </P>
          <CidiMouseMove 
            distX={0.04} 
            distY={0.04} 
            oMult={0.05} 
            time={0.25}>
            <Link to={`/approach`}>
              <Btn className='cta'>{content.about.cta}</Btn>
            </Link>
          </CidiMouseMove>
        </div>
        <div className='panel__about--column'></div>
      </div>
    );
  }
}

export default About;