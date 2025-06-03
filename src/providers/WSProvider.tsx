// providers/WebSocketProvider.tsx
'use client';

import { initMockSocket } from '@/mocks/handler/ws';
import useNotificationStore from '@/stores/useNotificationStore';
import { Notification } from '@/types';
import { eNotification } from '@/types/enums';
import { createContext, useContext, useEffect, useState } from 'react';
const WebSocketContext = createContext<WebSocket | null>(null);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    initMockSocket();

    const ws = new WebSocket('ws://localhost:8080'); // mock-socket 서버 주소

    ws.onopen = () => {
      console.log('mock socket 연결됨');
      ws.send('msg from client');
    };

    type MessageType = {
      type: eNotification;
      notification: {
        id: number;
        message: string;
        isRead: boolean;
        createdAt: Date;
        url: string;
      };
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as MessageType;
      const { notification, type } = data;
      const { id, createdAt, isRead, url, message } = notification;

      const params: Notification = {
        id,
        message,
        isRead,
        createdAt,
        type,
        url,
      };
      handleNotification(params);
    };

    const handleNotification = (notification: Notification) => {
      addNotification(notification);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
