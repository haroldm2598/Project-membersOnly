import { useEffect, useState } from 'react';
import { AuthContextProvider } from './context/AuthContext';
import axios from 'axios';

import Navbar from './pages/navbar';
import Home from './pages/home';

import './assets/main.scss';

function App() {
	const [backendMsg, setBackendMsg] = useState([{}]);

	const fetchData = async () => {
		try {
			const responseMsg = await axios.get('http://localhost:5000/message');
			setBackendMsg(responseMsg.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<AuthContextProvider>
				<Navbar />
				{typeof backendMsg.allMessage === 'undefined' ? (
					<p>Loading....</p>
				) : (
					<Home dataMsg={backendMsg} fetchData={fetchData} />
				)}
			</AuthContextProvider>
		</>
	);
}

export default App;
