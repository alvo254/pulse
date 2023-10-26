#!/bin/bash

sudo apt update -y 
sudo apt upgrade -y

sudo apt install nginx -y
sudo apt install fish -y 
sudo apt install net-tools -y
sudo systemctl start nginx
sudo systemctl enable nginx
sudo chsh -s /usr/bin/fish