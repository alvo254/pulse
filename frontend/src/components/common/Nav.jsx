'use client';
import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import Button from './Button';
import Link from 'next/link';
import { useAccountContext } from '@/state/AccountState';
import { useStateContext } from '@/state/AppContext';
import { MdOutlineCancel } from 'react-icons/md';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

const Nav = () => {
	const [user, setuser] = useState('');
	const { getSession } = useAccountContext();
	const [activeMenu, setActiveMenu] = useState(false);
	useEffect(() => {
		getSession()
			.then((session) => {
				// console.log(session);
				setuser(session.name);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [user]);
	// console.log(user);
	let { screenSize } = useStateContext();

	useEffect(() => {
		if (activeMenu && screenSize <= 900) {
			setActiveMenu(false);
		}
	}, []);
	const handleCloseSidebar = () => {};
	return (
		<nav className='flex justify-between items-center px-4 md:px-[5rem] mt-[2.06rem] w-screen'>
			<div className='flex flex-col md:flex-row justify-between md:items-center w-full'>
				<div className='flex w-screen md:w-full items-center justify-between px-5 md:px-0 '>
					<Logo />
					<button
						type='button'
						onClick={() => setActiveMenu((prevState) => !prevState)}
						className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'
					>
						<HiOutlineMenuAlt3 size={40} />
					</button>
				</div>
				<div
					className={`${
						activeMenu
							? 'flex flex-col md:flex-row h-[60vh]'
							: 'hidden md:flex justify-between'
					} `}
				>
					<ul className='flex flex-col gap-y-4 mt-10 md:mt-0 md:ml-[4.06rem] gap-x-8 md:hidden'>
						<li>
							<Link
								href={'#'}
								className='text-slate-700 font-[600] text-[1.125rem] leading-normal hover:text-slate-800'
								onClick={handleCloseSidebar}
							>
								Solution
							</Link>
						</li>
						<li>
							<Link
								href={'#'}
								className='text-slate-700 font-[600] text-[1.125rem] leading-normal hover:text-slate-800'
							>
								Market Place
							</Link>
						</li>
						<li>
							<Link
								href={'#'}
								className='text-slate-700 font-[600] text-[1.125rem] leading-normal hover:text-slate-800'
							>
								Learn
							</Link>
						</li>
						<li>
							<Link
								href={'#'}
								className='text-slate-700 font-[600] text-[1.125rem] leading-normal hover:text-slate-800'
							>
								About
							</Link>
						</li>
						<li>
							<Link
								href={'#'}
								className='text-slate-700 font-[600] text-[1.125rem] leading-normal hover:text-slate-800'
							>
								Customer Stories
							</Link>
						</li>
					</ul>
					<div className='flex flex-col md:flex-row mt-6 md:mt-0 gap-y-6 md:gap-x-[1.25rem] items-center'>
						{user ? (
							<Button text={'Dashboard'} link={'/overview'} />
						) : (
							<>
								<Link
									href={'/signin'}
									className='text-slate-800 hover:text-slate-600 text-[1.125rem] leading-normal font-[600]'
									onClick={handleCloseSidebar}
								>
									Login
								</Link>
								<Button text={'Signup'} link={'/signup'} />
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
