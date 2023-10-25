import { HiOutlineUserGroup } from 'react-icons/hi';
import { AiFillHome } from 'react-icons/ai';
export const studentLinks = [
	{
		title: 'Dashboard',
		links: [
			{
				name: 'overview',
				icon: <AiFillHome />,
			},
		],
	},

	{
		title: 'Pages',
		links: [
			{
				name: 'task',
				icon: <HiOutlineUserGroup />,
			},
			{
				name: 'instructors',
				icon: <HiOutlineUserGroup />,
			},
			{
				name: 'modules',
				icon: <HiOutlineUserGroup />,
			},
			{
				name: 'schedule',
				icon: <HiOutlineUserGroup />,
			},
			{
				name: 'payments',
				icon: <HiOutlineUserGroup />,
			},
			{
				name: 'technical-support',
				icon: <HiOutlineUserGroup />,
			},
			{
				name: 'fAQs-and-tutorials',
				icon: <HiOutlineUserGroup />,
			},
		],
	},
];

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
				name: 'manage social medias',
				address: 'managestudents',
				icon: <HiOutlineUserGroup />,
			},
		],
	},
];
