import React from 'react';

const Header = () => {
	return (
		<div class='w-screen'>
			<div className='px-3 md:px-8 flex gap-4 flex-col-reverse md:flex-row mt-14'>
				<div className='w-full md:w-1/2'>
					<h1 className='text-slate-700 font-[600] text-[2rem] md:text-[3.5rem] leading-normal hover:text-slate-800'>
						An all in one tool for Data Scientist!
					</h1>
					<p className='mt-4 md:mr-24'>
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Aliquid, consequatur temporibus iusto unde esse
						architecto amet deleniti, sequi excepturi ipsa
						blanditiis nulla?
					</p>

					<div className='flex mb-3'>
						<button className='block py-[1.19rem] px-[1.25rem] bg-slate-900 text-slate-50 hover:bg-slate-800 font-[600] text-[1.10rem] leading-normal mt-6'>
							{' '}
							Try For Free
						</button>

						<button className='ml-6 mt-6 hover:grayscale-0'>
							{' '}
							Book Demo
						</button>
					</div>
				</div>
				<div className='w-full mb-4 md:mb-0 md:w-1/2 '>
					<img
						className='w-355 h-42'
						src={'/images/pics1.jpg'}
						alt='data analytics'
					/>
				</div>
			</div>

			<div className='gap-4 flex flex-col md:flex-row ml-8 mr-10 mt-12 mb-12'>
				<div className=' w-full md:w-1/3 justify-center text-center'>
					<h1 className='mb-4 text-slate-700 font-[600] text-[1.5rem] leading-normal hover:text-slate-800'>
						Descriptive Analytics
					</h1>
					<img
						className='md:h-[300px]'
						src={'/images/pics4.jpg'}
						alt='Descriptive Analytics'
					/>
					<p className='mt-4'>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Accusantium asperiores, cupiditate numquam
						veritatis .
					</p>
				</div>
				<div className=' w-full md:w-1/3 justify-center text-center'>
					<h1 className='mb-4 text-slate-700 font-[600] text-[1.5rem] leading-normal hover:text-slate-800'>
						Predictive Analytics
					</h1>
					<img
						className='md:h-[300px]'
						src={'/images/pics5.jpg'}
						alt='Predictive Analytics'
					/>
					<p className='mt-4'>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Tempore natus harum eum quos iusto, ea eaque.
						Impedit ?
					</p>
				</div>

				<div className=' w-full md:w-1/3 justify-center text-center'>
					<h1 className='mb-4 text-slate-700 font-[600] text-[1.5rem] leading-normal hover:text-slate-800'>
						Prescriptive Analytics
					</h1>
					<img
						className='md:h-[300px]'
						src={'/images/pics6.jpg'}
						alt='Prescriptive Analytics'
					/>
					<p className='mt-4'>
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Illo recusandae qui atque ad perferendis commodi
						numquam aut,{' '}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Header;
