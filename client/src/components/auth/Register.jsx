import Axios from 'axios';
import { useState } from 'react';
import Button from '../Button';

export default function Register() {
	const [registeredEmail, setRegisterEmail] = useState('');
	const [registeredName, setRegisterName] = useState('');
	const [registeredPassword, setRegisterPassword] = useState('');

	const register = () => {
		Axios({
			method: 'POST',
			data: {
				email: registeredEmail,
				name: registeredName,
				password: registeredPassword
			},
			withCredentials: true,
			url: 'http://localhost:5000/register'
		});
	};

	const handleChange = (e) => {
		e.preventDefault();
	};

	return (
		<dialog id='signupModal' className='modal'>
			<div className='modal-box'>
				<form className='flex flex-col' onSubmit={handleChange}>
					<div className='px-4 py-2 flex flex-col'>
						<label htmlFor='name'>name</label>
						<input
							type='text'
							name='name'
							id='name'
							className='border border-solid border-bgMain rounded-md'
							onChange={(e) => setRegisterName(e.target.value)}
						/>
					</div>
					<div className='px-4 py-2 flex flex-col'>
						<label htmlFor='email'>Email address</label>
						<input
							type='text'
							name='email'
							id='email'
							className='border border-solid border-bgMain rounded-md'
							onChange={(e) => setRegisterEmail(e.target.value)}
						/>
					</div>
					<div className='px-4 py-2 flex flex-col'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							className='border border-solid border-bgMain rounded-md'
							onChange={(e) => setRegisterPassword(e.target.value)}
						/>
					</div>
					<Button
						name='Sign up'
						customClass='m-4 btn bg-bgMain text-bgwhite'
						handleClick={register}
					/>
				</form>
			</div>
			<form method='dialog' className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	);
}
