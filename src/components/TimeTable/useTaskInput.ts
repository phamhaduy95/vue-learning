import type { ITask } from '@/types/task';
import { ref, toValue, watch, type MaybeRefOrGetter } from 'vue';

type TaskDataInput = {
    taskName: string;
    taskDes: string;
};

export const useTaskInput = (
    isEditMode: MaybeRefOrGetter<boolean>,
    taskData: MaybeRefOrGetter<ITask | null>
) => {
    const defaultInputValue: TaskDataInput = {
        taskName: '',
        taskDes: ''
    };

    const inputData = ref(defaultInputValue);

    watch(
        () => toValue(isEditMode),
        (isEditMode) => {
            const data = toValue(taskData);
            if (isEditMode && data) {
                inputData.value.taskDes = data.des;
                inputData.value.taskName = data.name;
            }
        }
    );

    const updateInputData = <Key extends keyof TaskDataInput>(
        field: Key,
        value: TaskDataInput[Key]
    ) => {
        inputData.value[field] = value;
    };

    return [inputData, { updateInputData }] as const;
};
