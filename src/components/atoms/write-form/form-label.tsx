import { FormLabel } from '@/components/ui/form';

type WriteFormLabelProps = {
  htmlFor?: string;
  text: string;
  className?: string;
};

export const WriteFormLabel = ({
  htmlFor,
  text,
  className,
}: WriteFormLabelProps) => {
  return (
    <>
      <FormLabel htmlFor={htmlFor} className={`mb-1 text-base ${className}`}>
        {text}
      </FormLabel>
    </>
  );
};
