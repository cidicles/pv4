import React, { Component } from 'react';
import { Link } from "react-router-dom";
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Cycler from './Cycler';
import './Slide.sass';

/**
 * Slide
 * @constructor
 */

const GET_COUNTRIES = gql`
  {
    countries {
      name
      code
    }
  }
`;

class Slide extends Component {
  constructor(props) {
    super(props);
    this.cycler = new Cycler([
        {
            name: 'Name'
        }
    ], 1, 0);
    this.state = {
      country: 'US',
    };
  }
  onCountryChange(event) {
    this.setState({country: event.target.value});
  }
  render() {
    const {routes, client} = this.props;
    const {isOpen} = this.state;
    return (
      <nav className='slide'>
        <Query query={GET_COUNTRIES} client={client}>
            {({loading, error, data}) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>{error.message}</p>;
                console.log('menu rendered')
                return (
                <select
                    value={this.state.country}
                    onChange={this.onCountryChange.bind(this)}
                >
                    {data.countries.map(country => (
                    <option key={country.code} value={country.code}>
                        {country.name}
                    </option>
                    ))}
                </select>
                );
            }}
        </Query>
      </nav>
    );
  }
}

export default Slide;