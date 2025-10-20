import { WeatherStation, WeatherApp } from './observer';

describe('Weather Station Observer Pattern', () => {
  let weatherStation: WeatherStation;
  let flutterApp: WeatherApp;
  let reactApp: WeatherApp;

  beforeEach(() => {
    weatherStation = new WeatherStation();
    flutterApp = new WeatherApp('Flutter WeatherApp');
    reactApp = new WeatherApp('React Native WeatherApp');
  });

  test('should allow apps to subscribe to weather updates', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    weatherStation.subscribe(flutterApp);

    expect(consoleSpy).toHaveBeenCalledWith('New subscriber: Flutter WeatherApp');
  });

  test('should notify all subscribed apps when weather changes', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    weatherStation.subscribe(flutterApp);
    weatherStation.subscribe(reactApp);
    weatherStation.setWeather('Raining');

    expect(consoleSpy).toHaveBeenCalledWith('Weather updated from Sunny to Raining');
    expect(consoleSpy).toHaveBeenCalledWith('Flutter WeatherApp new clima update now is: Raining');
    expect(consoleSpy).toHaveBeenCalledWith(
      'React Native WeatherApp new clima update now is: Raining',
    );
  });

  test('should allow apps to unsubscribe from weather updates', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    weatherStation.subscribe(flutterApp);
    weatherStation.subscribe(reactApp);
    weatherStation.unsubscribe(reactApp);
    weatherStation.setWeather('Cloudy');

    expect(consoleSpy).toHaveBeenCalledWith('React Native WeatherApp: has unsubscribed');
    expect(consoleSpy).toHaveBeenCalledWith('Flutter WeatherApp new clima update now is: Cloudy');
    expect(consoleSpy).not.toHaveBeenCalledWith(
      'React Native WeatherApp new clima update now is: Cloudy',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
