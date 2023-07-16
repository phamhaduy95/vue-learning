import type { ITask } from '@/types/task';
import { generateTasksList } from '@/utils/generateTaskData';
import { readonly, shallowRef } from 'vue';

export function useGetTaskData() {
    const tasks: Array<ITask> = generateTasksList(10);
    const taskList = shallowRef(tasks);

    return readonly(taskList);
}
