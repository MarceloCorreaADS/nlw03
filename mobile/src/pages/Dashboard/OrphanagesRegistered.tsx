import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';
import noDataImg from '../../images/no-data.png';

import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import { PropsDrawer }  from '../../routes/types';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesRegistered({navigation} : PropsDrawer) {
  const { user } = useAuth();
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (user?.isTemporaryPassword) {
      navigation.navigate('ChangePassword');
      navigation.addListener('focus', ()=>setLoad(!load))
    }
  }, [load, navigation]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  });

  function handleNavigateToEditOrphanage(id: number) {
    navigation.navigate('EditOrphanage', {
      screen: 'OrphanageEditInfos',
      params: { id : id },
    });
  }

  function handleNavigateToExcludeOrphanage() {

  }
  return (
    <View>
      {
        orphanages.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Image source={noDataImg} />
            <Text style={styles.noDataText}>Nenhum no momento</Text>
          </View>
        ) : (
            <ScrollView>
              <View style={styles.topBar}>
                <Text style={styles.orphanageCountText}>
                  {orphanages.length}
                  { orphanages.length === 1 ? (
                      " Orfanato"
                    ) : (
                      " Orfanatos"
                    )
                  }
                </Text>
              </View>
              {orphanages.map(orphanage => {
                return (
                  <View key={orphanage.id} style={styles.mapContainer}>
                    <MapView
                      initialRegion={{
                        latitude: orphanage.latitude,
                        longitude: orphanage.longitude,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008,
                      }}
                      zoomEnabled={false}
                      pitchEnabled={false}
                      scrollEnabled={false}
                      rotateEnabled={false}
                      style={styles.mapStyle}
                    >
                      <Marker
                        icon={mapMarkerImg}
                        coordinate={{
                          latitude: orphanage.latitude,
                          longitude: orphanage.longitude
                        }}
                      />
                    </MapView>

                    <View style={styles.bottomBarContainer}>
                      <Text style={styles.bottomBarText}>{orphanage.name}</Text>
                      <View style={styles.bottomBarButtonsContainer}>
                        <RectButton style={styles.bottomBarButton} onPress={() => handleNavigateToEditOrphanage(orphanage.id)}>
                          <Feather name="edit-3" size={20} color="#15C3D6" />
                        </RectButton>
                        <RectButton style={styles.bottomBarButton} onPress={handleNavigateToExcludeOrphanage}>
                          <Feather name="trash-2" size={20} color="#15C3D6" />
                        </RectButton>
                      </View>

                    </View>
                  </View>
                );
              })}
            </ScrollView>
          )}
    </View>
  );
}

const styles = StyleSheet.create({

  topBar: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },

  orphanageCountText:{
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: '#8FA7B2'
  },

  noDataContainer: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  noDataText: {
    fontSize: 20,
    fontFamily: 'Nunito_600SemiBold',
    marginTop: 10,
    color: "#8FA7B2",
  },

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#D3E2E5',
    marginTop: 15,
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  bottomBarContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  bottomBarText: {
    fontFamily: 'Nunito_700Bold',
    color: '#4D6F80'
  },

  bottomBarButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomBarButton: {
    width: 40,
    height: 40,
    backgroundColor: '#EBF2F5',
    borderRadius: 10,
    marginLeft: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
})