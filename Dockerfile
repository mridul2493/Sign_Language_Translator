# Use a stable Python base image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy all the project files into the container
COPY . .

# Install required packages
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port your Flask app will run on
EXPOSE 5000

# Command to run your Flask app
CMD ["python", "app.py"]