import React, { Component } from "react";

const withTracker = (WrappedComponent, options = {}) => {
  const HOC = class extends Component {
    state = {};
    componentDidMount() {
      const page = this.props.location.pathname + this.props.location.search;
    	this.state.smallStats = [];
    	this.state.smallStats.push({value: "2878327"});
    }

    render() {
      return <WrappedComponent smallStats = {this.state.smallStats} />;
    }
  };
  return HOC;
};

export default withTracker;
