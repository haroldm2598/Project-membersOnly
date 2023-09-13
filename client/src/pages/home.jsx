import { Fragment, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import Button from '../components/Button';
import AddMessage from '../components/auth/AddMessage';
import { BsPlusSquare } from 'react-icons/bs';

export default function Home({ dataMsg, fetchData }) {
	const { loggedIn } = useContext(AuthContext);

	const truncate = (source, size) => {
		return source.length > size ? source.slice(0, size - 1) + '...' : source;
	};

	return (
		<>
			<div className='bg-bgLight h-20 mt-1 flex justify-center items-center'>
				<h1 className='text-4xl font-semibold'>Messages</h1>
			</div>

			<main className='max-w-6xl min-h-12 mx-auto px-2 py-10 bg-slate-200 grid grid-rows-3 grid-cols-3 gap-10'>
				{loggedIn && (
					<>
						<div className='h-60 w-full flex flex-col justify-center items-center bg-bgLight headerShadow'>
							<Button
								customClass={'btn border border-solid border-bgMain'}
								name={<BsPlusSquare />}
								handleClick={() => window.addModal.showModal()}
							/>
							<h1 className='mt-2 text-2xl font-medium'>Add Message</h1>
						</div>

						<AddMessage fetchData={fetchData} />
					</>
				)}
				{dataMsg?.allMessage.map((item, index) => (
					<Fragment key={index}>
						<div className='h-60 w-full p-4 flex flex-col justify-between bg-bgLight headerShadow'>
							<h1 className='text-2xl font-medium'>{item?.title}</h1>
							<p>{truncate(item?.description, 100)}</p>
							<p>{item?.authorName?.name}</p>
						</div>
					</Fragment>
				))}
			</main>
		</>
	);
}
