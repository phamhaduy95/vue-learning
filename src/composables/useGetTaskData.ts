import type { ITask } from '@/types/task';
import { generateTasksList } from '@/utils/generateTaskData';
import { readonly } from 'vue';

export function useGetTaskData() {
    const tasks: Array<ITask> = generateTasksList(10);
    console.log(tasks);

    return readonly(tasks);
}
