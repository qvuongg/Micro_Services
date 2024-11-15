# src/data_ingestion/app.py

import requests
import time
import mysql.connector
import os
from datetime import datetime

# Kết nối đến cơ sở dữ liệu với logic retry tăng cường
def connect_to_db():
    retries = 10  # Tăng số lần retry
    while retries > 0:
        try:
            return mysql.connector.connect(
                host=os.getenv("DB_HOST"),
                database=os.getenv("DB_NAME"),
                user=os.getenv("DB_USER"),
                password=os.getenv("DB_PASSWORD")
            )
        except mysql.connector.Error as err:
            print(f"Error: Could not connect to database. {err}")
            retries -= 1
            time.sleep(10)  # Chờ 10 giây trước khi thử lại
    return None

# Các phần còn lại của mã không thay đổi
def fetch_btc_price():
    url = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
    response = requests.get(url)
    data = response.json()
    return float(data['price'])

def save_to_db(price, conn):
    cursor = conn.cursor()
    timestamp = datetime.now()
    cursor.execute("INSERT INTO btc_prices (price, timestamp) VALUES (%s, %s)", (price, timestamp))
    conn.commit()
    cursor.close()

def run_ingestion():
    conn = connect_to_db()
    if conn is None:
        print("Error: Connection to database could not be established.")
        return

    try:
        while True:
            price = fetch_btc_price()
            save_to_db(price, conn)
            print(f"Saved BTC price {price} at {datetime.now()}")
            time.sleep(10)  # 5 phút
    finally:
        conn.close()

if __name__ == "__main__":
    run_ingestion()
