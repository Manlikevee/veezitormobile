import {
    Alert,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Vibration,
    Dimensions,
    ImageBackground,
    Image,
    ScrollView,
    View,
    Text,
    ActivityIndicator,
  } from "react-native";
  import React, { useEffect, useState, useContext } from "react";
  import { Colors } from "@/constants/Colors";
  import { useColorScheme } from "@/hooks/useColorScheme";
  import { FontAwesome6 } from "@expo/vector-icons";
  import { Link } from "expo-router";
  import { ToastAndroid } from "react-native";
  import * as SecureStore from "expo-secure-store";
  import { router } from "expo-router";
  import axios from "axios";
  import { VeeContext } from "@/components/Veecontext";
  import bg from "../../assets/images/union.png";
  import bg12 from "../../assets/images/BG12.png";
  import bg21 from "../../assets/images/BG21.png";
  import { StatusBar } from "react-native";
  import { Redirect } from "expo-router";
  import adap from  "../../assets/images/tparent.png";
  import { ThemedText } from "../../components/ThemedText";
  import { ThemedView } from "../../components/ThemedView";
  import { MaterialIcons } from '@expo/vector-icons';
  import { FontAwesome5 } from '@expo/vector-icons';
  
const welcomeback = () => {
    const url = "https://veezitorbackend.vercel.app/token/";
    const colorScheme = useColorScheme();
    const [password, setPassword] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const {fetchVisitors, fetchQrCode, fetchEmployeeData, fetchCompanySetup,
      authenticated, setAuthenticated, checkAuth, isauth , setisauth, refreshAccessToken, username
    } = useContext(VeeContext);
    
    useEffect(() => {
      const navigateIfAuthenticated = async () => {
        const myAuthStatus = await checkAuth();
        console.log('myAuthStatus is', myAuthStatus);
        if (!myAuthStatus) {
          router.replace('onboarding');
        } 
        else if(myAuthStatus && isauth){
          router.replace('(tabs)/');
        }
      };
  
      navigateIfAuthenticated();
      
    }, [router, isauth]);

    async  function setmyauth(){
setIsloading(true)
      try {
        const result = await refreshAccessToken();
        if (result) {
          
          setisauth(true)
          setIsloading(false)
        } else {
          console.log("failed");
          setIsloading(false)
        }
      } catch (error) {
        console.log("failed");
        setIsloading(false);
      }

    }
    const submitform = async () => {
      const navigation = router;
  
      setIsloading(true);
  
      const data = {
        username: username,
        password: password,
      };
  
      if (username && password) {
        try {
          const response = await axios.post(url, data, {
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          // Successful login
          ToastAndroid.show('Login successfully', ToastAndroid.SHORT);
  
          await SecureStore.setItemAsync("access_token", response.data.access);
          await SecureStore.setItemAsync("refresh_token", response.data.refresh);
          fetchCompanySetup();
          setisauth(true);
          setIsloading(false);
  
          setTimeout(() => {
            navigation.replace("/(tabs)");
          }, 1500);
        } catch (error) {
          // Failed login
          ToastAndroid.show( error?.response?.data?.message || "Invalid Username or Password", ToastAndroid.SHORT);
          console.log(error || "Invalid Username or Password");
          setIsloading(false);
        }
      } else {
        setIsloading(false);
      }
    };
  
    const handleLogout = async () => {
      console.log('handle logout')
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('refresh_token');
      await SecureStore.deleteItemAsync('userdata_token');
      setAuthenticated(false);
      setisauth(false);
      router.replace('onboarding');
    };

  return (
<>
<ThemedView style={{flex:1}}>
<ThemedView lightColor="transparent" >
<ImageBackground source={bg12} style={{height:200}}>

</ImageBackground>
</ThemedView>
<ImageBackground 
        source={bg}
        style={{ backgroundColor: "transparent", flex:1,  paddingHorizontal: 0, gap:0, justifyContent:'center', alignItems:'center', flexGrow:1}}
      > 
<ThemedView lightColor="transparent"     style={{
        flex: 1,
        gap: 6,
        paddingVertical:2,
        paddingHorizontal:0,
        justifyContent:'center',

        flexGrow:1,
        width:'90%'
      }} >
               <View style={{flexDirection:'row', alignItems:'center', marginTop: -5, marginBottom:20, gap: 6, justifyContent:'flex-start'}}>
        <Image
          source={adap}
          style={{
            width: 28,
            height: 28,
            objectFit: "contain",
            alignSelf: "center",
   
          }}
        />

        <ThemedText style={{fontSize: 17, fontWeight: '900', fontFamily: 'SpaceGroteskBold',
        lineHeight: 32, }}>VEEZITOR</ThemedText>
        </View>
<ThemedView lightColor="transparent">
<ThemedText style={styles.welcometxt}>Welcome Back</ThemedText>
    <ThemedText style={styles.welcometxt}>{username}</ThemedText>
</ThemedView>


  <ThemedText style={styles.bigtxt}>Please enter your password to proceed:</ThemedText>   
    <ThemedText
            style={{
              fontSize: 15,
              fontFamily: 'SpaceGroteskMedium',
            }}
          >
            Enter Password
          </ThemedText>
          <TextInput
            autoCapitalize="none"
            style={[
              {
                borderColor: Colors[colorScheme ?? "light"].cardborderColor,
                color:Colors[colorScheme ?? "light"].qrcolor
              },
              styles.input,
            ]}
            placeholder="Password"
            placeholderTextColor={ Colors[colorScheme ?? "light"].icon}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          
          <Text
            style={{
              color: "#3C9AFB",
              fontFamily: 'OutfitRegular',
              fontSize: 13,
      textAlign:'right'
            }}
          >
            <Link href="(auth)/login">Forgot Password?</Link>
          </Text>

   

          <ThemedView   lightColor="transparent"   style={{ gap: 6,  marginTop: 15, flexDirection:'row' }}>
          <TouchableOpacity
            style={{ padding: 15, backgroundColor: "#1D61E7", borderRadius: 5, flexGrow:1 }}
            onPress={submitform}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              {isLoading ? ( <ActivityIndicator size="small" color="#fff" />
) : ( 'Login'
)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 15, backgroundColor: "#1D61E7", borderRadius: 5 }}
            onPress={setmyauth}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              {isLoading ? ( <ActivityIndicator size="small" color="#fff" />
) : (<MaterialIcons name="fingerprint" size={24} color="white" />
)}
            </Text>
          </TouchableOpacity>
        </ThemedView>

        <TouchableOpacity onPress={handleLogout}>
        <Text
            style={{
              color: "#3C9AFB",
              fontFamily: 'OutfitRegular',
              fontSize: 15,
              gap:5,
      textAlign:'center',
      marginTop:10
            }}
          >
            Not You?  Signout
           
          </Text>
 </TouchableOpacity>     
  

        <ThemedView lightColor="#EBEBFF" style={{flexDirection:'row', gap: 5, alignItems:'center', padding:12, gap: 10, justifyContent:'space-between', marginTop:20}}>
            <ThemedView lightColor="transparent" darkColor="transparent" style={{flexDirection:'row', gap:10, alignItems:'center'}}>
            <FontAwesome5 name="user-circle" size={18} color="black" />
            <ThemedView style={{ backgroundColor:'transparent', }}>
<ThemedText lightColor="#564FFD">Create An Account</ThemedText>
<ThemedText lightColor="#666">I Dont Have An Account</ThemedText>
    </ThemedView>

 
            </ThemedView>
            <TouchableOpacity style={{padding:8, backgroundColor:'#1D61E7', borderRadius:4, alignItems:'center'}}>
        <ThemedText lightColor="white">Signup</ThemedText>
    </TouchableOpacity>
</ThemedView>
    </ThemedView>

    </ImageBackground>
</ThemedView>


</>



  )
}

export default welcomeback

const styles = StyleSheet.create({
    input: {
        fontFamily: "OutfitRegular",
        // width: "100%",
        borderWidth: 1,
        borderRadius: 4,
        padding: 7,
        paddingHorizontal: 13,
        fontSize: 14,
        height: 46,
        backgroundColor: "transparent",
      },
      bigtxt: {
        fontSize: 15,
 
        marginBottom: 5,
      },
      welcometxt:{
        fontSize: 28,    
        fontFamily: 'SpaceGroteskBold',
        lineHeight: 32, // Set the line height here
      }
})