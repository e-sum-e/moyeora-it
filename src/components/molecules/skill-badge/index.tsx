import { SkillName } from '@/types';
import { Skill } from '@/types/enums';
import Image from 'next/image';

/**  숫자 enum Skill의 키 이름으로 이미지 주소와 매칭 시키기 */
export const allSkillKeys = Object.keys(Skill).filter((key) =>
  isNaN(Number(key)),
);

const skillLogoMap: { [key: string]: string } = {};

allSkillKeys.forEach((skill) => {
  skillLogoMap[skill] = `/logos/${skill.replace(/[^a-zA-Z0-9]/g, '')}.png`;
});

type SkillBadgeProps = {
  name: SkillName;
  isDefault?: boolean;
};

export const SkillBadge = ({ name, isDefault = true }: SkillBadgeProps) => {
  return (
    <div className="skill-badge flex flex-row border p-1 border-primary rounded-full cursor-pointer">
      {isDefault && (
        <Image src={skillLogoMap[name]} alt="logo" width={24} height={24} />
      )}
    </div>
  );
};
