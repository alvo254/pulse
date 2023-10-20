import Head from 'next/head';
import Link from 'next/link';
import { ImCheckmark } from 'react-icons/im';
const Verified = () => {
	return (
		<>
			<div className="bg-[url('/images/dataScience.avif')] h-[100vh] bg-cover z-10 relative ">
				<div className='h-full flex items-center'>
					<div className='relative z-10 w-4/5 md:w-[408px] h-[374px] bg-white shadow-sm mx-auto flex flex-col items-center justify-center py-4 px-[12px] md:px-[52px] rounded-[15px]'>
						<div
							className='w-[60px] h-[60px] p-5 bg-slate-800 '
							style={{ borderRadius: '50%' }}
						>
							<ImCheckmark size={20} className='text-white' />
						</div>
						<p className='font-[400] text-[13px] leading-4 mt-[21px] mb-[47px] text-center text-black'>
							Congratulations! Your Account has been activated.
							Please log in to start.
						</p>

						<div className='flex gap-[24px] justify-center mt-[20px] mb-3 md:mt-[60]'>
							<Link
								href='/signin'
								className='hover:bg-slate-600  bg-slate-800 text-white py-[10px] px-[18px] w-[174px] h-[44px] rounded-lg border hover:border-none text-[16px] font-[900] leading-5 text-center'
							>
								Sign in
							</Link>
						</div>
						<hr />
					</div>
				</div>
			</div>
		</>
	);
};

export default Verified;
