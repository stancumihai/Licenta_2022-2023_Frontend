export const getShortDateAsString = (date: Date): string => {
    return `${date.toLocaleString('en-us', { month: 'short' })} ${date.getFullYear()}`
};