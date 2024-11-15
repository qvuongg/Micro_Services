# src/front_end/app.py

from flask import Flask, render_template
import requests

app = Flask(__name__)

# Hàm gọi API để lấy giá BTC mới nhất
def get_btc_price():
    try:
        response = requests.get("http://database_api:5000/btc_price")
        data = response.json()
        return data['price'], data['timestamp']
    except Exception as e:
        print(f"Error fetching BTC price: {e}")
        return None, None

# Route chính để hiển thị trang web với giá BTC
@app.route('/')
def index():
    price, timestamp = get_btc_price()
    if price is not None:
        return render_template('index.html', price=price, timestamp=timestamp)
    else:
        return render_template('index.html', error="Could not retrieve BTC price")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
