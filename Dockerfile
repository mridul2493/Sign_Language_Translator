# Use an older Python version that supports mediapipe
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy only requirement files to leverage Docker caching
COPY requirements.txt .

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your app files
COPY . .

# Expose the port Flask uses
EXPOSE 5000

# Set the environment variable for Flask
ENV FLASK_APP=app.py

# Start the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]