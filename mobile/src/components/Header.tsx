import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  showGoBack?: boolean;
  showCancel?: boolean;
  showDrawerMenu?: boolean;
}

export default function Header({ title, showGoBack = true, showCancel = true, showDrawerMenu = false }: HeaderProps) {
  const navigation = useNavigation();

  function handleGoBackToAppHomepage() {
    navigation.navigate('OrphanagesMap');
  }

  function handleToSignIn() {
    navigation.navigate('SignIn');
  }
  
  function handleToOpenDrawer() {
    navigation.dispatch(DrawerActions.toggleDrawer());
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

        {showDrawerMenu ? (
          <RectButton onPress={handleToOpenDrawer} >
            <Feather name="user" size={24} color="#3CDC8C" />
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