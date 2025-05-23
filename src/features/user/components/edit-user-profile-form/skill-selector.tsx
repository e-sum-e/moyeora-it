'use client';

import { useController, useFormContext } from 'react-hook-form';
import { Skill } from '@/types/enums';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { type FormData } from '@/features/user/components/edit-user-profile-form/edit-user-profile-form';

export const SkillSelector = () => {
  const { control } = useFormContext<FormData>();

  const { field } = useController({
    control,
    name: 'skills',
  });

  const itemClickHandler = (enumValue: Skill) => {
    if (field.value.includes(enumValue)) {
      field.onChange(field.value.filter((skill) => skill !== enumValue));
      return;
    }
    field.onChange([...field.value, enumValue]);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <Label>기술 스택</Label>
      <ul className="flex flex-wrap gap-2 items-center">
        {Object.entries(Skill)
          .filter(([key]) => isNaN(Number(key)))
          .map(([key, value]) => (
            <li key={key}>
              <Button
                variant={
                  field.value.includes(Number(value)) ? 'default' : 'outline'
                }
                onClick={() => itemClickHandler(Number(value))}
                type="button"
              >
                {key}
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
};
