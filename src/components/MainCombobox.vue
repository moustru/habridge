<script setup>
import { ref, watch } from 'vue';
import SuggestItem from './SuggestItem.vue';
import SuggestChip from './SuggestChip.vue';
import BaseDropdown from './BaseDropdown.vue';
import debounce from '@/utils/debounce';
import generateId from '@/utils/generateId';

const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},

	modelModifiers: {
		type: Object,
		default: () => ({}),
	},

	suggests: {
		type: Array,
		default: () => [],
	},

	label: {
		type: String,
		default: '',
	},

	noData: {
		type: Boolean,
		default: false,
	},

	isLoading: {
		type: Boolean,
		default: false,
	},

	errorResponse: {
		type: Object,
		default: () => ({}),
	},

	inputPlaceholder: {
		type: String,
		default: '',
	},

	inputAutofocus: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits(['update:modelValue', 'inputWithoutDebounce']);

const inputData = ref('');
const selectedChips = ref([]);
const isDropdownShowed = ref(false);
const debouncer = debounce(emits, 500);

function addChip(chip) {
	selectedChips.value.push({
		id: generateId(),
		alias: chip,
	});
}

function setDropdownState(state) {
	isDropdownShowed.value = state;
}

function removeChip(chipId) {
	selectedChips.value = selectedChips.value.filter(
		(suggestChip) => suggestChip.id !== chipId,
	);
}

function showDropdownIfQueryStringIsExist() {
	if (inputData.value.length) {
		setDropdownState(true);
	}
}

function clickOutside() {
	setDropdownState(false);
}

function isSuggestChosen(suggestInput) {
	return !!selectedChips.value.find(
		(suggest) => suggest.alias === suggestInput,
	);
}

function emitInput(e) {
	if (props.modelModifiers.debounce) {
		// Исключительно для запуска лоадинг-стейта. За изменение стейта инпута отвечает дебаунсер внизу
		emits('inputWithoutDebounce', e.target.value);

		return debouncer('update:modelValue', e.target.value);
	}

	return emits('update:modelValue', e.target.value);
}

watch(inputData, () => {
	if (!inputData.value.length) {
		setDropdownState(false);
	} else {
		setDropdownState(true);
	}
});
</script>

<template>
	<article class="main-combobox" v-click-outside="clickOutside">
		<label for="input" class="main-combobox__label text text-bold">
			{{ label }}
		</label>
		<div
			class="main-combobox__field"
			:class="{ 'main-combobox__field--error': errorResponse.isError }"
		>
			<div v-if="selectedChips.length" class="main-combobox__field-chips">
				<SuggestChip
					v-for="(chip, i) in selectedChips"
					:key="chip.id"
					:chip="chip"
					:tab-index="i + 1"
					@remove="removeChip($event)"
				/>
			</div>
			<input
				v-model="inputData"
				:autofocus="inputAutofocus"
				autocomplete="off"
				id="input"
				:tabindex="selectedChips.length + 1"
				class="main-combobox__field-input"
				:class="{
					'main-combobox__field-input--full': !selectedChips.length,
				}"
				:placeholder="inputPlaceholder"
				@focus="showDropdownIfQueryStringIsExist"
				@input="emitInput"
			/>
		</div>
		<p class="main-combobox__error">
			{{ errorResponse.errorMessage }}
		</p>
		<BaseDropdown v-if="isDropdownShowed" @close="setDropdownState(false)">
			<div v-if="isLoading" class="message-state">Loading...</div>

			<div v-if="noData" class="message-state">Ничего не найдено</div>

			<template v-if="!isLoading">
				<SuggestItem
					v-for="(suggest, i) in suggests"
					:key="suggest.alias + i"
					:suggest="suggest"
					:is-disabled="isSuggestChosen(suggest.alias)"
					:tab-index="selectedChips.length + 2"
					@keyup.enter="addChip(suggest.alias)"
					@choose="addChip($event)"
				/>
			</template>
		</BaseDropdown>
	</article>
</template>

<style scoped>
.main-combobox {
	position: relative;
	width: 50%;
	margin-inline: auto;

	@media screen and (max-width: 1024px) {
		width: 80%;
	}

	&__label {
		display: block;
		margin-block-end: 0.5rem;
		font-size: var(--fontSize);
	}

	&__field {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		width: 100%;
		padding-block: 0.5rem;
		padding-inline: 0.75rem;
		border: 1px solid var(--colorGray200);
		border-radius: var(--borderRadiusDefault);

		&--error {
			border-color: var(--colorError);

			&:has(.main-combobox__field-input:focus) {
				border-color: var(--colorError) !important;
			}
		}

		&-chips {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
		}

		&-input {
			min-height: 28px;
			font-size: var(--fontSize);
			color: var(--colorSecondary);
			border: none;

			&:focus {
				outline: none;
			}

			&--full {
				width: 100%;
			}
		}

		&:has(&-input:focus) {
			border-color: var(--colorSecondary);
			outline: none;
			transition: border-color 0.2s linear;
		}
	}

	&__error {
		position: absolute;
		top: 100%;
		margin-block-start: 0.5rem;
		color: var(--colorError);
	}
}

.message-state {
	padding-block: 1rem;
	padding-inline: 1rem;
}
</style>
