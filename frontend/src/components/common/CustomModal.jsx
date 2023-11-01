'use client';
import React, { useState } from 'react';

import Modal from 'react-modal';
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		// border: '1px solid black',
		overflow: 'auto',
		overlay: { backgroundColor: 'green' },
		// zIndex: 40,
	},
	overlay: { zIndex: 1000 },
};
const CustomModal = ({ children, modalIsOpen, setIsOpen }) => {
	// const [modalIsOpen, setIsOpen] = useState(false);

	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={() => {
				setIsOpen(false);
			}}
			style={customStyles}
			ariaHideApp={false}
		>
			{children}
		</Modal>
	);
};

export default CustomModal;
