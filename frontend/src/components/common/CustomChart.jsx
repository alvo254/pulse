import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ chartData, chartType, chartLabel }) => {
	// Ref for the canvas element
	const chartRef = React.useRef(null);

	useEffect(() => {
		if (chartData && chartData.labels.length > 0) {
			// Create the chart
			// Function to generate random colors
			const generateRandomColors = (numColors) => {
				const colors = [];
				for (let i = 0; i < numColors; i++) {
					const color = `rgba(${Math.floor(
						Math.random() * 256
					)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
						Math.random() * 256
					)}, .8)`;
					colors.push(color);
				}
				return colors;
			};
			const myChart = new Chart(chartRef.current, {
				type: chartType ? chartType : 'bar', // You can customize the chart type here
				data: {
					labels: chartData.labels,
					datasets: [
						chartType == 'doughnut'
							? {
									label: chartLabel,
									data: chartData.value,
									backgroundColor: generateRandomColors(
										chartData.labels.length
									), // Generate random colors,
									// borderColor: generateRandomColors(
									// 	chartData.labels.length
									// ), // Generate random colors
									// borderWidth: 1,
							  }
							: {
									label: chartLabel,
									data: chartData.value,
									backgroundColor: generateRandomColors(
										chartData.labels.length
									), // Generate random colors,
									borderColor: generateRandomColors(
										chartData.labels.length
									), // Generate random colors
									borderWidth: 1,
							  },
					],
					// datasets: [
					// 	{
					// 		label: 'Occurrences',
					// 		data: chartData.value,
					// 		// backgroundColor: 'rgba(54, 162, 235, 0.6)', // Example color
					// 		backgroundColor: generateRandomColors(
					// 			chartData.labels.length
					// 		),
					// 		borderColor: 'rgba(54, 162, 235, 1)', // Example color
					// 		borderWidth: 1,
					// 	},
					// ],
				},
				options: {
					scales: {
						y: {
							beginAtZero: true,
							maxTicks: 5,
						},
					},
				},
			});

			// Cleanup on unmount
			return () => {
				myChart.destroy();
			};
		}
	}, [chartData, chartType]);

	return <canvas ref={chartRef} />;
};

export default ChartComponent;
