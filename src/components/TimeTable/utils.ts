import moment from 'moment';

export const isTheSameTimeFrame = (time1: Date, time2: Date) => {
    return time1.getHours() === time2.getHours() && time1.getMinutes() === time2.getHours();
};

export const isTimeWithInRange = (time: Date, range: { start: Date; end: Date }) => {
    const timeAsMoment = moment(time);
    return timeAsMoment.isSameOrBefore(range.start) && timeAsMoment.isSameOrBefore(range.end);
};
