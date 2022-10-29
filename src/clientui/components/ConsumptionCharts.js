import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as CLIENT_API from "../api/ClientApi";

import {
  AreaChart,
  Area,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import useUser from "../../commons/services/useUser";
function ConsumptionChart(props) {
  const [error, setError] = useState({ status: 0, errorMessage: null });
  const [date, setDate] = useState(new Date());

  const [data, setData] = useState([
    {
      name: "Jan 2019",
      "Product A": 3432,
    },
    {
      name: "Feb 2019",
      "Product A": 2342,
    },
    {
      name: "Mar 2019",
      "Product A": 4565,
    },
    {
      name: "Apr 2019",
      "Product A": 6654,
    },
    {
      name: "May 2019",
      "Product A": 8765,
    },
  ]);

  const handleCalendarClose = () => getDataSet();
  console.log(date);
  useEffect(() => {
    getDataSet();
  }, []);
  function getDataSet() {
    const params = {};
    params["ownerId"] = props.ownerId;
    params["deviceId"] = props.deviceId;
    params["day"] = date.getUTCDate();
    params["month"] = date.getUTCMonth() + 1;
    params["year"] = date.getUTCFullYear();
    return CLIENT_API.getDataSet(
      props.access_token,
      params,
      (result, status, err) => {
        if (result !== null && status === 200) {
          const newData = [];
          result.map((data_point) => {
            newData.push({
              name: data_point.hour,
              "Consumption kW/h": data_point.value,
            });
          });
          setData(newData);
        } else {
          setError((error) => ({ status: status, errorMessage: err }));
        }
      }
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-4" />
        <div className="col-4">
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            popperClassName="some-custom-class"
            popperPlacement="top-end"
            onCalendarClose={handleCalendarClose}
            maxDate={new Date()}
            popperModifiers={[
              {
                name: "offset",
                options: {
                  offset: [5, 10],
                },
              },
              {
                name: "preventOverflow",
                options: {
                  rootBoundary: "viewport",
                  tether: false,
                  altAxis: true,
                },
              },
            ]}
          />
        </div>
        <div className="col-4" />
      </div>
      <div className="row" style={{ overflow: "auto" }}>
        <div className="col-8">
          {" "}
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="Consumption kW/h"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
}
export default ConsumptionChart;
