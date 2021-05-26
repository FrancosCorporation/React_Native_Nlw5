import React, {useState} from 'react';
import { Image, View, Text, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import colors from '../styles/colors';
import wateringImg from '../assets/watering.png';
import {Button} from '../components/Button';
import fonts from '../styles/fonts';

export function Welcome() {
    const [visible, setVisible] = useState(false);
    const [ImageName, setVisibleName] = useState("Show");
       function handleVisibility() {
        setVisible(!visible)
        if(ImageName=='Show'){
            setVisibleName('hide')
        }
        else setVisibleName('Show')
    }
        
    return (
        <SafeAreaView style={style.container}>
        <View style={style.wrapper}>
        <Text style={style.title}>
                Arqui vamos {'\n'}ter um marco {'\n'} historico !
        </Text>
            {visible && <Image
            source={wateringImg}
            style={style.image}
            resizeMode="contain" />}
        <Text style={style.subtitle}>
                Este vai ser minha primeira vigarisse
        </Text >
        <Button title={ImageName} onPress={handleVisibility} />
        <Button title="Next Page" way={'UserIdentification'}/>
       
        </View>
        </SafeAreaView>
    );
}
const style = StyleSheet.create({
    container: {
        flex: 1
    },
    title:{
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight:34
    },
    subtitle:{
        fontSize: 18,
        textAlign: 'center',
        color: colors.heading,
        paddingHorizontal: 20,
        fontFamily: fonts.text,
    },
    image:{
        height:Dimensions.get('window').width * 0.7
    },
    wrapper:{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    show:{
        borderRadius: 16,
    }

})