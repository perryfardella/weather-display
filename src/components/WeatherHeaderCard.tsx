import React from "react";
import { WeatherData } from "../interfaces/WeatherAPIInterfaces";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default function WeatherHeaderCard({
  weatherData,
}: {
  weatherData: WeatherData;
}) {
  let iconURL =
    "http://openweathermap.org/img/wn/" +
    weatherData.weather[0].icon +
    "@2x.png";

  return (
    <Card style={{ margin: "3em" }}>
      <CardContent>
        <Typography color="textPrimary" gutterBottom>
          Location: {weatherData.name}
        </Typography>
        <Typography color="textPrimary" gutterBottom>
          {weatherData.weather[0].description}
        </Typography>
        <img src={iconURL} alt="An icon depciting the current weather" />
      </CardContent>
    </Card>
  );
}
