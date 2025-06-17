'use client';

import { useBookmarkStore } from '@/stores/useBookmarkStore';
import { useEffect } from 'react';

export const BookmarkInitializer = () => {
  const initializeFromLocalStorage = useBookmarkStore(
    (state) => state.initializeFromLocalStorage,
  );

  useEffect(() => {
    initializeFromLocalStorage();
  }, [initializeFromLocalStorage]);

  return null;
};
