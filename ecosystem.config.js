module.exports = {
  apps: [
    {
      name: 'mezzang-blue',  // 첫 번째 서버 이름
      script: './proxyServer.js',
      instances: 1,             // 단일 프로세스
      exec_mode: 'fork',        // 포크 모드
      env: {
        PORT: 3001,             // 첫 번째 서버가 사용할 포트
        BUILD_DIR: 'build-blue', // 첫 번째 서버의 빌드 폴더
      },
      watch: false,             // 파일 변경 감지 안 함
      autorestart: true,        // 오류 발생 시 재시작
    },
    {
      name: 'mezzang-green',      // 두 번째 서버 이름
      script: './proxyServer.js',
      instances: 1,             // 단일 프로세스
      exec_mode: 'fork',        // 포크 모드
      env: {
        PORT: 3002,             // 두 번째 서버가 사용할 포트
        BUILD_DIR: 'build-green', // 두 번째 서버의 빌드 폴더
      },
      watch: false,             // 파일 변경 감지 안 함
      autorestart: true,        // 오류 발생 시 재시작
    },
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
