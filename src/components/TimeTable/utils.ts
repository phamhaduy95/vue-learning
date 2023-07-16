import moment from 'moment';

export const isTheSameTimeFrame = (time1: Date, time2: Date) => {
    return time1.getHours() === time2.getHours() && time1.getMinutes() === time2.getMinutes();
};

export const isTimeWithInRange = (time: Date, range: { start: Date; end: Date }) => {
    const timeAsMoment = moment(time);
    return (
        timeAsMoment.isSameOrAfter(range.start, 'minute') &&
        timeAsMoment.isBefore(range.end, 'minute')
    );
};

const TIME_FORMAT = 'HH:mm';
export const formatTime = (time: Date) => {
    return moment(time).format(TIME_FORMAT);
};
