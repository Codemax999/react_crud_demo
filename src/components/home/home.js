import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import './home.css';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Expenses and Income',
        hAxis: { title: 'Index', minValue: 0, maxValue: 10 },
        vAxis: { title: 'Amount', minValue: 0, maxValue: 15 },
        legend: { position: 'top', alignment: 'end' }
      },
      data: [
        ["Index", "Income", "Expenses"],
        ["0", 0, 0]
      ],
      columns: [
        { type: 'number', label: 'Expenses' },
        { type: 'number', label: 'Income' },
      ],
    };
    this.getLocal = this.getLocal.bind(this);
  }


  // --- LifeCycle --
  componentWillMount() {

    // localStorage array of objects
    let localItems = [];
    localItems = this.getLocal('expenses') ? this.getLocal('expenses') : localItems;
    localItems = this.getLocal('income') ? localItems.concat(this.getLocal('income')) : localItems;

    // array for chart arrays
    let newItems = [];
    if (!!localItems && localItems.length > 0) {
      localItems
        .sort((a, b) => b.id - a.id)
        .map((x, i) => {

          // create array at index (by id)
          let type = x[1] === 'income' ? 1 : 2;

          // create new array template and new data to 2D array
          newItems[i] = [String(i), 0, 0];
          newItems[i][type] = x[2];
          return newItems;
        });
    }

    // if localStorage: update state
    if (newItems.length > 0) {
      this.setState(prevState => ({ 
        data: [this.state.data[0]].concat(newItems) 
      }));
    }
  }


  // --- LocalStorage ---
  // get 
  getLocal(type) {

    if (localStorage.getItem(type) !== null) {

      return JSON.parse(localStorage.getItem(type))
        .map(x => {
          x.type = type;
          return [String(x.id), x.type, Number(x.amount)];
        });
    }
  }

  render() {
    return (
      <Chart
        chartType="ScatterChart"
        data={this.state.data}
        columns={this.state.columns}
        options={this.state.options}
        graph_id="AreaChart"
        width={'100%'}
        height={'400px'}
        legend_toggle
      />
    );
  }
}

export default Home;