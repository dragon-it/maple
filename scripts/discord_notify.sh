# Discord Webhook URL
WEBHOOK_URL="https://discord.com/api/webhooks/1355084399200174120/YdM9ZBuWNzuyvrEzolF8Xf80f7UbIJSzblH_7USeQb90LhZZIwkgwH2zM78rI_GMqXl_"


# 전달받은 메시지를 MESSAGE 변수에 저장
# 인자가 없으면 기본 메시지로 설정
MESSAGE=${1:-"PM2 Process에 변화가 발생했습니다."}

# JSON 형식으로 변환
# jq를 사용하여 Discord API에 맞는 payload 생성
PAYLOAD=$(jq -n --arg msg "$MESSAGE" '{content: $msg}')

# Discord로 메시지 전송
curl -H "Content-Type: application/json" \
     -X POST \
     -d "$PAYLOAD" \
     "$WEBHOOK_URL"

# 전송 실패 시 로그 저장
# curl 명령이 실패할 경우 로그 파일에 기록
if [ $? -ne 0 ]; then
  echo "[디스코드 전송 실패] $MESSAGE" >> /tmp/discord_error.log
fi