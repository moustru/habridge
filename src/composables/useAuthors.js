import { ref, reactive } from 'vue';

export function useAuthors() {
	const authors = ref([]);
	const isLoading = ref(false);
	const isPending = ref(false);
	const errorResponse = reactive({
		isError: false,
		errorMessage: '',
	});

	let controller = new AbortController();

	function resetAuthors() {
		authors.value = [];
	}

	function clearErrorResponse() {
		errorResponse.isError = false;
		errorResponse.errorMessage = '';
	}

	function setLoading(state) {
		isLoading.value = state;
	}

	function setPending(state) {
		isPending.value = state;
	}

	async function getAuthors(query) {
		if (!query) {
			clearErrorResponse();
			return;
		}

		if (isPending.value) {
			controller.abort();
			controller = new AbortController();
		}

		setPending(true);
		setLoading(true);

		await fetch(
			`${import.meta.env.VITE_API_URL}/publication/suggest-mention?q=${query}`,
			{
				signal: controller.signal,
			},
		)
			.then((res) => {
				if (!res.ok) {
					errorResponse.isError = true;
					return res.json().then((err) => {
						errorResponse.errorMessage = err.message;
						return err;
					});
				}

				clearErrorResponse();

				return res.json();
			})
			.then(({ data }) => {
				authors.value = data ?? [];
			})
			.finally(() => {
				setLoading(false);
			});

		setPending(false);
	}

	return {
		authors,
		isLoading,
		isPending,
		errorResponse,
		setLoading,
		resetAuthors,
		getAuthors,
	};
}
