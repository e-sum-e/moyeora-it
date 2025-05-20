import { WriteForm } from "@/types";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type TitleProps = {
  form: UseFormReturn<WriteForm>;
};

export const MaxParticipants = ({ form }: TitleProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="maxParticipants"
        render={({ field }) => (
          <FormItem>
            <FormLabel>정원</FormLabel>
            <FormControl>
              <Input
                placeholder="정원을 입력해주세요"
                {...field}
                type="number"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
