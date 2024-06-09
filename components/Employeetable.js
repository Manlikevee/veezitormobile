import { StyleSheet, Text, TextInput, View,TouchableOpacity, FlatList ,  Image,Dimensions, ActivityIndicator, Pressable } from 'react-native'
import { ThemedView } from '@/components/ThemedView';
import { EvilIcons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import  {Colors}  from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import bg from "../assets/images/avatar.png";
import successicon from '../assets/images/success.png' 
import pendicon from '../assets/images/pend.png' 
import myline from '../assets/images/line.png' ;
import ShimmerEffect from './ShimmerEffect';
import { useRef, useState, useCallback, useContext, useMemo, React } from "react";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView,
    BottomSheetBackdrop,
    BottomSheetFooter
  } from "@gorhom/bottom-sheet";


const Employeetable = ({data }) => {
    const [isOpen, setOpen] = useState(false);
    const bottomSheetModalRef = useRef(null);
    const SCREEN_WIDTH = Dimensions.get("window").width;
    const snapPoints = ["30%","45%",  "50%", "50%", "85%" ];

  async  function handlePresentModal(id) {
    
        bottomSheetModalRef.current?.present();
      //   console.log('loading accept is', loadingaccept)
      // const bsr =  await  toggleVisitorBar(id);
     
        setTimeout(() => {
            setOpen(true);
        }, 400);
      }



  
    const colorScheme = useColorScheme();


  return (

        <ThemedView style={styles.mytable} lightColor='transparent' darkColor='transparent'>
        <ThemedView 
         darkColor="#111111"
                  style={[
                    {
                      borderColor: Colors[colorScheme ?? "light"].cardborderColor,
                    },
                    styles.myinput,
                  ]}
        
        >
            <ThemedView style={styles.minicion}  darkColor="#111111">
            <EvilIcons name='search' size={25} style={{color:Colors[colorScheme ?? "light"].icon}} />
            </ThemedView>
       
            <TextInput
            placeholderTextColor={ Colors[colorScheme ?? "light"].qrcolor}
            style={{        paddingVertical: 5,
        backgroundColor:'transparent',
        width:'78%',
        fontFamily: 'OutfitLight',
        
        color:Colors[colorScheme ?? "light"].icon }}  placeholder='Search By Name'/>
            <ThemedView lightColor='#efefef' style={styles.minicion}>
            <MaterialCommunityIcons name='format-list-checkbox'  size={22}  style={{color:Colors[colorScheme ?? "light"].icon}}  />
            </ThemedView>
      
        </ThemedView>


        {data.length >= 1 &&  (
                    data.map((info, index) => (       
                        <TouchableOpacity key={info.ref}
                        // onPress={() => handlePresentModal(info.ref)}
                        >
                        <ThemedView
                         darkColor="#111111"
                        style={[
                            {
                              borderColor: Colors[colorScheme ?? "light"].cardborderColor,
                            },
                            styles.mbx,
                          ]}
                        >
                            <ThemedView  darkColor="#111111" style={{flexDirection:'row', gap:10, alignItems:'center'}}>
                            <ThemedView  darkColor="#111111" style={{backgroundColor:'#fff2ea',  padding:7,    flexDirection: 'row',
                            alignSelf: 'flex-start', height: 39, width: 39, alignItems:'center', justifyContent:'center', borderRadius:50 }}>
                           <ThemedText lightColor='#93312b' darkColor='#93312b' >
                             {info?.first_name.charAt( 0)}
      {info?.last_name.charAt(0)}</ThemedText>
                           </ThemedView>
                           <ThemedText lightColor='#000' >{info?.first_name} {info?.last_name}</ThemedText>
                            </ThemedView>
                        
                        <ThemedView  darkColor="#111111" style={{justifyContent:'space-between', flexDirection:'row'}}>
                            <ThemedText style={styles.placeholder} lightColor='#000' >Email</ThemedText>
                            <ThemedText style={styles.actualtext} lightColor='#6b788e' >{info?.email} </ThemedText>
                        </ThemedView>
                        <ThemedView  darkColor="#111111" style={{justifyContent:'space-between', flexDirection:'row'}}>
                            <ThemedText style={styles.placeholder}  lightColor='#000' >Phone Number</ThemedText>
                            <ThemedText style={styles.actualtext}  lightColor='#000' >{info?.phone_number}</ThemedText>
                        </ThemedView>
                        <ThemedView  darkColor="#111111" style={{justifyContent:'space-between', flexDirection:'row'}}>
                            <ThemedText style={styles.placeholder}  lightColor='#000' >Gender</ThemedText>
                            <ThemedText style={styles.actualtext}  lightColor='#000' >{info?.gender} </ThemedText>
                        </ThemedView>
                        
                        <ThemedView  darkColor="#111111" style={{justifyContent:'space-between', flexDirection:'row'}}>
                            <ThemedText style={styles.placeholder} lightColor='#000' >staff_id</ThemedText>
                            <ThemedText style={styles.actualtext} lightColor='#000' >{info?.staff_id}</ThemedText>
                        </ThemedView>
                        <ThemedView  darkColor="#111111"  style={{justifyContent:'space-between', flexDirection:'row'}}>
                            <ThemedText style={styles.placeholder} lightColor='#000' >Company</ThemedText>
                            <ThemedText style={styles.actualtext} lightColor='#000' >{info?.organization?.organization_name}</ThemedText>
                        </ThemedView>
                        
                        </ThemedView>
                        </TouchableOpacity>
                        
                        ))
        )}


        {/* <BottomSheetModal
          ref={bottomSheetModalRef}
          index={2}
          handleIndicatorStyle={styles.handleIndicator}
          footerComponent={(props) => (
            <BottomSheetFooter {...props} >

            <TouchableOpacity
                style={{ marginTop:0, padding: 14, backgroundColor: "#1E232C", borderRadius: 7, alignItems:'center', gap:4,
              flexDirection:'row', justifyContent:'center' }}
             
              >
                 <ActivityIndicator size="small" color="#fff" />
                <Text style={{ color: "white", textAlign: "center" }}>
                Close
                </Text>
              </TouchableOpacity>
                  
                      </BottomSheetFooter>
          )}
          backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
        )}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 10, 
            backgroundColor: Colors[colorScheme ?? 'light'].tabtop,
          }}
          onDismiss={() => setOpen(false)}

          style={{ flex: 1, }} 
        >
          <View  style={{ flex: 1, padding: 10 }}>
          <ThemedText style={[styles.title, { fontSize:17, textAlign:'center', borderBottomWidth: 1, paddingBottom: 10,
         borderColor: Colors[colorScheme ?? 'light'].borderColor,  
        },
           ]}>
          Employee Details
            </ThemedText>
    
                <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
       <ThemedView style={styles.topsec} lightColor='#f2f2f2' >
       <Image
          source={bg}
          style={{
            width: 83,
            height: 83,
            objectFit: "contain",
            alignSelf: "center",
            borderRadius:50
   
          }}
        />
        <ThemedText style={styles.placeholder}  lightColor='#000'>    {visitationdata?.first_name && visitationdata?.last_name 
    ? visitationdata.first_name + ' ' + visitationdata.last_name 
    : (    
      <ShimmerEffect
      width={SCREEN_WIDTH / 3.2}
      height={11}
      style={styles.shimmer}
    />
          )} </ThemedText>
        <ThemedText style={styles.actualtext} lightColor='#6b788e'>   {visitationdata?.email ||  <ShimmerEffect
      width={SCREEN_WIDTH / 2.2}
      height={11}
      style={styles.shimmer}
    />  }</ThemedText>
       </ThemedView>
       <ThemedText>Visitation Details</ThemedText>
            
       <ThemedView style={styles.bottomsec} lightColor='#f2f2f2' >
       <ThemedText>Visitation Details</ThemedText>
   <ThemedView lightColor='transparent' darkColor='transparent' style={{flexDirection:'row', gap: 10, alignItems:'center'}}>
   <Image
          source={ visitationdata?.stage_1? (successicon) : (pendicon)}
          style={{
            width: 40,
            height: 40,
            objectFit: "contain",
            alignSelf: "center",
            borderRadius:50,
            flexDirection:'row',
          }}
        />
        <ThemedView lightColor='transparent' darkColor='transparent'>
            <ThemedText>Visitation Request</ThemedText>
            <ThemedText>
            {visitationdata?.stage_1 ? (timeAgo(visitationdata?.created_at)) :  <ShimmerEffect
      width={SCREEN_WIDTH / 2.2}
      height={11}
      style={styles.shimmer}
    />  }
            </ThemedText>
        </ThemedView>

   </ThemedView>

   <ThemedView lightColor='transparent' darkColor='transparent'>
   <MaterialCommunityIcons name="dots-vertical" size={24} color="#999" style={{marginLeft:7}}/>
   </ThemedView>

   <ThemedView lightColor='transparent' darkColor='transparent' style={{flexDirection:'row', gap: 10, alignItems:'center'}}>
   <Image
        source={ visitationdata?.stage_2? (successicon) : (pendicon)}
          style={{
            width: 40,
            height: 40,
            objectFit: "contain",
            alignSelf: "center",
            borderRadius:50,
            flexDirection:'row',
          }}
        />
        <ThemedView lightColor='transparent' darkColor='transparent'>
            <ThemedText>Awaiting Confirmation</ThemedText>
          
            <ThemedText>
            {visitationdata?.stage_2 ? (timeAgo(visitationdata?.accepted_time)) :  <ShimmerEffect
      width={SCREEN_WIDTH / 2.2}
      height={11}
      style={styles.shimmer}
    />  }
            </ThemedText>
        </ThemedView>

   </ThemedView>
   <ThemedView lightColor='transparent' darkColor='transparent'>
   <MaterialCommunityIcons name="dots-vertical" size={24} color="#999" style={{marginLeft:7}}/>
   </ThemedView>

   <ThemedView lightColor='transparent' darkColor='transparent' style={{flexDirection:'row', gap: 10, alignItems:'center'}}>
   <Image
          source={ visitationdata?.stage_3? (successicon) : (pendicon)}
          style={{
            width: 40,
            height: 40,
            objectFit: "contain",
            alignSelf: "center",
            borderRadius:50,
            flexDirection:'row',
          }}
        />
        <ThemedView lightColor='transparent' darkColor='transparent'>
            <ThemedText>Assign Tag</ThemedText>
            <ThemedText>
            {visitationdata?.stage_3 ? (timeAgo(visitationdata?.clock_in)) :  <ShimmerEffect
      width={SCREEN_WIDTH / 2.2}
      height={11}
      style={styles.shimmer}
    />  }
            </ThemedText>
        </ThemedView>

   </ThemedView>

   <ThemedView lightColor='transparent' darkColor='transparent'>
   <MaterialCommunityIcons name="dots-vertical" size={24} color="#999" style={{marginLeft:7}}/>
   </ThemedView>

   <ThemedView lightColor='transparent' darkColor='transparent' style={{flexDirection:'row', gap: 10, alignItems:'center'}}>
   <Image
           source={ visitationdata?.stage_4? (successicon) : (pendicon)}
          style={{
            width: 40,
            height: 40,
            objectFit: "contain",
            alignSelf: "center",
            borderRadius:50,
            flexDirection:'row',
          }}
        />
        <ThemedView lightColor='transparent' darkColor='transparent'>
            <ThemedText>Signout</ThemedText>
            {visitationdata?.stage_4 ? (timeAgo(visitationdata?.clock_out)) :  <ShimmerEffect
      width={SCREEN_WIDTH / 2.2}
      height={11}
      style={styles.shimmer}
    />  }
        </ThemedView>

   </ThemedView>

<ThemedView>

</ThemedView>
       </ThemedView>  
                </BottomSheetScrollView>

          </View>
       
        </BottomSheetModal> */}
        </ThemedView>
  

  )
}

