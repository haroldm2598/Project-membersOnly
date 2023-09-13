export default function Button({ name, customClass, handleClick }) {
	return (
		<button className={customClass} onClick={handleClick}>
			{name}
		</button>
	);
}
