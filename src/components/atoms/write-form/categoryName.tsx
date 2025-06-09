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
    <div className="flex items-center mb-1 p-2 md:p-4 border-b-4 border-gray-100">
      {number && (
        <div className="flex w-5 h-5 justify-center items-center text-white bg-primary rounded-full">
          {number}
        </div>
      )}
      <div className={`ml-2 font-bold ${className}`}>{text}</div>
    </div>
  );
};
