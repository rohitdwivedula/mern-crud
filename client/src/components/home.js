import React , {Component} from 'react'
import './home.css'

class Home extends Component {
  render(){
    return(
      <div className="home-wrap">
        <div className="landing">
          <h1 className="home-title">Movie Database</h1>
            <div className="land-desc col-lg-6 col-md-7">
              A simple app to help you: create your first MERN app, understand how code is organized for webapps like these, and perhaps make a few changes of your own as well too! <a href="/auth/google">Click here</a> to login with Google.
            </div>
        </div>
      </div>
    );
  }
}

export default Home
