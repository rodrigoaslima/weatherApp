import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { WeatherDTO } from '../../dtos/WeatherDTO';

import { Container } from './styles';

interface Params {
  weather: WeatherDTO
}

export function Details(){
  const route = useRoute();
  const weather = route.params as Params;
 
  return(
    <Container>
      <Text>Name: {weather.data.name}</Text>
      <Text>Country: {weather.data.country}</Text>
      <Text>Temperature Max: {weather.data.temperature.temp_max}</Text>
      <Text>Temperatura Min: {weather.data.temperature.temp_min}</Text>
      <Text>Feels Like: {weather.data.temperature.feels_like}</Text>
      <Text>Humidity: {weather.data.temperature.humidity}</Text>
      <Text>Description: {weather.data.weather.description}</Text>
      <Text>Icon: {weather.data.weather.icon}</Text>
      <Text>Main: {weather.data.weather.main}</Text>
      <Text>Wind Speed: {weather.data.windSpeed}</Text>

    </Container>
  );
}
