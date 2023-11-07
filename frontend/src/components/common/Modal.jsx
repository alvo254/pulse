import React from 'react';

function Modal({ isOpen, onClose, children }) {
	return isOpen ? (
		<div className='fixed inset-0 flex items-center justify-center z-50'>
			<div
				className='modal-overlay fixed inset-0 bg-black '
				onClick={onClose}
			></div>
			<div className='modal-content bg-white p-4 rounded shadow-lg max-w-4xl w-full h-3/4 overflow-y-auto relative'>
				{/* <button
					className='close-button absolute top-2 right-2 text-gray-600'
					onClick={onClose}
				>
					Close
				</button> */}
				{children}
			</div>
		</div>
	) : null;
}

export default Modal;
