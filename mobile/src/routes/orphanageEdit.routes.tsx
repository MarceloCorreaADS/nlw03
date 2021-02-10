import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feather } from '@expo/vector-icons';
import OrphanageEditInfos from '../pages/OrphanageEdit/OrphanageEditInfos';
import OrphanageEditMapPosition from '../pages/OrphanageEdit/OrphanageEditMapPosition';

type RootDrawerParamList = {
  OrphanageEditInfos: { id: number, previousRoute: string };
  OrphanageEditMapPosition: undefined;
};

const Tab = createMaterialTopTabNavigator<RootDrawerParamList>();

export default function orphanageEdit() {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          if (route.name === 'OrphanageEditInfos') {
            return <Feather name="file-text" size={20} color={color} />
          } else if (route.name === 'OrphanageEditMapPosition') {
            return <Feather name="map" size={20} color={color} />
          };
        },
      })}
      tabBarOptions={{
        activeTintColor: '#15C3D6',
        inactiveTintColor: 'gray',
        pressColor: '#15C3D6',
        showIcon: true,
        indicatorStyle: { backgroundColor: '#15C3D6'},
        iconStyle: { flexDirection: 'row' },
        showLabel: false
      }}
    >
      <Tab.Screen name="OrphanageEditInfos" options={{ title: 'Informações' }} component={OrphanageEditInfos} />
      <Tab.Screen name="OrphanageEditMapPosition" options={{ title: 'Localização' }} component={OrphanageEditMapPosition} />
    </Tab.Navigator>
  );
};