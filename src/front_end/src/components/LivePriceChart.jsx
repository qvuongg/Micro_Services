import React, { useEffect, useState, useRef } from "react";
import Plot from "react-plotly.js";


const LivePriceChart = () => {
  const [priceData, setPriceData] = useState({ time: [], price: [] });
  const socketRef = useRef(null);

  useEffect(() => {
    // ket noi WebSocket
    socketRef.current = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker");

    // XXu ly du lieu WebSocket
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newPrice = parseFloat(data.c);
      const newTime = new Date().toLocaleTimeString();

      setPriceData((prevData) => {
        const updatedTime = [...prevData.time, newTime].slice(-30);
        const updatedPrice = [...prevData.price, newPrice].slice(-30);

        return { time: updatedTime, price: updatedPrice };
      });
    };


    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <h2>Live BTC/USDT Price</h2>
      <Plot
        data={[
          {
            x: priceData.time,
            y: priceData.price,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
        ]}
        layout={{
          title: "BTC/USDT Live Price Chart",
          xaxis: { title: "Time" },
          yaxis: { title: "Price (USDT)" },
        }}
      />
    </div>
  );
};

export default LivePriceChart;
