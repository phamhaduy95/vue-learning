import moment from 'moment';

const START_TIME = moment({ hour: 0, minute: 0 });
const TIME_FRAME = 20; // 20 mins
const END_TIME = START_TIME.clone().add(1, 'day');

export function useGenerateTimeRows() {
    const baseTimeFrameRows = constructTimeFrameRows();

    return baseTimeFrameRows;
}

function constructTimeFrameRows() {
    const arrays = [];
    const timePivot = START_TIME.clone();
    let lastHour: null | number = null;
    while (timePivot.isBefore(END_TIME, 'minute')) {
        const time = timePivot.toDate();
        const hour = timePivot.hour();
        const hourStr = lastHour !== null && hour === lastHour ? '' : hour.toString();
        arrays.push({ hour: hourStr, time });
        timePivot.add(TIME_FRAME, 'minute');
        lastHour = hour;
    }
    return arrays;
}
