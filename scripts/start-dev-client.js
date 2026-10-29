// CRA가 설정을 읽기 전에 개발 환경을 지정함
process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';
require('react-scripts/config/env');

// CRA 5는 LAN 주소를 찾지 못하면 allowedHosts에 undefined를 넣음
// node_modules 파일을 직접 고치지 않고 이번 실행에서만 설정 함수를 보완함
const configPath = require.resolve('react-scripts/config/webpackDevServer.config');
const createDevServerConfig = require(configPath);

require.cache[configPath].exports = (proxy, allowedHost) => {
  // 감지한 주소가 있으면 그대로 사용하고, 없을 때만 localhost를 사용함
  // 모든 호스트를 허용하는 방식으로 호스트 검사를 끄지 않음
  const host = typeof allowedHost === 'string' && allowedHost.trim()
    ? allowedHost
    : 'localhost';

  return createDevServerConfig(proxy, host);
};

// 설정 보완 후 원래 CRA 시작 코드를 실행함. 기본 포트는 기존처럼 3000임
require('react-scripts/scripts/start');
