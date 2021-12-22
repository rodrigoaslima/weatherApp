
import React from 'react';
import {StatusBar} from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import AppLoading from 'expo-app-loading';
import { AuthProvider, useAuth } from './src/hooks/auth';
import { WeatherProvider, useWeather} from './src/hooks/weather'
import { Routes } from './src/routes';

import {ThemeProvider} from 'styled-components'




import {
  useFonts, //Hooks para usar fonts
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme';



export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });
  
  const { userStorageLoading } = useAuth();

  if(!fontsLoaded || userStorageLoading ){
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content"/>
      <AuthProvider>
        <WeatherProvider>
          <Routes />
        </WeatherProvider>
      </AuthProvider>
    </ThemeProvider>
    
  );
}

