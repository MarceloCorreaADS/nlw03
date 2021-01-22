import React from 'react';
import { Feather } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

import Header from '../components/Header';
import OrphanagesRegistered from '../pages/Dashboard/OrphanagesRegistered';
import OrphanagesPending from '../pages/Dashboard/OrphanagesPending';
import ChangePassword from '../pages/Auth/ChangePassword';
import editOrphanage from '../routes/editOrphanage.routes';

import { useAuth } from '../contexts/auth';
import { Route } from '@react-navigation/native';

type RootDrawerParamList = {
  OrphanagesRegistered: undefined;
  OrphanagesPending: undefined;
  editOrphanage: { id: number };
  ChangePassword: undefined;
};

const AppDrawer = createDrawerNavigator<RootDrawerParamList>();



function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { signOut } = useAuth();



  const {state, ...rest} = props;
  const newState = { ...state };
  newState.routes = newState.routes.filter((item) => item.name !== "editOrphanage");

  function handleToSignOut() {
    return signOut();
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList state={newState} {...rest} />
      <DrawerItem label="Sair" icon={({ focused, color, size }) => <Feather name="log-out" size={24} color="#ff669d" />} onPress={handleToSignOut} />
    </DrawerContentScrollView>
  );
}

export default function appRoutes() {

  return (
    <AppDrawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
      drawerStyle={{
        backgroundColor: '#f2f3f5',
        width: 240,
      }}
    >
      <AppDrawer.Screen
        name="OrphanagesRegistered"
        component={OrphanagesRegistered}
        options={{
          headerShown: true,
          header: () => <Header showGoBack={false} showCancel={false} title="Orfanatos Cadastrados" showDrawerMenu={true} />
        }}
      />
      <AppDrawer.Screen
        name="OrphanagesPending"
        component={OrphanagesPending}
        options={{
          headerShown: true,
          header: () => <Header showGoBack={true} showCancel={false} title="Cadastros Pendentes" showDrawerMenu={true} />
        }}
      />
      <AppDrawer.Screen
        name="editOrphanage"
        component={editOrphanage}
        options={{
          headerShown: true,
          header: () => <Header showGoBack={true} showCancel={false} title="Editar Orfanato" showDrawerMenu={true} />
        }}
      />
      <AppDrawer.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: true,
          header: () => <Header showGoBack={true} showCancel={false} title="Alterar Senha" showDrawerMenu={true} />
        }}
      />
    </AppDrawer.Navigator>
  )
};