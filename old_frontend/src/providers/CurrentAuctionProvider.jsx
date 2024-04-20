import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useMemo,
} from 'react';
import useAxios from '../hooks/useAxios';

export const CurrentAuctionContext = createContext();

export function CurrentAuctionProvider({ children }) {
	const [currentAuction, setCurrentAuction] = useState(null);
	const { fetchData } = useAxios();

	useEffect(() => {
		const fetchCurrentAuction = async () => {
			const response = await fetchData({
				endpoint: '/v1/auctions/current',
				method: 'GET',
			});

			setCurrentAuction(response.data);
		};

		fetchCurrentAuction();
	}, []);

	const value = useMemo(() => ({ currentAuction }), [currentAuction]);

	return (
		<CurrentAuctionContext.Provider value={value}>
			{children}
		</CurrentAuctionContext.Provider>
	);
}

export const useCurrentAuction = () => useContext(CurrentAuctionContext);
