# src/database_API/app.py

from flask import Flask, jsonify, request
import mysql.connector
import os

app = Flask(__name__)

# Kết nối đến cơ sở dữ liệu MySQLv
def connect_to_db():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )

# Endpoint để lấy giá BTC mới nhất
@app.route('/btc_price', methods=['GET'])
def get_latest_btc_price():
    conn = connect_to_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT price, timestamp FROM btc_prices ORDER BY timestamp DESC LIMIT 1")
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    
    if result:
        return jsonify(result)
    else:
        return jsonify({"error": "No data available"}), 404

# Endpoint để lấy giá BTC trong một khoảng thời gian (cho mục đích phân tích)
@app.route('/btc_price_range', methods=['GET'])
def get_btc_price_range():
    start_time = request.args.get('start')
    end_time = request.args.get('end')
    
    conn = connect_to_db()
    cursor = conn.cursor(dictionary=True)
    query = "SELECT price, timestamp FROM btc_prices WHERE timestamp BETWEEN %s AND %s"
    cursor.execute(query, (start_time, end_time))
    results = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
