import { Skill } from '@/types/enums';
import { SkillBadge } from '../../molecules/skill-badge';

type GroupSkillsProps = {
  skills: Skill[];
  className?: string;
};

export const GroupSkills = ({ skills, className }: GroupSkillsProps) => {
  return (
    <ul className="flex gap-2">
      {skills?.map((skill, i) => (
        <li key={i} className={className}>
          <SkillBadge name={Skill[skill]} />
        </li>
      ))}
    </ul>
  );
};
