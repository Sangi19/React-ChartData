import "./styles.css";

import React from "react";
import Chart, {
  ArgumentAxis,
  Series,
  ZoomAndPan,
  Legend,
  ScrollBar
} from "devextreme-react/chart";
import { zoomingData } from "./data.js";
import axios from "axios";

// const visualRange = { startValue: 10, endValue: 100 };
const finalArray = [];
let argvalue = 0;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: [] };
  }

  async componentDidMount() {
    axios
      .get(
        `https://demo.questdb.io/exec?query=SELECT pickup_datetime,trip_distance FROM trips;&limit=30`
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({ userData: data.dataset });

        data.dataset.forEach((element) => {
          myfunction(element);
        });

        function myfunction(element) {
          console.log("hi", element[0]);
          let tempobj = {
            x: element[0],
            y: element[1]
          };
          finalArray.push(tempobj);
          console.log(finalArray);
        }
      });
  }

  render() {
    return (
      <div>
        {console.log(finalArray.length)}
        {finalArray.length ? (
          <Chart id="chart" palette="Harmony Light" dataSource={finalArray}>
            <Series argumentField="x" valueField="y" />
            <ArgumentAxis />
            <ScrollBar visible={true} />
            <ZoomAndPan argumentAxis="both" />
            <Legend visible={false} />
          </Chart>
        ) : (
          "data not loaded "
        )}
      </div>
    );
  }
}
