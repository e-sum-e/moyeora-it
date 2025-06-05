type BadgeProps = {
  text: string;
  className?: string;
};
export const Badge = ({ text, className }: BadgeProps) => {
  return <span className={`p-1 rounded-sm ${className}`}>{text}</span>;
};
