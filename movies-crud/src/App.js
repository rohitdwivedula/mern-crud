import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import Home from './components/home.js'
import TilesView from './components/tiles-view.js'
import MovieForm from './components/add-movie.js'
import {Helmet} from 'react-helmet'
function App() {
  return (
    <BrowserRouter>
    <Helmet>
    	<title> {"IS F341"} </title>
    </Helmet>
    <div>
    	<Route exact path='/' component = {Home} />
    	<Route exact path='/movies' component = {TilesView} />
    	<Route exact path='/movies/add' component = {MovieForm} />
    </div>
    </BrowserRouter>
  );
}

export default App;
