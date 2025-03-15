#!/bin/bash

# 어플리케이션 디렉토리로 이동
cd /home/ubuntu/maple || { echo "디렉토리 이동 실패"; exit 1; }

# 현재 Nginx가 가리키는 포트 확인
CURRENT_PORT=$(grep -oP '(?<=proxy_pass http://127.0.0.1:)[0-9]+' /etc/nginx/sites-available/default)

# 만약 CURRENT_PORT가 감지되지 않으면 기본값 설정
if [[ -z "$CURRENT_PORT" ]]; then
    echo "현재 활성 포트가 감지되지 않음. 기본적으로 Blue(3001)로 설정."
    CURRENT_PORT=3001
fi

# Blue-Green 배포 전략 적용
if [ "$CURRENT_PORT" == "3002" ]; then
    NEW_PORT=3001
    NEW_APP="mezzang-blue"
    OLD_APP="mezzang-green"
elif [ "$CURRENT_PORT" == "3001" ]; then
    NEW_PORT=3002
    NEW_APP="mezzang-green"
    OLD_APP="mezzang-blue"
else
    echo "활성 포트가 없거나 감지되지 않음. 기본적으로 Blue(3001)로 설정."
    NEW_PORT=3001
    NEW_APP="mezzang-blue"
    OLD_APP="mezzang-green"
fi

echo "현재 실행 중인 서비스: $OLD_APP ($CURRENT_PORT번 포트, Old)"
echo "새로운 서비스 배포: $NEW_APP ($NEW_PORT번 포트, New)"

# 새로운 빌드 실행
export BUILD_DIR="build-${NEW_APP#mezzang-}"
export PORT=$NEW_PORT
NODE_OPTIONS="--max-old-space-size=4096" npm run build || { echo "빌드 실패"; exit 1; }

# 기본 build 디렉토리를 BUILD_DIR로 이동
[ -d build ] && mv build "$BUILD_DIR" || { echo "빌드 디렉토리 이동 실패"; exit 1; }
echo "빌드 완료."

# 새로운 프로세스 시작
sudo pm2 restart $NEW_APP
echo "프로세스 시작 성공"

# Nginx 리버스 프록시 변경
NGINX_CONF="/etc/nginx/sites-available/default"
sudo sed -i "s|proxy_pass http://127.0.0.1:$CURRENT_PORT;|proxy_pass http://127.0.0.1:$NEW_PORT;|" "$NGINX_CONF"
sudo systemctl reload nginx

# 이전 프로세스 중지
sudo pm2 stop $OLD_APP

echo "배포 완료: $NEW_APP ($NEW_PORT번 포트) 실행 중"
