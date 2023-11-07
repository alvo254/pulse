'use client';
import { useContext, createContext, useRef, useState } from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
	const [user, setUser] = useState('');
	const scrollContainerRef = useRef(null);
	const [activeMenu, setActiveMenu] = useState(true);
	const [isClicked, setIsClicked] = useState();
	const [screenSize, setScreenSize] = useState(undefined);
	const [darkToggle, setDarkToggle] = useState(false);
	const [openLogoutModal, setOpenLogoutModal] = useState(false);
	const [fetchedTweets, setFetchedTweets] = useState([]);
	let login = false;

	const handleClick = (clicked) => {
		setIsClicked({ ...isClicked, [clicked]: true });
	};
	return (
		<AppContext.Provider
			value={{
				login,
				// setUser,
				user,
				activeMenu,
				setActiveMenu,
				isClicked,
				setIsClicked,
				handleClick,
				screenSize,
				setScreenSize,
				darkToggle,
				setDarkToggle,
				scrollContainerRef,
				openLogoutModal,
				setOpenLogoutModal,
				fetchedTweets,
				setFetchedTweets,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useStateContext = () => {
	return useContext(AppContext);
};
