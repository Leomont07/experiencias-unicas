#!/bin/bash
echo "Desplegando BLUE..."

docker compose -f docker-compose.blue.yml build
docker compose -f docker-compose.blue.yml up -d

echo "BLUE activo en 3001(front) y 4001(api)"
