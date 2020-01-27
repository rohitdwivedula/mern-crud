import React , {Component} from 'react'
import Navbar from './navbar.js'
import {Link, Redirect} from 'react-router-dom';
import './view-movie.css'
import API from "../utils/API.js";

class EachMovie extends Component{
  render(){
    var title = this.props.title
    var cast = this.props.cast  
    var year = [this.props.year]
    this.linkHandler = this.linkHandler.bind(this);
    var linkButton = (<button className="m-del btn btn-primary" id={"emub"} onClick={this.linkHandler}>Delete</button>)
    //
    cast = cast.map(function(key,index){
      return(<div className="mkey"><p>{key}</p></div>)
    });
    year = year.map(function(year,index){
      return(<div className="mtech"><p>{year}</p></div>)
    });
    return(
        <div className='each-micro each-mf-comp'>
            <div className="em1">
              <h3 className='movie-name'>{title}</h3>
              <div className="movie_cast">
                {cast}
              </div>
              <p className='micro-desc'> {this.props.desc}</p>
              <h3 className="ts-title">Year of Release</h3>
              <div className="tech_stack">
                  {year}
              </div>
              <div className="micro-but">
                {linkButton}
              </div>
            </div>
        </div>
    )
  }

  /*
  Sometimes, micro-frontends listen to some events and perform actions as well, the function(s) presen below are normal event-handlers from react.
  */
  linkHandler(e)
  {
    var url = "/api/movie/" + this.props.movie_id + "/delete"
    API.get(url,{}).then(res => {
      window.location.reload();
    })
  }
}

/*
Component here is exported so that it can be embedded in other, larger Components
*/

export default EachMovie
