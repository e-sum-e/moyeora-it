// providers/WebSocketProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { initMockSocket } from '@/mocks/handler/ws';
import { eNotification } from '@/types/enums';

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
      const data = JSON.parse(event.data)
      switch (data.type) {
        case eNotification.GROUP_HAS_PARTICIPANT:
          console.log('그룹 참여자 추가됨');
          break;
        case eNotification.CONFIRMED_PARTICIPANT_CANCELED:
          console.log('확정 참여자 취소됨');
          break;
        case eNotification.APPLY_APPROVED:
          console.log('모임 신청 승인됨');
          break;
        case eNotification.APPLY_REJECTED:
          console.log('모임 신청 거절됨');
          break;
        case eNotification.FULL_CAPACITY:
          console.log('모임 정원 마감됨');
          break;
        case eNotification.FOLLOWER_ADDED:
          console.log('팔로워 추가됨');
          break;
        case eNotification.APPLY_CANCELED:
          console.log('모임 신청 취소됨');
          break;
        case eNotification.COMMENT_RECEIVED:
          console.log('댓글 달림');
          break;
        case eNotification.FOLLOWER_CREATE_GROUP:
          console.log('팔로워가 모임 만듦');
          break;
        case eNotification.REJECTED_GROUP:
          console.log('모임 신청 거절됨');
          break;
        case eNotification.WITHIN_24_HOUR:
          console.log('24시간 남음');
          break;
        default:
          break;
      }

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
