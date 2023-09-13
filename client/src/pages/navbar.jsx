import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import Button from '../components/Button';
import Login from '../components/auth/Login';
import Logout from '../components/auth/Logout';
import Register from '../components/auth/Register';

export default function Navbar() {
	const { loggedIn } = useContext(AuthContext);

	return (
		<header className='headerShadow px-32 py-5'>
			<nav className='flex flex-row justify-between items-center'>
				<h1 className='text-4xl font-bold uppercase'>message app</h1>

				<div>
					{loggedIn === false || loggedIn === '' ? (
						<>
							<Button
								name='log in'
								customClass={'mr-2 w-32 btn bg-bgMain text-bgwhite rounded-xl'}
								handleClick={() => window.loginModal.showModal()}
							/>
							<Button
								name='sign up'
								customClass={
									'w-32 btn btn-ghost border border-solid border-bgMain rounded-xl hover:text-white'
								}
								handleClick={() => window.signupModal.showModal()}
							/>
						</>
					) : (
						<Logout />
					)}
				</div>
			</nav>

			<Login />
			<Register />
		</header>
	);
}
