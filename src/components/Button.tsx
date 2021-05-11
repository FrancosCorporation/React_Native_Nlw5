import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import colors from '../styles/colors'

interface ButtonProps extends TouchableOpacityProps{
    tittle: string;
}

export function Button({tittle, ...rest}: ButtonProps) {
    return (
        <TouchableOpacity
        style={style.button}
        activeOpacity={0.7}
        {...rest} >
            <Text style={style.buttonText}>
                {tittle}
            </Text>
        </TouchableOpacity>
    )
}
const style = StyleSheet.create({
button:{
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom:10,
    height:56,
    paddingHorizontal:10
},
buttonText:{
    color: colors.white,
    fontSize:24
}
})