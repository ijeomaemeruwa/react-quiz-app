export const timeStringToSeconds = (timeString) => {
    const time = timeString.split(":");
    const hoursToSeconds = time[0] * 60 * 60;
    const minutesToSeconds = time[1] * 60;
    const seconds = hoursToSeconds + minutesToSeconds + time[2];
    return seconds;
  }