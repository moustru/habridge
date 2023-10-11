function debounce(callback, wait) {
	let timeout;

	return function (...args) {
		clearTimeout(timeout);

		timeout = setTimeout(() => callback(...args), wait);
	};
}

export default debounce;
