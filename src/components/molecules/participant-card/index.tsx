import { Avatar } from '@/components/atoms/avatar';

export const ParticipantCard = () => {
  return (
    <div className="flex gap-3 boder-2 ">
      <Avatar imageSrc="https://github.com/shadcn.png" fallback="멤버" />
      <div>멤버1</div>
    </div>
  );
};
