import styled from 'styled-components/native';
import { RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`

    background-color: ${({theme,}) => theme.colors.shape    
    };

    width: ${RFValue(300)}px;
    border-radius: 5px;

    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;

    margin-right: 16px;
  
`;

export const Header = styled.View`

    flex-direction: row;
    justify-content: space-between;


`;

export const Title = styled.Text`
    
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;

    color: ${({theme}) =>theme.colors.txt_dark};

`;

export const WeatherIcon = styled.Image`
    height: 80px;
    width: 80px;
`;

export const Footer = styled.View`

`;

export const TempMax = styled.Text`

    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(30)}px;

    color: ${({theme}) => theme.colors.txt_dark};
    margin-top: 38px;

`;

export const TempMin = styled.Text`

        font-family: ${({theme}) => theme.fonts.regular};
        font-size: ${RFValue(16)}px;

        color: ${({theme}) => theme.colors.text};
`;

export const MaxTempWrapper = styled.View`
    flex: 1;
    flex-direction: row;
    
    justify-content: space-between;
    align-items: center;
`;

export const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;

`;
