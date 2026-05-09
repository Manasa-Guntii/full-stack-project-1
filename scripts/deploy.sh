#!/bin/bash

echo "Stopping existing application..."

pkill -f "demo-0.0.1-SNAPSHOT.jar" || true

cd /home/ec2-user/app || exit 1

echo "Starting application..."
nohup java -jar demo-0.0.1-SNAPSHOT.jar > app.log 2>&1 &

echo "Application started successfully"