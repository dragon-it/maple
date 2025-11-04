# #!/bin/bash

# # 디스코드로 보낼 메시지 초기화
# ALERT_MSG="❌ PM2 오류 프로세스 발견됨:"

# # PM2 프로세스 리스트를 JSON으로 가져옴
# PM2_JSON=$(sudo /usr/local/bin/pm2 jlist)

# # 오류 상태인 프로세스 추출
# ERROR_PROCESSES=$(echo "$PM2_JSON" | jq -r '.[] | select(.pm2_env.status == "errored" or .pm2_env.status == "stopped") | "\(.name) (\(.pm2_env.status))"')

# # 오류가 있는 경우
# if [ -n "$ERROR_PROCESSES" ]; then
#   ALERT_MSG+="\`\`\`$ERROR_PROCESSES\`\`\`"
#   /home/ubuntu/maple/scripts/discord_notify.sh "$ALERT_MSG"
#   echo "[`date`] 오류 감지됨 - 디스코드 알림 전송" >> /tmp/pm2_watchdog.log
# else
#   echo "[`date`] 정상 상태" >> /tmp/pm2_watchdog.log
# fi


# 디스코드로 보낼 메시지 초기화
ALERT_MSG="❌ PM2 오류 프로세스 발견됨:"
PM2_CMD="/usr/local/bin/pm2"
JQ_CMD="/usr/bin/jq"
DISCORD_SCRIPT="/home/ubuntu/maple/scripts/discord_notify.sh"

# PM2 프로세스 리스트를 JSON으로 가져옴
PM2_JSON=$($PM2_CMD jlist)

# 오류 상태인 프로세스 추출 (이름과 상태만)
ERROR_PROCESSES=$(echo "$PM2_JSON" | $JQ_CMD -r '.[] | select(.pm2_env.status == "errored" or .pm2_env.status == "stopped") | "\(.name) \(.pm2_env.status)"')

# 오류가 있는 경우
if [ -n "$ERROR_PROCESSES" ]; then
  ALERT_MSG+="\n\`\`\`\n$ERROR_PROCESSES\n\`\`\`"

  # 디스코드 알림 전송
  $DISCORD_SCRIPT "$ALERT_MSG"

  echo "[`date`] 오류 감지됨 - 디스코드 알림 전송 및 재시작" >> /tmp/pm2_watchdog.log

  # 이름만 추출해서 재시작
  echo "$ERROR_PROCESSES" | while read -r LINE; do
    PROC_NAME=$(echo "$LINE" | awk '{print $1}')
    $PM2_CMD restart "$PROC_NAME"
    echo "[`date`] 프로세스 재시작: $PROC_NAME" >> /tmp/pm2_watchdog.log
  done
else
  echo "[`date`] 정상 상태" >> /tmp/pm2_watchdog.log
fi