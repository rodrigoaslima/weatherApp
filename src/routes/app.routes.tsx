import React from "react";
import { useTheme } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';

import { Dashboard } from '../screens/Dashboard';
import { Details } from '../screens/Details';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes(){

    const theme = useTheme();

    return(
        <Navigator 
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="Dashboard"
                component={Dashboard}
                
            />

            <Screen
                name="Details"
                component={Details}
                
            />

        </Navigator>
        
    )

}