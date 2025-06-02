import { Position, Skill } from '@/types/enums';

export type UserInfoResponse = {
  success: boolean;
  message: string;
  items: {
    items: {
      id: number;
      nickname: string | null;
      email: string;
      profileImage: string | null;
      position: Position | null;
      skills: Skill[] | null;
      isFollowing: boolean;
      isFollower: boolean;
      rate: number;
    };
    averageRating: number;
  };
};
