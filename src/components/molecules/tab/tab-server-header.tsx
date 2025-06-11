// components/molecules/tab/TabServer.tsx
import { GroupType } from '@/types';

export type TabType = {
  value: GroupType | '';
  label: string;
};

const tabList: TabType[] = [
  { value: '', label: '모든 그룹' },
  { value: GroupType.STUDY, label: '스터디' },
  { value: GroupType.PROJECT, label: '프로젝트' },
];

type TabServerHeaderProps = {
  currentTab: string;
};

export const TabServerHeader = ({ currentTab }: TabServerHeaderProps) => {
  return (
    <div className="inline-flex gap-2 py-5 px-1 text-gray-500 dark:text-muted-foreground">
      {tabList.map((tab) => {
        const isActive = tab.value === currentTab;
        return (
          <a
            key={tab.value}
            href={`?type=${tab.value}`}
            className={`inline-flex items-center justify-center gap-1.5 px-2 py-1 text-2xl font-extrabold
              ${isActive ? 'text-foreground dark:text-foreground' : ''}
              hover:text-foreground dark:hover:text-foreground`}
          >
            {tab.label}
          </a>
        );
      })}
    </div>
  );
};
