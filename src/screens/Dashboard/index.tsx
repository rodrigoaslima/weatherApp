import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useCallback} from 'react';
import { ActivityIndicator } from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import { useTheme} from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { useWeather } from '../../hooks/weather';

import { HighlightCard } from '../../Components/HighlightCard';
import { WeatherCard } from '../../Components/WeatherCard';

import * as Location from 'expo-location';

import { 
    Container, 
    Header,
    UserWrapper, 
    UserInfo, 
    Photo, 
    User, 
    UserGreetings, 
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    TransactionList,
    LogoutButton,
    LoadingContainer

} from './styles';


interface UserCoordenates{
    latitude: number;
    longitude: number
}

export function Dashboard(){

    const [ isLoading, setIsLoading ] = useState(true); 
    const [ coordenates, setCoordenates ] = useState<UserCoordenates>({} as UserCoordenates);

    const theme = useTheme();
    const { signOut, user } = useAuth();
    const { getWeatherInfos, weatherInfo } = useWeather();
    
    useEffect(() =>{
        getWeatherInfos()
    },[])

    useFocusEffect(useCallback(()=>{
        getWeatherInfos()
    },[]));

    return(
        <Container>
           
            {
                weatherInfo.length === 0 ?  
                <LoadingContainer>
                    <ActivityIndicator 
                        color={theme.colors.primary}
                        size= "large"
                    />
                </LoadingContainer>  :
                <>
                    <Header>

                        <UserWrapper>

                            <UserInfo>

                                <Photo source={{uri: user.photo}}/>

                                <User>
                                    <UserGreetings> Hello,</UserGreetings>
                                    <UserName>{user.name}</UserName>
                                </User>

                            </UserInfo>

                            <LogoutButton onPress={signOut}>
                                <Icon name="power"/>
                            </LogoutButton>

                        </UserWrapper>

                    
                    </Header>

                    <HighlightCards >

                        <HighlightCard latitude={coordenates.latitude} longitude={coordenates.longitude}/> 
                        
                    </HighlightCards>

                    <Transactions>
                        <TransactionList 
                            data={weatherInfo}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({item}) => <WeatherCard data={item}/>}
                        />

                    </Transactions>
                </>
            }

        </Container>
    )
}