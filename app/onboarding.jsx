import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { OnboardFlow } from 'react-native-onboard';
import { router } from "expo-router";
import { StatusBar } from 'react-native';
const onboarding = () => {
  
  const handleDone = () => {
    router.replace('/(auth)');
  };
  return (
    <View>
       <StatusBar barStyle={'dark'} />
<OnboardFlow
onDone={handleDone}
titleStyle={
styles.mytt
}
subtitleStyle={
  styles.mytts
}
      pages={[
        {
          title: 'Welcome To Veezitors',
          subtitle: 'A visitor management system solution tailored to your workplace needs',
          imageUri: 'https://raw.githubusercontent.com/Manlikevee/myimg/main/vms.png',
        },
        {
          title: 'Optimize Your Front Desk',
          subtitle: 'Enhance workplace security, visitor experience, and brand image',
          imageUri: 'https://raw.githubusercontent.com/Manlikevee/myimg/main/vmsorder.png',
        },
        {
          title: 'Revolutionize Visitor Management',
          subtitle: 'Elevate the visitor registration process with our touchless visitor management system',
          imageUri: 'https://github.com/Manlikevee/myimg/blob/main/vmstwo.png?raw=true',
        }

      ]}
      type={'fullscreen'}
    />

    </View>
  )
}

export default onboarding

const styles = StyleSheet.create({
  mytt:{
    fontFamily: 'OutfitRegular',
  },
  mytts:{
    fontFamily: 'OutfitRegular',

    textAlign:'center',
    fontSize: 16
  }
})