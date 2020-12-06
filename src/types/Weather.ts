type Weather = {
  main: {
    feels_like: number,
    humidity: number,
    pressure: number,
    temp: number,
  },
  name: string,
  weather: Array<{
    icon: string,
    main: string,
  }>,
  wind: {
    deg: number,
    speed: number,
  },
};

export default Weather;
