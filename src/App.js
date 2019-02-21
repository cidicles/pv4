import React, { Component } from 'react';

import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.sass';
import posed, { PoseGroup } from 'react-pose';
import content from './Data/content';

// Redux
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { PersistGate } from 'redux-persist/lib/integration/react';

// Components
import MainMenu from './Components/MainMenu/MainMenu';
import Slide from './Components/Slide/Slide';
import Bg from './Components/Bg/Bg';

// Pages
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Approach from './Pages/Approach/Approach';
import Work from './Pages/Work/Work';
import WorkDetail from './Pages/WorkDetail/WorkDetail';
import Contact from './Pages/Contact/Contact';


// Create GraphQL Client
const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com'
});

const RouteContainer = posed.div({
  enter: {
    opacity: 1,
    beforeChildren: true,
  },
  exit: {
    opacity: 0,
  }
});

// Create the Store
const { store, persistor } = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {
          name: 'Home',
          exact: true,
          component: Home,
          path: '/',
          display: true,
          bg: content.home.bg
        },
        {
          name: 'Who I Am',
          exact: true,
          component: About,
          path: '/about',
          display: true,
          bg: content.about.bg
        },
        {
          name: 'How We Fit',
          exact: true,
          component: Approach,
          path: '/approach',
          display: true,
          bg: content.approach.bg
        },
        {
          name: 'Work',
          exact: true,
          component: Work,
          path: '/work',
          display: true,
          bg: content.work.bg
        },
        {
          name: 'Contact',
          exact: true,
          component: Contact,
          path: '/contact',
          display: true,
          bg: content.contact.bg
        },
        {
          name: 'Work Detail',
          exact: false,
          component: WorkDetail,
          path: '/work/:pid',
          display: false,
          bg: content.work.bg
        },
      ],
    };
  }
  render() {
    const { routes } = this.state;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Route
              render={({ location }) => (
                <div id='site-container'>
                  <MainMenu routes={routes.filter(r => r.display === true)} />
                  <Slide client={client} />
                  <Bg routes={routes} currentRoute={location.pathname} />
                  <PoseGroup>
                    <RouteContainer key={location.pathname}>
                      <Switch location={location}>
                        {this.state.routes.map((route, i) => 
                          <Route path={route.path} exact={route.exact} component={route.component} key={`route-${i}`} /> 
                        )}
                      </Switch>
                    </RouteContainer>
                  </PoseGroup>
                </div>
              )}
            />
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
