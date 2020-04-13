import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import Home from './components/home.js'
import TilesView from './components/tiles-view.js'
import MovieForm from './components/add-movie.js'
import {Helmet} from 'react-helmet'

/// shards admin template
import withTracker from "./shards-dashboard/src/withTracker";

// Layout Types
import { DefaultLayout } from "./shards-dashboard/src/layouts";

// Route Views
import BlogOverview from "./shards-dashboard/src/views/BlogOverview";


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
      <Route exact path="/shards-admin/" component={BlogOverview}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
