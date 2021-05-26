import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import colors from '../styles/colors'

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    way?: string;
    onPress?: any;
    name?: string;
}

export function Button({ title, name, way = '', onPress, ...rest }: ButtonProps) {
    const navigation = useNavigation();
    function handleStart() {
        if (way != '') {
            navigation.navigate({ name: way, params: { name: name } });
        }
        else {
            onPress()
        }
    }
    return (
        <TouchableOpacity
            style={style.button}
            activeOpacity={0.7}
            {...rest}
            onPress={handleStart} >
            <Text style={style.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
const style = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        paddingHorizontal: 10
    },
    buttonText: {
        color: colors.white,
        fontSize: 24
    }
})