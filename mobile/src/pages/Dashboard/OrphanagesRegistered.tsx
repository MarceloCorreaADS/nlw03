import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';

import { useAuth } from '../../contexts/auth';
import AlertBox from '../../components/AlertBox';
import mapMarkerImg from '../../images/map-marker.png';
import noDataImg from '../../images/no-data.png';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesRegistered() {
  const { user } = useAuth();
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  });

  function handleNavigateToEditOrphanage() {

  }

  function handleNavigateToExcludeOrphanage() {

  }


  return (
    <View>
      { user?.isTemporaryPassword ?
        <AlertBox text="Sua senha é temporária. Por favor troque sua senha!" />
        :
        null
      }

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
                        <RectButton style={styles.bottomBarButton} onPress={handleNavigateToEditOrphanage}>
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