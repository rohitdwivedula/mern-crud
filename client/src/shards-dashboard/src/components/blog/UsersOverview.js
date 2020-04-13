import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import RangeDatePicker from "../common/RangeDatePicker";
import Chart from "../../utils/chart";
import API from "../../utils/API.js";

class UsersOverview extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    API.get('/api/stats/users?days=31').then((response) => {
        const chartOptions = {
        ...{
          responsive: true,
          legend: {
            position: "top"
          },
          elements: {
            line: {
              // A higher value makes the line look skewed at this ratio.
              tension: 0.3
            },
            point: {
              radius: 0
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: false,
                ticks: {
                  callback(tick, index) {
                    // Jump every 7 values on the X axis labels to avoid clutter.
                    return index % 7 !== 0 ? "" : tick;
                  }
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  callback(tick, index) {
                    return index % 5 !== 0 ? "" : tick;
                  }
                }
              }
            ]
          },
          hover: {
            mode: "nearest",
            intersect: false
          },
          tooltips: {
            custom: false,
            mode: "nearest",
            intersect: false
          }
        },
        ...this.props.chartOptions
      };

      var myData = response.data.data;
      var values = [];
      var labels = [];
      for(var i=0;i<myData.length;i++){
        labels.push("Day " + i);
        values.push(myData[i]);
      }
      var time_series_data = {
        labels: labels,
        datasets: [
          {
            label: "Daily New Users (Last 15 Days)",
            fill: "start",
            data: values,
            backgroundColor: "rgba(0,123,255,0.1)",
            borderColor: "rgba(0,123,255,1)",
            pointBackgroundColor: "#ffffff",
            pointHoverBackgroundColor: "rgb(0,123,255)",
            borderWidth: 1.5,
            pointRadius: 0,
            pointHoverRadius: 3
          }
        ]
      };
      const BlogUsersOverview = new Chart(this.canvasRef.current, {
        type: "LineWithLine",
        data: time_series_data,
        options: chartOptions
      });

      // They can still be triggered on hover.
      const buoMeta = BlogUsersOverview.getDatasetMeta(0);
      buoMeta.data[0]._model.radius = 0;
      buoMeta.data[
        time_series_data.datasets[0].data.length - 1
      ]._model.radius = 0;

      // Render the chart.
      BlogUsersOverview.render();

    }).catch(function (error) {
      console.log("ERROR LOADING DATA");
      console.log(error);
      // window.location = '/'
    });


  }

  render() {
    const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="pt-0">
          <Row className="border-bottom py-2 bg-light">
            <Col sm="6" className="d-flex mb-2 mb-sm-0">
              <RangeDatePicker />
            </Col>
            <Col>
              <Button
                size="sm"
                className="d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
              >
                View Full Report (coming soon!) &rarr;
              </Button>
            </Col>
          </Row>
          <canvas
            height="120"
            ref={this.canvasRef}
            style={{ maxWidth: "100% !important" }}
          />
        </CardBody>
      </Card>
    );
  }
}

UsersOverview.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object
};

UsersOverview.defaultProps = {
  title: "Users Overview",
  chartData: {
    labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
    datasets: [
      {
        label: "New Users",
        fill: "start",
        data: [
          5,
          8,
          0,
          0,
          0,
          3,
          2,
          6,
          5,
          12,
          7,
          9,
          1,
          1,
          9,
          1,
          10,
          20,
          2,
          1,
          30,
          32,
          30,
          20,
          30,
          30,
          30,
          2,
          3,
          0
        ],
        backgroundColor: "rgba(0,123,255,0.1)",
        borderColor: "rgba(0,123,255,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgb(0,123,255)",
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3
      }
    ]
  }
};

export default UsersOverview;
