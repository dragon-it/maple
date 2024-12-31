# 현재 활성 상태 확인
ACTIVE_PORT=$(curl -s http://localhost:80 -H "Host: www.mezzang.com" | grep -o 300[1-2])

if [ "$ACTIVE_PORT" == "3001" ]; then
  echo "Blue가 활성화 상태. Green으로 배포 시작."
  BUILD_DIR="build-green"
  TARGET_APP="mezzang-green"
  NEW_PORT=3002
else
  echo "Green이 활성화 상태. Blue로 배포 시작."
  BUILD_DIR="build-blue"
  TARGET_APP="mezzang-blue"
  NEW_PORT=3001
fi

# 빌드
echo "빌드 시작: $BUILD_DIR"
NODE_OPTIONS="--max-old-space-size=4096" npm run build:$BUILD_DIR

# PM2 재시작
echo "PM2 서버 재시작: $TARGET_APP"
pm2 restart $TARGET_APP

# Nginx 설정 업데이트
if [ "$NEW_PORT" == "3001" ]; then
  sed -i 's/weight=10/weight=0/g' /etc/nginx/sites-available/default
  sed -i 's/server localhost:3002 weight=0/server localhost:3002 weight=10/g' /etc/nginx/sites-available/default
else
  sed -i 's/weight=10/weight=0/g' /etc/nginx/sites-available/default
  sed -i 's/server localhost:3001 weight=0/server localhost:3001 weight=10/g' /etc/nginx/sites-available/default
fi

# Nginx 재시작
sudo nginx -t && sudo systemctl reload nginx
echo "배포 완료"