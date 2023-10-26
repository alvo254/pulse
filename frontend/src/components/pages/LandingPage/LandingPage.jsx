import React from 'react';
import Header from './Header';
import Integration from './Integration';
import Audience from './Audience';

const LandingPage = () => {
	return (
		<div className='mt-8'>
			<Header />
			<Integration />
			<Audience />
		</div>
	);
};

export default LandingPage;
