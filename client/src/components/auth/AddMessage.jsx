import Axios from 'axios';
import { useState } from 'react';
import Button from '../Button';

export default function AddMessage({ fetchData }) {
	const [addTitle, setAddTitle] = useState('');
	const [addDescription, setAddDescription] = useState('');

	const addMessage = async () => {
		await Axios({
			method: 'POST',
			data: {
				title: addTitle,
				description: addDescription
			},
			withCredentials: true,
			url: 'http://localhost:5000/addMessage'
		}).then((res) => console.log(res));

		await fetchData();
	};

	const handleChange = (event) => {
		event.preventDefault();
	};
	return (
		<dialog id='addModal' className='modal'>
			<div className='modal-box'>
				<form onSubmit={handleChange}>
					<div className='px-4 py-2 flex flex-col'>
						<label htmlFor='title'>Title</label>
						<input
							type='text'
							name='title'
							id='title'
							className='border border-solid border-bgMain rounded-md'
							onChange={(e) => setAddTitle(e.target.value)}
						/>
					</div>
					<div className='px-4 py-2 flex flex-col'>
						<label htmlFor='description'>Description</label>
						<textarea
							type='text'
							name='description'
							id='description'
							className='border border-solid border-bgMain rounded-md'
							onChange={(e) => setAddDescription(e.target.value)}
						/>
					</div>
					<Button
						name='Add message'
						customClass='m-4 btn bg-bgMain text-bgwhite'
						handleClick={addMessage}
					/>
				</form>
			</div>
			<form method='dialog' className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	);
}
