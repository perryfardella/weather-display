import React, { useEffect } from "react";
import { apiKey } from "./api-key/API.key";
import "./App.css";
import AppBar from "./components/AppBar";
import { WeatherData } from "./interfaces/WeatherAPIInterfaces";
import Alert from "@material-ui/lab/Alert";
import WeatherHeaderCard from "./components/WeatherHeaderCard";
import WeatherTemperatureCard from "./components/WeatherTemperatureCard";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  const [weatherData, setWeatherData] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    ""
  );

  useEffect(() => {
    let timer: number | null = null;

    function success(position: GeolocationPosition) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      fetchWeatherInfo(position.coords.latitude, position.coords.longitude);
      timer = window.setInterval(async () => {
        await fetchWeatherInfo(
          position.coords.latitude,
          position.coords.longitude
        );
      }, 1000 * 60 * 10);
    }

    // For the sake of time, I won't properly handle all the possible geolocation error codes here.
    function error(err: GeolocationPositionError) {
      setErrorMessage("Error receiving your geographical position.");
    }

    navigator.geolocation.getCurrentPosition(success, error);

    // Clear interval if it exists
    return () => {
      timer && clearInterval(timer);
    };
  }, []);

  async function fetchWeatherInfo(latitude: number, longitude: number) {
    const link: string = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(link);
      const weatherData: WeatherData = await response.json();
      console.log(response);
      console.log(weatherData);
      if (response.status !== 200) {
        setErrorMessage(weatherData.message);
      } else {
        setWeatherData(weatherData);
      }
    } catch (error) {
      setErrorMessage(error);
      console.log(error);
    }
  }

  return (
    <div className="App">
      <AppBar />
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {/* With more time I'd split the data here so I wasn't passing the entire weather Data to the component as it only nedds a subset of the data */}
      {(weatherData as WeatherData).main && !errorMessage ? (
        <WeatherHeaderCard weatherData={weatherData as WeatherData} />
      ) : (
        <CircularProgress />
      )}
      {(weatherData as WeatherData).main && (
        <WeatherTemperatureCard weatherData={weatherData as WeatherData} />
      )}
    </div>
  );
}

export default App;
