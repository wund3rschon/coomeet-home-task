<template>
  <div v-if="isVisible" class="ErrorMessage">
    {{ message }}
    <svg class="ErrorMessage-icon" viewBox="0 0 24 24" v-on:click="onReload">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99
               8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6
               6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
  import { Component, Inject, Vue } from 'vue-property-decorator';

  import ErrorCodesEnum from '@/enums/ErrorCodesEnum';
  import WeatherService from '@/services/WeatherService';

  @Component
  export default class ErrorMessage extends Vue {
    @Inject()
    weatherService!: WeatherService;

    get isVisible() {
      return this.weatherService.errorCode != null;
    }

    get message() {
      switch (this.weatherService.errorCode) {
        case ErrorCodesEnum.OUTDATED_BROWSER:
          return (
            'Unable to retrieve your location: your web browser is far too outdated\n'
            + 'Please update your browser and try again'
          );
        case ErrorCodesEnum.ACCESS_NOT_GRANTED:
          return (
            'Unable to retrieve your location: no Geolocation API access was granted\n'
            + 'Please check the access (e.g. by googling) and try again'
          );
        case ErrorCodesEnum.INVALID_API_RESPONSE:
          return (
            'Unable to retrieve the forecast: the forecast service is experiencing some problems\n'
            + 'Please try again a bit later'
          );
        case ErrorCodesEnum.NETWORK_PROBLEM:
          return (
            'Unable to retrieve the forecast: your network is experiencing some problems\n'
            + 'Please check your network connection and try again'
          );
        default:
          throw new ReferenceError(`Unknown error code: ${this.weatherService.errorCode}`);
      }
    }

    // eslint-disable-next-line class-methods-use-this
    onReload() {
      window.location.reload();
    }
  }
</script>

<style lang="sass" scoped>
  @import '../sass/vars'

  .ErrorMessage
    @include flex($direction: column)
    color: $accent
    text-align: center
    white-space: pre-line

  .ErrorMessage-icon
    @include size(48px)
    background: lighten($bg, 3)
    border-radius: 50%
    box-shadow: 0 1px 4px rgba(black, 0.18)
    cursor: pointer
    fill: $secondary
    margin-top: 24px
    padding: 12px
    transition: box-shadow 0.28s ease
    &:hover
      box-shadow: 0 2px 8px rgba(black, 0.26)
</style>
