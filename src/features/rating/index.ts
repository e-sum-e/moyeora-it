import { request } from '@/api/request';

export const setRating = async (targetUserId: number, rate: number) => {
  return await request.post(
    '/v1/rating',
    {
      'Content-Type': 'application/json',
    },
    JSON.stringify({
      ratedUserId: targetUserId,
      rate,
    }),
    {
      credentials: 'include',
    }
  );
};

export const updateRating = async (ratingId: number, rate: number) => {
  return await request.patch(
    `/v1/ratings/${String(ratingId)}`,
    { 'Content-Type': 'application/json' },
    { rate },
    {
      credentials: 'include',
    }
  );
};
