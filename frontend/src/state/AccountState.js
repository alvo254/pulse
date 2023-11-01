'use client';
import React, { useState, createContext, useContext } from 'react';
import Userpool from './Userpool';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { data } from 'autoprefixer';

const AccountContext = createContext();

const AccountStateProvider = ({ children }) => {
	const [userEmail, setUserEmail] = useState('');
	const [regMessage, setRegMessage] = useState('');

	const getSession = async () => {
		return await new Promise((resolve, reject) => {
			const user = Userpool.getCurrentUser();
			if (user) {
				user.getSession(async (err, session) => {
					if (err) {
						reject(err);
					} else {
						const userAttributes = await new Promise(
							(resolve, reject) => {
								user.getUserAttributes((err, attributes) => {
									if (err) {
										console.log('error ', err.message);
										reject(err);
									} else {
										let result = {};
										for (let attribute of attributes) {
											const { Name, Value } = attribute;
											result[Name] = Value;
										}
										// console.log('result ', result);
										resolve(result);
										localStorage.setItem(
											'user',
											result.name
										);
									}
								});
							}
						);
						resolve({ user, ...session, ...userAttributes });
					}
				});
			} else {
				reject();
			}
		});
	};
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
						reject(err);
						// return err;
					} else {
						// let cognitoUser = result.user;
						// console.log(result);
						setRegMessage('Registration Successful');
						setUserEmail(result.userSub);
						resolve(data);
						// return result;
						// console.log('user name is ' + cognitoUser.getUsername());
					}
				}
			);
		});
	};

	const authenticate = async (email, Password) => {
		return await new Promise((resolve, reject) => {
			let Username = {
				Name: 'email',
				Value: email,
			};
			const user = new CognitoUser({ Username: email, Pool: Userpool });
			const authDetails = new AuthenticationDetails({
				Username: email,
				Password,
			});
			user.authenticateUser(authDetails, {
				onSuccess: (data) => {
					// console.log('login successfully', data);
					resolve(data);
				},
				onFailure: (err) => {
					console.log('Failure', err.message);
					reject(err);
				},
				newPasswordRequired: (data) => {
					// console.log('new password required', data);
					resolve(data);
				},
			});
		});
	};

	const authenticatedUser = async () => {
		return await new Promise((resolve, reject) => {
			const user = new CognitoUser().getUserAttributes((err, result) => {
				if (err) {
					console.log('error ', err.message);
					reject(err);
				} else {
					// console.log('user ', result);
					resolve(result);
				}
			});
		});
	};

	return (
		<AccountContext.Provider
			value={{
				signup,
				authenticate,
				getSession,
				regMessage,
				userEmail,
				authenticatedUser,
			}}
		>
			{children}
		</AccountContext.Provider>
	);
};
export default AccountStateProvider;
export const useAccountContext = () => {
	return useContext(AccountContext);
};
