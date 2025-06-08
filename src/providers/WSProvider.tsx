// providers/WebSocketProvider.tsx
'use client';

import useAuthStore from '@/stores/useAuthStore';
import { createContext, useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

type SocketMessage = {
  sender: number;
  recepient: number;
  data: string;
};

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }
    const newSocket = io('http://localhost:3001', {
    // const newSocket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
      withCredentials: true,
      autoConnect: false,
      transports: ['websocket', 'polling'],
    });

    // 연결 이벤트 핸들러
    newSocket.on('connect', () => {
      console.log('socket.io 연결됨', user.userId);
      
      // 로그인 이벤트에 콜백 추가
      newSocket.emit('login', {
        userId: user.userId,
      }, (response: { status: string }) => {
        // 서버로부터 응답 받음
        console.log('서버 응답:', response);
      });
      
      // 소켓 연결 상태 확인
      console.log('소켓 연결 상태:', newSocket.connected);
      console.log('현재 소켓 ID:', newSocket.id);
    });

    // 메시지 이벤트 핸들러 - connect 밖에서 등록
    newSocket.on('notification', (message: SocketMessage) => {
      console.log('messageC 이벤트 발생!');
      console.log('받은 메시지 상세:', {
        sender: message.sender,
        recepient: message.recepient,
        data: message.data,
      });
      
      // 메시지 수신 확인을 서버에 전송
      newSocket.emit('messageReceived', { messageId: message.sender }, (response: { status: string }) => {
        console.log('메시지 수신 확인됨:', response);
      });
    });

    // 연결 에러 핸들러
    newSocket.on('connect_error', (error) => {
      console.error('socket.io 연결 실패:', error);
      // 재연결 시도
      if (!newSocket.connected) {
        console.log('소켓 재연결 시도');
        newSocket.connect();
      }
    });

    newSocket.connect();
    setSocket(newSocket);

    return () => {
      newSocket.removeAllListeners(); // 모든 리스너 제거
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
