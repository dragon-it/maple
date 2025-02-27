#!/bin/bash

set -e  # 에러 발생 시 즉시 종료

echo "🚀 배포 스크립트 시작"

# 현재 실행 중인 포트 확인
echo "🔍 현재 활성 포트 확인 중..."
ACTIVE_PORT=$(pm2 list --json | jq -r '.[] | select(.name | test("mezzang-(blue|green)")) | .pm2_env.PORT' | head -n 1)

if [ "$ACTIVE_PORT" == "3001" ]; then
  echo "🟢 Blue가 활성 상태. Green으로 배포 시작."
  BUILD_DIR="build-green"
  TARGET_APP="mezzang-green"
  NEW_PORT=3002
elif [ "$ACTIVE_PORT" == "3002" ]; then
  echo "🔵 Green이 활성 상태. Blue로 배포 시작."
  BUILD_DIR="build-blue"
  TARGET_APP="mezzang-blue"
  NEW_PORT=3001
else
  echo "⚪ 활성 포트가 없습니다. 기본적으로 Blue로 설정."
  BUILD_DIR="build-blue"
  TARGET_APP="mezzang-blue"
  NEW_PORT=3001
fi

# 최신 코드 가져오기
echo "최신 코드 가져오는 중"
cd /home/ubuntu/maple
git pull origin main

# 빌드 실행 (프리티어 고려하여 CPU 사용률 제한)
echo "React 빌드 시작"
npm install --legacy-peer-deps
CI=false npm run build

# 빌드 결과를 블루/그린 빌드 폴더로 이동
echo "빌드 완료, 파일 이동 중"
mv -f /home/ubuntu/maple/build /home/ubuntu/maple/$BUILD_DIR

# PM2를 사용해 새 버전 실행
echo "서버 재시작 중"
pm2 delete $TARGET_APP || true  # 기존 프로세스 삭제 (에러 무시)
pm2 start server.js --name $TARGET_APP -- --port $NEW_PORT  

# Nginx 설정 변경
echo "Nginx 설정 변경"
sudo sed -i "s|server localhost:$ACTIVE_PORT weight=10|# server localhost:$ACTIVE_PORT weight=10\n    server localhost:$NEW_PORT weight=10|g" /etc/nginx/sites-available/default
sudo nginx -t && sudo systemctl reload nginx

echo "배포 완료"
