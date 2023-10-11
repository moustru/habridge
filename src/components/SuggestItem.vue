<script setup>
import { computed } from 'vue';
import NoAvatar from '@/assets/no-avatar.png';

const props = defineProps({
	suggest: {
		type: Object,
		default: () => ({}),
	},

	tabIndex: {
		type: Number,
		default: -1,
	},

	isDisabled: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits(['choose']);

const isCompany = computed(() => props.suggest.type === 'company');

function chooseSuggest() {
	if (props.isDisabled) return;

	emits('choose', props.suggest.alias);
}
</script>

<template>
	<article
		class="suggest-item"
		:class="{ 'suggest-item--disabled': isDisabled }"
		:tabindex="isDisabled ? -1 : tabIndex"
		@click="chooseSuggest"
		@keyup.enter="chooseSuggest"
	>
		<div class="suggest-item__img">
			<img :src="suggest.avatar || NoAvatar" alt="Suggest img" />
		</div>
		<div class="suggest-item__text">
			<p class="suggest-item__text-title">
				{{ suggest.name || suggest.alias }}
			</p>
			<p class="suggest-item__text-desc">
				{{ isCompany ? 'Компания' : suggest.alias }}
			</p>
		</div>
	</article>
</template>

<style scoped>
.suggest-item {
	display: flex;
	gap: 1rem;
	padding-block: 1rem;
	padding-inline: 1rem;
	transition: background-color 0.1s linear;
	cursor: pointer;

	&:hover {
		background-color: var(--colorGray100);
	}

	&:focus {
		outline: none;
		background-color: var(--colorGray100);
	}

	&--disabled {
		opacity: 0.5;
		cursor: not-allowed;
		user-select: none;
	}

	&__text {
		&-title,
		&-desc {
			font-size: var(--fontSize);
		}

		&-desc {
			color: var(--colorGray500);
		}
	}

	&__img {
		width: 3rem;
		height: 3rem;

		img {
			width: 100%;
		}
	}
}
</style>
