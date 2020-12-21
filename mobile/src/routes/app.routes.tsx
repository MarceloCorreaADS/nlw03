import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';
import Dashboard from '../pages/Dashboard';
import ChangePassword from '../pages/Auth/ChangePassword';

const AppStack = createStackNavigator();

export default function appRoutes() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
      <AppStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: true,
          header: () => <Header showGoBack={false} showCancel={false} title="Dashboard" showSignOut={true} />
        }}
      />
      <AppStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: true,
          header: () => <Header showGoBack={true} showCancel={false} title="Alterar Senha" showSignOut={true} />
        }}
      />
    </AppStack.Navigator>
  )
};