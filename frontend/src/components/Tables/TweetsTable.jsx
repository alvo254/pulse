'use client';
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useState, useMemo } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import CustomModal from '../common/CustomModal';
function limitStringLength(inputString, maxLength) {
	if (inputString.length <= maxLength) {
		return inputString; // Return the original string if it's shorter than or equal to the maximum length.
	} else {
		// If the string is longer, truncate it and add an ellipsis (...) at the end to indicate truncation.
		return inputString.substring(0, maxLength) + '...';
	}
}
const SearchComponent = ({ onFilter, filterText }) => (
	<div className='dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white flex w-4/5 md:w-[325px] h-[42px] py-[0.375rem] px-[0.75rem] items-center border border-[#D1D5DB] bg-[#F9FAFB] rounded-lg mb-[16px] mt-[1rem] text-black'>
		<FiSearch className='text-black' />
		<input
			type='text'
			className='p-2 bg-transparent outline-none w-[90%] text-black'
			placeholder='Search'
			onChange={onFilter}
			name={filterText}
			value={filterText}
		/>
	</div>
);
export default function TweetsTable({
	casesData,
	columns,
	handleGenerateChart,
	title,
	area,
}) {
	const [sorting, setSorting] = useState([]);
	const [filtering, setFiltering] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const [singleTweet, setSingleTweet] = useState([]);

	const data = useMemo(() => casesData, [casesData]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting: sorting,
			globalFilter: filtering,
		},
		onSortingChange: setSorting,
		onGlobalFilterChange: setFiltering,
	});

	const handleClick = (row) => {
		// redirectLink && router.push(redirectLink + row.original._id);
		console.log(row);
		setSingleTweet(row);
		setOpenModal(true);
	};
	return (
		<div className='dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white overflow-x-auto shadow'>
			<div
				className={` ${
					!area && 'pt-[90px] md:pt-[46px]'
				} mx-[15px] md:mx `}
			>
				<h2 className='font-[600] text-[1.6rem] leading-normal mb-[1.5rem] text-[#272D37]'>
					{title}
				</h2>
				{/* <input
				type='text'
				value={filtering}
				onChange={(e) => setFiltering(e.target.value)}
			/> */}
				<div className='min-w-full overflow-x-auto flex justify-between items-center gap-x-[1.12rem] bg-slate-800 pt-[0.3rem] px-[1.69rem] rounded-t-xl'>
					{/* <div className='bg-white p-[0.5rem]'>
							<FiFilter className='w-[2.5rem] h-[1.7rem] rounded' />
						</div> */}
					<SearchComponent
						onFilter={(e) => setFiltering(e.target.value)}
						filterText={filtering}
					/>
					<button
						onClick={handleGenerateChart}
						className='px-4 py-2 rounded-lg bg-white text-slate-900'
					>
						Generate Chart
					</button>
				</div>
				<table className='min-w-full overflow-x-auto'>
					<thead className={'bg-slate-800 text-white py-12'}>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<th
											key={header.id}
											className='p-[1rem] text-left text-xs font-medium uppercase tracking-wider'
											onClick={header.column.getToggleSortingHandler()}
										>
											{header.isPlaceholder ? null : (
												<div className='text-white'>
													{flexRender(
														header.column.columnDef
															.header,
														header.getContext()
													)}
													{
														{
															asc: '🔼',
															desc: '🔽',
														}[
															header.column.getIsSorted() ??
																null
														]
													}
												</div>
											)}
										</th>
									);
								})}
							</tr>
						))}
					</thead>

					<tbody>
						{table
							.getRowModel()
							.rows.slice(1)
							.map((row, index) => {
								// console.log(row);
								// console.log(row.getVisibleCells());
								return (
									<tr
										key={row.id}
										onClick={() =>
											handleClick(row.original.Data)
										}
										className={
											index % 2 !== 0
												? 'bg-[#F1F3F9] hover:bg-gray-200 cursor-pointer text-black'
												: 'bg-white hover:bg-gray-200 cursor-pointer text-black'
										}
									>
										<td
											// key={cell.id}
											className='p-[1rem] whitespace-wrap '
										>
											{limitStringLength(
												row.original.Data[3],
												55
											)}
										</td>
										<td
											// key={cell.id}
											className='p-[1rem] whitespace-nowrap '
										>
											{row.original.Data[14]}
										</td>
										<td
											// key={cell.id}
											className='p-[1rem] whitespace-nowrap '
										>
											{row.original.Data[10]}
										</td>
										<td
											// key={cell.id}
											className='p-[1rem] whitespace-nowrap '
										>
											{row.original.Data[12]}
										</td>
										<td
											// key={cell.id}
											className='p-[1rem] whitespace-nowrap '
										>
											{row.original.Data[1]}
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>

				<div className='mt-[2rem] text-black'>
					{data.length > 10 && (
						<div className='overflow-x-scroll w-full flex flex-col md:flex-row justify-between items-center pr-2 md:pr-[initial]'>
							<div className=''>
								<span className='flex items-center gap-1'>
									<div>Page</div>
									<strong>
										{table.getState().pagination.pageIndex +
											1}{' '}
										of {table.getPageCount()}
									</strong>
								</span>
							</div>
							<div className='flex items-center gap-2'>
								<button
									className='border rounded px-2 py-1'
									onClick={() => table.setPageIndex(0)}
									disabled={!table.getCanPreviousPage()}
									title='go to the first page'
								>
									{'<<'}
								</button>
								<button
									className='border rounded px-2 py-1'
									onClick={() => table.previousPage()}
									disabled={!table.getCanPreviousPage()}
									title='go to the previous page'
								>
									{'<'}
								</button>
								<button
									className='border rounded px-2 py-1'
									onClick={() => table.nextPage()}
									disabled={!table.getCanNextPage()}
									title='go to the next page'
								>
									{'>'}
								</button>
								<button
									className='border rounded px-2 py-1'
									onClick={() =>
										table.setPageIndex(
											table.getPageCount() - 1
										)
									}
									disabled={!table.getCanNextPage()}
									title='go to the last page'
								>
									{'>>'}
								</button>

								{/* <span className='flex items-center gap-1'>
									| Go to page:
									<input
										type='number'
										defaultValue={
											table.getState().pagination
												.pageIndex + 1
										}
										onChange={(e) => {
											const page = e.target.value
												? Number(e.target.value) - 1
												: 0;
											table.setPageIndex(page);
										}}
										className='border p-1 rounded w-16'
									/>
								</span> */}
								<select
									value={table.getState().pagination.pageSize}
									onChange={(e) => {
										table.setPageSize(
											Number(e.target.value)
										);
									}}
									className='p-1'
								>
									{[10, 20, 30, 40, 50].map((pageSize) => (
										<option key={pageSize} value={pageSize}>
											Show {pageSize}
										</option>
									))}
								</select>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className='w-[80vw] mx-auto min-h-screen overflow-y-auto'>
				<CustomModal modalIsOpen={openModal} setIsOpen={setOpenModal}>
					<div className='px-[20px] w-full md:w-[70vw]'>
						<div className='flex justify-between items-center'>
							<p className='font-[600] text-[1.25rem] leading-[2.375rem] text-[#2E3646] text-center'>
								Tweet Details
							</p>
							<FaWindowClose
								className='cursor-pointer'
								onClick={() =>
									setOpenModal((preveState) => !preveState)
								}
							/>
						</div>
						<div className='flex gap-x-4 mb-3 flex-col md:flex-row'>
							<p className='md:my-[1rem] font-[600] text-[0.875rem] leading-[1.5rem] text-slate-900 text-center'>
								Tweet:
							</p>
							<p className='md:my-[1rem] font-[400] text-[0.875rem] leading-[1.5rem] text-[#5F6D7E] text-center'>
								{singleTweet[3]}
							</p>
						</div>
						<div className='flex gap-x-4 mb-3 flex-col md:flex-row'>
							<p className='md:my-[1rem] font-[600] text-[0.875rem] leading-[1.5rem] text-slate-900 text-center'>
								Date Tweeted:
							</p>
							<p className='md:my-[1rem] font-[400] text-[0.875rem] leading-[1.5rem] text-[#5F6D7E] text-center'>
								{singleTweet[1]}
							</p>
						</div>
						<div className='flex gap-x-4 mb-3 flex-col md:flex-row'>
							<p className='md:my-[1rem] font-[600] text-[0.875rem] leading-[1.5rem] text-slate-900 text-center'>
								Tweet Source:
							</p>
							<p className='md:my-[1rem] font-[400] text-[0.875rem] leading-[1.5rem] text-[#5F6D7E] text-center'>
								{singleTweet[14]}
							</p>
						</div>
						<div className='flex gap-6'>
							<div className='flex gap-x-4 mb-3 flex-col md:flex-row'>
								<p className='md:my-[1rem] font-[600] text-[0.875rem] leading-[1.5rem] text-slate-900 text-center'>
									No. of Views:
								</p>
								<p className='md:my-[1rem] font-[400] text-[0.875rem] leading-[1.5rem] text-[#5F6D7E] text-center'>
									{singleTweet[10]}
								</p>
							</div>
							<div className='flex gap-x-4 mb-3 flex-col md:flex-row'>
								<p className='md:my-[1rem] font-[600] text-[0.875rem] leading-[1.5rem] text-slate-900 text-center'>
									Time retweeted:
								</p>
								<p className='md:my-[1rem] font-[400] text-[0.875rem] leading-[1.5rem] text-[#5F6D7E] text-center'>
									{singleTweet[2]}
								</p>
							</div>
						</div>
						<div className='flex gap-6'>
							<div className='flex gap-x-4 mb-3 flex-col md:flex-row'>
								<p className='md:my-[1rem] font-[600] text-[0.875rem] leading-[1.5rem] text-slate-900 text-center'>
									No. of Bookmarks:
								</p>
								<p className='md:my-[1rem] font-[400] text-[0.875rem] leading-[1.5rem] text-[#5F6D7E] text-center'>
									{singleTweet[9]}
								</p>
							</div>
							<div className='flex gap-x-4 mb-3 flex-col md:flex-row'>
								<p className='md:my-[1rem] font-[600] text-[0.875rem] leading-[1.5rem] text-slate-900 text-center'>
									No. of Likes:
								</p>
								<p className='md:my-[1rem] font-[400] text-[0.875rem] leading-[1.5rem] text-[#5F6D7E] text-center'>
									{singleTweet[12]}
								</p>
							</div>
						</div>
					</div>
				</CustomModal>
			</div>
		</div>
	);
}
