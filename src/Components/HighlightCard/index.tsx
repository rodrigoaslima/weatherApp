import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';


import { useTheme} from 'styled-components';
import { useWeather, } from '../../hooks/weather'

import { 
    Container,
    Header,
    Title,
    WeatherIcon,
    Footer,
    MaxTempWrapper,
    TempMax,
    TempMin,
    LoadingContainer

} from '../../Components/HighlightCard/styles';


interface Props{
    latitude: number;
    longitude: number;
}
 
interface CardWeatherProps{
    name: string;
    country: string
    temp_max: number;
    temp_min: number;
    icon: string;
}


export function HighlightCard({latitude, longitude} : Props){
    const {localweather, getLocalWeather } = useWeather();
    const theme = useTheme();

    useEffect(()=>{
        getLocalWeather();
    },[])
   
    return(
        
        <Container >

            {
                localweather.id == undefined ?
                <LoadingContainer>
                    <ActivityIndicator 
                        color={theme.colors.primary}
                        size= "large"
                    />
                </LoadingContainer>  :
                <>
                    <Header>
                        <Title>{localweather.name}</Title>
                        <Title>{localweather.country}</Title>
                    </Header>

                    <Footer>

                        <MaxTempWrapper>
                            <TempMax>
                                {`Max: ${localweather.temperature.temp_max}°`}
                            </TempMax>
                            <WeatherIcon source={{uri:`http://openweathermap.org/img/wn/${localweather.weather.icon}@2x.png`}}/>
                        </MaxTempWrapper>
                    
                        <TempMin>
                            {`Min: ${localweather.temperature.temp_min}°`}
                        </TempMin>

                    </Footer>
                
                </>
                
            }
        </Container>
 
    );
}



