import { StyleSheet, Text, TextInput, View,TouchableOpacity, FlatList ,  Image,Dimensions, ActivityIndicator } from 'react-native'
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


const Visitortable = ({data, toggleVisitorBar, visitationdata, timeAgo, loadingaccept}) => {
    const [isOpen, setOpen] = useState(false);
    const bottomSheetModalRef = useRef(null);
    const SCREEN_WIDTH = Dimensions.get("window").width;
    const snapPoints = ["30%","45%",  "50%", "50%", "85%" ];

  async  function handlePresentModal(id) {
    
        bottomSheetModalRef.current?.present();
        await  toggleVisitorBar(id);
        setTimeout(() => {
            setOpen(true);
        }, 400);
      }

      const renderFooter = useCallback(
        props => (
          <BottomSheetFooter {...props} >
<ThemedView style={{ paddingHorizontal: 20, paddingVertical: 6 }}>
  {visitationdata ? (
    <>
      {visitationdata?.stage_2 && !visitationdata?.stage_3 && !visitationdata?.stage_4 && !loadingaccept ? (
        <ThemedView lightColor='#9a4c1e' style={styles.footerContainer}>
          <MaterialCommunityIcons name='qrcode-scan' size={14} style={styles.footerIcon} />
          <ThemedText lightColor='white' style={styles.footerText}>
            Assign Qr Tag 
          </ThemedText>
        </ThemedView>
      ) : visitationdata?.stage_2 && visitationdata?.stage_3 && !visitationdata?.stage_4 && !loadingaccept ? (
        <ThemedView lightColor='#1D61E7' style={styles.footerContainer}>
          <MaterialCommunityIcons name='logout' size={14} style={styles.footerIcon} />
          <ThemedText lightColor='white' style={styles.footerText}>
            Sign Out
          </ThemedText>
        </ThemedView>
      ) : (
        <ThemedView lightColor='#9a4c1e' style={styles.footerContainer}>
          <Octicons name='verified' size={14} style={styles.footerIcon} />
          <ThemedText lightColor='white' style={styles.footerText}>
            Approve
          </ThemedText>
        </ThemedView>
      )}
    </>
  ) : loadingaccept ? (
    <ThemedView lightColor='#000' style={styles.footerContainer}>
      <ActivityIndicator size="small" color="#fff" />
    </ThemedView>
  ) : null}
</ThemedView>
      
          </BottomSheetFooter>
        ),
        []
      );
      const renderBackdrop = useCallback(
        (props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={1}
            appearsOnIndex={1}
            backgroundColor="rgba(0, 0, 0, 0.5)" 
          />
        ),
        []
      );
  
    const colorScheme = useColorScheme();

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `${day}/${month}/${year} ${hours}:${minutes}`;
      }
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
       
            <TextInput style={{        paddingVertical: 5,
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
                        onPress={() => handlePresentModal(info.ref)}
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
                            <ThemedText style={styles.actualtext}  lightColor='#000' >{info?.phonenumber}</ThemedText>
                        </ThemedView>
                        <ThemedView  darkColor="#111111" style={{justifyContent:'space-between', flexDirection:'row'}}>
                            <ThemedText style={styles.placeholder}  lightColor='#000' >Visiting</ThemedText>
                            <ThemedText style={styles.actualtext}  lightColor='#000' >{info?.staff_id?.first_name} {info?.staff_id?.last_name}</ThemedText>
                        </ThemedView>
                        
                        <ThemedView  darkColor="#111111" style={{justifyContent:'space-between', flexDirection:'row'}}>
                            <ThemedText style={styles.placeholder} lightColor='#000' >Status</ThemedText>
                            <ThemedText style={styles.actualtext} lightColor='#000' >Confirmation</ThemedText>
                        </ThemedView>
                        <ThemedView  darkColor="#111111"  style={{justifyContent:'space-between', flexDirection:'row'}}>
                            <ThemedText style={styles.placeholder} lightColor='#000' >Date</ThemedText>
                            <ThemedText style={styles.actualtext} lightColor='#000' >{formatDate(info?.clock_in)}</ThemedText>
                        </ThemedView>
                        
                        </ThemedView>
                        </TouchableOpacity>
                        
                        ))
        )}


        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={2}
          handleIndicatorStyle={styles.handleIndicator}
          footerComponent={(props) => (
            <BottomSheetFooter {...props} >
            <ThemedView style={{ paddingHorizontal: 20, paddingVertical: 6 }}>
              {visitationdata.stage_1 ? (
                <>
                  {visitationdata?.stage_2 && !visitationdata?.stage_3 && !visitationdata?.stage_4 && !loadingaccept ? (
                    <ThemedView lightColor='#9a4c1e' style={styles.footerContainer}>
                      <MaterialCommunityIcons name='qrcode-scan' size={14} style={styles.footerIcon} />
                      <ThemedText lightColor='white' style={styles.footerText}>
                        Assign Qr Tag 
                      </ThemedText>
                    </ThemedView>
                  ) : visitationdata?.stage_2 && visitationdata?.stage_3 && !visitationdata?.stage_4 && !loadingaccept ? (
                    <ThemedView lightColor='#1D61E7' style={styles.footerContainer}>
                      <MaterialCommunityIcons name='logout' size={14} style={styles.footerIcon} />
                      <ThemedText lightColor='white' style={styles.footerText}>
                        Sign Out
                      </ThemedText>
                    </ThemedView>
                  ) : (
                    <ThemedView lightColor='#9a4c1e' style={styles.footerContainer}>
                      <Octicons name='verified' size={14} style={styles.footerIcon} />
                      <ThemedText lightColor='white' style={styles.footerText}>
                        Approve
                      </ThemedText>
                    </ThemedView>
                  )}
                </>
              ) : loadingaccept ? (
                <ThemedView lightColor='#000' style={styles.footerContainer}>
                  <ActivityIndicator size="small" color="#fff" />
                </ThemedView>
              ) : null}
            </ThemedView>
                  
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
          Visitor Details
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
       
        </BottomSheetModal>
        </ThemedView>
  

  )
}

export default Visitortable

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