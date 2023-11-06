import React, { useState } from 'react';
import AWS from 'aws-sdk';
import AthenaExpress from 'athena-express';

AWS.config.update({
	accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
	secretAccessKey: process.env.NEXT_PUBLIC_SECRETE_KEY,
	region: 'us-east-1', // Set your region
});

const athenaExpress = new AthenaExpress({ aws: AWS });

function Athena() {
	const [queryResult, setQueryResult] = useState('');

	const executeAthenaQuery = async () => {
		try {
			const query = 'SELECT * FROM analysed_tweets.entities;'; // Your SQL query
			const results = await athenaExpress.query(query);
			// setQueryResult(JSON.stringify(results, null, 2));
			console.log(JSON.stringify(results, null, 2));
		} catch (error) {
			console.error('Error executing Athena query:', error);
		}
	};

	return (
		<div>
			<h1>Amazon Athena Query Tool</h1>
			<button onClick={executeAthenaQuery}>Execute Query</button>
			<pre>{queryResult}</pre>
		</div>
	);
}

export default Athena;
