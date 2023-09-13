import { createContext, useEffect, useState } from 'react';
import Axios from 'axios';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [loggedIn, setLoggedIn] = useState(undefined);

	async function getLoggedIn() {
		const response = await Axios({
			method: 'GET',
			withCredentials: true,
			url: 'http://localhost:5000/user'
		});

		setLoggedIn(response.data);
	}

	useEffect(() => {
		getLoggedIn();
	}, []);

	return (
		<AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
			{children}
		</AuthContext.Provider>
	);
}
