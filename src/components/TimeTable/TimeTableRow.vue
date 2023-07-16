<script setup lang="ts">
import { computed, ref, shallowRef, watch, watchEffect, type PropType } from 'vue';
import type { ITask } from '@/types/task';
import type { BaseTimeTableData } from './type';
import { useTaskInput } from './useTaskInput';
import { isTheSameTimeFrame, isTimeWithInRange, formatTime } from './utils';

const props = defineProps({
    timeData: {
        type: Object as PropType<BaseTimeTableData>,
        required: true
    },
    tasks: {
        type: Object as PropType<Readonly<Array<ITask>>>,
        required: true
    },
    isEditMode: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits<{
    (e: 'change:taskDataInput', value: ITask): void;
}>();

const taskData = shallowRef<ITask | null>(null);
const mode = ref<'start' | 'within' | 'none'>('none');

const [taskDataInput] = useTaskInput(props.isEditMode, taskData.value);

watch([taskDataInput.value.taskName, taskDataInput.value.taskDes], ([taskName, taskDes]) => {
    if (!taskData.value) return;
    const updatedData: ITask = { ...taskData.value, name: taskName, des: taskDes };
    emit('change:taskDataInput', updatedData);
});

watchEffect(() => {
    const timeOfRow = props.timeData.time;
    for (let task of props.tasks) {
        const range = { start: task.startTime, end: task.endTime };
        if (isTimeWithInRange(timeOfRow, range)) {
            console.log(formatTime(task.endTime));
            if (isTheSameTimeFrame(timeOfRow, task.startTime)) {
                mode.value = 'start';
                taskData.value = { ...task };
                break;
            }
            mode.value = 'within';
            break;
        }
    }
});

const styleBaseOnMode = computed(() => {
    switch (mode.value) {
        case 'none':
            return 'has-no-task';
        case 'start':
            return 'is-start-time-of-task';
        case 'within':
            return 'is-within-task-time';
        default:
            return '';
    }
});
</script>

<template>
    <tr class="TimeTable__Row" v-if="!isEditMode" :class="styleBaseOnMode">
        <td class="TimeTable__Cell">{{ timeData.hour }}</td>
        <td class="TimeTable__Cell">{{ formatTime(timeData.time) }}</td>
        <td class="TimeTable__Cell">{{ taskData?.id }}</td>
        <td class="TimeTable__Cell">{{ taskData?.name }}</td>
        <td class="TimeTable__Cell">{{ taskData?.des }}</td>
    </tr>
    <tr v-else>
        <td class="TimeTable__Cell">{{ timeData.hour }}</td>
        <td class="TimeTable__Cell">{{ formatTime(timeData.time) }}</td>
        <td class="TimeTable__Cell">
            <v-text-field
                v-model:model-value="taskDataInput.taskName"
                variant="outlined"
            ></v-text-field>
        </td>
        <td class="TimeTable__Cell">
            <v-text-field
                v-model:model-value="taskDataInput.taskDes"
                variant="outlined"
            ></v-text-field>
        </td>
    </tr>
</template>

<style scoped lang="scss">
$border-color: hsl(0, 0%, 50%);
$bg-color: hsl(0, 0%, 60%);

.TimeTable__Row {
    > .TimeTable__Cell {
        padding: 0.5rem 0;
        text-align: center;
        border: 1px solid $border-color;
        border-bottom: none;
        border-left: none;
        &:first-child {
            border-left: 1px solid $border-color;
        }
    }
    &.is-within-task-time,
    &.is-start-time-of-task {
        background-color: $bg-color;
    }

    &:last-child {
        > .TimeTable__Cell {
            border-bottom: 1px solid $border-color;
        }
    }
}
</style>
