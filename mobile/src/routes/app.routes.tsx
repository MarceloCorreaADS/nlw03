import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import Dashboard from '../pages/Dashboard';
import ChangePassword from '../pages/Auth/ChangePassword';
import { Feather } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import { useAuth } from '../contexts/auth';

const AppDrawer = createDrawerNavigator();

function CustomDrawerContent(props : DrawerContentComponentProps) {
  const { signOut } = useAuth();

  function handleToSignOut() {
    return signOut();
  } 
  
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Sair" icon={({ focused, color, size }) => <Feather name="log-out" size={24} color="#ff669d" />} onPress={handleToSignOut} />
    </DrawerContentScrollView>
  );
}

export default function appRoutes() {

  return (
    <AppDrawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} {...navigator} />}
      screenOptions={{ headerShown: false}} 
      drawerStyle={{
        backgroundColor: '#f2f3f5',
        width: 240,
      }} 
    >
      <AppDrawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: true,
          header: () => <Header showGoBack={false} showCancel={false} title="Dashboard" showSignOut={true} />
        }}
      />
      <AppDrawer.Screen
        name="Alterar Senha"
        component={ChangePassword}
        options={{
          headerShown: true,
          header: () => <Header showGoBack={true} showCancel={false} title="Alterar Senha" showSignOut={true} />
        }}
      />
    </AppDrawer.Navigator>
  )
};