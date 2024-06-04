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
import bg from "../../assets/images/Head.png";
import { StatusBar } from "react-native";
import { Redirect } from "expo-router";
import fb from  "../../assets/images/fb.png";
import google from  "../../assets/images/google.png";
import adap from  "../../assets/images/vector.png";
const Page = () => {
  const url = "https://veezitorbackend.vercel.app/token/";
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState("vee");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("vee");
  const { fetchCompanySetup } = useContext(VeeContext);
  const [isLoading, setIsloading] = useState(false);
  // const bg = ''


  const validateEmail = (text) => {
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   if (!text) {
    //     setEmailError('Please enter your email address.');
    //   } else if (!emailRegex.test(text)) {
    //     setEmailError('Please enter a valid email address.');
    //   } else {
    //     setEmailError('');
    //   }
  };

  const submitform = async () => {
    const navigation = router;

    setIsloading(true);

    const data = {
      username: email,
      password: password,
    };

    if (email && password) {
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

        // Save access and refresh tokens to SecureStore

        // const token = response.data.access;
        // const arrayToken = token.split('.');
        // const tokenPayload = JSON.parse(atob(arrayToken[1]));
        // console.log(tokenPayload);

        setIsloading(false);

        setTimeout(() => {
          navigation.replace("/(tabs)/product");
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

  return (
    
    <ScrollView
      style={{
        flex: 1,
        gap: 6,

        backgroundColor: "white",
      }}
    >

      <StatusBar barStyle={'light'} />
      <ImageBackground
        source={bg}
        style={{ backgroundColor: "red", minHeight: 220, paddingHorizontal: 25, gap:7, justifyContent:'center'}}
      >
 
  
        <Text
          style={{
            fontSize: 20,
            textAlign: "start",
            fontSize: 32,
            fontFamily: "SpaceGroteskBold",
            paddingVertical: 0,
            color: 'white',
            // fontWeight: '900'
          }}
        >
          Sign in to your Account
        </Text>
        <Text style={styles.subtext}>Don’t have an account? Signup</Text>
      </ImageBackground>
    
      <View
        style={{
          gap: 0,
          justifyContent: "start",
          flex: 1,
          paddingHorizontal: 25,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: 35
        }}
        lightColor="#fff"
      >
               <View style={{flexDirection:'row', alignItems:'center', marginTop: 5, marginBottom:10, gap: 6, justifyContent:'center'}}>
        <Image
          source={adap}
          style={{
            width: 18,
            height: 18,
            objectFit: "contain",
            alignSelf: "center",
   
          }}
        />

        <Text style={{fontSize: 15, fontWeight: '900', color: 'black'}}>VEEZITOR</Text>
        </View>
        <View style={{ gap: 6,  }}>
          <Text
            style={{
              paddingVertical: 3,
              fontSize: 14,
              fontWeight: "400",
              fontFamily: "OutfitRegular",
              color: "#000",
            }}
          >
            Username
          </Text>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              validateEmail(text);
            }}
          />
          <Text style={styles.errorMessage}>{emailError}</Text>
        </View>

        <View style={{ gap: 6,  }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              marginTop: 0,
              fontFamily: "OutfitRegular",
              color: "#000",
            }}
          >
            Enter Password
          </Text>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <Text style={styles.errorMessage}></Text>
        </View>

        <View
          style={{
            marginTop: -6,
            alignSelf: "flex-end",
        
            paddingBottom: 9,
          }}
        >
          <Text
            style={{
              color: "#3C9AFB",
              fontFamily: 'OutfitRegular',
              fontSize: 13,
      
            }}
          >
            <Link href="(auth)/login">Forgot Password?</Link>
          </Text>
        </View>
        <View style={{ gap: 6,  marginTop: 9 }}>
          <TouchableOpacity
            style={{ padding: 20, backgroundColor: "#1D61E7", borderRadius: 7 }}
            onPress={submitform}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              {isLoading ? ( <ActivityIndicator size="small" color="#fff" />
) : ( 'Login'
)}
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            gap: 6,
            paddingHorizontal: 10,
            marginTop: 29,
            textAlign: "center",
            fontFamily: 'OutfitRegular'
          }}
        >
Or login with <Link href="(auth)">Create Account</Link>{" "}
        </Text>

        <View style={{justifyContent:'space-between', flexDirection:'row', gap: 5, width: '100%', paddingTop: 20}}>
          <TouchableOpacity style={styles.socialbtn}>
          <Image
          source={google}
          style={{
            width: 18,
            height: 18,
            objectFit: "cover",
            alignSelf: "center",

          }}
        />
         <Text style={styles.mybtn}>Google</Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles.socialbtn}>
          <Image
          source={fb}
          style={{
            width: 18,
            height: 18,
            objectFit: "cover",
            alignSelf: "center",
       
          }}
        />
         <Text style={styles.mybtn}>Google</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 30, backgroundColor:'transparent', }}>
      <Text style={styles.mybtn}>By signing up, you agree to the Terms of Service and Data Processing Agreement</Text>
      </View>
      </View>

   
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  mybtn:{
fontFamily: 'OutfitRegular',
color: '#1A1C1E',
textAlign:'center'
  },

  socialbtn:{
    backgroundColor:'white',
    width: '47%',
    padding: 13,
    flexDirection: 'row',
    gap: 10,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#eee'
  },
  otpInput: {
    width: 50,
    height: 50,

    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
    marginHorizontal: 5,
    fontSize: 24,
    fontWeight: "800",
    borderRadius: 4,
    fontFamily: "NunitoSansRegular",
  },
  button: {
    width: 100,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "transparent",
  },
  buttonInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "800",
    borderRadius: 4,
    fontFamily: "NunitoSansRegular",
  },
  input: {
    fontFamily: "OutfitRegular",
    width: "100%",
    color: "#1A1C1E",
    borderColor: "#CFCFCF",
    borderWidth: 1,
    borderRadius: 4,
    padding: 7,
    paddingHorizontal: 13,
    fontSize: 14,
    height: 46,
    backgroundColor: "transparent",
  },
  bigtxt: {
    fontSize: 22,
    fontFamily: "Soraxxl",
    marginBottom: 5,
  },
  errorMessage: {
    color: "#a92f41",
    fontSize: 12,
    paddingBottom: 2,
    paddingTop: 2,
    textAlign: "right",
  },
  subtext: {
    fontSize: 14,
    color: "#ccc",
    paddingBottom: 20,
    paddingTop: 4,
    textAlign: "start",
    fontFamily: 'OutfitRegular'
  },
});
