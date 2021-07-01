import React from "react";
import { WeatherData } from "../interfaces/WeatherAPIInterfaces";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default function WeatherTemperatureCard({
  weatherData,
}: {
  weatherData: WeatherData;
}) {
  return (
    <Card style={{ margin: "3em" }}>
      <CardContent>
        <Typography color="textPrimary" gutterBottom>
          Current Temperature: {weatherData.main.temp}&deg;C
        </Typography>
        <Typography color="textPrimary" gutterBottom>
          Feels Like: {weatherData.main.feels_like}&deg;C
        </Typography>
        <Typography color="textPrimary" gutterBottom>
          Minimum Temperature: {weatherData.main.temp_min}&deg;C
        </Typography>
        <Typography color="textPrimary" gutterBottom>
          Maximum Temperature: {weatherData.main.temp_max}&deg;C
        </Typography>
      </CardContent>
    </Card>
  );
}
