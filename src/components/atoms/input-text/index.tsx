import { Input } from "@/components/ui/input";
import * as React from "react";

export const InputText = ({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <Input
      placeholder="비밀번호"
      className={`${className}`}
      type={type}
      {...props}
    />
  );
};
