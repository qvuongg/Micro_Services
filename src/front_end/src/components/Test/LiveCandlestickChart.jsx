import React, { useEffect, useState, useRef } from "react";
import Plot from "react-plotly.js";

const LiveCandlestickChart = () => {
  const [candleData, setCandleData] = useState({
    time: [],
    open: [],
    high: [],
    low: [],
    close: [],
  });
  const socketRef = useRef(null);

  useEffect(() => {
    //ket noi websocket binance
    socketRef.current = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1m");

    // xu ly du lieu tu websocket
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Chỉ lấy dữ liệu nến từ WebSocket
      const kline = data.k;
      const closeTime = new Date(kline.t).toLocaleTimeString(); // Thời gian đóng cửa
      const openPrice = parseFloat(kline.o);
      const highPrice = parseFloat(kline.h);
      const lowPrice = parseFloat(kline.l);
      const closePrice = parseFloat(kline.c);

      setCandleData((prevData) => {
        const updatedTime = [...prevData.time, closeTime].slice(-30); // Giữ tối đa 30 nến
        const updatedOpen = [...prevData.open, openPrice].slice(-30);
        const updatedHigh = [...prevData.high, highPrice].slice(-30);
        const updatedLow = [...prevData.low, lowPrice].slice(-30);
        const updatedClose = [...prevData.close, closePrice].slice(-30);

        return {
          time: updatedTime,
          open: updatedOpen,
          high: updatedHigh,
          low: updatedLow,
          close: updatedClose,
        };
      });
    };

    // Đóng kết nối WebSocket khi component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <h2>Live BTC/USDT Candlestick Chart</h2>
      <Plot
        data={[
          {
            x: candleData.time,
            open: candleData.open,
            high: candleData.high,
            low: candleData.low,
            close: candleData.close,
            type: "candlestick",
          },
        ]}
        layout={{
          title: "BTC/USDT Candlestick Chart (1 Min)",
          xaxis: { title: "Time" },
          yaxis: { title: "Price (USDT)" },
        }}
      />
    </div>
  );
};

export default LiveCandlestickChart;
