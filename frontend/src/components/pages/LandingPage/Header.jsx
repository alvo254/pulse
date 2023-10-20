import Image from 'next/image';
import React from 'react';
import logo1 from './images/pics1.jpg'
import logo2 from './images/pics2.jpg'
import logo3 from './images/pics3.jpg'
import logo4 from './images/pics4.jpg'
import logo5 from './images/pics5.jpg'

const Header = () => {
	return <div class="container">
		<div class="container ml-8 mr-12 flex mt-14">
		<div class=" w-1/2">
<h1 className='text-slate-700 font-[600] text-[3.5rem] leading-normal hover:text-slate-800' >
	An all in one tool for Data Scientist!
</h1>
<p class="mt-4 mr-24">
	Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, consequatur temporibus iusto unde esse architecto amet deleniti, sequi excepturi ipsa blanditiis nulla?
</p>

<div class='flex'>
<button className='block py-[1.19rem] px-[1.25rem] bg-slate-900 text-slate-50 hover:bg-slate-800 font-[600] text-[1.10rem] leading-normal mt-6'> Try For Free</button>

<button className='ml-6 mt-6 hover:grayscale-0'> Book Demo</button>
</div>

		</div>
		<div class="w-1/2 ml-4">
			<Image className='w-355 h-42'
			src={logo1}
			alt='data analytics'
			quality={100}
			placeholder='blur'
			/>
		</div>

		</div>

<div class="container gap-4 flex ml-8 mr-10 mt-12 mb-12">
		<div className=' w-1/3 justify-center text-center'>
     <h1 class='mb-4 text-slate-700 font-[600] text-[1.5rem] leading-normal hover:text-slate-800'>Descriptive Analytics</h1>
		 <Image className='width:15%; margin:20px 20px 50px;'
			src={logo2}
			alt='Descriptive Analytics'
			quality={100}
			placeholder='blur'
			/>
			<p className='mt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium asperiores, cupiditate numquam veritatis .</p>

		</div>
		<div className=' w-1/3 justify-center text-center'>
         <h1 class='mb-4 text-slate-700 font-[600] text-[1.5rem] leading-normal hover:text-slate-800'>Predictive Analytics</h1>
		 <Image className='width:15%; margin:20px 20px 50px;'
			src={logo3}
			alt='Predictive Analytics'
			quality={100}
			placeholder='blur'
			/>
			<p className='mt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore natus harum eum quos iusto, ea eaque. Impedit ?</p>
		</div>
	
		<div className=' w-1/3 justify-center text-center'>
        <h1 class='mb-4 text-slate-700 font-[600] text-[1.5rem] leading-normal hover:text-slate-800'>Prescriptive Analytics</h1>
		 <Image className='width:15%; margin:20px 20px 50px;'
			src={logo5}
			alt='Prescriptive Analytics'
			quality={100}
			placeholder='blur'
			/>
			<p className='mt-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo recusandae qui atque ad perferendis commodi numquam aut, </p>
		</div>
	</div>

	</div>;
};

export default Header;
