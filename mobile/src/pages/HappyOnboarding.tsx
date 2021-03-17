import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import Onboarding, { DotProps } from 'react-native-onboarding-swiper';

import onboarding01 from '../images/onboarding01.png';
import onboarding02 from '../images/onboarding02.png';

//Para fins de teste Logout destrói o storage de alreadyLaunched, tirar ao finalizar Onboarding

export default function OrphanagesMap() {
  const navigation = useNavigation();

  const Dots = ( props: DotProps) => {
    let backgroundColor;
    let width;

    width = props.selected ? 25 : 10;
    backgroundColor = props.selected ? '#FFD152' : '#BECFD8';

    return (
        <View 
            style={{
                width:width,
                height: 5,
                borderRadius: 4,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
  }

  const Next = ({ ...props }) => (
    <RectButton style={styles.createOrphanageButton} {...props} >
      <Feather name="arrow-right" size={20} color="#D1EDF2" />
    </RectButton>
  );

  const Done = ({ ...props }) => (
    <RectButton style={styles.createOrphanageButton} {...props} >
      <Feather name="check" size={20} color="#D1EDF2" />
    </RectButton>
  );


  return (
    <Onboarding
      NextButtonComponent={Next}
      DotComponent={Dots}
      DoneButtonComponent={Done}
      titleStyles={styles.textTitleOnboarding}
      subTitleStyles={styles.textSubTitleOnboarding}
      bottomBarHighlight={false}
      showSkip={false}
      onDone={() => navigation.navigate("OrphanagesMap")}
      onSkip={() => navigation.navigate("OrphanagesMap")}
      pages={[
        {
          backgroundColor: '#F2F3F5',
          image: <Image style={styles.imagesOnboarding1} source={onboarding01} />,
          titleStyles: styles.textTitleOnboardingSpecific1,
          title: 'Leve \nfelicidade \npara o \nmundo',
          subtitle: 'Visite orfanatos e mude o dia de muitas crianças.',
        },
        {
          backgroundColor: '#F2F3F5',
          image: <Image style={styles.imagesOnboarding2} source={onboarding02} />,
          titleStyles: styles.textTitleOnboardingSpecific2,
          title: 'Escolha um\norfanato no mapa\ne faça uma visita',
          subtitle: '',
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15B6D6',
    borderRadius: 20,
    marginBottom: 30,
    marginRight: 30,

    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitleOnboardingSpecific1: {
    fontSize: 40,
    textAlign: 'left',
    marginLeft: -120,
  },
  textTitleOnboardingSpecific2: {
    fontSize: 30,
    textAlign: 'right',
    marginBottom: 10,
    marginRight: -45
  },
  textTitleOnboarding: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#0089A5',
  },
  textSubTitleOnboarding: {
    fontSize: 20,
    fontFamily: 'Nunito_600SemiBold',
    color: '#5C8599',
    textAlign: 'left',
    marginLeft: 18,
  },
  imagesOnboardingContainer: {
    marginTop: -100,
    marginBottom: -50,
    paddingTop: 0,
  },
  imagesOnboarding1: {
    resizeMode: "contain",
    width: 200,
    height: 200,
    marginTop: -90,
    marginBottom: -60,
  },
  imagesOnboarding2: {
    resizeMode: "contain",
    width: 350,
    height: 350,
    marginTop: -60,
    marginBottom: -40,
  },
});