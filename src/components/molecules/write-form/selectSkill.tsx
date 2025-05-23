import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { WriteForm } from '@/types';
import { Skill } from '@/types/enums';
import { UseFormReturn } from 'react-hook-form';
import { getSkillBadge } from '../../../utils/getSkillBadge';

type TitleProps = {
  form: UseFormReturn<WriteForm>;
};

export const SelectSkill = ({ form }: TitleProps) => {
  /**  숫자 enum Skill의 키 이름으로 이미지 주소와 매칭 시키기 */
  const allSkillKeys = Object.keys(Skill).filter((key) => isNaN(Number(key)));

  const skillLogoMap: { [key: string]: string } = {};

  allSkillKeys.forEach((skill) => {
    skillLogoMap[skill] = `/logos/${skill.replace(/[^a-zA-Z0-9]/g, '')}.png`;
  });

  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({}) => (
          <FormItem>
            <FormLabel>사용 기술</FormLabel>
            <FormControl>
              <ul>
                {allSkillKeys.map((skill) => (
                  <li key={skill}>
                    <button type="button">{getSkillBadge(skill)}</button>
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
