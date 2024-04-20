import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';

export default function useAxios() {
	const [loading, setLoading] = useState(false);
	const { getSession } = useAuth();

	const axiosInstance = axios.create({
		baseURL:
			process.env.REACT_APP_NODE_ENV === 'dev'
				? process.env.REACT_APP_DEV_BACKEND_BASE_URL
				: process.env.REACT_APP_PROD_BACKEND_BASE_URL,
	});

	const refreshToken = async () => {
		try {
			const session = await getSession();
			return session.getIdToken().getJwtToken();
		} catch (error) {
			return null;
		}
	};

	const fetchData = async ({
		endpoint,
		method = 'POST',
		data = null,
		headers = {},
	}) => {
		setLoading(true);

		const accessToken = await refreshToken();

		try {
			const result = await axiosInstance({
				url: endpoint,
				method,
				data,
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					...(accessToken && { Authorization: `Bearer ${accessToken}` }),
					...headers,
				},
				withCredentials: true,
			});
			setLoading(false);
			return result;
		} catch (err) {
			setLoading(false);
			throw err;
		}
	};

	return { fetchData, loading };
}
