import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  constructor() {
    super()
    this.state = {
      sushis: [],
      money: 100,
      plates: [],
      displaySushis: [],
      page: 1
    }
  }

  componentDidMount() {
    fetch(API)
    .then(res => res.json())
    .then(json => {
      this.setState(previousState => {
         previousState.sushis = json.map(sushi => {
           sushi.hidden = false
           return sushi})
         return previousState
      })
    this.setState({displaySushis: this.state.sushis.slice(0,4)})
    console.log(this.state.displaySushis)
    })
  }

  onSushiClick = (sushi) => {
    if (this.state.money >= sushi.price && sushi.hidden === false) {
      this.setState(previousState => {
        let targetSushi = previousState.sushis.findIndex(sus =>  sus.id === sushi.id)
        previousState.sushis[targetSushi].hidden = true
        previousState.money = previousState.money - sushi.price
        previousState.plates.push("one more sushi!")
        return previousState
      })
    }
  }

  moreSushi = (event) => {
    this.setState(previousState => {
      previousState.page += 1
      previousState.displaySushis = previousState.sushis.slice((previousState.page - 1) * 4, previousState.page * 4)
      return previousState
    })


  }

  render() {
    return (
      <div className="app">
        <SushiContainer moreSushi={this.moreSushi} sushis={this.state.displaySushis} eatSushi={this.onSushiClick} money={this.state.money}/>
        <Table plates={this.state.plates} money={this.state.money}/>
      </div>
    );
  }
}

export default App;