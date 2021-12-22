import axios from 'axios';
import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';

const { API_KEY } = process.env;

interface WeatherProviderProps{
    children: ReactNode
}

interface WeatherDetais{
    main: string;
    description: string;
    icon: string;
}

interface temperatureDetails{
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number
}

interface WeatherDTO{
    id: number;
    name: string;
    country: string;
    weather: WeatherDetais;
    temperature: temperatureDetails;
    windSpeed: number
}

interface IWeatherContextData{
    weatherInfo: WeatherDTO[];
    localweather: WeatherDTO;
    getWeatherInfos: ()=> Promise<void>
    getLocalWeather: ()=> Promise<void>
}

const WeatherContext = createContext({ } as IWeatherContextData);

function WeatherProvider({children}: WeatherProviderProps){
    const [ weatherInfo, setWeatherInfo ] = useState<WeatherDTO[]>([])
    const [ localweather, setLocalweather] = useState<WeatherDTO>({} as WeatherDTO)

    async function getWeatherInfos(){
        try {
            const response = await axios.get('http://api.openweathermap.org/data/2.5/group?id=2267057,3117735,6455259,2950158,2618425,3169070,2643743,2964574,3067696,2761369&units=metric&appid=1e1fef4e1e0be793fa604cc3d4ab7f10')
            const infos:WeatherDTO[] =  response.data.list.map((element: any) => {
            
                return{
                    id: element.id,
                    name: element.name,
                    country: element.sys.country,
                    weather: {
                        main: element.weather[0].main,
                        description: element.weather[0].description,
                        icon: element.weather[0].icon,
                    },
                    temperature:{
                        temp: element.main.temp,
                        temp_max: element.main.temp_max,
                        temp_min: element.main.temp_min,
                        feels_like: element.main.feels_like,
                        humidity: element.main.humidity
                    },
                    windSpeed: element.wind.speed
                }
            });
            setWeatherInfo(infos);
        } catch (error) {
            console.log('ERROR:', error);
        }

        
    }

    async function getLocalWeather(){
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const { coords } = location;
        const {latitude, longitude} = coords
        
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);
            
            const infos:WeatherDTO ={
                id: response.data.id,
                name: response.data.name,
                country: response.data.sys.country,
                weather: {
                    main: response.data.weather[0].main,
                    description: response.data.weather[0].description,
                    icon: response.data.weather[0].icon,
                },
                temperature:{
                    temp: response.data.main.temp,
                    temp_max: response.data.main.temp_max,
                    temp_min: response.data.main.temp_min,
                    feels_like: response.data.main.feels_like,
                    humidity: response.data.main.humidity
                },
                windSpeed: response.data.wind.speed
            };
            setLocalweather(infos);
            
        } catch (error) {
            console.log('ERROR: ', error)
        }

    }

    return(
        <WeatherContext.Provider value={{ getWeatherInfos, weatherInfo, getLocalWeather, localweather}}>
            {children}
        </WeatherContext.Provider>
    );
}

function useWeather(){
    const context = useContext(WeatherContext);
    return context;
}

export { WeatherProvider, useWeather}

