import React from 'react';
import Routers from './routers/Routers';
import { UserProvider } from './providers/UserProvider';

function App() {
	return (
		<UserProvider>
			<Routers />
		</UserProvider>
	);
}

export default App;
