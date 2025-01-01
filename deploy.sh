#!/bin/bash

set -e  # 스크립트가 에러 발생 시 종료되도록 설정

echo "배포 스크립트 시작"

# 현재 활성 상태 확인
echo "현재 활성 포트 확인 중..."
ACTIVE_PORT=$(curl -s http://localhost:80 | grep -o 300[1-2] || echo "NONE")
echo "활성 포트: $ACTIVE_PORT"

if [ "$ACTIVE_PORT" == "3001" ]; then
  echo "Blue가 활성화 상태. Green으로 배포 시작."
  BUILD_DIR="build-green"
  TARGET_APP="mezzang-green"
  NEW_PORT=3002
elif [ "$ACTIVE_PORT" == "3002" ]; then
  echo "Green이 활성화 상태. Blue로 배포 시작."
  BUILD_DIR="build-blue"
  TARGET_APP="mezzang-blue"
  NEW_PORT=3001
else
  echo "활성 포트가 없습니다. 기본적으로 Blue로 설정."
  BUILD_DIR="build-blue"
  TARGET_APP="mezzang-blue"
  NEW_PORT=3001
fi

# 빌드
echo "빌드 시작: $BUILD_DIR"
NODE_OPTIONS="--max-old-space-size=4096" npm run build:$BUILD_DIR
echo "빌드 완료"

# PM2 재시작
echo "PM2 서버 재시작: $TARGET_APP"
pm2 restart $TARGET_APP
echo "PM2 재시작 완료"

# Nginx 설정 업데이트
if [ "$NEW_PORT" == "3001" ]; then
  sed -i 's/weight=10/weight=0/g' /etc/nginx/sites-available/default
  sed -i 's/server localhost:3002 weight=0/server localhost:3002 weight=10/g' /etc/nginx/sites-available/default
else
  sed -i 's/weight=10/weight=0/g' /etc/nginx/sites-available/default
  sed -i 's/server localhost:3001 weight=0/server localhost:3001 weight=10/g' /etc/nginx/sites-available/default
fi

Nginx 재시작 
echo "Nginx 재시작"
sudo nginx -t && sudo systemctl reload nginx
echo "배포 완료"
