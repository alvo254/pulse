import Link from 'next/link';
import React from 'react';

const Button = ({ text, link }) => {
	return (
		<Link
			href={link ? link : '#'}
			className='block rounded-md py-[0.9rem] px-[1.25rem] bg-slate-900 text-slate-50 hover:bg-slate-800 font-[600] text-[1.25rem] leading-normal'
		>
			{text}
		</Link>
	);
};

export default Button;
