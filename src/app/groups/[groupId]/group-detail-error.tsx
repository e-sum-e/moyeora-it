import { Empty } from '@/components/organisms/empty';

export const GroupDetailError = ({ message }: { message: string }) => {
  return (
    <div className="text-center mt-40">
      <Empty mainText={message} />
    </div>
  );
};
