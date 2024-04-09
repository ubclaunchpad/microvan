import React, {
	createContext,
	useContext,
	useMemo,
	useState,
	useEffect,
} from 'react';
import {
	CognitoUserPool,
	CognitoUser,
	AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
					setIsLoggedIn(true);
					resolve(result);
				},
				onFailure: (err) => {
					reject(err);
				},
			});
		});

	const logout = () => {
		const cognitoUser = userPool.getCurrentUser();
		if (cognitoUser) {
			cognitoUser.signOut();
			setIsLoggedIn(false);
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

				const group = jwtDecode(session.getIdToken().getJwtToken())[
					'cognito:groups'
				][0];

				cognitoUser.getUserAttributes((error, attributes) => {
					if (error) {
						reject(error);
						return;
					}

					const userAttributes = attributes.reduce((acc, attribute) => {
						acc[attribute.Name] = attribute.Value;
						return acc;
					}, {});

					resolve({ ...userAttributes, group });
				});
			});
		});
	};

	useEffect(() => {
		getSession()
			.then(() => setIsLoggedIn(true))
			.catch(() => setIsLoggedIn(false));
	}, []);

	const value = useMemo(
		() => ({
			signIn,
			logout,
			getSession,
			getUserInfo,
			isLoggedIn,
		}),
		[isLoggedIn]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
