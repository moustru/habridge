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
			class="btn-icon"
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
		user-select: none;
	}

	&__icon {
		color: #fff;
	}
}
</style>
