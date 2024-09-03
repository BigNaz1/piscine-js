function addWeek(date) {
    // Define the start date (epoch)
    const startDate = new Date('0001-01-01');
    
    // Calculate the number of days between the given date and the start date
    const daysDifference = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
    
    // Determine if it's in the first or second week of our 14-day cycle
    const isSecondWeek = Math.floor(daysDifference / 7) % 2 !== 0;
    
    // Get the day of the week (0-6, where 0 is Sunday)
    const dayOfWeek = date.getDay();
    
    // Array of day names
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Get the day name
    let dayName = days[dayOfWeek];
    
    // If it's in the second week, add 'second' prefix
    if (isSecondWeek) {
        dayName = 'second' + dayName;
    }
    
    return dayName;
}

function timeTravel(dateInfo) {
    // Create a new Date object to avoid modifying the original
    let newDate = new Date(dateInfo.date);
    
    // Set the new time
    newDate.setHours(dateInfo.hour);
    newDate.setMinutes(dateInfo.minute);
    newDate.setSeconds(dateInfo.second);
    
    return newDate;
}