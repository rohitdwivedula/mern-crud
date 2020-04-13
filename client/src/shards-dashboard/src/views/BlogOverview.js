import React , {Component} from 'react'
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "./../components/blog/UsersOverview";
import UsersByDevice from "./../components/blog/UsersByDevice";

import API from "../utils/API.js";

class BlogOverview extends Component {
  isDefined = false;
  smallStats = [
    {
      label: "# Movies",
      value: "2,390",
      percentage: "4.7%",
      increase: true,
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 1, 3, 5, 4, 7]
        }
      ]
    },
    {
      label: "# Users",
      value: "182",
      percentage: "12.4",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [1, 2, 3, 3, 3, 4, 4]
        }
      ]
    },
    {
      label: "All Views",
      value: "8,147",
      percentage: "3.8%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,180,0,0.1)",
          borderColor: "rgb(255,180,0)",
          data: [2, 3, 3, 3, 4, 3, 3]
        }
      ]
    },
    {
      label: "Movie Deletion",
      value: "29",
      percentage: "2.71%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" }
    },
    {
      label: "New Movie Addition",
      value: "17,281",
      percentage: "2.4%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgb(0,123,255,0.1)",
          borderColor: "rgb(0,123,255)",
          data: [3, 2, 3, 2, 4, 5, 4]
        }
      ]
    }
  ];
  componentDidMount(){
    // API.get('/api/movies/count').then((response)=>{
    //   this.smallStats[0].value = response.data['movies'];
    // });
    // API.get('/auth/users/count').then((response)=>{
    //   this.smallStats[1].value = response.data['users'];
    // });
    // API.get('/api/stats/views/').then((response)=>{
    //   this.smallStats[2].value = response.data['views'];
    // });
    // console.log(this.smallStats);
  }
  
  render () {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Movie Database Overview" subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row>

 
        <Row>
          <Col lg="8" md="12" sm="12" className="mb-4">
            <UsersOverview />
          </Col>
          <Col lg="4" md="6" sm="12" className="mb-4">
            <UsersByDevice />
          </Col>
        </Row>
      </Container>
    );
  }
}

       // <Row>
       //    {this.smallStats.map((stats, idx) => (
       //      <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
       //        <SmallStats
       //          id={`small-stats-${idx}`}
       //          variation="1"
       //          chartData={stats.datasets}
       //          chartLabels={stats.chartLabels}
       //          label={stats.label}
       //          value={stats.value}
       //          percentage={stats.percentage}
       //          increase={stats.increase}
       //          decrease={stats.decrease}
       //        />
       //      </Col>
       //    ))}
       //  </Row>



export default BlogOverview;