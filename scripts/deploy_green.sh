#!/bin/bash
echo "Desplegando GREEN..."

docker compose -f docker-compose.green.yml build
docker compose -f docker-compose.green.yml up -d

echo "GREEN activo en 3002(front) y 4002(api)"
