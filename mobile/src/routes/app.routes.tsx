import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Header from '../components/Header';

const AppStack = createStackNavigator();


export default function appRoutes(){
    return(
            <AppStack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' }}}>
                <AppStack.Screen 
                name="Dashboard" 
                component={Dashboard} 
                options={{
                    headerShown: true,
                    header: () => <Header showGoBack={false} showCancel={false} title="Dashboard" showSignOut={true} />
                }}
                />
            </AppStack.Navigator>
    )
};