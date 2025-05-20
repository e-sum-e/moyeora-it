import { Input } from "@/components/ui/input";
import * as React from "react";

// 키보드로 직접 입력하는 type으로 제한
type InputTextProps = React.ComponentProps<"input"> & {
  type?: "text" | "password" | "search" | "email" | "url" | "tel" | "number";
};

// 사용자가 키보드로 직접 텍스트를 입력할 수 있는 Input입니다
// type을 입력하지 않을 경우 기본 타입은 text입니다
export const InputText = ({
  className,
  type = "text",
  ...props
}: InputTextProps) => {
  return <Input className={`${className} text-black`} type={type} {...props} />;
};
