import { Redirect, router } from "expo-router";
import {
	ActivityIndicator,
	Image,
	ImageBackground,
	StyleSheet
  } from "react-native";
  import adap from  "../assets/images/tparent.png";
  import { ThemedText } from "@/components/ThemedText";
  import { ThemedView } from "@/components/ThemedView";
  import bigbg from  "../assets/images/bigbg.png";
  import TypeWriter from 'react-native-typewriter';
import { useEffect, useContext } from "react";
import { VeeContext } from '@/components/Veecontext';
const index = () => {
  const { checkAuth} = useContext(VeeContext);
	  	// return   ;
      useEffect(() => {
        const navigateAfterTimeout = () => {
          const timer = setTimeout(async () => {
            const myAuthStatus = await checkAuth();
            console.log('myAuthStatus is', myAuthStatus);
            if (myAuthStatus) {
              router.replace('(auth)/welcomeback'); // Replace with your actual route
            } else{
              router.replace('onboarding');
            }
          }, 3000); // 3 seconds
    
          return () => clearTimeout(timer); // Cleanup the timer on unmount
        };
    
        navigateAfterTimeout();
      }, [router]);
  return (
	<ThemedView style={{flex:1}} >
		{/* <Redirect href="(tabs)/" /> */}
		      <ImageBackground
        source={bigbg}
        style={{ backgroundColor: "transparent", flex:1,  paddingHorizontal: 20, gap:0, justifyContent:'center', alignItems:'center'}}
      >

<ThemedView style={{flexDirection:'row', alignItems:'center', marginTop: 5, marginBottom:10, gap: 6, justifyContent:'center'}}>
        <Image
          source={adap}
          style={{
            width: 38,
            height: 38,
            objectFit: "contain",
            alignSelf: "center",
   
          }}
        />

        <ThemedText style={{fontSize: 19, fontWeight: '900', }}>

		<TypeWriter style={{ fontSize: 23, fontFamily:'SpaceGroteskBold'}} typing={1}>Veezitors.</TypeWriter>

		</ThemedText>

		<ActivityIndicator  />

        </ThemedView>
		<ThemedView>
		<ThemedText style={styles.subtxt}>Seamless Check-ins, Secure Access: Welcome to the Future of Visitor Management</ThemedText>
		</ThemedView>

	  </ImageBackground>
	  </ThemedView>
	
  )
}

export default index

const styles = StyleSheet.create({
	subtxt:{
		textAlign:'center',
		color:'#999'
	}
})