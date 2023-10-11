/**
 * Функция генерации ID
 *
 * @returns Строка с готовым ID
 */
function generateId() {
	const allChars = '0123456789abcdef';
	let id = '';

	for (let i = 0; i < 8; i++) {
		id += allChars[Math.round(Math.random() * (allChars.length - 1))];
	}

	return id;
}

export default generateId;
