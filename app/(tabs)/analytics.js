import React, { useContext, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,

} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import QRCode from 'react-native-qrcode-svg';
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import Dashboardlayout from "@/components/Dashlayout";
import { useColorScheme } from "@/hooks/useColorScheme";
import mylogo from '../../assets/images/myicon.png'
import { VeeContext } from "@/components/Veecontext";
import ShimmerEffect from "@/components/ShimmerEffect";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Qrpopup from '../../components/Qrpopup';
const numColumns = 2;
const itemWidth = Dimensions.get('window').width / numColumns;
const analytics = () => {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const tabs = ['All Tags', 'In Use', 'Available Only'];
  const [activeTab, setActiveTab] = useState(0); // Default to first tab
  const {
    companySetup,
    myqrcode
  } = useContext(VeeContext);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <ThemedView style={styles.container} lightColor='transparent' darkColor='transparent'>

          {myqrcode.length >=1 ?
          (myqrcode.map(myqr =>(
            <ThemedView style={styles.red}   lightColor="#fff" darkColor="#111111"  key={myqr.id}>
              <QRCode
             color={Colors[colorScheme ?? "light"].qrcolor}
              backgroundColor='transparent'
              // color='white'
              logo={companySetup?.logo ? (companySetup.logo) : mylogo }
                  value={myqr.code_tag}
                  size={itemWidth/1.3}
                />
                <ThemedView style={{marginTop:10}}  lightColor="#fff"
                          darkColor="transparent">
                <ThemedText style={styles.mytext} lightColor="#000"
                          darkColor="#fff">#{myqr.code_tag}</ThemedText>
                </ThemedView>
                {myqr.availability ? (
                        <ThemedView lightColor='#fff' darkColor='#6d201b' style={styles.mybtn}>
                        <ThemedText lightColor="#000"
                                  darkColor="#fff"> <AntDesign name="unlock" size={20} color="black" />  Available</ThemedText>
                        </ThemedView>
                ) :
                (
                  <ThemedView lightColor='#6d201b' style={styles.mybtn}>
                  <ThemedText lightColor="#fff"
                            darkColor="#fff">
                             <AntDesign name="lock" size={20} color="white" />  UnAvailable</ThemedText>
                  </ThemedView>
                )
                }
          
           
          
              </ThemedView>
          ))) : (
            <>
                              <ShimmerEffect
                              width={itemWidth/1.16 }
                              height={80}
                              style={styles.shimmer}
                            />
                            <ShimmerEffect
                              width={itemWidth/1.16 }
                              height={80}
                              style={styles.shimmer}
                            />
                                                <ShimmerEffect
                              width={itemWidth/1.16 }
                              height={80}
                              style={styles.shimmer}
                            />
                            <ShimmerEffect
                              width={itemWidth/1.16 }
                              height={80}
                              style={styles.shimmer}
                            />
            </>
          )
          }
             
          
          
          </ThemedView>
        )
   ;
      case 1:
        return (
          <ThemedView style={styles.container} lightColor='transparent' darkColor='transparent'>

    {myqrcode.filter(myq => (!myq.availability)).length >=1 ?
          (myqrcode.filter(myq => (!myq.availability)).map(myqr =>(
            <ThemedView style={styles.red}   lightColor="#fff" darkColor="#111111"  key={myqr.id}>
              <QRCode
             color={Colors[colorScheme ?? "light"].qrcolor}
              backgroundColor='transparent'
              // color='white'
              logo={companySetup?.logo ? (companySetup.logo) : mylogo }
                  value={myqr.code_tag}
                  size={itemWidth/1.3}
                />
                <ThemedView style={{marginTop:10}}  lightColor="#fff"
                          darkColor="transparent">
                <ThemedText style={styles.mytext} lightColor="#000"
                          darkColor="#fff">#{myqr.code_tag}</ThemedText>
                </ThemedView>
                {myqr.availability ? (
                        <ThemedView lightColor='#fff' darkColor='#6d201b' style={styles.mybtn}>
                        <ThemedText lightColor="#000"
                                  darkColor="#fff"> <AntDesign name="unlock" size={20} color="black" />  Available</ThemedText>
                        </ThemedView>
                ) :
                (
                  <ThemedView lightColor='#6d201b' style={styles.mybtn}>
                  <ThemedText lightColor="#fff"
                            darkColor="#fff">
                             <AntDesign name="lock" size={20} color="white" />  UnAvailable</ThemedText>
                  </ThemedView>
                )
                }
          
           
          
              </ThemedView>
          ))) : (
            <>
                              <ShimmerEffect
                              width={itemWidth/1.16 }
                              height={80}
                              style={styles.shimmer}
                            />
                            <ShimmerEffect
                              width={itemWidth/1.16 }
                              height={80}
                              style={styles.shimmer}
                            />
                                                <ShimmerEffect
                              width={itemWidth/1.16 }
                              height={80}
                              style={styles.shimmer}
                            />
                            <ShimmerEffect
                              width={itemWidth/1.16 }
                              height={80}
                              style={styles.shimmer}
                            />
            </>
          )
          }
             
          
          
          </ThemedView>
        )
   ;
      case 2:
        return (
          <ThemedView style={styles.container} lightColor='transparent' darkColor='transparent'>

          {myqrcode.filter(myq => (myq.availability)).length >=1 ?
          
          (myqrcode.filter(myq => (myq.availability)).map(myqr =>(
            <ThemedView style={styles.red}   lightColor="#fff" darkColor="#111111"  key={myqr.id}>
              <QRCode
             color={Colors[colorScheme ?? "light"].qrcolor}
              backgroundColor='transparent'
              // color='white'
              logo={companySetup?.logo ? (companySetup.logo) : mylogo }
                  value={myqr.code_tag}
                  size={itemWidth/1.3}
                />
                <ThemedView style={{marginTop:10}}  lightColor="#fff"
                          darkColor="transparent">
                <ThemedText style={styles.mytext} lightColor="#000"
                          darkColor="#fff">#{myqr.code_tag}</ThemedText>
                </ThemedView>
                {myqr.availability ? (
                        <ThemedView lightColor='#fff' darkColor='#6d201b' style={styles.mybtn}>
                        <ThemedText lightColor="#000"
                                  darkColor="#fff"> <AntDesign name="unlock" size={20} color="black" />  Available</ThemedText>
                        </ThemedView>
                ) :
                (
                  <ThemedView lightColor='#6d201b' style={styles.mybtn}>
                  <ThemedText lightColor="#fff"
                            darkColor="#fff">
                             <AntDesign name="lock" size={20} color="white" />  UnAvailable</ThemedText>
                  </ThemedView>
                )
                }
          
           
          
              </ThemedView>
          ))) : (
            <>
                              <ShimmerEffect
                              width={itemWidth/1.16 }
                              height={80}
                              style={styles.shimmer}
                            />
                            <ShimmerEffect
                              width={itemWidth/1.16 }
                              height={80}
                              style={styles.shimmer}
                            />
                                                <ShimmerEffect
                              width={itemWidth/1.16 }
                              height={80}
                              style={styles.shimmer}
                            />
                            <ShimmerEffect
                              width={itemWidth/1.16 }
                              height={80}
                              style={styles.shimmer}
                            />
            </>
          )
          }
             
          
          
          </ThemedView>
        )
   ;
      default:
        return null;
    }
  };


