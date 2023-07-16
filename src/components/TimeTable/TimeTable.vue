<script setup lang="ts" generic="">
import type { PropType } from 'vue';
import { type TableHeader } from './type';
import { useGenerateTimeTableRows } from './useGenerateTimeTableRows';

const props = defineProps({
    mode: {
        type: String as PropType<'edit' | 'view'>,
        default: 'view'
    }
});

const timeHeaders: Array<TableHeader> = [
    { value: 'hour', text: 'hour' },
    { value: 'timeFrame', text: 'timeFrame' }
];

const otherHeader: Array<TableHeader> = [
    { value: 'task_id', text: 'taskId' },
    { value: 'task_name', text: ' task Name' }
];

const headers = timeHeaders.concat(otherHeader);
const rows = useGenerateTimeTableRows(headers);
</script>

<template>
    <table class="TimeTable">
        <thead>
            <tr>
                <slot
                    v-for="(header, index) in headers"
                    :key="index"
                    :name="'header.'.concat(header.value)"
                >
                    <th class="TimeTable__HeaderCell">
                        {{ header.text }}
                    </th>
                </slot>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</template>

<style scoped lang="scss">
.TimeTable {
    width: 100%;
    table-layout: fixed;
    border: 1px solid grey;
}
</style>
./useGenerateTimeTableRows
