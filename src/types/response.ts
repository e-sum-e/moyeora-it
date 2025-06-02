import { User } from '.';

export type UserInfoResponse = {
  status: { code: number; message: string; success: boolean };
  data: User;
  userId?: string; // 임시 필드, 백엔드 응답 타입 수정 후 제거 예정
};

export type InfiniteResponse<T> = {
  status: {
    code: number;
    message: string;
    success: boolean;
  };
  data: T[];
  hasNext: boolean;
  cursor: number;
};

export type CommonResponse<T> = {
  status: {
    code: number;
    message: string;
    success: boolean;
  };
  data: T;
};
