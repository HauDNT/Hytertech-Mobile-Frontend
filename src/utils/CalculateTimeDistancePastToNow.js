export const CalculateTimeDistancePastToNow = (timeString) => {
    const past = new Date(timeString);
    const now = new Date();

    const timeDistance = now - past;
    const minutes = Math.floor(timeDistance / (1000 * 60));
    const hours = Math.floor(minutes / 60);

    if (hours > 1)
        return `${hours} giờ ${minutes} phút trước`;
    else 
        return `${minutes} phút trước`;
};