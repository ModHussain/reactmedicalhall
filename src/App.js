import React, { Component } from 'react';
import Header from './Header';

import {
  Grid,
  Navbar,
  Nav,
  NavItem,
  Jumbotron,
  Button
} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
        <div>
              <Header />
              <Jumbotron>
                <h1>Medical Hall</h1>
                <p>Medicine Delivery to your doorstep in a snap</p>
                <p><Button bsStyle="primary">Learn more</Button></p>
              </Jumbotron>

        </div>
    );
  }
}

export default App;