const myqrcodes =[
  {
      "id": 4,
      "code_tag": "abt222222",
      "created_at": "2024-05-29T17:55:23.222965Z",
      "availability": true,
      "usage_history": [],
      "used_by": null,
      "organization": 1
  },
  {
      "id": 3,
      "code_tag": "abtxmb",
      "created_at": "2024-05-29T17:21:55.958963Z",
      "availability": false,
      "usage_history": [],
      "used_by": 8,
      "organization": 1
  },
  {
      "id": 2,
      "code_tag": "abtfreetown",
      "created_at": "2024-05-29T17:19:26Z",
      "availability": true,
      "usage_history": [],
      "used_by": null,
      "organization": 1
  },
  {
      "id": 1,
      "code_tag": "abt2123",
      "created_at": "2024-05-29T06:48:21Z",
      "availability": true,
      "usage_history": [],
      "used_by": 10,
      "organization": 1
  }
]
// const renderItem = ({ item }) => (
  
//   <View style={[styles.item, { width: itemWidth }]}>
//     <Text style={styles.title}>{item.title}</Text>
//   </View>
// );
  return (
    <Dashboardlayout>
<ThemedView style={styles.myqr}  />
<ThemedText style={styles.sectiontitle}>QRCODETAGS</ThemedText>
<TouchableOpacity style={styles.sectionbtn} onPress={toggleModal}>
  <ThemedText lightColor='white' style={styles.sectionbtntext}> <Ionicons name="qr-code-outline" size={15} color="white" />  Generate New Tag</ThemedText>
</TouchableOpacity>


<ThemedView style={styles.secs} lightColor='transparent' darkColor='transparent'>

{tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.secsitem,
              activeTab === index && styles.secsitemactive
            ]}
            onPress={() => setActiveTab(index)}
          >
            <ThemedText style={styles.sectxt}>{tab}</ThemedText>
          </TouchableOpacity>
        ))}
