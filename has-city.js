function hasCity(country, array) {
    return function (city) {
      return array.includes(city)
        ? `${city} is a city from ${country}`
        : `${city} is not a city from ${country}`
    }
  }