from fastapi import FastAPI
from fastapi.responses import JSONResponse
import mysql.connector
import os

app = FastAPI()

def connect_to_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="crypto_data",
        charset="utf8mb4"
    )
# def connect_to_db():
#     return mysql.connector.connect(
#         host=os.getenv("DB_HOST"),
#         database=os.getenv("DB_NAME"),
#         user=os.getenv("DB_USER"),
#         password=os.getenv("DB_PASSWORD")
#     )

# Endpoint để lấy giá BTC mới nhất
@app.get("/btc_price")
def get_latest_btc_price():
    conn = connect_to_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT price, timestamp FROM btc_prices ORDER BY timestamp DESC LIMIT 1")
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    
    if result:
        return result
    else:
        return {"error": "No data available"}

# Endpoint để lấy giá BTC trong một khoảng thời gian (cho mục đích phân tích)
@app.get("/btc_price_range")
def get_btc_price_range(start: str, end: str):
    conn = connect_to_db()
    cursor = conn.cursor(dictionary=True)
    query = "SELECT price, timestamp FROM btc_prices WHERE timestamp BETWEEN %s AND %s"
    cursor.execute(query, (start, end))
    results = cursor.fetchall()
    cursor.close()
    conn.close()

    return results

@app.get("/btc_price_range_once_week")
def get_btc_price_range_once_week():
    conn = connect_to_db()
    cursor = conn.cursor(dictionary=True)
    query = "SELECT * FROM btc_klines WHERE open_time >= NOW() - INTERVAL 7 DAY"
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    conn.close()

    return results

@app.get("/btc_price_range_once_month")
def get_btc_price_range_once_month():
    conn = connect_to_db()
    cursor = conn.cursor(dictionary=True)
    query = "SELECT * FROM btc_klines WHERE open_time >= NOW() - INTERVAL 1 MONTH"
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    conn.close()

    return results

@app.get("/btc_price_range_once_year")
def get_btc_price_range_once_year():
    conn = connect_to_db()
    cursor = conn.cursor(dictionary=True)
    query = "SELECT * FROM btc_klines WHERE open_time >= NOW() - INTERVAL 1 YEAR"
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    conn.close()

    return results
