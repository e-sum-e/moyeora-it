import { Server } from 'mock-socket';

let mockServer: Server | null = null;

// 목서버 생성
export const initMockSocket = () => {
  if (mockServer) {
    console.warn('mock 서버 이미 실행됨');
    return;
  }

  mockServer = new Server('ws://localhost:8080');

  mockServer.on('connection', socket => {
    console.log('mock 연결됨');

    socket.on('message', data => {
      console.log('서버 수신:', data);
      socket.send('echo: ' + data);
    });
  });
  
};