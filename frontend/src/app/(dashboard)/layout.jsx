// import { Inter } from 'next/font/google';
import DashboardLayout from '@/components/common/layout/Dashboard';
import { AppContextProvider } from '@/state/AppContext';

// const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
	return (
		<>
			{' '}
			<AppContextProvider>
				<DashboardLayout>{children}</DashboardLayout>
			</AppContextProvider>
		</>
	);
}
