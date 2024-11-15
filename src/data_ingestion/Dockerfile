# src/data_ingestion/Dockerfile

# Sử dụng image chính thức của Python
FROM python:3.9-slim

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file yêu cầu (requirements.txt) vào container
COPY requirements.txt .

# Cài đặt các thư viện cần thiết
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép tất cả mã nguồn vào thư mục làm việc
COPY . .

# Cài đặt các biến môi trường cần thiết
ENV DB_HOST=database \
    DB_NAME=crypto_db \
    DB_USER=your_username \
    DB_PASSWORD=your_password

# Lệnh để chạy app
CMD ["python", "app.py"]
