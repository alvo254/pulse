'use client';
import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { emmetHTML } from 'emmet-monaco-es';
import {
	AthenaClient,
	StartQueryExecutionCommand,
	ListDataCatalogsCommand,
	ListDatabasesCommand,
	ListTableMetadataCommand,
	GetDatabaseCommand,
	GetQueryExecutionCommand,
	GetQueryResultsCommand,
} from '@aws-sdk/client-athena';
import Athena from './Athena';
import { useRouter } from 'next/navigation';
import { FaBullseye } from 'react-icons/fa';
import SqlEditor from '../common/SQLEditor';
// import Editor from '../common/Editor';

const QueryAthena = () => {
	const [DatabaseList, setDatabaseList] = useState([]);
	const [tableList, setTableList] = useState([]);
	const [database, setDatabase] = useState('');
	const [table, setTable] = useState('');
	const [code, setcode] = useState('-- Input Your query below. 👇');
	const [properties, setProperties] = useState([]);
	const [selectedColumn, setSelectedColumn] = useState([]);
	const [queryString, setQueryString] = useState('');
	const [queryExecutionId, setQueryExecutionId] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [status, setStatus] = useState('');

	const [editorValue, setEditorValue] = useState('');

	const editor = useRef(null);

	// useEffect(() => {
	// 	// Get the editor instance.
	// 	editor.current = editorRef.current;
	// }, []);

	const athenaClient = new AthenaClient({
		region: 'us-east-1',
		credentials: {
			accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
			secretAccessKey: process.env.NEXT_PUBLIC_SECRETE_KEY,
		},
	});
	const listDatabaseInput = {
		// ListDatabasesInput
		CatalogName: 'AwsDataCatalog', // required
		// NextToken: 'STRING_VALUE',
		// MaxResults: Number('int'),
	};
	const datbaseInput = {
		// ListDataCatalogsInput
		NextToken: 'STRING_VALUE',
		MaxResults: Number('int'),
	};
	const listTableinput = {
		// ListTableMetadataInput
		CatalogName: 'AwsDataCatalog', // required
		DatabaseName: database, // required
		// Expression: 'STRING_VALUE',
		// NextToken: 'STRING_VALUE',
		// MaxResults: Number('int'),
	};
	const listDatabaseCommand = new ListDatabasesCommand(listDatabaseInput);
	const listTablecommand = new ListTableMetadataCommand(listTableinput);
	// const databaseCommand = new GetDatabaseCommand(datbaseInput);
	useEffect(() => {
		const getData = async () => {
			const response = await athenaClient.send(listDatabaseCommand);
			setDatabaseList(response.DatabaseList);
		};
		getData();
	}, [database]);
	useEffect(() => {
		const getDatatable = async () => {
			const response = await athenaClient.send(listTablecommand);
			// console.log(response.TableMetadataList);
			setTableList(response.TableMetadataList);
		};
		if (database !== '') {
			getDatatable();
			if (table !== '') {
				setProperties(tableList[table].Columns);
				// setcode(
				// 	`-- Input Your query below. 👇
				// 	\n SELECT ${selectedColumn} \n FROM ${database}.${tableList[table].Name} \n`
				// );
				// console.log(tableList[table].Columns);
				setQueryString(`-- Input Your query below. 👇
					\n SELECT ${selectedColumn} \n FROM ${database}.${tableList[table].Name} \n`);
			}
		}
	}, [database, table]);

	const handleAdd = (item) => {
		// e.preventDefault()
		// setSelectedColumn((prevState) => [...prevState, item]);
		// setcode(`SELECT ${selectedColumn} \n FROM ${tableList[table].Name} \n`);
		setSelectedColumn((prevState) => {
			const updatedSelectedColumn = [...prevState, item];
			setcode(
				`SELECT ${updatedSelectedColumn} \n FROM ${database}.${tableList[table].Name} \n`
			);
			setQueryString(
				`SELECT ${updatedSelectedColumn} \n FROM ${database}.${tableList[table].Name} \n`
			);
			return updatedSelectedColumn;
		});
	};
	const handleEditorChange = (value, event) => {
		if (database === '') {
			alert('Select Dashboard');
			return;
		} else if (tableList.length < 1) {
			alert('Select Table');
			return;
		} else {
			setQueryString(value);
		}
	};
	console.log(queryString);
	const input = {
		// StartQueryExecutionInput
		QueryString: queryString, // required
		// ClientRequestToken: "STRING_VALUE",
		QueryExecutionContext: {
			// QueryExecutionContext
			Database: database,
			Catalog: 'AwsDataCatalog',
		},
		ResultConfiguration: {
			// ResultConfiguration
			OutputLocation: 's3://clientside-athena-query/',
			EncryptionConfiguration: {
				// EncryptionConfiguration
				EncryptionOption: 'SSE_S3', // required
				// KmsKey: 'STRING_VALUE',
			},
			// ExpectedBucketOwner: 'STRING_VALUE',
			AclConfiguration: {
				// AclConfiguration
				S3AclOption: 'BUCKET_OWNER_FULL_CONTROL', // required
			},
		},
		WorkGroup: 'primary',
	};
	const command = new StartQueryExecutionCommand(input);
	const getQueryExecutionStatus = async (QueryExecutionId) => {
		const response = await athenaClient.send(
			new GetQueryExecutionCommand({
				QueryExecutionId: QueryExecutionId,
			})
		);
		console.log(response.QueryExecution.Status.State);
		if (response.QueryExecution.Status.State !== 'SUCCEEDED') {
			console.log('query succeed');
			setIsLoading(false);
		}

		// setStatus(response.QueryExecution.Status.State);
	};
	const handleRunQuery = async () => {
		setIsLoading(true);
		setShowResult(true);
		try {
			const response = await athenaClient.send(command);
			// console.log(response);
			// return await new Promise((resolve, reject) => {

			if (response.$metadata.httpStatusCode === 200) {
				setQueryExecutionId(response.QueryExecutionId);
				getQueryExecutionStatus(response.QueryExecutionId);
				setIsSuccess(true);
				setIsLoading(false);

				// setIsLoading(false);
				// resolve(response.QueryExecutionId);
				// router.push(`/query-athena/${response.QueryExecutionId}`);
			}
		} catch (error) {
			// console.log(error);
			alert(error.message);
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

		// });
	};
	const reloadPage = () => {
		// window.location.reload();
		setProperties([]);
		setSelectedColumn([]);
		setQueryString('');
		setQueryExecutionId('');
		setShowResult(!showResult);
		setTableList([]);
		setTable('');
		setDatabaseList([]);
		setDatabase('');
		setIsSuccess(false);
		setIsLoading(false);
	};

	return (
		<div className='pb-6 flex flex-col gap-4 justify-center items-center w-full overflow-x-hidden'>
			{!showResult && (
				<div className='w-full flex flex-col gap-4 justify-center items-center'>
					<div className=''>
						<label
							htmlFor='database'
							className='mb-2 block text-black'
						>
							Select Database to Query
						</label>
						<select
							id='database'
							value={database}
							onChange={(e) => setDatabase(e.target.value)}
							className='p-3 w-full md:w-[30rem] text-black'
						>
							<option value=''>Select Database</option>
							{DatabaseList.map((list) => (
								<option key={list.Name} value={list.Name}>
									{list.Name}{' '}
								</option>
							))}
						</select>
					</div>
					<div className=''>
						<label
							htmlFor='tableList'
							className='mb-2 block text-black'
						>
							Select Table to Query
						</label>

						<select
							id='tableList'
							value={table}
							onChange={(e) => {
								setTable(e.target.value);
							}}
							className='p-3 w-full md:w-[30rem] text-black'
						>
							<option value=''>Select Table</option>
							{tableList.map((list, i) => (
								<option key={list.Name} value={i}>
									{list.Name}{' '}
								</option>
							))}
						</select>
					</div>
					<div className=''>
						{properties.length > 0 && (
							<p className='my-4 text-black font-[700] text-center'>
								Here are the list of properties you can use to
								query the selected table
							</p>
						)}
						<div className='flex justify-center gap-4 flex-wrap mt-5'>
							{properties.map((prop, i) => (
								<button
									key={i}
									className='bg-slate-800 text-slate-100 px-4 py-2 rounded-xl disabled:bg-slate-700 disabled:cursor-not-allowed'
									onClick={() => handleAdd(prop.Name)}
									disabled={
										selectedColumn.includes(prop.Name) ||
										selectedColumn.includes('*')
									}
								>
									{prop.Name}
								</button>
							))}
							{properties.length > 0 && (
								<button
									className='bg-slate-800 text-slate-100 px-4 py-2 rounded-xl disabled:bg-slate-700 disabled:cursor-not-allowed'
									onClick={() => handleAdd('*')}
									disabled={
										selectedColumn.includes('*') ||
										selectedColumn.length >= 1
									}
								>
									{'All (*)'}
								</button>
							)}
						</div>
					</div>
					<h1 className='text-center font-[600] text-[1rem]  text-slate-800 mb-4'>
						Run your SQL Query on our Athena to get your result{' '}
					</h1>
					{/* <Editor /> */}
					<div className='w-[90%]'>
						<Editor
							// height='100px'
							// width={200}
							className='min-h-[20rem] w-full'
							language='sql'
							theme='vs-dark'
							value={code}
							options={{
								inlineSuggest: true,
								fontSize: '16px',
								formatOnType: true,
								autoClosingBrackets: true,
								minimap: { scale: 10 },
							}}
							onChange={handleEditorChange}
							// beforeMount={handleEditorWillMount}
						/>
						{/* <SqlEditor onChange={handleEditorChange} /> */}
					</div>
					<div className=''>
						<button
							className='bg-slate-900 text-slate-100 px-4 py-2 rounded-xl disabled:bg-slate-700 disabled:cursor-not-allowed'
							onClick={() => {
								handleEditorChange(' ');
								handleRunQuery();
							}}
							disabled={isLoading || queryString === ''}
						>
							{isLoading ? 'Running Query' : 'Run Query'}
						</button>
					</div>
				</div>
			)}
			{isSuccess && (
				<div div className='my-5 w-full'>
					<div className=''>
						<button
							className='bg-slate-800 text-slate-100 px-4 py-2 rounded-xl disabled:bg-slate-700 disabled:cursor-not-allowed'
							onClick={() => {
								reloadPage();
							}}
						>
							Run a new Query
						</button>
					</div>
					<Athena
						QueryExecutionId={queryExecutionId}
						itemList={properties}
					/>
				</div>
			)}
			{isLoading && (
				<div className='fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center'>
					<h1 className='text-white text-[35px] md:text-[48px] font-[700] leading-[40px] md:leading-[58px] font-space h-[15rem] '>
						Loading...
					</h1>
				</div>
			)}
		</div>
	);
};

export default QueryAthena;
