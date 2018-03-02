import React, { Component } from 'react';
import MdClose from 'react-icons/lib/md/close';
import './list-item.css';

class ListItem extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.details.removeItem(this.props.details.id);
  }

  render() {

    // format dates if income page
    const bodyDisplay = window.location.href.toString().includes('expenses') ? 
      this.props.details.body : new Date(this.props.details.body).toLocaleDateString();

    return (
      <div className="list-item">
        
        <div className="list-item-top">
          <div className="list-item-amount">${this.props.details.amount}</div>
          <div className="list-item-remove">
            <MdClose className="close-icon" onClick={this.handleClick} />
          </div>
        </div>

        <div className="list-item-description">{bodyDisplay}</div>
      </div>
    );
  }
}

export default ListItem;