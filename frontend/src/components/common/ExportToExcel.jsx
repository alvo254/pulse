// ExportToExcel.js
import React from 'react';
import * as XLSX from 'xlsx';

function ExportToExcel({ data, fileName }) {
	// const exportDataToExcel = () => {
	// 	// Extract the column titles (assuming they are in the first object)
	// 	const titles = Object.keys(data[0]);

	// 	// Create an array of arrays to represent the Excel sheet
	// 	const excelData = [
	// 		titles,
	// 		...data.map((rowData) => titles.map((title) => rowData[title])),
	// 	];

	// 	// Create a new workbook
	// 	const wb = XLSX.utils.book_new();

	// 	// Create a worksheet
	// 	const ws = XLSX.utils.aoa_to_sheet(excelData);

	// 	// Add the worksheet to the workbook
	// 	XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

	// 	// Generate the Excel file as a binary string
	// 	const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

	// 	// Convert the binary string to a Blob
	// 	const blob = new Blob([s2ab(excelFile)], {
	// 		type: 'application/octet-stream',
	// 	});

	// 	// Create a download link and trigger the download
	// 	const url = window.URL.createObjectURL(blob);
	// 	const a = document.createElement('a');
	// 	a.href = url;
	// 	a.download = 'exported-data.xlsx';
	// 	a.click();
	// 	window.URL.revokeObjectURL(url);
	// };

	// const s2ab = (s) => {
	// 	const buf = new ArrayBuffer(s.length);
	// 	const view = new Uint8Array(buf);
	// 	for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
	// 	return buf;
	// };
	// const handleExport = () => {
	// 	// Extract the titles from the first object in the data array
	// 	const titles = data[0].Data;

	// 	// Process the data rows starting from the second object in the array
	// 	const dataRows = data.slice(1);

	// 	// Transform the data into an array of arrays
	// 	const excelData = [
	// 		titles,
	// 		...dataRows.map((obj) => Object.values(obj)),
	// 	];

	// 	// Create a worksheet
	// 	const ws = XLSX.utils.aoa_to_sheet(excelData);
	// 	const wb = XLSX.utils.book_new();
	// 	XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

	// 	// Export the workbook to an Excel file
	// 	XLSX.writeFile(wb, fileName || 'exportedData.xlsx');
	// };

	const handleExport = () => {
		if (data.length < 2) {
			return; // Ensure there is enough data for export
		}

		const dataRows = data.slice(1); // Extract rows data (skip the first element with titles)
		const titles = data[0].Data; // Titles from the first element

		// Create an array to represent the Excel sheet
		const excelData = [titles, ...dataRows.map((row) => row.Data)];

		// Create a worksheet
		const ws = XLSX.utils.aoa_to_sheet(excelData);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		// Export the workbook to an Excel file
		XLSX.writeFile(wb, fileName || 'exportedData.xlsx');
	};

	return (
		<div>
			{/* <TableExportToExcel data={data} /> */}
			<button
				className='px-4 py-2 bg-white text-slate-900 rounded-lg'
				onClick={handleExport}
			>
				Export to Excel
			</button>
		</div>
	);
}

export default ExportToExcel;
