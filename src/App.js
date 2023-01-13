import React from 'react'
import MakeVideoCard from './MakeVideoCard'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {componentsCount: 1, incValue: 1};
  }

  handleIncChange(event) {
    this.setState({ incValue: parseInt(event.target.value) })
  }

  handleAddComponentClick() {
    this.setState({
      componentsCount: this.state.componentsCount + this.state.incValue
    });
  }

  handleStartAllClick() {
    document.querySelectorAll('.request-render-button').forEach((bb) => bb.click())
  }

  render() {
    return (
      <div className="App">
        <div style={{padding: '10px 0'}}>
          <input
            type="number"
            value={this.state.incValue}
            onChange={this.handleIncChange.bind(this)}
            style={{maxWidth: "50px"}} />
          <button onClick={this.handleAddComponentClick.bind(this)}>Add another card</button>
          <button onClick={this.handleStartAllClick.bind(this)}>Start all</button>
        </div>
        <div className="card-list">
          {Array.from({ length: this.state.componentsCount }, (_, i) => <MakeVideoCard key={i}/>)}
        </div>
      </div>
    );
  }
}

export default App;
