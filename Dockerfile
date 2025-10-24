FROM python:3.10-slim

# Temel sistem araçlarını yükle
RUN apt-get update && \
    apt-get install -y \
        curl \
        wget \
        tar \
        && rm -rf /var/lib/apt/lists/*

# OpenJDK 11'i manuel olarak yükle
RUN wget -O /tmp/openjdk-11.tar.gz https://download.java.net/java/GA/jdk11/9/GPL/openjdk-11.0.2_linux-x64_bin.tar.gz && \
    mkdir -p /usr/lib/jvm && \
    tar -xzf /tmp/openjdk-11.tar.gz -C /usr/lib/jvm && \
    mv /usr/lib/jvm/jdk-11.0.2 /usr/lib/jvm/java-11-openjdk && \
    rm /tmp/openjdk-11.tar.gz

# Java ortam değişkenlerini ayarla
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk
ENV PATH=$JAVA_HOME/bin:$PATH
ENV PYSPARK_PYTHON=python3
ENV PYSPARK_DRIVER_PYTHON=python3

# Java kurulumunu test et
RUN java -version

# Çalışma dizini
WORKDIR /app

# Python bağımlılıklarını yükle
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Uygulama dosyalarını kopyala
COPY . .

# Port'u expose et
EXPOSE 8000

# Uygulamayı başlat
CMD ["python", "main.py"]