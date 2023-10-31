'use client';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';

function QuickSight() {
	const dashboardRef = useRef([]);
	const [dashboardId, setDashboardId] = useState(
		'94994ce7-2894-43d0-aa17-0561083a73b6'
	);
	// process.env.NEXT_PUBLIC_DASHBOARD_ID
	// );
	const [embeddedDashboard, setEmbeddedDashboard] = useState(null);
	const [dashboardUrl, setDashboardUrl] = useState(null);
	const [embeddingContext, setEmbeddingContext] = useState(null);

	// ' https://d4do0169j9.execute-api.us-east-1.amazonaws.com/embed'
	useEffect(() => {
		const timeout = setTimeout(() => {
			fetch(
				'https://d4do0169j9.execute-api.us-east-1.amazonaws.com/embed/anonymous-embed'
			)
				.then((response) => response.json())
				.then((response) => {
					setDashboardUrl(response.EmbedUrl);
				});
		}, 10);
		return () => clearTimeout(timeout);
	}, []);

	const createContext = async () => {
		const context = await createEmbeddingContext();
		setEmbeddingContext(context);
	};

	useEffect(() => {
		if (dashboardUrl) {
			createContext();
		}
	}, [dashboardUrl]);

	useEffect(() => {
		if (embeddingContext) {
			embed();
		}
	}, [embeddingContext]);

	const embed = async () => {
		const options = {
			url: dashboardUrl,
			container: dashboardRef.current,
			height: '500px',
			width: '600px',
		};

		const newEmbeddedDashboard = await embeddingContext.embedDashboard(
			options
		);
		setEmbeddedDashboard(newEmbeddedDashboard);
	};

	useEffect(() => {
		if (embeddedDashboard) {
			embeddedDashboard.navigateToDashboard(dashboardId, {});
		}
	}, [dashboardId]);

	const changeDashboard = async (e) => {
		const dashboardId = e.target.value;
		setDashboardId(dashboardId);
	};

	return (
		<>
			<main className='text-slate-900 flex flex-col gap-4 items-center justify-center w-full'>
				<p>Welcome to the QuickSight dashboard embedding sample page</p>
				<p>Please pick a dashboard you want to render</p>
				<select
					id='dashboard'
					value={dashboardId}
					onChange={changeDashboard}
				>
					<option value={dashboardId}>YOUR_DASHBOARD1_NAME</option>
					<option value={process.env.NEXT_PUBLIC_DASHBOARD_ID2}>
						YOUR_DASHBOARD2_NAME
					</option>
				</select>
				<div ref={dashboardRef} />
			</main>

			{/* <div> */}
			{/* <iframe
					width='960'
					height='720'
					src={`https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/609806490186/dashboards/${process.env.NEXT_PUBLIC_DASHBOARD_ID}?directory_alias=socialjar`}
				></iframe> */}

			{/* <iframe
					width='960'
					height='720'
					src='https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/609806490186/dashboards/94994ce7-2894-43d0-aa17-0561083a73b6?directory_alias=socialjar'
				></iframe> */}
			{/* </div> */}
		</>
	);
}

export default QuickSight;
