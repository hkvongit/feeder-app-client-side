export function convertUtcToTimeDifferenceFromNow(dateTime: string) {
    const currentTime = new Date()
    const startTime = new Date(dateTime)
    const difference = currentTime.getTime() - startTime.getTime();
    const diffInDays = Math.floor(difference / (1000 * 60 * 60 * 24))
    return diffInDays;
} 