import Footer from '@/components/common/Footer';
import Nav from '@/components/common/Nav';
import LandingPage from '@/components/pages/LandingPage/LandingPage';
import Image from 'next/image';

export default function Home() {
	return (
		<>
			<Nav />

			<LandingPage />
			<Footer />
		</>
	);
}
