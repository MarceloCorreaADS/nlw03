import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';

import MapView, { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';
import { useOrphanage } from '../../contexts/orphanage';

export default function OrphanageEditMapPosition() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const { orphanage } = useOrphanage();

  useEffect(() => {
    if(orphanage){
      setPosition({latitude: orphanage.latitude , longitude: orphanage.longitude});
    }
  }, [orphanage]);

  useEffect(() => {
    if(orphanage){
      orphanage.latitude = position.latitude;
      orphanage.longitude = position.longitude;
    }
  }, [position]);

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  if (!orphanage) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#999' />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        { position.latitude !== 0 && (
          <Marker 
          icon={mapMarkerImg}
          coordinate={{ latitude: position.latitude, longitude: position.longitude }}
        />
        )}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})