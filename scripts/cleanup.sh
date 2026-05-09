#!/bin/bash

echo "Cleaning old deployment..."

sudo rm -rf /home/ec2-user/app/*

sudo mkdir -p /home/ec2-user/app

echo "Cleanup done"