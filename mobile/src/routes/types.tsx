import { DrawerNavigationProp } from "@react-navigation/drawer";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";

type RootDrawerParamList = {
    OrphanagesRegistered: undefined;
    OrphanagesPending: undefined;
    EditOrphanage: NavigatorScreenParams<RootTabParamList>;
    ChangePassword: undefined;
  };
  
  type RootTabParamList = {
    OrphanageEditInfos: { id: number, previousRoute: string };
    OrphanageEditMapPosition: undefined;
  };
  
  type ProfileScreenDrawerRouteProp = RouteProp<RootDrawerParamList, 'OrphanagesRegistered'>;
  
  type ProfileScreenDrawerNavigationProp = DrawerNavigationProp<
    RootDrawerParamList,
    'OrphanagesPending'
  >;

  type ProfileScreenTabRouteProp = RouteProp<RootTabParamList, 'OrphanageEditInfos'>;
  
  type ProfileScreenTabNavigationProp = MaterialTopTabNavigationProp<
    RootTabParamList,
    'OrphanageEditInfos'
  >;
  
  export type PropsDrawer = {
    route: ProfileScreenDrawerRouteProp;
    navigation: ProfileScreenDrawerNavigationProp;
  };

  export type PropsTab = {
    route: ProfileScreenTabRouteProp;
    navigation: ProfileScreenTabNavigationProp;
  };