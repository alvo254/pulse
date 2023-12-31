'use client';
import { useAccountContext } from '@/state/AccountState';
import Userpool from '@/state/Userpool';
import { CognitoUser } from 'amazon-cognito-identity-js';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { AiOutlineMail } from 'react-icons/ai';

// const CodeInput = ({ handleClear, handleSubmit, userInput, setUserInput }) => {
const Verify = () => {
	const [userInput, setUserInput] = useState('');
	const [fill, setFill] = useState(true);
	const itemsRef = useRef([]);
	let router = useRouter();
	const { userEmail } = useAccountContext();

	useEffect(() => {
		// itemsRef.current();
		itemsRef.current[0].focus();
	}, []);

	const codeChangeHandler = (event) => {
		const [, codeFieldIndex] = event.target.name.split('-');
		let fieldIntIndex = parseInt(codeFieldIndex, 10);
		setUserInput((prevState) => prevState + event.target.value);
		if (fieldIntIndex <= 4) {
			itemsRef.current[fieldIntIndex + 1].focus();
		} else {
			const field = document.querySelector(
				`Input[name=code-${fieldIntIndex}]`
			);
			field.blur();
			setFill(false);
		}
	};
	console.log(userEmail);
	const handleSubmit = async (e) => {
		e.preventDefault();
		// const confirmAccount = async (email, code) => {
		return await new Promise((resolve, reject) => {
			let userData = {
				Username: userEmail,
				Pool: Userpool,
			};
			const cognitoUser = new CognitoUser(userData);
			console.log(userInput);
			cognitoUser.confirmRegistration(userInput, true, (err, result) => {
				if (err) {
					console.log(err.message || JSON.stringify(err));
					itemsRef.current[0].value = '';
					itemsRef.current[1].value = '';
					itemsRef.current[2].value = '';
					itemsRef.current[3].value = '';
					itemsRef.current[4].value = '';
					itemsRef.current[5].value = '';
					setUserInput('');
					reject();
				} else {
					console.log('user Confirmed', result);
					router.push('/verified');
					setUserInput('');
					resolve();
				}
			});
		});
	};
	const handleResendConfirmationCode = async (e) => {
		e.preventDefault();
		// const confirmAccount = async (email, code) => {
		return await new Promise((resolve, reject) => {
			let userData = {
				Username: userEmail,
				Pool: Userpool,
			};
			const cognitoUser = new CognitoUser(userData);
			cognitoUser.resendConfirmationCode(function (err, result) {
				if (err) {
					alert(err.message || JSON.stringify(err));
					return;
				}
				console.log('call result: ' + result);
				alert('A new confirmation code has been resent to you');
			});
		});
	};
	const handleClear = (e) => {
		e.preventDefault();

		itemsRef.current[0].value = '';
		itemsRef.current[1].value = '';
		itemsRef.current[2].value = '';
		itemsRef.current[3].value = '';
		itemsRef.current[4].value = '';
		itemsRef.current[5].value = '';
		setUserInput('');
		itemsRef.current[0].focus();
	};

	return (
		<>
			<Head>
				<title>Prompay | Verify Account </title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div
				className='absolute top-0 left-0 right-0 bottom-0 h-[100vh] z-[1]'
				style={{
					background: 'rgba(6, 7, 32, 0.73)',
				}}
			/>
			<div className="bg-[url('/images/dataScience.avif')] h-[100vh] bg-cover bg-center ">
				<div className='h-full flex items-center'>
					<div className='relative z-10 w-[95vw] md:w-max px-4 h-[374px] bg-white shadow-sm mx-auto flex flex-col items-center justify-center py-4 rounded-[15px]'>
						<AiOutlineMail size={20} />
						<h3 className='font-[500] text-[18px] mt-4 text-[#667085]'>
							Please check your email.
						</h3>
						<p className='font-[400] text-[14px] leading-4 my-[14px] text-center text-[#667085]'>
							We've sent a code to your email
						</p>
						<form>
							<div className='flex justify-center gap-x-[12px] mt-[29px]'>
								{/* <CodeInput handleClear handleSubmit userInput setUserInput /> */}
								{new Array(6).fill(0).map((item, index) => (
									<input
										autoFocus
										ref={(ref) =>
											itemsRef.current.push(ref)
										}
										name={`code-${index}`}
										key={index}
										style={{
											boxShadow:
												'0px 1px 2px rgba(16, 24, 40, 0.05)',
										}}
										onChange={(event) =>
											codeChangeHandler(event)
										}
										maxLength={1}
										className='w-[10vw] md:w-[60px] h-[10vw] md:h-[60px] bg-white border border-[#D6BBFB] rounded-lg p-2 placeholder:font-[500] placeholder:text-[#060720] text-[#060720] font-[500] text-3xl md:text-[48px] text-center'
									/>
								))}
							</div>
							<div className='text-center mt-[6px] mb-[20px] md:mb-[32px]'>
								<button
									onClick={handleResendConfirmationCode}
									className='text-center'
								>
									Didn’t get a code? Click to resend.
								</button>
							</div>
							<div className='flex gap-[24px] justify-center mt-[20px] mb-3 md:mt-[60]'>
								<button
									onClick={handleClear}
									className='hover:bg-slate-900 hover:text-white  bg-transparent text-black py-3 px-[18px] w-[35vw] md:w-[174px] h-[44px] rounded-lg border border-[#D0D5DD] hover:border-none text-[16px] font-[900] leading-5 text-center'
								>
									Cancel
								</button>
								<button
									className={`hover:bg-primaryBlue  bg-primaryGreen text-black py-3 px-[18px] w-[35vw] md:w-[174px] h-[44px] rounded-lg border hover:border-none text-[16px] font-[900] leading-5 text-center ${
										fill
											? 'cursor-not-allowed'
											: 'pointer-events-auto cursor-pointer'
									}`}
									onClick={handleSubmit}
									disabled={fill ? true : false}
								>
									Verify
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Verify;
