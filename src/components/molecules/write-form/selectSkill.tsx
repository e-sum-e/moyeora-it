import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { WriteForm } from '@/types';
import { SkillName } from '@/types/enums';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { getSkillBadge } from '../../../utils/getSkillBadge';

type TitleProps = {
  form: UseFormReturn<WriteForm>;
};

export const SelectSkill = ({ form }: TitleProps) => {
  const allSkillNames = Object.values(SkillName);
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
              <ul>
                {allSkillNames.map((skill) => (
                  <li key={skill} className="w-[fit-content]">
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
