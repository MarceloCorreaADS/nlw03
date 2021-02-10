import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import * as ImagePicker from 'expo-image-picker';

import api from '../../services/api';
import { PropsTab }  from '../../routes/types';
import { useOrphanage } from '../../contexts/orphanage';
import { ActivityIndicator } from 'react-native';


interface OrphanageEditRouteParams {
  id: number;
  previousRoute: string;
}

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  register_approved: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

export default function OrphanageEdit({route, navigation} : PropsTab) {
  const { orphanage, orphanageLoad, clearOrphanage } = useOrphanage();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpening_Hours] = useState('');
  const [open_on_weekends, setOpen_on_weekends] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const params = route.params as OrphanageEditRouteParams;

  useEffect(() => {
    clearOrphanage();

    async function awaitOrphanageLoad() {
      await orphanageLoad(params.id);
    }
    awaitOrphanageLoad();
  }, [params]);

  useEffect(() => {
    setId(String(orphanage?.id));
    setName(String(orphanage?.name));
    setAbout(String(orphanage?.about));
    setInstructions(String(orphanage?.instructions));
    setOpening_Hours(String(orphanage?.opening_hours));
    setOpen_on_weekends(Boolean(orphanage?.open_on_weekends));
    setImages([]);
  }, [orphanage]);

  async function handleEditOrphanage() {

    const latitude = orphanage?.latitude;
    const longitude = orphanage?.longitude;

    const data = new FormData();
    data.append('id', id);
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('register_approved', 'true');

    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any)
    })
    
    try{
      await api.post('orphanagesUpdate', data);
      clearOrphanage();
      if(params.previousRoute === 'OrphanagesRegistered'){
        alert("Orfanato editado com sucesso!");
      }else{
        alert("Orfanato aprovado com sucesso!");
      }
      
      navigation.dangerouslyGetParent()?.navigate(params.previousRoute);
    }catch(error){
      if(error.response){
        alert(error.response.data.error);
      } else if (error.request){
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
  }

  async function handleRefuseOrphanage() {
    try{
      await api.delete(`orphanages/${orphanage?.id}`);
      alert("Orfanato recusado!");
      navigation.dangerouslyGetParent()?.navigate('OrphanagesPending');
    }catch(error){
      if(error.response){
        alert(error.response.data.error);
      } else if (error.request){
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }    
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Eita, precisamos de acesso às suas fotos...');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;

    setImages([...images, image]);

  }

  if (!orphanage) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#999' />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      {/* <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      /> */}

      <Text style={styles.label}>Fotos</Text>
      <View style={styles.uploadedImagesContainer}>
        {orphanage?.images.map(image => {
          return (
            <Image
              key={image.id}
              source={{ uri: image.url }}
              style={styles.uploadedImage}
            />
          );
        })}
        {images.map(image => {
          return (
            <Image
              key={image}
              source={{ uri: image }}
              style={styles.uploadedImage}
            />
          );
        })}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpening_Hours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={setOpen_on_weekends}
        />
      </View>
      { orphanage?.register_approved == true ? 
        (
          <RectButton style={styles.nextButton} onPress={handleEditOrphanage}>
            <Text style={styles.nextButtonText}>Confirmar</Text>
          </RectButton>
        ) : (
          <View style={styles.buttonsContainer}>
            <RectButton style={styles.refuseButton} onPress={handleRefuseOrphanage}>
              <Feather name="x-circle" size={24} style={styles.iconButton} color="#FFF" />
              <Text style={styles.nextButtonText}>Recusar</Text>
            </RectButton>
            <RectButton style={styles.acceptButton} onPress={handleEditOrphanage}>
              <Feather name="check" size={24} style={styles.iconButton} color="#FFF" />
              <Text style={styles.nextButtonText}>Aceitar</Text>
            </RectButton>
          </View>
        )
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadedImagesContainer: {
    flexDirection: 'row',
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,

  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    height: 56,
  },

  iconButton: {
    paddingRight: 5,
  },

  acceptButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
  },

  refuseButton: {
    backgroundColor: '#FF669D',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})