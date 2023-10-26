import DashboardLayout from '@/components/common/layout/Dashboard';
import { AppContextProvider } from '@/state/AppContext';

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<AppContextProvider>
					<DashboardLayout>{children}</DashboardLayout>
				</AppContextProvider>
			</body>
		</html>
	);
}
