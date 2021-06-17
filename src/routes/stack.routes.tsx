import React from 'react'
import colors from '../styles/colors'
import { createStackNavigator } from '@react-navigation/stack';
import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSave } from '../pages/PlantSave';
import { MyPlants } from '../pages/MyPlants';
import AuthRoutes from './tab.routes';

const stackRoutes = createStackNavigator();
const AppRoutes: React.FC = (navigation) => (
    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            },
        }}>
        <stackRoutes.Screen
            name='Welcome'
            component={Welcome} />

        <stackRoutes.Screen
            name='UserIdentification'
            component={UserIdentification} />

        <stackRoutes.Screen
            name='Confirmed'
            component={Confirmation} />

        <stackRoutes.Screen
            name="PlantSelect"
            component={AuthRoutes} />

        <stackRoutes.Screen
            name="PlantSave"
            component={PlantSave} />

    </stackRoutes.Navigator>
)
export default AppRoutes;