export const getTimeData = (time) => {
    const startDate = new Date(time.startDate);
    const endDate = new Date(time.endDate);

    const startHours = startDate.getHours().toString().length !== 2
        ? `0${startDate.getHours()}`
        : startDate.getHours();
    const startMinutes = startDate.getMinutes().toString().length !== 2
        ? `0${startDate.getMinutes()}`
        : startDate.getMinutes();
    const endHours = endDate.getHours().toString().length !== 2
        ? `0${endDate.getHours()}`
        : endDate.getHours();
    const endMinutes = endDate.getMinutes().toString().length !== 2
        ? `0${endDate.getMinutes()}`
        : endDate.getMinutes();

    const timeRange = `${startHours}:${startMinutes}-${endHours}:${endMinutes}`;

    const day = startDate.getDate().toString().length !== 2
        ? `0${startDate.getDate()}` : startDate.getDate();
    const month = (+startDate.getMonth() + 1).toString().length !== 2
        ? `0${+startDate.getMonth() + 1}` : +startDate.getMonth() + 1;
    const year = startDate.getFullYear();

    const date = `${day}.${month}.${year}`;


    return { timeRange, date };
};