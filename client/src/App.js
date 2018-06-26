import React, {Component} from 'react';
import ProductsList from './components/ProductsList'
import ProductDetails from './components/ProductDetails'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (<Router>
      <div>
        <Route exact path="/products" component={ProductsList}/>
        <Route exact path="/products/:id" component={ProductDetails}/>
        <Route exact path="/" render={() => <Redirect to="/products"/>}/>

      </div>
    </Router>)
  }
}
export default App;
