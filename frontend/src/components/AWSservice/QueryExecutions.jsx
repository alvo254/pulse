'use client';
import React, { useState, useEffect } from 'react';
import {
	ListQueryExecutionsCommand,
	GetQueryExecutionCommand,
	AthenaClient,
} from '@aws-sdk/client-athena'; // Import the AWS SDK for Athena
// import { Button } from 'tailwindcss/Button'; // Example of a button library

const QueryExecutions = () => {
	const [queryExecutions, setQueryExecutions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [executionDetails, setExecutionDetails] = useState({});
	const [selectedExecutionId, setSelectedExecutionId] = useState(null);
	const athenaClient = new AthenaClient({
		region: 'us-east-1',
		credentials: {
			accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
			secretAccessKey: process.env.NEXT_PUBLIC_SECRETE_KEY,
		},
	});
	const s3BucketName = 's3://clientside-athena-query/';
	// const fetchQueryExecutions = async () => {
	// 	setIsLoading(true);
	// 	try {
	// 		// Fetch the list of query executions using the AWS SDK
	// 		const data = await athenaClient.send(
	// 			new ListQueryExecutionsCommand({})
	// 		);
	// 		setQueryExecutions(data.QueryExecutionIds || []);
	// 	} catch (error) {
	// 		console.error('Error fetching query executions:', error);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };
	const fetchQueryExecutions = async () => {
		setIsLoading(true);
		try {
			// Fetch the list of query executions using the AWS SDK
			const data = await athenaClient.send(
				new ListQueryExecutionsCommand({})
			);
			// Filter query executions to include only those related to the specific S3 bucket
			const filteredExecutions = data.QueryExecutionIds.filter(
				(executionId) => {
					return (
						executionDetails[executionId] &&
						executionDetails[executionId].ResultConfiguration &&
						executionDetails[
							executionId
						].ResultConfiguration.OutputLocation.includes(
							s3BucketName
						)
					);
				}
			);
			setQueryExecutions(filteredExecutions);
		} catch (error) {
			console.error('Error fetching query executions:', error);
		} finally {
			setIsLoading(false);
		}
	};
	const fetchExecutionDetails = async (executionId) => {
		try {
			// Fetch details for a specific query execution
			const data = await athenaClient.send(
				new GetQueryExecutionCommand({ QueryExecutionId: executionId })
			);
			setExecutionDetails({ ...executionDetails, [executionId]: data });
		} catch (error) {
			console.error('Error fetching execution details:', error);
		}
	};

	const handleRowClick = (executionId) => {
		setSelectedExecutionId(executionId);
		if (!executionDetails[executionId]) {
			fetchExecutionDetails(executionId);
		}
	};

	useEffect(() => {
		// Fetch the list of query executions when the component mounts
		fetchQueryExecutions();
	}, []);

	return (
		<div className='container mx-auto px-4 text-black'>
			<h1 className='text-2xl font-bold my-4'>
				List of Query Executions
			</h1>
			<button
				onClick={fetchQueryExecutions}
				disabled={isLoading}
				className='mb-4 px-4 py-2 text-white bg-slate-900'
			>
				{isLoading ? 'Fetching...' : 'Refresh Data'}
			</button>
			<table className='table-auto w-full border'>
				<thead>
					<tr className='bg-gray-200'>
						<th className='border p-2'>Query Execution ID</th>
						<th className='border p-2'>State</th>
						<th className='border p-2'>Query Execution Time</th>
					</tr>
				</thead>
				<tbody>
					{queryExecutions.map((executionId) => (
						<tr
							key={executionId}
							onClick={() => handleRowClick(executionId)}
							className={
								executionId === selectedExecutionId
									? 'bg-blue-200'
									: 'bg-white'
							}
						>
							<td className='border p-2'>{executionId}</td>
							<td className='border p-2'>
								{executionDetails[executionId]
									? executionDetails[executionId].Status.State
									: 'Loading...'}
							</td>
							<td className='border p-2'>
								{executionDetails[executionId]
									? executionDetails[executionId].Statistics
											.EngineExecutionTimeInMillis
									: 'Loading...'}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default QueryExecutions;
