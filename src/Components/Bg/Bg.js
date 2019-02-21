import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import * as filters from 'pixi-filters';
import { connect } from 'react-redux';
import _ from 'lodash';
import './Bg.sass';

/**
 * Particles
 * @constructor
 */

class Bg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldImage: null
    };
  }
  getDimentions(){
    const { innerWidth } = window;
    return (
      {
        width: innerWidth,
        height: (innerWidth / 16) * 9
      }
    );
  }
  componentWillUnmount(){
    this.app.destroy();
  }
  componentDidMount(){

    // PIXI
    this.app = new PIXI.Application(
      this.getDimentions().width,
      this.getDimentions().height,
      {
        antialias: true,
        transparent: true
      }
    );

    this.app.stage.interactive = true;
    this.pixiCont.appendChild(this.app.view);

    // Stage
    this.stageContainer = new PIXI.Container();
    this.app.stage.addChild(this.stageContainer);

    // Image
    this.imgFilter = new filters.OldFilmFilter({
      sepia: 0,
      vignetting: 0.1
    });

    this.imgFilter2 = new filters.AdjustmentFilter({
      gamma: 1,
      saturation: 0,
      contrast: 1,
      brightness: 1,
      red: 1,
      green: 1,
      blue: 1,
      alpha: 0.3,
    });
    
    this.imgFilter3 = new filters.ReflectionFilter({
      mirror: true,
      boundary: 0.8,
      amplitude: [0,20],
      waveLength: [200,100],
      alpha: [1,0],
      time: 1
    });

    this.imgContainer = new PIXI.Container();
    this.imgContainer.filters = [this.imgFilter, this.imgFilter2,this.imgFilter3];
    this.stageContainer.addChild(this.imgContainer);

    // Mouse
    this.mouseContainer = new PIXI.Container();
    this.app.stage.addChild(this.mouseContainer);
    this.mouse = {
      clientX: 0,
      clientY: 0
    };

    // Media
    this.addMedia();

    // Stage Filters
    this.count = 0;
    this.CRTfilter = new filters.CRTFilter({
      curvature: 1.0,
      lineWidth: 1.0,
      lineContrast: 0.8,
      verticalLine: false,
      noise: 0.2,
      seed: 0,
      vignetting: 0.2,
      vignettingAlpha: 0.1,
      vignettingBlur: 0.3,
      time: 0,
    });

    this.godRayFilter = new filters.GodrayFilter({
      angle: 90,
      gain: .35,
      lacunrity: 1.5,
      parallel: true,
      center: [0,0],
    });

    this.Glitchfilter = new filters.GlitchFilter({
      slices: 300,
      fillMode: 3,
      sampleSize: 512
    });
    this.RGBSplitFilter = new filters.RGBSplitFilter([-10,0],[0,10],[10,0]);
    this.rgbOffsets = [[-10,0],[0,10],[0,0]];

    this.stageContainer.filters = [this.CRTfilter, this.Glitchfilter, this.RGBSplitFilter];

    // Global Listeners

    window.onresize = function(event) {

      // Stage
      let w = window.innerWidth;
      let h = window.innerHeight;
      this.app.renderer.resize(w, h);

      // Video
      this.bgImg.width = this.getDimentions().width;
      this.bgImg.height = this.getDimentions().height;

    }.bind(this);

    // Time
    this.glitchCounter = 0;
    this.asciiFilterCounter = 0.2;
    this.glitchCounterTime = 0;
    this.ticker = 0;

    this.app.ticker.add((delta) => {

      if(this.bgImg){
        // Fade In New Image & Glitch
        if(this.bgImg.alpha < 1){
          this.bgImg.alpha += 0.07;
          this.Glitchfilter.offset = _.random(20, 300);
          this.RGBSplitFilter.red = [_.random(0, 10),_.random(0, 10)];
          this.RGBSplitFilter.green = [_.random(0, 10),_.random(0, 10)];
          this.RGBSplitFilter.blue = [_.random(0, 10),_.random(0, 10)];
        } else {
          this.Glitchfilter.offset = 0;
          this.RGBSplitFilter.red = [0, 0];
          this.RGBSplitFilter.green = [0, 0];
          this.RGBSplitFilter.blue = [0, 0];
        }
      }

      if(this.video){
        // Fade In New Image & Glitch
        if(this.video.alpha < 1){
          this.video.alpha += 0.01;
          this.Glitchfilter.offset = _.random(20, 300);
        } else {
          this.Glitchfilter.offset = 0;
        }
      }

      // Stage Filters
      this.CRTfilter.time += 0.1;
      this.godRayFilter.time += 0.003;
      this.imgFilter3.time += 0.009;

    });
  }
  componentDidUpdate(){
    this.addMedia();
    this.glitchCounter = 0;
    this.asciiFilterCounter = 0;
  }
  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.currentRoute !== this.props.currentRoute){
      return true;
    }
    return false;
  }
  componentWillReceiveProps(){
    this.setState({
      oldImage: this.props.img
    });
  }
  addMedia(){
    const {img,currentRoute,routes} = this.props;
    const {oldImage} = this.state;
    let setImg = img;

    // :( in a rush here, not sustainable
    if(!img){
      if(currentRoute.split('/').length - 1 > 1){
        setImg = routes.filter((r) => r.path === '/work/:pid')[0].bg;
      } else {
        setImg = routes.filter((r) => r.path === currentRoute)[0].bg;
      }
    }

    if(oldImage){
      // create a new Sprite from an image path
      this.bgImg2 = PIXI.Sprite.fromImage(oldImage)
      this.bgImg2.anchor.set(0);
      this.bgImg2.x = 0;
      this.bgImg2.y = 0;
      this.bgImg2.width = this.getDimentions().width;
      this.bgImg2.height = this.getDimentions().height;
      this.imgContainer.addChild(this.bgImg2);
    }

    this.bgImg = PIXI.Sprite.fromImage(setImg)
    this.bgImg.anchor.set(0);
    this.bgImg.x = 0;
    this.bgImg.y = 0;
    this.bgImg.alpha = 0;
    this.bgImg.width = this.getDimentions().width;
    this.bgImg.height = this.getDimentions().height;
    this.imgContainer.addChild(this.bgImg);
  }
  render() {
    return (
      <div id='stage' ref={(elem) => this.pixiCont = elem}></div>
    );
  }
}

function mapStateToProps(state) {
  return {
    img: state.bg
  };
}

export default connect(mapStateToProps)(Bg);