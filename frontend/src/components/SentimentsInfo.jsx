'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
	AthenaClient,
	ListDataCatalogsCommand,
	GetDatabaseCommand,
	GetQueryExecutionCommand,
	GetQueryResultsCommand,
} from '@aws-sdk/client-athena';
import CustomTable from './common/CustomTable';
import SentimentTable from './Tables/SentimentsTable';

function formatDate(isoDate) {
	const dateObject = new Date(isoDate);

	const year = dateObject.getFullYear();
	const month = String(dateObject.getMonth() + 1).padStart(2, '0');
	const day = String(dateObject.getDate()).padStart(2, '0');

	return `${month}/${day}/${year}`;
}
export const columns = [
	{
		header: 'Author Username',
		accessorKey: 'authorusername',
	},
	{
		header: 'Tweet',
		accessorKey: 'is_quoted',
	},
	{
		header: 'Sentiment',
		accessorKey: 'views',
	},
	// {
	// 	header: 'Sentiment positive score',
	// 	accessorKey: 'likes',
	// },
	// {
	// 	header: 'Created Date',
	// 	accessorKey: 'created_on',
	// 	cell: (info) => formatDate(info.getValue()),
	// },
];

const Athena = () => {
	const [tweets, setTweets] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const tableData = useMemo(() => tweets, [tweets]);
	const athenaClient = new AthenaClient({
		region: 'us-east-1',
		credentials: {
			accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
			secretAccessKey: process.env.NEXT_PUBLIC_SECRETE_KEY,
		},
	});
	const input = {
		QueryExecutionId: 'ba26a3af-d6dc-4ea4-bde1-715be7971e09',
		// '1607fe2c-62aa-4657-9b64-b66b660976e2',
	};
	const command = new GetQueryResultsCommand(input);
	useEffect(() => {
		const getData = async () => {
			try {
				const response = await athenaClient.send(command);
				console.log(response.ResultSet.ResultRows);
				setTweets(response.ResultSet.ResultRows);
			} catch (error) {
				console.log(error);
			}
		};

		getData();
	}, []);
	return (
		<div>
			<SentimentTable
				title={`Tweets Table`}
				casesData={tableData}
				columns={columns}
				redirectLink={''}
			/>
		</div>
	);
};

export default Athena;
