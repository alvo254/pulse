import Image from 'next/image';
import React from 'react';
import { AiFillMail } from 'react-icons/ai';
import { MdOutlineLocationOn } from 'react-icons/md';
import { BsTelephoneFill } from 'react-icons/bs';
import Button from './Button';
import Logo from './Logo';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
const Footer = () => {
	return (
		<footer className='mt-9 bg-slate-800 px-4 md:px-[5.25rem] pt-[5.5rem] pb-[3.4rem]'>
			<section className='flex flex-col md:flex-row'>
				<div className='w-full md:w-[13.635rem]'>
					<div>
						<p className='text-[2rem] font-[300] leading-normal p-0 m-0 text-white'>
							social<span className='font-[600]'>jar</span>
						</p>
						<p className='text-[0.75rem] font-[500] text-slate-200 leading-normal uppercase p-0 mt-[-5px]'>
							by C5Students
						</p>
					</div>
					<p className='text-slate-200 font-[400] text-[1rem] leading-[1.5rem] mt-[1.62rem] '>
						A platform for data scientists to access, analyze, and
						process data from social media networks.
					</p>
				</div>
				<div className='flex justify-around my-[2rem] md:my-0'>
					<div className='md:ml-[5.88rem]'>
						<h5 className='text-[1rem] text-white font-[700] leading-[1.375rem] mb-[1.62rem] '>
							Service
						</h5>
						<ul>
							<li className='text-slate-200 font-[500] text-[1rem] leading-[1.5rem] mb-[1rem]'>
								Brand Design
							</li>
							<li className='text-slate-200 font-[500] text-[1rem] leading-[1.5rem] mb-[1rem]'>
								Mobile Design
							</li>
							<li className='text-slate-200 font-[500] text-[1rem] leading-[1.5rem] mb-[1rem]'>
								Motion Graphic
							</li>
							<li className='text-slate-200 font-[500] text-[1rem] leading-[1.5rem] mb-[1rem]'>
								Web Design
							</li>
							<li className='text-slate-200 font-[500] text-[1rem] leading-[1.5rem] mb-[1rem]'>
								Development
							</li>
							<li className='text-slate-200 font-[500] text-[1rem] leading-[1.5rem] mb-[1rem]'>
								SEO
							</li>
						</ul>
					</div>
					<div className='md:ml-[6.12rem]'>
						<h5 className='text-[1rem] text-white font-[700] leading-[1.375rem] mb-[1.62rem] '>
							Company
						</h5>
						<ul>
							<li className='text-slate-200 font-[500] text-[1rem] leading-[1.5rem] mb-[1rem]'>
								Service
							</li>
							<li className='text-slate-200 font-[500] text-[1rem] leading-[1.5rem] mb-[1rem]'>
								Features
							</li>
							<li className='text-slate-200 font-[500] text-[1rem] leading-[1.5rem] mb-[1rem]'>
								Our Team
							</li>
							<li className='text-slate-200 font-[500] text-[1rem] leading-[1.5rem] mb-[1rem]'>
								Portfolio
							</li>
							<li className='text-slate-200 font-[500] text-[1rem] leading-[1.5rem] mb-[1rem]'>
								Blog
							</li>
							<li className='text-slate-200 font-[500] text-[1rem] leading-[1.5rem] mb-[1rem]'>
								Contact Us
							</li>
						</ul>
					</div>
				</div>
				<div className='md:ml-[6.12rem]'>
					<h5 className='text-[1rem] text-white font-[700] leading-[1.375rem] mb-[1.62rem] text-center md:text-left'>
						Join a Newsletter
					</h5>
					<label
						htmlFor='email'
						className='text-slate-200 font-[500] text-[1rem] leading-[1.5rem] mb-[0.62rem] block'
					>
						Your Email
					</label>
					<div className='flex flex-col md:flex-row gap-y-4 gap-x-4'>
						<input
							type='email'
							placeholder='Enter Your Email'
							className='border border-primaryYellow bg-transparent h-[3.5rem] w-[18.5rem] pl-3 text-slate-200 '
						/>
						{/* <button className='px-[3rem] py-4 text-[0.875rem] font-[500] leading-[1.3125rem] text-secondaryBlack bg-primaryYellow rounded-[0.5rem]'>
							Subscribe
						</button> */}
						<Button text={'Subscribe'} />
					</div>
					<div className='flex justify-center md:justify-start mt-[1.38rem] gap-x-4'>
						<div className='h-[2.5rem] w-[2.5rem] flex justify-center items-center bg-slate-900 text-white rounded-full'>
							<span className='text-4 font-[700] '>
								<FaTwitter />
							</span>
						</div>
						<div className='h-[2.5rem] w-[2.5rem] flex justify-center items-center bg-slate-900 text-white rounded-full'>
							<span className='text-4 font-[700] '>
								<FaLinkedin />
							</span>
						</div>
						<div className='h-[2.5rem] w-[2.5rem] flex justify-center items-center bg-slate-900 text-white rounded-full'>
							<span className='text-4 font-[700] '>
								<FaInstagram />
							</span>
						</div>
					</div>
				</div>
			</section>
			{/* <div className='w-full h-[1px] bg-primaryYellow my-[2.5rem]'></div> */}
			{/* <section className='flex flex-col md:flex-row gap-y-6 justify-between items-center'>
				<p className='text-slate-200 font-[400] text-[1rem] leading-[1.5rem]'>
					Copyright Spin Designs{' '}
				</p>
				<div className='flex flex-col md:flex-row gap-y-6 md:items-center gap-x-[2.5rem]'>
					<div className='flex items-center gap-x-4 w-[14rem]'>
						<MdOutlineLocationOn className='text-white text-[1.5rem]' />
						<p className='text-slate-200 font-[400] text-[1rem] leading-[1.5rem]'>
							8819 Ohio St. South Gate, CA 90280
						</p>
					</div>
					<div className='flex items-center gap-x-4'>
						<AiFillMail className='text-white text-[1.5rem]' />
						<p className='text-slate-200 font-[400] text-[1rem] leading-[1.5rem]'>
							spindesigns@spin.io
						</p>
					</div>
					<div className='flex items-center gap-x-4'>
						<BsTelephoneFill className='text-white text-[1.5rem]' />
						<p className='text-slate-200 font-[400] text-[1rem] leading-[1.5rem]'>
							+1 386-688-3295
						</p>
					</div>
				</div>
			</section> */}
		</footer>
	);
};

export default Footer;
