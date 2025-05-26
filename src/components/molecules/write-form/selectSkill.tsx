import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { DEFAULT_SKILL_NAMES, WriteForm } from '@/types';
import { SkillName } from '@/types/index';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { getSkillBadge } from '../../../utils/getSkillBadge';

type TitleProps = {
  form: UseFormReturn<WriteForm>;
};

export const SelectSkill = ({ form }: TitleProps) => {
  const [selectedSkills, setSelectedSkills] = useState<SkillName[]>([]);

  const skillClickHandler = (skill: SkillName) => {
    const isSelected = selectedSkills.find(
      (selectedSkill) => selectedSkill === skill,
    );

    // toggle. 지금 선택한 스킬이 이미 선택되어 있었다면 제외돼야 함
    if (isSelected) {
      const nextSelectedSkills = selectedSkills.filter(
        (selectedSkill) => selectedSkill !== skill,
      );

      setSelectedSkills(nextSelectedSkills);
      form.setValue('skills', nextSelectedSkills);
    } else {
      const nextSelectedSkills = [...selectedSkills, skill];

      setSelectedSkills(nextSelectedSkills);
      form.setValue('skills', nextSelectedSkills);
    }
  };
  console.log(selectedSkills);
  return (
    <>
      <FormField
        control={form.control}
        name="skills"
        render={({}) => (
          <FormItem>
            <FormLabel>사용 기술</FormLabel>
            <FormControl>
              <ul className="flex gap-2">
                {DEFAULT_SKILL_NAMES.map((skill) => (
                  <li
                    key={skill}
                    className={
                      selectedSkills.includes(skill)
                        ? '[&_.skill-badge]:border-3 [&_.skill-badge]:border-green-500'
                        : ''
                    }
                  >
                    <button
                      type="button"
                      onClick={() => {
                        skillClickHandler(skill);
                      }}
                    >
                      {getSkillBadge(skill)}
                    </button>
                  </li>
                ))}
              </ul>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
