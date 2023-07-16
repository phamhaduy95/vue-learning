import { readonly, ref, watch, type MaybeRefOrGetter, toValue } from 'vue';
import type { TaskData } from './type';

type TaskDataInput = {
    taskName: string;
    taskDes: string;
};

export const useTaskInput = (
    isEditMode: MaybeRefOrGetter<boolean>,
    taskData: MaybeRefOrGetter<TaskData | null>
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
                inputData.value.taskDes = data.taskDes;
                inputData.value.taskName = data.taskName;
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
