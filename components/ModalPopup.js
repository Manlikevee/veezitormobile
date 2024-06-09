// ModalPopup.js
import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Dimensions, Pressable, ActivityIndicator  } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import LottieView from 'lottie-react-native';
import ScanScreen from '@/components/ScanScreen'
import { CameraView, useCameraPermissions } from 'expo-camera';
// import scannerimg from '../assets/images/scanner.png' 
import { ToastAndroid } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { VeeContext } from "@/components/Veecontext";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const ModalPopup = ({ visible, onClose }) => {
  const { axiosInstance } = useContext(VeeContext);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scanneddata, setScanneddata] = useState('')
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(false);
  const handleCodeScanned = (data) => {
    console.log(data.data);setScanneddata(data.data)
    ToastAndroid.show(`Successfully scanned ${data.data}`, ToastAndroid.SHORT);
    setIsCameraActive(false); // Stop the camera
  };
  function activatecam(){
    setIsCameraActive(!isCameraActive)
  }

  function rescan(){
    setScanneddata('')
    setIsCameraActive(true)
  }

  const handleLogout = async () => {
    if (isLoading) {
      ToastAndroid.show('Please Wait', ToastAndroid.SHORT);
      return;
    }
    



    
    if (!scanneddata) {
      ToastAndroid.show('Kindly Scan Tag To Continue', ToastAndroid.SHORT);
      return;
    }
  
    setIsLoading(true);
    
    try {
      const url = `/logoutqr? tag_id=${scanneddata}`
      const response = await axiosInstance.get(url);
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      console.log(response.data);
    } catch (error) {
      console.log(error)
      if (error.response) {
        ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('An error occurred', ToastAndroid.SHORT);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <ThemedView style={styles.modalOverlay} lightColor='' >
        <ThemedView style={styles.modalContent} >
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <AntDesign name="closecircleo" size={24} color="#f2f2f2" />
          </TouchableOpacity>
          <ThemedText style={styles.modalText} lightColor='#000000e0' darkColor='#f2f2f2'>Scan the QR code using your mobile device. to process your check-out quickly and efficiently.</ThemedText>

  { !permission && (<Text>ssssssssssssss</Text>)}
  {permission?.granted && (
    <ThemedView style={styles.cameraview} darkColor='transparent'>
    {isCameraActive ? (
      <CameraView style={styles.camera}
      barcodeScannerSettings={{ barCodeTypes: ['qr'] }}
              onBarcodeScanned={handleCodeScanned} 
      >
      <ScanScreen>
            <View style={styles.buttonContainer}>
              {/* <TouchableOpacity style={styles.button} >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity> */}
            </View>
            </ScanScreen>
          </CameraView>
    ): !isCameraActive && !scanneddata ? (
      <ThemedView style={styles.myplaceholder} lightColor='#fff' darkColor='#2b2b2b'>
            {/* <Image
              source={scannerimg}
              style={{
                width: '100%',
                height:  SCREEN_HEIGHT/3,
                objectFit: "cover",
                alignSelf: "center",
       
              }}
            /> */}
                  <LottieView
        autoPlay
        // ref={animation}
        style={{
          width: '100%',
          height:  SCREEN_HEIGHT/3,
          backgroundColor: '#eee',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/images/lottie.json')}
      />
        </ThemedView>
    ) : ('') }

    {scanneddata && !isCameraActive && (
                       <LottieView
                       autoPlay
                       // ref={animation}
                       style={{
                         width: '100%',
                         height:  SCREEN_HEIGHT/3.5,
                         backgroundColor: 'transparent',
                       }}
            
                       source={require('../assets/images/done.json')}
                     /> 
    )}
          {!isCameraActive &&  !scanneddata && (
            <ThemedView lightColor='#000' darkColor='#fff' style={styles.inactiveCameraView}>
            <Pressable  onPress={activatecam} style={{flexDirection: 'row', gap: 10, alignItems:'center', flexGrow:1, width:'100%', alignItems:'center', justifyContent:'center',   padding: 14, borderRadius: 6}}>
            <AntDesign name="camerao" size={24} color="black" />
              <ThemedText lightColor='white' darkColor='black' style={styles.text}>Start Scan</ThemedText>
            </Pressable>
            </ThemedView>
          )}
    
    {isCameraActive &&  (
            <ThemedView lightColor='#000' darkColor='#fff' style={styles.inactiveCameraView}>
            <Pressable  onPress={activatecam} style={{flexDirection: 'row', gap: 10, alignItems:'center', flexGrow:1, width:'100%', alignItems:'center', justifyContent:'center',   padding: 14, borderRadius: 6}}>
            <AntDesign name="camerao" size={24} color="black" />
              <ThemedText lightColor='white' darkColor='black' style={styles.text}>Stop Scan</ThemedText>
            </Pressable>
            </ThemedView>
          )}
    
    </ThemedView>
  )}
<ThemedView style={styles.cameraview}>
{!permission?.granted && (
  <Text>Unable To Access Camera</Text>
)}
  
{
scanneddata && (
  <ThemedView style={{flexDirection:'row',  gap:20}}>

<Pressable onPress={handleLogout} style={{flexGrow:1,}}>
<ThemedView style={{width:'100%', padding:10, alignItems:'center', borderRadius:5}} lightColor='#1D61E7' darkColor='#1D61E7'>
  {isLoading? (<ActivityIndicator size="small" color="#fff" />) : (<ThemedText lightColor='white'>Logout {scanneddata}</ThemedText>)}


</ThemedView>
</Pressable>
{!isLoading && (
  <Pressable onPress={rescan}>
  
  <ThemedView lightColor='white' darkColor='#f9f9f9' style={{ padding:10, alignItems:'center'}}>
  <AntDesign name="reload1" size={17} color="black" />
  </ThemedView>
  </Pressable>
)}


</ThemedView>
  )
}

</ThemedView>

          <ThemedText style={styles.foottext}>The QR Code will be automaticly detected when you position it between the guide lines</ThemedText>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  inactiveCameraView:{


    alignItems:'center',
    borderRadius:4,
  },
  text:{
fontSize:16
  },
  camera: {
   height: SCREEN_HEIGHT/3
  },
  myplaceholder:{
gap: 4,
padding:3,
borderRadius:6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '100%',
    // flex: 0.7,
    // backgroundColor: '#fff',
    gap: 10,
    padding: 20,
    borderRadius: 3,
    alignItems: 'center',
  },

  cameraview:{
padding:10,
// backgroundColor:'red',
width: '100%',
borderRadius:3,
gap: 10
  },
  foottext:{
fontSize: 16,
textAlign:'center'
  },
  modalText: {
    fontSize: 16,
    textAlign:'center',
    marginBottom: 0,
  },
  closeButton: {
    backgroundColor: '#007bff',
    padding: 2,
    borderRadius: 10,
    alignSelf:'flex-end',
    marginBottom:0
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ModalPopup;
