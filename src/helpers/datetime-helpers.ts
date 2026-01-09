export function convertUtcToTimeDifferenceFromNow(dateTime: string) {
  const currentTime = new Date();
  const startTime = new Date(dateTime);
  const difference = currentTime.getTime() - startTime.getTime();
  const diffInDays = Math.floor(difference / (1000 * 60 * 60 * 24));
  return diffInDays;
}

// Input format: 2026-01-08T16:00:00.000Z
// Output format: January 8, 2026
export function convertUtcToAppStdDateFormat(dateTime: string) {
  try {
    const date = new Date(dateTime);
    const result = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return result;
  } catch (error) {
    console.error("Error in convertUtcToAppStdDateFormat: ", error);
    return dateTime;
  }
}
