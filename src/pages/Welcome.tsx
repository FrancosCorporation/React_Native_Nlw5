import React, {useState} from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import wateringImg from '../assets/watering.png';
import {Button} from '../components/Button';

export function Welcome() {
    const [visible, setVisible] = useState(false);
    function handleVisibility() {
        setVisible(!visible)
    }
    
    return (
        <View style={style.container}>
        <Text style={style.title}>
                Arqui vamos {'\n'}ter um marco {'\n'} historico !
        </Text>
            {visible && <Image source={wateringImg} style={style.image}/>}
        <Text style={style.subtitle}>
                Este vai ser minha primeira vigarisse
        </Text >
        <Button tittle="Mostrar" onPress={handleVisibility}/>
       
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    title:{
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38
    },
    subtitle:{
        fontSize: 18,
        textAlign: 'center',
        color: colors.heading,
        paddingHorizontal: 20
    },
    image:{
        width:292,
        height:294
    },

})