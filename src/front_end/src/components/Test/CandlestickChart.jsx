import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { fetchCSVData } from "../../utils/dataFetcher";

const CandlestickChart = () => {
  const [chartData, setChartData] = useState({
    closeTime: [],
    openPrice: [],
    highPrice: [],
    lowPrice: [],
    lastPrice: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCSVData("/data.csv");
        const closeTime = data.map((row) => row["Close Time"]);
        const openPrice = data.map((row) => parseFloat(row["Open Price"]));
        const highPrice = data.map((row) => parseFloat(row["High Price"]));
        const lowPrice = data.map((row) => parseFloat(row["Low Price"]));
        const lastPrice = data.map((row) => parseFloat(row["Last Price"]));

        setChartData({
          closeTime,
          openPrice,
          highPrice,
          lowPrice,
          lastPrice,
        });
      } catch (error) {
        console.error("Error fetching CSV data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <Plot
      data={[
        {
          x: chartData.closeTime,
          open: chartData.openPrice,
          high: chartData.highPrice,
          low: chartData.lowPrice,
          close: chartData.lastPrice,
          type: "candlestick",
          xaxis: "x",
          yaxis: "y",
        },
      ]}
      layout={{
        title: "Bitcoin Candlestick Chart",
        xaxis: { title: "Close Time" },
        yaxis: { title: "Price (USD)" },
        autosize: true,
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default CandlestickChart;
