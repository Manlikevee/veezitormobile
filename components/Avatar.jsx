import { StyleSheet, Text, View, Image } from 'react-native'
import mylogo from '@/assets/images/tparent.png'
import React, { useContext } from 'react'
import { ThemedText } from './ThemedText'
import { VeeContext } from "@/components/Veecontext";

const Avatar = () => {
  const {
    companySetup,
  } = useContext(VeeContext);
  return (
    <View style={{flexDirection:'row', gap: 10}} darkColor='transparent'>
    
         <View style={styles.ava} lightColor="#fff" darkColor="#1d1e22">
     {/* <ThemedText style={styles.avatext} lightColor="#000" darkColor="#ffffff99">VO</ThemedText> */}
     <Image
              source={
                companySetup && companySetup.logo
                  ? { uri: companySetup.logo }
                  : mylogo
              }
          style={{
            width: 22,
            height: 22,
            objectFit: "contain",
            alignSelf: "center",
   
          }}
        />
  
   </View>
   <View darkColor='transparent'>
<ThemedText style={{    fontSize: 13,
    }} lightColor="#000" darkColor="#ffffff99">Hello Vee</ThemedText>
<ThemedText style={{    fontSize: 11, 
    color: '#525452', fontFamily: 'OutfitRegular'}}>Welcome To Your Dashboard</ThemedText>
</View>
    </View>

  )
}

export default Avatar

const styles = StyleSheet.create({
    ava:{
        alignItems: 'center',
        justifyContent: 'center',
        color: '#E57F06',
        fontFamily: 'NunitoSanslight',
        fontWeight: '100',
        padding:4,
        marginLeft:10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor:  '#1C274C33'
      },

    avatext:{

        fontFamily: 'NunitoSanslight',
        fontWeight: '100',
        padding:1,

      },
})