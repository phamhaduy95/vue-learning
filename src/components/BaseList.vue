<script setup lang="ts">
import type { PropType } from 'vue';

export interface Item {
    name: string
}

const props = defineProps({
    itemList: {
        type: Array as PropType<Array<Item>>,
        default: () => [],
    },
    format: {
        type: Function as PropType<(input: string) => string>,
        default: () => (a: string) => a,
    },
});

export type BaseListProps = typeof props;

</script>

<template>
    <ul v-for="(item, index) of props.itemList" :key="index">
        <li>{{ props.format(item.name) }}</li>
    </ul>
</template>

<style scoped>
button {
    padding: 0.5rem 0.75rem;
    border-radius: 5px;
    user-select: none;
    cursor: pointer;
    color: hsl(0, 0%, 20%);
    border: 1px solid hsl(0, 0%, 60%);
}

button.is-glowed {
    border-color: hsl(0, 0%, 20%);
}

button:disabled {
    background-color: hsl(0, 0%, 80%);
    color: hsl(0, 0%, 50%);
}
</style>
