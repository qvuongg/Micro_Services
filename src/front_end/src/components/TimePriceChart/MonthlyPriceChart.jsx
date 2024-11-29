import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { fetchChartData } from "../../utils/dataFetchChart";

const MonthlyPriceChart = () => {
  const [chartData, setChartData] = useState({ time: [], price: [] });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChartData(
        "https://run.mocky.io/v3/86c5bcb3-07a3-4630-9404-ae5591c494a9"
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
        title: "Month Price Chart",
        xaxis: { title: "Time", type: "date" },
        yaxis: { title: "Close Price (USD)" },
      }}
      style={{ width: "100%", height: "500px" }}
    />
  );
};

export default MonthlyPriceChart;
