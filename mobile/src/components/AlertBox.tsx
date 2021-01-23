import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface HeaderProps {
  text: string;
}

export default function Header({ text }: HeaderProps) {

  return (
      <View style={styles.box}>
          <Feather name="alert-octagon" size={33} color="#FFD700" />
          <Text style={styles.boxText}>
            { text }
          </Text>
      </View>
    )
}

const styles = StyleSheet.create({
    box:{
        backgroundColor: '#FFFACD',
        paddingLeft: 5,
        paddingVertical: 14,
        paddingRight: 32,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#FFD700',
        borderWidth: 1,
    },

    boxText:{
        fontFamily: 'Nunito_600SemiBold',
        color: '#5c8599',
        lineHeight: 18,
        fontSize: 14,
        marginLeft: 5,
    }
})