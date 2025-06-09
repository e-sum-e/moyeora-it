type CategoryNameProps = {
  number?: number;
  text: string;
  className?: string;
};

export const CategoryName = ({
  number,
  text,
  className,
}: CategoryNameProps) => {
  return (
    <div className="flex items-center mb-9 p-2 leading-10 border-b-4 border-gray-100">
      {number && (
        <div className="flex w-5 h-5 justify-center items-center mr-1 text-white bg-primary rounded-full ">
          {number}
        </div>
      )}

      <div className={`inline-block font-bold ${className}`}>{text}</div>
    </div>
  );
};
