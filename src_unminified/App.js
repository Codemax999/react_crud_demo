import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';

import Header from './components/header/header';
import Home from './components/home/home';
import Expenses from './components/expenses/expenses';
import Income from './components/income/income';
import Footer from './components/footer/footer';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div className="view-container">
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/expenses" component={Expenses} />
            <Route path="/income" component={Income} />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
