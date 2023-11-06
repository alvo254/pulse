import React, { useState } from 'react';
// import Amplify from 'aws-amplify';

// Configure AWS Amplify with your AWS credentials and region
// Amplify.configure({
// 	Auth: {
// 		identityPoolId: process.env.NEXT_PUBLIC_POOL_ID,
// 		region: 'us-east-1', // Your AWS region
// 	},
// 	// Add other configurations as needed for AWS services
// });
// Amplify.

function Athena() {
	const [queryResult, setQueryResult] = useState('');

	// const executeAthenaQuery = async () => {
	// 	try {
	// 		const query = 'SELECT * FROM analysed_tweets.entities;'; // Your SQL query
	// 		const response = await fetch(
	// 			'https://athena.us-east-1.amazonaws.com',
	// 			{
	// 				method: 'POST',
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 					'x-api-key': 'YOUR_API_KEY', // If using API key authentication
	// 				},
	// 				body: JSON.stringify({ queryString: query }),
	// 			}
	// 		);
	// 		const data = await response.json();
	// 		console.log(data);
	// 		setQueryResult(JSON.stringify(data, null, 2));
	// 	} catch (error) {
	// 		console.error('Error executing Athena query:', error);
	// 	}
	// };

	return (
		<div>
			<h1>Amazon Athena Query Tool</h1>
			{/* <button onClick={executeAthenaQuery}>Execute Query</button> */}
			{/* <pre>{queryResult}</pre> */}
		</div>
	);
}

export default Athena;
