module.exports = {
  apps: [
    {
      name: 'mezzang-blue',
      script: './proxyServer.js',
      instances: 1,  
      exec_mode: 'fork', // 포크 모드
      env: {
        PORT: 3001,
        BUILD_DIR: 'build-blue',
      },
      env_production: {
        PORT: 3001,  // 프로덕션 환경에서 사용할 포트
        BUILD_DIR: 'build-blue',
      },
      watch: false,
      autorestart: true,
    },
    {
      name: 'mezzang-green',
      script: './proxyServer.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        PORT: 3002,
        BUILD_DIR: 'build-green',
      },
      env_production: {
        PORT: 3002,  // 프로덕션 환경에서 사용할 포트
        BUILD_DIR: 'build-green',
      },
      watch: false,
      autorestart: true,
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
