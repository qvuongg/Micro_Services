# src/data_ingestion/app.py

# import requests
# import time
# # import mysql.connector
# import os
# from datetime import datetime

# # Kết nối đến cơ sở dữ liệu với logic retry tăng cường
# def connect_to_db():
#     retries = 10  # Tăng số lần retry
#     while retries > 0:
#         try:
#             return mysql.connector.connect(
#                 host=os.getenv("DB_HOST"),
#                 database=os.getenv("DB_NAME"),
#                 user=os.getenv("DB_USER"),
#                 password=os.getenv("DB_PASSWORD")
#             )
#         except mysql.connector.Error as err:
#             print(f"Error: Could not connect to database. {err}")
#             retries -= 1
#             time.sleep(10)  # Chờ 10 giây trước khi thử lại
#     return None

# Các phần còn lại của mã không thay đổi
# def fetch_btc_price():
#     url = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
#     response = requests.get(url)
#     data = response.json()
#     return float(data['price'])

# def save_to_db(price, conn):
#     cursor = conn.cursor()
#     timestamp = datetime.now()
#     cursor.execute("INSERT INTO btc_prices (price, timestamp) VALUES (%s, %s)", (price, timestamp))
#     conn.commit()
#     cursor.close()

# def run_ingestion():
#     conn = connect_to_db()
#     if conn is None:
#         print("Error: Connection to database could not be established.")
#         return

#     try:
#         while True:
#             price = fetch_btc_price()
#             save_to_db(price, conn)
#             print(f"Saved BTC price {price} at {datetime.now()}")
#             time.sleep(10)  # 5 phút
#     finally:
#         conn.close()

# if __name__ == "__main__":
#     run_ingestion()


import requests
import pymysql
from datetime import datetime, timedelta

# Kết nối đến MySQL
connection = pymysql.connect(
    host="localhost",
    user="root",
    password="VanToan123",
    database="data_mining",
    charset="utf8mb4"
)

# Hàm chèn dữ liệu vào MySQL
def insert_into_database(data):
    with connection.cursor() as cursor:
        sql = """
        INSERT INTO btc_klines (
            open_time, open_price, high_price, low_price, close_price, volume, close_time,
            quote_asset_volume, number_of_trades, taker_buy_base_volume, taker_buy_quote_volume
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        for kline in data:
            cursor.execute(sql, (
                datetime.utcfromtimestamp(kline[0] / 1000),  # open_time
                float(kline[1]),  # open_price
                float(kline[2]),  # high_price
                float(kline[3]),  # low_price
                float(kline[4]),  # close_price
                float(kline[5]),  # volume
                datetime.utcfromtimestamp(kline[6] / 1000),  # close_time
                float(kline[7]),  # quote_asset_volume
                int(kline[8]),  # number_of_trades
                float(kline[9]),  # taker_buy_base_volume
                float(kline[10])  # taker_buy_quote_volume
            ))
        connection.commit()
    print(f"Inserted {len(data)} rows into the database.")

# Thời gian hiện tại và cách đây 1 năm
now = int(datetime.now().timestamp() * 1000)
one_year_ago = int((datetime.now() - timedelta(days=365)).timestamp() * 1000)

# Tổng thời gian cần truy vấn
total_duration = now - one_year_ago
chunk_duration = total_duration // 4  # Chia làm 4 khoảng

# Lặp qua từng khoảng thời gian
for i in range(4):
    start_time = one_year_ago + (i * chunk_duration)
    end_time = start_time + chunk_duration if i < 3 else now  # Đảm bảo lần cuối đến hiện tại
    
    # URL API Binance
    url = f"https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&startTime={start_time}&endTime={end_time}"
    
    # Gửi yêu cầu API
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        insert_into_database(data)  # Lưu dữ liệu vào MySQL
    else:
        print(f"Lỗi khi lấy dữ liệu từ {start_time} đến {end_time}: {response.status_code}, {response.text}")

# Đóng kết nối MySQL
connection.close()



# def run_ingestion():
#     conn = connect_to_db()
#     if conn is None:
#         print("Error: Connection to database could not be established.")
#         return

#     try:
#         while True:
#             price = fetch_btc_price()
#             save_to_db(price, conn)
#             print(f"Saved BTC price {price} at {datetime.now()}")
#             time.sleep(10)  # 5 phút
#     finally:
#         conn.close()

# if __name__ == "__main__":
#     run_ingestion()
