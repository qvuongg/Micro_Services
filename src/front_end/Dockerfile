
# src/front_end/Dockerfile

FROM python:3.9-slim

WORKDIR /app

# Sao chép file yêu cầu vào container và cài đặt các thư viện
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép mã nguồn vào container
COPY . .

# Chạy ứng dụng Flask
CMD ["python", "app.py"]
