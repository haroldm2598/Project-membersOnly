import Axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

import Button from '../Button';

export default function Login() {
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');

	const { getLoggedIn } = useContext(AuthContext);

	const login = async () => {
		await Axios({
			method: 'POST',
			data: {
				email: loginEmail,
				password: loginPassword
			},
			withCredentials: true,
			url: 'http://localhost:5000/login'
		}).then((res) => console.log(res));

		await getLoggedIn();
	};

	const handleChange = async (e) => {
		e.preventDefault();
	};

	return (
		<dialog id='loginModal' className='modal'>
			<div className='modal-box'>
				<form className='flex flex-col' onSubmit={handleChange}>
					<div className='px-4 py-2 flex flex-col'>
						<label htmlFor='email'>Email address</label>
						<input
							type='text'
							name='email'
							id='emailLogin'
							className='border border-solid border-bgMain rounded-md'
							onChange={(e) => setLoginEmail(e.target.value)}
						/>
					</div>
					<div className='px-4 py-2 flex flex-col'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							id='passwordLogin'
							className='border border-solid border-bgMain rounded-md'
							onChange={(e) => setLoginPassword(e.target.value)}
						/>
					</div>
					<Button
						name='log in'
						customClass='m-4 btn bg-bgMain text-bgwhite'
						handleClick={login}
					/>
				</form>
			</div>
			<form method='dialog' className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	);
}
