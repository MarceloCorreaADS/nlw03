import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feather } from '@expo/vector-icons';
import OrphanageEdit from '../pages/EditOrphanage/OrphanageEdit';
import OrphanageEditMapPosition from '../pages/EditOrphanage/OrphanageEditMapPosition';

type RootDrawerParamList = {
  Dados: { id: number };
  Mapa: undefined;
};

const Tab = createMaterialTopTabNavigator<RootDrawerParamList>();

export default function appRoutes() {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          if (route.name === 'Dados') {
            return <Feather name="file-tex" size={20} color={color} />
          } else if (route.name === 'Mapa') {
            return <Feather name="map" size={20} color={color} />
          };
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Dados" component={OrphanageEdit} />
      <Tab.Screen name="Mapa" component={OrphanageEditMapPosition} />
    </Tab.Navigator>
  );
};