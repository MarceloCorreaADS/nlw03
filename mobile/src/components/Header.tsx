import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/auth';

interface HeaderProps {
    title: string;
    showGoBack?: boolean;
    showCancel?: boolean;
    showSignOut?: boolean;
}

export default function Header({ title, showGoBack = true, showCancel = true, showSignOut = false }: HeaderProps) {
    const navigation = useNavigation();
    const { signOut } = useAuth();

    function handleGoBackToAppHomepage() {
        navigation.navigate('OrphanagesMap');
    }
    function handleToSignOut() {
        signOut();
    }

    function handleToSignIn() {
        navigation.navigate('SignIn');
    }

    return (
        <View style={styles.container}>

            { showGoBack ? (
                <BorderlessButton onPress={navigation.goBack}>
                    <Feather name="arrow-left" size={24} color="#15b6d6" />
                </BorderlessButton>
            ) : (
                    <View />
                )}

            <Text style={styles.title}>{title}</Text>
            <View style={styles.buttonsRight}>
                {showCancel ? (
                    <BorderlessButton onPress={handleGoBackToAppHomepage} style={{ paddingRight: 10 }}>
                        <Feather name="x" size={24} color="#ff669d" />
                    </BorderlessButton>
                ) : (
                        null
                    )}

                {showSignOut ? (
                    <RectButton onPress={handleToSignOut} >
                        <Feather name="log-out" size={24} color="#ff669d" />
                    </RectButton>
                ) : (
                        <RectButton onPress={handleToSignIn}>
                            <Feather name="log-in" size={24} color="#3CDC8C" />
                        </RectButton>
                    )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 44,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    buttonsRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#8fa7b3',
        fontSize: 16,
    },
})