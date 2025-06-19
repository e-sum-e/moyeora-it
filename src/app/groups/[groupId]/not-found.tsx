import { Empty } from '@/components/organisms/empty';

export default function GroupDetailNotFoundPAge() {
  return (
    <div className="text-center mt-40">
      <Empty mainText="삭제 되었거나 존재하지 않는 모임입니다." subText="" />
    </div>
  );
}
