import { Component, Vue } from 'vue-property-decorator';

import ErrorCodesEnum from '@/enums/ErrorCodesEnum';
import Weather from '@/types/Weather';

const createEndpoint = ({ coords: { latitude, longitude } }: Position) => {
  const params = new URLSearchParams([
    ['lat', latitude.toString()],
    ['lon', longitude.toString()],
    ['units', 'metric'],
    ['appid', 'ac89a3cd8a2ad2eb523eb7c3a2db8cdc'],
  ]);

  return `//api.openweathermap.org/data/2.5/weather?${params}`;
};

@Component
export default class WeatherService extends Vue {
  errorCode: Maybe<ErrorCodesEnum> = null;
  weather: Maybe<Weather> = null;

  created() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const endpoint = createEndpoint(position);
            const response = await fetch(endpoint);
            if (response.status === 200) {
              this.weather = await response.json();
            } else {
              this.errorCode = ErrorCodesEnum.INVALID_API_RESPONSE;
            }
          } catch {
            this.errorCode = ErrorCodesEnum.NETWORK_PROBLEM;
          }
        },
        () => {
          this.errorCode = ErrorCodesEnum.ACCESS_NOT_GRANTED;
        },
      );
    } else {
      this.errorCode = ErrorCodesEnum.OUTDATED_BROWSER;
    }
  }
}
