// import * as React from 'react';
// import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { signOut } from 'next-auth/react';
// import { useRouter } from 'next/router';
// const style = {
// 	position: 'absolute',
// 	top: '50%',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	width: 400,
// 	bgcolor: 'background.paper',
// 	border: '2px solid #000',
// 	boxShadow: 24,
// 	p: 4,
// };

// export default function LogoutModal({ modalOpen, handleOpen }) {
// 	const router = useRouter();
// 	// const [open, setOpen] = React.useState(false);
// 	// const handleOpen = () => setOpen(true);
// 	// const handleClose = () => setOpen(false);
// 	const handleLogout = async () => {
// 		const data = await signOut({ redirect: false, callbackUrl: '/' });
// 		router.push(data.url);
// 	};
// 	return (
// 		<div>
// 			{/* <Button onClick={handleOpen}>Open modal</Button> */}
// 			<Modal
// 				aria-labelledby='transition-modal-title'
// 				aria-describedby='transition-modal-description'
// 				open={modalOpen}
// 				onClose={() => handleOpen((preveState) => !preveState)}
// 				// onClose={handleClose}
// 				closeAfterTransition
// 				slots={{ backdrop: Backdrop }}
// 				slotProps={{
// 					backdrop: {
// 						timeout: 500,
// 					},
// 				}}
// 			>
// 				<Fade in={modalOpen}>
// 					<Box sx={style}>
// 						<div className='px-[20px]'>
// 							<p className='font-space font-[700] text-[24px] leading-[30.2px]  mb-[40px] text-black text-center'>
// 								Logout Account
// 							</p>

// 							<p className='mt-[25px] font-dmsans font-[600] text-[20px] leading-[20.2px] text-black text-center'>
// 								Are you sure you want to logout your account?
// 							</p>
// 							<div className='flex flex-col gap-y-[20px] gap-x-[60px] mt-[50px]'>
// 								<button
// 									type='submit'
// 									className=' py-[8px] px-[16px] rounded-lg bg-primaryPurple font-dmsans font-[500] text-[18px] text-white hover:bg-primaryYellow'
// 									onClick={() =>
// 										handleOpen((preveState) => !preveState)
// 									}
// 								>
// 									Don't logout
// 								</button>
// 								<button
// 									type='submit'
// 									className=' py-[8px] px-[16px] rounded-lg border border-primaryPurple hover:bg-primaryPurple font-dmsans font-[500] text-[18px] text-primaryPurple hover:text-white'
// 									onClick={() => {
// 										handleLogout();
// 										handleOpen(false);
// 									}}
// 								>
// 									Logout my account
// 								</button>
// 							</div>
// 						</div>
// 					</Box>
// 				</Fade>
// 			</Modal>
// 		</div>
// 	);
// }

import React from 'react';

const LogoutModal = () => {
	return <div>LogoutModal</div>;
};

export default LogoutModal;
