import React, { createContext, useContext, useMemo } from 'react';
import {
	CognitoUserPool,
	CognitoUser,
	AuthenticationDetails,
} from 'amazon-cognito-identity-js';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {

	const userPool = new CognitoUserPool({
		UserPoolId: process.env.REACT_APP_USER_POOL_ID,
		ClientId: process.env.REACT_APP_CLIENT_ID,
	});

	const signIn = async (email, password) =>
		new Promise((resolve, reject) => {
			const authenticationDetails = new AuthenticationDetails({
				Username: email,
				Password: password,
			});

			const cognitoUser = new CognitoUser({
				Username: email,
				Pool: userPool,
			});

			cognitoUser.authenticateUser(authenticationDetails, {
				onSuccess: (result) => {
					resolve(result);
				},
				onFailure: (err) => {
					reject(err);
				},
			});
		});

	const signUpBidder = async (
		email,
		password,
		firstName,
		lastName,
		companyName,
		companyAddress,
		phoneNumber
	) =>
		new Promise((resolve, reject) => {
			const bidderNumber = Math.floor(
				10000000 + Math.random() * 90000000
			).toString();
			userPool.signUp(
				email,
				password,
				[
					{ Name: 'email', Value: email },
					{ Name: 'given_name', Value: firstName },
					{ Name: 'family_name', Value: lastName },
					{ Name: 'custom:company_name', Value: companyName },
					{ Name: 'custom:company_address', Value: companyAddress },
					{ Name: 'phone_number', Value: phoneNumber },
					{ Name: 'custom:is_blacklisted', Value: 'false' },
					{ Name: 'custom:bidder_number', Value: bidderNumber },
				],
				null,
				(err, result) => {
					if (err) {
						reject(err);
						return;
					}
					resolve(result.user);
				}
			);
		});

	const logout = () => {
		const cognitoUser = userPool.getCurrentUser();
		if (cognitoUser) {
			cognitoUser.signOut();
		}
	};

	const getSession = async () => {
		const cognitoUser = userPool.getCurrentUser();

		return new Promise((resolve, reject) => {
			if (!cognitoUser) {
				reject(new Error('No user found'));
				return;
			}
			cognitoUser.getSession((err, session) => {
				if (err || !session.isValid()) {
					reject(err || new Error('Invalid session'));
					return;
				}
				resolve(session);
			});
		});
	};

	const getUserInfo = async () => {
		const cognitoUser = userPool.getCurrentUser();
		if (!cognitoUser) {
			throw new Error('No user found');
		}

		return new Promise((resolve, reject) => {
			cognitoUser.getSession((err, session) => {
				if (err || !session.isValid()) {
					reject(err || new Error('Session is invalid'));
					return;
				}

				cognitoUser.getUserAttributes((error, attributes) => {
					if (error) {
						reject(error);
						return;
					}

					const userAttributes = attributes.reduce((acc, attribute) => {
						acc[attribute.Name] = attribute.Value;
						return acc;
					}, {});

					cognitoUser.getUserGroups((e, result) => {
						if (e) {
							reject(e);
							return;
						}

						const groups = result.Groups.map((group) => group.GroupName);
						resolve({ ...userAttributes, groups });
					});
				});
			});
		});
	};

	const isLoggedIn = () =>
		new Promise((resolve) => {
			const cognitoUser = userPool.getCurrentUser();
			if (!cognitoUser) {
				resolve(false);
				return;
			}
			cognitoUser.getSession((err, session) => {
				resolve(!err && session.isValid());
			});
		});

	const value = useMemo(
		() => ({
			signIn,
			signUpBidder,
			logout,
			getSession,
			getUserInfo,
			isLoggedIn,
		}),
		[]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
