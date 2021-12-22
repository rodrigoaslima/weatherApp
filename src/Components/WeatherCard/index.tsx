import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { WeatherDTO } from '../../dtos/WeatherDTO'

import { 
    Container,
    Title,
    MaxTemp,
    Footer,
    Category,
    MinTemp,
    Country,
    Wrapper
} from './styles';

interface Props{
    data: WeatherDTO
}


export function WeatherCard({data}:Props){
    const navigation = useNavigation();

    function handleGetDetails(){
        navigation.navigate('Details',{data})
    }


    return( 
        <Container>
            <Wrapper onPress={handleGetDetails}>
                <Title>{data.name}</Title>

                <MaxTemp>
                    {`Max: ${data.temperature.temp_max}°C`}
                </MaxTemp>

                <Footer>

                    <Category>
                        <MinTemp>{`Min: ${data.temperature.temp_min}°C`}</MinTemp>
                    </Category>
    
                    <Country>{data.country}</Country>

                </Footer>
            </Wrapper>

        </Container>
    )
}
