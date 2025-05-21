type BadgeProps = {
	text: string;
	className?: string;
};
export const Badge = ({ text, className }: BadgeProps) => {
	return <div className={className}>{text}</div>;
};
