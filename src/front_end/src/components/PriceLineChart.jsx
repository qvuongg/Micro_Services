import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { fetchCSVData } from "../utils/dataFetcher";

const PriceLineChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCSVData("/data.csv");
        setChartData(data);
      } catch (error) {
        console.error("Error fetching CSV data:", error);
      }
    };

    loadData();
  }, []);

  const time = chartData.map((row) => row["Close Time"]);
  const price = chartData.map((row) => parseFloat(row["Last Price"]));

  return (
    <Plot
      data={[
        {
          x: time,
          y: price,
          type: "scatter",
          mode: "lines",
          marker: { color: "blue" },
        },
      ]}
      layout={{
        title: "Price Bitcoin Chart",
        xaxis: { title: "Close Time" },
        yaxis: { title: "Last Price (USD)" },
        autosize: true,
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default PriceLineChart;
