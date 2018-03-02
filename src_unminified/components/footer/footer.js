import React, { Component } from 'react';
import './footer.css';

const name = '<codemax/>';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <h1>{name}</h1>
      </div>
    );
  }
}

export default Footer;