import React, { Component } from 'react';
import './WorkDetail.sass';
import projects from '../../Data/work';
import Video from '../../Components/Video/Video';
import ReactTooltip from 'react-tooltip';
import {cdnBase} from '../../const';
import posed from 'react-pose';
import { Link } from "react-router-dom";

/**
 * Work Detail
 * @constructor
 */

const WorkTitle = posed.h1({
  enter: {
    x: 0, 
    opacity: 1 
  },
  exit: {
    x: -90,
    opacity: 0 
  },
});

const WorkTagline = posed.h3({
  enter: {
    x: 0, 
    opacity: 1 
  },
  exit: {
    x: 90,
    opacity: 0 
  },
});

const WorkHr = posed.hr({
  enter: {
    rotate: 0, 
    opacity: 1 
  },
  exit: {
    rotate: -20,
    opacity: 0 
  },
});

const Container = posed.div({
  enter: { 
    staggerChildren: 50 
  },
});

class WorkDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workDetail: projects.projects[this.props.match.params.pid],
      hasHeading: true,
    };
    this.toggleHeading = this.toggleHeading.bind(this);
  }
  componentDidMount(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  toggleHeading(){
    const { hasHeading } = this.state;
    console.log(hasHeading);
    this.setState({
      hasHeading: !hasHeading
    });
  }
  render() {
    const { workDetail, hasHeading } = this.state;
    return (
      <Container className='content-z'>
        <div className={`${hasHeading ? '' : 'featured-heading-hidden'} featured-heading`} style={{backgroundColor: workDetail.color}}>
          <div className='featured-copy' onClick={this.toggleHeading}>
            <WorkTitle>
              {workDetail.title}
            </WorkTitle>
            <WorkHr className='featured-accent' />
            <WorkTagline>{workDetail.tagline}</WorkTagline>
            <div className='featured-accent-tri'></div>
          </div>
          <div className='featured-tab' onClick={this.toggleHeading}>
            { hasHeading ? 'Hide Title' : 'Show Title' }
          </div>
          <Link to='/work'>
            <div className='featured-back'>Back to Work</div>
          </Link>
          <div className='featured-video'>
            <Video src={workDetail.videos} autoPlay={true} loop={true} controls={false} />
          </div>
        </div>
        <div className='featured-work'>
          <div className='grid grid--2-col-golden'>
            <div>
              <div className='featured-block'>
                <h3>Role</h3>
                <h4>
                  { workDetail.role }
                </h4>
              </div>
              <div className='featured-block'>
                <h3>Completed At</h3>
                <h4>
                  { workDetail.completedAt }
                </h4>
              </div>
              <div className='featured-block'>
                <h3>Medium</h3>
                <h4>
                  { workDetail.medium }
                </h4>
              </div>
            </div>
            <div>
              <div className='featured-block'>
                <h3>Description</h3>
                <p>
                  {workDetail.longdesc}
                </p>
              </div>
              <div className='featured-block'>
                <h3>Built With</h3>
                  <ul className='featured-skills'>
                    {workDetail.languages && workDetail.languages.map((language, index) => (
                      <li
                        data-tip={language.toUpperCase()} 
                        data-place={'top'}
                        key={`language-${index}`}>
                        <img src={`${cdnBase}logos/${language.toLowerCase().replace(' ','')}.png`} alt={language.toUpperCase()} />
                      </li>
                    ))}
                  </ul>
                  { workDetail.link !== '' &&
                    <a className='featured-link' href={workDetail.link} rel='noopener noreferrer' target='_blank' title={workDetail.title}>
                      Visit Build
                    </a>
                  }
                  <Link to='/work'>
                    <div className='featured-link highlight'>Back to Work</div>
                  </Link>
              </div>
            </div>
          </div>
        </div>
        <ReactTooltip />
      </Container>
    );
  }
}

export default WorkDetail;