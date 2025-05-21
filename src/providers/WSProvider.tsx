// providers/WebSocketProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { initMockSocket } from '@/mocks/handler/ws';

const WebSocketContext = createContext<WebSocket | null>(null);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    initMockSocket();
    
    const ws = new WebSocket('ws://localhost:8080'); // mock-socket 서버 주소

    ws.onopen = () => {
      console.log('mock socket 연결됨');
      ws.send('msg from client');
    };

    ws.onmessage = (event) => {
      console.log('mock 서버 메시지:', event.data);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
