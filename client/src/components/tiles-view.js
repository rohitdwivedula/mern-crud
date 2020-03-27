import React , {Component} from 'react'
import {Link} from 'react-router-dom';
import EachMovie from './each-movie.js'
import API from "../utils/API.js";

class TilesView extends Component{
  state={
    loadStatus:false,
    movies: [],
    error:false
  }
  componentDidMount(){
    this.setState(this.props.location.state)
    API.get('/api/movies').then((response) => {
      this.setState({error:false, movies:response.data, loadStatus:true});
      console.log(response.data);
    }).catch(function (error) {
      console.log("ERROR LOADING DATA");
      console.log(error);
      window.location = '/'
    });
  }
  render(){
    // this.microUpdate = this.microUpdate.bind(this)
    // this.filter = this.filter.bind(this)
    var movies = this.state.movies;
    if(this.state.loadStatus==true){
      movies = movies.map(function(movie){
        return(
          <EachMovie movie_id={movie._id} title={movie.title} desc={movie.desc} cast={movie.cast} year={movie.year}/>
        )
      }.bind(this));
    }
    return(
      <div className="wrap">
          <h1 className="title">List of Movies</h1>
            <center><Link to={{pathname:"/movies/add",state:{user:this.state.user}}} id="addm">
                <button className="add-b btn btn-light">Add a Movie</button>
            </Link></center>
          <div className="content">
            {movies}
          </div>
      </div>
    )
  }
}

export default TilesView
