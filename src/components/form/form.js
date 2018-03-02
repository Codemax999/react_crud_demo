import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './form.css';

import List from '../list/list';

class Form extends Component {

  constructor(props) {

    super(props);

    this.state = { items: [] };

    this.getForm = this.getForm.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.saveLocal = this.saveLocal.bind(this);
    this.getLocal = this.getLocal.bind(this);
  }

  
  // --- LifeCycle --
  componentWillMount() {

    // current url
    const url = window.location.href.toString();

    let localItems;
    if (url.includes('expenses')) localItems = this.getLocal('expenses');
    else localItems = this.getLocal('income');

    // if localStorage: update state
    if (localItems) {
      localItems.map(x => {
        x.removeItem = this.removeItem;
        return this.setState(prevState => ({
          items: [...prevState.items, x]
        }));
      });
    }
  }


  // --- LocalStorage ---
  // save
  saveLocal() {
    const url = window.location.href.toString();
    if (url.includes('expenses')) localStorage.setItem('expenses', JSON.stringify(this.state.items));
    else localStorage.setItem('income', JSON.stringify(this.state.items));
  }

  // get 
  getLocal(type) {
    if (localStorage.getItem(type) !== null) return JSON.parse(localStorage.getItem(type));
  }


  // --- Form ---
  getForm = () => document.forms.moneyForm;
  restForm = () => document.forms.moneyForm.reset();

  validateForm() {

    // form
    const form = this.getForm();

    // validate form
    let formCount = 0;
    formCount += form.amount.validity.valid ? 0 : 1;
    formCount += form.amount.value.trim().length !== 0 ? 0 : 1;

    if (window.location.href.toString().includes('expenses')) {
      formCount += form.description.validity.valid ? 0 : 1;
      formCount += form.description.value.trim().length !== 0 ? 0 : 1;
    } else {
      formCount += form.date.validity.valid ? 0 : 1;
      formCount += form.date.value.trim().length !== 0 ? 0 : 1;
    }

    // enable and disable submit button
    if (formCount === 0) document.querySelector('#submit').disabled = false;
    else document.querySelector('#submit').disabled = true;
  }


  // --- Items ---
  // add
  addItem(e) {

    // prevent reload
    e.preventDefault();

    // form
    const form = this.getForm();

    // body details
    let body;
    if (window.location.href.toString().includes('expenses')) body = form.description.value.trim();
    else body = form.date.value.toString();

    // new item
    const payload = {
      amount: form.amount.value.trim(),
      body: body,
      id: this.state.items.length,
      removeItem: this.removeItem
    };

    // update
    this.setState(prevState => ({
      items: [...prevState.items, payload]
    }), () => {

      // save updated items + reset and validate form
      this.saveLocal();
      this.restForm();
      this.validateForm();
    });
  }

  // remove
  removeItem(key) {
    this.setState(prevState => ({
      items: [...prevState.items].filter(x => x.id !== key)
    }), () => this.saveLocal());
  }

  render() {

    // current url & Type
    const url = window.location.href.toString();
    const pageType = url.includes('expenses') ? 'Expense' : 'Income';

    // Form
    return (
      <div className="form">

        <form name="moneyForm" id="moneyForm" onSubmit={this.addItem}>

          <div>
            <h1>New {pageType}</h1>
            <h5>Items will be added to the main chart to help you keep track</h5>
          </div>

          <div>
            <label>Amount</label>
            <input id="amount"
              type="number"
              name="amount"
              aria-required="true"
              onKeyUp={this.validateForm}
              onBlur={this.validateForm} />
          </div>

          { // Expense Description
            pageType === 'Expense' &&
            <div>
              <label>Description</label>
              <input id="description"
                type="text"
                name="description"
                aria-required="true"
                onKeyUp={this.validateForm}
                onBlur={this.validateForm} />
            </div>
          }

          { // Income Date
            pageType === 'Income' &&
            <div>
              <label>Date</label>
              <input id="date"
                type="date"
                name="date"
                aria-required="true" 
                onKeyUp={this.validateForm}
                onBlur={this.validateForm} />
            </div>
          }

          <input id="submit" type="submit" value="Confirm" disabled />
        </form>

        <List items={this.state.items} />
      </div>
    );
  }
}

// Form Array Object PropTypes
Form.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    removeItem: PropTypes.func.isRequired
  }))
}

export default Form;