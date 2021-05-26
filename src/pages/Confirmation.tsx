import React, { Children } from 'react'
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
import Routes from '../routes/index';

const Head = '😉';
const tittleButton = 'Avançar';
const tittle = 'Conseguimos !';



export function Confirmation() {
    const subtittle = 'Agora ' +   + ' vamos começar a cuidar do cochilo !'
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.form}>
                    <Text style={styles.emoji}>
                        {Head}
                    </Text>
                    <Text style={styles.tittle}>
                        {tittle}
                    </Text>
                    <Text style={styles.subtittle}>
                        {subtittle}
                    </Text>
                    <Button title={tittleButton} style={styles.button} />
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
