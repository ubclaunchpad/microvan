import React from 'react';
import { useNavigate } from "react-router";
import NavBar from '../components/nav-bar/NavBar';

export default function HomePage() {
	const navigate = useNavigate();

	return (
		<div className="App">
			<NavBar />
			<button type="button" className="btn btn-primary" onClick={() => navigate("/onboard")}>Click me</button>
		</div>
	);
}
