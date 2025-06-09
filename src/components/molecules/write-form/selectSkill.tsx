import { WriteFormLabel } from '@/components/atoms/write-form/form-label';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { DEFAULT_SKILL_NAMES, WriteForm } from '@/types';
import { SkillName } from '@/types/index';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SkillBadge } from '../skill-badge';

type SelectSkillProps = {
  form: UseFormReturn<WriteForm>;
};

export const SelectSkill = ({ form }: SelectSkillProps) => {
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
  return (
    <>
      <FormField
        control={form.control}
        name="skills"
        render={({}) => (
          <FormItem>
            <WriteFormLabel text="기술 스택" />
            <FormControl>
              <ul className="flex gap-2">
                {DEFAULT_SKILL_NAMES.map((skill, i) => (
                  <li
                    key={i}
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
                      <SkillBadge name={skill} />
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
