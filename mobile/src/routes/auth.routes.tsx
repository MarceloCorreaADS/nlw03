import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanagesMap from '../pages/OrphanagesMap';
import OrphanageDetails from '../pages/OrphanageDetails';
import SelectMapPosition from '../pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from '../pages/CreateOrphanage/OrphanageData';
import Header from '../components/Header';

import SignIn from '../pages/SignIn';

const AuthStack = createStackNavigator();


export default function AuthRoutes() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="OrphanagesMap"
                component={OrphanagesMap}
                options={{
                    headerShown: true,
                    header: () => <Header showCancel={false} title="Mapa de Orfanatos" />
                }}
            />
            <AuthStack.Screen
                name="OrphanageDetails"
                component={OrphanageDetails}
                options={{
                    headerShown: true,
                    header: () => <Header showCancel={false} title="Orfanato" />
                }}
            />
            <AuthStack.Screen
                name="SelectMapPosition"
                component={SelectMapPosition}
                options={{
                    headerShown: true,
                    header: () => <Header title="Selecione no mapa" />
                }}
            />
            <AuthStack.Screen
                name="OrphanageData"
                component={OrphanageData}
                options={{
                    headerShown: true,
                    header: () => <Header title="Informe os dados" />
                }}
            />
            <AuthStack.Screen name="SignIn"
                component={SignIn}
                options={{
                    headerShown: true,
                    header: () => <Header title="Acesso restrito" />
                }} />
        </AuthStack.Navigator>
    )
};