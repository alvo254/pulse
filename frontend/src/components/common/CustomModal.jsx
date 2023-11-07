'use client';
import React, { useState } from 'react';

import Modal from 'react-modal';
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		position: 'fixed',
		// top: 0,
		// left: 0,
		// right: 0,
		// bottom: 0,
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		// border: '1px solid black',
		// overflow: 'auto',
		overlay: { backgroundColor: 'green' },
		// zIndex: 40,
	},
	overlay: { zIndex: 1000, backgroundColor: 'black' },
};
const CustomModal = ({ children, modalIsOpen, setIsOpen, style }) => {
	// const [modalIsOpen, setIsOpen] = useState(false);

	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={() => {
				setIsOpen(false);
			}}
			style={style ? style : customStyles}
			ariaHideApp={false}
		>
			{children}
		</Modal>
	);
};

export default CustomModal;
