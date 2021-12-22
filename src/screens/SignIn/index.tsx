import React, {useState} from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useTheme } from 'styled-components';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';

import { SignInSocialButton } from '../../Components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';

import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper

} from './styles';

export function SignIn(){
    const [isLoading, setIsLoading] = useState(false)
    const {signInWithGoogle, signInWithApple} = useAuth();

    const theme = useTheme();

    async function handleSignInWithGoogle(){
        try {
            setIsLoading(true);
            return await signInWithGoogle();
        } catch (error) {
            console.log('error: ', error)
            Alert.alert('Unable to connect Google account')
            setIsLoading(false);
            
        }
        
    }

    async function handlesignInWithApplee(){
        try {
            setIsLoading(true);
            return await signInWithApple();
        } catch (error) {
            console.log('error: ', error)
            Alert.alert('Unable to connect Apple account')
            setIsLoading(false);
        }
    }



  return(
    <Container>
        <Header>
            <TitleWrapper>

                <Title>
                    See how the weather {'\n'}
                    is in your city {'\n'}
                    and 10 more
                </Title>

            </TitleWrapper>

            <SignInTitle>
                Log in with one {'\n'}
                of the accounts below
            </SignInTitle>

        </Header>
            
        <Footer>
            <FooterWrapper>
                <SignInSocialButton 
                    title="Login with Google"
                    svg={GoogleSvg}
                    onPress={handleSignInWithGoogle}
                />

                <SignInSocialButton 
                    title="Login with Apple"
                    svg={AppleSvg}
                    onPress={handlesignInWithApplee}
                />
            </FooterWrapper>

            {isLoading && <ActivityIndicator color={theme.colors.shape} style={{marginTop: 18}} /> }


        </Footer>
        
    </Container>
  );
}
