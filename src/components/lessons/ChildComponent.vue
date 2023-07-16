<script setup lang="ts">
import type { PropType } from 'vue';
import { onUpdated, watch } from 'vue';
import { type SampleData } from './type';

const props = defineProps({
    data: {
        type: Object as PropType<SampleData>,
        required: true,
    }
})

onUpdated(() => { console.log("child component update") })


watch(() => props.data.person.id, (value) => {
    console.log(value)
})

</script>


<template>
    <p class="mb-2">child component: </p>
    <p class="ml-3 mb-3">
        {{ data.person.id }}
    </p>
</template>