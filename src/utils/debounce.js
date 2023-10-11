/**
 * Дебаунс-функция
 *
 * @param {Function} callback Колбэк (функция, ради которой применяется дебаунсер)
 * @param {Number} wait Время работы дебаунса
 * @returns Исполняемая функция-обертка вокруг колбэка
 */
function debounce(callback, wait) {
	let timeout;

	return function (...args) {
		clearTimeout(timeout);

		timeout = setTimeout(() => callback(...args), wait);
	};
}

export default debounce;
