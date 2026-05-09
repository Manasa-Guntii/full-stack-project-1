#!/bin/bash

pkill -f demo-0.0.1-SNAPSHOT.jar || true

rm -rf /home/ec2-user/app/*

cd /home/ec2-user/app

nohup java -jar demo-0.0.1-SNAPSHOT.jar > app.log 2>&1 &