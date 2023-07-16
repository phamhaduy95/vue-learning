import moment from 'moment';

const START_TIME = moment({ hour: 0, minute: 0 });
const TIME_FRAME = 20; // 20 mins
const END_TIME = START_TIME.clone().add(1, 'day');

export function useGenerateTimeTableRows() {
    const baseTimeFrameRows = constructTimeFrameRows();

    return baseTimeFrameRows;
}

function constructTimeFrameRows() {
    const arrays = [];
    const timePivot = START_TIME.clone();
    while (timePivot.isBefore(END_TIME, 'minute')) {
        const time = timePivot.toDate();
        const hour = timePivot.hour();
        arrays.push({ hour: hour.toString(), time });
        timePivot.add(TIME_FRAME, 'minute');
    }
    return arrays;
}
