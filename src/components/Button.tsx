import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import colors from '../styles/colors'

interface ButtonProps extends TouchableOpacityProps {
    titleButton: string;
}

export function Button({ titleButton, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity
            style={style.button}
            activeOpacity={0.7}
            {...rest}>
            <Text style={style.buttonText}>
                {titleButton}
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
        height: 70,
        paddingHorizontal: 10
    },
    buttonText: {
        color: colors.white,
        fontSize: 24
    }
})