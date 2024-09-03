function matchCron(cron, date) {
    // Split the cron string into an array of its parts
    const cronParts = cron.split(' ')
  
    // Create an array of the relevant date parts
    const dateParts = [
      date.getMinutes(),    // Minutes (0-59)
      date.getHours(),      // Hours (0-23)
      date.getDate(),       // Day of the month (1-31)
      date.getMonth() + 1,  // Month (1-12), +1 because getMonth() returns 0-11
      date.getDay(),        // Day of the week (0-6, where 0 is Sunday)
    ]
  
    // Check if every cron part matches its corresponding date part
    return cronParts.every((part, i) => {
      return part === '*' || part === dateParts[i].toString()
    })
  }