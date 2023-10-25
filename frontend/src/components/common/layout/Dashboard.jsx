'use client';
import { useEffect } from 'react';
import Navbar from '../navigation/Navbar';
import Sidebar from '../navigation/Sidebar';
import { useStateContext } from '@/state/AppContext';
// import LogoutModal from '../LogoutModal';
import { useRouter } from 'next/navigation';

function DashboardLayout({ children }) {
	const router = useRouter();
	const {
		openLogoutModal,
		setOpenLogoutModal,
		activeMenu,
		darkToggle,
		login,
	} = useStateContext();

	return (
		<div className={`${darkToggle && 'dark'} App`}>
			<div className='flex relative dark:bg-main-dark-bg'>
				{activeMenu ? (
					<div
						className={` ${
							login
								? 'hidden w-0 md:w-0'
								: 'w-72 md:w-[230px] fixed sidebar dark:bg-secondary-dark-bg bg-white'
						} `}
					>
						<Sidebar />
					</div>
				) : (
					<div
						className={`${
							login
								? 'hidden w-0'
								: 'w-0 dark:bg-secondary-dark-bg'
						} `}
					>
						<Sidebar />
					</div>
				)}

				<div
					className={`
              ${
					activeMenu && !login ? 'md:ml-[230px] w-[82%]' : 'flex-2'
				} dark:bg-main-bg bg-main-bg min-h-screen w-full`}
				>
					<div
						className={`${
							login
								? 'hidden w-0'
								: 'fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'
						}`}
					>
						<Navbar />
					</div>
					<div className=' min-h-screen'>
						<div className='dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white pt-[50px] md:pt-0 '>
							<div className=' pt-[30px] shadow pb-[30px]dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white  pb-[20px]'>
								{/* <LogoutModal
									modalOpen={openLogoutModal}
									handleOpen={setOpenLogoutModal}
								/> */}
								{children}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardLayout;
