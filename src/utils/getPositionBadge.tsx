'use client';

import { Badge } from '@/components/atoms/badge';
import { Skill } from '@/types/enums';

/**  숫자 enum Skill의 키 이름으로 이미지 주소와 매칭 시키기 */
export const allSkillKeys = Object.keys(Skill).filter((key) =>
  isNaN(Number(key)),
);

const skillLogoMap: { [key: string]: string } = {};

allSkillKeys.forEach((skill) => {
  skillLogoMap[skill] = `/logos/${skill.replace(/[^a-zA-Z0-9]/g, '')}.png`;
});

export const getPositionBadge = (name: string) => {
  return (
    <div className="position-badge flex flex-row border border-gray-800 rounded-md">
      <Badge text={name} className="" />
    </div>
  );
};
