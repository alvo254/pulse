// import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/components/common/Nav';
import Footer from '@/components/common/Footer';
import AccountStateProvider from '@/state/AccountState';
import { AppContextProvider } from '@/state/AppContext';

export const metadata = {
	title: 'Cecure Intelligence Limited | Data Science Platform Project',
	description:
		'A Solution for Accessing, Analyzing, and Processing Social Media Data',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				{/* <script src='https://unpkg.com/monaco-editor@0.33.1/min/vs/loader.js'></script> */}
			</head>

			<body>
				<AccountStateProvider>
					<AppContextProvider>
						{/* <Nav /> */}
						{children}
					</AppContextProvider>
					{/* <Footer /> */}
				</AccountStateProvider>
			</body>
		</html>
	);
}
