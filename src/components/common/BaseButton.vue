<script setup lang="ts">
import type { PropType } from 'vue';

type ButtonVariants = "outlined" | "filled"

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    variant: {
        type: String as PropType<ButtonVariants>,
        default: "outlined"
    },
    disabled: {
        type: Boolean,
        default: false,
    }
});



</script>

<template>
    <button class="BaseButton">
        <slot name="button-content" :text="text">
            {{ text }}
        </slot>
    </button>
</template>

<style scoped lang="scss"></style>