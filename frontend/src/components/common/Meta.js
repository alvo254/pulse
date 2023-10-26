import Head from 'next/head';

const Meta = ({ title, description, keywords }) => {
	return (
		<Head>
			<title>{title ? title : 'Data Scientist App'}</title>
			<meta name='description' content={description ? description : ''} />
			<meta name='keywords' content={keywords ? keywords : ''} />
			<meta
				name='viewport'
				content='width=device-width, initial-scale=1'
			/>
			<link rel='icon' href='/images/logo.png' />
		</Head>
	);
};

export default Meta;
