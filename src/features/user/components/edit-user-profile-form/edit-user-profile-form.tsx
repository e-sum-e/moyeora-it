'use client';

import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditableAvatar } from '@/features/user/components/editable-avatar';
import { Form } from '@/components/ui/form';
import { InputTextField } from '@/components/molecules/input-text-field';
import { InputSelectField } from '@/components/molecules/input-select-field';
import { SkillSelector } from '@/features/user/components/edit-user-profile-form/skill-selector';
import { Button } from '@/components/ui/button';
import { Position } from '@/types/enums';

const schema = z.object({
  nickname: z.string().nonempty('닉네임을 입력해주세요.'),
  profileImageFile: z.custom<File>().nullable(),
  position: z.string().optional(),
  skills: z.array(z.number()),
});

type EditUserProfileFormProps = {
  closeDialog: () => void;
};

export type FormData = z.infer<typeof schema>;

/**
 * 사용자 프로필 수정 폼 
 * 
 * @param closeDialog 모달 닫는 함수
 * @returns 사용자 프로필 수정 폼 컴포넌트
 */
export const EditUserProfileForm = ({
  closeDialog,
}: EditUserProfileFormProps) => {
  const formMethods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nickname: 'k',
      profileImageFile: null,
      position: '0',
      skills: [1, 2, 3, 4, 5],
    },
  });

  const formSubmitHandler: SubmitHandler<FormData> = async (data) => {
    const position = Number(data.position);
    console.log({ ...data, position });
    closeDialog();
  };

  return (
    <FormProvider {...formMethods}>
      <Form {...formMethods}>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={formMethods.handleSubmit(formSubmitHandler)}
        >
          <EditableAvatar
            imageSrc={'https://github.com/shadcn.png'}
            fallback={'CN'}
          />
          <InputTextField
            label="닉네임"
            name="nickname"
            form={formMethods}
            placeholder="수정할 닉네임을 입력해주세요."
          />
          <InputSelectField
            label="포지션"
            name="position"
            form={formMethods}
            placeholder="포지션 선택"
            options={Object.entries(Position)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => ({
                label: key,
                value: String(value),
              }))}
          />
          <SkillSelector />
          <div className="flex gap-x-2 justify-end">
            <Button type="button" onClick={closeDialog} variant="outline">
              취소
            </Button>
            <Button>수정</Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};
