import React, { Component } from 'react';
import './Work.sass';
import projects from '../../Data/work';
import { Link } from "react-router-dom";
import posed from 'react-pose';
import content from '../../Data/content';

/**
 * Work
 * @constructor
 */

const Project = posed.div({
  enter: {
    y: 0, 
    opacity: 1 
  },
  exit: {
    y: 10,
    opacity: 0 
  },
});

const Container = posed.div({
  enter: { 
    staggerChildren: 50 
  },
});

class Work extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='work'>
        <div className='text-center'>
          <h1>{content.work.heading}</h1>
          <p>{content.work.desc}</p>
          <Link to={`/contact`}>
            <div className='cta-block'>
              {content.work.cta}
            </div>
          </Link>
        </div>
        <Container className='grid grid--4-col-even'>
          {projects.projects.map((project, i) => 
            <Link to={`/work/${i}`} key={`project-${i}`}>
              <Project className='grid__item' style={{background: project.color}}>
                <img src={project.logo} alt={project.title} />
                <h4>{project.title}</h4>
              </Project>
            </Link>
          )}
        </Container>
      </div>
    );
  }
}

export default Work;