export default Employeetable

const styles = StyleSheet.create({
    mytable:{
gap: 10
    },
    mbx:{
padding: 11,
borderWidth: 1,
gap: 9,
paddingVertical: 17,
borderRadius: 10
    },
    // handleIndicator: {
    //   backgroundColor: '#999',
    //   width: 40,
    //   height: 6,
    //   borderRadius: 3,
    // },
    topsec:{
        padding: 10,
        borderRadius:4,
        gap: 5,
        alignItems:'center',
        justifyContent:'center'
    },
    bottomsec:{
        padding: 10,
        borderRadius:4,
        gap: 5,
        alignItems:'flex-start',
        justifyContent:'flex-start'
    },
    contentContainer:{
padding: 10,
flex: 1,
gap:10
    },
    myinput:{
        flexDirection:'row',
        padding: 2,
        paddingVertical:8,
        gap: 2,
        borderWidth: 1,
        alignItems:'center',

    },
    footerbtn:{

    },
    footerText:{
      gap: 7,
      alignItems:'center',
    },
    footerIcon:{
      paddingRight:2,
      color:'white'
  
    },
    minicion:{
        paddingVertical: 5,
        width:'10%',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 3
    },
    footerContainer:{
padding: 14,
borderRadius:4,
alignItems:'center',
gap:2,
flexDirection:'row',
justifyContent:'center'
    }
})