'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { AthenaClient, GetQueryResultsCommand } from '@aws-sdk/client-athena';
import TweetsTable from './Tables/TweetsTable';
import { useStateContext } from '@/state/AppContext';
import CustomChart from './common/CustomChart';
import CustomModal from './common/CustomModal';
import { FaWindowClose } from 'react-icons/fa';

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
const chartTypeList = [
	'bar', // Bar Chart
	'line', // Line Chart
	// 'scatter', // Scatter Plot
	'pie', // Pie Chart
	'doughnut', // Doughnut Chart
	'polarArea', // Polar Area Chart
	'radar',
];
const itemList = ['source', 'language'];
const TweetsInfo = () => {
	const [tweets, setTweets] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const tableData = useMemo(() => tweets, [tweets]);
	const { setFetchedTweets } = useStateContext();
	const [showChart, setShowChart] = useState(false);
	const [chartData, setChartData] = useState(null);
	const [chartType, setChartType] = useState('');
	const [itemAnalysing, setItemAnalysing] = useState('');
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
	const command = new GetQueryResultsCommand(input);
	useEffect(() => {
		const getData = async () => {
			const response = await athenaClient.send(command);
			console.log(response.ResultSet.ResultRows);
			setTweets(response.ResultSet.ResultRows);
			setFetchedTweets(response.ResultSet.ResultRows);
		};
		getData();
	}, []);

	const handleGenerateChart = () => {
		console.log('generating');
		// const titles = tweets[0].Data;

		// // Process the data rows starting from the second object in the array
		// const dataRows = tweets.slice(1);

		// // Find the index of the "views" column for population data
		// const populationTitle = 'views';
		// const populationIndex = titles.indexOf(populationTitle);

		// // Count the occurrences of each item (excluding "ID")
		// const occurrences = {};

		// dataRows.forEach((row) => {
		// 	row.Data.forEach((item, index) => {
		// 		if (titles[index] !== 'id') {
		// 			if (!occurrences[item]) {
		// 				occurrences[item] = 1;
		// 			} else {
		// 				occurrences[item]++;
		// 			}
		// 		}
		// 	});
		// });

		const titles = tweets[0].Data;

		// Process the data rows starting from the second object in the array
		const dataRows = tweets.slice(1);

		// Create an object to store occurrences for each property
		const propertyOccurrences = {};

		// console.log(itemAnalysing);
		dataRows.forEach((row) => {
			// For "source"
			const sourceIndex = titles.indexOf(itemAnalysing);
			const source = row.Data[sourceIndex];
			if (!propertyOccurrences[source]) {
				propertyOccurrences[source] = 1;
			} else {
				propertyOccurrences[source]++;
			}
		});

		const sourceChartData = {
			labels: Object.keys(propertyOccurrences),
			value: Object.values(propertyOccurrences),
		};
		console.log(sourceChartData);

		setChartData(sourceChartData);
		setOpenModal((preveState) => !preveState);
		setShowChart(true);
	};
	return (
		<div className='w-full'>
			{!showChart ? (
				<TweetsTable
					handleGenerateChart={() => setOpenModal(!openModal)}
					title={`Tweets Table`}
					casesData={tableData}
					columns={columns}
					redirectLink={''}
				/>
			) : (
				<div className='w-[90%] md:w-[60%] mx-auto flex flex-col justify-center items-center'>
					{' '}
					<button
						className='px-4 py-2 text-white bg-slate-800 rounded-xl my-4'
						onClick={() => setShowChart(false)}
					>
						Show Table
					</button>
					<p className='text-slate-800 text-center font-[500] text-xl my-2'>
						{itemAnalysing} Chart
					</p>
					<CustomChart
						chartData={chartData}
						chartType={chartType}
						chartLabel={itemAnalysing}
					/>
				</div>
			)}
			{/* <div className='mx-auto min-h-screen overflow-y-auto'> */}
			<CustomModal modalIsOpen={openModal} setIsOpen={setOpenModal}>
				<div className='px-[20px] w-full md:w-[70vw]'>
					<div className='flex justify-between items-center'>
						<p className='font-[600] text-[1.25rem] leading-[2.375rem] text-[#2E3646] text-center'>
							{/* Tweet Details */}
						</p>
						<FaWindowClose
							className='cursor-pointer'
							onClick={() =>
								setOpenModal((preveState) => !preveState)
							}
						/>
					</div>
					<div className='flex gap-6 flex-col w-full items-center justify-center'>
						<div className=''>
							<label
								htmlFor='analyse'
								className='mb-2 block text-black'
							>
								Select What to Analyse
							</label>
							<select
								id='analyse'
								value={itemAnalysing}
								onChange={(e) =>
									setItemAnalysing(e.target.value)
								}
								className='p-3 w-full md:w-[30rem] text-black'
							>
								<option value=''>Select What to Analyse</option>
								{itemList.map((list) => (
									<option key={list} value={list}>
										{list}{' '}
									</option>
								))}
							</select>
						</div>
						<div className=''>
							<label
								htmlFor='chartType'
								className='mb-2 block text-black'
							>
								Select Type of Chart you want
							</label>

							<select
								id='chartType'
								value={chartType}
								onChange={(e) => {
									setChartType(e.target.value);
								}}
								className='p-3 w-full md:w-[30rem] text-black'
							>
								<option value=''>Select Type of Chart</option>
								{chartTypeList.map((item, i) => (
									<option key={i} value={item}>
										{item}{' '}
									</option>
								))}
							</select>
						</div>
						<div className=''>
							<button
								className='bg-slate-800 text-slate-100 px-4 py-2 rounded-xl disabled:bg-slate-700 disabled:cursor-not-allowed'
								onClick={handleGenerateChart}
							>
								Generate Chart
							</button>
						</div>
					</div>
				</div>
			</CustomModal>
			{/* </div> */}
		</div>
	);
};

export default TweetsInfo;
