import React from 'react'
import MakeVideoCard from './MakeVideoCard'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {componentsCount: 1};
  }

  handleAddComponentClick() {
    this.setState({
      componentsCount: this.state.componentsCount + 1
    });
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.handleAddComponentClick.bind(this)}>Add another card</button>
        <div class="card-list">
          {Array.from({ length: this.state.componentsCount }, (_, i) => <MakeVideoCard key={i}/>)}
        </div>
      </div>
    );
  }
}

export default App;
