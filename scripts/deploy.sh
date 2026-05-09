#!/bin/bash

echo "Starting deployment..."

cd /home/ec2-user/app

echo "Stopping old app if running..."
pkill -f demo || true

echo "Starting new jar..."
nohup java -jar demo-0.0.1-SNAPSHOT.jar > app.log 2>&1 &

echo "Deployment complete"