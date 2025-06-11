import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GroupType, TabType } from '@/types';

export const Tab = ({
  tabList,
  children,
  onValueChange,
}: {
  tabList: TabType[];
  children: React.ReactNode;
  onValueChange: (value: GroupType) => void;
}) => {
  const handleValueChange = (value: string) => {
    onValueChange(value as GroupType);
  };

  return (
    <Tabs defaultValue={tabList[0].value} onValueChange={handleValueChange}>
      <TabsList className="py-5">
        {tabList.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="text-2xl font-extrabold"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabList.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {children}
        </TabsContent>
      ))}
    </Tabs>
  );
};
