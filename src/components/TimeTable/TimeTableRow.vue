<script setup lang="ts">
import { computed, type PropType, watch } from 'vue';
import type { BaseTimeTableData, TaskData } from './type';
import { isTheSameTimeFrame, isTimeWithInRange } from './utils';
import { watchEffect } from 'vue';
import { ref } from 'vue';
import { useTaskInput } from './useTaskInput';
import { shallowRef } from 'vue';

const props = defineProps({
    timeData: {
        type: Object as PropType<BaseTimeTableData>,
        required: true
    },
    tasks: {
        type: Object as PropType<TaskData[]>,
        required: true
    },
    isEditMode: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits<{
    (e: 'change:taskDataInput', value: TaskData): void;
}>();

const taskData = shallowRef<TaskData | null>(null);
const mode = ref<'start' | 'within' | 'none'>('none');

const [taskDataInput] = useTaskInput(props.isEditMode, taskData.value);

watch([taskDataInput.value.taskName, taskDataInput.value.taskDes], ([taskName, taskDes]) => {
    if (!taskData.value) return;
    const updatedData: TaskData = { ...taskData.value, taskName: taskName, taskDes: taskDes };
    emit('change:taskDataInput', updatedData);
});

watchEffect(() => {
    const timeOfRow = props.timeData.time;
    for (let task of props.tasks) {
        const range = { start: task.startTime, end: task.endTime };
        if (!isTimeWithInRange(timeOfRow, range)) continue;
        if (isTheSameTimeFrame(timeOfRow, task.startTime)) {
            mode.value = 'start';
            taskData.value = task;
            return;
        }
        mode.value = 'within';
        taskData.value = null;
        return;
    }
    mode.value = 'none';
    taskData.value = null;
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

type RowData = BaseTimeTableData & Pick<TaskData, 'taskId' | 'taskName'>;
</script>

<template>
    <tr v-if="!isEditMode" class="TimeTable__Row" :class="styleBaseOnMode">
        <td>{{ timeData.hour }}</td>
        <td>{{ timeData.time }}</td>
        <td>{{ taskData?.taskId }}</td>
        <td>{{ taskData?.taskName }}</td>
        <td>{{ taskData?.taskDes }}</td>
    </tr>
    <tr v-else>
        <td>{{ timeData.hour }}</td>
        <td>{{ timeData.time }}</td>
        <td>
            <v-text-field
                v-model:model-value="taskDataInput.taskName"
                variant="outlined"
            ></v-text-field>
        </td>
        <td>
            <v-text-field
                v-model:model-value="taskDataInput.taskDes"
                variant="outlined"
            ></v-text-field>
        </td>
    </tr>
</template>
