/**
 * 
 * @param hourString horas em string
 */
export function convertHourToMinute(hourString: String) {
    const [hours, minutes] = hourString.split(':').map(Number);
    const minutesTotal = (hours * 60) + minutes;

    return minutesTotal;

}