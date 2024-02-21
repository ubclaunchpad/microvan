import { useState, useEffect } from 'react';

export default function useAuth() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const userInfo = localStorage.getItem('userInfo');
		if (userInfo) {
			setUser(JSON.parse(userInfo));
		}
	}, []);

	return {
		isAuthenticated: !!user,
		user,
	};
}
