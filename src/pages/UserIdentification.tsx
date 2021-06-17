import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Button } from '../components/Button';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import AsynStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

const Header = '😎';
const titlleButton = 'Confirme';
const titlle = 'Me conta \n seu nome?';
export function UserIdentification() {
    const navigation = useNavigation();
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>('');


    function handleImputBlur() {
        setIsFocused(false);
        setIsFilled(!!name)
    }
    function handleImputFocus() {
        setIsFocused(true);
    }
    function handleImputChange(value: string) {
        setIsFilled(!!value);
        setName(value);
    }
    async function setNameUser() {
        try {
            if(name!=''){
                await AsynStorage.setItem('@react_native_nlw5:user', name);
                navigation.navigate('Confirmed',{
                    title:"Prontinho \n"+name,
                    icon:'hub',
                    subtitle:"Então agora vamos começar a cadastrar as plantinhas",
                    titleButton:'Mãos a obra'
                });
            }
            else Alert.alert('Vamos la! Quero saber seu nome..')
            
        } catch {
            Alert.alert('Não foi Possivel salvar o seu Nome.')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.content}>
                    <View style={styles.form}>
                        <Text style={styles.emoji}>
                            {isFilled ? Header : Header}
                        </Text>
                        <Text style={styles.tittle}>
                            {titlle}
                        </Text>
                        <TextInput
                            placeholder='Digite seu nome'
                            style={[
                                styles.input,
                                (isFocused || isFilled) &&
                                { borderColor: colors.green }
                            ]}
                            onBlur={handleImputBlur}
                            onFocus={handleImputFocus}
                            onChangeText={handleImputChange} />
                        <Button
                            titleButton={titlleButton}
                            style={styles.button}           
                            onPress={() => setNameUser()}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
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
        fontSize: 44
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
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 25,
        fontFamily: fonts.heading,
        borderRadius: 16,
        marginBottom: 10,
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.15,
        paddingHorizontal: 10
    }
})