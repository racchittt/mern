import React, { useEffect, useState } from "react";
import {
  LineChart,
  Label,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/fuel/chart");
      const fetchedData = await res.json();
      console.log("Fetched Data:", fetchedData);

      const formattedData = fetchedData.fuel.map((entry) => ({
        timestamp: new Date(entry.timestamp).toLocaleTimeString().toLowerCase(),
        fuel_level: entry.fuel_level,
        speed: entry.speed,
      }));

      setData(formattedData);
    };

    fetchData();
  }, []);
  return (
    <div
      className="flex flex-col items-center p-2"
      style={{ width: "100%", height: "500px" }}
    >
      <h3>Fuel Consumption</h3>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 10, right: 25, left: 25, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            angle={300}
            fontSize={12}
            name={"Timestamp"}
            tickMargin={30}
            tickLine={false}
          >
            {" "}
            <Label value="Timestamp" offset={48} position='bottom' />
          </XAxis>
          <YAxis
            label={{
              value: "Fuel Level",
              angle: -90,
              position: "left",
            }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="fuel_level"
            stroke="#ff0000"
            dot={false}
            name="Fuel Level"
          />
          <Line
            type="monotone"
            dataKey="speed"
            dot={false}
            stroke="#008000"
            name="Speed"
          />
          <Legend align="right" verticalAlign="top" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
