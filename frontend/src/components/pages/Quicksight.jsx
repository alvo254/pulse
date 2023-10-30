// import React from 'react';

// const Quicksight = () => {
// 	return (
// 		<div>
// 			<iframe
// 				width='960'
// 				height='720'
// 				src={`https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/609806490186/dashboards/${process.env.NEXT_PUBLIC_DASHBOARD_ID}?directory_alias=socialjar`}
// 			></iframe>
// 			; //
// 		</div>
// 	);
// };

// export default Quicksight;

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';

function App() {
	const dashboardRef = useRef([]);
	const [dashboardId, setDashboardId] = useState(
		process.env.NEXT_PUBLIC_DASHBOARD_ID
	);
	const [embeddedDashboard, setEmbeddedDashboard] = useState(null);
	const [dashboardUrl, setDashboardUrl] = useState(null);
	const [embeddingContext, setEmbeddingContext] = useState(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			fetch('YOUR_API_GATEWAY_INVOKE_URL/RESOURCE_NAME')
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
			<header>
				<h1>
					Embedded <i>QuickSight</i>: Build Powerful Dashboards in
					React
				</h1>
			</header>
			<main>
				<p>Welcome to the QuickSight dashboard embedding sample page</p>
				<p>Please pick a dashboard you want to render</p>
				<select
					id='dashboard'
					value={dashboardId}
					onChange={changeDashboard}
				>
					<option value={dashboardId}>YOUR_DASHBOARD1_NAME</option>
					<option value='YOUR_DASHBOARD2_ID'>
						YOUR_DASHBOARD2_NAME
					</option>
				</select>
				<div ref={dashboardRef} />
			</main>
		</>
	);
}

export default App;
