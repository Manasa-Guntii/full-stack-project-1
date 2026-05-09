#!/bin/bash

echo "Stopping existing application"
pkill java || true

echo "Starting new application"
cd /home/ec2-user/app

nohup java -jar demo-0.0.1-SNAPSHOT.jar > app.log 2>&1 &