import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackRouters from './stack.routes'
import 'react-native-gesture-handler' ; 

const Routes= () =>(
    <NavigationContainer>
        <StackRouters/>
    </NavigationContainer>
)
export default Routes;