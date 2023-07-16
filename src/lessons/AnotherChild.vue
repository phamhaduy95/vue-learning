<script setup lang="ts">
import type { PropType } from 'vue';
import { onUpdated } from 'vue';
import { type SampleData } from './type';

const props = defineProps({
    id: {
        type: String as PropType<SampleData["id"]>,
        required: true,
    }
})

onUpdated(() => { console.log("another child component updated") })
</script>

<template>
    <p class="mb-2">child component: </p>
    <p class="ml-3 mb-3">
        <!-- id: {{ id }} -->
    </p>
</template>