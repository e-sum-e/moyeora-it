import { Badge } from '@/components/atoms/badge';
import { Position } from '@/types/enums';

/**  숫자 enum Skill의 키 이름으로 이미지 주소와 매칭 시키기 */
export const allPositionlKeys = Object.keys(Position).filter((key) =>
  isNaN(Number(key)),
);

const positionLogoMap: { [key: string]: string } = {};

allPositionlKeys.forEach((position) => {
  positionLogoMap[position] = `/logos/${position.replace(
    /[^a-zA-Z0-9]/g,
    '',
  )}.png`;
});

type PositionBadgeProps = {
  name: string;
};

export const PositionBadge = ({ name }: PositionBadgeProps) => {
  return (
    <div className="position-badge flex flex-row border border-primary rounded-md">
      <Badge text={name} className="" />
    </div>
  );
};
