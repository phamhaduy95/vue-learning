import moment from 'moment';
import { computed, ref, watch } from 'vue';
import type { TableHeader } from './type';

const START_TIME = moment({ hour: 0, minute: 0 });
const TIME_FRAME = 20; // 20 mins
const END_TIME = START_TIME.clone().add(1, 'day');
const TIME_FORMAT = 'HH:mm';

export function useGenerateTimeTableRows(headers: Array<TableHeader>) {
    const baseTimeFrameRows = constructTimeFrameRows();

    const rows = computed(() => headers);

    return rows;
}

function constructTimeFrameRows() {
    const arrays = [];
    const timePivot = START_TIME.clone();
    while (timePivot.isBefore(END_TIME, 'minute')) {
        const time = timePivot.format(TIME_FORMAT);
        const hour = timePivot.hour();
        arrays.push({ hour, time });
        timePivot.add(TIME_FRAME, 'minute');
    }
    return arrays;
}
