<script setup>
import { ref, computed, watch } from 'vue';
import MainCombobox from './components/MainCombobox.vue';
import { useAuthors } from './composables/useAuthors';

const queryString = ref('');

const {
	authors,
	getAuthors,
	resetAuthors,
	isLoading,
	setLoading,
	errorResponse,
} = useAuthors(queryString.value);

const noAuthors = computed(
	() => !authors.value.length && !isLoading.value && !errorResponse.isError,
);

// Альтернатива dirty-флагу. Без него начальная заглушка дропдауна будет "Ничего не найдено"
function handleInputWithoutDebounce(comboboxData) {
	setLoading(!!comboboxData);
}

watch(queryString, () => {
	if (!queryString.value.length) resetAuthors();

	getAuthors(queryString.value);
});
</script>

<template>
	<MainCombobox
		v-model.debounce="queryString"
		label="Пользователь или компания"
		:suggests="authors"
		:no-data="noAuthors"
		:is-loading="isLoading"
		:error-response="errorResponse"
		input-autofocus
		input-placeholder="Введите логин"
		@inputWithoutDebounce="handleInputWithoutDebounce($event)"
	/>
</template>

<style scoped></style>
