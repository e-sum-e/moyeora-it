import { GroupType } from '@/types';
import { useSearchParams } from 'next/navigation';

type TypeTabProps = {
  updateQueryParams: (queries: Record<string, string>) => void;
};

export const TypeTab = ({ updateQueryParams }: TypeTabProps) => {
  const searchParams = useSearchParams();

  const selectedType = searchParams.get('type') ?? 'all';

  const typeOptions: { name: string; value: GroupType }[] = [
    { name: '전체', value: GroupType.ALL },
    { name: '스터디', value: GroupType.STUDY },
    { name: '프로젝트', value: GroupType.PROJECT },
  ];

  const typeSelectHandler = (type: GroupType) => {
    updateQueryParams({ type: type });
  };

  return (
    <div className="flex gap-10 text-center m-2">
      {typeOptions.map((option) => (
        <button
          key={option.name}
          onClick={() => typeSelectHandler(option.value)}
          className={
            selectedType === option.value ? 'border-b-5 border-green-800' : ''
          }
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};
