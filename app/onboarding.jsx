import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import { OnboardFlow } from 'react-native-onboard';
import { router } from "expo-router";
import { StatusBar } from 'react-native';
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
const onboarding = () => {
  const colorScheme = useColorScheme();
  
  const handleDone = () => {
    router.replace('/(auth)');
  };
  return (
    <View>
       <StatusBar barStyle={'dark'} />
<OnboardFlow
// pageStyle={
//   styles.mybg
// }
style={{backgroundColor: Colors[colorScheme ?? "light"].background}}
onDone={handleDone}

titleStyle={[
  {
    color: Colors[colorScheme ?? "light"].text,
  },
  styles.mytt,
]}
subtitleStyle={
  styles.mytts
}
      pages={[
        {
          title: 'Welcome To Veezitors',
          subtitle: 'A visitor management system solution tailored to your workplace needs',
          imageUri: Image.resolveAssetSource(require('../assets/images/vms.png')).uri
        },
        {
          title: 'Optimize Your Front Desk',
          subtitle: 'Enhance workplace security, visitor experience, and brand image',
          imageUri: Image.resolveAssetSource(require('../assets/images/vmsorder.png')).uri
        },
        {
          title: 'Revolutionize Visitor Management',
          subtitle: 'Elevate the visitor registration process with our touchless visitor management system',
          imageUri: Image.resolveAssetSource(require('../assets/images/vmstwo.png')).uri
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
  },
  mybg:{
    backgroundColor:'red'
  }
})