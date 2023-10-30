'use client';
import Quicksight from '@/components/pages/Quicksight';
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
			<Quicksight />
		</div>
	);
};

export default Dashboard;
