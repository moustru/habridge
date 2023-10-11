<script setup></script>

<template>
	<div class="base-dropdown">
		<slot />
	</div>
</template>

<style scoped>
.base-dropdown {
	position: absolute;
	left: 0;
	top: calc(100% + 0.5rem);
	max-height: 320px;
	background-color: #fff;
	overflow-y: auto;
	box-shadow:
		0 1px 3px rgba(0, 0, 0, 0.12),
		0 1px 2px rgba(0, 0, 0, 0.24);

	@media screen and (max-width: 768px) {
		width: 100%;
	}
}
</style>
