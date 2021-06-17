import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Button } from '../components/Button';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/core';


interface Params {
    title: string;
    subtitle: string;
    titleButton: string;
    icon: 'smile' | 'hub';
    nextScreen: string;
}
const emojis = {
    hub: '😉',
    smile: '😍',
}



export function Confirmation() {
    const navigation = useNavigation();
    const routes = useRoute();
    const {
        title,
        subtitle,
        titleButton,
        icon,
    } = routes.params as Params;

    const [userName, setUserName] = useState<string>('');

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@react_native_nlw5:user');
            setUserName(user || '');
        }
        loadStorageUserName();
    }, []);

    function targeting() {
        navigation.navigate('PlantSelect');
    }

    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.form}>
                    <Text style={styles.emoji}>
                        {emojis[icon]}
                    </Text>
                    <Text style={styles.tittle}>
                        {title}
                    </Text>
                    <Text style={styles.subtittle}>
                        {subtitle}
                    </Text>
                    <Button titleButton={titleButton} style={styles.button} onPress={targeting} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },
    emoji: {
        fontSize: 60
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    tittle: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    subtittle: {
        fontSize: 15,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 25,
        fontFamily: fonts.heading,
        borderRadius: 16,
        marginBottom: 10,
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.15,
        paddingHorizontal: 10
    }
})
