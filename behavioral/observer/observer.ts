interface Observer {
  update(weatherData: string): void;
  name: string;
}

export class WeatherStation {
  private observers: Array<Observer> = [];
  private weatherData = 'Sunny';

  subscribe(observer: Observer): void {
    this.observers.push(observer);
    console.log(`New subscriber: ${observer.name}`);
  }

  unsubscribe(unsubscriber: Observer): void {
    this.observers = this.observers.filter((observer) => observer.name !== unsubscriber.name);

    console.log(`${unsubscriber.name}: has unsubscribed`);
  }

  setWeather(weatherData: string): void {
    console.log(`Weather updated from ${this.weatherData} to ${weatherData}`);
    this.weatherData = weatherData;
    this.notifyObservers();
  }

  private notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.weatherData);
    }
  }
}

export class WeatherApp implements Observer {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  update(weatherData: string): void {
    console.log(`${this.name} new clima update now is: ${weatherData}`);
  }
}

function main(): void {
  const weatherStation = new WeatherStation();

  const flutterWeatherApp = new WeatherApp('Flutter WeatherApp');
  const reactNativeWeatherApp = new WeatherApp('React Native WeatherApp');
  const weatherTrackerApp = new WeatherApp('Weather Tracker App');

  weatherStation.subscribe(flutterWeatherApp);
  weatherStation.subscribe(reactNativeWeatherApp);

  weatherStation.setWeather('Raining');

  weatherStation.subscribe(weatherTrackerApp);
  weatherStation.setWeather('Cloudy');

  weatherStation.unsubscribe(reactNativeWeatherApp);
  weatherStation.setWeather('Storm');
}

main();
