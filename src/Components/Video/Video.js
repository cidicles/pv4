import React, { Component } from 'react';
import './Video.sass';

/**
 * Video
 * @constructor
 */

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { src } = this.props;
    return (
      <div className='video'>
        <video muted {...this.props}>
          <source src={ src } type='video/mp4' />
        </video>
      </div>
    );
  } 
}

export default Video;
