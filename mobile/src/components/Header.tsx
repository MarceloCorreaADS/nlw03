import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../contexts/auth';

interface HeaderProps{
    title: string;
    showCancel?: boolean;
    showSignOut ?: boolean;
}

export default function Header({title, showCancel = true, showSignOut = false}: HeaderProps){
    const navigation = useNavigation();
    const { signOut } = useContext(AuthContext);

    function handleGoBackToAppHomepage(){
        navigation.navigate('OrphanagesMap');
    }
    function handleToSignOut(){
        signOut();
    }

    return(
        <View style={styles.container}>
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color="#15b6d6" />
            </BorderlessButton>

           <Text style={styles.title}>{title}</Text>

           { showCancel ? (
                <BorderlessButton onPress={handleGoBackToAppHomepage}>
                    <Feather name="x" size={24} color="#ff669d" />
                </BorderlessButton>
            ) :  (
               <View />
           )}

            { showSignOut ? (
                <BorderlessButton onPress={handleToSignOut}>
                    <Text>Sair</Text>
                </BorderlessButton>
            ) :  (
               <View />
            )}
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

    title:{
        fontFamily: 'Nunito_600SemiBold',
        color: '#8fa7b3',
        fontSize: 16,
    },
})