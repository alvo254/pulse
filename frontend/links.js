import { HiOutlineUserGroup } from 'react-icons/hi';
import { AiFillHome } from 'react-icons/ai';
import { FiTwitter } from 'react-icons/fi';

export const links = [
	{
		title: 'Dashboard',
		links: [
			{
				name: 'overview',
				address: 'overview',
				icon: <AiFillHome />,
			},
		],
	},

	{
		title: 'Pages',
		links: [
			{
				name: 'Tweets',
				address: 'tweets',
				icon: <FiTwitter />,
			},
			{
				name: 'Tweets Sentiment',
				address: 'sentiments',
				icon: <FiTwitter />,
			},
		],
	},
];
