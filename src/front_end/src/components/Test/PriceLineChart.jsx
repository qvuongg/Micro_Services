import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import dayjs from "dayjs";

const PriceChart = () => {
  const [selectedRange, setSelectedRange] = useState("week");
  const [chartData, setChartData] = useState({ time: [], price: [] });
  const API_URLS = {
    week: "https://run.mocky.io/v3/e8f2937c-b72c-429d-8e9f-03d185d6296f",
    month: "https://run.mocky.io/v3/c599e2ac-cd87-4476-88d5-ad860cb61d3b",
  };

  const downsampleData = (data) => {
    const grouped = {};
    data.forEach(({ close_time, close_price }) => {
      const date = dayjs(close_time).format("YYYY-MM-DD");
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(close_price);
    });
    return Object.keys(grouped).map((date) => {
      const prices = grouped[date];
      const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
      return { close_time: date, close_price: avgPrice };
    });
  };

  const fetchChartData = async () => {
    try {
      const response = await axios.get(API_URLS[selectedRange]);
      console.log("Dữ liệu trả về:", response.data);

      const rawData = response.data;

      const processedData =
        selectedRange === "month" ? downsampleData(rawData) : rawData;

      const time = processedData.map((row) => row.close_time);
      const price = processedData.map((row) => row.close_price);

      console.log("Dữ liệu xử lý:", { time, price });

      setChartData({ time, price });
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    console.log("Khoảng thời gian được chọn:", selectedRange);
    fetchChartData();
  }, [selectedRange]);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setSelectedRange("week")}
          style={{
            marginRight: "10px",
            padding: "10px",
            backgroundColor: selectedRange === "week" ? "#17BECF" : "#ccc",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Weekly
        </button>
        <button
          onClick={() => setSelectedRange("month")}
          style={{
            padding: "10px",
            backgroundColor: selectedRange === "month" ? "#17BECF" : "#ccc",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Monthly
        </button>
      </div>
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
          title: `${selectedRange === "week" ? "Weekly" : "Monthly"} Price Chart`,
          xaxis: { title: "Time", type: "date" },
          yaxis: { title: "Close Price (USD)" },
        }}
        style={{ width: "100%", height: "500px" }}
      />
    </div>
  );
};

export default PriceChart;
