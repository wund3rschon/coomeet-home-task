<template>
  <div v-if="isVisible" class="CurrentWeather">
    <h2 class="CurrentWeather-heading">
      Current weather<br />
      <span>Near {{ station }} weather station</span>
    </h2>
    <img
      class="CurrentWeather-icon"
      v-bind:alt="status"
      v-bind:src="iconURL"
    />
    <h3 class="CurrentWeather-status">
      {{ status }}, {{ temp }}°C<br />
      <span>Feels like {{ feelsLike }}°C</span>
    </h3>
    <p v-if="pressure != null" class="CurrentWeather-pressure">
      Pressure: {{ pressure }}hPa
    </p>
    <p v-if="humidity != null" class="CurrentWeather-humidity">
      Humidity: {{ humidity }}%
    </p>
    <p v-if="wind != null" class="CurrentWeather-wind">
      Wind: {{ wind.direction }} at {{ wind.speed }}m/s
    </p>
  </div>
</template>

<script lang="ts">
  import { Component, Inject, Vue } from 'vue-property-decorator';

  import WeatherService from '@/services/WeatherService';

  const ranges = [
    'N/NE',
    'NE',
    'E/NE',
    'E',
    'E/SE',
    'SE',
    'S/SE',
    'S',
    'S/SW',
    'SW',
    'W/SW',
    'W',
    'W/NW',
    'NW',
    'N/NW',
    'N',
  ];

  const getWindDirection = (degree: number) => {
    const deg = degree % 360;
    const direction = ranges.reduce(
      (acc, range, index) => {
        if (acc == null) {
          const start = 11.25 + index * 22.5;
          const finish = 11.25 + (index + 1) * 22.5;
          if (deg >= start && deg < finish) {
            return range;
          }
        }

        return acc;
      },
      null,
    );

    return direction ?? 'N';
  };

  @Component
  export default class CurrentWeather extends Vue {
    @Inject()
    weatherService!: WeatherService;

    get isVisible() {
      return this.weatherService.weather != null;
    }

    get station() {
      return this.weatherService.weather?.name;
    }

    get status() {
      return this.weatherService.weather?.weather[0].main;
    }

    get temp() {
      return this.weatherService.weather?.main.temp;
    }

    get iconURL() {
      const code = this.weatherService.weather?.weather[0].icon;
      return `//openweathermap.org/img/wn/${code}@2x.png`;
    }

    get pressure() {
      return this.weatherService.weather?.main.pressure;
    }

    get humidity() {
      return this.weatherService.weather?.main.humidity;
    }

    get feelsLike() {
      return this.weatherService.weather?.main.feels_like;
    }

    get wind() {
      const { wind } = this.weatherService.weather ?? {};
      if (wind == null) {
        return null;
      }

      const { deg, speed } = wind;
      return {
        direction: getWindDirection(deg),
        speed,
      };
    }
  }
</script>

<style lang="sass" scoped>
  @import '../sass/vars'

  %secondary
    color: $secondary
    display: block
    font-size: 12px

  .CurrentWeather
    background: lighten($bg, 3)
    border-radius: 4px
    box-shadow: 0 1px 4px rgba(black, 0.18)
    min-width: 56px * 4
    padding: 18px 24px 24px
    text-align: center

  .CurrentWeather-heading
    margin-bottom: 24px
    span
      @extend %secondary

  .CurrentWeather-icon
    @include size(50px)

  .CurrentWeather-status
    margin-bottom: 12px
    span
      @extend %secondary

  .CurrentWeather-pressure,
  .CurrentWeather-humidity,
  .CurrentWeather-wind
    font-size: 14px
</style>
