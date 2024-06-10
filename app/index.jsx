import { Redirect } from "expo-router";
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
  import TypeWriter from 'react-native-typewriter'
  
const index = () => {
	  	// return   ;
  return (
	<ThemedView style={{flex:1}} >
		<Redirect href="(auth)/welcomeback" />
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

		<TypeWriter style={{color:'black', fontSize: 23, fontFamily:'SpaceGroteskBold'}} typing={1}>Veezitors.</TypeWriter>

		</ThemedText>

		<ActivityIndicator color={'black'} />

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