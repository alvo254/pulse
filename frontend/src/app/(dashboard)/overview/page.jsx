'use client';
import { useAccountContext } from '@/state/AccountState';
import Userpool from '@/state/Userpool';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
	const router = useRouter();
	const { getSession } = useAccountContext();
	const [user, setUser] = useState('');
	useEffect(() => {
		getSession()
			.then((session) => {
				// console.log(session);
				setUser(session.name);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [getSession]);
	return (
		<div className='flex justify-center items-center h-[50vh]'>
			<p className='text-black font-600 text-xl'>welcome back {user}</p>
			{/* <button
				className='px-6 py-3 bg-slate-900 my-7 text-white'
				onClick={handleSignOut}
			>
				Signout
			</button> */}
		</div>
	);
};

export default Dashboard;
