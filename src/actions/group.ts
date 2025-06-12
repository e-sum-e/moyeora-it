'use server';

import { revalidateTag } from 'next/cache';

export const revalidateGroupDetailTag = async (groupId: number) => {
  revalidateTag(`group-detail-${groupId}`);
};
