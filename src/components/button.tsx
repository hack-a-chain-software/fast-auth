import { twMerge } from 'tailwind-merge';

export function Button({
	children,
	disabled,
	onClick = () => {},
	className = '',
}: {
	disabled?: boolean;
	children: any;
	onClick?: () => void;
	className?: string;
}) {
	return (
		<button
			disabled={disabled}
			children={children}
			onClick={() => onClick()}
			className={twMerge(
				'bg-purple-0 text-white text-[14px] uppercase min-h-[40px] px-[13px] tracking-[0px] border border-white rounded-[50px] font-[400] hover:bg-white hover:text-purple-0 flex items-center outline-none',
				className,
			)}
		/>
	);
}
