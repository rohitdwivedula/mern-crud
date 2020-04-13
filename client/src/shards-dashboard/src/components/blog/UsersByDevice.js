import React from "react";
import PropTypes from "prop-types";
import API from "../../../../utils/API.js";


import {
  Row,
  Col,
  FormSelect,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";

import Chart from "../../utils/chart";

class UsersByDevice extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    API.get('/api/stats/views/total?type=device').then((response) => {
      var real_data = response.data.data;
      var values = [];
      var labels = [];
      for(var i=0;i<real_data.length;i++){
        labels.push(real_data[i]['_id']['label']);
        values.push(real_data[i]['count']);
      }
      var data_for_chart = {
        datasets: [
          {
            hoverBorderColor: "#ffffff",
            data: values,
            backgroundColor: [
              "rgba(0,0,255,0.9)",
              "rgba(0,123,255,0.9)",
              "rgba(0,123,0,0.9)",
              "rgba(123,0,255,0.7)",
              "rgba(255,0,0,0.9)"
            ]
          }
        ],
        labels: labels
      };
      const chartConfig = {
        type: "pie",
        data: data_for_chart,
        options: {
          ...{
            legend: {
              position: "bottom",
              labels: {
                padding: 25,
                boxWidth: 20
              }
            },
            cutoutPercentage: 0,
            tooltips: {
              custom: false,
              mode: "index",
              position: "nearest"
            }
          },
          ...this.props.chartOptions
        }
      };
      new Chart(this.canvasRef.current, chartConfig);
    }).catch(function (error) {
      console.log("ERROR LOADING DATA");
      console.log(error);
      window.location = '/'
    });
  }

  render() {
    const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        <CardFooter className="border-top">
          <Row>
            <Col>
            </Col>
            <Col className="text-right view-report">
              {/* eslint-disable-next-line */}
              <a href="#">Full report (coming soon!)&rarr;</a>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

UsersByDevice.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.object
};

UsersByDevice.defaultProps = {
  title: "Users by device",
  chartData: {
    datasets: [
      {
        hoverBorderColor: "#ffffff",
        data: [68.3, 24.2, 7.5],
        backgroundColor: [
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.5)",
          "rgba(0,123,255,0.3)"
        ]
      }
    ],
    labels: ["Desktop", "Tablet", "Mobile"]
  }
};

export default UsersByDevice;
