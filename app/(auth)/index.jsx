import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from 'react-native-safe-area-context';
import bg from "../../assets/images/pm.jpg";
import adap from  "../../assets/images/tparent.png";
import { Redirect, router } from 'expo-router';
const SCREEN_Height = Dimensions.get("window").height;
const index = () => {
  const handlelogin = () => {
    router.replace('/(auth)/login');
  };
  const handlesignup = () => {
    router.replace('/(auth)');
  };
  return (
    <ThemedView style={styles.container}>
     {/* <Redirect href="/onboarding" /> */}
      <ThemedView style={styles.topHalf}>
      <Image
        source={bg}
        style={{ objectFit:'contain',  minHeight: 220, height:SCREEN_Height/1.1,  }}
      />
      </ThemedView>
      <ThemedView style={styles.bottomHalf}>
      <View style={{flexDirection:'row', alignItems:'center', marginTop: 5, marginBottom:10, gap: 6, justifyContent:'center'}}>
        <Image
          source={adap}
          style={{
            width: 38,
            height: 38,
            objectFit: "contain",
            alignSelf: "center",
   
          }}
        />

        <ThemedText style={{fontSize: 19, fontWeight: '900', }}>VEEZITOR</ThemedText>
        </View>
      <TouchableOpacity onPress={handlelogin}
            style={{ marginTop:18, padding: 20, backgroundColor: "#1E232C", borderRadius: 7, borderWidth:1, borderColor:'#1E232C' }}
         
          >
            <Text style={{ color: "white", textAlign: "center" }}>
            Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ padding: 20, backgroundColor: "#fff", borderRadius: 7, borderWidth:1, borderColor:'#1E232C' }}
         
          >
            <Text style={{ color: "black", textAlign: "center", borderColor:'1E232C' }}>
            Signup
            </Text>
          </TouchableOpacity>

          <View style={{marginTop: 10, backgroundColor:'transparent', }}>
      <ThemedText style={styles.mybtn}>By signing up, you agree to the Terms of Service and Data Processing Agreement</ThemedText>
      </View>
      </ThemedView>
    </ThemedView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalf: {
    flex: 1,
alignItems:'center',
    justifyContent:'center'
  },
  bottomHalf: {
    flex: 0.6,
gap:10,
    padding:20,
  },
  mybtn:{
    fontFamily: 'OutfitRegular',

    textAlign:'center'
      },
})