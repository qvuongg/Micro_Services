import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { fetchChartData } from "../../utils/dataFetchChart";

const WeeklyPriceChart = () => {
  const [chartData, setChartData] = useState({ time: [], price: [] });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChartData(
        "https://run.mocky.io/v3/e8f2937c-b72c-429d-8e9f-03d185d6296f"
      );
      setChartData(data);
    };

    fetchData();
  }, []);

  return (
    <Plot
      data={[
        {
          x: chartData.time,
          y: chartData.price,
          type: "scatter",
          mode: "lines",
          line: { color: "#17BECF" },
        },
      ]}
      layout={{
        title: "Weekly Price Chart",
        xaxis: { title: "Time", type: "date" },
        yaxis: { title: "Close Price (USD)" },
      }}
      style={{ width: "100%", height: "500px" }}
    />
  );
};

export default WeeklyPriceChart;
