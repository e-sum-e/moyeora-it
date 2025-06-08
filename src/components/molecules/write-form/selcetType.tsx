import { WriteFormLabel } from '@/components/atoms/write-form/form-label';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { GroupType, WriteForm } from '@/types';
import { UseFormReturn } from 'react-hook-form';

type TitleProps = {
  form: UseFormReturn<WriteForm>;
};

export const SelectType = ({ form }: TitleProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <WriteFormLabel htmlFor="autoAllow" text="모집 구분" />

            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex gap-4"
              >
                <div>
                  <RadioGroupItem value={GroupType.STUDY} id="study" />
                  <Label htmlFor="study">스터디</Label>
                </div>
                <div>
                  <RadioGroupItem value={GroupType.PROJECT} id="project" />
                  <Label htmlFor="project">프로젝트</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
