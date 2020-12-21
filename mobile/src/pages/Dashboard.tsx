import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { useAuth } from '../contexts/auth';


export default function Dashboard() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [load,setLoad] = useState(true);
  
  useEffect(() => {
      if (user?.isTemporaryPassword) {
        navigation.navigate('ChangePassword');
        navigation.addListener('focus', ()=>setLoad(!load))
      }
  }, [load, navigation]);
  
  return (
    <View>
      <Text>Hello World!</Text>
    </View>
  );
}