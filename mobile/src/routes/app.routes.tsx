import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import OrphanagesMap from '../pages/OrphanagesMap';
import OrphanageDetails from '../pages/OrphanageDetails';
import SelectMapPosition from '../pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from '../pages/CreateOrphanage/OrphanageData';
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
                    header: () => <Header showCancel={false} title="Dashboard" showSignOut={true} />
                }}
                />
                <AppStack.Screen 
                    name="OrphanagesMap" 
                    component={OrphanagesMap} 
                />
                <AppStack.Screen 
                    name="OrphanageDetails" 
                    component={OrphanageDetails} 
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato" />
                    }}
                />
                <AppStack.Screen 
                    name="SelectMapPosition" 
                    component={SelectMapPosition} 
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione no mapa" />
                    }}
                />
                <AppStack.Screen 
                    name="OrphanageData" 
                    component={OrphanageData} 
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados" />
                    }}
                />
            </AppStack.Navigator>
    )
};