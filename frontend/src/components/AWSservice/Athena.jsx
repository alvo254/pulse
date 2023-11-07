'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
	AthenaClient,
	GetQueryResultsCommand,
	GetQueryExecutionCommand,
} from '@aws-sdk/client-athena';
import CustomTable from '../common/CustomTable';
import FullLoader from '../loaders/FullLoader';
import Typewriter from 'typewriter-effect';
import CustomModal from '../common/CustomModal';
import CustomChart from '../common/CustomChart';
import { FaWindowClose } from 'react-icons/fa';
// You can display these fun fac		ts randomly or sequentially in your React app.
const chartTypeList = [
	'bar', // Bar Chart
	'line', // Line Chart
	// 'scatter', // Scatter Plot
	'pie', // Pie Chart
	'doughnut', // Doughnut Chart
	'polarArea', // Polar Area Chart
	'radar',
];
// const itemList = ['source', 'language'];
const Athena = ({ QueryExecutionId, itemList }) => {
	const [tweets, setTweets] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [showChart, setShowChart] = useState(false);
	const [chartData, setChartData] = useState(null);
	const [chartType, setChartType] = useState('');
	const [itemAnalysing, setItemAnalysing] = useState('');
	const [isQueryExecutionComplete, setIsQueryExecutionComplete] =
		useState(false);

	const tableData = useMemo(() => tweets, [tweets]);

	const athenaClient = new AthenaClient({
		region: 'us-east-1',
		credentials: {
			accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
			secretAccessKey: process.env.NEXT_PUBLIC_SECRETE_KEY,
		},
	});
	// const input = {
	// 	QueryExecutionId: QueryExecutionId,
	// };
	// waitForAthenaQuery(QueryExecutionId, athenaClient);
	// const getResult = async () => {
	// 	const resultRows = await waitForAthenaQuery(
	// 		QueryExecutionId,
	// 		athenaClient
	// 	);
	// 	console.log(resultRows);
	// 	setTweets(resultRows);
	// };
	// if (QueryExecutionId) getResult();
	const getData = async () => {
		console.log('called');
		try {
			const response = await athenaClient.send(
				new GetQueryResultsCommand({
					QueryExecutionId: QueryExecutionId,
				})
			);
			// const command = new GetQueryResultsCommand(input);
			// const response = await athenaClient.send(command);
			console.log(response.ResultSet.ResultRows);
			if (response.ResultSet.ResultRows) {
				setTweets(response.ResultSet.ResultRows);
				setIsLoading(false);
			}
		} catch (error) {
			// console.log(error);
			if (
				error.name === 'InvalidRequestException' &&
				error.message ===
					'Query has not yet finished. Current state: RUNNING'
			) {
				// Retry the function later
				return new Promise((resolve) => {
					console.log('under');
					setTimeout(resolve, 1000);
				});
			} else {
				// Throw the error
				alert('Unable to handle request');
				throw error;
			}
		}
		// response.QueryExecution.Status.State;
	};

	// if (QueryExecutionId && tweets.length === 0) {
	// 	getQueryExecutionStatus(QueryExecutionId);
	// }
	// const getQueryExecutionStatus = async () => {
	// 	const response = await athenaClient.send(
	// 		new GetQueryExecutionCommand({
	// 			QueryExecutionId: QueryExecutionId,
	// 		})
	// 	);
	// 	console.log(response.QueryExecution.Status.State);
	// 	if (response.QueryExecution.Status.State === 'SUCCEEDED') {
	// 		console.log('query 2 succeed');
	// 		if (tweets.length === 0) getData();
	// 		setIsQueryExecutionComplete(true);
	// 	}

	// 	// setStatus(response.QueryExecution.Status.State);
	// };
	// getQueryExecutionStatus();
	const checkQueryStatusInterval = 1000; // Set your desired interval in milliseconds
	let intervalId = null; // Initialize the interval ID

	const startQueryStatusCheck = () => {
		// Start checking the query status at regular intervals
		intervalId = setInterval(() => {
			getQueryExecutionStatus();
		}, checkQueryStatusInterval);
	};

	const stopQueryStatusCheck = () => {
		// Stop checking the query status
		clearInterval(intervalId);
	};

	// Use useEffect to start and stop the status check
	useEffect(() => {
		// Start checking the query status when the component mounts
		startQueryStatusCheck();

		// Stop checking when the component unmounts or when the query status is 'SUCCEEDED'
		return () => {
			stopQueryStatusCheck();
		};
	}, []);

	const getQueryExecutionStatus = async () => {
		const response = await athenaClient.send(
			new GetQueryExecutionCommand({
				QueryExecutionId: QueryExecutionId,
			})
		);

		console.log(response.QueryExecution.Status.State);

		if (response.QueryExecution.Status.State === 'SUCCEEDED') {
			console.log('Query succeeded');
			// if (tweets.length === 0)
			getData();
			stopQueryStatusCheck(); // Stop checking when the query is successful
		}
	};

	const handleGenerateChart = () => {
		console.log('generating');
		const titles = tweets[0].Data;

		// Process the data rows starting from the second object in the array
		const dataRows = tweets.slice(1);

		// Create an object to store occurrences for each property
		const propertyOccurrences = {};

		// console.log(itemAnalysing);
		dataRows.forEach((row) => {
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
			{isLoading ? (
				// <div className='h-screen w-full flex items-center justify-center'>
				// 	<h1 className='text- text-slate-900 text-[27px] font-[500] leading-[40px] font-space h-[15rem] w-full md:w-[60%] text-center'>
				// 		<span className='mb-8 block text-center font-[800]'>
				// 			as your query is running, here are some fun fact you
				// 			need to know about Data Scientist.
				// 		</span>
				// 		<Typewriter
				// 			options={{
				// 				strings: [
				// 					"Data scientists are often referred to as 'data wizards' because they can turn raw data into valuable insights ✨🧙‍♂️",
				// 					"The term 'data science' was first coined in 1960, which means data scientists have been predicting trends since before it was cool 😎",
				// 					"Data scientists use a variety of programming languages, with Python being one of the most popular 🐍. Don't worry, no snakes are harmed in the process!",
				// 					'Data scientists are skilled in data visualization, making complex data understandable through charts and graphs. Basically, they turn boring numbers into Picasso masterpieces 📊🎨',
				// 					"The average salary of a data scientist is quite competitive, and they're basically the 'rockstars' of the tech world 🎸🤘",
				// 					'Data scientists work in various industries, from healthcare to finance to e-commerce, because data is everywhere, just like Wi-Fi signals 🌐',
				// 					'They often collaborate with machine learning engineers to build predictive models, because who better to predict the future than the dream team of data and machines? 🤖🔮',
				// 					"Data scientists use statistical analysis to uncover patterns and trends in data. It's like finding the hidden treasure in a sea of numbers! 🕵️‍♂️💰",
				// 					"Machine learning is a fundamental part of data science, helping to automate decision-making processes. They're the ones teaching computers to make decisions, just like a modern-day Yoda! 👾🧙‍♂️",
				// 					"Data scientists help companies make data-driven decisions, improving efficiency and competitiveness. They're the secret sauce behind successful businesses! 📈🚀",
				// 					"Data science is a multidisciplinary field, combining aspects of computer science, statistics, and domain expertise. They're the real 'Renaissance Men/Women' of the tech world! 🎨💻🔬",
				// 					"They are skilled in data cleaning and preprocessing, as data quality is crucial for accurate analysis. Think of them as the 'Data Launderers,' making sure data is squeaky clean before use! 🧽🧼",
				// 					'Data scientists often work with big data, handling massive datasets that require specialized tools and technologies. They deal with data so big, they need their own zip code! 🌐🏢',
				// 					"They are continually learning and adapting to stay up to date with the latest data science techniques. They're like perpetual students, but with better job prospects! 📚🎓💼",
				// 					"Data scientists have a strong focus on ethics and privacy, ensuring that data is used responsibly and securely. They're the 'Data Sheriffs' making sure the data behaves itself! 👮‍♂️🔒",
				// 				],
				// 				autoStart: true,
				// 				loop: true,
				// 			}}
				// 		/>
				// 	</h1>
				// </div>
				<FullLoader />
			) : (
				<div className='w-full'>
					{!showChart ? (
						<CustomTable
							handleGenerateChart={() => setOpenModal(!openModal)}
							title={`Query Result Table`}
							casesData={tableData}
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
							<p className='text-slate-800 text-center font-[700] text-xl my-2 uppercase '>
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
					<CustomModal
						modalIsOpen={openModal}
						setIsOpen={setOpenModal}
					>
						<div className='px-[20px] w-full md:w-[70vw]'>
							<div className='flex justify-between items-center'>
								<p className='font-[600] text-[1.25rem] leading-[2.375rem] text-[#2E3646] text-center'>
									{/* Tweet Details */}
								</p>
								<FaWindowClose
									className='cursor-pointer'
									onClick={() =>
										setOpenModal(
											(preveState) => !preveState
										)
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
										<option value=''>
											Select What to Analyse
										</option>
										const titles =
										{/* tweets[0].Data.map((title) => title); */}
										{/* {itemList.map((list, i) => (
											<option key={i} value={list.Name}>
												{list.Name}{' '}
											</option>
										))} */}
										{tweets[0].Data.map((list, i) => (
											<option key={i} value={list}>
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
										<option value=''>
											Select Type of Chart
										</option>
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
				// <CustomTable casesData={tableData} />
			)}
		</div>
	);
};

export default Athena;
