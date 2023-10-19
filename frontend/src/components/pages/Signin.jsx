'use client';
import React, { useEffect, useState } from 'react';
import GoogleButton from '@/components/common/GoogleButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { signIn } from 'next-auth/react';
// import { useSession } from 'next-auth/react';
import Alert from '@/components/common/Alert';
import Meta from '@/components/common/Meta';
// import withLogoutAuth from 'components/auth/withLogoutAuth';

const Signin = () => {
	// const { status } = useSession();
	// const router = useRouter();
	// const { redirect } = router.query;

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState({
		type: '',
		title: '',
		content: '',
	});
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// React.useEffect(() => {
	// 	window.scrollTo(0, 0);
	// }, []);

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();

	// 	if (!email || !password) return;
	// 	setIsLoading(true);

	// 	try {
	// 		const result = await signIn('credentials', {
	// 			email: email,
	// 			password: password,
	// 			redirect: false,
	// 		});

	// 		if (result.ok === true) {
	// 			router.replace('/user/overview' || redirect);
	// 		} else {
	// 			if (result.error === 'activate') {
	// 				setMessage({
	// 					type: 'error',
	// 					title: 'Account is not activated',
	// 					content:
	// 						'You need to activate before log in. A link to activate your account has been sent to your email Address',
	// 				});
	// 				setIsOpen(true);
	// 			} else {
	// 				setMessage({
	// 					type: 'error',
	// 					title: 'Sign in error',
	// 					content: result.error,
	// 				});
	// 				setIsOpen(true);
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	} finally {
	// 		setIsLoading(false);
	// 		setEmail('');
	// 		setPassword('');
	// 	}
	// };

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setIsOpen(false);
	// 	}, 10000);
	// }, [isOpen]);
	const handleSubmit = () => {};
	return (
		<>
			<Meta title='Sign in | Social Jar' />

			<div className='bg-[#1d171a] py-[20px] min-h-[100vh]'>
				<div className='flex flex-col items-center justify-center'>
					<Link href='/'>
						<img
							src='/images/logo.png'
							alt='devcent logo'
							className='mb-[18px]'
						/>
					</Link>
					<div className='bg-white text-black w-[90%] sm:w-[70%] md:w-[448px] rounded-lg relative'>
						{isOpen && (
							<Alert
								type={message.type}
								title={message.title}
								isOpen={isOpen}
								setIsOpen={setIsOpen}
								message={message.content}
							/>
						)}
						<div className='px-[12px] md:w-[448px] flex flex-col items-center justify-between'>
							<p className='text-[24px] text-primaryPurple font-[700] font-dmsans leading-[31.25px] mt-[24px] '>
								Login
							</p>
							<GoogleButton />
							<div className='flex items-center justify-center mb-[15px] md:mb-[27px]'>
								<img
									src='/images/line.png'
									alt=''
									className='hidden md:block'
								/>
								<p className='mx-[24px] font-[400] font-dmsans text-[12px] text-black'>
									Or login with
								</p>
								<img
									src='/images/line.png'
									alt=''
									className='hidden md:block'
								/>
							</div>
							<form onSubmit={handleSubmit} className='w-full'>
								<div className='mb-[13px]'>
									<label
										htmlFor='email'
										className='w-full md:w-[379px] mx-auto block text-black'
									>
										Email
									</label>
									<div className='dark:text-gray-200  dark:hover:text-white flex mx-auto w-full md:w-[379px] h-[45px] pl-[16px] items-center border border-[#cfcfcf] bg-white rounded-lg mt-[3px]'>
										<img
											src='/images/icons/email.png'
											alt='email'
										/>
										<input
											type='text'
											className='p-2 bg-white outline-none w-[100%] text-[16px] rounded-r-lg border-none text-black'
											onChange={(e) =>
												setEmail(e.target.value)
											}
											name={email}
											value={email}
										/>
									</div>
								</div>
								<div className='mb-[13px]'>
									<label
										htmlFor='password'
										className='w-full md:w-[379px] mx-auto block text-black'
									>
										Password
									</label>
									<div className='dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white flex mx-auto w-full md:w-[379px] h-[45px] pl-[16px] items-center border border-[#cfcfcf] bg-transparent rounded-lg mt-[3px]'>
										<img
											src='/images/icons/password.png'
											alt='password'
										/>
										<input
											type='password'
											className='p-2 bg-transparent outline-none active:bg-transparent placeholder:bg-transparent fill-transparent w-[100%] text-[16px] rounded-r-lg border-none text-black'
											id='password'
											onChange={(e) =>
												setPassword(e.target.value)
											}
											name={password}
											value={password}
										/>
									</div>
								</div>
								<div className='w-full md:w-[379px] md:flex items-center justify-between mt-[11px] mb-[41px]'>
									<div className='md:ml-[20px]'>
										<input
											type='checkbox'
											name='stayLogin'
											id='login'
										/>
										<label
											htmlFor='login'
											className='font-[400] font-dmsans text-[14px] leading-[18px] text-black md:w-[393px] ml-[12px]  '
										>
											Stay logged in
										</label>
									</div>
									<Link
										href='/password-recovery'
										className='text-primaryPurple'
									>
										Forgot your password?
									</Link>
								</div>
								<div className='w-full flex justify-center'>
									<button
										type='submit'
										className='mb-[35px] text-white bg-black w-[160px] h-[47px] font-[700] font-source text-[18px] rounded-lg  hover:bg-primaryYellow'
										disabled={isLoading}
									>
										{isLoading ? 'Loading...' : 'Login'}
									</button>
								</div>
							</form>
							<p className='mb-[30px] font-[400] font-dmsans text-[14px] leading-[18px] text-black text-center '>
								Don’t have an account?{' '}
								<Link
									href='/signup'
									className='text-primaryPurple'
								>
									Sign Up
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signin;
