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
		<div>
			<p>Dashboard</p>
			<button
				className='px-6 py-3 bg-slate-900 my-7 text-white'
				onClick={handleSignOut}
			>
				Signout
			</button>
		</div>
	);
};

export default Dashboard;
