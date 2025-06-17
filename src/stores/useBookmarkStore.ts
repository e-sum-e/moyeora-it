import { create } from 'zustand';

type BookmarkStore = {
  bookmarkSet: Set<number>;
  initializeFromLocalStorage: () => void;
  addBookmark: (id: number) => void;
  removeBookmark: (id: number) => void;
  resetBookmark: () => void;
  hasBookmark: (id: number) => boolean;
};

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarkSet: new Set(),
  initializeFromLocalStorage: () => {
    const bookmarkList = localStorage.getItem('bookmarkList');
    const parsedbookmarkList = bookmarkList
      ? (JSON.parse(bookmarkList) as number[])
      : [];
    set({ bookmarkSet: new Set(parsedbookmarkList) });
  },
  addBookmark: (id) => {
    console.log('✅ addBookmark 호출됨');
    const setCopy = new Set(get().bookmarkSet);
    setCopy.add(id);
    console.log('✅ 새 Set:', Array.from(setCopy));

    localStorage.setItem('bookmarkList', JSON.stringify(Array.from(setCopy)));
    set({ bookmarkSet: setCopy });
  },
  removeBookmark: (id) => {
    console.log('✅ removeBookmark 호출됨');
    const setCopy = new Set(get().bookmarkSet);
    setCopy.delete(id);
    localStorage.setItem('bookmarkList', JSON.stringify(Array.from(setCopy)));
    set({ bookmarkSet: setCopy });
  },
  resetBookmark: () => {
    localStorage.removeItem('bookmarkList');
    set({ bookmarkSet: new Set() });
  },
  hasBookmark: (id) => get().bookmarkSet.has(id),
}));
