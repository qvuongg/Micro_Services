# src/database_API/Dockerfile

# Sử dụng image Python
FROM python:3.9-slim

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file requirements.txt vào container
COPY requirements.txt .

# Cài đặt các thư viện Python cần thiết
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép mã nguồn vào container
COPY . .

# Thiết lập biến môi trường cho MySQL
ENV DB_HOST=database \
    DB_NAME=crypto_db \
    DB_USER=your_username \
    DB_PASSWORD=your_password

# Lệnh để chạy ứng dụng Flask
CMD ["python", "app.py"]
