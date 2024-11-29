import React, { useEffect, useState } from "react";
import "../../css/cryptoPrices.css";

const CryptoPrices = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    // Kết nối WebSocket
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);


      const usdtCoins = data
        .filter((coin) => coin.s.endsWith("USDT"))
        .slice(0, 10)
        .map((coin) => ({
          symbol: coin.s,
          price: parseFloat(coin.c),
          priceChangePercent: parseFloat(coin.P),
        }));

      setCryptoData((prevData) => {
        return usdtCoins.map((coin) => {
          const prevCoin = prevData.find((prev) => prev.symbol === coin.symbol);
          return {
            ...coin,
            color:
              prevCoin && coin.price > prevCoin.price
                ? "#21d321"
                : prevCoin && coin.price < prevCoin.price
                  ? "#d32121"
                  : "#000",
          };
        });
      });
    };


    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="crypto-container">
      {cryptoData.map((coin) => (
        <div key={coin.symbol} className="crypto-item">
          <span className="crypto-symbol">{coin.symbol}</span>
          <span className="crypto-price" style={{ color: coin.color }}>
            ${coin.price.toFixed(2)}
          </span>
          <span className="crypto-change">
            ({coin.priceChangePercent.toFixed(2)}%)
          </span>
        </div>
      ))}
    </div>
  );
};

export default CryptoPrices;
