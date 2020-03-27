import React , {Component} from 'react'
import API from "../utils/API.js";
import './addmovie.css'

class MovieForm extends Component{
  state = {}
  render(){
    this.addMovie  = this.addMovie.bind(this)
    return(
      <div className="wrap">
      <h1 className="add-title">Add a Movie</h1>
      <div className="content">
        <form onSubmit={this.addMovie}>
          <div className="ad-n">
          <input type="text" name="title" placeholder="Movie Name (unique)" ref="title" required/>
          </div>
          <div className="ad-n">
          <input type="text" name="year" placeholder="Year of release" ref="year" required/>
          </div>
          <div className="ad-n">
          <input type="text" name="cast" placeholder="Cast Members (Comma seperated values)" ref="cast"/>
          </div>
          <div className="ad-n">
          <textarea name="desc" placeholder="Movie Description" ref="desc" required></textarea>
          </div>
          <input type="submit" value = "Submit"/>
        </form>
      </div>
      </div>
    )
  }

  addMovie(e){
    e.preventDefault()
    var desc = this.refs.desc.value;
    var title = this.refs.title.value;
    var year = Number(this.refs.year.value);
    var cast = this.refs.cast.value.split(',');
    cast = cast.map(item => item.trim());
    console.log(cast);
    if(Number.isNaN(year)||year < 1888){
      alert('Year must be a number greater than 1888. The first movie in the world was released in 1888');
    }
    if(year > 2020){
      alert('You are allowed to enter only already released movies.');
    }
    
    else{
		API.post('/api/movie/add', {
	      title: title,
	      desc: desc,
	      year: year,
	      cast: cast
	    }).then(function (response) {
	      alert("Movie added successfully!");
	      window.location = '/movies';
	    }).catch(function (error) {
	      console.log(error);
	    });
	}
  }
}

export default MovieForm
