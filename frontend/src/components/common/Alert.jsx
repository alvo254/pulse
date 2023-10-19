// import { XIcon } from '@heroicons/react/outline';

const Alert = ({ type, title, message, isOpen, setIsOpen }) => {
	return (
		<>
			{isOpen && (
				<div
					className={`absolute top-0 left-0 right-0 w-full p-4 rounded-[4px] bg-[rgb(241,234,238)] ${
						isOpen
							? 'transform translate-y-0 transition ease-out duration-300'
							: 'transform -translate-y-full transition ease-in duration-200'
					} `}
				>
					<div className='flex justify-between items-center'>
						<div className='w-full mr-3 flex gap-x-[20px] items-center'>
							<img
								src='/images/icons/markbg.png'
								className='w-[20px] h-[20px] rounded-full'
								alt='mark bg'
							/>
							<div className='w-[80%] flex flex-col items-center'>
								<h2 className='font-[600] text-[16px] capitalize text-center text-[#202223] leading-5'>
									{title}
								</h2>
								{message && (
									<p
										className={`mt-[10px] font-[400] text-[14px] ${
											type === 'error'
												? 'text-red-500'
												: 'text-primaryPurple'
										}  leading-5`}
									>
										{message}{' '}
									</p>
								)}
							</div>
						</div>
						<div className='flex-shrink-0'>
							{/* <XIcon
								className='h-5 w-5 text-yellow-400'
								onClick={() => setIsOpen(false)}
							/> */}
							<button
								type='button'
								className='mr-auto -mx-1.5 -my-1.5 bg-green-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700 cursor-pointer'
								data-dismiss-target='#alert-border-3'
								aria-label='Close'
								onClick={() => setIsOpen(!isOpen)}
							>
								<span className='sr-only'>Dismiss</span>
								<svg
									aria-hidden='true'
									className='w-5 h-5'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
										clipRule='evenodd'
									></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Alert;
