import React from 'react';

type Props = React.PropsWithChildren<{ className?: string; title?: string; footer?: React.ReactNode }>;

export default function Card({ className = '', title, footer, children }: Props) {
	return (
		<div className={`bg-white/80 backdrop-blur rounded-2xl shadow-md border border-white/40 ${className}`}>
			{title && <div className="px-5 pt-5 text-sm font-semibold text-gray-800">{title}</div>}
			<div className={`px-5 ${title ? 'pt-3' : 'pt-5'} pb-5`}>{children}</div>
			{footer && <div className="px-5 pb-4 text-xs text-gray-600">{footer}</div>}
		</div>
	);
}
