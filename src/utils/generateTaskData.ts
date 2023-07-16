import type { ITask } from '@/types/task';
import moment from 'moment';

const BASE_TIME_UNIT = 20; // 20 mins

function getRandomElapsedTime(max = 0, offset = 1) {
    if (max < 0) max = 0;
    return Math.floor(Math.random() * max + offset) * BASE_TIME_UNIT;
}

export function generateTaskData(data: Pick<ITask, 'name' | 'startTime'>) {
    const startTime = data.startTime;
    const randomElapsedTimeValue = getRandomElapsedTime(4);
    const endTime = moment(startTime).add(randomElapsedTimeValue, 'minute').toDate();

    const newTask: ITask = {
        id: crypto.randomUUID(),
        name: data.name,
        startTime: startTime,
        endTime: endTime,
        des: ''
    };

    return newTask;
}

export function generateTasksList(numberOfSample: number) {
    const array = new Array(numberOfSample).fill(0);

    return array.reduce((acc, _, index) => {
        const name = `task ${index + 1}`;
        if (index === 0) {
            const startTime = moment({ hour: 1, minute: 20 }).toDate();
            const newTask = generateTaskData({ name, startTime });
            acc.push(newTask);
            return acc;
        }
        const previousTask = acc[index - 1];
        const previousEndTime = previousTask.endTime;
        const startTimeForNewTask = moment(previousEndTime)
            .add(getRandomElapsedTime(3, 0), 'minute')
            .toDate();
        const newTask = generateTaskData({ name, startTime: startTimeForNewTask });
        acc.push(newTask);
        return acc;
    }, [] as ITask[]);
}
