'use client';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';
import Cookies from 'js-cookie';

function QuickSight() {
	const dashboardRef = useRef([]);
	const dashboard1 = process.env.NEXT_PUBLIC_DASHBOARD_ID;
	const dashboard2 = process.env.NEXT_PUBLIC_SENTIMENT_DASHBOARD_ID;
	const [dashboardId, setDashboardId] = useState(dashboard1);
	const [title, setTitle] = useState('Counts of Records by Source Dashboard');
	// process.env.NEXT_PUBLIC_DASHBOARD_ID
	// );
	const [embeddedDashboard, setEmbeddedDashboard] = useState(null);
	const [dashboardUrl, setDashboardUrl] = useState(null);
	const [embeddingContext, setEmbeddingContext] = useState(null);

	const setCookie = () => {
		// Set the cookie with the "SameSite" attribute
		document.cookie = 'myCookie=cookieValue; secure; samesite=None';
	};

	// useEffect(() => {
	// 	setCookie();
	// 	// Cookies.set('myCookie', 'cookieValue', {
	// 	// 	sameSite: 'None',
	// 	// 	secure: true,
	// 	// });
	// }, []);

	// ' https://d4do0169j9.execute-api.us-east-1.amazonaws.com/embed'
	// useEffect(() => {
	// 	const timeout = setTimeout(() => {
	// 		fetch(
	// 			'https://d4do0169j9.execute-api.us-east-1.amazonaws.com/embed/anonymous-embed'
	// 		)
	// 			.then((response) => response.json())
	// 			.then((response) => {
	// 				setDashboardUrl(response.EmbedUrl);
	// 				// console.log(response.EmbedUrl);
	// 			});
	// 	}, 10);
	// 	return () => clearTimeout(timeout);
	// }, []);

	// const createContext = async () => {
	// 	const context = await createEmbeddingContext();
	// 	setEmbeddingContext(context);
	// };

	// useEffect(() => {
	// 	if (dashboardUrl) {
	// 		createContext();
	// 	}
	// }, [dashboardUrl]);

	// useEffect(() => {
	// 	if (embeddingContext) {
	// 		embed();
	// 	}
	// }, [embeddingContext]);

	// const embed = async () => {
	// 	const options = {
	// 		url: dashboardUrl,
	// 		container: dashboardRef.current,
	// 		// height: '500px',
	// 		// width: '600px',
	// 	};

	// 	const newEmbeddedDashboard = await embeddingContext.embedDashboard(
	// 		options
	// 	);
	// 	setEmbeddedDashboard(newEmbeddedDashboard);
	// };

	// useEffect(() => {
	// 	if (embeddedDashboard) {
	// 		embeddedDashboard.navigateToDashboard(dashboardId, {});
	// 	}
	// }, [dashboardId]);

	const changeDashboard = async (e) => {
		const dashboardId = e.target.value;
		if (e.target.value === dashboard1) {
			setTitle('Counts of Records by Source Dashboard');
		} else if (e.target.value === dashboard2) {
			setTitle('Counts of Records by Sentiments Dashboard');
		}
		setDashboardId(dashboardId);
	};

	return (
		<>
			<main className='w-full px-4 flex flex-col gap-4 items-center justify-center text-white h-[150vh]'>
				<p className='text-[2rem]'>
					Welcome to the QuickSight dashboard
				</p>
				<p className='text-[1.6rem]'>
					Please pick a dashboard you want to render
				</p>

				<select
					id='dashboard'
					value={dashboardId}
					onChange={changeDashboard}
					className='p-3 w-full md:w-[30rem] text-black'
				>
					<option value={dashboard1}>Records by Source </option>
					<option value={dashboard2}>Sentiment Dashboard</option>
				</select>
				<p className='text-[1rem] my-2'>{title}</p>
				{/* <div ref={dashboardRef} /> */}
				<iframe
					// width='800'
					// height='720'
					className='w-full md:w-[80%] px-6 h-[120%]'
					src={`https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/609806490186/dashboards/${dashboardId}?directory_alias=socialjar`}
				></iframe>
			</main>
		</>
	);
}

export default QuickSight;
