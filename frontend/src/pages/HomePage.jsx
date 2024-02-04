import React from 'react';
import { useNavigate } from 'react-router';
import NavBar from '../components/nav-bar/NavBar';

export default function HomePage() {
	const navigate = useNavigate();

	return (
		<div className="App">
			<NavBar />
			<button type="button" onClick={() => navigate('/onboard')}>
				Onboard
			</button>
		</div>
	);
}
