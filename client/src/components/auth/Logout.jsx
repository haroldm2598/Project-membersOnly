import Axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import Button from '../Button';

export default function Logout() {
	const { getLoggedIn } = useContext(AuthContext);

	const logout = async () => {
		await Axios({
			method: 'POST',
			withCredentials: true,
			url: 'http://localhost:5000/logout'
		}).then((res) => console.log(res));

		await getLoggedIn();
	};

	return (
		<>
			<Button
				name='log out'
				customClass={'mr-2 w-32 btn bg-bgMain text-bgwhite rounded-xl'}
				handleClick={logout}
			/>
		</>
	);
}
