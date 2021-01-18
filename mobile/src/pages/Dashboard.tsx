import React, { useEffect, useState } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { useAuth } from '../contexts/auth';

import AlertBox from '../components/AlertBox';


export default function Dashboard() {
  const { user } = useAuth();
  return (
    <View>
      { user?.isTemporaryPassword ? 
        <AlertBox text="Sua senha é temporária. Por favor troque sua senha!" />
        :
        null
      }
      <Text>Hello World!</Text>
    </View>
  );
}