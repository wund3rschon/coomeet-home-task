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
      Pressure stands at {{ pressure }}hPa
    </p>
    <p v-if="humidity != null" class="CurrentWeather-humidity">
      Humidity is at {{ humidity }}%
    </p>
    <p v-if="wind != null" class="CurrentWeather-wind">
      Wind is {{ wind.direction }} at about {{ wind.speed }}m/s
      <template v-if="wind.gust">
        <br />
        <span>with gusts up to {{ wind.gust }}m/s</span>
      </template>
    </p>
  </div>
</template>

<script lang="ts">
  import { Component, Inject, Vue } from 'vue-property-decorator';

  import WeatherService from '@/services/WeatherService';
  import getWindDirection from '@/utils/getWindDirection';

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

      const { deg, gust, speed } = wind;
      return {
        direction: getWindDirection(deg),
        gust,
        speed,
      };
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/vars';

  %secondary {
    color: $secondary;
    display: block;
    font-size: 12px;
    margin-top: -4px;
  }

  .CurrentWeather {
    background: lighten($bg, 3);
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(black, 0.18);
    min-width: 56px * 4;
    padding: 20px 24px;
    text-align: center;
  }

  .CurrentWeather-heading {
    margin-bottom: 24px;
    span {
      @extend %secondary;
    }
  }

  .CurrentWeather-icon {
    @include size(50px);
  }

  .CurrentWeather-status {
    margin-bottom: 12px;
    span {
      @extend %secondary;
    }
  }

  .CurrentWeather-pressure,
  .CurrentWeather-humidity,
  .CurrentWeather-wind {
    font-size: 14px;
    margin-bottom: 4px;
  }

  .CurrentWeather-wind {
    span {
      @extend %secondary;
    }
  }
</style>
