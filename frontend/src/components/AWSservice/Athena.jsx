'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
	AthenaClient,
	ListDataCatalogsCommand,
	GetDatabaseCommand,
	GetQueryExecutionCommand,
	GetQueryResultsCommand,
} from '@aws-sdk/client-athena';
import CustomTable from '../common/CustomTable';
import CustomModal from '../common/CustomModal';

function formatDate(isoDate) {
	const dateObject = new Date(isoDate);

	const year = dateObject.getFullYear();
	const month = String(dateObject.getMonth() + 1).padStart(2, '0');
	const day = String(dateObject.getDate()).padStart(2, '0');

	return `${month}/${day}/${year}`;
}
export const columns = [
	{
		header: 'Tweet',
		accessorKey: 'tweet_body',
	},
	{
		header: 'Source',
		accessorKey: 'is_quoted',
	},
	{
		header: 'No. of Views',
		accessorKey: 'views',
	},
	{
		header: 'Likes',
		accessorKey: 'likes',
	},
	{
		header: 'Created Date',
		accessorKey: 'created_on',
		cell: (info) => formatDate(info.getValue()),
	},
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
		QueryExecutionId: '012fd5b9-8f37-4c65-bd1d-10adde4a1d9f',
	};
	const sentiment = {
		QueryExecutionId: '683ad98b-64ca-4e79-8fd0-1fdebb22798f',
		// '1607fe2c-62aa-4657-9b64-b66b660976e2',
	};
	const command = new GetQueryResultsCommand(input);
	useEffect(() => {
		const getData = async () => {
			const response = await athenaClient.send(command);
			console.log(response.ResultSet.ResultRows);
			setTweets(response.ResultSet.ResultRows);
		};
		getData();
	}, []);
	return (
		<div>
			<CustomTable
				title={`Tweets Table`}
				casesData={tableData}
				columns={columns}
				redirectLink={''}
			/>
		</div>
	);
};

export default Athena;
