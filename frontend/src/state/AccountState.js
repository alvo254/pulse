'use client';
import React, { useState, createContext, useContext } from 'react';
import Userpool from './Userpool';

const AccountContext = createContext();

const AccountStateProvider = ({ children }) => {
	const [userEmail, setUserEmail] = useState('');
	const [regMessage, setRegMessage] = useState('');
	const signup = async (email, username, password) => {
		return await new Promise((resolve, reject) => {
			let attributeList = [];
			let userName = {
				Name: 'name',
				Value: username,
			};
			attributeList.push(userName);

			Userpool.signUp(
				email,
				password,
				attributeList,
				null,
				function (err, result) {
					if (err) {
						console.log(err.message);
						setRegMessage(err.message);
						reject();
						return err;
					} else {
						// let cognitoUser = result.user;
						console.log(result);
						setRegMessage('Registration Successful');
						setUserEmail(result.userSub);
						resolve();
						return result;
						// console.log('user name is ' + cognitoUser.getUsername());
					}
				}
			);
		});
	};

	return (
		<AccountContext.Provider value={{ signup, regMessage, userEmail }}>
			{children}
		</AccountContext.Provider>
	);
};
export default AccountStateProvider;
export const useAccountContext = () => {
	return useContext(AccountContext);
};
