export const RoundToDecimalPlace = (number) => {
    if (isNaN(number)) {
        console.error("Invalid number:", number);
        return 0;
    }

    const factor = Math.pow(10, 2);
    return Math.round(number * factor) / factor;
};