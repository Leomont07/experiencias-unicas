#!/bin/bash

MODE=$1
NGINX_FILE="/etc/nginx/sites-available/arroyo.conf"

if [ "$MODE" = "blue" ]; then
    echo "Cambiando tráfico a BLUE..."
    sudo sed -i 's/3002/3001/g' $NGINX_FILE
    sudo sed -i 's/4002/4001/g' $NGINX_FILE

elif [ "$MODE" = "green" ]; then
    echo "Cambiando tráfico a GREEN..."
    sudo sed -i 's/3001/3002/g' $NGINX_FILE
    sudo sed -i 's/4001/4002/g' $NGINX_FILE

else
    echo "Error: usar blue o green"
    exit 1
fi

sudo nginx -t && sudo systemctl reload nginx
echo "Switch completado"
