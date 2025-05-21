import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { WriteForm } from '@/types';
import { UseFormReturn } from 'react-hook-form';

type TitleProps = {
	form: UseFormReturn<WriteForm>;
};

export const Title = ({ form }: TitleProps) => {
	return (
		<>
			<FormField
				control={form.control}
				name="title"
				render={({ field }) => (
					<FormItem>
						<FormLabel>제목</FormLabel>
						<FormControl>
							<Input placeholder="제목을 입력해주세요" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};
