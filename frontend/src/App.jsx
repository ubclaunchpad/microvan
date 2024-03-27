import React from 'react';
import Routers from './routers/Routers';
import { AuthProvider } from './providers/AuthProvider';

function App() {
	return (
		<AuthProvider>
			<Routers />
		</AuthProvider>
	);
}

export default App;
