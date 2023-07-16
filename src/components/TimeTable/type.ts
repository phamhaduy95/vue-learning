export type BaseTimeTableData = {
    hour: string;
    time: Date;
};

export type TableHeader = {
    value: string;
    text: string;
};

export type TaskData = {
    taskId: string;
    taskName: string;
    startTime: Date;
    endTime: Date;
    taskDes: string;
};
