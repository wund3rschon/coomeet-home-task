<template>
  <div v-if="isVisible" class="LoadingBar" />
</template>

<script lang="ts">
  import { Component, Inject, Vue } from 'vue-property-decorator';

  import WeatherService from '@/services/WeatherService';

  @Component
  export default class LoadingBar extends Vue {
    @Inject()
    weatherService!: WeatherService;

    get isVisible() {
      return (
        this.weatherService.errorCode == null
        && this.weatherService.weather == null
      );
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/vars';

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }

  .LoadingBar {
    @include flex;
    backface-visibility: hidden;
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    &::before {
      @include size(48px);
      animation: rotate 1s linear infinite;
      border: 2px solid $accent;
      border-left-color: transparent;
      border-radius: 50%;
      content: '';
    }
  }
</style>
