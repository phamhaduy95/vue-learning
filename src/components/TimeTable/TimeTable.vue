<script setup lang="ts" generic="">
import type { PropType } from 'vue';
import { type TableHeader } from './type';
import { useGenerateTimeRows } from './useGenerateTimeRows';
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
const rows = useGenerateTimeRows();
const tasksList = useGetTaskData();
</script>

<template>
    <div class="TimeTable__Container">
        <table class="TimeTable__Table">
            <thead>
                <tr>
                    <th
                        v-for="(header, index) in headers"
                        :key="index"
                        class="TimeTable__HeaderCell"
                    >
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
    </div>
</template>

<style scoped lang="scss">
$border-color: hsl(0, 0%, 50%);
$bg-color: hsl(0, 0%, 80%);

.TimeTable__Container {
    width: 70%;
    margin: 2em auto;
    table-layout: fixed;
    max-height: 400px;
    overflow: auto;
    box-shadow: inset 0 -1px 0 0 $border-color;

    > .TimeTable__Table {
        width: 100%;
        table-layout: fixed;
        border-spacing: 0;

        .TimeTable__HeaderCell {
            z-index: 1;
            position: sticky;
            top: 0;
            padding: 0.25rem;
            border: 1px solid $border-color;
            border-top: none;
            border-bottom: none;
            box-shadow: inset 0 -1px 0 0 $border-color, inset 0 1px 0 0 $border-color;
            background-color: aquamarine;
        }
    }
}
</style>
./useGenerateTimeRows
