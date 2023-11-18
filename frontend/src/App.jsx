import React from 'react';
import { Routes, Route } from 'react-router-dom';
import logo from './assets/logo.svg';
import './index.css';

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/test" element={<div>Test</div>} />
		</Routes>
	);
}

function HomePage() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
