import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';

export const UserContext = createContext();

export function UserProvider({ children }) {
	const { isLoggedIn, getUserInfo } = useAuth();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUserData = async () => {
			if (isLoggedIn) {
				const userInfo = await getUserInfo();
				setUser(userInfo);
			} else {
				setUser(null);
			}
		};

		fetchUserData();
	}, [isLoggedIn, getUserInfo]);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
