'use client';
import { useAccountContext } from '@/state/AccountState';
import Userpool from '@/state/Userpool';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Dashboard = () => {
	const router = useRouter();
	const { authenticatedUser } = useAccountContext();
	// useEffect(() => {
	// 	authenticatedUser()
	// 		.then((data) => {
	// 			console.log(data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err.message);
	// 		});
	// }, []);
	const handleSignOut = (e) => {
		e.preventDefault();
		const user = Userpool.getCurrentUser();
		user.signOut();
		localStorage.removeItem('user');
		router.push('/');
	};
	return (
		<>
			<div className='my-5'>
				<p className='text-black font-600 text-xl text-center'>
					welcome back {user}
				</p>
			</div>
			<Quicksight />
		</>
	);
};

export default Dashboard;
