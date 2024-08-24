export const formatAndDisplayDatetime = (dateString) => {
    const date = new Date(dateString);
    const localDateString = date.toLocaleString('vi-VN');
    
    return localDateString;
};