import axios from "axios";

export const fetchChartData = async (url) => {
  try {
    const response = await axios.get(url);
    const rawData = response.data;
    console.log(rawData);

    const time = rawData.map((row) => row.close_time);
    const price = rawData.map((row) => row.close_price);

    return { time, price };
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return { time: [], price: [] };
  }
};
