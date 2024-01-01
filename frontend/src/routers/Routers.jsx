import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/HomePage';

export default function Routers() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}
