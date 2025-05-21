import { QueryFunction, useSuspenseInfiniteQuery } from "@tanstack/react-query";

enum Position {
  'PM',
  'PL',
  'AA',
  'TA',
  'DA',
  'QA',
  'FE',
  'BE',
  'FS',
}

enum Skill {
  'Java',
  'JavaScript',
  'TypeScript',
  'Python',
  'HTML/CSS',
  'React',
  'Vue.js',
  'Kotlin',
  'Spring',
}

type Group = {
  id: number;
  title: string;
  deadline: Date;
  endDate: Date;
  maxParticipants: number;
  description: string;
  position: (Position | (string & {}))[];
  skill: (Skill | (string & {}))[];
  createdAt: Date;
  isBookmark: boolean;
  autoAllow: boolean;
};

type Response = {
  items: Group[];
  cursor: number;
  hasNext: boolean;
};

type QueryParams = {
  [key: string]: string | number | boolean;
};

type QueryKey = [_1: string, _2: string, _3: QueryParams];

const fetchItems: QueryFunction<Response, QueryKey, number> = async ({ pageParam = 0, queryKey }) => {
  const [, type, params] = queryKey;

  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const response = await fetch(`https://example.com/api/${type}?next-cursor=${pageParam}&${queryString}`);

  if (!response.ok) {
    throw new Error('Failed to fetch list');
  }

  const data = await response.json();

  return data;
};

const useFetchItems = ({ type, params }: { type: string; params: QueryParams }) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['items', type, params],
    queryFn: fetchItems,
    initialPageParam: 0,
    getNextPageParam(lastPage) {
      return lastPage.hasNext ? lastPage.cursor : null;
    },
  });
};