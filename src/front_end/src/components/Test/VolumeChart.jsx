import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { fetchCSVData } from "../../utils/dataFetcher";

const VolumeChart = () => {
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
  const volume = chartData.map((row) => parseFloat(row["Volume"]));

  return (
    <Plot
      data={[
        {
          x: time,
          y: volume,
          type: "bar",
          marker: { color: "orange" },
        },
      ]}
      layout={{
        title: "BTC Trading Volume",
        xaxis: { title: "Time" },
        yaxis: { title: "Volume (USD)" },
        autosize: true,
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default VolumeChart;
