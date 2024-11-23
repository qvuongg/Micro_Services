import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const BtcPriceChart = () => {
  const [btcData, setBtcData] = useState([]);
  const [startTime, setStartTime] = useState('2024-11-01 00:00:00'); // Thời gian bắt đầu
  const [endTime, setEndTime] = useState('2024-11-22 00:00:00'); // Thời gian kết thúc
  const [loading, setLoading] = useState(false);

  // Hàm gọi API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/btc_price_range', {
        params: {
          start: startTime,
          end: endTime,
        },
      });
      console.log(response.data);
      setBtcData(response.data); // Lưu dữ liệu vào state
    } catch (error) {
      console.error('Error fetching BTC data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sử dụng setInterval để gọi API mỗi 5 giây
  useEffect(() => {
    // Gọi API ngay khi component được render
    fetchData();

    // Thiết lập interval để gọi API mỗi 5 giây
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    // Dọn dẹp interval khi component bị hủy
    return () => clearInterval(interval);
  }, [startTime, endTime]); // Chỉ chạy lại khi thời gian thay đổi

  // Dữ liệu cho biểu đồ
  const timestamps = btcData.map((item) => item.timestamp); // Mảng timestamp
  const prices = btcData.map((item) => item.price); // Mảng giá

  return (
    <div>
      <h2>BTC/USDT Price Chart (Real-Time)</h2>

      {/* Bộ chọn thời gian */}
      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <label>End Time:</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      {/* Biểu đồ giá */}
      {btcData.length > 0 ? (
        <Plot
          data={[
            {
              x: timestamps, // Trục thời gian
              y: prices, // Trục giá
              type: 'scatter', // Kiểu biểu đồ
              mode: 'lines+markers', // Đường và điểm
              marker: { color: 'blue' }, // Màu sắc
            },
          ]}
          layout={{
            title: 'BTC/USDT Price Chart (Real-Time)',
            xaxis: { title: 'Time' },
            yaxis: { title: 'Price (USDT)' },
          }}
          style={{ width: '100%', height: '500px' }} // Kích thước biểu đồ
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default BtcPriceChart;
