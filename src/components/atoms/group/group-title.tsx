type GroupTitleProps = {
  text: string;
  className?: string;
};

export const GroupTitle = ({ text, className }: GroupTitleProps) => {
  return <div className={`group-title ${className}`}>{text}</div>;
};
