<template>
  <div class="App">
    <LoadingBar />
    <ErrorMessage />
    <CurrentWeather />
  </div>
</template>

<script lang="ts">
  import { Component, Provide, Vue } from 'vue-property-decorator';

  import ErrorMessage from '@/components/ErrorMessage.vue';
  import LoadingBar from '@/components/LoadingBar.vue';
  import WeatherService from '@/services/WeatherService';
  import CurrentWeather from '@/components/CurrentWeather.vue';

  @Component({
    components: {
      CurrentWeather,
      ErrorMessage,
      LoadingBar,
    },
  })
  export default class App extends Vue {
    @Provide()
    weatherService = new WeatherService();
  }
</script>

<style lang="scss">
  @import 'style/main';
</style>

<style lang="scss" scoped>
  @import 'style/vars';

  .App {
    @include flex;
    height: 100%;
  }
</style>