</ThemedView>
<Qrpopup visible={modalVisible} onClose={toggleModal}/>
{
  myqrcode? (renderContent()) : ( 
    <ThemedView style={styles.container} lightColor='transparent' darkColor='transparent'>
    <ShimmerEffect
    width={itemWidth/1.16 }
    height={80}
    style={styles.shimmer}
  />
  <ShimmerEffect
    width={itemWidth/1.16 }
    height={80}
    style={styles.shimmer}
  />
                      <ShimmerEffect
    width={itemWidth/1.16 }
    height={80}
    style={styles.shimmer}
  />
  <ShimmerEffect
    width={itemWidth/1.16 }
    height={80}
    style={styles.shimmer}
  />
</ThemedView>)
}



    </Dashboardlayout>

  )
}

export default analytics

const styles = StyleSheet.create({
  red:{
    borderRadius: 4,
borderWidth: 1,
borderColor:'#1f1f1f1d',
    padding: 12,
  width:itemWidth/1.11,
  gap:3,
  // alignItems:'center',
  justifyContent:'center'
  },
  myqr:{
    marginTop:10,
  },
  sectiontitle:{
fontFamily: 'SpaceGroteskMedium',
fontSize: 19
  },
  sectionbtn:{
backgroundColor:'#6a1039',
padding:10,
flexDirection:'row',
alignItems:'center',
gap:3,
justifyContent:'center',
flexShrink: 1,
marginBottom:10,
alignSelf: 'flex-start', // Ensures the container fits its content
borderRadius:5
  },
  sectionbtntext:{
    fontFamily: 'SpaceGroteskMedium',
    fontSize: 14,

  },
  container: {
    flexDirection: 'row',

    gap: 10, // Gap between rows
    flexWrap: 'wrap'
  },
  mytext:{
    alignSelf:'center',
    fontSize:14,
    fontFamily: 'SpaceGroteskMedium',
  },
  mybtn:{
    flex: 1,
    padding:7,
    borderRadius:3,
    alignItems:'center',
    justifyContent:'center',
    borderWidth: 1,
    borderColor: '#6d201b'
  },
  secs:{
    flexDirection: 'row',
marginBottom:6,
marginTop:5,
    gap: 10, // Gap between rows
    flexWrap: 'wrap'
  },

  secsitem:{
padding:4,
borderBottomWidth:3,
borderColor:'transparent'
  },
  secsitemactive:{
    borderColor:'#6d201b'
  },
  sectxt:{
    alignSelf:'center',
    fontSize:15,
    fontFamily: 'SpaceGroteskMedium',
  }
})