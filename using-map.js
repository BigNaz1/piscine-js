// Cities Only
const citiesOnly = (arr) => arr.map(obj => obj.city);

// Upper Casing States
const upperCasingStates = (arr) => arr.map(state => 
  state.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
);

// Fahrenheit to Celsius
const fahrenheitToCelsius = (arr) => arr.map(temp => {
  const fahrenheit = parseInt(temp);
  const celsius = Math.floor((fahrenheit - 32) * 5 / 9);
  return `${celsius}°C`;
});

// Trim Temp
const trimTemp = (arr) => arr.map(obj => ({
  ...obj,
  temperature: obj.temperature.replace(/\s/g, '')
}));

// Temp Forecasts
const tempForecasts = (arr) => arr.map(obj => {
  const fahrenheit = parseInt(obj.temperature);
  const celsius = Math.floor((fahrenheit - 32) * 5 / 9);
  const capitalizedState = obj.state.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return `${celsius}°Celsius in ${obj.city}, ${capitalizedState}`;
});