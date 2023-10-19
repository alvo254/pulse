'use client';
import React, { useState, useContext, useEffect } from 'react';
import GoogleButton from '@/components/common/GoogleButton';
import Link from 'next/link';
import { AiOutlineMail } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
// import { useRouter } from 'next/router';
// import { useSession } from 'next-auth/react';
import Alert from '@/components/common/Alert';
// import Meta from '@/components/common/Meta';
// import { createAccount } from 'services/commonService';
import ButtonLoader from '@/components/loaders/ButtonLoader';
import Logo from '../common/Logo';
import AccountState, { useAccountContext } from '@/state/AccountState';
import AccountContext from '@/state/AccountState';
// import withLogoutAuth from 'components/auth/withLogoutAuth';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState({
		type: '',
		title: '',
		content: '',
	});
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				setIsOpen(false);
			}, 5000);
		}
	}, [isOpen]);
	// const { signup } = useContext(AccountContext);
	const { signup, regMessage } = useAccountContext();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !username || !password) {
		}
		signup(email, username, password)
			.then((data) => {
				console.log('registration succesful', data);
				setIsOpen(true);
				setMessage({ type: 'success', content: regMessage });
				setEmail('');
				setUsername('');
				setPassword('');
			})
			.catch((err) => {
				console.log('error', err, regMessage);
				setIsOpen(true);
				setMessage({ type: 'error', content: regMessage });
			});
	};
	return (
		<>
			{/* <Meta title='Sign up | Social Jar' /> */}

			<div className='bg-[#1d171a] min-h-[100vh] py-[30px] md:py-[70px]'>
				<div className='flex flex-col items-center justify-center '>
					{/* <Logo /> */}
					<div className='bg-white w-[90%] md:w-[448px] rounded-lg relative'>
						{isOpen && (
							<Alert
								type={message.type}
								title={message.title}
								message={message.content}
								isOpen={isOpen}
								setIsOpen={setIsOpen}
							/>
						)}
						<div className='px-[12px] md:w-[448px] rounded-lg flex flex-col items-center justify-between'>
							<p className='text-[24px] text-primaryPurple font-[700] font-dmsans leading-[31.25px] mt-[24px]'>
								Signup
							</p>

							<GoogleButton />
							<div className='flex items-center justify-center mb-[27px]'>
								<img
									src='/images/line.png'
									alt=''
									className='hidden md:block'
								/>
								<p className='mx-[24px] font-[400] font-dmsans text-[12px] text-black'>
									Or sign up with
								</p>
								<img
									src='/images/line.png'
									alt=''
									className='hidden md:block'
								/>
							</div>
							<form onSubmit={handleSubmit}>
								<div className='mb-[13px]'>
									<label
										htmlFor='email'
										className='text-black'
									>
										Email
									</label>
									<div className='dark:text-gray-200  dark:hover:text-white flex mx-auto w-full md:w-[379px] h-[45px] pl-[16px] items-center border border-[#cfcfcf] bg-white rounded-lg mt-[3px]'>
										{/* <img
											src='/images/icons/email.png'
											alt='email'
										/> */}
										<AiOutlineMail />
										<input
											type='email'
											className='p-2 border-none bg-white outline-none w-[100%] text-[16px] rounded-r-lg text-black'
											onChange={(e) =>
												setEmail(e.target.value)
											}
											name={email}
											value={email}
											required
										/>
									</div>
								</div>
								<div className='mb-[13px]'>
									<label
										htmlFor='username'
										className='text-black'
									>
										Username
									</label>
									<div className='dark:text-gray-200  dark:hover:text-white flex mx-auto w-full md:w-[379px] h-[45px] pl-[16px] items-center border border-[#cfcfcf] bg-white rounded-lg mt-[3px]'>
										{/* <img
											src='/images/icons/email.png'
											alt='username'
										/> */}
										<FaUserAlt />
										<input
											type='text'
											className='p-2 border-none bg-white outline-none w-[100%] text-[16px] rounded-r-lg text-black'
											onChange={(e) =>
												setUsername(e.target.value)
											}
											name='username'
											value={username}
											required
										/>
									</div>
								</div>
								<div className='mb-[13px]'>
									<label
										htmlFor='password'
										className='text-black'
									>
										Password
									</label>
									<div className='dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white flex mx-auto w-full md:w-[379px] h-[45px] pl-[16px] items-center border border-[#cfcfcf] bg-transparent rounded-lg mt-[3px]'>
										<RiLockPasswordFill />
										<input
											type='password'
											className='p-2 bg-transparent outline-none active:bg-transparent placeholder:bg-transparent fill-transparent w-[100%] text-[16px] rounded-r-lg border-none text-black'
											id='password'
											onChange={(e) =>
												setPassword(e.target.value)
											}
											name={password}
											value={password}
											required
										/>
									</div>
								</div>
								<p className='my-[30px] font-[400] font-dmsans text-[14px] leading-[18px] text-black md:w-[393px]   '>
									By signing up, you confirm that you've read
									and accepted our{' '}
									<Link
										href=''
										className='text-primaryPurple'
									>
										Terms of Service
									</Link>{' '}
									and{' '}
									<Link
										href=''
										className='text-primaryPurple'
									>
										Privacy Policy.
									</Link>{' '}
									We will also subscribe you to our Level Up
									newsletter. You can unsubscribe at anytime.
								</p>
								<div className='w-full flex justify-center'>
									<button
										type='submit'
										disabled={isLoading}
										className='flex justify-center items-center mb-[35px] text-white bg-black w-[160px] h-[47px] font-[700] font-source text-[18px] rounded-lg  hover:bg-primaryYellow'
									>
										{isLoading ? (
											<span>
												<ButtonLoader />
											</span>
										) : (
											<span>Sign up</span>
										)}
									</button>
								</div>
							</form>
							<p className='mb-[30px] font-[400] font-dmsans text-[14px] leading-[18px] text-black text-center '>
								Already registered?{' '}
								<Link
									href='/signin'
									className='text-primaryPurple'
								>
									Login
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;
