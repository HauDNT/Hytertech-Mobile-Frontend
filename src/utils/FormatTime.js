export const formatAndDisplayTime = (timeString) => {
    const date = new Date(timeString);
    timeString = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    return timeString;
};