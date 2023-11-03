'use client';
import Athena from '@/components/AWSservice/Athena';
import QuickSight from '@/components/QuickSight';
import { useAccountContext } from '@/state/AccountState';
import Userpool from '@/state/Userpool';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
	const router = useRouter();
	const { authenticatedUser, getSession } = useAccountContext();
	const [user, setUser] = useState('');
	// useEffect(() => {
	// 	authenticatedUser()
	// 		.then((data) => {
	// 			console.log(data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err.message);
	// 		});
	// }, []);
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
		<>
			{/* <div className='my-5'>
				<p className='text-black font-600 text-xl text-center'>
					welcome back {user}
				</p>
			</div> */}
			<QuickSight />
		</>
	);
};

export default Dashboard;
