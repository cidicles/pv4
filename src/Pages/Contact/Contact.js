import React, { Component } from 'react';
import './Contact.sass';
import posed from 'react-pose';
import { CidiMouseMove } from 'cidi-mouse-move';
import content from '../../Data/content';

/**
 * Contact
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

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='panel panel__offset panel--70'>
        <div className='panel__offset--column'>
          <CidiMouseMove 
            distX={0.01} 
            distY={0.01} 
            oMult={0.01} 
            time={0.25}>
            <H1 className='panel__offset--headline'>
              {content.contact.heading}
            </H1>
          </CidiMouseMove>
          <P>
            {content.contact.desc}
          </P>
          <CidiMouseMove 
            distX={0.04} 
            distY={0.04} 
            oMult={0.05} 
            time={0.25}>
            <a href='https://docs.google.com/document/d/e/2PACX-1vSZ_mH8Rzi53iFxoimC5ydRFVFXnMphO-T324RZ30mdPCgGC2KhuuWER33ME9C2avbcjr50pOhp-gyP/pub'>
              <Btn className='cta'>{content.contact.cta}</Btn>
            </a>
          </CidiMouseMove>
        </div>
        <div className='panel__about--column'>
        </div>
      </div>
    );
  }
}

export default Contact;