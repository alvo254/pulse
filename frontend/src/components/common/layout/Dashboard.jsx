'use client';
import { useEffect } from 'react';
import Navbar from '../navigation/Navbar';
import Sidebar from '../navigation/Sidebar';
import { useStateContext } from '@/state/AppContext';
// import LogoutModal from '../LogoutModal';
import { useRouter } from 'next/navigation';
import Userpool from '@/state/Userpool';
import CustomModal from '../CustomModal';
import { FaWindowClose } from 'react-icons/fa';

function DashboardLayout({ children }) {
	const router = useRouter();
	const {
		openLogoutModal,
		setOpenLogoutModal,
		activeMenu,
		darkToggle,
		login,
	} = useStateContext();
	const handleLogout = () => {
		const user = Userpool.getCurrentUser();
		user.signOut();
		localStorage.removeItem('user');
		router.push('/');
	};

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
					<div className=' min-h-screen bg-[#0A2533'>
						<div className='dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white pt-[50px] md:pt-0 '>
							<div className=' pt-[30px] dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white  pb-[20px]'>
								{/* <LogoutModal
									modalOpen={openLogoutModal}
									handleOpen={setOpenLogoutModal}
								/> */}
								{children}
								<CustomModal
									modalIsOpen={openLogoutModal}
									setIsOpen={setOpenLogoutModal}
								>
									<div className='px-[20px]'>
										<div className='flex justify-between items-center'>
											<p className='font-[600] text-[1.25rem] leading-[2.375rem] text-[#2E3646]'>
												Log out
											</p>
											<FaWindowClose
												className='cursor-pointer'
												onClick={() =>
													setOpenLogoutModal(
														(preveState) =>
															!preveState
													)
												}
											/>
										</div>
										<p className='my-[1.5rem] font-[400] text-[0.875rem] leading-[1.5rem] text-[#5F6D7E] text-center'>
											This action will log you out of this
											website.
										</p>
										<div className='flex gap-x-[0.75rem]'>
											<button
												type='submit'
												className=' py-[8px] px-[16px] rounded-lg bg-[#DB2438]  font-dmsans font-[500] text-[18px] text-white'
												onClick={() => {
													handleLogout();
													setOpenLogoutModal(false);
												}}
											>
												Yes, Log out
											</button>
											<button
												type='submit'
												className=' py-[8px] px-[16px] rounded-lg border border-[#D1D5DB] font-[500] text-[18px] text-black '
												onClick={() =>
													setOpenLogoutModal(
														(preveState) =>
															!preveState
													)
												}
											>
												No, continue
											</button>
										</div>
									</div>
								</CustomModal>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardLayout;
