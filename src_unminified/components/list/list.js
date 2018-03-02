import React, { Component } from 'react';
import './list.css';

import ListItem from '../list-item/list-item';

class List extends Component {

  render() {

    // List of items
    const items = [...this.props.items]
      .sort((a, b) => b.id - a.id)
      .map(x => <ListItem key={x.id} details={x} />);

    // title
    const title = items.length ? <h1>Added</h1> : false;

    return (
      <div className="list">
        <div className="list-title">{title}</div>
        <ul>{items}</ul>
      </div>
    );
  }
}

export default List;