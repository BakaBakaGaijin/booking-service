export const getTimeData = (time) => {
    let startDate, endDate, startHours, startMinutes, endHours, endMinutes, timeRange;

    startDate = new Date(time.startDate);
    endDate = new Date(time.endDate);

    startHours = startDate.getHours().toString().length !== 2
        ? `0${startDate.getHours()}`
        : startDate.getHours();
    startMinutes = startDate.getMinutes().toString().length !== 2
        ? `0${startDate.getMinutes()}`
        : startDate.getMinutes();
    endHours = endDate.getHours().toString().length !== 2
        ? `0${endDate.getHours()}`
        : endDate.getHours();
    endMinutes = endDate.getMinutes().toString().length !== 2
        ? `0${endDate.getMinutes()}`
        : endDate.getMinutes();

    timeRange = `${startHours}:${startMinutes}-${endHours}:${endMinutes}`;

    return { startDate, endDate, startHours, startMinutes, endHours, endMinutes, timeRange };
};