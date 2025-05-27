'use client';

import { Avatar } from '@/components/atoms/avatar';
import { Button } from '@/components/ui/button';
import { validateImageFile } from '@/features/user/utils/validateImageFile';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { useFormContext } from 'react-hook-form';
import { type FormData } from '@/features/user/components/edit-user-profile-form/edit-user-profile-form';

type EditableAvatarProps = {
  imageSrc: string;
  fallback: string;
};

/**
 * 수정 가능한 아바타 컴포넌트
 *
 * @param imageSrc 이미지 주소(문자열)
 * @param fallback 아바타 폴백 문자열(문자열)
 * @returns 수정 가능한 아바타 컴포넌트
 */
export const EditableAvatar = ({ imageSrc, fallback }: EditableAvatarProps) => {
  const { register, setValue } = useFormContext<FormData>();

  const { ref: registerRef, ...rest } = register('profileImageFile');

  const [currentImageSrc, setCurrentImageSrc] = useState(imageSrc);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * 파일이 변경될 때 실행되는 함수
   *
   * 유효한 이미지 파일인 경우, 미리보기 이미지 주소를 업데이트하고, 파일을 폼 데이터에 추가한다.
   * 그렇지 않은 경우, 토스트 메시지를 표시.
   *
   * @param e 파일 변경 이벤트
   */
  const fileChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const { isValid, errorMessage } = validateImageFile(file);
      if (isValid) {
        setCurrentImageSrc(URL.createObjectURL(file));
        setValue('profileImageFile', file);
      } else {
        toast.error(errorMessage);
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={'relative'}>
      <Avatar
        imageSrc={currentImageSrc}
        fallback={fallback}
        className={'size-16'}
        onClick={() => {
          fileInputRef.current?.click();
        }}
      />
      <input
        type={'file'}
        accept={'image/*'}
        className={'absolute inset-0 w-full h-full hidden'}
        multiple={false}
        {...rest}
        ref={(e) => {
          registerRef(e);
          fileInputRef.current = e;
        }}
        onChange={fileChangeHandler}
      />
      <Button
        variant="outline"
        onClick={() => {
          setCurrentImageSrc(
            'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=',
          );
        }}
      >
        기본 이미지
      </Button>
    </div>
  );
};
