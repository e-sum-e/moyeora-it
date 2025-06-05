'use client';

import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditableAvatar } from '@/features/user/components/edit-user-profile-form/editable-avatar';
import { Form } from '@/components/ui/form';
import { InputTextField } from '@/components/molecules/input-text-field';
import { InputSelectField } from '@/components/molecules/input-select-field';
import { SkillSelector } from '@/features/user/components/edit-user-profile-form/skill-selector';
import { Button } from '@/components/ui/button';
import { Position, Skill } from '@/types/enums';
import useAuthStore from '@/stores/useAuthStore';
import { useUpdateProfileMutation } from '@/features/user/hooks/useUpdateProfileMutation';

const schema = z.object({
  nickname: z.string().nonempty('닉네임을 입력해주세요.'),
  profileImageFile: z.custom<File>().nullable(),
  position: z.string().optional(),
  skills: z.array(z.nativeEnum(Skill)),
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
  const user = useAuthStore((state) => state.user);

  const formMethods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nickname: user?.nickname ?? '',
      profileImageFile: null,
      position: user?.position ? String(Position[user.position]) : '',
      // @ts-expect-error 백엔드에서 주는 skills 값의 타입이 string[]이어서 일단 아래와 같이 number[] 배열 반환하도록 변경
      skills: user?.skills ? user?.skills.map((skill) => Skill[skill]) : [],
    },
  });

  const { mutateAsync: updateProfile } = useUpdateProfileMutation();
  const formSubmitHandler: SubmitHandler<FormData> = async (data) => {
    const position = Number(data.position);
    try {
      await updateProfile({
        nickname: data.nickname,
        position,
        skills: data.skills,
        ...(data.profileImageFile && { file: data.profileImageFile }),
      });
      closeDialog();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <Form {...formMethods}>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={formMethods.handleSubmit(formSubmitHandler)}
        >
          <EditableAvatar
            imageSrc={user?.profileImage ?? ''}
            fallback={user?.nickname?.slice(0, 2) ?? ''}
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
