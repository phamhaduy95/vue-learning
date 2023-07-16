<script setup lang="ts" generic="">
import type { PropType } from 'vue';
import { type TableHeader } from './type';
import { useGenerateTimeTableRows } from './useGenerateTimeTableRows';
import TimeTableRow from './TimeTableRow.vue';
import { useGetTaskData } from '@/composables/useGetTaskData';

const props = defineProps({
    mode: {
        type: String as PropType<'edit' | 'view'>,
        default: 'view'
    }
});

const timeHeaders: Array<TableHeader> = [
    { value: 'hour', text: '' },
    { value: 'timeFrame', text: '' }
];

const otherHeader: Array<TableHeader> = [
    { value: 'taskId', text: 'Id' },
    { value: 'taskName', text: ' Name' },
    { value: 'taskDes', text: ' Description' }
];

const headers = timeHeaders.concat(otherHeader);
const rows = useGenerateTimeTableRows();
const tasksList = useGetTaskData();
</script>

<template>
    <table class="TimeTable">
        <thead>
            <tr>
                <th v-for="(header, index) in headers" :key="index" class="TimeTable__HeaderCell">
                    {{ header.text }}
                </th>
            </tr>
        </thead>
        <tbody>
            <TimeTableRow
                v-for="(timeData, index) of rows"
                :key="index"
                :time-data="timeData"
                :tasks="tasksList"
            />
        </tbody>
    </table>
</template>

<style scoped lang="scss">
$border-color: hsl(0, 0%, 50%);
$bg-color: hsl(0, 0%, 80%);

.TimeTable {
    width: 100%;
    table-layout: fixed;
    .TimeTable__HeaderCell {
        border: 1px solid $border-color;
        padding: 0.25rem;
    }
}
</style>
