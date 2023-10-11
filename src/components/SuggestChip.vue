<script setup>
import CloseSVG from '@/assets/close.svg?component';

const props = defineProps({
	chip: {
		type: Object,
		default: () => ({}),
	},

	tabIndex: {
		type: Number,
		default: -1,
	},
});

const emits = defineEmits(['remove']);
</script>

<template>
	<article class="suggest-chip">
		<p class="suggest-chip__text text text-bold">{{ `@${chip.alias}` }}</p>
		<button
			class="suggest-chip__button"
			@click="emits('remove', chip.id)"
			:tabindex="tabIndex"
		>
			<CloseSVG class="suggest-chip__icon" />
		</button>
	</article>
</template>

<style scoped>
.suggest-chip {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	width: fit-content;
	padding-block: 0.25rem;
	padding-inline: 0.5rem;
	background-color: var(--colorPrimary);
	border-radius: var(--borderRadiusDefault);

	&__text {
		color: #fff;
	}

	&__button {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		border: none;
		cursor: pointer;
	}

	&__icon {
		color: #fff;
	}
}
</style>
