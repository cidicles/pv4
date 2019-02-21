import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './MainMenu.sass';

/**
 * MainMenu
 * @constructor
 */

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu(bg){
    const {isOpen} = this.state;
    this.setState({
      isOpen: !isOpen,
    })
  }
  onCountryChange(event) {
    this.setState({country: event.target.value});
  }
  render() {
    const {routes, client} = this.props;
    const {isOpen} = this.state;
    return (
      <nav className='main-menu'>
        <div className='main-menu__logo' onClick={this.toggleMenu}>
          <svg viewBox="0 0 64 64">
            <polygon points="63.95 31.91 57.67 25.63 32.05 0 25.72 6.33 51.35 31.95 40.85 42.45 47.17 48.78 64 31.95 63.95 31.91"/>
            <polygon points="0.05 32.09 6.33 38.37 31.95 64 38.28 57.67 12.65 32.05 23.15 21.55 16.82 15.22 0 32.05 0.05 32.09"/>
          </svg>
        </div>
        <div className={`main-menu-links ${isOpen ? 'open' : ''}`}>
          <ul>
            {routes.map((link, i) =>
              <li key={`link-${i}`} onClick={() => this.toggleMenu(link.bg)}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default MainMenu;